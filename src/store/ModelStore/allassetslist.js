import $axios from 'axios'
import {ModelType,StateAsset,bizType,payWay,formatDate} from '../../PublicMethods/MethodsJs'
const state = {
    getLoanAssetList:{},
    channelList:{}
}
const getters = {

}
const mutations = {
    //  资产管理搜索数据列表
    LoanAssetLists(state,data){
        if( data.items != null){
            data.items.map((res)=>{
                res.bizPersonnelType = bizType(res.bizPersonnelType)
                res.totalAmountTable = res.totalAmount.amount ;
                res.remaindAmountTable = res.remaindAmount.amount;
                res.currentStockTable = res.currentStock.amount;
                res.model = ModelType(res.model)
                res.state = StateAsset(res.state) 
                res.annualRate = (res.annualRate*100).toFixed(2)+"%"
                if(res.payWay == "MATCHING_PRINCIPAL_AND_INTEREST"){
                    res.payWay = "等额本息"
                    res.limitDays = res.limitDays+"个月"
                }else{
                    res.payWay = " 到期一次性还本付息"
                    res.limitDays = res.limitDays+"天"
                }
            })
         }
            state.getLoanAssetList = data
    },
    // 渠道管理查询数据列表
    SearchChannels(state,data){
        if(data.items != null){
            data.items.map((list)=>{
                list.bizPersonnelType= bizType(list.bizPersonnelType)
                if(list.lineType == "OFF_LINE") {list.lineType = '线下'} else {list.lineType = '线上'}
                 list.payWay = payWay(list.payWay)   
                 list.updatedAt = formatDate(list.updatedAt)
                 list.daylyMaxLimitAmount = list.daylyMaxLimitAmount+"元"
                 list.monthlyMaxLimitAmount = list.monthlyMaxLimitAmount+"元"
                 list.overdueRateLimit = list.overdueRateLimit+"%"
                 list.assetsTotalAmount = list.assetsTotalAmount+"元"
            })
        }
        state.channelList = data;
    },
    // 
}
const actions = {
    // 资产管理搜索数据列表
    LoanAssetList({commit},playload){
        $axios.get('/admin/api/loanAssets/getLoanAssetList',{params:playload}
            ).then(function (response) {
                commit("LoanAssetLists",response.data)
            }).catch(function (error) {
                // this.$message('系统错误');
            });
     },
     //渠道管理查询数据列表
     SearchChannel({commit},playload){
         $axios.get('/admin/api/assetsChannel/getAssetsChannelList',{params:playload})
         .then((res)=>{
            commit("SearchChannels",res.data)
         })
         .catch((err)=>{

         })
     }
}

export default{
    state,getters,mutations, actions
}
