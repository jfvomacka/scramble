const {pool} = require("../../db");

module.exports = async (login_id_FROM, login_id_TO) => {
  try {

    const existingRequest = await pool.query(
      
      // match requests are made TO one user FROM another user
      // TO = "target user," FROM = user that makes request
      
      `SELECT * FROM app_request WHERE login_id_TO = $1 AND login_id_FROM = $2 LIMIT 1 `,
      [login_id_FROM, login_id_TO]
    );

    const existingMatch = await pool.query(
      `SELECT * FROM app_match WHERE (user1 = $1 AND user2 = $2) OR (user1 = $3 AND user2 = $4)`,
      [login_id_FROM, login_id_TO, login_id_TO, login_id_FROM]
    )

    console.log(existingRequest);
    console.log(existingMatch);

    if(existingRequest.rows.length > 0 && existingMatch.rows.length == 0) {

      // TO has already made a request to FROM: match now exists
      const deleteMatchedRequest = await pool.query(
        `DELETE FROM app_request WHERE login_id_TO = $1 AND login_id_FROM = $2`,
        [login_id_FROM, login_id_TO]
      );

      // Add to match table
      const newMatch = await pool.query(
        'INSERT INTO app_match (user1, user2) VALUES ($1, $2)',
        [login_id_FROM, login_id_TO]
      );

      // Return something to signal that the match has been made?
      return true;
    }

    const existingRequestReverse = await pool.query(
      
      // match requests are made TO one user FROM another user
      // TO = "target user," FROM = user that makes request
      
      `SELECT * FROM app_request WHERE login_id_TO = $2 AND login_id_FROM = $1 LIMIT 1 `,
      [login_id_FROM, login_id_TO]
    );

    console.log(existingRequestReverse);
    
    if(existingMatch.rows.length == 0 && existingRequestReverse.rows.length == 0) {
      // Match does not currently exist: create new outgoing request
      const newMatchRequest = await pool.query(
        `INSERT INTO app_request (login_id_FROM, login_id_TO) VALUES ($1, $2)`,
        [login_id_FROM, login_id_TO]
      );
    }
    

    // Return something to signify that a match has NOT been made?
    return false;

  } catch (error) {
    throw error;
  }
};
