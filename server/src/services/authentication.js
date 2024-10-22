import { generatePasswordSalt, hashPassword } from "../helpers/auth.js";

export const handleLoginMobile = async (req, res, db) => {
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
  }
};

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
  }
};
