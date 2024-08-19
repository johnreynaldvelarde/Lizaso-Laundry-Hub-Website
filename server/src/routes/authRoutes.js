import express from 'express';
import { getPool } from '../db/dbConfig.js';
import { handleRegister, handleLogin,  handleRefreshToken, getUserDetails  } from '../services/authService.js';

const router = express.Router();

// Middleware to manage database connection
const withDatabaseConnection = (handler) => async (req, res) => {
  const pool = await getPool();
  const connection = await pool.getConnection();
  try {
    await handler(req, res, connection);
  } catch (error) {
    console.error('Database operation error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    connection.release();
  }
};

// Login route
router.post('/login', withDatabaseConnection(async (req, res, connection) => {
  await handleLogin(req, res, connection);
}));

// Register route
router.post('/register', withDatabaseConnection(async (req, res, connection) => {
  await handleRegister(req, res, connection);
}));

// Get user details route
router.get('/user/me', withDatabaseConnection(async (req, res, connection) => {
  await getUserDetails(req, res, connection);
}));

// Refresh token route
router.post('/refresh-token', (req, res) => {
  handleRefreshToken(req, res);
});























// // Login route
// router.post('/login', withDatabaseConnection(async (req, res, connection) => {
//   try {
//     await handleLogin(req, res, connection);
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }));

// // Register route
// router.post('/register', withDatabaseConnection(async (req, res, connection) => {
//   try {
//     await handleRegister(req, res, connection);
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }));

// // Get user details route
// router.get('/user/me', withDatabaseConnection(async (req, res, connection) => {
//   try {
//     const userDetails = await getUserDetails(req, res, connection);
//     // No additional response here
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     // Error handling here
//   }
// }));




// router.get('/user/me', withDatabaseConnection(async (req, res, connection) => {
//   try {
//     const userDetails = await getUserDetails(req, res, connection);
//     res.status(200).json({ success: true, user: userDetails });
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// }));




// // Login route
// router.post('/login', withDatabaseConnection(async (req, res, connection) => {
//   await handleLogin(req, res, connection);
// }));

// // Register route
// router.post('/register', withDatabaseConnection(async (req, res, connection) => {
//   await handleRegister(req, res, connection);
// }));

// // Get user details route
// router.get('/user/me', withDatabaseConnection(async (req, res, connection) => {
//   await getUserDetails(req, res, connection);
// }));








// Refresh token route
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Validate and refresh token
    await handleRefreshToken(req, res, refreshToken);
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;



// router.get('/user/me', authenticateToken, withDatabaseConnection(async (req, res, connection) => {
//   const userId = req.user.userId; // Assuming authenticateToken middleware adds userId to req.user

//   // Fetch user details from User_Account table
//   const [userAccountResults] = await connection.query('SELECT fullName, username FROM User_Account WHERE id = ?', [userId]);

//   if (userAccountResults.length > 0) {
//     const user = userAccountResults[0];
//     return res.status(200).json(user);
//   } else {
//     return res.status(404).json({ message: 'User not found' });
//   }
// }));


// import express from 'express';
// import { getPool } from '../db/dbConfig.js';
// import { handleRegister, handleLogin } from '../services/authService.js';

// const router = express.Router();

// // for login
// router.post('/login', async (req, res) => {
//   const pool = await getPool();
//   const connection = await pool.getConnection();
//   try {
//     await handleLogin(req, res, connection);
//   } catch (error) {
//     console.error('Error handling login:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     connection.release();
//   }
// });

// // for register
// router.post('/register', async (req, res) => {
//   const pool = await getPool();
//   const connection = await pool.getConnection();
//   try {
//     await handleRegister(req, res, connection);
//   } catch (error) {
//     console.error('Error handling register:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     connection.release();
//   }
// });

// export default router;

// const veriftyUser = (req, res, next) => {
//   const token = req.coookies.token
// }

// // for verfiying the user
// router.get('/', veriftyUser, async (req, res) => {
//   // return res.json({Status: "Success", name: req.name});
 
// });

// admin side

// customer side

// update customer information
// router.post('/update-customer', async (req, res) => {
//   const pool = await getPool();
//   const connection = await pool.getConnection();
//   try {
    
//   } catch (error) {
//     console.error('Error handling update customer information:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     connection.release();
//   }
// });
