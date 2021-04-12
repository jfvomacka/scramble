const {pool} = require("../../db");

module.exports = async (major) => {
  try {
    const newSearchResult = await pool.query(
      `SELECT * FROM app_user WHERE major = $1 LIMIT *`,
      [major]
    );
    
    return newSearchResult;

  } catch (error) {
    throw error;
  }
};
