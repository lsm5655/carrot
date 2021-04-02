const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const chatroomDao = require("./chatroomDao");

// Provider: Read 비즈니스 로직 처리


exports.retrieveChatroomById = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const chatroomResult = await chatroomDao.selectChatroom(connection, userId);

  connection.release();

  return chatroomResult;
};

