const {pool} = require("../../db");

module.exports = async (login_id, verification) => {
  try {
    const userVerification = await pool.query(
      `UPDATE app_user SET verified = ($1) WHERE login_id = ($2) AND verification = ($3)`,
      [true, login_id, verification]
    );

    console.log(userVerification);

    return userVerification;
  } catch (error) {
    throw error;
  }
};
