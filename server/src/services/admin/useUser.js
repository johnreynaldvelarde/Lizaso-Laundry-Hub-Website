export const handleAdminGetUser = async (req, res, connection) => {
  try {
    const { id } = req.params;

    // First, check the role of the user using the `id`
    const [userResult] = await connection.execute(
      `SELECT isRole, store_id FROM User_Account WHERE id = ?`,
      [id]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRole = userResult[0].isRole;
    const userStoreId = userResult[0].store_id;

    let query = "";
    let queryParams = [];

    if (userRole === 0) {
      // If the user is an admin (isRole = 0), get all stores and associated users
      query = `
        SELECT
          s.id AS store_id,
          s.store_name,
          s.store_no,
          s.store_contact,
          s.store_email,
          s.is_main_store,
          u.id AS user_id,
          u.username,
          u.email,
          u.mobile_number,
          u.first_name,
          u.middle_name,
          u.last_name,
          u.isOnline,
          u.isRole
        FROM
          Stores s
        LEFT JOIN
          User_Account u ON s.id = u.store_id
        WHERE
          s.isArchive = 0
      `;
    } else if (userRole === 1) {
      // If the user is a regular user (isRole = 1), get only their store and associated users
      query = `
        SELECT
          s.id AS store_id,
          s.store_name,
          s.store_no,
          s.store_contact,
          s.store_email,
          s.is_main_store,
          u.id AS user_id,
          u.username,
          u.email,
          u.mobile_number,
          u.first_name,
          u.middle_name,
          u.last_name,
          u.isOnline,
          u.isRole
        FROM
          Stores s
        LEFT JOIN
          User_Account u ON s.id = u.store_id
        WHERE
          s.isArchive = 0
          AND s.id = ?
      `;
      queryParams = [userStoreId];
    }

    // Execute the query
    const [result] = await connection.execute(query, queryParams);

    // Transform the result into the desired format
    const stores = result.reduce((acc, row) => {
      const existingStore = acc.find(
        (store) => store.store_id === row.store_id
      );

      if (existingStore) {
        existingStore.users.push({
          id: row.user_id,
          username: row.username,
          email: row.email,
          mobile_number: row.mobile_number,
          first_name: row.first_name,
          middle_name: row.middle_name,
          last_name: row.last_name,
        });
      } else {
        acc.push({
          store_id: row.store_id,
          store_name: row.store_name,
          store_no: row.store_no,
          store_contact: row.store_contact,
          store_email: row.store_email,
          is_main_store: row.is_main_store,
          users: row.user_id
            ? [
                {
                  id: row.user_id,
                  username: row.username,
                  email: row.email,
                  mobile_number: row.mobile_number,
                  first_name: row.first_name,
                  middle_name: row.middle_name,
                  last_name: row.last_name,
                  isOnline: row.isOnline,
                  isRole: row.isRole,
                },
              ]
            : [],
        });
      }

      return acc;
    }, []);

    // Respond with the list of stores and users
    res.status(200).json({
      // message: "Stores and users retrieved successfully",
      stores,
    });
  } catch (error) {
    console.error("Error retrieving stores and users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST
export const handleSetRolesPermissions = async (req, res, connection) => {
  const { id } = req.params;
  const { role_name, permissionsStatus } = req.body;

  try {
    await connection.beginTransaction();

    const userQuery = `
      SELECT role_permissions_id 
      FROM User_Account 
      WHERE id = ? AND isArchive = 0
    `;
    const [userResults] = await connection.execute(userQuery, [id]);

    if (userResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const createRolePermissionsQuery = `
      INSERT INTO Roles_Permissions (role_name, can_read, can_write, can_edit, can_delete, date_created)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    const permissions = {
      can_read: permissionsStatus.Read,
      can_write: permissionsStatus.Write,
      can_edit: permissionsStatus.Edit,
      can_delete: permissionsStatus.Delete,
    };

    await connection.execute(createRolePermissionsQuery, [
      role_name,
      permissions.can_read,
      permissions.can_write,
      permissions.can_edit,
      permissions.can_delete,
    ]);

    await connection.commit();

    res.json({
      success: true,
      message: "Role permissions created.",
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating roles and permissions:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating role permissions.",
    });
  } finally {
    if (connection) connection.release();
  }
};

// GET
export const handleGetRolesPermissions = async (req, res, connection) => {
  const { id } = req.params; // user id

  try {
    await connection.beginTransaction();

    // Query to get the role_permissions_id from User_Account
    const userQuery = `
      SELECT role_permissions_id 
      FROM User_Account 
      WHERE id = ? AND isArchive = 0
    `;
    const [userResults] = await connection.execute(userQuery, [id]);

    // If user is not found, return 404
    if (userResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { role_permissions_id } = userResults[0];

    // Query to get the user's role details from Roles_Permissions
    const roleQuery = `
      SELECT role_name, can_read, can_write, can_edit, can_delete 
      FROM Roles_Permissions 
      WHERE id = ? AND isArchive = 0
    `;
    const [roleResults] = await connection.execute(roleQuery, [
      role_permissions_id,
    ]);

    // If no role is found, return 404
    if (roleResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    const role = roleResults[0];

    // Check if the role_name is 'Administrator'
    if (role.role_name === "Administrator") {
      // If Administrator, fetch all roles and count how many users are assigned to each role
      const allRolesQuery = `
        SELECT rp.id, rp.role_name, rp.can_read, rp.can_write, rp.can_edit, rp.can_delete, rp.date_created, rp.isArchive,
          (SELECT COUNT(*) FROM User_Account ua WHERE ua.role_permissions_id = rp.id AND ua.isArchive = 0) AS user_count
        FROM Roles_Permissions rp
        WHERE rp.isArchive = 0
      `;
      const [allRolesResults] = await connection.execute(allRolesQuery);

      return res.status(200).json({
        success: true,
        message: "User is an Administrator",
        data: allRolesResults, // Return all roles and the number of users for each role
      });
    } else {
      // If not an Administrator, deny access to roles data
      return res.status(403).json({
        success: false,
        message: "Access denied. Only Administrators can view all roles.",
      });
    }
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching roles and permissions:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  } finally {
    if (connection) connection.release();
  }
};

// #For getting store the user count related to it
export const handleGetStoresBasedAdmin = async (req, res, connection) => {
  const { id } = req.params; // user id

  try {
    await connection.beginTransaction();
    const userQuery = `
      SELECT role_permissions_id 
      FROM User_Account 
      WHERE id = ? AND isArchive = 0
    `;
    const [userResults] = await connection.execute(userQuery, [id]);
    if (userResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { role_permissions_id } = userResults[0];
    const roleQuery = `
      SELECT role_name, can_read, can_write, can_edit, can_delete 
      FROM Roles_Permissions 
      WHERE id = ? AND isArchive = 0
    `;
    const [roleResults] = await connection.execute(roleQuery, [
      role_permissions_id,
    ]);

    if (roleResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    const role = roleResults[0];

    if (role.role_name === "Administrator") {
      const allStoresQuery = `
        SELECT s.id, s.store_no, s.store_name, s.store_contact, s.store_email, s.is_main_store, s.updated_at, s.date_created, s.isStatus, s.isArchive,
          (SELECT COUNT(*) 
          FROM User_Account ua 
          WHERE ua.store_id = s.id 
          AND ua.isArchive = 0) AS user_count
        FROM Stores s
        WHERE s.isArchive = 0
      `;

      const [allStoresResults] = await connection.execute(allStoresQuery);

      return res.status(200).json({
        success: true,
        message: "Store list retrieved successfully",
        data: allStoresResults,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only Administrators can view all stores",
      });
    }
  } catch (error) {
    await connection.rollback();
    console.error("Error fetching roles and permissions:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
    });
  } finally {
    if (connection) connection.release();
  }
};

// PUT
export const handleUpdateRolePermission = async (req, res, connection) => {
  const { id } = req.params;
  const { store_id, service_name, default_price } = req.body;
  try {
    await connection.beginTransaction();

    const updateQuery = `
      UPDATE Service_Type 
      SET service_name = ?, default_price = ?
      WHERE id = ?
    `;

    await connection.query(updateQuery, [service_name, default_price, id]);
    await connection.commit();
    res
      .status(200)
      .json({ success: true, message: "Service type update successfully." });
  } catch (error) {
    await connection.rollback();
    res
      .status(500)
      .json({ error: "An error occurred while creating the service type." });
  }
};

// DELETE
export const handleDeleteRole = async (req, res, connection) => {
  const { id } = req.params;

  try {
    await connection.beginTransaction();

    const userCountQuery = `
      SELECT COUNT(*) as user_count 
      FROM User_Account 
      WHERE role_permissions_id = ? AND isArchive = 0
    `;
    const [userCountResults] = await connection.execute(userCountQuery, [id]);

    const { user_count } = userCountResults[0];

    if (user_count === 0) {
      const updateQuery = `
        UPDATE Roles_Permissions
        SET isArchive = 1
        WHERE id = ? AND isArchive = 0
      `;
      await connection.execute(updateQuery, [id]);

      await connection.commit();
      1;
      return res.status(200).json({
        success: true,
        message: `Role with id ${id} was successfully archived.`,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Role with id ${id} cannot be archived because there are users associated with it.`,
      });
    }
  } catch (error) {
    await connection.rollback();
    console.error("Error archiving role:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while trying to archive the role.",
    });
  } finally {
    if (connection) connection.release();
  }
};
