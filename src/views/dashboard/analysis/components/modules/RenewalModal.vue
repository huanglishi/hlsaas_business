<template>
  <BasicModal
    @register="register"
    title="续费/续量"
    :showOkBtn="false"
    :showCancelBtn="false"
     width="780px"
    :bodyStyle="{ background: '#ededed'}"
  >
    <div class="formbox" v-if="recodedata">
        <div class="infobox">
          <div class="field">
              <div class="label">当前剩余量：</div>
              <div class="text">{{recodedata.value}}</div>
          </div>
        </div>
        <div class="inputbox">
          <!--预置-->
            <a-radio-group v-model:value="savedata.checkid" name="radioGroup" @change="checkPack">
              <div class="paybox">
                <div class="payitem" v-for="(item,i) in paylist" :key="i">
                    <div class="price">
                      <span class="duo">￥</span>
                      <span class="num">{{item.price}}</span>
                    </div>
                    <div class="timestext">数量：{{item.number}}</div>
                    <div class="line_blue"> </div>
                    <div class="checkroid"><a-radio :value="i+1">{{item.name}}</a-radio></div>
                </div>
                <div class="payitem selftiem" >
                    <div class="price">
                      <span class="duo">￥</span>
                      <span class="num">{{selfpay.price}}</span>
                    </div>
                    <div class="field">
                      <div class="label">数量：</div>
                      <div class="text">
                        <a-input-number style="width:100%" v-model:value="selfpay.number" :min="1" size="small">
                            <template #addonBefore><Icon class="iconbtn" color="#ff4d4f" icon="line-md:minus-circle" v-if="selfpay.number>packinfo.count" @click="()=>{selfpay.number=selfpay.number-packinfo.count}"></Icon></template>
                            <template #addonAfter><Icon class="iconbtn" color="#108ee9" icon="line-md:plus-circle" @click="()=>{selfpay.number=selfpay.number+packinfo.count}"></Icon></template>
                          </a-input-number>
                      </div>
                    </div>
                    <div class="line"> </div>
                    <div class="checkroid"><a-radio :value="0">选择自定义</a-radio></div>
                </div>
              </div>
          </a-radio-group>
        </div>
        <!--购买支付-->
        <div class="payform">
             <div class="title">支付订单</div>
             <div class="payinfo">
                <div class="field">
                  <div class="label">套餐：</div>
                  <div class="text">{{savedata.name}}</div>
                </div>
                <div class="field">
                  <div class="label">数量：</div>
                  <div class="text">{{savedata.number}}</div>
                </div>
                <div class="field">
                  <div class="label">价格：</div>
                  <div class="text">{{savedata.price}} 元</div>
                </div>
                <div class="field">
                  <div class="label">您的联系电话：</div>
                  <div class="text "><a-input style="width:260px;" v-model:value="savedata.mobile" class="inputline" type="tel" :bordered="false" placeholder="请填写您的联系电话,以便客服联系您" /></div>
                </div>
             </div>
            <div class="savebtn">
              <a-button type="primary" :loading="apyLoading" @click="submitPayOrder">
                <template #icon><Icon icon="ant-design:pay-circle-outlined" /></template>
                支付订单
              </a-button>
            </div>
        </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent,ref,watch} from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Radio,RadioGroup,InputNumber } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  //api
  import { getWebPayList,savaPayOrder} from '/@/api/sys/dashboard';
  import { useMessage } from '/@/hooks/web/useMessage';
  //返回
  import { useGo } from '/@/hooks/web/usePage';
  export default defineComponent({
    components: { BasicModal,[Radio.name]:Radio,[RadioGroup.name]:RadioGroup,
      [InputNumber.name]:InputNumber,Icon
    },
    emits: ['ok'],
    setup(_, { emit }) {
      const go = useGo();
      const {
        createMessage,
        createConfirm,
      } = useMessage();
      const apyLoading=ref(false)
      const recodedata=ref()
      const savedata=ref({checkid:0,name:"自定义",number:0,price:0,mobile:""})
      const packinfo=ref({count:0,price:0})//包信息
      //自定套餐
      const selfpay=ref({number:0,price:0})
      //预置支付套餐
      interface paylistModel {
          name:string;
          number: number;
          price: number;
        }
      const paylist=ref<paylistModel[]>([])
      const [register, { closeModal }] = useModalInner(async (data) => {
         recodedata.value=data.item
         const getdata=await getWebPayList({funkey:data.item["funkey"]})
         paylist.value=getdata.paylist
         packinfo.value.count=getdata.packagedata.count
         packinfo.value.price=parseFloat(getdata.packagedata.price)
         //自定义
         savedata.value.number=getdata.packagedata.count
         savedata.value.price=parseFloat(getdata.packagedata.price)
         selfpay.value.number= savedata.value.number
         selfpay.value.price= savedata.value.price
      });
      watch(
        () => selfpay.value.number,
        (newval) => {
          const selfprice=((newval/packinfo.value.count)*packinfo.value.price).toFixed(2)
          selfpay.value.price=selfprice
          if(savedata.value.checkid==0){
            savedata.value.number=newval
            savedata.value.price=selfprice
          }
        }
      )
      //选择服务包
      function checkPack(e){
        savedata.value.checkid=e.target.value
        if(e.target.value==0){
          savedata.value.name="自定义"
          savedata.value.number=selfpay.value.number
          savedata.value.price=selfpay.value.price
        }else{
          const selectdata=paylist.value[e.target.value-1]
          if(savedata){
            savedata.value.name=selectdata.name
            savedata.value.number=selectdata.number
            savedata.value.price=selectdata.price
          }
          
        }
      }
      //提交数据
      function submitPayOrder(){
        apyLoading.value=true
        createConfirm({
          iconType: "info",
          title: '温馨提示',
          content: '支付当前只是提交订单，客服主动联系您详细付款，是否继续提交？',
          okText:"继续",
          onOk:(()=>{
            dosavedata()
          }),
          onCancel:(()=>{
            apyLoading.value=false
          }),
        });
      }
      //提交数据到数据库
      async function dosavedata(){
        try {
            createMessage.loading({ content: '订单提交中...', key:"savaPayOrder",duration:0});
            const sdata={
              type:1,
              title:savedata.value.name,
              number:savedata.value.number,
              price:savedata.value.price,
              mobile:savedata.value.mobile,
            }
            const resultdata = await savaPayOrder(sdata);
            if(resultdata){
              createMessage.success({ content: "提交成功！", key:"savaPayOrder", duration: 2 });
              emit('ok');
              createConfirm({
                  iconType: "info",
                  title: '提交成功！',
                  content: '您的订单已经提交成功，等待客服人员与您联系，您可订单管理查看。',
                  okText:"查看订单",
                  cancelText:"关闭",
                  onOk:(()=>{
                    go('/ordermanag/servicepackage');
                  }),
                  onCancel:(()=>{
                    closeModal()
                  })
                });
            }
            apyLoading.value=false
          } catch {
            apyLoading.value=false
            createMessage.destroy();
          }
      }
      return {
        register,
        closeModal,
        recodedata,
        paylist,savedata,selfpay,packinfo,apyLoading,
        submitPayOrder,checkPack,
      };
    },
  });
