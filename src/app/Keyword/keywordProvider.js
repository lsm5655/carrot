const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const keywordDao = require("./keywordDao");

// Provider: Read 비즈니스 로직 처리


exports.retrieveKeywordById = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const keywordResult = await keywordDao.selectKeyword(connection, userId);

  connection.release();

  return keywordResult;
};
