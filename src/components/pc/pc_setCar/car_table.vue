<!-- 车辆管理表格 -->
<template>
<div class='car_table'>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="this.$store.state.tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
          style="width: 100%"
          :height="screenHeight"
          :row-key="getRowKeys"
          stripe
          border
          header-row-class-name="tableHead"
        >
          <el-table-column type="index"  label="序号" width="55"></el-table-column>
          <el-table-column prop="zt" label="状态"  align="center">
            <template slot-scope="scope">
                    <span v-if="scope.row.zt=== '出勤'" :style="{color:'#F56C6C',cursor:'pointer'}" @click="mddClick(scope.row.id)" >出勤</span>
                    <span v-else-if="scope.row.zt=== '待勤'" :style="{color:'#67C23A'}">待勤</span>
                    <span v-else  :style="{color:'#409EFF'}">待勤中(可拼车)</span>
             </template>
          </el-table-column>
          <el-table-column prop="cph" label="车牌号" align="center"></el-table-column>
          <el-table-column prop="sj" label="司机" align="center"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button
                type="text"
                size="small"
                :style="{color:'#F56C6C'}"
                @click="deletes(scope.row)"
              >删除</el-button>
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
          :total="this.$store.state.tableData.length"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <carModeAlet  ref="mychild" />
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_deletes,api_pccxsyFindAll} from '../../../start/api/index.js'
import carModeAlet from './car_modeAlet.vue'
export default {
  name: 'car_table',
//import引入的组件需要注入到对象中才能使用
components: {
  carModeAlet
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
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    deletes(row){   //删除当前车辆
            this.$confirm('您确定要删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //删除
            api_deletes({ cph: row.cph }).then((res) => {
            if (res.code == 200) {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                api_pccxsyFindAll({});
            };
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
     handleClick(row) {   //编辑当前车辆
         this.$refs.mychild.parentHandleclick(row);
      },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
api_pccxsyFindAll({});
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