import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/auth.js';


const createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// export const handleLogin = async (req, res, db) => {
//   const { username, password } = req.body;

//   try {
//     // Check User_Account table
//     const [userAccountResults] = await db.query('SELECT * FROM User_Account WHERE username = ?', [username]);
//     if (userAccountResults.length > 0) {
//       const user = userAccountResults[0];
//       const [secResults] = await db.query('SELECT * FROM User_Security WHERE user_id = ?', [user.id]);

//       if (secResults.length > 0) {
//         const userSecurity = secResults[0];
//         const passwordMatch = await comparePassword(password, userSecurity.password);

//         if (passwordMatch) {
//           const fullName = `${user.first_name} ${user.last_name}`;
//           const userType = user.isRole === 0 ? 'Admin' :
//                            (user.isRole === 1 ? 'Manager' : 
//                            (user.isRole === 2 ? 'Staff' : 'Delivery Staff'));

//           // Generate JWT tokens
//           const accessToken = createToken({ userId: user.id, fullName, username, userType }, process.env.ACCESS_TOKEN_SECRET, process.env.JWT_EXPIRES_IN);
//           const refreshToken = createToken({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);

//           // Set the refresh token in an HTTP-only cookie
//           res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
//             sameSite: 'Strict', // Adjust as needed
//           });

//           // Respond with access token and user type
//           return res.status(200).json({ 
//             success: true, 
//             userType, 
//             accessToken
//           });
//         } else {
//           return res.status(401).json({ success: false, message: 'Invalid username or password.' });
//         }
//       } else {
//         return res.status(404).json({ success: false, message: 'User not found in security table.' });
//       }
//     } else {
//       // Check Customers table
//       const [customerResults] = await db.query('SELECT * FROM Customers WHERE c_username = ?', [username]);

//       if (customerResults.length > 0) {
//         const customer = customerResults[0];
//         const passwordMatch = await comparePassword(password, customer.c_password);

//         if (passwordMatch) {
//           // Generate JWT tokens
//           const accessToken = createToken({ userId: customer.id, userType: 'Customer' }, process.env.ACCESS_TOKEN_SECRET, process.env.JWT_EXPIRES_IN);
//           const refreshToken = createToken({ userId: customer.id }, process.env.REFRESH_TOKEN_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);

//           // Set the refresh token in an HTTP-only cookie
//           res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'Strict',
//           });

//           // Respond with access token and user type
//           return res.status(200).json({ 
//             success: true, 
//             userType: 'Customer', 
//             accessToken
//           });
//         } else {
//           return res.status(401).json({ success: false, message: 'Invalid username or password.' });
//         }
//       } else {
//         return res.status(404).json({ success: false, message: 'User not found.' });
//       }
//     }
//   } catch (err) {
//     console.error('Error handling login:', err);
//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

export const handleLogin = async (req, res, db) => {
  const { username, password } = req.body;

  try {
    let user, userType;

    // Check User_Account table first
    const [userAccountResults] = await db.query('SELECT * FROM User_Account WHERE username = ?', [username]);

    if (userAccountResults.length > 0) {
      user = userAccountResults[0];
      const [secResults] = await db.query('SELECT * FROM User_Security WHERE user_id = ?', [user.id]);

      if (secResults.length === 0) {
        return res.status(404).json({ success: false, message: 'User security details not found.' });
      }

      const userSecurity = secResults[0];
      const passwordMatch = await comparePassword(password, userSecurity.password);

      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password.' });
      }

      userType = user.isRole === 0 ? 'Admin' :
                (user.isRole === 1 ? 'Manager' :
                (user.isRole === 2 ? 'Staff' : 'Delivery Staff'));

      // Update isOnline status to 1
      await db.query('UPDATE User_Account SET isOnline = 1 WHERE id = ?', [user.id]);

    } else {
      // If not in User_Account, check Customers table
      const [customerResults] = await db.query('SELECT * FROM Customers WHERE c_username = ?', [username]);

      if (customerResults.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      user = customerResults[0];
      const passwordMatch = await comparePassword(password, user.c_password);

      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password.' });
      }

      userType = 'Customer';

      // Update isOnline status to 1
      await db.query('UPDATE Customers SET isOnline = 1 WHERE id = ?', [user.id]);
    }

    // Generate JWT tokens
    const accessToken = createToken({ userId: user.id, username, userType }, process.env.ACCESS_TOKEN_SECRET, process.env.JWT_EXPIRES_IN);
    const refreshToken = createToken({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);

    // Set the refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'Strict', // Adjust as needed
    });

    // Respond with access token and user type
    return res.status(200).json({
      success: true,
      userType,
      accessToken
    });

  } catch (err) {
    console.error('Error handling login:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'No refresh token provided.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = createToken({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, process.env.JWT_EXPIRES_IN);

    return res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    console.error('Error verifying refresh token:', err);
    return res.status(403).json({ success: false, message: 'Invalid refresh token.' });
  }
};


export const handleRegister = async (req, res, db) => {
  const { c_firstname, c_middlename, c_lastname, c_username, c_password, isAgreement } = req.body;

  try {
    // Check if username already exists
    const [existingUser] = await db.query('SELECT * FROM Customers WHERE c_username = ?', [c_username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(c_password);

    // Insert new customer into the database
    const [result] = await db.query(
      'INSERT INTO Customers (c_firstname, c_middlename, c_lastname, c_username, c_password, isAgreement, date_created) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [c_firstname, c_middlename, c_lastname, c_username, hashedPassword, isAgreement]
    );

    // Create a new customer object
    const newCustomer = {
      id: result.insertId,
      c_username,
      c_firstname,
      c_lastname
    };

    // // Generate access token
    // const accessToken = generateAccessToken(newCustomer);

    // // Set access token as HTTP-only cookie
    // res.cookie('auth_token', accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    // });

    // Respond with success and redirection URL
    res.status(201).json({ success: true, message: 'Customer registered successfully'});
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Utility function to decode the token
const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
};

// Revised getUserDetails function
export const getUserDetails = async (req, res, db) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  // Fetch user details from database
  const userId = decoded.userId;
  const [userAccountResults] = await db.query('SELECT * FROM User_Account WHERE id = ?', [userId]);

  if (userAccountResults.length > 0) {
    const user = userAccountResults[0];
    return res.status(200).json({
      success: true,
      user: {
        userId: user.id,
        storeId: user.store_id,
        fullName: `${user.first_name} ${user.last_name}`,
        username: user.username,
      }
    });
  } else {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
};



// export const handleRefreshToken = async (req, res, refreshToken) => {
//   try {
//     const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
//     const userId = decoded.userId;

//     // Generate a new access token
//     const accessToken = createToken({ userId }, JWT_SECRET, JWT_EXPIRES_IN);

//     return res.status(200).json({ success: true, accessToken });
//   } catch (err) {
//     console.error('Error handling refresh token:', err);
//     return res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
//   }
// };