// 时间转换
export let formatDate  =  function(time){
    var date = new Date(time);
    var pad = function (number) {
      var numStr = number.toString();
      return ('00' + numStr).substring(numStr.length);
    };
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}
// 对象空去除 
export let dealElement = function(obj){
    var param = {};
    if ( obj === null || obj === undefined || obj === "" ) return param;
    for ( var key in obj ){
        if ( obj[key] !== null && obj[key] !== undefined && obj[key] !== "" ){
            param[key] = obj[key];
        }
    }
return param;
}
//资产代收付信息
export let ModelType  =  function(value){
    if(value == 'DIRECT'){
        return  '直投'
    }else if(value = 'TRANSFER'){
        return   '债转'
    }else if( value = 'COLLECT'){
        return '代收付'
    }
}
   
//资产状态
export let StateAsset  = function(value){
    if(value="EXISTENCE"){
        return "存续中"
    }else if(value == "PARTIAL_MATURITY"){
        return "部分到期"
    }else if(value == "PREMATURE_MATURITY"){
        return "提前到期"
    }else if(value == "MATURITY"){
        return "已到期"
    }
}
// 渠道类型
export let bizType  = function(value){
    if(value== 'BIZ'){
        return '供应链'
    }else if(value == 'PERSONNEL'){
        return '小微'
    }else{
        return '供应链/小微'
    }
}
export let bizTypeCN = function(value) {
    if(value == '供应链') {
        return 'BIZ'
    } else if(value == '小微') {
        return 'PERSONNEL'
    } else {
        return 'BIZ/PERSONNEL'
    }
}

// 支持还款方式等额本息
export let payWay  = function(value){
    if(value== 'MATCHING_PRINCIPAL_AND_INTEREST'){
        return '等额本息'
    }else if(value == 'A_DEBT_SERVICE_DUE'){
        return '一次性还本付息'
    }else if(value == 'A_DEBT_SERVICE_DUE,MATCHING_PRINCIPAL_AND_INTEREST'){
        return '一次性还本付息/等额本息'
    }else if(value =='MATCHING_PRINCIPAL_AND_INTEREST,A_DEBT_SERVICE_DUE'){
        return '一次性还本付息/等额本息'
    }else if(value =='ONCE_PRINCIPAL_AND_INTEREST'){
        return '到期还本付息'
    }else{
        return '-'
    }
}

//产品类型
export let catalogText  = function(value){
    if(value== 'JIASHI_V1'){
        return '固收赢'
    }else if(value == 'JIASHI_V2'){
        return '利息赢'
    }else if(value == 'JIASHI_V3'){
        return '新手标'
    }else if(value =='JIASHI_V4'){
        return '地产标'
    }else if(value =='JIASHI_V5'){
        return '转让标'
    }else if(value =='JIASHI_V6'){
        return '众收赢'
    }else if(value =='JIASHI_V7'){
        return '众乐乐'
    }else if(value =='JIASHI_V8'){
        return '个人借款标的'
    }else if(value =='JIASHI_V9'){
        return '个人理财质押'
    }else if(value =='JIASHI_V11'){
        return '个人信用标的'
    }else if(value =='JIASHI_V13'){
        return '企业借款标的'
    }else if(value =='JIASHI_V14'){
        return '双月嘉'
    }else if(value =='JIASHI_V15'){
        return '月月盈'
    }else if(value =='JIASHI_V16'){
        return '新手标'
    }else{
        return '-'
    }
}

