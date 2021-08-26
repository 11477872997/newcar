<!-- 用户详情 -->
<template>
<div class='xqym_user'>
       <div class="bg" v-for="item in mydate" :key="item.id">
      <van-row type="flex" justify="center" class="box-border">
        <van-field v-model="item.ycsj" label="订单时间" left-icon="smile-o" readonly />
      </van-row>
      <van-row type="flex" justify="center" class="box-border">
        <van-field v-model="item.ry" label="人员" left-icon="smile-o" readonly />
      </van-row>
      <van-row type="flex" justify="center" class="box-border">
        <van-field v-model="item.ycrs" label="人数" left-icon="smile-o" readonly />
      </van-row>
      <van-row type="flex" justify="center" class="box-border">
        <van-field v-model="item.cfd" label="出的地" left-icon="smile-o" readonly />
      </van-row>
      <van-row type="flex" justify="center" class="box-border" >
        <van-field v-model="item.mdd" label="目的地" left-icon="smile-o" readonly />
      </van-row>
      <van-row type="flex" justify="center" class="box-border" v-if="zt == '4'">
        <van-field v-model="item.sj" label="司机" left-icon="smile-o" readonly />
      </van-row>
      <van-row type="flex" justify="center" class="box-border" v-if="zt == '4'">
        <van-field v-model="item.cph" label="车牌号" left-icon="smile-o" readonly />
      </van-row>
      <van-row type="flex" justify="center" class="box-border">
        <van-field v-model="item.bz" label="备注" left-icon="smile-o" readonly />
      </van-row>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_idFindAll} from '../../../start/api/index.js'
export default {
  name: 'xqym_user',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
   mydate: [],
   zt:this.$parent.$route.query.zt
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
   api_idFindAll({
          id: this.$parent.$route.query.id,
        }).then((res) => {
          if (res.code == 200) {
            this.mydate = res.data;
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
  .box-border {
    line-height: 25px;
    padding: 5px 0px 5px 0px;
    text-align: center;
    border-bottom: 1px solid #cccccc;
  }
  .box-colorl {
    color: #403e3e;
  }
  .box-colorr {
    color: #7f7f7f;
  }
</style>