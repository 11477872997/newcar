<!-- 约车-->
<template>
<div class='pc_pactCar'>
     <el-row :gutter="20"  :model="from" class="el-row">
      <el-col :span="7">
        <el-date-picker
          :style="{width:'100%'}"
          v-model="from.ycsj"
          type="datetime"
          format="yyyy-MM-dd hh:mm"
          value-format="yyyy-MM-dd hh:mm"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-col>
      <el-col :span="7">
        <!-- <el-input v-model="from.ry">
          <template slot="prepend">人员</template>
        </el-input> -->
          <el-select v-model="from.ry" placeholder="请选择/输入人员"  multiple
    filterable
    allow-create
    default-first-option @blur="selectBlurry" :style="{width:'100%'}">
                    <el-option
                    v-for="item in ryslarr"
                    :key="item.username"
                    :value="item.username">
                    </el-option>
                </el-select>

      </el-col>
      <el-col :span="7">
        <el-input v-model="from.ycrs">
          <template slot="prepend">人数</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mB">
      <el-col :span="7">
           <el-select v-model="from.cfd" placeholder="请选择/输入出发地" filterable @blur="selectBlurcfd" :style="{width:'100%'}">
                <el-option
                v-for="item in options"
                :key="item.name"
                :value="item.name">
                </el-option>
            </el-select>
      </el-col>
      <el-col :span="7">
             <el-select v-model="from.mdd" placeholder="请选择/输入目的地" filterable @blur="selectBlurmdd" :style="{width:'100%'}">
                <el-option
                v-for="item in options"
                :key="item.name"
                :value="item.name">
                </el-option>
            </el-select>
      </el-col>
      <el-col :span="7">
        <el-input v-model="from.bz" clearable>
          <template slot="prepend">备注</template>
        </el-input>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="mB">
      <el-col :span="7">
           <el-select v-model="from.sfdd" placeholder="请选择/是否等待"  :style="{width:'100%'}"  >
                <el-option
                v-for="item in sfdd"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
      </el-col>
      
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">约车</el-button>
      </el-col>

    </el-row>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_ycinsert,api_count,api_getAllUser} from '../../start/api/index.js'
export default {
  name: 'pc_pactCar',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 from: {
        //查询
        ycsj: "",
        cfd: "",
        mdd: "",
        ry: "",
        bz: "",
        ycrs: "",
        sfdd:"",
      },
      sfdd:[
        {value:'是'},
        {value:'否'}
      ],
       ryslarr:[],
       options: require('../../start/json/actions.json')
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
   "from.ry":{
       handler(val,oldVal){
         if(val != ''){
            this.from.ycrs = val.length;
         }else{
           this.from.ycrs = '';
         }
       },
       deep:true //深度监听
   }
},
//方法集合
methods: {
     onSubmit() {
      let ycrxm = this.$store.state.username; //约车人
       if(this.from.ycsj == ""){
         this.$message({ type: 'danger', message: '约车时间不能空' });
        return false;
      }else if( this.from.ry == ''){
        this.$message({ type: 'danger', message: '人员不能空' });
         return false;
      }else if( this.from.ycrs == ''){
        this.$message({ type: 'danger', message: '人数不能空' });
         return false;
      }else if( this.from.cfd == ''){
        this.$message({ type: 'danger', message: '出发地不能空' });
         return false;
      }else if( this.from.mdd == ''){
        this.$message({ type: 'danger', message: '目的地不能空' });
         return false;
      }else if( this.from.sfdd == ''){
        this.$message({ type: 'danger', message: '是否等待不能空' });
         return false;
      }
      api_ycinsert({
        ycsj: this.from.ycsj,
        ycrs: this.from.ycrs,
        cfd: this.from.cfd,
        mdd: this.from.mdd,
        bz: this.from.bz,
        ry: this.from.ry.toString(),
        sfdd: this.from.sfdd,
        ycrxm: ycrxm,
        userid: sessionStorage.getItem('userid'),
      }).then((res) => {
        
           this.$message({
            message: "约车成功",
            type: "success",
          });
          api_count({});
          for(let key in this.from){  //清空表单的值
              this.from[key]  = ''
          }
      }).catch((error) => {
       this.$message.error("录入失败");
    });
    },
    selectBlurcfd(e){  //出发地
                this.from.cfd = e.target.value;
    },
    selectBlurmdd(e){  //目的地
            this.from.mdd = e.target.value;
    },
    selectBlurry(e){
       this.from.ry = e.target.value;

    },
     dataTime(time){  //处理时间
         let youWant =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDate() +
        " " +
        (time.getHours() >= 10 ? time.getHours() : "0" + time.getHours()) +
        ":" +
        (time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes());
        return youWant

    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 api_getAllUser().then((res) =>{
    
    this.ryslarr = res.data;
  })
  //获取当前时间
  let time = new Date;  
  this.from.ycsj = this.dataTime(time);
   this.from.sfdd = '否'
 
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