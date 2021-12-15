<!-- 已派车表格 -->
<template>
<div class='have_sent_table'>
     <el-row>
      <el-col :span="24">
        <el-table
          :data="this.$store.state.haveSenttableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
          style="width: 100%"
          :height="screenHeight"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
          stripe
          border
          header-row-class-name="tableHead"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column fixed prop="ycsj" label="日期" align="center" sortable></el-table-column>
          <el-table-column prop="zt" label="状态"></el-table-column>
          <el-table-column prop="ry" label="人员" align="center"></el-table-column>
          <el-table-column prop="cfd" label="出发地" align="center"></el-table-column>
          <el-table-column prop="mdd" label="目的地" align="center"></el-table-column>
          <el-table-column prop="cph" label="车牌号" align="center"></el-table-column>
          <el-table-column prop="sj" label="司机" align="center"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="scopeClick(scope.row)" type="text" size="small">详情</el-button>
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
          :total="this.$store.state.haveSenttableData.length"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <el-button
        type="primary"
        size="small"
        
        @click="dcExcle()"
      >导出EXCEL</el-button>
      </el-col>
    </el-row>
   
    <havesentmodeAlet  ref="mychild"/>
    <havesentScopeClick ref="didScopeClick" />
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { api_ypdFindAll} from '../../../start/api/index.js'
import exportExcel from "../../../start/js/excel.js";
import havesentScopeClick from './have_sentScopeClick.vue'
import havesentmodeAlet from './have-sent_modeAlet.vue'
export default {
  name: 'have_sent_table',
//import引入的组件需要注入到对象中才能使用
components: {
    havesentScopeClick,
    havesentmodeAlet
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
     handleSelectionChange(val) {
      //选中的条数
      this.dataListSelections = val;
    },
    handleSizeChange(val) {
      
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      
      this.currentPage = val;
    },
      handleClick(row) {   //编辑当前待派车订单
         this.$refs.mychild.parentHandleclick(row);
      },
     scopeClick(row) {   //查看详情
         this.$refs.didScopeClick.parentHandleclick(row);
      },
       dcExcle() {
      //导出数据
      let jsonData = this.dataListSelections;
      
      if (jsonData == undefined || jsonData.length <= 0) {
        this.$message.error("请勾选数据");
        return false;
      }
      let filed = {
        title: [
          "日期",
          "状态",
          "人数",
          "人员",
          "提交人",
          "出发地",
          "目的地",
          "车牌号",
          "司机",
          "备注",
        ],
        filed: [
          "ycsj",
          "zt",
          "ycrs",
          "ry",
          "ycrxm",
          "cfd",
          "mdd",
          "cph",
          "sj",
          "bz",
        ],
      }; //导出对应的字段
      exportExcel(jsonData, "已派车订单", filed);
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  api_ypdFindAll();
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