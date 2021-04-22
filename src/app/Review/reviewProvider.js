const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");

// Provider: Read 비즈니스 로직 처리


exports.retrieveReviewById = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const reviewResult = await reviewDao.selectReview(connection, userId);

  connection.release();

  return reviewResult;
};

exports.reviewCheck = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const reviewResult = await reviewDao.checkReview(connection, userId);

  connection.release();

  return reviewResult;
};

exports.reviewCheckBygoodsId = async function (userId, goodsId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const reviewResult = await reviewDao.checkReviewBygoodsId(connection, userId);

  connection.release();

  return reviewResult;
};
