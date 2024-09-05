// export const handleSetActivityLog = async (req, res, connection) => {
//   const { id } = req.params;
//   const { user_type, action_type, action_description } = req.body;

//   if (!user_type || !action_type || !action_description) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const [result] = await connection.execute(
//       "INSERT INTO Activity_Log (user_id, user_type, action_type, action_description, timestamp) VALUES (?, ?, ?, ?, ?)",
//       [id, user_type, action_type, action_description, new Date()]
//     );

//     res.status(201).send(); 
//   } catch (error) {
//     console.error('Error creating activity log:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const logActivity = async (connection, userId, userType, actionType, actionDescription) => {
  try {
      await connection.execute(
          'INSERT INTO Activity_Log (user_id, user_type, action_type, action_description, timestamp) VALUES (?, ?, ?, ?, ?)',
          [userId, userType, actionType, actionDescription, new Date()]
      );
      console.log('Activity logged successfully');
  } catch (error) {
      console.error('Error logging activity:', error);
  }
};


