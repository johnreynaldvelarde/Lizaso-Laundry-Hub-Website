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


