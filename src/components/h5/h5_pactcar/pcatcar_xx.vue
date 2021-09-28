<!-- 约车信息录入 -->
<template>
<div class='pactcar_xx'>
    <van-form @submit="onSubmit">
      <van-row class="BOXshadow mT bg " type="flex">
        <van-col span="24" style="height:5px"></van-col>
        <van-col span="24">
          <van-cell-group>
            <van-field
              v-model="from.ycsj"
              readonly
              clickable
              name="ycsj"
              label="时间选择"
              placeholder="点击选择时间"
              @click="showPicker = true"
              left-icon="todo-list-o"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-datetime-picker
                type="datetime"
                title="选择年月日小时"
                :min-date="minDate"
                :formatter="formatter"
                :max-date="maxDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
            
             <van-field
              v-model="from.sfdd"
              readonly
              clickable
              name="sfdd"
              label="是否等待"
              left-icon="manager-o"
              placeholder="点击选择是否等待"
              @click="showPicker3 = true"
            />

            <van-popup v-model="showPicker3" position="bottom">
              <van-picker
                show-toolbar
                :columns="sfdd"
                @confirm="onConfirm3"
                @cancel="showPicker3 = false"
              />
            </van-popup>


            <van-field
              v-model="from.ry"
              clearable
              label="人员"
              name="ry"
              left-icon="manager-o"
              placeholder="人员"
              right-icon="arrow"
              @click-right-icon="rytj"
            />
            <van-action-sheet v-model="rysl" :actions="ryslarr" :round="false" @select="onrytj" />
            <van-field
              v-model="from.ycrs"
              type="digit"
              clearable
              label="人数"
              left-icon="user-o"
              placeholder="人数"
              name="ycrs"
            />
            <van-field
              v-model="from.cfd"
              clearable
              label="出发地"
              name="cfd"
              left-icon="location-o"
              placeholder="出发地"
              right-icon="arrow"
              @click-right-icon="hadelType"
            />
            <van-action-sheet v-model="show" :actions="actions" :round="false" @select="onSelect" />
            <van-field
              v-model="from.mdd"
              clearable
              label="目的地"
              name="mdd"
              left-icon="location-o"
              placeholder="目的地"
              right-icon="arrow"
              @click-right-icon="hadeshowmdd"
            />
             <van-action-sheet v-model="showmdd" :actions="actions" :round="false" @select="onshowmdd" />
            <van-field
              v-model="from.bz"
              rows="2"
              autosize
              label="备注"
              type="textarea"
              maxlength="500"
              placeholder="请输入备注"
              show-word-limit
              left-icon="chat-o"
              name="bz"
            />
          </van-cell-group>
        </van-col>
        <van-col span="24" style="height:5px"></van-col>
      </van-row>
      <van-row type="flex" justify="center" class="YC-btn">
        <van-col span="9">
          <van-button class="BOXradius" block type="info" native-type="submit">提交订单</van-button>
        </van-col>
      </van-row>
    </van-form>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_ycinsert,api_getAllUser} from '../../../start/api/index.js'
import { Notify } from "vant";
export default {
  name: 'pactcar_xx',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
      showPicker: false,
      showPicker3: false,
      minDate: new Date(),
      maxDate: new Date(3000, 0, 1),
      currentDate: new Date(),
      sfdd: ["是", "否"],
   from:{
      ycsj: "", //约车时间
      ycrs: "", //约车人数
      cfd: "", //出发地
      mdd: "", //目的地
      bz: "", //备注
      ry: "" ,//人员 
      sfdd:'' //是否等待
   },
   show: false,
   showmdd:false,
   rysl:false,
   ryslarr:[],
   arrname:[],
   actions: [
          {  name: '吉祥路',  }, 
          {  name: '豪贤路', },
          {  name: '市府', }, 
          {  name: '环市路468大院', },
          {  name: '体育东省厅'},
          {  name: ' 白云分院(白云大道)'},
          {  name: '天河分院'},
          {  name: '番禺分院'},
          {  name: '南沙分院'}
          ]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
   "from.ry":{
       handler(val,oldVal){
         if(val != ''){
           let  arrnewlength = val.split(',');
            this.from.ycrs = arrnewlength.length;
         }else{
           this.from.ycrs = '';
           this.arrname = [];
         }
       },
       deep:true //深度监听
   }
},
//方法集合
methods: {
  onConfirm3(value,index) {
      //司机
     this.from.sfdd = value;
    //  console.log(index)
     this.showPicker3 = false;
    },
    hadelType(){
       this.show = true;
    },
    rytj(){
       this.rysl = true;
    },
    onrytj(item){
      if(this.arrname.indexOf(item.name) == -1){
        this.arrname.push(item.name)
      }
      this.from.ry = this.arrname.toString();
      // this. from. ycrs = this.arrname.length;
      // console.log( this.arrname.length)
       this.rysl = false;
    },
    onSelect(item){ //出发地
        this.from.cfd = item.name;
        this.show = false;
    },
     hadeshowmdd(){
       this.showmdd = true;
    },
    onshowmdd(item){  //目的地
        this.from.mdd = item.name;
        this.showmdd = false;
    },
    formatter(type, val) {
      //格式化年月日
      if (type == "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      } else if (type === "hour") {
        return `${val}时`;
      } else if (type === "minute") {
        return `${val}分`;
      }
      return val;
    },
    onConfirm(time) { //选择时间
      this.from.ycsj = this.dataTime(time);
      this.showPicker = false;
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
 onSubmit(names) {
      let ycrxm = this.$store.state.username; //约车人
      if(names.ycsj == ""){
        Notify({ type: 'danger', message: '约车时间不能空' });
        return false;
      }else if( names.ry == ''){
        Notify({ type: 'danger', message: '人员不能空' });
         return false;
      }else if( names.ycrs == ''){
        Notify({ type: 'danger', message: '人数不能空' });
         return false;
      }else if( names.cfd == ''){
        Notify({ type: 'danger', message: '出发地不能空' });
         return false;
      }else if( names.mdd == ''){
        Notify({ type: 'danger', message: '目的地不能空' });
         return false;
      }else if( names.sfdd == ''){
        Notify({ type: 'danger', message: '是否等待不能空' });
         return false;
      }
      api_ycinsert({
        ycsj: names.ycsj,
        ycrs: names.ycrs,
        cfd: names.cfd,
        mdd: names.mdd,
        bz: names.bz,
        ry: names.ry,
        ycrxm: ycrxm,
        sfdd:names.sfdd,
        userid: sessionStorage.getItem('userid'),
      }).then((res) => {
        if (res.code == 200) {
           Notify({ type: "success", message: "提交成功"});
           this.$router.go(-1);
        }
      }).catch((error) => {
           Notify({ type: 'danger', message: '提交失败' });
    });
    },  
  convertKey (arr, key) {
    let newArr = [];
    arr.forEach((item, index) => {
      let newObj = {};
      for (var i = 0; i < key.length; i++) {
        newObj[key[i]] = item[Object.keys(item)[i]]
      }
      newArr.push(newObj);
    })
    return newArr;
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  api_getAllUser().then((res) =>{
    let data2 = this.convertKey(res.data, ['id','password','userStatus','userType','userid','name']);
     this.ryslarr = data2 ;
  })
 
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  //获取当前时间
  let time = new Date;  
  this.from.ycsj = this.dataTime(time);
  this.from.sfdd = this.sfdd[1];
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