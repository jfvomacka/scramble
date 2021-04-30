const {pool} = require("../../db");

module.exports = async (major) => {
  try {
    const newSearchResult = await pool.query(
      `SELECT * FROM app_user WHERE major ILIKE $1`,
      [major]
    );
    
    return newSearchResult;

  } catch (error) {
    throw error;
  }
};
