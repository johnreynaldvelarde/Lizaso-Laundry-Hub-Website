import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const handleLogin = async (req, res, db) => {
  const { username, password } = req.body;
  try {
    // Check User_Account table
    const [userAccountResults] = await db.query('SELECT * FROM User_Account WHERE username = ?', [username]);

    if (userAccountResults.length > 0) {
      const user = userAccountResults[0];
      const [secResults] = await db.query('SELECT * FROM User_Security WHERE user_id = ?', [user.id]);

      if (secResults.length > 0) {
        const userSecurity = secResults[0];
        const passwordMatch = await bcrypt.compare(password, userSecurity.password);

        if (passwordMatch) {

          const fullName = `${user.first_name} ${user.last_name}`;

          // Generate JWT token
          const token = jwt.sign(
            { 
              id: user.id, 
              username: user.username, 
              fullName: fullName,  // Include full name in the token payload
              role: user.isRole 
            }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
          );
          const userType = user.isRole === 0 ? 'Admin' : (user.isRole === 1 ? 'User' : 'Delivery');
          res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            maxAge: 86400000 // 24 hours in milliseconds
            // maxAge: 3600000 // 1 hour
          })
          // res.cookie('token', token);
          return res.json({ success: true, userType, token });
        } else {
          return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
      } else {
        return res.status(404).json({ success: false, message: 'User not found in security table.' });
      }
    } else {
      // Check Customers table
      const [customerResults] = await db.query('SELECT * FROM Customers WHERE c_username = ?', [username]);

      if (customerResults.length > 0) {
        const customer = customerResults[0];
        const passwordMatch = await bcrypt.compare(password, customer.c_password);

        if (passwordMatch) {
          // Generate JWT token for customer
          const token = jwt.sign({ id: customer.id, username: customer.c_username, role: 'Customer' }, JWT_SECRET, { expiresIn: '1h' });
          res.cookie('token', token);
          return res.json({ success: true, userType: 'Customer', token });
        } else {
          return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
      } else {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
    }
  } catch (err) {
    console.error('Error handling login:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const handleRegister = async (req, res, db) => {
  try {
    const { c_firstname, c_middlename, c_lastname, c_username, c_password, isAgreement } = req.body;

    // Check if username already exists
    const [existingUser] = await db.query('SELECT * FROM Customers WHERE c_username = ?', [c_username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(c_password, 10);

    // Insert new customer into the database
    await db.query(
      'INSERT INTO Customers (c_firstname, c_middlename, c_lastname, c_username, c_password, isAgreement, date_created) VALUES (?, ?, ?, ?, ?, ?, NOW() )',
      [c_firstname, c_middlename, c_lastname, c_username, hashedPassword, isAgreement]
    );

    res.status(201).json({ success: true, message: 'Customer registered successfully' });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
