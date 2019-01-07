// 时间转换
export let formatDate  =  function(time){
    var date = new Date(time);
    var pad = function (number) {
    var numStr = number.toString();
      return ('00' + numStr).substring(numStr.length);
    };
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}
// 添加时间
export let addDays = function(days) {
  let currentTime = new Date()
  currentTime.setHours(currentTime.getHours() + days * 24)
  return currentTime
}
// 添加时间2
export let addNewDays = function(time, days) {
  let currentTime = new Date(time)
  currentTime.setHours(currentTime.getHours() + days * 24)
  return currentTime
}


// 时间转换到秒
export const formatToSec  =  function(time){
  if(!time) return
  const date = new Date(time);
  const pad = function (number) {
    const numStr = number.toString();
    return ('00' + numStr).substring(numStr.length);
  };
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours()+1)}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
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
  if(value!=undefined||value!=null)
  return (value*100).toFixed(2)+'%';
}
// 钱币格式比
export const  fmoney=function(s, n) {
  if(s!=undefined||s!=null){
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
//标的状态标的信息页
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
if(status=='NEW'||status=='FUNDING'){
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
//资产日期
export const  assetDate=function(val) {
  if(val==''){
    return '-'
  }
  else{
    function add0(m){return m<10?'0'+m:m }
    const time = new Date(val);
    const year = time.getFullYear();
    const month = time.getMonth()+1;
    const date = time.getDate();
    return `${year}-${add0(month)}-${add0(date)}`;
  }
}
//优惠品类
export const  useCouponText=function(val) {
  const statusDisplay = {
    rebate: '返现券',
    voucher: '代金券',
    pomegranate:'石榴币',
    nothing:'无'
  };
  return statusDisplay[val]
}
//使用代金券方式
export const  voucherType=function(val) {
  if(!val){
    return '-'
  }
  const statusDisplay = {
    SIMPLE: '普通',
    EQUAL_STEP: '等比增加',
    NOT_EQUAL_STEP:'非等比增加',
  };
  return statusDisplay[val]
}
//详情页状态
export const  detailsStatus=function(status) {
  var statusDisplay = {
    NEW: '未上架',
    FUNDING: '募集中',
    FUNDED: '满标待放款',
    PORTION_FUNDED: '部分满标待放款',
    PASS: '已流标',
    SIGNED: '生成合同/放款',
    UN_SHELVE: '已下架',
    ABORT: '已撤销'
  };
  return statusDisplay[status];
}
export const statusHistory= function (status) {
  var statusDisplay = {
    NEW: '创建标的',
    PASS: '已流标',
    FUNDING: '上架',
    FUNDED: '满标',
    FAILED: '流标',
    SIGNED: '生成合同/放款',
    UN_SHELVE: '下架',
    ABORT: '撤销'
  }
    return statusDisplay[status];
  };
//促销方式
export const promotionStyle=function(status) {
  if(!status){
    return '-'
  }
  var statusDisplay = {
    seckill: '秒杀',
    raise: '加息',
    supply: '特供',
    limit: '限量',
    custom: '自定义',
  };
  return statusDisplay[status];
}
//资产模式
export const loanAssetModel=function(status){
  var statusDisplay = {
    COLLECT: '代收付',
    TRANSFER: '债转',
    DIRECT: '直投',
  };
  return statusDisplay[status];
}
/*
截取字段开始到结束的内容
str:原始字符
key:开始截取的位置
* */
export const getUri=function(str, key){
  var index = str.indexOf(key);
  var result = str.substr(index,str.length);
  return result
}
/*
详情页尾差
* */
export const  amountForItem=function(instalment, type){
  const arTotal = instalment['accountReceivables'].map(function (ar) {
    return ar.items.filter(function (item) {
      return item.type === type;
    }).map(function (item) {
      return item.amount.amount;
    }).reduce(function (previous, current) {
      return previous + current;
    }, 0);
  }).reduce(function (previous, current) {
    return previous + current;
  }, 0);

  const apTotal = instalment['accountPayables'].map(function (ap) {
    return ap.items.filter(function (item) {
      return item.type === type;
    }).map(function (item) {
      return item.amount.amount;
    }).reduce(function (previous, current) {
      return previous + current;
    }, 0);
  }).reduce(function (previous, current) {
    return previous + current;
  }, 0);
  return apTotal - arTotal
}
/*详情页还款记录状态
* */
export const instalmentStatusFromBorrower=function (status) {
  var statusDisplay = {
    PENDING:         '未付',
    COUNTERACT:      '取消',
    PARTIAL_SETTLED: '平台垫付',
    SETTLED:         '已付'
  };
  return statusDisplay[status];
}
/*还款状态
 * */
export const repaymentStatus=function (status) {
  if(status == 'PENDING'){
    return '待还款'
  }else if(status == 'ADV_SETTLED'){
    return '提前还款'
  }else if(status == 'OVE_SETTLED'){
    return '逾期还款'
  }else if(status == 'REQUESTING'){
    return '申请中'
  }else if(status == 'PRE_REPAYMENT'){
    return '已预约还款'
  }else if(status == 'OVERDUE'){
    return '逾期'
  }else if(status == 'SETTLED'){
    return '已还款'
  }else if(status == 'INDIRECT_COMPENSATORY'){
    return '主动代偿还款'
  }else if(status == 'COMPENSATORY'){
    return '非主动代偿还款'
  }else{
    return '待还款'
  }
}





