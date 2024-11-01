// export const handleGetTransactionHistory = async (req, res, db) => {
//   const { id } = req.params; // store id

//   try {
//     const query = `
//         SELECT
//             t.id AS transaction_id,
//             t.assignment_id,
//             t.transaction_code,
//             t.total_amount,
//             t.payment_method,
//             t.status AS transaction_status,
//             t.created_at,
//             t.updated_at,
//             sr.customer_fullname,
//             sr.customer_type
//         FROM
//         Transactions t
//         LEFT JOIN
//             Service_Request sr ON t.assignment_id = sr.id
//         WHERE
//             sr.store_id = ?
//         ORDER BY
//         CASE
//             WHEN t.status = 'Pending' THEN 0
//             WHEN t.status = 'Completed' THEN 1
//             ELSE 2
//         END;
//     `;

//     const [rows] = await db.query(query, [id]);
//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {
//     console.error("Error fetching transaction history:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

export const handleGetTransactionHistory = async (req, res, db) => {
  const { id } = req.params; // store id

  try {
    const query = `
          SELECT 
              t.id AS transaction_id,
              t.assignment_id,
              t.transaction_code,
              t.total_amount,
              t.payment_method,
              t.status AS transaction_status,
              t.created_at,
              t.updated_at,
              sr.customer_fullname,
              sr.customer_type,
              ri.quantity AS related_item_quantity,
              ri.amount AS related_item_amount,
              i.item_name AS related_item_name,
              la.weight,
              st.service_name,
              st.default_price
          FROM 
              Transactions t
          LEFT JOIN 
              Service_Request sr ON t.assignment_id = sr.id
          LEFT JOIN 
              Laundry_Assignment la ON la.service_request_id = sr.id
          LEFT JOIN 
              Service_Type st ON st.id = sr.service_type_id 
          LEFT JOIN 
              Related_Item ri ON ri.assignment_id = t.assignment_id
          LEFT JOIN 
              Inventory inv ON inv.id = ri.inventory_id
          LEFT JOIN 
              Item i ON i.id = inv.item_id
          WHERE 
              sr.store_id = ?
              AND (i.isArchive = 0 OR i.isArchive IS NULL)  -- Include non-archived items or null for no related item
          ORDER BY 
              t.created_at DESC; -- Order by transaction date
      `;

    const [rows] = await db.query(query, [id]);

    // Transform the result to group related items under each transaction
    const transactions = rows.reduce((acc, row) => {
      // Find the existing transaction
      let transaction = acc.find(
        (t) => t.transaction_id === row.transaction_id
      );

      // If the transaction doesn't exist, create a new one
      if (!transaction) {
        transaction = {
          transaction_id: row.transaction_id,
          assignment_id: row.assignment_id,
          transaction_code: row.transaction_code,
          total_amount: row.total_amount,
          payment_method: row.payment_method,
          transaction_status: row.transaction_status,
          created_at: row.created_at,
          updated_at: row.updated_at,
          customer_fullname: row.customer_fullname,
          customer_type: row.customer_type,
          service_name: row.service_name,
          weight: row.weight,
          default_price: row.default_price,
          related_items: [], // Initialize related items array
        };
        acc.push(transaction);
      }

      // If there's a related item, add it to the transaction's related items array
      if (row.related_item_name) {
        transaction.related_items.push({
          item_name: row.related_item_name,
          quantity: row.related_item_quantity,
          amount: row.related_item_amount,
        });
      }

      return acc;
    }, []);

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
