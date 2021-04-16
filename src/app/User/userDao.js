// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT phonenum, nickname 
                FROM user;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickname 
                FROM UserInfo 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// 번호로 회원 조회
async function selectUserPhonenum(connection, phonenum) {
  const selectUserPhonenumQuery = `
                SELECT phonenum, nickname 
                FROM user 
                WHERE phonenum = ?;
                `;
  const [phonenumRows] = await connection.query(selectUserPhonenumQuery, phonenum);
  return phonenumRows;
}


// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT idx, phonenum, nickname 
                 FROM user 
                 WHERE idx = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO user(phonenum, nickname)
        VALUES (?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM UserInfo 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, phonenum) {
  const selectUserAccountQuery = `
        SELECT status, idx
        FROM user 
        WHERE phonenum = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      phonenum
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE user 
  SET nickname = ?
  WHERE idx = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

async function deleteUserInfo(connection, id) {
  const deleteUserQuery = `
  DELETE
  FROM user
  WHERE idx = ?;`;
  const deleteUserRow = await connection.query(deleteUserQuery, [id]);
  return deleteUserRow[0];
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  selectUserPhonenum,
  deleteUserInfo
};
