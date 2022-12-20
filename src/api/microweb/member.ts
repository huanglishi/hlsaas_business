import { defHttp } from '/@/utils/http/axios';

enum Api {
  //新增成员
  GetList = '/microweb/member/getList',
  SaveMemberData= '/microweb/member/saveMemberData',
  IsAccountExist= '/microweb/member/isAccountExist',
  Publish= '/microweb/member/publish',
  UpStatus= '/microweb/member/upStatus',
  
}
/**1.获取数据列表 */
export const getList = (params) => {
  return defHttp.get({ url: Api.GetList , params:params});
};
//添加编辑成员信息
export const saveMemberData = (params?: object) =>
defHttp.post({ url: Api.SaveMemberData, params:params}, { errorMessageMode : 'message' });
//发布
export const publish = (params?: object) =>
defHttp.post({ url: Api.Publish, params:params}, { errorMessageMode : 'message' });
//更新用户状态
export const upStatus = (params?: object) =>
defHttp.post({ url: Api.UpStatus, params:params}, { errorMessageMode : 'message' });
//检查账号是否存在
export const isAccountExist = (account: string,id: any) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account,id } }, { errorMessageMode: 'none' });