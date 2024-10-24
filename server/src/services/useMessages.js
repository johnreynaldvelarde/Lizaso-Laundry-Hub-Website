// export const handleSetNewMessages = async (req, res, connection) => {
//   const {} = req.body;
// };

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
  const { user_one_id, user_two_id } = req.params; // Extracting user_one_id and user_two_id from request parameters

  console.log(req.params);

  try {
    // Start transaction
    await connection.beginTransaction();

    // Step 1: Fetch conversation_id based on user_one_id and user_two_id
    const [conversationRows] = await connection.query(
      `SELECT id FROM Conversations
         WHERE (user_one_id = ? AND user_two_id = ?) 
            OR (user_one_id = ? AND user_two_id = ?)`,
      [user_one_id, user_two_id, user_two_id, user_one_id] // Check both directions
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
