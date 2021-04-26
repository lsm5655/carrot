const { response } = require("express");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const goodsDao = require("./goodsDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveGoodsList = async function (goodsStatus, page, pageSize) {


  
  // try {
  //   let start = 0;

  //   if (page <= 0) {
  //     page = 1;
  //   } else {
  //     start = (page - 1) * pageSize;
  //   }

  //   // const cnt = await goodsDao.selectGoodsCnt(connection);
  //   // console.log(cnt[0].count);
  //   // if (page > Math.round(cnt[0].count / pageSize)) {
  //   //   return null;
  //   // }

  //   if (!goodsStatus) {
  //     console.log('!goodsStatus')
  //     const connection = await pool.getConnection(async (conn) => conn);
  //     const goodsListResult = await goodsDao.selectGoodsList(connection, start, pageSize);
  //     connection.release();
  
  //     return goodsListResult;
  
  //   } else {
  //     console.log('goodsStatus')
  //     const connection = await pool.getConnection(async (conn) => conn);
  //     const goodsListResult = await goodsDao.selectGoodsStatus(connection, goodsStatus, start, pageSize);
  //     connection.release();
  
  //     return goodsListResult;
  //   }

  // } catch (err) {
  //   console.log('상품 정보 가져오기 실패.', err);
  //   throw err;

  //}

  let start = 0;

    if (page <= 0) {
      page = 1;
    } else {
      start = (page - 1) * pageSize;
    }
    console.log('start: ', start);
    const connection = await pool.getConnection(async (conn) => conn);
    const goodsListResult = await goodsDao.selectGoodsList(connection, start, pageSize);
    connection.release();
  
    return goodsListResult;
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
