const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const interestDao = require("./interestDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveInterestGoodsById = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const interestGoodsResult = await interestDao.selectInterestGoodsId(connection, userId);

  connection.release();

  return interestGoodsResult;
};

exports.searchInterestGoodsById = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const categorynameCheckResult = await interestDao.selectInterstGoodsuserId(connection, userId);
  connection.release();

  return categorynameCheckResult;
};


exports.searchInterestGoodsBygoodsId = async function (goodsID) {

  const connection = await pool.getConnection(async (conn) => conn);
  const categorynameCheckResult = await interestDao.selectInterstGoodsgoodsId(connection, goodsID);
  connection.release();

  return categorynameCheckResult;
};
