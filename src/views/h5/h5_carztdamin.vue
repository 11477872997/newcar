<!-- 用户名车辆状态 -->
<template>
  <div class="h5_carztdamin">
    <Tb :Text="{ ...propsText }"></Tb>
    <div
      class="van-cell h5_carztdaminmian"
      v-for="(item, index) in dataAll"
      :key="item.index"
    >
      <div>
        <div v-for="name in item[index].slice().reverse()" :key="name.id" class="h5_carztdamibox">
          {{name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Tb from "../../components/h5/h5_tb.vue";
import { api_getAllSJToday } from "../../start/api/index.js";
export default {
  name: "h5_carztdamin",
  //import引入的组件需要注入到对象中才能使用
  components: { Tb },
  data() {
    //这里存放数据
    return {
      propsText: {
        num: 1,
        Titletext: "当日司机订单",
      },
      dataAll: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goapi() {
      api_getAllSJToday().then((res) => {
        console.log(res);
        this.dataAll = res.data;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.goapi();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.h5_carztdaminmian {
  border-bottom: 2px transparent solid;
  border-top: 2px transparent solid;
  border-image: linear-gradient(to right, #e6daea, #e6e7e8) 2 10;
  margin: 5px 0px 5px 0px;
}
.h5_carztdamibox {
  border-bottom: 1px solid #aaa6a6;
  padding: 5px;
}
</style>
