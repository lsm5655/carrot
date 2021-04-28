// 키워드 생성
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


// 키워드 조회
async function selectKeyword(connection, userId) {
  const selectKeywordQuery = `
  select nickname, keyword_name
  from keyword left join user u on u.idx = keyword.user_index
  where u.idx = ?;
                 `;
  const [keywordRow] = await connection.query(selectKeywordQuery, userId);
  return keywordRow;
}

// 키워드 삭제
async function deleteKeyword(connection, deleteKeywordParams) {
  const deleteKeywordQuery = `
  UPDATE keyword
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
  WHERE user_index = ? and keyword_name = ?;`;
  const deleteKeywordRow = await connection.query(deleteKeywordQuery, deleteKeywordParams);
  return deleteKeywordRow[0];
}


module.exports = {
  insertKeyword,
  selectKeyword,
  deleteKeyword
};
