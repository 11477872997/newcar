<!-- 个人名片 -->
<template>
<div class='me_xx'>
     <van-row type="flex" class="bg-green">
      <van-col span="6" class="mexx-img">
        <van-image round width="50" height="50" :src="Image" >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-col>
      <van-col span="12">
        <van-row>
          <van-col span="24" class="ME-text">{{this.$store.state.username}}</van-col>
          <van-col span="24" class="ME-ID">
            <van-button icon="delete-o" type="primary" size="small" @click="outlogo">退出登录</van-button>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'me_xx',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
   Image: require("../../../assets/admin.jpg"),
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
outlogo(){ //退出登录
   this.$router.push({ path: "/" });
}
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
.me_xx{
  padding: 0px 10px 0px 10px;
}
.bg-green{
     background: rgb(69 218 194);
    border-radius: 5px;
    margin: 15px 0px;
    padding: 10px 0px;
}
.mexx-img{
  padding: 15px;
}
.ME-box {
  padding: 5px;
}
.ME-text {
  font-size: 22px;
  color: #dff4ff;
  margin-top: 10px;
}
.ME-ID {
  font-size: 14px;
  color: #878d90;
  margin-top: 15px;
}
</style>