<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" >
      <template #cid="{model, field}">
        <a-select
              v-model:value="model[field]"
              show-search
              allowClear
              placeholder="选择分组"
              style="width: 100%"
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              @search="searchGroup"
            >
            <a-select-option v-for="item in grouplist"  :value="item['id']+''"><span v-html="item['name_txt']"></span></a-select-option>
          </a-select>
      </template>
      </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dept.data';

  //APi
  import { getGroupTree } from '/@/api/microweb/webmain';
  import { saveMemberData } from '/@/api/microweb/member';
  import { Select} from 'ant-design-vue';
  import md5 from 'md5'
  export default defineComponent({
    name: 'addclient',
    components: { BasicModal, BasicForm , ASelect:Select,ASelectOption:Select.Option },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const grouplist = ref([]);
      const isUpdate = ref(true);
      let Id = ref(0);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          Id.value=data.record.id
          sessionStorage.setItem("accountID", data.record.id)
        }else{
          Id.value=0
          sessionStorage.removeItem("accountID")
          setFieldsValue({
             cid:data.cid
          });
        }
        getGroupList("")
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户账号' : '编辑用户账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          //提交到数据库
           if(Id.value>0){
             values.id=Id.value
           }else{
            if(!values["password"]){
              values["password"]="123456"
            }
           }
           if(values["password"]){
            values["password"]=md5(values["password"])
           }
          const resultdata = await saveMemberData(values);
           console.log("提交结果：",resultdata); 
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: Id.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      //搜索分组
      function searchGroup(val) {
          getGroupList(val)
      }
        //获取分组数据
      async function getGroupList(keyword){
        grouplist.value= await getGroupTree({keyword:keyword})
      }
      return { 
        registerModal, 
        registerForm, 
        getTitle, 
        handleSubmit,
        searchGroup,
        grouplist,
       };
    },
  });
</script>
