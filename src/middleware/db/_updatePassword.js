const {pool} = require("../../db");

module.exports = async (login_id, hashed_password) => {
  try {

    const newUserUpdate = await pool.query(
      `UPDATE app_user SET hashed_password = ($1) WHERE login_id = ($2)`,
      [hashed_password, login_id]
    );

    return newUserUpdate.rows[0];
  } catch (error) {
    throw error;
  }
};
