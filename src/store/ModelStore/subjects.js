import $axios from 'axios'
const state = {
    GetSubjectInfoItem:{}, 
    getRepaymentDetailsItem:{}, 
    ContractsQueryItem:{}
}
const getters = {

}
const mutations = {
     //未上架，募集中，满标待放款，流标，已下架，已撤销，中间状态，
    GetSubjectInfo(state,data){
        state.GetSubjectInfoItem = data;
    },
     // 还款详情
    getRepaymentDetails(state,data){
        state.getRepaymentDetailsItem = data;
    },
      // 回款中，回款完成，逾期中，代偿中，已还代偿，
    ContractsQuery(state,data){
        state.ContractsQueryItem = data;
    }
}
const actions = {
    GetSubjectAllTab({commit},paload){
        $axios.get(paload.url,{params:paload.type})
        .then((res)=>{
            let active = paload.type.status;
            if(active == "NEW" || active == "FUNDING" || active == "FUNDED" || active == "PASS" || active == "UN_SHELVE" || active == "ABORT"|| active == "PASS_PENDING"){
                commit("GetSubjectInfo",res.data)
            }else if(active == "REPAYMENT_DETAILS"){
                commit("getRepaymentDetails",res.data)
            }else{
                commit("ContractsQuery",res.data)
            }
        })
    }
}

export default{
    state,getters,mutations, actions
}