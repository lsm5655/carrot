// 가격제안 생성
async function insertKeyword(connection, insertKeywordParams) {
  const insertKeywordQuery = `
        INSERT INTO keyword(user_index, keyword_name)
        VALUES (?, ?);
    `;
  const insertKeywordRow = await connection.query(
    insertKeywordQuery,
    insertKeywordParams
  );

  return insertKeywordRow;
}


// 가격제안 조회
async function selectKeyword(connection, userId) {
  const selectKeywordQuery = `
  select nickname, keyword_name
  from keyword left join user u on u.idx = keyword.user_index
  where u.idx = ?;
                 `;
  const [keywordRow] = await connection.query(selectKeywordQuery, userId);
  return keywordRow;
}

// 상품 삭제
async function deleteKeyword(connection, keywordId) {
  const deleteKeywordQuery = `
  DELETE
  FROM keyword
  WHERE idx = ?;`;
  const deleteKeywordRow = await connection.query(deleteKeywordQuery, [keywordId]);
  return deleteKeywordRow[0];
}


module.exports = {
  insertKeyword,
  selectKeyword,
  deleteKeyword
};
