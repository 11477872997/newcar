<!-- 已派车编辑页面 -->
<template>
<div class='have-sent_modeAlet'>
 <el-dialog title="提示" :visible.sync="centerDialogVisible" width="35%" center>
            <el-row class="mT">
        <el-col :span="24">
          <el-col :span="7" class="el-seleect-letf">
           请选择时间
         </el-col>
          <el-col :span="17">
          <el-date-picker
            :style="{width:'100%'}"
            v-model="iddate.ycsj"
            type="datetime"
            format="yyyy-MM-DD HH:mm"
            value-format="yyyy-MM-DD HH:mm"
            placeholder="选择日期时间"
          ></el-date-picker>
           </el-col>
        </el-col>
      </el-row>

      <el-row class="mT">
        <el-col :span="24">
          <el-col :span="7" class="el-seleect-letf">
           是否等待
         </el-col>
         <el-col :span="17">
            <el-select v-model="iddate.sfdd" placeholder="请选择/是否等待"  :style="{width:'100%'}"  >
                <el-option
                v-for="item in sfdd"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
              </el-col>
        </el-col>
      </el-row>


      <el-row class="mT">
        <el-col :span="24">
          <el-col :span="7" class="el-seleect-letf">
           请选择/输入出发地
         </el-col>
         <el-col :span="17">
           <el-select v-model="iddate.cfd" placeholder="请选择/输入出发地" filterable @blur="selectBlurcfd" :style="{width:'100%'}">
                <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
              </el-col>
        </el-col>
      </el-row>
    <el-row class="mT">
        <el-col :span="24">
         <el-col :span="7" class="el-seleect-letf">
           请选择/输入目的地
         </el-col>
          <el-col :span="17">
          <el-select v-model="iddate.mdd" placeholder="请选择/输入目的地" filterable @blur="selectBlurmdd" :style="{width:'100%'}">
                <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
            </el-col>
        </el-col>
      </el-row>
      <el-row class="mT">
        <el-col :span="24">
          <el-input type="number" min="0" v-model="iddate.ycrs">
            <template slot="prepend">人&emsp;数</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="mT">
        <el-col :span="24">
          <!-- <el-input v-model="iddate.ry">
            <template slot="prepend">人&emsp;员</template>
          </el-input> -->
             <el-col :span="4" class="el-seleect-letf">
           人&emsp;员
         </el-col>
          <el-col :span="20">
    
              <el-select v-model="iddate.ry" 
              placeholder="请选择/输入人员"  
              multiple
             filterable
            allow-create
            default-first-option
             @blur="selectBlurry" :style="{width:'100%'}">
                    <el-option
                    v-for="item in ryslarr"
                    :key="item.username"
                    :value="item.username">
                    </el-option>
                </el-select>
                  </el-col>
        </el-col>
      </el-row>
      <el-row class="mT">
        <el-col :span="24">
          <el-input v-model="iddate.ycrxm">
            <template slot="prepend">提交人</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="mT" :gutter="20">
          <el-col :span="12">
          <el-select v-model="iddate.sj" placeholder="请选择司机" :style="{width:'100%'}" @change="getRole(iddate.sj)">
            <el-option
              v-for="item in this.$store.state.tableData"
              :key="item.value"
              :label="item.sj"
              :value="item.sj"
            > </el-option>
          </el-select>
        </el-col>
          <el-col :span="12">
           <el-input v-model="iddate.cph" :disabled="true">
            <template slot="prepend" >车牌号</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="mT">
        <el-col :span="24">
          <el-input v-model="iddate.bz">
            <template slot="prepend">备&emsp;注</template>
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="conserve(iddate.id)">发送</el-button>
      </span>
       <div class="TXLE">
            <el-row>
      <el-col :span="24">
        <el-table
          :data="this.$store.state.tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
          style="width: 100%"
        height="250"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
          stripe
          border
          header-row-class-name="tableHead"
        >
          <el-table-column prop="zt" label="状态">
            <template scope="scope">
                    <span v-if="scope.row.zt=== '在勤'" :style="{color:'#F56C6C'}" >在勤</span>
                    <span v-else-if="scope.row.zt=== '待命'" :style="{color:'#67C23A'}">待命</span>
                    <span v-else  :style="{color:'#409EFF'}">待勤</span>
             </template>
          </el-table-column>
          <el-table-column prop="sj" label="司机" align="center"></el-table-column>
          <el-table-column prop="cph" label="车牌号" align="center"></el-table-column>
          <el-table-column prop="mdd" label="目的地" align="center"></el-table-column>
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
      </div>
    </el-dialog>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { api_idFindAll,api_pcdUpdate,api_ypdFindAll,api_count,api_getAllUser} from '../../../start/api/index.js'
export default {
  name: 'have-sent_modeAlet',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
   centerDialogVisible: false,
    screenHeight: null,
    currentPage: 1, //页数
    pagesize: 10, //默认显示10页
    iddate: [], //查询当前id
    sfdd:[
        {value:'是'},
        {value:'否'}
      ],
       ryslarr:[],
    options: [   //出发地和目的的
        {  value: '吉祥路',  }, 
        {  value: '豪贤路', },
        {  value: '市府', }, 
        {  value: '环市路468大院', },
        {  value: '体育东省厅'},
        {  value: ' 白云分院(白云大道)'},
        {  value: '天河分院'},
        {  value: '番禺分院'},
        {  value: '南沙分院'}
    ],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  selectBlurry(e){
       this.iddate.ry = e.target.value;

    },
cancel(){  //取消
     this.centerDialogVisible = false;
  },
  conserve(id){  //保存
   api_pcdUpdate({
        id: id,
        ycsj: this.iddate.ycsj,
        ycrs: this.iddate.ycrs,
        cfd: this.iddate.cfd,
        mdd: this.iddate.mdd,
        zt: "4",
        sfdd: this.iddate.sfdd,
        bz: this.iddate.bz,
        ry: this.iddate.ry.toString(),
        cph: this.iddate.cph,
        sj: this.iddate.sj,
        ycrxm: this.iddate.ycrxm,
        userid:this.iddate.ycruserid,
      }).then((res) => {
        if (res.code == 200) {
        this.$message({
            message: "发送成功，订单已经到已派车列表",
            type: "success",
          });
         this.cancel();
         api_ypdFindAll({});
         api_count({});
        }
      });
  },
   getRowKeys(row) {
      //保存上一页的数据
      return row.e;
    },
     handleSelectionChange(val) {
      //选中的条数
      this.dataListSelections = val;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
      parentHandleclick(row){ 
            api_idFindAll({ id: row.id }).then((res) => {
                        if (res.code == 200) {
                        this.iddate = res.data[0];
                         this.iddate.ry = this.iddate.ry.split(',');
                        }
                    });
        this.centerDialogVisible = true;
    },
     getRole(e){  //下拉数据
        for(let key of this.$store.state.tableData){
          if(e == key.sj){
          this.iddate.cph = key.cph;
          }
        }
    },
    selectBlurcfd(e){  //出发地
      this.iddate.cfd = e.target.value;
    },
    selectBlurmdd(e){  //目的地
        this.iddate.mdd = e.target.value;
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 api_getAllUser().then((res) =>{
    // console.log(res)
    this.ryslarr = res.data;
  })
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
.TXLE{
    position: absolute;
    left: 103%;
    width: 500px;
    background: #fff;
    top: 0;
    overflow: hidden;
    overflow-y: auto;
}
</style>