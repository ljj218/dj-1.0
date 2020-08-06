import fetch from '../axios'

//获取消息列表
export const getMessageList = (params) => {
  let data = {
    customerId: params.customerId,
    provinceId: params.provinceId,
    pageNo: 1,
    channel: 'sdx',
    module: 16,
    pageSize: 3,
  }
  return fetch.get('message/getMessageList', data)
};