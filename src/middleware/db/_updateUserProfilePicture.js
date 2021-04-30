const {pool} = require("../../db");

module.exports = async (login_id, uuid) => {
  try {

    const newUserUpdate = await pool.query(
      `UPDATE app_user SET photo_id = ($1) WHERE login_id = ($2)`,
      [uuid, login_id]
    );

    return newUserUpdate.rows[0];
  } catch (error) {
    throw error;
  }
};
