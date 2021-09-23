<!-- 公共订单列表 -->
<template>
  <div class="pariculasr">
    <van-row type="flex" class="SU">
      <van-col span="24">
        <van-search v-model="value" show-action placeholder="请输入时间、地点、人员等信息" @search="onSearch">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </van-col>
    </van-row>
    <!-- 搜索后的展示数据  -->
    <div v-if="list.length>0" class="box-RN">
      <van-row type="flex" class="ME-box BOXshadow bg mT" v-for="item in list" :key="item.id">
        <van-col :span="24">
          <van-card
            :tag="item.zt"
            :title="('目的地 : '+item.mdd)"
            :desc="('提交人 : '+item.ycrxm) "
            :thumb="picUrlOff"
          >
            <template #tags>
              <van-tag plain type="danger">订单时间 : {{item.ycsj}}</van-tag>
            </template>
            <template #footer>
              <van-button size="normal"  type="info"  @click="xqyem(item.id)">详情</van-button>
              <van-button  size="normal"  type="info"  @click="qxdd(item.id)">取消订单</van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
    </div>
    <!-- 原本展示数据 -->
    <div v-else class="box-RN">
      <van-row type="flex" class="ME-box BOXshadow bg mT" v-for="item in mydae" :key="item.id">
        <van-col :span="24">
          <van-card
            :tag="item.zt"
            :title="('目的地 : '+item.mdd)"
            :desc="('提交人 : '+item.ycrxm) "
            :thumb="picUrlOff"
          >
            <template #tags>
              <van-tag plain type="danger">订单时间 : {{item.ycsj}}</van-tag>
            </template>
            <template #footer>
              <van-button size="normal"  type="info" @click="xqyem(item.id)">详情</van-button>
              <van-button size="normal"  type="info" @click="qxdd(item.id)" >取消订单</van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {dpdFindAll,api_ycrxmFindAll,ypdFindAll,api_ycztUpdate} from '../../start/api/index.js'
import { Dialog,Notify } from 'vant';
export default {
    props: {
    objname: {
      type: Object,
       default: function () { return {}}
    },
  },
  components: {

  },
  data() {
    //这里存放数据
    return {
      value: "",
      un:'',
       flag:"",//权限变量
      picUrlOff: require("../../assets/car.jpg"),
      // 搜索后的展示数据
      list: [],
      // 原本展示数据
      mydae: [],
    };
  },
  //方法集合
  methods: {
    xqyem(id) {
      let qx = this.objname.qx 
      let zt = this.objname.zt;
      this.$router.push({ path: "/h5_xqym", query: { id: id ,qx:qx,zt:zt} }); ///跳转详细页面
    },
    qxdd(id) {
      //取消订单
      Dialog.confirm({
        title: "订单信息",
        message: "您确定呀取消订单吗？",
      }) .then(() => {
          // on confirm
          api_ycztUpdate({
            zt:'2',
            ycid:id
          }).then((res)=>{
            console.log(res)
            if(res.data == true){
              Notify({ type: 'success', message: '取消成功' });
              this.$router.go(-1);
            }else if(res.data == false){
               Notify({ type: 'danger', message: '取消失败' });
            }
            
          })
        })
        .catch(() => {
          console.log("取消");
          // on cancel
        });
    },
    onSearch() {
      //搜索
      let search = this.value;
      this.list = this.mydae.filter(function (product) {
        // 每一项数据
        // console.log(product)
        return Object.keys(product).some(function (key) {
          //   // 每一项数据的参数名
          // console.log(key)
          return (
            String(product[key])
              // toLowerCase() 方法用于把字符串转换为小写。
              .toLowerCase()
              // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
              .indexOf(search) > -1
          );
        });
      });
    },
    mydaeFN() {
    //   管理员
    // 未派订单列表数据
    if(this.objname.zt == 3 && this.objname.name == 'wp' && this.objname.qx == 'admin'){
         dpdFindAll({}).then((res) => {
          if (res.code == 200) {
            this.mydae = res.data;
          }
        });
        return false;
    }
    // 提交人
    // 未派订单列表数据
    if(this.objname.zt == 3 && this.objname.name == 'wp' && this.objname.qx == 'user'){
         api_ycrxmFindAll({ycrxm:this.$store.state.username,zt:"3"}).then((res) => {
          if (res.code == 200) {
            this.mydae = res.data;
          }
        });
        return false;
    }
 //   管理员
    // 已派订单列表数据
    if(this.objname.zt == 4 && this.objname.name == 'yp' && this.objname.qx == 'admin'){
         ypdFindAll({}).then((res) => {
          if (res.code == 200) {
            this.mydae = res.data;
          }
        });
        return false;
    }
     // 提交人
    // 已派订单列表数据
    if(this.objname.zt == 4 && this.objname.name == 'yp' && this.objname.qx == 'user'){
         api_ycrxmFindAll({ycrxm:this.$store.state.username,zt:"4"}).then((res) => {
          if (res.code == 200) {
            this.mydae = res.data;
          }
        });
        return false;
    }



    },
  },
  mounted() {
    this.mydaeFN();
  },
};
</script>
<style  scoped>
.SU {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 46px;
}
.box-RN {
  padding-top: 98px;
}
</style>