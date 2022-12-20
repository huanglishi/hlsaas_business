import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import {  isAccountExist } from '/@/api/microweb/member';
export const columns: BasicColumn[] = [
  {
    title: '分组名称',
    dataIndex: 'name',
    width: 180,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'weigh',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    customRender: ({ record }) => {
      const createtime = record.createtime;
      return  timestampTodataTime(createtime);
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
//工具函数
export const timestampTodataTime = (timestamp: number) => {
  if(!timestamp){
      return "---";
  }
  // 计算年月日时分的函数
  var date = new Date(timestamp*1000)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  return Y + M + D   
};
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分组名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'cid',
    label: '分组',
    slot: 'cid',
    component: 'Input',
    required: true,
  },
  {
    field: 'company',
    label: '公司名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    required: true,
  },
  {
    field: 'username',
    label: '账号',
    component: 'Input',
    helpMessage: ['登录账号','检验账号唯一性'],
    rules: [
      {
        required: true,
        message: '请输入账号',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            var accountID=sessionStorage.getItem("accountID")
            isAccountExist(value,accountID)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    helpMessage: ['默认密码：123456',"不修改请留空"],
    ifShow: true,
  },
  {
    label: '手机',
    field: 'mobile',
    component: 'Input',
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
  },
  {
    label: '有效时间',
    field: 'validtime',
    component: 'DatePicker',
    componentProps: {
      placeholder: '不填则永久有效',
      valueFormat: 'YYYY-MM-DD',
    },
    rules: [{ type: 'string' }],
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
