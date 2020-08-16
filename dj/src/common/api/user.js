import fetch from '../axios'

//实名认证
export const auth = (params) => {
  let data = {
    account: params.account,//用户账号（手机号）
    type: params.type,//登录类型 a 手机验证登录 b 账号密码登录
    code: params.code,
    password: params.password

  }
  return fetch.post('user/login', data)
};
//个人中心
export const getUserInfo = (params) => {
  let data = {
    userId: params.userId,//用户账号（手机号）
  }
  return fetch.get('user/getUserInfo', data)
};

//修改密码
export const updatePwd = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    password: params.password,
    userId: params.userId,

  }
  return fetch.get('user/updatePwd', data)
};
//校验手机
export const checkCode = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code
  }
  return fetch.get('user/checkCode', data)
};

//绑定手机
export const bindPhone = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    userId:params.userId
  }
  return fetch.get('user/bindPhone', data)
};
//陪玩管理
export const playerSet = (params) => {
  // let data = {
  //   openNew: params.openNew,//新人专区 0 关 1 开
  //   openPlay: params.openPlay,//陪玩厅推荐 0 关 1开
  //   openSpeed:params.openSpeed,//速配厅匹配 0 关 1开
  //   userId:params.userId
  // }
  return fetch.get('user/playerSet', params)
};