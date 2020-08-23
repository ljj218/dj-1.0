import fetch from '../axios'

//实名认证
export const auth = (params) => {
  let data = {
    cardBackImg: params.cardBackImg,//份证反面
    cardPreImg: params.cardPreImg,//份证正面
    code: params.code,
    idCard: params.idCard,
    phone: params.phone,
    userId: params.userId,
    userName: params.userName
  }
  return fetch.postFormData('user/auth', data)
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
//获取用户配置
export const getPlayerSet = (userId) => {
  let data = {
    userId:userId
  }
  return fetch.get('user/getPlayerSet', data)
};
//修改信息
export const updateInfo = (params) => {
  let data = {
    userId:params.userId,
    headImg:params.headImg||'',
    birthDate:params.birthDate||'',
    introduce:params.introduce||'',
    nickName:params.nickName||'',
    sex:params.sex||'',//性别 1男 2女
    signature:params.signature||'',//个性签名
    photos:params.photos||'',//个人相片 多个@分隔
    playHero:params.playHero||'',//英雄 多个逗号分隔
    playPosition:params.playPosition||'',// 1 上单 2打野 3中路 4.AD 5辅助 多个逗号分隔
    riftImg:params.riftImg||'',//峡谷段位图
    riftRank:params.riftRank||'',//峡谷段位 1 黑铁 2 青铜 3 白银 4黄金 5铂金 6钻石 7 大师 8 宗师 9 王者
    sound:params.sound||'',
    soundFiles:params.soundFiles||'',
    tacticsImg:params.tacticsImg||'',//云顶段位图
    tacticsRank:params.tacticsRank||''//云顶段位
  }
  return fetch.postFormData('user/updateInfo', data)
};

//支付
export const recharge = (params) => {
  let data = {
    payType:params.payType,//支付类型 1 微信扫码 11 支付宝扫码
    totalMoney:params.totalMoney||'',//充值金额（分）
    userId:params.userId,
    
  }
  return fetch.get('pay/recharge', data)
};
//pay/paySuccess
export const paySuccess = (params) => {
  let data = {
    orderId:params.orderId,
    productId:params.productId,
    userId:params.userId,
    
  }
  return fetch.get('pay/paySuccess', data)
};
//查询余额
export const getBalance = (userId) => {
  let data = {
    userId:userId,
  }
  return fetch.get('user/getBalance', data)
};
//文件上传
export const upload = (file) => {
  let data = {
    file:file,
  }
  return fetch.get('user/upload', data)
};
//文件上传
export const forgotPwd = (params) => {
  let data = {
    phone:params.phone,
    code:params.code,
    pwd:params.pwd,
  }
  return fetch.post('user/forgotPwd', data)
};