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

// 상태 조회
async function selectStatusCheck(connection, userId) {
  const selectStatusCheckQuery = `
                SELECT phonenum, nickname 
                FROM user 
                WHERE idx = ? and status = 'INACTIVE';
                `;
  const [statusRows] = await connection.query(selectStatusCheckQuery, userId);
  return statusRows;
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

// userId 프로필 조회
async function selectProfile(connection, userId) {
  const selectUserIdQuery = `
    select nickname, user.idx, score, DATE_FORMAT(user.created_at, '%Y.%m.%d') as '생성날짜', goodsTitle, review_content
    from goods right join user on user.idx = goods.sellerIdx
    left join review on review.goods_index = goods.idx
    where user.idx = ?;
                 `;
  const profileRow = await connection.query(selectUserIdQuery, userId);
  return profileRow;
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
  UPDATE user
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
  WHERE idx = ?;`;
  const deleteUserRow = await connection.query(deleteUserQuery, [id]);
  return deleteUserRow[0];
}

// 인증번호 조회
async function authnumCheck(connection, phonenum) {
  const authnumCheckQuery = `
                SELECT authnum, timestampdiff(minute, authMsg.updated_at, now()) as 'authTime'
                FROM authMsg
                WHERE phonenum = ?;
                `;
  const [authnumRows] = await connection.query(authnumCheckQuery, phonenum);
  return authnumRows;
}

// 인증번호 수정
async function updateAuthnum(connection, updateAuthMsgParams) {
  const updateAuthNumQuery = `
    UPDATE authMsg
    SET authnum = ?, updated_at = CURRENT_TIMESTAMP
    WHERE phonenum = ?;
                `;
  const [authnumRows] = await connection.query(updateAuthNumQuery, updateAuthMsgParams);
  return authnumRows;
}

// 인증번호 생성
async function insertAuthnum(connection, insertAuthMsgParams) {
  const insertAuthNumQuery = `
    INSERT INTO authMsg(phonenum, authnum)
    VALUES (?, ?);
                `;
  const [authnumRows] = await connection.query(insertAuthNumQuery, insertAuthMsgParams);
  return authnumRows;
}

// 이메일 인증번호 조회
async function authnumEmailCheck(connection, sendEmail) {
  const authnumCheckQuery = `
                SELECT authnum, timestampdiff(minute, authEmail.updated_at, now()) as 'authTime'
                FROM authEmail
                WHERE sendEmail = ?;
                `;
  const [authnumRows] = await connection.query(authnumCheckQuery, sendEmail);
  return authnumRows;
}

// 이메일 인증번호 수정
async function updateAuthnumEmail(connection, updateAuthEmailParams) {
  const updateAuthNumQuery = `
    UPDATE authEmail
    SET authnum = ?, updated_at = CURRENT_TIMESTAMP
    WHERE sendEmail = ?;
                `;
  const [authnumRows] = await connection.query(updateAuthNumQuery, updateAuthMsgParams);
  return authnumRows;
}

// 이메일 인증번호 생성
async function insertAuthnumEmail(connection, insertAuthMsgParams) {
  const insertAuthNumQuery = `
    INSERT INTO authEmail(sendEmail, authnum)
    VALUES (?, ?);
                `;
  const [authnumRows] = await connection.query(insertAuthNumQuery, insertAuthMsgParams);
  return authnumRows;
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
  deleteUserInfo,
  selectStatusCheck,
  selectProfile,
  authnumCheck,
  updateAuthnum,
  insertAuthnum,
  authnumEmailCheck,
  updateAuthnumEmail,
  insertAuthnumEmail
};
