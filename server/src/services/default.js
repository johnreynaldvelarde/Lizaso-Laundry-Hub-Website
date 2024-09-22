import bcrypt from "bcrypt";

// Function to get the main store ID
export const getMainStoreId = async (db) => {
  try {
    // Use 'execute' for prepared statement and secure parameter handling
    const [results] = await db.execute(
      "SELECT id FROM Stores WHERE is_main_store = TRUE"
    );

    // Check if a main store exists
    return results.length > 0 ? results[0].id : null; // Return the main store ID or null
  } catch (err) {
    // Handle any errors that occur during the query execution
    throw new Error(`Error fetching main store ID: ${err.message}`);
  }
};

// Function to ensure that the main store exists
export const ensureMainStoreExists = async (db) => {
  try {
    // Start the transaction
    await db.beginTransaction();

    const [[{ count }]] = await db.execute(
      "SELECT COUNT(*) AS count FROM Stores WHERE is_main_store = TRUE"
    );

    if (count === 0) {
      const storeNo = "LIZASO-" + new Date().getTime(); // Unique store ID starting with LIZASO

      // Step 1: Insert the address into the Addresses table
      const insertAddressQuery = `
        INSERT INTO Addresses (address_line1, address_line2, country, province, city, postal_code, latitude, longitude, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

      const addressValues = [
        "Balagtas", // address_line1
        "Bulacan", // address_line2
        "Philippines", // country
        "Bulacan", // province
        "Balagtas", // city
        "3016", // postal_code
        "14.814820876765298", // latitude
        "120.91126972957287", // longitude
      ];

      const [addressResult] = await db.execute(
        insertAddressQuery,
        addressValues
      );
      const addressId = addressResult.insertId;

      // Step 2: Insert the store into the Stores table using the address_id
      const insertStoreQuery = `
        INSERT INTO Stores 
        (address_id, store_no, store_name, store_contact, store_email, is_main_store, date_created) 
        VALUES (?, ?, 'Lizaso Laundry Hub', 'Main Contact', '', TRUE, NOW())`;

      const storeValues = [addressId, storeNo];
      const [storeResult] = await db.execute(insertStoreQuery, storeValues);
      const storeId = storeResult.insertId; // Capture the store's ID

      console.log("Main store created.");

      // Step 3: Insert default service types for the newly created store
      const insertServiceQuery = `
        INSERT INTO Service_Type (store_id, service_name, default_price, date_created, isArchive)
        VALUES (?, 'Wash', 65, NOW(), FALSE),
               (?, 'Dry', 55, NOW(), FALSE),
               (?, 'Fold', 30, NOW(), FALSE)`;

      const serviceValues = [storeId, storeId, storeId]; // Use the same storeId for all services

      await db.execute(insertServiceQuery, serviceValues);

      console.log(
        "Default services (Wash, Dry, Fold) created for the main store."
      );

      // Commit the transaction
      await db.commit();
    }
  } catch (err) {
    // Rollback the transaction in case of error
    await db.rollback();
    throw new Error(`Error ensuring main store exists: ${err.message}`);
  }
};

export const createDefaultAdmin = async (db) => {
  try {
    // Start the transaction
    await db.beginTransaction();

    const [[{ count }]] = await db.execute(
      "SELECT COUNT(*) AS count FROM User_Account"
    );

    if (count === 0) {
      const username = "admin";
      const firstName = "Admin";
      const lastName = "User";
      const email = "admin@example.com";
      const password = "admin123";
      const hashedPassword = await bcrypt.hash(password, 10);
      const passwordSalt = await bcrypt.genSalt(10);

      const storeId = await getMainStoreId(db); // Get the main store ID

      if (storeId) {
        const [userResult] = await db.execute(
          `INSERT INTO User_Account 
          (username, first_name, last_name, email, isRole, isOnline, isStatus, date_created, store_id) 
          VALUES (?, ?, ?, ?, 0, FALSE, FALSE, NOW(), ?)`,
          [username, firstName, lastName, email, storeId]
        );

        const userId = userResult.insertId;

        await db.execute(
          `INSERT INTO User_Security 
          (user_id, password, password_salt, mfa_enabled, failed_login_attempts, account_locked) 
          VALUES (?, ?, ?, FALSE, 0, FALSE)`,
          [userId, hashedPassword, passwordSalt]
        );

        console.log("Default admin account created.");
      } else {
        console.log("No main store found, cannot create default admin.");
      }

      // Commit the transaction
      await db.commit();
    }
  } catch (err) {
    // Rollback the transaction in case of error
    await db.rollback();
    console.error("Error creating default admin:", err);
  }
};

// Function to create a default admin account

// export const getMainStoreId = async (db) => {
//   try {
//     const [results] = await db.query(
//       "SELECT id FROM Stores WHERE is_main_store = TRUE"
//     );
//     if (results.length > 0) {
//       return results[0].id;
//     } else {
//       return null; // No main store found
//     }
//   } catch (err) {
//     throw new Error(`Error fetching main store ID: ${err.message}`);
//   }
// };

// export const ensureMainStoreExists = async (db) => {
//   try {
//     const [[{ count }]] = await db.query(
//       "SELECT COUNT(*) AS count FROM Stores WHERE is_main_store = TRUE"
//     );

//     if (count === 0) {
//       const storeNo = "LIZASO-" + new Date().getTime(); // Unique store ID starting with LIZASO

//       // Step 1: Insert the address into the Addresses table
//       const insertAddressQuery = `
//         INSERT INTO Addresses (address_line1, address_line2, country,  province, city, postal_code, latitude, longitude, updated_at)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

//       const addressValues = [
//         "Balagtas", // address_line1
//         "Bulacan", // address_line2
//         "Philippines", // country
//         "Bulacan", // province
//         "Balagtas", // city
//         "3016", // postal_code
//         "14.814820876765298", // latitude
//         "120.91126972957287", // longitude
//       ];

//       const [addressResult] = await db.query(insertAddressQuery, addressValues);
//       const addressId = addressResult.insertId;

//       // Step 2: Insert the store into the Stores table using the address_id
//       const insertStoreQuery = `
//         INSERT INTO Stores
//         (address_id, store_no, store_name, store_contact, store_email, is_main_store, date_created)
//         VALUES (?, ?, 'Lizaso Laundry Hub', 'Main Contact', '', TRUE, NOW())`;

//       const storeValues = [addressId, storeNo];

//       await db.query(insertStoreQuery, storeValues);

//       console.log("Main store created.");
//     }
//   } catch (err) {
//     throw new Error(`Error ensuring main store exists: ${err.message}`);
//   }
// };

// export const createDefaultAdmin = async (db) => {
//   try {
//     const [[{ count }]] = await db.query(
//       "SELECT COUNT(*) AS count FROM User_Account"
//     );
//     if (count === 0) {
//       const username = "admin";
//       const firstName = "Admin";
//       const lastName = "User";
//       const email = "admin@example.com";
//       const password = "admin123";
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const passwordSalt = await bcrypt.genSalt(10);

//       const storeId = await getMainStoreId(db); // Get the main store ID

//       if (storeId) {
//         await db.query(
//           `INSERT INTO User_Account
//           (username, first_name, last_name, email, isRole, isOnline, isStatus, date_created, store_id)
//           VALUES (?, ?, ?, ?, 0, FALSE, FALSE, NOW(), ?)`,
//           [username, firstName, lastName, email, storeId]
//         );

//         const [[{ user_id }]] = await db.query(
//           `SELECT LAST_INSERT_ID() AS user_id`
//         );

//         await db.query(
//           `INSERT INTO User_Security
//           (user_id, password, password_salt, mfa_enabled, failed_login_attempts, account_locked)
//           VALUES (?, ?, ?, FALSE, 0, FALSE)`,
//           [user_id, hashedPassword, passwordSalt]
//         );

//         console.log("Default admin account created.");
//       } else {
//         console.log("No main store found, cannot create default admin.");
//       }
//     }
//   } catch (err) {
//     console.error("Error creating default admin:", err);
//   }
// };
