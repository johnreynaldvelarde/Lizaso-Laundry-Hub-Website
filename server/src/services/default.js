import bcrypt from 'bcrypt';

// Function to get the main store ID
export const getMainStoreId = async (db) => {
  try {
    const [results] = await db.query('SELECT id FROM Stores WHERE is_main_store = TRUE');
    if (results.length > 0) {
      return results[0].id;
    } else {
      return null; // No main store found
    }
  } catch (err) {
    throw new Error(`Error fetching main store ID: ${err.message}`);
  }
};

// Function to ensure that the main store exists
export const ensureMainStoreExists = async (db) => {
  try {
    const [[{ count }]] = await db.query('SELECT COUNT(*) AS count FROM Stores WHERE is_main_store = TRUE');
    if (count === 0) {
      const storeId = 'LIZASO-' + new Date().getTime(); // Unique store ID starting with LIZASO

      const insertStoreQuery = `INSERT INTO Stores 
        (store_id, store_name, store_address, store_contact, is_main_store, date_created) 
        VALUES (?, 'Main Store', 'Main Address', 'Main Contact', TRUE, NOW())`;

      await db.query(insertStoreQuery, [storeId]);
      console.log('Main store created.');
    }
  } catch (err) {
    throw new Error(`Error ensuring main store exists: ${err.message}`);
  }
};

// Function to create a default admin account
export const createDefaultAdmin = async (db) => {
  try {
    const [[{ count }]] = await db.query('SELECT COUNT(*) AS count FROM User_Account');
    if (count === 0) {
      const username = 'admin';
      const firstName = 'Admin';
      const lastName = 'User';
      const email = 'admin@example.com';
      const password = 'admin123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const passwordSalt = await bcrypt.genSalt(10);

      const storeId = await getMainStoreId(db); // Get the main store ID

      if (storeId) {
        await db.query(`INSERT INTO User_Account 
          (username, first_name, last_name, email, isRole, isOnline, isStatus, date_created, store_id) 
          VALUES (?, ?, ?, ?, 0, FALSE, TRUE, NOW(), ?)`, 
          [username, firstName, lastName, email, storeId]
        );

        const [[{ user_id }]] = await db.query(`SELECT LAST_INSERT_ID() AS user_id`);

        await db.query(`INSERT INTO User_Security 
          (user_id, password, password_salt, mfa_enabled, failed_login_attempts, account_locked) 
          VALUES (?, ?, ?, FALSE, 0, FALSE)`,
          [user_id, hashedPassword, passwordSalt]
        );

        console.log('Default admin account created.');
      } else {
        console.log('No main store found, cannot create default admin.');
      }
    }
  } catch (err) {
    console.error('Error creating default admin:', err);
  }
};
