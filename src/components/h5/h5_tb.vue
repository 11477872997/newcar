<!-- 公共标题 -->
<template>
<div class='h5_tb'>
  <van-nav-bar
   v-if="Text.num == 0"
  :title=Text.Titletext
/>
<van-nav-bar  v-if="Text.num == 1" :title="Text.Titletext" left-text="返回" left-arrow @click-left="onClickLeft" />
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {

  name: 'h5_tb',
  props: {
    Text: {
      type: Object,
       default: function () { return {}}
    },
  },
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  onClickLeft() {
     function getCookie(name) {  //获取cookie
      var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
          if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
          else return null;
      }
     if(getCookie('userid') == null){
             this.$router.go(-1);
             return false;
          }
       this.$router.push({path:'/h5_me',query: { id:sessionStorage.getItem('userid')}});
      //  this.$router.push({path:'/h5_me'});
     
    },
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
/* .h5_tb{
position: fixed;
    width: 100%;
    z-index: 999;
    top: 0px;
} */

</style>