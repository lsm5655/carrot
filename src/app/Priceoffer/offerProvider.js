const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const offerDao = require("./offerDao");

// Provider: Read 비즈니스 로직 처리


exports.retrievePriceofferById = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const priceofferResult = await offerDao.selectPriceoffer(connection, userId);

  connection.release();

  return priceofferResult;
};


exports.retrievePriceofferBygoodsId = async function (userId, goodsId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const priceofferResult = await offerDao.selectPriceofferByID(connection, userId, goodsId);

  connection.release();

  return priceofferResult;
};


exports.offerCheck = async function (goodsId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const priceofferResult = await offerDao.offercheckBygoodsID(connection, goodsId);

  connection.release();

  return priceofferResult;
};