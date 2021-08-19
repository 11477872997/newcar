<!-- 已派车详情 -->
<template>
<div class='have_sentScopeClick'>
        <el-dialog
        title="已派订单详情页面"
        :visible.sync="dialogVisible"
        width="65%">
        <el-row  class="mT">
            <el-col :span="24">
                <table  class="table" >
                <tr >
                <th>订单时间:</th>
                <th>{{row.ycsj}}</th>
                <th>提交人：</th>
                <th>{{row.ycrxm}}</th>
                </tr>
                <tr>
                <th>目的地:</th>
                <th>{{row.cfd}}</th>
                <th>出发地：</th>
                <th>{{row.mdd}}</th>
                </tr>
                <tr>
                <th>人员:</th>
                <th>{{row.ry}}</th>
                <th>人数 ：</th>
                <th>{{row.ycrs}}</th>
                </tr>
                 <tr >
                <th>司机:</th>
                <th>{{row.sj}}</th>
                <th>车牌号 ：</th>
                <th>{{row.cph}}</th>
                </tr>
                <tr>
                <th >备注:</th>
                <th colspan="3">{{row.bz}}</th>
                </tr>
            
            </table> 
            </el-col>
            </el-row>
        </el-dialog>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'have_sentScopeClick',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    dialogVisible: false,
    row:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
parentHandleclick(row){
    this.row = row;
    this.dialogVisible = true;
}
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

.table thead, .table tr {
border-top-width: 1px;
border-top-style: solid;
border-top-color: #EBEEF5;
}
.table {
border-bottom-width: 1px;
border-bottom-style: solid;
border-bottom-color: #EBEEF5;
width: 100%;
}
.table caption {
    font-size: 24px;
    margin-bottom: 15px;
}
.table td, .table th {
padding: 15px 0px;
font-size: 16px;
border:1px solid #EBEEF5;
}
.table th:nth-child(odd) {
color: #909399;
}
.table th:nth-child(even) {
color: #606266;
}
.table tr:nth-child(even) {
background: #fafafa
}
.table tr:nth-child(odd) {
background: #FFF
}

</style>