<!-- 车辆录入 -->
<template>
<div class='car_entry'>
     <el-button type="primary" icon="el-icon-plus" @click="Ruchel">车辆录入</el-button>
         <!-- 录入 -->
    <el-dialog title="车辆录入" :visible.sync="centerLR" width="30%" center :model='from'>
        <el-row  class="el-row">
        <el-col :span="24">
          <el-input v-model="from.sj">
            <template slot="prepend">司&emsp;机</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="from.cph">
            <template slot="prepend">车牌号</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="from.dhhm">
            <template slot="prepend">电话号码</template>
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="entry">录入</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_pcinsert,api_pccxsyFindAll} from '../../../start/api/index.js'
export default {
  name: 'car_entry',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  centerLR: false,
  from:{
      cph:'',
      sj:'',
      dhhm:''
  }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  Ruchel() {
      //添加
      this.centerLR = true;
    }, 
    entry(){   
         if(this.from.cph == ''){
              this.$message.error('车牌号不能空' );
            return false
          }else if(this.from.sj == ''){
              this.$message.error('司机不能空' );
            return false
          }else if(this.from.dhhm == ''){
              this.$message.error('电话不能空' );
            return false
          } 
      //录入
        api_pcinsert({ 
            cph:this.from.cph.trim(), 
            sj:this.from.sj.trim(),
            dhhm:this.from.dhhm.trim() 
            }).then((res) => {
                this.$message({
                    message: "录入成功",
                    type: "success",
                });
            this.cancel();
            api_pccxsyFindAll({});
            }).catch((error) => {
            this.$message.error("录入失败");
        });

    },
    cancel(){   //取消
       this.centerLR = false;
       for(let key in this.from){  //清空表单的值
              this.from[key]  = ''
          }
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