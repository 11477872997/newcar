import request from '../js/axios.js' //引入封装好的axio
import store from '../../store/index.js'
/**
 *    //登陆
 *  username  用户
 *  password  密码
 */

function api_login(data) {  
    const url = 'yh/login';
    return request({
        url: url,
        method: 'post',
        data
    })
}

function api_getUser(data) {  
    const url = 'getUser';
    return request({
        url: url,
        method: 'post',
        data
    })
}

/**
 *  //pc首页 已派车和未派车的提示数量
 * @returns 
 */
function api_count() {   
    const url = 'gl/getYCNum';
    return request({
        url: url,
        method: 'post'
    }).then((res) =>{
        let data = res.data[0];
        if(data.wp != 0){
          store.state.Did_not_send =  data.wp;   //未派
        };
        if(data.yp != 0){
           store.state.Have_sent =  data.yp ;  //已派
        };
          
          
      })
}
function count() {   
    const url = 'gl/getYCNum';
    return request({
        url: url,
        method: 'post'
    })
}

/**
 * 约车订单
 *ycsj: 约车时间
 *cfd:  出发地
 *mdd: 目的地
 *ry: 人员
 *bz: 备注
 *ycrs: 人数
  *ycrxm : 约车人
 */
function api_ycinsert(data) { 
    const url = 'yc/ycinsert';
    return request({
        url: url,
        method: 'post',
        data
    });
}

/**
 * 车辆录入
 * cph: 车牌号
 * sj:' 司机
 * 
 */
function api_pcinsert(data) {
    const url = 'pc/pcinsert';
    return request({
        url: url,
        method: 'post',
        data
    })
}

/**
 * 车辆管理条件查询 没有必填就查询全部
 * cph：车牌号
 * zt ：车辆状态
 * sj ：司机
 */
function api_getCarMsg(data) {
    const url = 'gl/getCarMsg';
    return request({
        url: url,
        method: 'post',
        data
    })
}
/**
 *  删除当前车辆
 * cph ：车牌号
 */

function api_deletes(data) {
    const url = 'pc/delete';
    return request({
        url: url,
        method: 'post',
        data
    })
}
/**
 * 查询所有车辆
 */

function api_pccxsyFindAll(data) {
    const url = 'sj/getCPHAndSJXM';
    return request({
        url: url,
        method: 'post',
        data
    }).then((res) => {
        store.state.tableData = res.data //车辆管理查询表格数据
    });
}

function getCPHAndSJXM(data) {
    const url = 'sj/getCPHAndSJXM';
    return request({
        url: url,
        method: 'post',
        data
    })
}


/**
 * 查询当前车辆
 * cph :车牌号
 */
// 
function api_selectdqcl(data) {
    const url = 'pc/selectdqcl';
    return request({
        url: url,
        method: 'post',
        data
    })
}
/**
 *   修改当前车辆
 * cph ：车牌号
 * sj ： 司机
 * zt ：状态   6待命  5在勤  7待勤
 */
function api_clxxUpdate(data) {
    const url = 'pc/clxxUpdate';
    return request({
        url: url,
        method: 'post',
        data
    })
}
/**
 *  条件查询约车订单
    *  ycsj： 查询时间
    *  ry： 人员
    *  cfd ：出发地
    *  mdd : 目的地
    *  cph ：车牌号
    *  zt ：状态   代派：已发送/待处理 已派：已处理 
 */

function api_selectycbdcx2(data) {
    const url = 'gl/selectycbdcx2';
    return request({
        url: url,
        method: 'post',
        data
    })
}
/**
 * 
 * 查询已发送/待处理
 */

function api_dpdFindAll() {
    const url = 'yc/dpdFindAll';
    return request({
        url: url,
        method: 'post'
    }).then((res) => {
        store.state.DidtableData = res.data // 待派订单列表数据
    });
}
function dpdFindAll() {
    const url = 'yc/dpdFindAll';
    return request({
        url: url,
        method: 'post'
    })
}
/**
 * 
 * 根据id查询约车订单
 * id :  id
 */
function api_idFindAll(data) {
    const url = 'yc/idFindAll';
    return request({
        url: url,
        method: 'post',
        data
    })
}
/**
 * 
 *  待派车派车信息修改发送 
 * id: id,  //当前订单id
    ycsj: 约车时间
    ycrs: 约车人数
    cfd: 出发地
    mdd:  目的地
    zt: "4",  //状态 4 已派车
    bz: 备注
    ry: 人员
    cph: 车牌号
    sj: 司机
 * 
 */
function api_pcdUpdate(data) {
    const url = 'yc/pcdUpdate';
    return request({
        url: url,
        method: 'post',
        data
    })
}
/**
 * 
 * 查询每个司机对应的订单数量
 */
function api_getSJNum() {  
    const url = 'sj/getSJNum';
    return request({
        url: url,
        method: 'post',
    })
}

/**
 * 
 *  查看已派的所有订单
 */
function api_ypdFindAll() {
    const url = 'yc/ypdFindAll';
    return request({
        url: url,
        method: 'post'
    }).then((res) => {
        store.state.haveSenttableData = res.data // 待派订单列表数据
       
    });
}
function ypdFindAll() {
    const url = 'yc/ypdFindAll';
    return request({
        url: url,
        method: 'post'
    })
}
/**
 * ycrxm :用户名
 * zt 状态 3 未派 4已派
 * 当前用户查看的已派和待派
 */
function api_ycrxmFindAll(data) { 
    const url = 'yc/ycrxmFindAll';
    return request({
        url: url,
        method: 'post',
        data
    })
}
export {
    api_login,
    api_count,
    api_ycinsert,
    api_pcinsert,
    api_getCarMsg,
    api_deletes,
    api_pccxsyFindAll,
    api_selectdqcl,
    api_clxxUpdate,
    api_selectycbdcx2,
    api_dpdFindAll,
    api_idFindAll,
    api_pcdUpdate,
    api_getSJNum,
    api_ypdFindAll,
    getCPHAndSJXM,
    dpdFindAll,
    ypdFindAll,
    api_ycrxmFindAll,
    count,
    api_getUser
}