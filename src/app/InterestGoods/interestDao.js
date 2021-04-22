// 관심상품 생성
async function insertInterestGoods(connection, insertInterestGoodsParams) {
  const insertInterestGoodsQuery = `
        INSERT INTO interestGoods(userIdx, goodsIdx)
        VALUES (?, ?);
    `;
  const insertInterestGoodsRow = await connection.query(
    insertInterestGoodsQuery,
    insertInterestGoodsParams
  );

  return insertInterestGoodsRow;
}

// 특정 유저 관심상품 조회
async function selectInterestGoodsId(connection, userId) {
  const selectInterestGoodsQuery = `
  select file_index, goodsTitle, activeLocation, goods.updated_at, price
  from goods left outer join goods_image gi on goods.idx = gi.goods_idx
  right join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  where ig.userIdx = ?;
                 `;
  const [interestGoodsRow] = await connection.query(selectInterestGoodsQuery, userId);
  return interestGoodsRow;
}

// userID로 관심상품 조회
async function selectInterstGoodsuserId(connection, userId) {
  const selectuserIdQuery = `
                SELECT userIdx, goodsIdx
                FROM interestGoods 
                WHERE userIdx = ?;
                `;
  const [userIdRows] = await connection.query(selectuserIdQuery, userId);
  return userIdRows;
}

// goodsID로 관심상품 조회
async function selectInterstGoodsgoodsId(connection, goodsId) {
  const selectgoodsIduery = `
                SELECT userIdx, goodsIdx
                FROM interestGoods 
                WHERE goodsIdx = ?;
                `;
  const [goodsIdRows] = await connection.query(selectgoodsIduery, goodsId);
  return goodsIdRows;
}



async function deleteInterestGoods(connection, userId, goodsId) {
  const deleteInterestgoodsQuery = `
  UPDATE interestGoods
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
  WHERE userIdx = ? and goodsIdx = ?;
  `;
  const deleteCategoryRow = await connection.query(deleteInterestgoodsQuery, [userId, goodsId]);
  return deleteCategoryRow[0];
}


module.exports = {
  insertInterestGoods,
  selectInterestGoodsId,
  deleteInterestGoods,
  selectInterstGoodsuserId,
  selectInterstGoodsgoodsId
};
