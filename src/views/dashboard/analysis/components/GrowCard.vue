<template>
  <div class="md:flex">
    <template v-for="(item, index) in datalist" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color" v-if="item.action" class="TRbtn" @click="onHandleTag(item)">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo :prefix="item.valueprefix" :suffix="item.valuesuffix" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo :prefix="item.totalfix" :suffix="item.totalsuffix" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
    <!--续费-->
    <RenewalModal @register="RenewalRegister"  />
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';
  import { GrowCardItem } from '../data';
  //组件
  import RenewalModal from './modules/RenewalModal.vue';
  import { useModal } from '/@/components/Modal';
  //api
  import { getNumList } from '/@/api/sys/dashboard';
  import {ref } from 'vue';
  const [RenewalRegister, { openModal: openRenewal }] = useModal();//续费
  const datalist = ref<GrowCardItem[]>([]);
  const gatlist  =async ()=>{
    datalist.value=await getNumList() 
  }
  gatlist()
  function onHandleTag(item){
    if(item.funkey=="microweb"){//轻站续费
       openRenewal(true, {
          item
        });
    }
  }
  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
<style lang="less" scoped>
  .TRbtn{
    user-select: none;
    cursor:pointer;
  }
</style>
