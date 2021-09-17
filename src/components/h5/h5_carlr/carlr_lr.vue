<!-- 车辆录入 -->
<template>
<div class='carlr_lr'>
    <van-form @submit="onSubmit">
      <van-row class="BOXshadow mT bg " type="flex">
        <van-col span="24" style="height:5px"></van-col>
        <van-col span="24">
          <van-field
            v-model="from.cph"
            clearable
            label="车牌号"
            name="cph"
            left-icon="location-o"
            placeholder="车牌号"
          />
          <van-field
            v-model="from.sj"
            clearable
            label="司机"
            name="sj"
            left-icon="location-o"
            placeholder="司机"
          />
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
import {api_pcinsert} from '../../../start/api/index.js'
import { Notify } from "vant";
export default {
  name: 'carlr_lr',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    from:{
         cph: "",
         sj: "",
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 onSubmit(values) {
      if(values.cph == ''){
        Notify({ type: 'danger', message: '车牌号不能空' });
         return false
      }else if(values.sj == ''){
        Notify({ type: 'danger', message: '司机不能空' });
         return false
      }
     api_pcinsert({
          cph: values.cph,
          sj: values.sj
          }).then((res) => {
        if (res.code == 200) {
          let data = res.data
          if(data == '已有该车辆'){
            Notify({ type: 'success', message:data});
          }else if(data == '添加车辆成功'){
            Notify({ type: 'success', message:data});
              this.$router.go(-1);
          }
        }
      }).catch((error) => {
            Notify({ type: 'danger', message:data});
        });
    },
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