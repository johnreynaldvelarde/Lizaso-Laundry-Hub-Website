const bcrypt = require('bcrypt');
const { getMainStoreId } = require('./storeService');

// const createDefaultAdmin = async (db) => {
//   const query = 'SELECT COUNT(*) AS count FROM User_Account';
//   db.query(query, async (err, results) => {
//     if (err) throw err;

//     const userCount = results[0].count;
//     if (userCount === 0) {
//       const username = 'admin';
//       const firstName = 'Admin';
//       const lastName = 'User';
//       const email = 'admin@example.com';
//       const password = 'admin123';
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const passwordSalt = await bcrypt.genSalt(10);

//       const insertAccountQuery = `INSERT INTO User_Account 
//         (username, first_name, last_name, email, isRole, isOnline, isStatus, date_created) 
//         VALUES (?, ?, ?, ?, 0, FALSE, TRUE, NOW())`;

//       db.query(insertAccountQuery, [username, firstName, lastName, email], (err, accountResults) => {
//         if (err) throw err;

//         const userId = accountResults.insertId;

//         const insertSecurityQuery = `INSERT INTO User_Security 
//           (user_id, password, password_salt, mfa_enabled, failed_login_attempts, account_locked) 
//           VALUES (?, ?, ?, FALSE, 0, FALSE)`;

//         db.query(insertSecurityQuery, [userId, hashedPassword, passwordSalt], (err) => {
//           if (err) throw err;
//           console.log('Default admin account created.');
//         });
//       });
//     }
//   });
// };

const createDefaultAdmin = async (db) => {
  const query = 'SELECT COUNT(*) AS count FROM User_Account';
  db.query(query, async (err, results) => {
    if (err) throw err;

    const userCount = results[0].count;
    if (userCount === 0) {
      const username = 'admin';
      const firstName = 'Admin';
      const lastName = 'User';
      const email = 'admin@example.com';
      const password = 'admin123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const passwordSalt = await bcrypt.genSalt(10);

      getMainStoreId(db, (storeId) => {
        if (storeId) {
          const insertAccountQuery = `INSERT INTO User_Account 
            (username, first_name, last_name, email, isRole, isOnline, isStatus, date_created, store_id) 
            VALUES (?, ?, ?, ?, 0, FALSE, TRUE, NOW(), ?)`;

          db.query(insertAccountQuery, [username, firstName, lastName, email, storeId], (err, accountResults) => {
            if (err) throw err;

            const userId = accountResults.insertId;

            const insertSecurityQuery = `INSERT INTO User_Security 
              (user_id, password, password_salt, mfa_enabled, failed_login_attempts, account_locked) 
              VALUES (?, ?, ?, FALSE, 0, FALSE)`;

            db.query(insertSecurityQuery, [userId, hashedPassword, passwordSalt], (err) => {
              if (err) throw err;
              console.log('Default admin account created.');
            });
          });
        } else {
          console.log('No main store found, cannot create default admin.');
        }
      });
    }
  });
};

const handleLogin = async (req, res, db) => {
  const { username, password } = req.body;

  const userAccountQuery = 'SELECT * FROM User_Account WHERE username = ?';
  db.query(userAccountQuery, [username], async (err, userAccountResults) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (userAccountResults.length > 0) {
      const user = userAccountResults[0];

      const userSecurityQuery = 'SELECT * FROM User_Security WHERE user_id = ?';
      db.query(userSecurityQuery, [user.id], async (err, secResults) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });

        if (secResults.length > 0) {
          const userSecurity = secResults[0];
          const passwordMatch = await bcrypt.compare(password, userSecurity.password);

          if (passwordMatch) {
            const userType = user.isRole === 0 ? 'Admin' : (user.isRole === 1 ? 'User' : 'Delivery');
            res.json({ success: true, userType });
          } else {
            res.json({ success: false, message: 'Invalid username or password.' });
          }
        } else {
          res.json({ success: false, message: 'User not found.' });
        }
      });
    } else {
      const customerQuery = 'SELECT * FROM Customers WHERE c_username = ?';
      db.query(customerQuery, [username], async (err, customerResults) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });

        if (customerResults.length > 0) {
          const customer = customerResults[0];
          const passwordMatch = await bcrypt.compare(password, customer.c_password);

          if (passwordMatch) {
            res.json({ success: true, userType: 'Customer' });
          } else {
            res.json({ success: false, message: 'Invalid username or password.' });
          }
        } else {
          res.json({ success: false, message: 'User not found.' });
        }
      });
    }
  });
};

module.exports = { createDefaultAdmin, handleLogin };
