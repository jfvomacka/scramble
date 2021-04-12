const {pool} = require("../../db");

module.exports = async (login_id_FROM) => {
  try {
    const newMatchResult = await pool.query(
      `SELECT * FROM app_match WHERE user1 = $1 OR user2 = $2`,
      [login_id_FROM, login_id_FROM]
    );

    
    return newMatchResult;

  } catch (error) {
    throw error;
  }
};
