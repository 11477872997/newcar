<!-- pc侧边栏 -->
<template>
  <div class="men">
    <ul  class="el-menu-vertical-demo el-menu menu" style="background-color: rgb(38 198 170);">
        <li  class="el-menu-item is-active" style="padding-left: 20px; color: rgb(38 198 170); background-color: rgb(52, 51, 52);">
          <i  class="el-icon-s-platform"></i>
          <span>信息中心用车管理系统</span>
          </li>
      </ul>
    <el-menu
      :class="'menu'"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#343334"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      @select="indexText"
      :index="item.index" v-for="item in arrs" :key="item.id"
    >
        <!-- 不包括一级菜单渲染 -->
        <el-menu-item v-if="item.menu == undefined" :index="item.index">
          <i :class="item.ico"></i>
          <span slot="title">{{item.text}}</span>
        </el-menu-item>
        <!-- 包含二级菜单渲染 -->
        <el-submenu v-if="item.menu !== undefined" :index="item.index">
          <template slot="title">
            <i :class="item.ico"></i>
            <span>{{item.text}}</span>
          </template>
          <el-menu-item-group v-for="myitem in item.menu" :key="myitem.id">
            <el-menu-item :index="myitem.index">
               <i :class="myitem.ico"></i>
              <span>{{myitem.text}}</span>
              </el-menu-item>
          </el-menu-item-group>
        </el-submenu>   
    </el-menu>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//   props: ["myisCollapse"],
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      activeIndex: "/pc_index",
      arrs:require('../../../start/json/men.json')
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(to) {
      this.setCurrentRoute();
    },
  },
  //方法集合
  methods: {
    setCurrentRoute() {
      
      //刷新页面选中当前路由
      this.activeIndex = this.$route.path; // 通过他就可以监听到当前路由状态并激活当前菜单
    },
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
    },
    indexText(index, path, text) {
     
      
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.setCurrentRoute();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
};
</script>
<style  scoped>
.menu {
  width: 100%;
  border-right: 0;
}
</style>