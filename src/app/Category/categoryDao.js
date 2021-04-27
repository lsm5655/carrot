// 모든 카테고리 조회
async function selectCategory(connection) {
  const selectCategoryListQuery = `
                SELECT categoryname
                FROM category;
                `;
  const [categoryRows] = await connection.query(selectCategoryListQuery);
  return categoryRows;
}



// categoryId 상품 리스트 조회
async function selectCategoryId(connection, categoryId) {
  const selectCategoryIdQuery = `
  SELECT goods.idx, categoryname, fileLink, goodsTitle, activeLocation,
  case
       when timestampdiff(second, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(second, goods.updated_at, now()), '초전')
       when timestampdiff(minute, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(minute, goods.updated_at, now()), '분전')
       when timestampdiff(hour, goods.updated_at, now()) < 24 then CONCAT(timestampdiff(hour, goods.updated_at, now()) ,'시간전')
       when timestampdiff(day, goods.updated_at, now()) < 31 then CONCAT(timestampdiff(day, goods.updated_at, now()), '일전')
       when timestampdiff(month, goods.updated_at, now()) < 12 then CONCAT(timestampdiff(month, goods.updated_at, now()), '달전')
       else CONCAT(timestampdiff(year, goods.updated_at, now()) ,'년전')
       end as 수정날짜, price, count(distinct cr.buyerIdx) as '채팅방', count(distinct ig.userIdx) as '관심수'
  from goods right join category c on goods.categoryIdx = c.idx
  left join goods_image gi on gi.goods_idx = goods.idx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
left join chatting_room cr on cr.goodsIdx = goods.idx
left join interestGoods ig on ig.goodsIdx = goods.idx
  where c.idx = ?
group by goods.idx;
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
  UPDATE category
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
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
