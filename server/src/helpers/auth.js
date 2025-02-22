import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

// Function to generate a password salt
export const generatePasswordSalt = () => {
  return bcrypt.genSalt(12);
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
