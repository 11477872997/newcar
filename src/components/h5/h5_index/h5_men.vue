<!-- h5菜单 -->
<template>
<div class='h5_men'>
    <van-tabbar route v-model="active">
        <van-tabbar-item replace v-for="item in mydata" :key="item.id" :icon="item.icon" :to="item.to" :name="item.name">
       {{item.text}}</van-tabbar-item>
        </van-tabbar>
     <!-- 子路由出口 -->
    <router-view />
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'h5_men',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    active:"",//高亮选中
    mydata:[],
    timer:null
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
       //实时监听路由状态
    "$route.path": {
      handler(val) {
        //刷新页面定位当前高亮
        // console.log(val)
        this.active = val;
      },
      immediate: true, //立即执行
    },
},
//方法集合
methods: {
  getmen(){
    let per = sessionStorage.getItem('per');
     console.log(per+'-----men')
      if(per == 'admin'){
        this.mydata = require('../../../start/json/h5_men.json')
        return false;
      }
      if(per == 'SJ' || per == 'user'){
        this.mydata = require('../../../start/json/h5_user.json')
        return false;
      }
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.timer = setTimeout(this.getmen, 500);
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

</style>