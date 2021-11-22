<!-- 当前车辆编辑 -->
<template>
<div class='car_modeAlet'>
  <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-row class="mT">
        <el-col :span="24">
          <el-select v-model="iddate.zt" placeholder="请选择" :style="{width:'100%'}">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="mT">
        <el-col :span="24">
          <el-input v-model="iddate.cph">
            <template slot="prepend">车牌号&emsp;</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="mT">
        <el-col :span="24">
          <el-input v-model="iddate.sj">
            <template slot="prepend">司&emsp;&emsp;机</template>
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="conserve(iddate.id)">保存</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_selectdqcl,api_clxxUpdate,api_pccxsyFindAll} from  '../../../start/api/index.js'
export default {
  name: 'car_modeAlet',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    centerDialogVisible:false,
    iddate:[], //当前车辆数据
    options: [
        {
          value: "6",
          label: "待勤",
        },
        {
          value: "5",
          label: "出勤",
        },
        {
          value: "7",
          label: "待勤中(可拼车)",
        },
      ],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  parentHandleclick(row){   //编辑当前车辆
       api_selectdqcl({ id: row.id }).then((res) => {
          this.iddate = res.data.result;
      });
      this.centerDialogVisible = true;
  },
  cancel(){  //取消
     this.centerDialogVisible = false;
  },
  conserve(id){  //保存
    //保存
      api_clxxUpdate({
        cph: this.iddate.cph.trim(),
        sj: this.iddate.sj.trim(),
        id: this.iddate.id,
        zt: this.iddate.zt.trim(),
      }).then((res) => {
       
           this.$message({
                    message: '保存成功',
                    type: 'success'
        });
          this.cancel();
          api_pccxsyFindAll({});
    }).catch((error)=>{
       this.$message.error("保存失败");
    })
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

</style>