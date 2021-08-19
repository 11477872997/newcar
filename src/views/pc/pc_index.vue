<!-- pc端首页 -->
<template>
  <div id="pc_Index">
    <el-container class="home-box">
      <el-aside class="home-aside" :width="icons + 'px'">
        <!-- 左边菜单 -->
        <menus />   
      </el-aside>
      <el-container>
        <el-header class="box-header">
          <el-row :gutter="10">
          <el-col :xs="24" :sm="14" :md="17" :lg="17" :xl="19">
            <!-- 导航栏 -->
               <tabs />
            </el-col>
          <el-col :xs="24" :sm="10" :md="7" :lg="7" :xl="5">
            <!-- 右边头像 -->
             <Headers /> 
            </el-col>
        </el-row>
        </el-header>
        <el-main class="box-mains">
          <div class="box-mains-contnets">
            <transition mode="out-in">
              <keep-alive>
                <router-view />
              </keep-alive>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menus from "../../components/pc/pc_index/menu.vue";
import tabs from "../../components/pc/pc_index/tabs.vue";
import Headers from "../../components/pc/pc_index/Headers.vue";
export default {
  name: "pc_Index",
  //import引入的组件需要注入到对象中才能使用
  components: {
    menus,
    Headers,
    tabs
  },
  data() {
    //这里存放数据
    return {
      icons: "200",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
<style  scoped>
#pc_Index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home-box {
  width: 100%;
  height: 100%;
}
.box-mains {
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #eeeeee;
}
.box-mains-contnets {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.home-aside {
  background: #343334;
}
.box-header {
  padding-top: 10px;
}
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: 0.5s;
}

.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.5s;
}
</style>