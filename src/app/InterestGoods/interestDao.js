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
  select fileLink, goodsTitle, activeLocation, 
  case
       when timestampdiff(second, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(second, goods.updated_at, now()), '초전')
       when timestampdiff(minute, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(minute, goods.updated_at, now()), '분전')
       when timestampdiff(hour, goods.updated_at, now()) < 24 then CONCAT(timestampdiff(hour, goods.updated_at, now()) ,'시간전')
       when timestampdiff(day, goods.updated_at, now()) < 31 then CONCAT(timestampdiff(day, goods.updated_at, now()), '일전')
       when timestampdiff(month, goods.updated_at, now()) < 12 then CONCAT(timestampdiff(month, goods.updated_at, now()), '달전')
       else CONCAT(timestampdiff(year, goods.updated_at, now()) ,'년전')
       end as 수정날짜, price, count(distinct cr.buyerIdx) as '채팅방', count(distinct ig.userIdx) as '관심수'
  from goods left outer join goods_image gi on goods.idx = gi.goods_idx
  right join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  left join chatting_room cr on cr.goodsIdx = goods.idx
  where ig.userIdx = ?
  group by goods.idx;
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
