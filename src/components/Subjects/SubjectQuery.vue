<template>
    <div class="subject_QueryBox">
        <el-row :gutter="20">
             <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="form.subjectName">
                    <template slot="prepend">标的名称</template>
                </el-input>
            </el-col>

              <el-col :span="8">
                 <el-input placeholder="请输入内容" class="w80"  v-model="form.assetName">
                    <template slot="prepend">资产名字</template>
                </el-input>
            </el-col>
            <el-col :span="8" class="displayType">
                <span class="ipt fl">资产类型</span>
                <el-select v-model="form.catalog" filterable placeholder="请选择资产类型">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="m-t-20">
             <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="form.borrowerName">
                    <template slot="prepend">实际借款人</template>
                </el-input>
            </el-col>

              <el-col :span="8">
                 <el-input placeholder="请输入内容" class="w80"  v-model="form.channelTitle">
                    <template slot="prepend">所属渠道商</template>
                </el-input>
            </el-col>
            <el-col :span="8" class="displayType">
                <span class="ipt fl">还款方式</span>
                <el-select v-model="form.instalType" filterable placeholder="请选择资产类型">
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>


          <el-row :gutter="20" class="m-t-20 displayType" >
             <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="form.borrowStartAmount">
                    <template v-if='this.active=="NEW"' slot="prepend">最低借款金额</template>
                    <template v-else slot="prepend">最低出借金额</template>
                </el-input>
            </el-col>

              <el-col :span="8">
                 <el-input placeholder="请输入内容" class="w80"  v-model="form.borrowEndAmount">
                    <template v-if='this.active=="NEW"'  slot="prepend">最高借款金额</template>
                    <template v-else  slot="prepend">最高出借金额</template>

                </el-input>
            </el-col>

            <el-col :span="8" v-if='active =="COMPENSATORY_REQUESTING"'>
               <el-button  v-if="DataRoles($store.state.login.roles,'subjectsTab10btn1')" type="primary">自动代偿记录导出</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="m-t-20">
            <el-col :span="8" class="displayType">
                <el-input placeholder="请输入内容" class="w80"  v-model="form.username">
                    <template slot="prepend">借款人用户名</template>
                </el-input>
            </el-col>

            <el-col :span="12">
                    <div class="block">
                      <span class="ipt fl">起始时间</span>
                         <el-date-picker
                            v-model="dateArr"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
            </el-col>

            <el-col style="line-height:50px;" :span="8" v-if='active =="COMPENSATORY_REQUESTING"'>
                    <el-switch
                        v-model="value3"
                        active-text="开启自动代偿"
                        inactive-text="关闭自动代偿">
                    </el-switch>
            </el-col>
            
            <el-col :span="8" v-if='active == "REPAYMENT_DETAILS"'>
               <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab13btn1')" type="success">导出标的信息</el-button>
               <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab13btn2')" type="info">等额本息标的还款详情</el-button>
            </el-col>

        </el-row>
       <el-button @click="searchBtn()"  class="w20 m-t-40" type="primary">搜索<i class="el-icon-search el-icon--right"></i></el-button>
        <NewTable v-if='active == "NEW"'></NewTable>
        <FundingTable v-if='active == "FUNDING"'></FundingTable>
        <FundedTable v-if='active == "FUNDED"'></FundedTable>
        <PassTable v-if='active == "PASS"'></PassTable>
        <DoneTable v-if='active == "DONE"'></DoneTable>
        <PendingTable v-if='active == "PENDING"'></PendingTable>
        <UnshelveTable v-if='active == "UN_SHELVE"'></UnshelveTable>
        <AbortTable v-if='active == "ABORT"'></AbortTable>
        <PendingYqTable v-if='active == "PENDING2"'></PendingYqTable>
        <CompenTable v-if='active == "COMPENSATORY_REQUESTING"'></CompenTable>
        <CompenDoneTable v-if='active == "COMPENSATORY_DONE"'></CompenDoneTable>
        <ZjTable v-if='active == "PASS_PENDING"'></ZjTable>
        <DetailsTable v-if='active=="REPAYMENT_DETAILS"'></DetailsTable>

          <el-pagination
            v-if="paginationShow"
            class="m-t-40 m-b-40"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="pageTotal">
        </el-pagination>
    </div>
