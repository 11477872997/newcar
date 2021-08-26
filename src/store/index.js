import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"   ///vuex 持久化
//挂载Vuex
Vue.use(Vuex)
//创建VueX对象
const store = new Vuex.Store({
    state: {
        username: '', //用户名
        Did_not_send:"",//未派车
        Have_sent:'',//已派车
        tabsItem: {     //保存刷新的tab的值
            currTabsItem: "",
            currTabsPath: "",
            currActiveTabs: "",
            currIndex: ""
        },
        tableData:[],  //车辆管理表格数据
        DidtableData:[],  //待派车表格数据
        haveSenttableData:[],  //已派车表格数据
    },
    mutations: {
        setTabsItem(state, value) {   //保存刷新的tab的值
            state.tabsItem = {
                currTabsItem: value.currTabsItem,
                currTabsPath: value.currTabsPath,
                currActiveTabs: value.currActiveTabs,
                currIndex: value.currIndex
            }
        },
        setUsername(state, value) {  //用户名
            state.username = value;
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage

    })],
})


export default store

