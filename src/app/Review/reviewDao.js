// 후기 생성
async function insertReview(connection, insertReviewParams) {
  const insertReviewQuery = `
        INSERT INTO review(user_index, goods_index, review_content)
        VALUES (?, ?, ?);
    `;
  const insertReviewRow = await connection.query(
    insertReviewQuery,
    insertReviewParams
  );

  return insertReviewRow;
}


// 후기 조회
async function selectReview(connection, userId) {
  const selectReviewQuery = `
  select nickname, goodsTitle, review_content
  from goods left join user u on u.idx = goods.sellerIdx
  left join review r on r.goods_index = goods.idx
  where r.user_index = ?;
                 `;
  const [reviewRow] = await connection.query(selectReviewQuery, userId);
  return reviewRow;
}

// 후기 검사
async function checkReview(connection, userId) {
  const checkReviewQuery = `
  select goods_index
  from review
  where user_index = ?;
                 `;
  const [checkreviewRow] = await connection.query(checkReviewQuery, userId);
  return checkreviewRow;
}

// 후기 조회
async function checkReviewBygoodsId(connection, userId, goodsId) {
  const checkReviewQuery = `
  select idx
  from chatting_room left join goods on goods.idx = chatting_room.goodsIdx
  where chatting_room.buyerIdx = ? and goods.idx = ?;
                 `;
  const [checkreviewRow] = await connection.query(checkReviewQuery, userId, goodsId);
  return checkreviewRow;
}

// 후기 삭제
async function deleteReview(connection, reviewId) {
  const deleteReviewQuery = `
  UPDATE review
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
  WHERE idx = ?;`;
  const deleteReviewRow = await connection.query(deleteReviewQuery, [reviewId]);
  return deleteReviewRow[0];
}


module.exports = {
  insertReview,
  selectReview,
  deleteReview,
  checkReview,
  checkReviewBygoodsId
};
