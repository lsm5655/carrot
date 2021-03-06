// 알림 생성
async function insertNoticeInfo(connection, insertNoticeInfoParams) {
  const insertNoticeQuery = `
        INSERT INTO notice(receiver_index, type)
        VALUES (?, ?);
    `;
  const insertNoticeRow = await connection.query(
    insertNoticeQuery,
    insertNoticeInfoParams
  );

  return insertNoticeRow;
}


// 알림 조회
async function selectNotice(connection, userId) {
  const selectNoticeQuery = `
  select nickname, type
  from notice left join user u on u.idx = notice.receiver_index
  where u.idx = ?;
                 `;
  const [noticeRow] = await connection.query(selectNoticeQuery, userId);
  return noticeRow;
}

// 알림 읽기 YES
async function isReadNotice(connection, noticeId) {
  const updateNoticeQuery = `
  UPDATE notice
  SET is_read = 'YES'
  WHERE idx = ?;`;
  const updateNoticeRow = await connection.query(updateNoticeQuery, [noticeId]);
  return updateNoticeRow[0];
}



// 알림 삭제
async function deleteNotice(connection, noticeId) {
  const deleteNoticeQuery = `
  UPDATE notice
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
  WHERE idx = ?;`;
  const deleteNoticeRow = await connection.query(deleteNoticeQuery, [noticeId]);
  return deleteNoticeRow[0];
}


module.exports = {
  insertNoticeInfo,
  selectNotice,
  deleteNotice
};
