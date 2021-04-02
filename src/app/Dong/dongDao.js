
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
  

async function deleteActiveDong(connection, id) {
    const deleteActiveDongQuery = `
          DELETE FROM activeDong WHERE userIdx = ?;
      `;
    const deleteActiveDongRow = await connection.query(
      deleteActiveDongQuery,
      id
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
  

  module.exports = {
    insertDong,
    insertActiveDong,
    deleteActiveDong,
    selectDongId,
    selectDong,
    selectDongName
  }