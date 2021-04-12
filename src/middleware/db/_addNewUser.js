const {pool} = require("../../db");

module.exports = async (login_id, hashed_password, name, school, major) => {
  try {
    const newUserAdd = await pool.query(
      `INSERT INTO app_user (login_id, hashed_password, name_, school, major) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [login_id, hashed_password, name, school, major]
    );

    return newUserAdd.rows[0];
  } catch (error) {
    throw error;
  }
};
