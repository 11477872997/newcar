<!-- 登陆 -->
<template>
<div id='Login' :style="{backgroundImage:`url(${login_img})`}">
<div class="login-wrap">
     <el-row type="flex" justify="center">
        <el-form :model="fromdata" status-icon :rules="rules" ref="ruleForm" label-width="100px" >
              <h3>登录</h3>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="fromdata.username"></el-input>
              </el-form-item>
              <el-form-item label="密码"   prop="password">
                <el-input type="password" v-model="fromdata.password" ></el-input>
              </el-form-item>
              <el-form-item label="验证码"   prop="yzm">
                 <el-col :span="12">
                    <el-input type="yzm" v-model="fromdata.yzm" ></el-input>
                 </el-col>
                 <el-col :span="12">

                <canvas id="canvas" @click="getrenovate" width="100" height="30"></canvas>
                 </el-col>
                
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-upload" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
      </el-form>
     </el-row>
</div>
</div>
</template>

<script>
import {api_login} from '../start/api/index.js'
import draw from '../start/js/yzm.js'
export default {
  name: 'Login',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {

return {
     login_img: require("../assets/login_bg.jpg"),
     fromdata:{
         username:'',  //用户名
         password:'' ,   //密码
         yzm:''
     },
      rules: {        //表单验证
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          yzm: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
      },
      num:''  //验证码
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.Logging();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      Logging(){
        if(this.num.toLowerCase() != this.fromdata.yzm.toLowerCase()){
            this.$message.error('验证码错误');
          return false;
        }
       /**
       *    //登陆
       *  username  用户
       *  password  密码
      //  */  
         api_login({
              username: this.fromdata.username,
              password: this.fromdata.password
            }).then((res) => {
                 if(res.data.status == -1){
                     this.$message.error(res.data.msg);
                 }else if(res.data.status == 0){
                    this.$message.error(res.data.msg);
                 } else if(res.data.status == 1){
                      sessionStorage.setItem("per", res.data.userType);  //权限
                      // sessionStorage.setItem("username", res.data.username);  //用户名
                        this.$store.commit("setUsername", res.data.username) //用户名
                      if (this.isMobile()) {
                       
                         this.$message(res.data.msg);
                        //  移动端触发
                        this.$router.push({ path: "/h5_home" });
                      }else{
                        //  pc 端触发
                        // per ：类型 
                         if(res.data.per != 'admin'){
                             this.$message.error('不是管理员无法登陆PC端');
                             sessionStorage.clear();
                             return  false;
                         }else{
                           this.$message(res.data.msg);
                           this.$router.push({ path: "/pc_char" });
                         }
                      }
                 }
                console.log(res)
            
            }).catch( (error) => {
            console.log(error)
            this.$message.error('登陆失败');
          });

      },
      getrenovate(){  //刷新验证码
           var show_num = [];
           draw(show_num,'canvas','100','40');
           this.num = show_num.join("");
      },
        // 添加判断方法设备方法
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
      // sessionStorage.clear();  
       let objs = { 
                currTabsItem: '',
                currTabsPath: '',
                currActiveTabs: '',
                currIndex: ''
           }
         this.$store.commit("setTabsItem", objs)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
   //生成并渲染出验证码图形
    var show_num = [];
    draw(show_num,'canvas','100','40');
    this.num = show_num.join("");
       sessionStorage.clear();   //清除缓存和vuex的值
},
}
</script>
<style  scoped>
#Login {
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
    background: #fff;
    background-size: cover;
    width: 320px;
    height: 400px;
    margin: 215px auto;
    overflow: hidden;
    line-height: 40px;
    padding-right: 15px;
    border-radius: 5px;
    box-shadow: 10px 15px 30px 5px;
}
h3{
  color: #0babeab8;
  font-size: 24px;
  text-align: center;
   margin: 20px auto;
}
.el-button {
  width: 100%;
  margin-left: -5px;
}
#canvas{
  height: 40px;
}
</style>