</script>
<style lang="less" scoped>
.formbox{
  padding: 0px 5px;
  .infobox{
    .field{
      display: flex;
      .label{
          font-size: 14px;
      }
      .text{
        flex:1;
      }
    }
  }
  .inputbox{
    margin-top: 10px;
    .paybox{
      // display: flex;
      // justify-content: flex-start;
      .payitem{
        width: 150px;
        background-color: #65a6ff;
        border-radius: 3px;
        display: inline-block;
        margin: 0px 10px 10px 0px;
        box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 15%);
        color: #1bc3bb;
        background: #e8f9f8;
        transition: color .15s ease,background-color .15s ease,border-color .15s ease,box-shadow .15s ease;
        .price{
          text-align: center;
          padding: 10px;
          .duo{
            font-size: 30px;
            font-weight: 700;
            color:#d4d4d4;
          }
          .num{
            font-size: 20px;
            font-weight: 600;
            color: #1bc3bb
          }
        }
        .timestext{
          padding: 10px;
          font-size: 13px;
        }
        .line_blue{
          width: 100%;
          border-bottom: #c4f5f2  solid 1px;
        }
        .line{
          width: 100%;
          border-bottom: #e5e7eb solid 1px;
        }
        .checkroid{
          padding: 10px;
        }
      }
      .selftiem{
        width: 180px;
        color: #000000;
        background: #ffffff;
        .field{
          display: flex;
          padding: 8px;
          .label{
            font-size: 13px;
          }
          .text{
            flex:1;
          }
        }
      }
    }
  }
  .payform{
    padding: 10px;
    background: #ffffff;
    .title{
      font-size: 15px;
      font-weight: 600;
    }
    .payinfo{
       .field{
          display: flex;
          .label{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 13px;
          }
          .text{
            flex:1;
          }
          .inputline{
            border-bottom: #e5e7eb solid 1px;
            width:260px;
          }
        }
    }
    .savebtn{
      margin-top: 10px;
    }
  }
}
.iconbtn{
    user-select: none;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
  }
  :deep(.ant-input-number-group-addon){
    padding: 0 5px;
  }
</style>
