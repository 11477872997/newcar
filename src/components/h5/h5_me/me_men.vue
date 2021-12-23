<!-- 我的菜单 -->
<template>
<div class='me_men'>
   <div class=""  v-if="falg">
        <van-notice-bar
          left-icon="volume-o"
          scrollable 
          text="默认按钮状态为红色为“出勤”,点击按钮变为绿色为“待勤”。"
        />
        <van-button style="margin:15px" :type=typename @click="xgzt()">{{namezt}}</van-button>
      </div>
    <van-grid :gutter="3" :column-num="3">
        <van-grid-item v-for="item in mydata" :key="item.id" :icon="item.icon" :to="item.to" :text="item.text" :badge="item.badge" />
      </van-grid>
     
     
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {count,api_ycrxmFindAll,api_selectdqcl,api_clxxUpdate,api_getAllyc} from '../../../start/api/index.js'
import { Notify ,Dialog} from "vant";
export default {
  name: 'me_men',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    mydata:'',
    timer:null,
    falg:false,
    sjdata:'' ,//司机数据
    typename:'',
    namezt:"",//司机车辆状态
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   getmen(){
        let per =  sessionStorage.getItem('per');
      
          if(per == 'admin'){
            this.mydata = require('../../../start/json/h5_admin.json');
            count({}).then((res)=>{
                let dc = res.data[0].dc;
                let wp = res.data[0].wp;
                let yp = res.data[0].yp;
                for(let i = 0 ;i<this.mydata.length;i++){
                  if( this.mydata[i].text  == '未派车'){
                      this.mydata[i].badge = wp
                  };
                  if( this.mydata[i].text  == '已派车'){
                      this.mydata[i].badge = yp
                  };
                  if( this.mydata[i].text  == '等待车'){
                      this.mydata[i].badge = dc
                  };
                  
                }
              
            })
            return false;  
          }
          if(per == 'SJ'){
             this.mydata = require('../../../start/json/h5_dirver.json');
                // console.log()
              api_getAllyc({userid:sessionStorage.getItem('userid') }).then((res) => { 
                this.mydata[0].badge = res.data.length;
              });
             this.falg = true;
             api_selectdqcl({id:sessionStorage.getItem('userid') }).then((res) => {
               this.sjdata = res.data.result;
               if(res.data.result.zt == '6'){
                 this.typename = 'primary';
                  this.namezt = '待勤';
               }else if(res.data.result.zt == '5'){
                 this.typename = 'danger';
                 this.namezt = '出勤';
               }else{
                  this.typename = 'info';
                   this.namezt = '可拼车';
               }
              });
            return false;  
          }
          if(per == 'user'){
            let ycrxm = this.$store.state.username; //约车人
              this.mydata = require('../../../start/json/h5user.json');
            api_ycrxmFindAll({ycrxm: ycrxm, zt: "3" }).then((res)=>{
                  let wp = res.data.length;
                      for(let i = 0 ;i<this.mydata.length;i++){
                              if( this.mydata[i].text  == '未派车'){
                                  this.mydata[i].badge = wp
                              };
                      }
            })
            api_ycrxmFindAll({ycrxm: ycrxm, zt: "4" }).then((res)=>{
                  let yp = res.data.length;
                      for(let i = 0 ;i<this.mydata.length;i++){
                              if( this.mydata[i].text  == '已派车'){
                                  this.mydata[i].badge = yp
                              };
                      }
            })
            api_ycrxmFindAll({ycrxm: ycrxm, zt: "9" }).then((res)=>{
                  let dc = res.data.length;
                      for(let i = 0 ;i<this.mydata.length;i++){
                              if( this.mydata[i].text  == '等待车'){
                                  this.mydata[i].badge = dc

                              };
                      }
            })
              return false; 

          }
   },
   xgzt(){
       //取消订单
      Dialog.confirm({
        title: "车辆状态",
        message: "您确定呀修改为待勤吗？",
      }) .then(() => {
            api_clxxUpdate({
              zt: '6',
              sj: this.sjdata.sj,
              cph: this.sjdata.cph,
              dhhm: this.sjdata.dhhm,
              id: this.sjdata.id
        }).then((res) => {
              Notify({ type: 'success', message: '修改成功' });
              this.namezt = '待勤'
              this.typename = 'primary';
          })
        })
        .catch(() => {
          console.log("取消");
          // on cancel
        });
   
   }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.timer = setTimeout(this.getmen, 500);

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
.me_men{
  padding: 0px 10px 0px 10px;
}
</style>