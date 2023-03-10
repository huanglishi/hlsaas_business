import {  isAccountExist } from '/@/api/sys/account';
import { BasicColumn,FormSchema } from '/@/components/Table';
// import { h } from 'vue';
// import { Tag } from 'ant-design-vue';
//表格
export const columns: BasicColumn[] = [
  {
    title: '用户信息',
    dataIndex: 'name',
  },
  {
    title: '分组',
    dataIndex: 'groupname',
  },
  {
    title: '企业名称',
    dataIndex: 'company',
  },
  {
    title: '状态',
    dataIndex: 'status',
    // customRender: ({ record }) => {
    //   const status = record.status;
    //   let text = ""
    //   let color = "";
    //  if(status==0){
    //     text = "启用";
    //     color = "success";
    //   }else if(status==1){
    //     text = "禁用";
    //     color = "error";
    //   }
    //   return h(Tag, { color: color }, () => text);
    // },
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    width: 110,
    customRender: ({ record }) => {
      const timestamp = record.createtime;
      if(!timestamp){
          return "---";
      }
      // 计算年月日时分的函数
      var date = new Date(timestamp*1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      return Y + M + D 
    },
  },
  {
    title: '轻站名称',
    dataIndex: 'title',
  },
  {
    title: '发布状态',
    dataIndex: 'publish_status',
  },
  {
    title: '编辑网站入口',
    dataIndex: 'webhref',
  },
];
//搜索
export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'des',
    label: '描述',
    component: 'Input',
    colProps: { span: 8 },
  },
];
//表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户名',
    component: 'Input',
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
    field: 'groupid',
    label: '所属分组',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
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
