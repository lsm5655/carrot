// 상품 생성
async function insertGoodsInfo(connection, insertGoodsInfoParams) {
  const insertGoodsInfoQuery = `
        INSERT INTO goods(sellerIdx, sellerlocationIdx, categoryIdx, goodsTitle, price, isPriceOffer, content)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
  const insertGoodsInfoRow = await connection.query(
    insertGoodsInfoQuery,
    insertGoodsInfoParams
  );

  return insertGoodsInfoRow;
}

async function insertGoodsImgInfo(connection, goodsId, fileLink) {
  const insertGoodsimgInfoQuery = `
        INSERT INTO goods_image(goods_idx, fileLink)
        VALUES (?, ?);
    `;
  
  for (var i=0; i<fileLink.length;i++)
  { 
    const insertGoodsImgInfoRow = await connection.query(
      insertGoodsimgInfoQuery,
      goodsId,
      fileLink[i]
    );

  return insertGoodsImgInfoRow;
  }

}



// goodsId 상품 조회
async function selectGoodsId(connection, goodsId) {
  
  const selectGoodsIdQuery = `
  SELECT file_index, nickname, activeLocation, score, goodsTitle, c.categoryname, goods.updated_at, content,
       count(distinct cr.buyerIdx) as room, count(distinct ig.goodsIdx) as igoods,
       count(distinct GV.goods_idx) as view, price, isPriceOffer
  from goods left join goods_image gi on goods.idx = gi.goods_idx left join user u on u.idx=goods.sellerIdx
    left join chatting_room cr on cr.goodsIdx = goods.idx left join GoodsView GV on GV.goods_idx = goods.idx
    left join category c on c.idx = goods.categoryIdx left join interestGoods ig on ig.goodsIdx = goods.idx
    left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  WHERE goods.idx = ?;
                 `;
  const [goodsRow] = await connection.query(selectGoodsIdQuery, goodsId);
  return goodsRow;
}

async function selectGoodsIdByUserId(connection, userId) {
  
  const selectGoodsIdQuery = `
    select goods.idx
    from goods
    where sellerIdx = ?
    order by created_at desc limit 1;
                 `;
  const [goodsRow] = await connection.query(selectGoodsIdQuery, userId);
  return goodsRow;
}


// 모든 상품목록 조회
async function selectGoodsList(connection) {
  const selectGoodsListQuery = `
  select distinct goodsTitle, file_index, goodsStatus, activeLocation, goods.updated_at, price
  from goods left join goods_image gi on goods.idx = gi.goods_idx
  left join chatting_room cr on goods.idx = cr.goodsIdx
  left join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index;
                `;
  const [goodsListRows] = await connection.query(selectGoodsListQuery);
  return goodsListRows;
}



// 상태로 상품목록 조회
async function selectGoodsStatus(connection, goodsStatus) {
  const selectGoodsListQuery = `
  select distinct goodsTitle, file_index, goodsStatus, activeLocation, goods.updated_at, price
  from goods left join goods_image gi on goods.idx = gi.goods_idx
  left join chatting_room cr on goods.idx = cr.goodsIdx
  left join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  where goodsStatus = ?;
                `;
  const [goodsStatusRows] = await connection.query(selectGoodsListQuery, goodsStatus);
  return goodsStatusRows;
}


// 상품 삭제
async function deleteGoodsInfo(connection, goodsId) {
  const deleteGoodsQuery = `
  DELETE
  FROM goods
  WHERE idx = ?;`;
  const deleteGoodsRow = await connection.query(deleteGoodsQuery, [goodsId]);
  return deleteGoodsRow[0];
}


module.exports = {
  insertGoodsInfo,
  selectGoodsId,
  selectGoodsList,
  selectGoodsStatus,
  deleteGoodsInfo,
  insertGoodsImgInfo,
  selectGoodsIdByUserId
};
