const {pool} = require("../../db");

module.exports = async (searchTerm) => {
  try {

    var query = `SELECT * FROM app_user ORDER BY `;
    query += searchTerm;
    query += ` ASC;`;

    console.log(query);
    const result = await pool.query(
      query
    );

    console.log(result);
    
    return result;

  } catch (error) {
    throw error;
  }
};
