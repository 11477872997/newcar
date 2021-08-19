<!-- tab 表头-->
<template>
<div id='tabs'>
    <el-tabs  v-model="activeTab"  @tab-remove="removeTab" @tab-click="tabClick" class="tabs">
                    <el-tab-pane v-for="(item, index) in tabsItem"
                                :key="index"
                                :label="item.title"
                                :name="item.name"
                                :closable="item.closable"
                                :ref="item.ref">
                      <component :is="item.content"></component>
                    </el-tab-pane>
     </el-tabs>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: 'tabs',
//import引入的组件需要注入到对象中才能使用
components: {
},
data() {
//这里存放数据
return {
 activeTab: '1', //默认显示的tab
  tabIndex: 1, //tab目前显示数
   tabsItem: [
          {
            title: '首页',
            name: '1',
            closable: false,
            ref: 'tabs',
          }
        ],
          tabsPath: [{
          name: "1",
          path: '/pc_char'
        }]

};
},
//监听属性 类似于data概念
computed: {
activeNav() { //当前激活的导航
        return this.$route.path
}

},
//监控data中的数据变化
watch: {
    '$route': function (to) {  //监听路由的变化，动态生成tabs
      let flag =  true; //判断是否需要新增页面
      const  path = to.path;    //获取跳转的路由
    for (let i = 0 ;i<this.$refs.tabs.length;i++){
     if (this.$refs.tabs[i].label == to.meta.title) {
                this.activeTab = this.$refs.tabs[i].name  //定位到已打开页面
                flag = false
                break
         }
    }
    //添加页面
    if(flag){
          const  thisTitle = to.meta.title;
          //对tabs的当前激活下标和tabs数量进行自加
          let newActiveIndex = ++this.tabIndex + ''
            //动态双向追加tabs
            this.tabsItem.push({
              title: thisTitle,
              name: String(newActiveIndex),
              closable: true,
              ref: 'tabs',
            })
            
         
            this.activeTab = newActiveIndex
           /*
            * 当添加tabs的时候，把当前tabs的name作为key，path作为value存入tabsPath数组中
            * key:tabs的name
            * value:tabs的path
            * {
            *   key: name,
            *   value: path
            * }
            * ///后面需要得到当前tabs的时候可以通过当前tabs的name获得path
            * */
            if (this.tabsPath.indexOf(path) == -1) {
              this.tabsPath.push({
                name: newActiveIndex,
                path: path
              })
            
            }
    }

}
},
//方法集合
methods: {
 removeTab(targetName) { //删除Tab
        let tabs = this.tabsItem; //当前显示的tab数组
        let activeName = this.activeTab; //点前活跃的tab

        // //如果当前tab正活跃 被删除时执行
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.tabClick(nextTab)
              }
            }
          });
        }
        this.activeTab = activeName;
        this.tabsItem = tabs.filter(tab => tab.name !== targetName);
        // //在tabsPath中删除当前被删除tab的path
        this.tabsPath = this.tabsPath.filter(item => item.name !== targetName)
      },
      tabClick(thisTab) {
        /*
        * thisTab:当前选中的tabs的实例
        * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
        * */
        let val = this.tabsPath.filter(item => thisTab.name == item.name);
        this.$router.push({
          path: val[0].path
        })
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 /*
      * 使用js的sessionStorage读取刷新前的数据，并按刷新前的tabs顺序重新生成tabs
      * */
     const sessionTabs =   this.$store.state.tabsItem;
      if(sessionTabs.currTabsItem.length != 0 && sessionTabs.currTabsPath.length != 0) {
        for(let i=0; i<sessionTabs.currTabsItem.length; i++) {
          this.tabsItem.push({
            title: sessionTabs.currTabsItem[i].title,
            name: sessionTabs.currTabsItem[i].name,
            closable: true,
            ref: sessionTabs.currTabsItem[i].ref,
          })
        }
        for(let j=0; j<sessionTabs.currTabsPath.length; j++) {
          this.tabsPath.push({
            name: sessionTabs.currTabsPath[j].name,
            path: sessionTabs.currTabsPath[j].path
          })
        }
        this.activeTab = sessionTabs.currActiveTabs
        this.tabIndex = sessionTabs.currIndex
      }

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 /*
      * 监听页面刷新事件
      * 页面刷新前 需要保存当前打开的tabs的位置，刷新后按刷新前的顺序展示
      * 使用js的sessionStorage保存刷新页面前的数据
      * */
      window.addEventListener('beforeunload', e => {
        let objs = {
                currTabsItem: this.tabsItem.filter(item => item.name !== "1"),
                currTabsPath: this.tabsPath.filter(item => item.name !== "1"),
                currActiveTabs: this.activeTab,
                currIndex: this.tabIndex
           }
         this.$store.commit("setTabsItem", objs)
      });
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