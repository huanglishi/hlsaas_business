<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleCreate"> 新增角色 </a-button> -->
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'"  >
          <a-tag :color="statusFont(record.status,'color')">
              <template #icon>
                <Icon :about="statusFont(record.status,'icon')"></Icon>
              </template>
              {{statusFont(record.status,'text')}}
          </a-tag>
        </template>
        <template v-if="column.key === 'action'"  >
          <!-- <a-popconfirm placement="leftTop" :showCancel="false" okText="提交">
            <template #icon> <Icon icon="icon-park-outline:audit"></Icon></template>
            <template #title>
              <div class="fieldbox">
                  <div class="item">
                    <div class="label">审核</div>
                    <div class="text"></div>
                  </div>
                  <div class="item">
                    <div class="label">原因</div>
                    <div class="text"></div>
                  </div>
              </div>
            </template>
            
          </a-popconfirm> -->
          <!-- <a  >审批</a> -->
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getOrderList } from '/@/api/ordermanag/servicepackage';
  import { columns, searchFormSchema } from './role.data';
  import { Icon } from '/@/components/Icon';
  import { Popconfirm } from 'ant-design-vue';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, Icon,[Popconfirm.name]:Popconfirm},
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '订单数据列表',
        api: getOrderList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        reload()
      }

      function handleEdit(record: Recordable) {
        console.log(record)
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }
      //状态
      function statusFont(status,type) {
        let text="",icon="",color="";
          if(status==0){

          }else if(status==1){

          }
          if(type=="text"){
            return text
          }else if(type=="icon"){
            return icon
          }else if(type=="color"){
            return color
          }
      }
      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        statusFont,
      };
    },
  });
</script>
