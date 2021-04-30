const {pool} = require("../../db");

module.exports = async (firstName, lastName) => {
  try {

    var query = `SELECT * FROM app_user WHERE first_name ILIKE $1`;
    var terms = [ firstName ];
    if(lastName !== "*") {
      query += ` AND last_name ILIKE $2`
      terms = [ firstName, lastName ]
    }
    else {
      query += ` OR last_name ILIKE $1`
    }

    const newSearchResult = await pool.query(
      query,
      terms
    );
    
    return newSearchResult;

  } catch (error) {
    throw error;
  }
};
