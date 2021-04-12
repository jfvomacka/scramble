const {pool} = require("../../db");

module.exports = async (school) => {
  try {
    const newSearchResult = await pool.query(
      `SELECT * FROM app_user WHERE school = $1 LIMIT *`,
      [school]
    );
    
    return newSearchResult;

  } catch (error) {
    throw error;
  }
};
