const {pool} = require("../../db");

module.exports = async (name) => {
  try {
    const newSearchResult = await pool.query(
      `SELECT * FROM app_user WHERE name = $1 LIMIT *`,
      [name]
    );
    
    return newSearchResult;

  } catch (error) {
    throw error;
  }
};