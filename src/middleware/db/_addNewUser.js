const {pool} = require("../../db");

module.exports = async (login_id, hashed_password, first_name, last_name, email, verification) => {
  try {
    const newUserAdd = await pool.query(
      `INSERT INTO app_user (login_id, hashed_password, first_name, last_name, email, verification, verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [login_id, hashed_password, first_name, last_name, email, verification, false]
    );

    return newUserAdd.rows[0];
  } catch (error) {
    throw error;
  }
};
