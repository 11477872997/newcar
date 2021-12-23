<!-- 待派车表格 -->
<template>
  <div class="didtable">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="
            this.$store.state.ddtableData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          style="width: 100%"
          :height="screenHeight"
          :row-key="getRowKeys"
          stripe
          border
          header-row-class-name="tableHead"
        >
          <el-table-column
            type="index"
            label="序号"
            width="55"
          ></el-table-column>
          <el-table-column
            prop="ycsj"
            label="日期"
            align="center"
            sortable
          ></el-table-column>
          <el-table-column prop="zt" label="状态"></el-table-column>
          <el-table-column
            prop="ry"
            label="人员"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="cfd"
            label="出发地"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mdd"
            label="目的地"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button @click="scopeClick(scope.row)" type="text" size="small"
                >详情</el-button >
              <el-button @click="scqxdd(scope.row)" type="text" size="small"
                >取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="mT">
      <el-col :span="24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.$store.state.ddtableData.length"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <didModeAlet ref="mychild" />
    <didScopeClick ref="didScopeClick" /> 
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
api_getAllDCadata,
api_ycztUpdate
} from "../../../start/api/index.js";
import didModeAlet from "../pc_have_sent_car/have-sent_modeAlet.vue";
import didScopeClick from "../pc_did_not_car/did_scopeClick.vue";

export default {
  name: "didtable",
  //import引入的组件需要注入到对象中才能使用
  components: {
    didModeAlet,
    didScopeClick,
  },
  data() {
    //这里存放数据
    return {
      screenHeight: null,
      currentPage: 1, //页数
      pagesize: 10, //默认显示10页
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getRowKeys(row) {
      //保存上一页的数据
      return row.e;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleClick(row) {
      //编辑当前待派车订单
      this.$refs.mychild.parentHandleclick(row);
    },
    scopeClick(row) {
      //查看详情
      this.$refs.didScopeClick.parentHandleclick(row);
    },
    scqxdd(row) {
      //取消订单
      this.$confirm("您确定取消这个订单吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api_ycztUpdate({
            zt: "2",
            ycid: row.id,
          }).then((res) => {
            if (res.data == true) {
              this.$message({
                type: "success",
                message: "取消成功!",
              });
            } else if (res.data == false) {
              this.$message({
                type: "info",
                message: "取消失败",
              });
            }
            api_getAllDCadata({});
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消失败",
          });
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  api_getAllDCadata({});
  },
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
</style>