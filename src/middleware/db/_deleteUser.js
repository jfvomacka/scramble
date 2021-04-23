const {pool} = require("../../db");

module.exports = async (login_id, hashed_password, first_name, last_name, email, verification) => {
  try {
    const userDelete = await pool.query(
      `DELETE FROM app_user WHERE login_id = ($1)`,
      [login_id]
    );
    
    return userDelete;
  } catch (error) {
    throw error;
  }
};
