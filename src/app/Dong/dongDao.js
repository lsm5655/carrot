
// 동 생성
async function insertDong(connection, insertDongParams) {
    const insertDongQuery = `
          INSERT INTO dong(dongname)
          VALUES (?);
      `;
    const insertDongRow = await connection.query(
      insertDongQuery,
      insertDongParams
    );
  
    return insertDongRow;
  }

  // 유저가 사는 동 생성
async function insertActiveDong(connection, insertActiveDongParams) {
    const insertActiveDongQuery = `
          INSERT INTO activeDong(userIdx, activeRange, activeLocation)
          VALUES (?, ?, ?);
      `;
    const insertActiveDongRow = await connection.query(
      insertActiveDongQuery,
      insertActiveDongParams
    );
  
    return insertActiveDongRow;
  }
  
// 동 삭제
async function deleteActiveDong(connection, userId, dongName) {
    const deleteActiveDongQuery = `
    UPDATE activeDong
    SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
    WHERE userIdx = ? and activeLocation = ?;
      `;
    const deleteActiveDongRow = await connection.query(
      deleteActiveDongQuery,
      userId,
      dongName
    );
  
    return deleteActiveDongRow[0];
  }

  async function selectDongId(connection, userId) {
    const selectDongIdQuery = `
                   SELECT activeRange, activeLocation 
                   FROM activeDong
                   WHERE userIdx = ?;
                   `;
    const [dongRow] = await connection.query(selectDongIdQuery, userId);
    return dongRow;
  }

  // 모든 동 조회

  async function selectDong(connection) {
    const selectDongListQuery = `
                  SELECT dongname 
                  FROM dong;
                  `;
    const [dongRows] = await connection.query(selectDongListQuery);
    return dongRows;
  }

  
  // 이름으로 동 조회
async function selectDongName(connection, dongname) {
    const selectDongNameQuery = `
                  SELECT dongname 
                  FROM dong
                  WHERE dongname = ?;
                  `;
    const [dongnameRows] = await connection.query(selectDongNameQuery, dongname);
    return dongnameRows;
  }
  

    // 동 검사
async function selectDongCheck(connection, userId) {
  const selectDongCheckQuery = `
                SELECT status, activeLocation 
                FROM activeDong
                WHERE userIdx = ?;
                `;
  const [dongcheckRows] = await connection.query(selectDongCheckQuery, userId);
  return dongcheckRows;
}

  module.exports = {
    insertDong,
    insertActiveDong,
    deleteActiveDong,
    selectDongId,
    selectDong,
    selectDongName,
    selectDongCheck
  }