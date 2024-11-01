import bcrypt from "bcrypt";

export const getMainStoreId = async (db) => {
  try {
    const [results] = await db.execute(
      "SELECT id FROM Stores WHERE is_main_store = TRUE"
    );

    return results.length > 0 ? results[0].id : null;
  } catch (err) {
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
        INSERT INTO Addresses (address_line, country, province, city, postal_code, latitude, longitude, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

      const addressValues = [
        "Balagtas, Bulacan", // address_line
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
        (address_id, store_no, store_name, store_contact, store_email, is_main_store, updated_at, date_created, isStatus) 
        VALUES (?, ?, 'Lizaso Laundry Hub', '09310064466', 'lizasolaundryhub@gmail.com', TRUE, NOW(), NOW(), TRUE)`;

      const storeValues = [addressId, storeNo];
      const [storeResult] = await db.execute(insertStoreQuery, storeValues);
      const storeId = storeResult.insertId;

      console.log("Main store created.");

      // Step 3: Insert default service types for the newly created store
      const insertServiceQuery = `
        INSERT INTO Service_Type (store_id, service_name, default_price, date_created, isArchive)
        VALUES (?, 'Wash', 65, NOW(), FALSE),
              (?, 'Dry', 60, NOW(), FALSE),
              (?, 'Fold', 30, NOW(), FALSE),
              (?, 'Wash/Dry', 125, NOW(), FALSE),
              (?, 'Wash/Dry/Fold', 155, NOW(), FALSE)`;

      const serviceValues = [storeId, storeId, storeId, storeId, storeId];

      await db.execute(insertServiceQuery, serviceValues);

      await db.commit();
    }
  } catch (err) {
    await db.rollback();
    throw new Error(`Error ensuring main store exists: ${err.message}`);
  }
};

export const createDefaultAdmin = async (db) => {
  try {
    await db.beginTransaction();

    const [[{ count }]] = await db.execute(
      "SELECT COUNT(*) AS count FROM User_Account"
    );

    if (count === 0) {
      const username = "admin";
      const firstName = "Admin";
      const lastName = "User";
      const email = "admin@example.com";
      const mobile_number = "09310064466";
      const password = "admin123";
      const user_type = "Administrator";
      const hashedPassword = await bcrypt.hash(password, 10);
      const passwordSalt = await bcrypt.genSalt(10);

      const storeId = await getMainStoreId(db);

      if (storeId) {
        const roles = [
          {
            role_name: "Administrator",
            can_read: 1,
            can_write: 1,
            can_edit: 1,
            can_delete: 1,
          },
          {
            role_name: "Manager",
            can_read: 1,
            can_write: 1,
            can_edit: 1,
            can_delete: 1,
          },
          {
            role_name: "Store Staff",
            can_read: 1,
            can_write: 1,
            can_edit: 0,
            can_delete: 0,
          },
          {
            role_name: "Delivery Staff",
            can_read: 1,
            can_write: 0,
            can_edit: 0,
            can_delete: 0,
          },
        ];

        let rolePermissionsId;

        for (const role of roles) {
          const [roleResult] = await db.execute(
            `INSERT INTO Roles_Permissions 
            (role_name, can_read, can_write, can_edit, can_delete, date_created, isArchive) 
            VALUES (?, ?, ?, ?, ?, NOW(), FALSE)`,
            [
              role.role_name,
              role.can_read,
              role.can_write,
              role.can_edit,
              role.can_delete,
            ]
          );

          // Set rolePermissionsId for the Administrator role
          if (role.role_name === "Administrator") {
            rolePermissionsId = roleResult.insertId;
          }
        }

        const insertAddressQuery = `
          INSERT INTO Addresses (address_line,  country, province, city, postal_code, latitude, longitude, updated_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

        const addressValues = [
          "Balagtas, Bulacan",
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

        const [userResult] = await db.execute(
          `INSERT INTO User_Account 
          (username, first_name, last_name, email, role_permissions_id, isOnline, isStatus, isArchive, date_created, store_id, user_type, mobile_number, isAgreement, address_id) 
          VALUES (?, ?, ?, ?, ?, FALSE, TRUE, FALSE, NOW(), ?, ?, ?, TRUE, ?)`,
          [
            username,
            firstName,
            lastName,
            email,
            rolePermissionsId,
            storeId,
            user_type,
            mobile_number,
            addressId,
          ]
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

      await db.commit();
    }
  } catch (err) {
    await db.rollback();
    console.error("Error creating default admin:", err);
  }
};
