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
    if ( obj === null || obj === undefined || obj === "" || obj === false ) return param;
    for ( var key in obj ){
        if ( obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && obj[key] !== false ){
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

// 利率转化百分比
export let percent  = function(value){
  return (value*100).toFixed(2)+'%';
}
// 钱币格式比
export const  fmoney=function(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      return t.split("").reverse().join("") + "." + r;
}
//自动上架时间
export const  countDown=function(time, onlineCountDown) {
  if(onlineCountDown=='Y'){
    var date = new Date(time);
    var pad = function (number) {
      var numStr = number.toString();
      return ('00' + numStr).substring(numStr.length);
    };
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }else{
    return '-'
  }
}
//标的状态
export const  subjectStatus=function(contractStatus,status) {
  const statusDisplay = {
    NEW: '未上架',
    FUNDING: '募集中',
    FUNDED: '满标待放款',
    PORTION_FUNDED: '部分满标待放款',
    PASS: '已流标',
    SIGNED: '生成合同/放款',
    UN_SHELVE: '已下架',
    ABORT: '已撤销',
    PENDING: '还款中',
    DONE: '已回款'
  };
  if(status=='SIGNED'){
    return statusDisplay[contractStatus];
  }
    return statusDisplay[status];
}
//剩余额度
export const  surplus=function(amount,currentInvestmentAmount,status,contractStatus) {
if(status=='NEW'||status=='NEW'){
  return '-'
}
if(status=='FUNDED'||contractStatus=='PENDING'||contractStatus=='DONE'){
  return 0.00
}
if(status=='PASS'){
  return amount
}
  if(status=='PORTION_FUNDED'){
    return amount-currentInvestmentAmount
  }


}



