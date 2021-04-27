const {pool} = require("../../db");

module.exports = async (email) => {
  try {
    const queryResult = await pool.query(
      `SELECT * FROM app_user WHERE email = $1 LIMIT 1 `,
      [email]
    );
    return queryResult.rows.length > 0 ? queryResult.rows[0] : null;
  } catch (error) {
    throw error;
  }
};
