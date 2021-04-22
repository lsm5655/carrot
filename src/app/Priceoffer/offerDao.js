// 가격제안 생성
async function insertPriceoffer(connection, insertPriceofferParams) {
  const insertPriceofferQuery = `
        INSERT INTO price_offer(offer_user_index, offer_price, goods_index)
        VALUES (?, ?, ?);
    `;
  const insertPriceofferRow = await connection.query(
    insertPriceofferQuery,
    insertPriceofferParams
  );

  return insertPriceofferRow;
}


// 가격제안 조회
async function selectPriceoffer(connection, userId) {
  const selectPriceofferQuery = `
  select nickname, goodsTitle, offer_price
  from price_offer left join user u on price_offer.offer_user_index = u.idx
  left join goods g on g.idx = price_offer.goods_index
  where u.idx = ?;
                 `;
  const [priceofferRow] = await connection.query(selectPriceofferQuery, userId);
  return priceofferRow;
}

// 가격제안 테이블에서 상품 있는지 찾기
async function selectPriceofferByID(connection, userId, goodsId) {
  const selectPriceofferQuery = `
  select *
  from price_offer 
  where offer_user_index = ? and goods_index = ?;
                 `;
  const [priceofferByIdRow] = await connection.query(selectPriceofferQuery, userId, goodsId);
  return priceofferByIdRow;
}

// 가격제안 수정
async function updatePriceoffer(connection, userId, price, goodsId) {
  const updatePriceofferQuery = `
  update price_offer
  set offer_price = ?,
      goods_index = ?
  WHERE offer_user_index = ?;
  `;
  const updatePriceofferRow = await connection.query(updatePriceofferQuery, [price, goodsId, userId]);
  return updatePriceofferRow[0];
}

// 상품 삭제
async function deletePriceoffer(connection, userId, goodsId) {
  const deletePriceofferQuery = `
  UPDATE price_offer
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
  WHERE offer_user_index = ? and goods_index = ?;`;
  const deletePriceofferRow = await connection.query(deletePriceofferQuery, [userId, goodsId]);
  return deletePriceofferRow[0];
}

// 가격제안 여부 확인하기
async function offercheckBygoodsID(connection, goodsId) {
  const offercheckQuery = `
  select isPriceOffer
  from goods
  where idx = ?;
                 `;
  const [offercheckRow] = await connection.query(offercheckQuery, goodsId);
  return offercheckRow;
}


module.exports = {
  insertPriceoffer,
  selectPriceoffer,
  selectPriceofferByID,
  updatePriceoffer,
  deletePriceoffer,
  offercheckBygoodsID
};
