const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

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

    return userListResult[0];
  }
};

exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();
  
  return userResult[0];
};

exports.getProfile = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectProfile(connection, userId);

  connection.release();
  
  return userResult[0];
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (phonenum) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, phonenum);
  connection.release();

  return userAccountResult;
};

exports.phonenumCheck = async function (phonenum) {
  const connection = await pool.getConnection(async (conn) => conn);
  const phoenumCheckResult = await userDao.selectUserPhonenum(connection, phonenum);
  connection.release();

  return phoenumCheckResult;
};

exports.statusCheck = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const statusCheckResult = await userDao.selectStatusCheck(connection, userId);
  connection.release();

  return statusCheckResult;
};

exports.authnumCheck = async function (phonenum) {
  const connection = await pool.getConnection(async (conn) => conn);
  const authnumResult = await userDao.authnumCheck(connection, phonenum);
  connection.release();

  return authnumResult;
};