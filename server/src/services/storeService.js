// const ensureMainStoreExists = (db) => {
//     const query = 'SELECT COUNT(*) AS count FROM Stores WHERE is_main_store = TRUE';
//     db.query(query, (err, results) => {
//       if (err) throw err;
  
//       const storeCount = results[0].count;
//       if (storeCount === 0) {
//         const storeId = 'LIZASO-' + new Date().getTime(); // Unique store ID starting with LIZASO
  
//         const insertStoreQuery = `INSERT INTO Stores 
//           (store_id, store_name, store_address, store_contact, is_main_store, date_created) 
//           VALUES (?, 'Main Store', 'Main Address', 'Main Contact', TRUE, NOW())`;
  
//         db.query(insertStoreQuery, [storeId], (err) => {
//           if (err) throw err;
//           console.log('Main store created.');
//         });
//       }
//     });
//   };
  
//   module.exports = { ensureMainStoreExists };

const getMainStoreId = (db, callback) => {
  const query = 'SELECT id FROM Stores WHERE is_main_store = TRUE';
  db.query(query, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      callback(results[0].id);
    } else {
      callback(null); // No main store found
    }
  });
};

const ensureMainStoreExists = (db) => {
  const query = 'SELECT COUNT(*) AS count FROM Stores WHERE is_main_store = TRUE';
  db.query(query, (err, results) => {
    if (err) throw err;

    const storeCount = results[0].count;
    if (storeCount === 0) {
      const storeId = 'LIZASO-' + new Date().getTime(); // Unique store ID starting with LIZASO

      const insertStoreQuery = `INSERT INTO Stores 
        (store_id, store_name, store_address, store_contact, is_main_store, date_created) 
        VALUES (?, 'Main Store', 'Main Address', 'Main Contact', TRUE, NOW())`;

      db.query(insertStoreQuery, [storeId], (err) => {
        if (err) throw err;
        console.log('Main store created.');
      });
    }
  });
};

module.exports = { ensureMainStoreExists, getMainStoreId };

  