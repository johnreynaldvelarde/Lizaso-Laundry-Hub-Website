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

// #For getting the user list
export const handleGetBasedUser = async (req, res, connection) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        ua.id AS user_id,
        ua.store_id,
        ua.role_permissions_id,
        ua.username,
        ua.email,
        ua.mobile_number,
        ua.first_name,
        ua.middle_name,
        ua.last_name,
        ua.isOnline,
        ua.isStatus,
        ua.isArchive,
        ua.date_created,
        rp.role_name,
        rp.can_read,
        rp.can_write,
        rp.can_edit,
        rp.can_delete
      FROM User_Account ua
      JOIN Roles_Permissions rp ON ua.role_permissions_id = rp.id
      WHERE ua.id = ? AND ua.isArchive = 0;
    `;

    const [results] = await connection.execute(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found or archived" });
    }

    const user = results[0];

    // Check if the user is an Administrator
    if (user.role_name !== "Administrator") {
      return res
        .status(403)
        .json({ error: "Access denied. Not an Administrator." });
    }

    res.status(200).json({ message: "User is an Administrator", data: user });
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ error: "Server error" });
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

// export const handleGetBasedUser = async (req, res, connection) => {
//   try {
//     const { id } = req.params;

//     const query = `
//       SELECT rp.role_name
//       FROM User_Account ua
//       JOIN Roles_Permissions rp ON ua.role_permissions_id = rp.id
//       WHERE ua.id = ? AND ua.isArchive = 0;
//     `;

//     const [results] = await connection.execute(query, [id]);

//     if (!results.length) {
//       return res.status(404).json({ error: "User not found or archived" });
//     }

//     if (results[0].role_name !== "Administrator") {
//       return res
//         .status(403)
//         .json({ error: "Access denied. Not an Administrator." });
//     }

//     res.status(200).json({ message: "User is an Administrator" });
//   } catch (error) {
//     console.error("Error fetching user", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
