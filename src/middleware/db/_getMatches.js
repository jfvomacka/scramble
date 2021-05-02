const {pool} = require("../../db");

module.exports = async (login_id_FROM) => {
  try {
    const newMatchResult = await pool.query(
      `SELECT * FROM app_match WHERE user1 = $1 OR user2 = $2`,
      [login_id_FROM, login_id_FROM]
    );

    let matches = [];

    for(var i = 0; i < newMatchResult.rowCount; i++) {
      
      let login_id = newMatchResult.rows[i].user1 === login_id_FROM ? newMatchResult.rows[i].user2 : newMatchResult.rows[i].user1;

      const newMatch = await pool.query(
        `SELECT * FROM app_user WHERE login_id = $1`,
        [login_id]
      );
      
      const match = {
        first_name: newMatch.rows[0].first_name,
        last_name: newMatch.rows[0].last_name,
        school: newMatch.rows[0].school,
        major: newMatch.rows[0].major,
        contact: newMatch.rows[0].contact_info,
        photo_id: newMatch.rows[0].photo_id
      };
      matches.push(match);
    }
    
    return matches;

  } catch (error) {
    throw error;
  }
};
