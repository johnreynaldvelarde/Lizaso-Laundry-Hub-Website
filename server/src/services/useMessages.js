export const handleSetNewMessages = async (req, res, connection) => {
  const { sender_id, recipient_id, message } = req.body;

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Check if a conversation exists between sender and recipient
    const [conversationRows] = await connection.query(
      `SELECT id FROM Conversations 
         WHERE (user_one_id = ? AND user_two_id = ?) 
            OR (user_one_id = ? AND user_two_id = ?);`,
      [sender_id, recipient_id, recipient_id, sender_id]
    );

    let conversation_id;

    if (conversationRows.length > 0) {
      // Use the existing conversation ID
      conversation_id = conversationRows[0].id;
    } else {
      // Create a new conversation if none exists
      const [newConversationResult] = await connection.query(
        `INSERT INTO Conversations (user_one_id, user_two_id) 
           VALUES (?, ?);`,
        [sender_id, recipient_id]
      );
      conversation_id = newConversationResult.insertId;
    }

    // Insert the new message into the Messages table
    const query = `
        INSERT INTO Messages (conversation_id, sender_id, recipient_id, message, date_sent)
        VALUES (?, ?, ?, ?, NOW());
      `;
    const [result] = await connection.query(query, [
      conversation_id,
      sender_id,
      recipient_id,
      message,
    ]);

    // Get the ID of the last inserted message
    const lastMessageId = result.insertId;

    // Update the Conversations table with the last message info
    await connection.query(
      `UPDATE Conversations 
         SET last_message_id = ?, last_message_date = NOW() 
         WHERE id = ?`,
      [lastMessageId, conversation_id]
    );

    await connection.commit();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: {
        messageId: lastMessageId,
        conversation_id,
        sender_id,
        recipient_id,
        message,
      },
    });
  } catch (error) {
    // Rollback the transaction on error
    await connection.rollback();
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the message.",
    });
  } finally {
    connection.release();
  }
};

export const handleGetMessages = async (req, res, connection) => {
  const { user_one_id, user_two_id } = req.params;

  try {
    await connection.beginTransaction();

    // Step 1: Fetch conversation_id based on user_one_id and user_two_id
    const [conversationRows] = await connection.query(
      `SELECT id FROM Conversations
         WHERE (user_one_id = ? AND user_two_id = ?) 
            OR (user_one_id = ? AND user_two_id = ?)`,
      [user_one_id, user_two_id, user_two_id, user_one_id]
    );

    if (conversationRows.length === 0) {
      // If no conversation exists between the two users
      await connection.commit();
      return res.status(200).json({
        success: true,
        data: [],
        message: "No conversation found between these users.",
      });
    }

    const conversation_id = conversationRows[0].id;

    // Step 2: Fetch messages based on conversation_id
    const [messageRows] = await connection.query(
      `SELECT * FROM Messages WHERE conversation_id = ? ORDER BY date_sent ASC`,
      [conversation_id]
    );

    // Commit transaction
    await connection.commit();

    if (messageRows.length > 0) {
      res.status(200).json({
        success: true,
        data: messageRows, // Return the fetched messages
      });
    } else {
      res.status(200).json({
        success: true,
        data: [],
        message: "No messages found for this conversation.",
      });
    }
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching messages.",
    });
  } finally {
    connection.release();
  }
};

export const handleGetInbox = async (req, res, connection) => {
  const { id } = req.params;

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Query to get conversations where the user is either user_one_id or user_two_id
    const [conversations] = await connection.query(
      `SELECT 
        conv.id AS conversation_id,
        conv.user_one_id,
        conv.user_two_id,
        conv.last_message_id,
        conv.last_message_date,
        CONCAT(ua1.first_name, ' ', IFNULL(ua1.middle_name, ''), ' ', ua1.last_name) AS user_one_name,
        CONCAT(ua2.first_name, ' ', IFNULL(ua2.middle_name, ''), ' ', ua2.last_name) AS user_two_name,
        m.message,
        m.is_read,
        m.sender_id,
        m.recipient_id,
        m.date_sent
      FROM 
        Conversations conv
      LEFT JOIN User_Account ua1 ON conv.user_one_id = ua1.id
      LEFT JOIN User_Account ua2 ON conv.user_two_id = ua2.id
      LEFT JOIN Messages m ON conv.last_message_id = m.id
      WHERE 
        (conv.user_one_id = ? OR conv.user_two_id = ?)
      ORDER BY conv.last_message_date DESC`,
      [id, id]
    );

    if (conversations.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No conversations found.",
      });
    }

    // Commit the transaction
    await connection.commit();

    // Return the list of conversations as the inbox
    res.status(200).json({
      success: true,
      data: conversations.map((conv) => ({
        conversation_id: conv.conversation_id,
        user_one: {
          id: conv.user_one_id,
          full_name: conv.user_one_name.trim(), // Trim in case middle name is null
        },
        user_two: {
          id: conv.user_two_id,
          full_name: conv.user_two_name.trim(), // Trim in case middle name is null
        },
        last_message: {
          message: conv.message,
          is_read: conv.is_read,
          sender_id: conv.sender_id,
          recipient_id: conv.recipient_id,
          date_sent: conv.date_sent,
        },
      })),
    });
  } catch (error) {
    // Rollback in case of any errors
    await connection.rollback();
    console.error("Error fetching inbox:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the inbox.",
    });
  } finally {
    // Release the connection
    connection.release();
  }
};

