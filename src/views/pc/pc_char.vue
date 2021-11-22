<!-- 图表 -->
<template>
<div class='pc_char'>
      <el-row >
      <el-col >
        <!-- 条线图 -->
        <ve-histogram :data="chartData" :extend="chartExtend"></ve-histogram>
      </el-col>
    </el-row>
      <el-row >
      <el-col >
        <!-- 折线图 -->
           <!-- 饼图 -->
        <ve-pie :data="chartMyDate"></ve-pie>
      </el-col>
    </el-row>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_getSJNum} from '../../start/api/index.js'
export default {
  name: 'pc_char',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    chartData: {
        //折线图
        columns: ["司机", "订单总数"],
        rows: [],
      },
      chartMyDate: {
        //折线图
        columns: ["派单", "订单总数"],
        rows: [
         
        ],
      },
      chartExtend:{
      series: {
        barMaxWidth: 35
      },
      dataZoom: [
        {
          type: "inside"
        }
      ]
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   getDy(){
      var data = [{
        yp:this.$store.state.Have_sent,
        wp:this.$store.state.Did_not_send
      }]
      let newArr = data.map((item) => ({
          '派单': '已派',
          '订单总数':item.yp,
        }));
         let Arr = data.map((item) => ({
          '派单':'未派',
          '订单总数':item.wp,
        }));
        let newArrS = newArr.concat(Arr)
        this.chartMyDate.rows = newArrS;
   }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 api_getSJNum({}).then((res) => {
        let data = res.data;
        let newArr = data.map((item) => ({
          '司机': item.sj,
          '订单总数': item.num,
        }));
        this.chartData.rows = newArr;
    });
    this.getDy();
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