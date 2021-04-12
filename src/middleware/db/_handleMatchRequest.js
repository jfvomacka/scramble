const {pool} = require("../../db");

module.exports = async (login_id_FROM, login_id_TO) => {
  try {
    const newMatchResult = await pool.query(
      
      // match requests are made TO one user FROM another user
      // TO = "target user," FROM = user that makes request
      
      `SELECT * FROM app_request WHERE login_id_TO = $1 LIMIT 1 `,
      [login_id_FROM]
    );

    if(newMatchResult.rows.length > 0) {

      // TO has already made a request to FROM: match now exists
      const deleteMatchedRequest = await pool.query(
        `DELETE FROM app_request WHERE login_id_TO = $1 LIMIT 1 `,
        [login_id_FROM]
      );

      // Add to match table
      const newMatch = await pool.query(
        'INSERT INTO app_match (user1, user2) VALUES ($1, $2) RETURNING *',
        [login_id_FROM, login_id_TO]
      );

      // Return something to signal that the match has been made?
      return true;
    }
    
    // Match does not currently exist: create new outgoing request
    const newMatchRequest = await pool.query(
      `INSERT INTO app_request (login_id_FROM, login_id_TO) VALUES ($1, $2) RETURNING *`,
      [login_id_FROM, login_id_TO]
    );

    // Return something to signify that a match has NOT been made?
    return false;

    //return newUserAdd.rows[0];
  } catch (error) {
    throw error;
  }
};
