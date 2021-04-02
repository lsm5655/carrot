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

// 후기 삭제
async function deleteReview(connection, reviewId) {
  const deleteReviewQuery = `
  DELETE
  FROM review
  WHERE idx = ?;`;
  const deleteReviewRow = await connection.query(deleteReviewQuery, [reviewId]);
  return deleteReviewRow[0];
}


module.exports = {
  insertReview,
  selectReview,
  deleteReview
};
