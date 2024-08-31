export const handleCheckUsername = async (req, res, db) => {
  const { username } = req.body;

  try {
    // Query the database to find the username
    const query = "SELECT * FROM Customer WHERE c_username = ?";
    const [rows] = await db.execute(query, [username]);

    // Check if any rows are returned, which means the username exists
    if (rows.length > 0) {
      return res
        .status(200)
        .json({ message: `Username '${username}' already exists.` });
    } else {
      return res
        .status(200)
        .json({ message: `Username '${username}' is available.` });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
