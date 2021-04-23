const {pool} = require("../../db");

module.exports = async (login_id, iamge) => {
  try {

    const newUserUpdate = await pool.query(
      `UPDATE app_user SET photo = ($1) WHERE login_id = ($2)`,
      [image, login_id]
    );

    return newUserUpdate.rows[0];
  } catch (error) {
    throw error;
  }
};
