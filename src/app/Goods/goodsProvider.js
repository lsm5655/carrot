const { response } = require("express");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const goodsDao = require("./goodsDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveGoodsList = async function (goodsStatus) {
  if (!goodsStatus) {
    const connection = await pool.getConnection(async (conn) => conn);
    const goodsListResult = await goodsDao.selectGoodsList(connection);
    connection.release();

    return goodsListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const goodsListResult = await goodsDao.selectGoodsStatus(connection, goodsStatus);
    connection.release();

    return goodsListResult;
  }
};

exports.retrieveGoodsListByUser = async function (userId, goodsStatus) {
  if (!goodsStatus) {
    const connection = await pool.getConnection(async (conn) => conn);
    const goodsListResult = await goodsDao.selectGoodsListByUser(connection, userId);
    connection.release();

    return goodsListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const goodsListResult = await goodsDao.selectGoodsStatusByUser(connection, userId, goodsStatus);
    connection.release();

    return goodsListResult;
  }
};

exports.retrieveGoodsById = async function (goodsId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const goodsResult = await goodsDao.selectGoodsId(connection, goodsId);

  connection.release();

  return goodsResult;
};

exports.retrieveGoodsView = async function (goodsId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const goodsviewResult = await goodsDao.selectGoodsViewId(connection, goodsId);

  connection.release();

  return goodsviewResult;
};


exports.retrieveGoodsByUserId = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const goodsResult = await goodsDao.selectGoodsIdByUserId(connection, userId);

  connection.release();

  return goodsResult;
};

exports.selectUserById = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const goodsResult = await goodsDao.selectuserBygoodsId(connection, userId);

  connection.release();

  return goodsResult;
};
