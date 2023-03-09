const { database } = require('./dataSource');
const { raiseCustomError } = require('../utils/error');

const createUser = async (email, hashedPassword, name, phonenumber) => {
  try {
    return await database.query(
      `INSERT INTO users(
        email, 
        password, 
        name, 
        phone_number
        ) 
      VALUES (?, ?, ?, ?);
      `,
      [email, hashedPassword, name, phonenumber]
    );
  } catch (err) {
    raiseCustomError('INVALID_DATA_INPUT', 400);
  }
};

const getUserById = async (id) => {
  const result = await database.query(
    `
		SELECT 
			id,
			name,
			email,
			password
		FROM users
		WHERE id=?`,
    [id]
  );

  return result[0];
};

const signIn = async (email) => {
  try {
    return await database.query(
      `SELECT
        id, 
        email,
        password
      FROM
        users
      WHERE
        email = ?`,
      [email]
    );
  } catch (err) {
    raiseCustomError('INVALID_DATA_INPUT', 400);
  }
};

const getUserByEmail = async (email) => {
  try {
    const [user] = await database.query(
      `
      SELECT *
      FROM 
        users u
      WHERE
        u.email = ?`,
      [email]
    );

    return user;
  } catch (err) {
    raiseCustomError('INVALID_DATA_INPUT', 400);
  }
};

module.exports = {
  createUser,
  getUserById,
  signIn,
  getUserByEmail,
};
