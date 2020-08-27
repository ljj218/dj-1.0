import fetch from '../axios'
import { tgCode,ghCode,hzCode} from "../config"

//绑定手机
export const bindPhone = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    userId: params.userId
  }
  return fetch.get('user/bindPhone', data)
};
//查询陪玩信息
export const querPlayer = (params) => {
  let data = {
    type: params.type,//用户账号（手机号）
    pageNo: params.pageNo,
    pageSize: params.pageSize,
    position: params.position,
    priceOrderBy: params.priceOrderBy,//价格排序 1 从高到低 2 从低到高
    rank: params.rank,
    sex: params.sex,//性别 1 男 2 女
    sound: params.sound,
    nickName: params.nickName || '',
    userCode: params.userCode || '',
    isNew:params.isNew||0,//是否是新人专享 0 否 1是
  }
  return fetch.get('u/querPlayer', data)
};
//查询速配厅陪玩
export const querPlayerSpeed = (params) => {
  let data = {
    type: params.type,//用户账号（手机号）
    pageNo: params.pageNo,
    pageSize: params.pageSize,
    position: params.position,
    priceOrderBy: params.priceOrderBy,//价格排序 1 从高到低 2 从低到高
    rank: params.rank,
    sound: params.sound,
  }
  return fetch.get('u/querPlayerSpeed', data)
};

//评价列表
export const getComment = (params) => {
  let data = {
    userId: params.userId,//用户账号（手机号）
    pageNo: params.pageNo,
    pageSize: params.pageSize || 10,
  }
  return fetch.get('u/getComment', data)
};
//单列表
export const orderList = (userId) => {
  let data = {
    userId: userId,//用户账号（手机号）
  }
  return fetch.get('consum/getOrderList', data)
};

//提交订单
export const order = (params) => {

  let data = {
    orderMoney: params.orderMoney,
    orderNum: params.orderNum,
    orderType: params.orderType,
    price: params.price,
    toUserId: params.toUserId,
    userId: params.userId,
    source: params.source || '',
    remark:params.remark||'',
    hzCode:hzCode()||'',
  }
  return fetch.get('consum/order', data)
};
//完成订单
export const comOrder = (id) => {
  let data = {
    orderId: id,

  }
  return fetch.get('consum/comOrder', data)
};


//订单评价
export const orderComment = (params) => {
  let data = {
    content: params.content,//
    label: params.label,//
    level: params.level,//
    orderId: params.orderId,//
    userId: params.userId,//
  }
  return fetch.get('consum/orderComment', data)
};
//申请退款
export const orderRefund = (params) => {
  let data = {
    reason: params.reason,//
    orderId: params.orderId,//
    userId: params.userId,//
    label: params.label,//
    file: params.file,//
  }
  return fetch.get('consum/orderRefund', data)
};
///u/getLabelList
//订单评价
export const getLabelList = (type) => {
  let data = {
    type: type
  }
  return fetch.get('u/getLabelList', data)
};