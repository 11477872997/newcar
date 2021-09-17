<!-- h5未派订单 -->
<template>
<div class='h5_wp'>
<Tb :Text="{...propsText}"></Tb>
<h5pariculasr :objname="{...propsObj}"></h5pariculasr>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Tb from '../../components/h5/h5_tb.vue'
import h5pariculasr from '../../components/h5/h5_pariculasr.vue'
export default {
  name: 'h5_wp',
//import引入的组件需要注入到对象中才能使用
components: {
    Tb,
    h5pariculasr
},
data() {
//这里存放数据
return {
  propsText: {
        num: 1,
        Titletext: "未派订单",
    },
  propsObj: {
        zt: 3,
        name: "wp",
        qx:''
    },
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.propsObj.qx =  sessionStorage.getItem('per');  //根据用户访问路由权限
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
.h5_tb{
position: fixed;
    width: 100%;
    z-index: 999;
    top: 0px;
}

</style>