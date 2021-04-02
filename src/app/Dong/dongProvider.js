const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const dongDao = require("./dongDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (phonenum) {
  if (!phonenum) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserPhonenum(connection, phonenum);
    connection.release();

    return userListResult;
  }
};

exports.retrieveDong = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const dongResult = await dongDao.selectDongId(connection, userId);

  connection.release();

  return dongResult[0];
};

exports.retrieveDongList = async function (dongname) {
    if (!dongname) {
      const connection = await pool.getConnection(async (conn) => conn);
      const dongListResult = await dongDao.selectDong(connection);
      connection.release();
  
      return dongListResult;
  
    } else {
      const connection = await pool.getConnection(async (conn) => conn);
      const dongListResult = await dongDao.selectDongName(connection, dongname);
      connection.release();
  
      return dongListResult;
    }
  };
  