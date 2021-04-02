const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const noticeDao = require("./noticeDao");

// Provider: Read 비즈니스 로직 처리


exports.retrieveNoticeById = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const noticeResult = await noticeDao.selectNotice(connection, userId);

  connection.release();

  return noticeResult;
};
