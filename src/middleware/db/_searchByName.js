const {pool} = require("../../db");

module.exports = async (name) => {
  try {
    const newSearchResult = await pool.query(
      `SELECT * FROM app_user WHERE name_ = $1`,
      [name]
    );
    
    return newSearchResult;

  } catch (error) {
    throw error;
  }
};
