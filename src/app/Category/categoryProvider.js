const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const categoryDao = require("./categoryDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveCategoryList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const categoryListResult = await categoryDao.selectCategory(connection);
    connection.release();

    return categoryListResult;

};

exports.retrieveCategoryById = async function (categoryId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const categoryResult = await categoryDao.selectCategoryId(connection, categoryId);

  connection.release();

  return categoryResult;
};

exports.categorynameCheck = async function (categoryname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const categorynameCheckResult = await categoryDao.selectCategoryName(connection, categoryname);
  connection.release();

  return categorynameCheckResult;
};