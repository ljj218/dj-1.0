import fetch from '../axios'

//登录
export const login = (params) => {
  let data = {
    account: params.account,//用户账号（手机号）
    type: params.type,//登录类型 a 手机验证登录 b 账号密码登录
    code: params.code,
    password: params.password

  }
  return fetch.post('user/login', data)
};
//注册
export const register = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    code: params.code,
    password: params.password

  }
  return fetch.get('user/register', data)
};
//发送验证码
export const smsCode = (params) => {
  let data = {
    phone: params.phone,//用户账号（手机号）
    type: params.type//1 身份验证验证码 2 登录确认验证码 3 登录异常验证码 4 用户注册验证码 5 修改密码验证码 6 信息变更验证码

  }
  return fetch.get('user/smsCode', data)
};