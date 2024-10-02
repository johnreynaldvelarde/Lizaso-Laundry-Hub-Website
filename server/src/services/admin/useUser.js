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