export const handleGetMessagesOnlyWeb = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const [messageRows] = await connection.query(
      `SELECT * FROM Messages WHERE conversation_id = ? ORDER BY date_sent ASC`,
      [id]
    );

    // Commit transaction
    await connection.commit();

    if (messageRows.length > 0) {
      res.status(200).json({
        success: true,
        data: messageRows, // Return the fetched messages
      });
    } else {
      res.status(200).json({
        success: true,
        data: [],
        message: "No messages found for this conversation.",
      });
    }
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching messages.",
    });
  } finally {
    connection.release();
  }
};

export const handleGetInboxOnlyAdmin = async (req, res, connection) => {
  const { id } = req.params; // user_id

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Query to get conversations where the user is either user_one_id or user_two_id
    const [conversations] = await connection.query(
      `SELECT 
        conv.id AS conversation_id,
        conv.user_one_id,
        conv.user_two_id,
        conv.last_message_id,
        conv.last_message_date,
        CONCAT(ua1.first_name, ' ', IFNULL(ua1.middle_name, ''), ' ', ua1.last_name) AS user_one_name,
        CONCAT(ua2.first_name, ' ', IFNULL(ua2.middle_name, ''), ' ', ua2.last_name) AS user_two_name,
        ua1.user_type AS user_type_one,
        ua2.user_type AS user_type_two,
        m.message,
        m.is_read,
        m.sender_id,
        m.recipient_id,
        m.date_sent
      FROM 
        Conversations conv
      LEFT JOIN User_Account ua1 ON conv.user_one_id = ua1.id
      LEFT JOIN User_Account ua2 ON conv.user_two_id = ua2.id
      LEFT JOIN Messages m ON conv.last_message_id = m.id
      WHERE 
        (conv.user_one_id = ? OR conv.user_two_id = ?)
      ORDER BY conv.last_message_date DESC`,
      [id, id]
    );

    if (conversations.length === 0) {
      // Query to get all users except the current user
      const [users] = await connection.query(
        `SELECT 
          id,
          CONCAT(first_name, ' ', IFNULL(middle_name, ''), ' ', last_name) AS full_name,
          user_type
         FROM User_Account
         WHERE id != ? AND isStatus = 0 AND isArchive = 0`,
        [id]
      );

      await connection.commit();

      // Return user list with "Start a conversation" option
      return res.status(200).json({
        success: true,
        message: "no_convo",
        data: users.map((user) => ({
          conversation_id: 0,
          user_one: {
            id: user.id,
            full_name: user.full_name ? user.full_name.trim() : "", // Check if full_name exists
            user_type_one: user.user_type,
          },
          user_two: null,
          last_message: {
            message: "Start a conversation",
          },
        })),
      });
    }

    // user_id: user.id,
    // full_name: user.full_name.trim(),
    // user_type: user.user_type,
    // start_conversation: "Start a conversation",

    // Commit the transaction
    await connection.commit();

    // Return the list of conversations as the inbox if conversations are found
    res.status(200).json({
      success: true,
      data: conversations.map((conv) => ({
        conversation_id: conv.conversation_id,
        user_one: {
          id: conv.user_one_id,
          full_name: conv.user_one_name.trim(),
          user_type_one: conv.user_type_one,
        },
        user_two: {
          id: conv.user_two_id,
          full_name: conv.user_two_name.trim(),
          user_type_two: conv.user_type_one,
        },
        last_message: {
          message: conv.message,
          is_read: conv.is_read,
          sender_id: conv.sender_id,
          recipient_id: conv.recipient_id,
          date_sent: conv.date_sent,
        },
      })),
    });
  } catch (error) {
    // Rollback in case of any errors
    await connection.rollback();
    console.error("Error fetching inbox:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the inbox.",
    });
  } finally {
    // Release the connection
    connection.release();
  }
};

export const handleUpdateMessageIsRead = async (req, res, connection) => {
  const { user_one_id, user_two_id } = req.params;
  console.log(req.params);

  try {
    await connection.beginTransaction();

    // Step 1: Check if the conversation exists and get its ID
    const [conversationResult] = await connection.query(
      `SELECT id FROM Conversations 
         WHERE (user_one_id = ? AND user_two_id = ?) 
            OR (user_one_id = ? AND user_two_id = ?);`,
      [user_one_id, user_two_id, user_two_id, user_one_id]
    );

    if (conversationResult.length === 0) {
      // If no conversation exists, commit the transaction and return
      await connection.commit();
      return res.status(200).json({
        success: true,
        message: "No conversation found between these users.",
      });
    }

    const conversationId = conversationResult[0].id;

    console.log(conversationId);

    // Step 2: Update `is_read` to 1 in Messages table where recipient_id matches user_one_id
    const [updateResult] = await connection.query(
      `UPDATE Messages 
         SET is_read = 1,
             date_read = NOW()
         WHERE conversation_id = ? 
           AND recipient_id = ?;`,
      [conversationId, user_one_id]
    );

    // Commit the transaction after updating
    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Messages marked as read.",
      affectedRows: updateResult.affectedRows,
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: "An error occurred while updating messages.",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};
