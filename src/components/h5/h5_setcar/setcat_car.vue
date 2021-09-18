<!-- 车辆管理列表 -->
<template>
<div class='setcat_car'>
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
            :title="('车牌号 : '+item.cph)"
            :desc="('司机 : '+item.sj) "
            :thumb="picUrlOff"
          >
            <template #footer>
              <van-button size="normal"  type="info"  @click="xqyem(item.cph)">修改状态</van-button>
              <van-button size="normal"  type="info" @click="SCDD(item.cph)">删除</van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
    </div>
    <!-- 原本展示数据 -->
    <div v-else class="box-RN">
      <van-row type="flex" class="ME-box BOXshadow bg mT" v-for="item in clzt" :key="item.id">
        <van-col :span="24">
          <van-card
            :tag="item.zt"
            :title="('车牌号 : '+item.cph)"
            :desc="('司机 : '+item.sj) "
            :thumb="picUrlOff"
          >
            <template #footer>
              <van-button size="normal"  type="info" @click="xqyem(item.cph)">修改状态</van-button>
              <van-button size="normal"  type="info" @click="SCDD(item.cph)">删除</van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Notify } from "vant";
import { getCPHAndSJXM,api_deletes } from "../../../start/api/index.js";
export default {
  name: 'setcat_car',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
      value: "",
      picUrlOff: require("../../../assets/car.jpg"),
      // 搜索后的展示数据
      list: [],
      // 原本展示数据
      clzt:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  xqyem(cph) {
      this.$router.push({ path: "/h5_clxqye", query: { id: cph } }); ///跳转详细页面
    },
    SCDD(cph) {
      //删除订单
      api_deletes({cph: cph })
        .then((res) => {
          if (res.code == 200) {
           Notify({ type: 'success', message: '删除成功' });
            this.goapi();
          }
        })
    },
    onSearch() {
      //搜索
      let search = this.value;
      this.list = this.clzt.filter(function (product) {
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
    goapi() {
      getCPHAndSJXM({}).then((res)=>{
        this.clzt = res.data;
      });
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.goapi();
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.bg-car{
  margin: 15px 0px;
}
.SU{
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 46px;
}
.box-RN {
  padding-top: 98px;
}
</style>