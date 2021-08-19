<!-- 左边头像 -->
<template>
  <div class="Headers">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-badge :value="this.$store.state.Did_not_send" class="item" >
          <el-button size="small" @click="Did_not_send()">未派车</el-button>
        </el-badge>
      </el-col>
      <el-col :span="6">
        <el-badge :value="this.$store.state.Have_sent" class="item" type="primary">
          <el-button size="small" @click="Have_sent()">已派车</el-button>
        </el-badge>
      </el-col>
      <el-col :span="4">
        <el-avatar :src="admin_img"></el-avatar>
      </el-col>
      <el-col :span="8">
        <el-dropdown @command="handleCommand" class="tabsAdmin">
          <span class="el-dropdown-link">
            {{ this.$store.state.username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="TC">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_count} from '../../../start/api/index.js'
export default {
  name: "Headers",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      admin_img: require("../../../assets/admin.jpg"),
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command == "TC") {
        sessionStorage.clear();
        this.$router.push({
          path: "/login",
        });
      }
    },
    Have_sent() {
      //已派
      this.$router.push({ path: "/pc_have_sent_car" });
    },
    Did_not_send() {
      //未派
      this.$router.push({ path: "/pc_did_not_car" });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
     api_count({}); //调用api
  },
};
</script>
<style  scoped>
.Headers {
  padding-top: 5px;
}
.tabsAdmin {
  padding-top: 15px;
  margin-left: 8px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-avatar--circle {
  float: left;
}
</style>