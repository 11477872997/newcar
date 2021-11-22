<!-- 车辆查询 -->
<template>
<div class='car_select'>
      <el-row :model="form" :gutter="20" class="mB">
      <el-col :span="4">
        <el-input v-model="form.cph" clearable>
          <template slot="prepend">车牌号</template>
        </el-input>
      </el-col>
      <el-col :span="7">
        <el-input v-model="form.sj" clearable>
          <template slot="prepend">司机</template>
        </el-input>
      </el-col>
      <el-col :span="7">
        <el-input v-model="form.zt" clearable>
          <template slot="prepend">车辆状态</template>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-col>
        <el-col :span="2">
         <carentty/>
      </el-col>
    </el-row>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import carentty from './car_entry.vue'
import {api_getCarMsg} from  '../../../start/api/index.js'
export default {
  name: 'car_select',
//import引入的组件需要注入到对象中才能使用
components: {
    carentty
},
data() {
//这里存放数据
return {
     form: {
          //查询
          sj: "",
          cph: "",
          zt: ""
      },
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
onSubmit(){  //查询
    api_getCarMsg({
        cph: this.form.cph,
        zt: this.form.zt,
        sj: this.form.sj
    }).then((res) => {
            
        if(res.data.status == 0){
              this.$message({ message: "查询无结果",ype: "success",});
              this.$store.state.tableData = [] //车辆管理查询表格数据
        }else{
            this.$store.state.tableData = res.data //车辆管理查询表格数据
        }
    }).catch((error) => {
        this.$message.error("查询失败");
    });
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 api_getCarMsg({})
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