

// 상품 생성
async function insertGoodsInfo(connection, insertGoodsInfoParams) {
  const insertGoodsInfoQuery = `
        INSERT INTO goods(sellerIdx, sellerlocationIdx, categoryIdx, goodsTitle, price, isPriceOffer, content)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
  const insertGoodsInfoRow = await connection.query(
    insertGoodsInfoQuery,
    insertGoodsInfoParams
  );

  return insertGoodsInfoRow;
}

async function insertGoodsImgInfo(connection, goodsId, fileLink) {
  const insertGoodsInfoQuery = `
        INSERT INTO goods_image (goods_index, file)
        VALUES (?, ?);
    `;
  const insertGoodsImgInfoRow = await connection.query(
    insertGoodsInfoQuery,
    goodsId, fileLink
  );

  return insertGoodsImgInfoRow;
}


  // var sql = "";
  // fileLink.foreach(function(item){
  //   sql += mysql.format(insertGoodsimgInfoQuery, item);
  // })
  // const insertGoodsImgInfoRow = await connection.query(sql)


// goodsId 상품 조회
async function selectGoodsId(connection, goodsId) {
  
  const selectGoodsIdQuery = `
  SELECT fileLink, nickname, activeLocation, score, goodsTitle, c.categoryname, 
  case
       when timestampdiff(second, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(second, goods.updated_at, now()), '초전')
       when timestampdiff(minute, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(minute, goods.updated_at, now()), '분전')
       when timestampdiff(hour, goods.updated_at, now()) < 24 then CONCAT(timestampdiff(hour, goods.updated_at, now()) ,'시간전')
       when timestampdiff(day, goods.updated_at, now()) < 31 then CONCAT(timestampdiff(day, goods.updated_at, now()), '일전')
       when timestampdiff(month, goods.updated_at, now()) < 12 then CONCAT(timestampdiff(month, goods.updated_at, now()), '달전')
       else CONCAT(timestampdiff(year, goods.updated_at, now()) ,'년전')
       end as 수정날짜, content,
       count(distinct cr.buyerIdx) as '채팅방', count(distinct ig.userIdx) as '관심수', price, isPriceOffer
from goods left join goods_image gi on goods.idx = gi.goods_idx left join user u on u.idx=goods.sellerIdx
    left join chatting_room cr on cr.goodsIdx = goods.idx
    left join category c on c.idx = goods.categoryIdx left join interestGoods ig on ig.goodsIdx = goods.idx
    left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
WHERE goods.idx = ?;
                 `;


   const goodsRow = await connection.query(selectGoodsIdQuery, goodsId);
  return goodsRow;
}

// 상품 조회수
async function selectGoodsViewId(connection, goodsId) {
  
  const selectGoodsviewIdQuery = `
  SELECT count(GoodsView.goods_idx=?) as view
  from GoodsView;
                 `;
  const goodsviewRow = await connection.query(selectGoodsviewIdQuery, goodsId);
  return goodsviewRow;
}

async function selectGoodsIdByUserId(connection, userId) {
  
  const selectGoodsIdQuery = `
    select goods.idx
    from goods
    where sellerIdx = ?
    order by created_at desc limit 1;
                 `;
  const [goodsRow] = await connection.query(selectGoodsIdQuery, userId);
  return goodsRow;
}


// 모든 상품목록 조회
async function selectGoodsList(connection) {
  const selectGoodsListQuery = `
  select distinct goodsTitle, fileLink, goodsStatus, activeLocation, 
  case
       when timestampdiff(second, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(second, goods.updated_at, now()), '초전')
       when timestampdiff(minute, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(minute, goods.updated_at, now()), '분전')
       when timestampdiff(hour, goods.updated_at, now()) < 24 then CONCAT(timestampdiff(hour, goods.updated_at, now()) ,'시간전')
       when timestampdiff(day, goods.updated_at, now()) < 31 then CONCAT(timestampdiff(day, goods.updated_at, now()), '일전')
       when timestampdiff(month, goods.updated_at, now()) < 12 then CONCAT(timestampdiff(month, goods.updated_at, now()), '달전')
       else CONCAT(timestampdiff(year, goods.updated_at, now()) ,'년전')
       end as 수정날짜, price, count(distinct cr.buyerIdx) as '채팅방', count(distinct ig.userIdx) as '관심수'
  from goods left join goods_image gi on goods.idx = gi.goods_idx
  left join chatting_room cr on goods.idx = cr.goodsIdx
  left join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index;
                `;
  const [goodsListRows] = await connection.query(selectGoodsListQuery);
  return goodsListRows;
}



// 상태로 상품목록 조회
async function selectGoodsStatus(connection, goodsStatus) {
  const selectGoodsListQuery = `
  select distinct goodsTitle, fileLink, goodsStatus, activeLocation, 
  case
       when timestampdiff(second, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(second, goods.updated_at, now()), '초전')
       when timestampdiff(minute, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(minute, goods.updated_at, now()), '분전')
       when timestampdiff(hour, goods.updated_at, now()) < 24 then CONCAT(timestampdiff(hour, goods.updated_at, now()) ,'시간전')
       when timestampdiff(day, goods.updated_at, now()) < 31 then CONCAT(timestampdiff(day, goods.updated_at, now()), '일전')
       when timestampdiff(month, goods.updated_at, now()) < 12 then CONCAT(timestampdiff(month, goods.updated_at, now()), '달전')
       else CONCAT(timestampdiff(year, goods.updated_at, now()) ,'년전')
       end as 수정날짜, price, count(distinct cr.buyerIdx) as '채팅방', count(distinct ig.userIdx) as '관심수'
  from goods left join goods_image gi on goods.idx = gi.goods_idx
  left join chatting_room cr on goods.idx = cr.goodsIdx
  left join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  where goodsStatus = ?;
                `;
  const [goodsStatusRows] = await connection.query(selectGoodsListQuery, goodsStatus);
  return goodsStatusRows;
}

// 판매내역 조회
async function selectGoodsListByUser(connection, userId) {
  const selectGoodsListQuery = `
  select distinct goodsTitle, fileLink, goodsStatus, activeLocation, 
  case
       when timestampdiff(second, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(second, goods.updated_at, now()), '초전')
       when timestampdiff(minute, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(minute, goods.updated_at, now()), '분전')
       when timestampdiff(hour, goods.updated_at, now()) < 24 then CONCAT(timestampdiff(hour, goods.updated_at, now()) ,'시간전')
       when timestampdiff(day, goods.updated_at, now()) < 31 then CONCAT(timestampdiff(day, goods.updated_at, now()), '일전')
       when timestampdiff(month, goods.updated_at, now()) < 12 then CONCAT(timestampdiff(month, goods.updated_at, now()), '달전')
       else CONCAT(timestampdiff(year, goods.updated_at, now()) ,'년전')
       end as 수정날짜, price, count(distinct cr.buyerIdx) as '채팅방', count(distinct ig.userIdx) as '관심수'
  from goods left join goods_image gi on goods.idx = gi.goods_idx
  left join chatting_room cr on goods.idx = cr.goodsIdx
  left join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  where sellerIdx = ?;
                `;
  const [goodsListRows] = await connection.query(selectGoodsListQuery, userId);
  return goodsListRows;
}



// 상태로 판매내역 조회
async function selectGoodsStatusByUser(connection, userId, goodsStatus) {
  const selectGoodsListQuery = `
  select distinct goodsTitle, fileLink, goodsStatus, activeLocation, 
  case
       when timestampdiff(second, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(second, goods.updated_at, now()), '초전')
       when timestampdiff(minute, goods.updated_at, now()) < 59 then CONCAT(timestampdiff(minute, goods.updated_at, now()), '분전')
       when timestampdiff(hour, goods.updated_at, now()) < 24 then CONCAT(timestampdiff(hour, goods.updated_at, now()) ,'시간전')
       when timestampdiff(day, goods.updated_at, now()) < 31 then CONCAT(timestampdiff(day, goods.updated_at, now()), '일전')
       when timestampdiff(month, goods.updated_at, now()) < 12 then CONCAT(timestampdiff(month, goods.updated_at, now()), '달전')
       else CONCAT(timestampdiff(year, goods.updated_at, now()) ,'년전')
       end as 수정날짜, price, count(distinct cr.buyerIdx) as '채팅방', count(distinct ig.userIdx) as '관심수'
  from goods left join goods_image gi on goods.idx = gi.goods_idx
  left join chatting_room cr on goods.idx = cr.goodsIdx
  left join interestGoods ig on goods.idx = ig.goodsIdx
  left join activeDong ad on goods.sellerLocationIdx = ad.reference_area_index
  where sellerIdx = ? and goodsStatus = ?;
                `;
  const [goodsStatusRows] = await connection.query(selectGoodsListQuery, userId, goodsStatus);
  return goodsStatusRows;
}


// 상품 삭제
async function deleteGoodsInfo(connection, goodsId) {
  const deleteGoodsQuery = `
  UPDATE goods
  SET status = 'DELETED', deleted_at = CURRENT_TIMESTAMP
  WHERE idx = ?;`;
  const deleteGoodsRow = await connection.query(deleteGoodsQuery, [goodsId]);
  return deleteGoodsRow[0];
}

async function checkUserBygoodsId(connection, goodsId) {
  const checkGoodsQuery = `
  select sellerIdx
  from goods
  where idx = ?;`;
  const checkGoodsRow = await connection.query(checkGoodsQuery, [goodsId]);
  return checkGoodsRow[0];
}


module.exports = {
  insertGoodsInfo,
  selectGoodsId,
  selectGoodsList,
  selectGoodsStatus,
  deleteGoodsInfo,
  insertGoodsImgInfo,
  selectGoodsIdByUserId,
  selectGoodsViewId,
  checkUserBygoodsId,
  selectGoodsListByUser,
  selectGoodsStatusByUser
}