</template>
<script>
    import {formatDate,dealElement} from '../../PublicMethods/MethodsJs'
    import NewTable from './subjectTablePage/NewTable'            //未上架
    import FundingTable from './subjectTablePage/FundingTable'    //募集中
    import FundedTable from './subjectTablePage/FundedTable'      //满标待放款
    import PassTable from './subjectTablePage/PassTable'          //流标
    import DoneTable from './subjectTablePage/DoneTable'          //回款中
    import PendingTable from './subjectTablePage/PendingTable'    //回款完成
    import UnshelveTable from './subjectTablePage/UnshelveTable'   //已下架
    import AbortTable from './subjectTablePage/AbortTable'        //已撤销
    import PendingYqTable from './subjectTablePage/PendingYqTable' //逾期中
    import CompenTable from './subjectTablePage/CompenTable'     //代偿中
    import CompenDoneTable from './subjectTablePage/CompenDoneTable'     //已还款代偿
    import ZjTable from './subjectTablePage/ZjTable'     //中间状态
    import DetailsTable from './subjectTablePage/DetailsTable'     //还款详情

export default {
    props:['active'],
     components: {
        DoneTable,NewTable,FundedTable,FundingTable,PassTable,PendingTable,UnshelveTable,
        AbortTable,PendingYqTable,CompenTable,CompenDoneTable,ZjTable,DetailsTable
    },
    data(){
        return{
            paginationShow:true,
            value3:true,
            options: [
                {value: '',label: '全部类型'},
                {value: 'JIASHI_V1',label: '固收赢'}, 
                {value: 'JIASHI_V2',label: '利息赢'}, 
                {value: 'JIASHI_V16',label: '新手标'}, 
                {value: 'JIASHI_V3',label: '新手标_V3'}, 
                {value: 'JIASHI_V6',label: '众收赢'},
                {value: 'JIASHI_V7',label: '众乐乐'},
                {value: 'JIASHI_V8',label: '个人借款标的'},
                {value: 'JIASHI_V9',label: '个人理财质押'},
                {value: 'JIASHI_V11',label: '个人信用标的'},
                {value: 'JIASHI_V13',label: '企业借款标的'},
            ],
             options1: [
                {value: 'ONCE_PRINCIPAL_AND_INTEREST',label: '到期一次性好本付息'}, 
                {value: 'MATCHING_PRINCIPAL_AND_INTEREST',label: '等额本息'}, 
            ],
            form:{
                subjectName:'', //标的名字
                assetName:'',   //资产名字
                catalog: '',  //资产类型
                borrowerName:'', //实际借款人
                channelTitle:'',  //所属渠道商
                username:'',    //借款人用户名
                instalType:'',  //还款方式
                borrowStartAmount:'', //最低出借
                borrowEndAmount:'', //最高出借
                endDay:'',  //截止时间
                startDay:'',//起始时间
                orderByFlag:-1,
                queryFlag:1,
                page:1,
                status:'',
            },
            dateArr:'',

        }
    },
    computed: {
       pageTotal(){
           if(this.active == "NEW" || this.active == "FUNDING" || this.active == "FUNDED" || this.active == "PASS" || this.active == "UN_SHELVE" || this.active == "ABORT"|| this.active == "PASS_PENDING"){
                return this.$store.state.subjects.GetSubjectInfoItem.totalCount
            }else if(this.active == "REPAYMENT_DETAILS"){
                return this.$store.state.subjects.getRepaymentDetailsItem.totalCount
            }else{
                return this.$store.state.subjects.ContractsQueryItem.totalCount
            }
       }  
    },
    methods: {
        //查询按钮
        searchBtn(){
            this.form.status = this.active;
            if(this.dateArr){
                this.form.startDay =   formatDate(this.dateArr[0]);
                this.form.endDay =   formatDate(this.dateArr[1]);
            }
            this.form.page = 1;
            this.$store.dispatch("GetSubjectAllTab",{"type":dealElement(this.form)})
        },
        //tab栏切换初始化数据
        defaultFun(){
            this.form.status = this.active;
            this.form.page = 1;
            Object.keys(this.form).forEach((key,val)=>{
                if(key =='page' || key == 'orderByFlag' || key == 'queryFlag' || key == 'status'){
                    return
                }else{
                     this.form[key] = "";
                }
            })
            this.$store.dispatch("GetSubjectAllTab",{"type":dealElement(this.form)})
        },
        // 分页
         handleCurrentChange(currentPage){
              this.form.page = currentPage;
              this.$store.dispatch("GetSubjectAllTab",{"type":dealElement(this.form)})
        }
    },
   
    created(){
        this.defaultFun();
    },
    //初始化数据
    watch: {
        active(newname,oldname){
            this.defaultFun();
                this.paginationShow = false;
                this.$nextTick(function() {
                    this.paginationShow = true;
            });
            if(newname == "REPAYMENT_DETAILS"){
                $(".displayType").hide();
            }else{
                $(".displayType").show();
            }
        },
            deep: true,
            immediate: true
    }
}
</script>
<style lang="less" scoped>
    .subject_QueryBox{
        margin-top: 25px;
    }
    /deep/.is-background{
    text-align: center;
}
</style>
