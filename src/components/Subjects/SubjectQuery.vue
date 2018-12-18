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
            <el-col :span="8">
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
            <el-col :span="8">
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


          <el-row :gutter="20" class="m-t-20">
             <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="form.borrowStartAmount">
                    <template slot="prepend">最低出借</template>
                </el-input>
            </el-col>

              <el-col :span="8">
                 <el-input placeholder="请输入内容" class="w80"  v-model="form.borrowEndAmount">
                    <template slot="prepend">最高出借</template>
                </el-input>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="m-t-20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="form.username">
                    <template slot="prepend">借款人用户名</template>
                </el-input>
            </el-col>

            <el-col :span="8">
                    <div class="block">
                      <span class="ipt fl">创建时间</span>
                         <el-date-picker
                            v-model="dateArr"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
            </el-col>

        </el-row>
     <el-button @click="searchBtn()"  class="w20 m-t-20" type="primary">搜索<i class="el-icon-search el-icon--right"></i></el-button>

    </div>
</template>
<script>
import {formatDate,dealElement} from '../../PublicMethods/MethodsJs'
export default {
    props:['active'],
    data(){
        return{
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
    methods: {
        searchBtn(){
            this.form.status = this.active;
            if(this.dateArr){
                this.form.startDay =   formatDate(this.dateArr[0]);
                this.form.endDay =   formatDate(this.dateArr[1]);
            }
            let str = 'catalog=JIASHI_V1&catalog=JIASHI_V2&catalog=JIASHI_V3&catalog=JIASHI_V6&catalog=JIASHI_V7&catalog=JIASHI_V8&catalog=JIASHI_V9&catalog=JIASHI_V11&catalog=JIASHI_V13&catalog=JIASHI_V14&catalog=JIASHI_V15&catalog=JIASHI_V16';
            var url;
            if(this.active == "NEW" || this.active == "FUNDING" || this.active == "FUNDED" || this.active == "PASS" || this.active == "UN_SHELVE" || this.active == "ABORT"|| this.active == "PASS_PENDING"){
                //未上架，募集中，满标待放款，流标，已下架，已撤销，中间状态，
                if(this.form.catalog){
                    url = '/admin/api/subjects/getSubjectInfo';
                }else{
                    url = '/admin/api/subjects/getSubjectInfo?'+str;
                }
            }else if(this.active == "REPAYMENT_DETAILS"){
                 // 还款详情
                    url = '/admin/api/subjects/getRepaymentDetails';
            }else{
                 // 回款中，回款完成，逾期中，代偿中，已还代偿，
                if(this.active == "PENDING2"){
                    this.form.status = "PENDING";
                }
                  if(this.form.catalog){
                     url =  '/admin/api/contracts/ContractsQuery';
                  }else{
                     url = '/admin/api/contracts/ContractsQuery?'+str;
                  }
            }
          
            this.$store.dispatch("GetSubjectAllTab",{"type":dealElement(this.form),"url":url})
            // this.$store.dispatch("LoanAssetList",dealElement(this.FromData));
            //未上架排序与字段
        }
    },
    components: {
    },
    created(){
        this.searchBtn();
        console.log("@2")
    }
}
</script>
<style lang="less" scoped>
    .subject_QueryBox{
        margin-top: 25px;
    }
</style>
