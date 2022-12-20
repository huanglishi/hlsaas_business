/**
 * 订单管理
 */
 import { defHttp } from '/@/utils/http/axios';

 enum Api {
   GetOrderList = '/ordermanag/servicepackage/getOrderList',
 }
 
 
 /**1. workbench导航面板*/
 //获取轻站订单
 export const getOrderList = (params) => {
   return defHttp.get({ url: Api.GetOrderList,params:params });
 };