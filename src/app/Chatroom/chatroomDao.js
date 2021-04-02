// 채팅방 생성
async function insertChatroom(connection, insertChatroomParams) {
  const insertChatroomQuery = `
        INSERT INTO chatting_room(goodsIdx, buyerIdx)
        VALUES (?, ?);
    `;
  const insertChatroomRow = await connection.query(
    insertChatroomQuery,
    insertChatroomParams
  );

  return insertChatroomRow;
}


// 채팅방 조회
async function selectChatroom(connection, userId) {
  const selectChatroomQuery = `
  select nickname, activeLocation, chatting_msg.updated_at, chatting_msg_content, file_index
  from goods left join user u on goods.sellerIdx = u.idx
  left join chatting_room on goods.idx = chatting_room.goodsIdx
  left join chatting_msg on chatting_msg.chatroom_index = chatting_room.idx
  left join goods_image on goods.idx = goods_image.goods_idx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  where chatting_room.buyerIdx = ?;
                 `;
  const [chatroomRow] = await connection.query(selectChatroomQuery, userId);
  return chatroomRow;
}

// 채팅방 삭제
async function deleteChatroom(connection, chatroomId) {
  const deleteChatroomQuery = `
  DELETE
  FROM chatting_room
  WHERE idx = ?;`;
  const deleteChatroomRow = await connection.query(deleteChatroomQuery, [chatroomId]);
  return deleteChatroomRow[0];
}


module.exports = {
  insertChatroom,
  selectChatroom,
  deleteChatroom
};
