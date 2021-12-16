<!-- 车辆状态 -->
<template>
<div class='h5_carzt'>
      <Tb :Text="{...propsText}"></Tb>
      <van-cell :value="item.ddxx== undefined?'订单时间:'+'空':'订单时间:'+item.ddxx.substring(item.ddxx.lastIndexOf('-')-7)" v-for="item in dataAll" :key=item.id>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
            <span class="custom-title">司机:{{item.sj}}</span>
            <van-tag v-if="item.zt === '出勤'" type="danger">{{item.zt}}</van-tag>
            <van-tag v-else-if="item.zt === '待勤'" type="success">{{item.zt}}</van-tag>
            <van-tag v-else   type="primary">{{item.zt}}</van-tag>
        </template>
        </van-cell>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Tb from '../../components/h5/h5_tb.vue'
import { getCPHAndSJXM } from "../../start/api/index.js";
export default {
  name: 'h5_carzt',
//import引入的组件需要注入到对象中才能使用
components: {Tb},
data() {
//这里存放数据
return {
 propsText: {
            num: 1,
            Titletext: "车辆状态",
        },
    dataAll:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   goapi() {
      getCPHAndSJXM({}).then((res)=>{
         this.dataAll = res.data;
      
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
 .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
</style>