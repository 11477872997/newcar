<!-- h5公共 详情-->
<template>
<div class='h5_xqym'>
  <Tb :Text="{...propsText}"></Tb>
  <qxymUser  v-if="this.$route.query.qx == 'user'" />
  <qxymDmin  v-if="this.$route.query.qx == 'admin'" />
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Tb from '../../components/h5/h5_tb.vue'
import qxymUser from '../../components/h5/h5_xqym/xqym_user.vue'
import qxymDmin from '../../components/h5/h5_xqym/xqym_admin.vue'
export default {
  name: 'h5_xqym',
//import引入的组件需要注入到对象中才能使用
components: {
  Tb,
  qxymUser,
  qxymDmin
},
data() {
//这里存放数据
return {
propsText: {
        num: 1,
        Titletext: "订单详情",
    }
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

</style>