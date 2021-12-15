<!-- h5车辆修改 -->
<template>
<div class='clxqye_bj'>
    <div class="bg " >
      <van-form @submit="onSubmit">
        <van-row class="BOXshadow mT bg" type="flex">
          <van-col span="24" style="height:5px"></van-col>
          <van-col span="24">
            <van-field
              v-model="mydate.zt"
              readonly
              clickable
              name="zt"
              label="状态"
              left-icon="manager-o"
              placeholder="点击选择状态"
              @click="showPicker3 = true"
            />
            <van-popup v-model="showPicker3" position="bottom">
              <van-picker
                show-toolbar
                :columns="sjs"
                @confirm="onConfirm3"
                @cancel="showPicker3 = false"
              />
            </van-popup>

            <van-field
              v-model="mydate.cph"
              clearable
              label="车牌号"
              name="cph"
              left-icon="manager-o"
              placeholder="车牌号"
              
            />
            <van-field
              v-model="mydate.dhhm"
              clearable
              label="电话号码"
              name="dhhm"
              left-icon="manager-o"
              placeholder="电话号码"
              
            />
            <van-field
              v-model="mydate.sj"
              clearable
              label="司机"
              name="sj"
              left-icon="manager-o"
              placeholder="司机"
            />
          </van-col>
          <van-col span="24" style="height:5px"></van-col>
        </van-row>
        <van-row type="flex" justify="space-around" class="mT">
          <van-col span="9">
            <van-button
              class="BOXradius"
              icon="passed"
              block
              type="info"
              native-type="submit"
              
            >保存</van-button>
          </van-col>
        </van-row>
      </van-form>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {api_selectdqcl,api_clxxUpdate} from '../../../start/api/index.js'
import { Notify } from "vant";
export default {
  name: 'clxqye_bj',
//import引入的组件需要注入到对象中才能使用
components: {
   
},
data() {
//这里存放数据
return {
      mydate: [],
      sjs: ["出勤", "待勤", "待勤中(可拼车)"],
      sj: "",
      showPicker3: false,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  onClickLeft() {
      //返回上一页
      this.$router.go(-1);
    },
    onConfirm3(value) {
      //司机
     this.mydate.zt = value;
     this.showPicker3 = false;
    },
    mydaeFN() {
      //查询当前车辆
      let id = this.$route.query.id;
     api_selectdqcl({id: id }).then((res) => {
        
            if(res.data.result.zt == '5'){
                res.data.result.zt = '出勤'
              }else if(res.data.result.zt == '6'){
                 res.data.result.zt = '待勤'
              }else if(res.data.result.zt == '7'){
                  res.data.result.zt = '待勤中(可拼车)'
              }
            this.mydate = res.data.result;
        });
    },
    onSubmit(values) {
      //保存
      let zt = '';
      if(values.zt == '出勤'){
          zt = '5'
      }else if(values.zt == '待勤'){
          zt = '6'
      }else if(values.zt == '待勤中(可拼车)'){
          zt = '7'
      }
      let sj = values.sj.trim();
      let cph = values.cph.trim();
      let dhhm = values.dhhm.trim();
      let id =  this.mydate.id;
      //选染
      api_clxxUpdate({
          zt: zt,
          sj: sj,
          cph: cph,
          dhhm:dhhm,
          id: id
      }).then((res) => {
        this.$router.go(-1)
            Notify({ type: 'success', message: '修改成功' });
        })
    }
  },
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.mydaeFN();
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
.btn{
  text-align: center;
    background: red;
    color: #ffff;
}
</style>