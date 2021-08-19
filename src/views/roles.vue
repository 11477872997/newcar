<!-- 权限页面 -->
<template>
<div class="bg">
    <div class="bg_img" :style="{backgroundImage:`url(${login_img})`}">
    </div>
 </div>
</template>

<script>
export default {
data() {
//这里存放数据
return {
    login_img: require("../assets/Power.png"),
};
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
      //  localStorage.clear();   //重定向登陆页面清空值
      
},
}
</script>
<style  scoped>
.bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100%);
}
.bg_img{
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center center;
  position: relative;
}
</style>