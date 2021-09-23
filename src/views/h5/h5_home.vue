<!-- h5 首页 -->
<template>
<div class='h5_home' >
    <Tb :Text="{...propsText}"></Tb>
    <img  :src=login_img  v-if="zttpye == 'SJ'" />
    <van-row type="flex" class="bg" v-if="zttpye !== 'SJ'">
      <van-col span="24">
        <van-notice-bar left-icon="volume-o" :scrollable="false">
          <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in mydata" :key="index">【{{item.sj}}】【订单】:{{item.num}}</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </van-col>
    </van-row>
    <van-row type="flex" class="bg" v-if="zttpye !== 'SJ'">
      <van-col span="24">
        <canvas id="boxCanvas" style="width: 100%;height: 300px;"></canvas>
      </van-col>
    </van-row>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Tb from '../../components/h5/h5_tb.vue'
import {api_getSJNum,api_getUser} from '../../start/api/index.js'
export default {
  name: 'h5_home',
//import引入的组件需要注入到对象中才能使用
components: {
    Tb
},
data() {
//这里存放数据
return {
       propsText: {
        num: 0,
        Titletext: "首页",
    },
   mydata: [],
   zttpye:"",
   login_img: require("../../assets/login_bg.jpg"),
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  let  query = this.$route.query;  //获取地址栏参数
  if(query.id !== undefined){
    api_getUser({
            id:query.id
          }).then( (res)=>{
            // console.log(res.data)
            sessionStorage.setItem('per',res.data.per);
            sessionStorage.setItem("userid", res.data.userid);  //权限
            this.zttpye = sessionStorage.getItem('per');
            this.$store.commit("setUsername", res.data.username) //用户名
          })
    
  }else{
    this.zttpye = sessionStorage.getItem('per');
  }
   
 
  api_getSJNum({}).then((res) => {
      if (res.code == 200) {
        this.mydata = res.data;
         var data = res.data;
          var chart = new this.F2.Chart({
            id: "boxCanvas",
            pixelRatio: window.devicePixelRatio,
          });
          chart.source(data, {
            sales: {
              tickCount: 5,
            },
          });
          chart.tooltip({
            //长按提示
            showItemMarker: false,
            onShow: function onShow(ev) {
              var items = ev.items;
              items[0].name = null;
              items[0].name = items[0].title;
              items[0].value = "订单 " + items[0].value;
            },
          });
          // 让柱状图的宽度适配不同的屏幕尺寸
          var barWidth = 36 * (window.innerWidth / 375);
          chart
            .interval()
            .position("sj*num")
            .color("l(90) 0:#1890ff 1:#70cdd0")
            .size(barWidth); // 定义柱状图渐变色
          // 柱状图添加文本
          chart.render();
        
      }
    });
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
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>