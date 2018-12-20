import $axios from 'axios'

const state = {
    GetSubjectInfoItem:{}, 
    ContractsQueryItem:{},
    getRepaymentDetailsItem:{}
}
const getters = {

}
const mutations = {
     //未上架，募集中，满标待放款，流标，已下架，已撤销，中间状态，
    GetSubjectInfo(state,data){
        state.GetSubjectInfoItem = data;
    },
    // UN_SHELVE
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
            let str = 'catalog=JIASHI_V1&catalog=JIASHI_V2&catalog=JIASHI_V3&catalog=JIASHI_V6&catalog=JIASHI_V7&catalog=JIASHI_V8&catalog=JIASHI_V9&catalog=JIASHI_V11&catalog=JIASHI_V13&catalog=JIASHI_V14&catalog=JIASHI_V15&catalog=JIASHI_V16';
            let url ;
            let active =  paload.type.status;
            if(active == "NEW" || active == "FUNDING" || active == "FUNDED" || active == "PASS" || active == "UN_SHELVE" || active == "ABORT"|| active == "PASS_PENDING"){
                //未上架，募集中，满标待放款，流标，已下架，已撤销，中间状态，
              const src = '&status=PORTION_FUNDED';
                if(paload.type.catalog){
                    // 满标待放款问题多加status
                    if(active == "FUNDED"){
                        url = '/admin/api/subjects/getSubjectInfo?'+src;
                    }else{
                        url = '/admin/api/subjects/getSubjectInfo';
                    }
                }else{
                     // 满标待放款问题多加status
                    if(active == "FUNDED"){
                        url = '/admin/api/subjects/getSubjectInfo?'+str+src;
                    }else{
                        url = '/admin/api/subjects/getSubjectInfo?'+str;
                    }
                }
            }else if(active == "REPAYMENT_DETAILS"){
                 // 还款详情
                    url = '/admin/api/subjects/getRepaymentDetails';
            }else{
                 // 回款中，回款完成，逾期中，代偿中，已还代偿，
                if(active == "PENDING2"){
                    paload.type.status = "PENDING";
                }
                  if(paload.type.catalog){
                     url =  '/admin/api/contracts/ContractsQuery';
                  }else{
                     url = '/admin/api/contracts/ContractsQuery?'+str;
                  }
            }
            $axios.get(url,{params:paload.type}).then((res)=>{
                // commit("GetSubjectInfo",res.data)
                // let active = paload.type.status;
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