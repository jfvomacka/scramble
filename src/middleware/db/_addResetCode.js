const {pool} = require("../../db");

module.exports = async (login_id, reset_code) => {
  try {

    const newUserUpdate = await pool.query(
      `UPDATE app_user SET reset_code = ($1) WHERE login_id = ($2)`,
      [reset_code, login_id]
    );

    return newUserUpdate.rows[0];
  } catch (error) {
    throw error;
  }
};
