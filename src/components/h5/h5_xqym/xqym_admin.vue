<!-- 管理员订单详情信息 -->
<template>
<div class='xqym_admin'>
    <div class="bg" v-for="item in mydate" :key="item.zt">
      <van-form @submit="onSubmit">
        <van-row class="BOXshadow mT bg" type="flex">
          <van-col span="24" style="height:5px"></van-col>
          <van-field v-model="item.id" label="文本" name="id" v-show="false" />
          <van-field
            v-model="item.zt"
            clearable
            label="状态"
            name="cfd"
            left-icon="location-o"
            placeholder="状态"
            disabled
          />
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="item.ycsj"
                readonly
                clickable
                name="ycsj"
                label="出发时间"
                placeholder="点击选择时间"
                @click="showPicker1 = true"
                left-icon="todo-list-o"
              />
              <van-popup v-model="showPicker1" position="bottom">
                <van-datetime-picker
                  type="datetime"
                  title="选择年月日小时"
                  :min-date="minDate"
                  :formatter="formatter"
                  :max-date="maxDate"
                  @confirm="onConfirm1"
                  @cancel="showPicker1 = false"
                />
              </van-popup>

              <van-field
                        v-model="item.sfdd"
                        readonly
                        clickable
                        name="sfdd"
                        label="是否等待"
                        left-icon="manager-o"
                        placeholder="点击选择是否等待"
                        @click="showPicker5 = true"
                      />

                    <van-popup v-model="showPicker5" position="bottom">
                      <van-picker
                        show-toolbar
                        :columns="sfdd"
                        @confirm="onConfirm5"
                        @cancel="showPicker5 = false"
                      />
                    </van-popup>


              <van-field
                v-model="item.ry"
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
                v-model="item.ycrs"
                type="digit"
                clearable
                label="人数"
                left-icon="user-o"
                placeholder="人数"
                name="ycrs"
              />
               <van-field
              v-model="item.cfd"
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
              v-model="item.mdd"
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
                v-model="sj"
                readonly
                clickable
                name="sj"
                label="司机"
                placeholder="点击选择司机"
                @click="showPicker3 = true"
              />
              <van-popup v-model="showPicker3" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="SJXM"
                  @confirm="onConfirm3"
                  @cancel="showPicker3 = false"
                />
              </van-popup>
              <van-field
                v-model="cph"
                clearable
                label="车牌号"
                name="cph"
                left-icon="location-o"
                placeholder="车牌号"
                disabled
              />
              <van-field
                v-model="item.bz"
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
        <van-row type="flex" justify="space-around" class="mT">
          <van-col span="9">
            <van-button
              class="BOXradius"
              icon="passed"
              block
              type="info"
              native-type="submit"
            
            >发送</van-button>
          </van-col>
        </van-row>
      </van-form>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Notify } from "vant";
import {api_idFindAll,getCPHAndSJXM,api_pcdUpdate,api_getAllUser} from '../../../start/api/index.js'
export default {
  name: 'xqym_admin',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    mydate: [], //当订单数据
    showPicker1: false, //时间插件
    minDate: new Date(),
    maxDate: new Date(3000, 0, 1),
    showPicker3: false, //司机插件
    showPicker5: false,
    sfdd: ["是", "否"],
    SJXM: [], //所有司机的姓名
    options: "", //车牌号
    sj:'',
    cph:'',
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
watch: {},
//方法集合
methods: {
  onConfirm5(value,index) {
      //司机
       this.mydate[0].sfdd = value;
    //  console.log(index)
     this.showPicker5 = false;
    },
   rytj(){
       this.rysl = true;
    },
    onrytj(item){
      if(this.arrname.indexOf(item.name) == -1){
        this.arrname.push(item.name)
      }
      this.mydate[0].ry = this.arrname.toString();
       this.rysl = false;
    },
        hadelType(){
             this.show = true;
        },
        onSelect(item){ //出发地
            this.mydate[0].cfd = item.name;
            this.show = false;
        },
        hadeshowmdd(){
            this.showmdd = true;
        },
        onshowmdd(item){  //目的地
            this.mydate[0].mdd = item.name;
            this.showmdd = false;
        },
  mydaeFN() {
      api_idFindAll({
        id: this.$parent.$route.query.id,
      }).then((res) => {
        // console.log(res)
        if (res.code == 200) {
          this.mydate = res.data;
          let  arr = res.data[0].ry;
          this.arrname = arr.split(',');
           if( this.$parent.$route.query.zt != 3){
              this.sj = res.data[0].sj
              this.cph = res.data[0].cph
            }
        }
      });

    },
    onConfirm1(time) {
      //年月日
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
      this.mydate[0].ycsj = youWant;
      this.showPicker1 = false;
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
    onConfirm3(value) {
      //司机
      this.sj = value.substring(0,3);
      for (let key of this.options) {
        if (value.substring(0,3) == key.sj) {
          this.cph = key.cph;
        }
      }
      this.showPicker3 = false;
    },
    AndSJXM() {
      //查询司机和车牌号
      getCPHAndSJXM({}).then((res) => {
        if (res.code == 200) {
        //   console.log(res.data)
          for (let key of res.data) {
            this.SJXM.push(key.sj+"("+key.zt+")");
          }
          this.options = res.data;
        }
      });
    },
    onSubmit(values) {
        // console.log(values)
        if(values.cph == '' || values.sj == ''){
             Notify({ type: "danger", message: "司机和车牌号不能为空" });
            return false;
        }
      //发送
      console.log(this.mydate)
      // console.log(this.mydate.ycrxm)
      // return
      // console.log(values)
      //修改订单
      api_pcdUpdate({
        id: values.id,
        ycsj: values.ycsj,
        ycrs: values.ycrs,
        cfd: values.cfd,
        mdd: values.mdd,
        zt: "4",
        bz: values.bz,
        ry: values.ry,
        cph: values.cph,
        sfdd:values.sfdd,
        ycrxm: this.mydate[0].ycrxm,
        userid: this.mydate[0].ycruserid,
        sj: values.sj.substring(0,3),
      }).then((res) => {
        if (res.code == 200) {
          Notify({ type: "success", message: "处理成功" });
          this.$router.go(-2);
        }
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
    this.mydaeFN();
    this.AndSJXM();
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