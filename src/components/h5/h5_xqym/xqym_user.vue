<!-- 用户详情 -->
<template>
  <div class="xqym_user">
    <van-row class="xqym_user-xx">
      <van-notice-bar
        left-icon="volume-o"
        :text="'预计有车时间:'+data.yjycsj"
      />
     
    </van-row>
    <van-row
      type="flex"
      justify="center"
      class="box-border"
      v-for="(item, key, index) in newObj"
      :key="index"
    >
      <van-col span="8">{{ key }}:</van-col>
      <van-col span="16" class="box-border-r">{{ item }}</van-col>
    </van-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件,工具js,第三方插件js,json文件,图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { api_idFindAll } from "../../../start/api/index.js";
export default {
  name: "xqym_user",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      mydate: {},
      newObj: "",
      data:'',
      zt: this.$parent.$route.query.zt,
      ddzd: {
        ycsj: "订单时间",
        ry: "人员",
        ycrs: "人数",
        cfd: "出发地",
        mdd: "目的地",
        sj: "司机",
        cph: "车牌号",
        sfdd: "是否等待",
        bz: "备注",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    api_idFindAll({
      id: this.$parent.$route.query.id,
    }).then((res) => {
      // console.log(res.data[0]);
      this.data = res.data[0];
      let mydate = res.data[0];
      let ddzd = this.ddzd;
      for (let i in mydate) {
        for (let j in ddzd) {
          if (i == j) {
            this.mydate[ddzd[j]] = mydate[i];
          }
        }
      }
      this.newObj = this.mydate;
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能,这个函数会触发
};
</script>
<style  scoped>
.xqym_user {
  margin-top: 10px;
}
.xqym_user-xx {
  margin:10px 0px;
}

.box-border {
   background: #fff;
  line-height: 25px;
  text-align: center;
  padding: 5px 0px 5px 0px;
  border-bottom: 1px solid #e8d8d8;
}
.box-border-r {
  text-align: left;
}
</style>