const {pool} = require("../../db");

module.exports = async (login_id, school, major, contact_info) => {
  try {

    const newUserUpdate = await pool.query(
      `UPDATE app_user SET school = ($1), major = ($2), contact_info = ($3) WHERE login_id = ($4)`,
      [school, major, contact_info, login_id]
    );

    return newUserUpdate.rows[0];
  } catch (error) {
    throw error;
  }
};
