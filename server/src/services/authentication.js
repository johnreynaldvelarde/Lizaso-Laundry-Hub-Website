import jwt from "jsonwebtoken";
import {
  comparePassword,
  generatePasswordSalt,
  hashPassword,
} from "../helpers/auth.js";

const createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
};

//#POST SECTION
export const handleLoginMobile = async (req, res, db) => {
  const { username, password } = req.body;

  try {
    await db.beginTransaction();

    const [users] = await db.query(
      "SELECT * FROM Users_Account WHERE username = ? AND user_type IN ('Customer', 'Delivery_Staff')",
      [username]
    );

    if (users.length === 0) {
      await db.rollback();
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    const [userSecurities] = await db.query(
      "SELECT * FROM Users_Security WHERE user_id = ?",
      [user.id]
    );

    if (userSecurities.length === 0) {
      await db.rollback();
      return res.status(200).json({
        success: false,
        message: "User security information not found",
      });
    }
    const userSecurity = userSecurities[0];

    // Verify the password
    const isPasswordValid = await comparePassword(
      password,
      userSecurity.password
    );

    if (!isPasswordValid) {
      await db.rollback();
      return res.status(200).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Check if the account is locked or not
    if (userSecurity.account_locked) {
      await db.rollback();
      return res.status(200).json({
        success: false,
        message: "Account is locked",
      });
    }

    // Update last login time in Users_Security table
    await db.query(
      "UPDATE Users_Security SET last_login = NOW() WHERE user_id = ?",
      [user.id]
    );

    await db.query("UPDATE Users_Account SET isOnline = TRUE WHERE id = ?", [
      user.id,
    ]);

    await db.commit();

    // Generate JWT token
    const accessToken = createToken(
      {
        userId: user.id,
        username: user.username,
        userType: user.user_type,
      },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.JWT_EXPIRES_IN
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    await db.rollback();
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  } finally {
    if (db) db.release();
  }
};

//   user: {
//     id: user.id,
//     store_id: user.store_id,
//     address_id: user.address_id,
//     username: user.username,
//     mobile_number: user.mobile_number,
//     first_name: user.first_name,
//     middle_name: user.middle_name,
//     last_name: user.last_name,
//     full_name: `${user.first_name} ${
//       user.middle_name ? user.middle_name + " " : ""
//     }${user.last_name}`,
//     user_type: user.user_type,
//   },

export const handleRegisterCustomer = async (req, res, db) => {
  const {
    firstname,
    middlename,
    lastname,
    username,
    password,
    isAgreement,
    email,
    mobile_number,
  } = req.body;

  try {
    const [existingUser] = await db.execute(
      `
        SELECT * FROM Users_Account 
        WHERE username = ? 
        LIMIT 1
        `,
      [username]
    );

    if (existingUser.length > 0) {
      return res
        .status(200)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const passwordSalt = await generatePasswordSalt();

    await db.beginTransaction();

    const [customerResult] = await db.execute(
      `
        INSERT INTO Users_Account 
        (store_id, address_id, username, email, mobile_number, first_name, middle_name, last_name, user_type, isAgreement, isOnline, isStatus, isArchive, date_created)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `,
      [
        null,
        null,
        username,
        email,
        mobile_number,
        firstname,
        middlename,
        lastname,
        "Customer",
        isAgreement,
        false,
        true,
        false,
      ]
    );

    const userId = customerResult.insertId;

    console.log(userId);

    const [securityResult] = await db.execute(
      `
        INSERT INTO Users_Security
        (user_id, password, password_salt, mfa_enabled, mfa_secret, failed_login_attempts, account_locked, lockout_time, last_login, last_logout, last_password_change)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [
        userId,
        hashedPassword,
        passwordSalt,
        false,
        null,
        0,
        false,
        null,
        null,
        null,
        null,
      ]
    );

    await db.commit();

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
    });
  } catch (error) {
    await db.rollback();
    console.error("Error registering customer:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  } finally {
    if (db) db.release();
  }
};

//#GET SECTION
export const getUserMobileDetails = async (req, res, db) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const { userId } = decoded;

  console.log(userId);

  try {
    const [userAccountResults] = await db.query(
      "SELECT id, store_id, address_id, username, mobile_number, first_name, middle_name, last_name, user_type FROM Users_Account WHERE id = ?",
      [userId]
    );

    if (userAccountResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = userAccountResults[0];

    const userDetails = {
      id: user.id,
      store_id: user.store_id,
      address_id: user.address_id,
      username: user.username,
      mobile_number: user.mobile_number,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      full_name: `${user.first_name} ${
        user.middle_name ? user.middle_name + " " : ""
      }${user.last_name}`,
      user_type: user.user_type,
    };

    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (db) db.release();
  }
};

export const handleCheckCustomerDetailsMobile = async (req, res, db) => {
  const { id } = req.params;

  try {
    await db.beginTransaction();

    const [user] = await db.query(
      "SELECT store_id, address_id FROM Users_Account WHERE id = ?",
      [id]
    );

    if (user.length > 0) {
      const customer = user[0];

      const storeIdIsNull = customer.store_id === null;
      const addressIdIsNull = customer.address_id === null;

      await db.commit();

      return res.status(200).json({
        success: true,
        data: {
          storeIdIsNull,
          addressIdIsNull,
        },
      });
    } else {
      await db.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
  } catch (error) {
    await db.rollback();
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (db) db.release();
  }
};
