// 모든 카테고리 조회
async function selectCategory(connection) {
  const selectCategoryListQuery = `
                SELECT categoryname
                FROM category;
                `;
  const [categoryRows] = await connection.query(selectCategoryListQuery);
  return categoryRows;
}



// categoryId 회원 조회
async function selectCategoryId(connection, categoryId) {
  const selectCategoryIdQuery = `
  SELECT goods.idx, categoryname, file_index, goodsTitle, activeLocation, goods.updated_at, price
  from goods right join category c on goods.categoryIdx = c.idx
  left join goods_image gi on gi.goods_idx = goods.idx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  where c.idx = ?;
                 `;
  const [categoryRow] = await connection.query(selectCategoryIdQuery, categoryId);
  return categoryRow;
}

// 이름으로 카테고리 조회
async function selectCategoryName(connection, categoryname) {
  const selectCategoryNameQuery = `
                SELECT idx, categoryname
                FROM category 
                WHERE categoryname = ?;
                `;
  const [categorynameRows] = await connection.query(selectCategoryNameQuery, categoryname);
  return categorynameRows;
}

// 카테고리 생성
async function insertCategoryInfo(connection, insertCategoryInfoParams) {
  const insertCategoryInfoQuery = `
        INSERT INTO category(categoryname)
        VALUES (?);
    `;
  const insertCategoryInfoRow = await connection.query(
    insertCategoryInfoQuery,
    insertCategoryInfoParams
  );

  return insertCategoryInfoRow;
}


async function deleteCategoryInfo(connection, id) {
  const deleteCategoryQuery = `
  DELETE
  FROM category
  WHERE idx = ?;`;
  const deleteCategoryRow = await connection.query(deleteCategoryQuery, [id]);
  return deleteCategoryRow[0];
}


module.exports = {
  selectCategory,
  selectCategoryId,
  insertCategoryInfo,
  deleteCategoryInfo,
  selectCategoryName
};
