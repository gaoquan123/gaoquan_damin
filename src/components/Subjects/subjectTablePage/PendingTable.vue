<template>
    <div class="m-t-40">
        <!-- 回款中 -->
        <el-row class="m-b-40">
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab5btn1')" >开启自动回款</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab5btn2')" type="success">申请回款</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab5btn3')" type="info">申请代偿</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab5btn4')"  type="warning">申请提前还款</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab5btn5')"  type="danger">同意申请</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab5btn6')"  type="primary">驳回申请</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab5btn7')"  type="danger">驳回提前还款申请</el-button>
        </el-row>
         <el-table  fit
            :data = "listItem"
            :row-class-name="tableRowClassName"
            border style="width: 100%" >
			<el-table-column prop="subjectTitle" label="项目名称"  width="200px;"> </el-table-column>
			<el-table-column prop="catalog" label="产品类型"  > </el-table-column>
			<el-table-column prop="amount" label="出借金额"  > </el-table-column>
			<el-table-column prop="annualRate" label="利率"  > </el-table-column>
			<el-table-column prop="userName" label="借款人"  width="150px;" > </el-table-column>
			<el-table-column prop="userAuthorization" label="还款预授权状态"  > </el-table-column>
			<el-table-column prop="effectDate" label="生效日期"  > </el-table-column>
			<el-table-column prop="testStatus" label="状态"  > </el-table-column>
			<el-table-column prop="instalType" label="还款方式" > </el-table-column>
			<el-table-column prop="nextRepaymentDate" label="下一期还款日期	" > </el-table-column>
			<el-table-column prop="nextStatusText" label="回款状态" > </el-table-column>
			<el-table-column prop="transferable" label="转让标" > </el-table-column>
            <el-table-column  label="操作" width="200px;" >
                <template slot-scope="scope">
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn8')"  target="_blank" :href="scope.row.uri+'?view=pdf&param=Y'">查看合同</a>
                    <router-link v-if="DataRoles($store.state.login.roles,'subjectsTab5btn9')"   :to="{path:'/admin/allassetslist/details', query: {id: scope.row.subjectId, userId: scope.row.userId}}">详情</router-link>
                    <a  v-if="DataRoles($store.state.login.roles,'subjectsTab5btn10')"  @click="edit(scope.row)">编辑</a>
                    <br>
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn11')" @click="showPlan(scope.row.subjectId)">还款计划</a>
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn12')">预约还款</a>
                </template>
            </el-table-column>
        </el-table>
      <el-dialog :visible.sync="isShowPlan" width="80%">
        <h3 slot="title">
          <div class="front-18">回款计划：{{repaymentTitle}}</div>
          <div class="front-18">到期还款总额：{{totalAmount}}元</div>
          <div class="front-18">待还款总额：{{repaymentAmount}}元</div>
        </h3>
        <el-table :data="subjectRepaymentPlan">
          <el-table-column property="instalmentNum" label="期次" ></el-table-column>
          <el-table-column property="time1" label="应还日期" ></el-table-column>
          <el-table-column property="monthRepaymentTotalAmount" label="月还款总额"></el-table-column>
          <el-table-column property="monthRepaymentPrincipalAmount" label="月还款本金"></el-table-column>
          <el-table-column property="monthRepaymentInterestAmount" label="月还款利息"></el-table-column>
          <el-table-column property="lenderPrincipalAmount" label="出借人本金"></el-table-column>
          <el-table-column property="lenderInterestAmount" label="出借人利息"></el-table-column>
          <el-table-column property="instalmentEndBalance" label="期末余额"></el-table-column>
          <el-table-column property="interestDifferentialAmount" label="账号管理费"></el-table-column>
          <el-table-column  label="提前还款服务费">
            <template slot-scope="scope">
              <span v-if="scope.row.prepaymentServiceFee == null">--</span>
              <span v-else>{{scope.row.prepaymentServiceFee}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="还款状态aaa">
            <template slot-scope="scope">
              {{scope.row.repaymentStatus|repaymentStatus}}
            </template>
          </el-table-column>
          <el-table-column  label="提前还款服务费">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentDate == null">--</span>
              <span v-else>{{scope.row.time2}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

    </div>
</template>
<script>
import {catalogText,formatDate,payWay,ModelType,dealElement,repaymentStatus} from '../../../PublicMethods/MethodsJs'
    export default {
        computed: {
          listItem(){
              if(this.$store.state.subjects.ContractsQueryItem.items){
                  let result  = this.$store.state.subjects.ContractsQueryItem.items;
                  result.map((item)=>{
                        item.catalog = catalogText(item.catalog);
                        item.amount = item.amount.amount+"元";
                        item.annualRate = (item.annualRate*100).toFixed(2)+'%';
                        item.userAuthorization =  item.userAuthorization ? "未完成" : "已完成";
                        item.effectDate = formatDate(item.effectDate);
                        item.testStatus = '还款中'
                        item.instalType = payWay(item.instalType);
                        item.nextRepaymentDate = formatDate(item.nextRepaymentDate)
                        item.nextStatusText = "人工";
                        item.transferable =  item.transferable ? "否" : "是";
                 })
                  return result
              }
          }
        },
      data(){
            return {
              subjectRepaymentPlan:{},
              isShowPlan:false,
              repaymentTitle:'',
              totalAmount:0,
              repaymentAmount:0
            }
      },
         methods: {
          	tableRowClassName({ row, rowIndex }) {
                if (rowIndex % 2 == 1) {
                    return "warning-row";
                }
                return "";
            },
           showPlan(subjectId){
          	    //还款计划
          	    this.$axios.get('/admin/api/subjects/getSubjectInstalmentMatchingByAdmin',{
          	        params:{
                      subjectId:subjectId
                    }
                }).then(res=>{
                  this.subjectRepaymentPlan=res.data.repaymentPlan
                  this.repaymentTitle=res.data.title
                  this.totalAmount=res.data.totalAmount
                  this.isShowPlan=true
                  this.repaymentAmount=0
                  res.data.repaymentPlan.forEach(val=>{
                      if(val.repaymentDate == null){
                        this.repaymentAmount+=val.monthRepaymentTotalAmount
                      }
                  })
                  this.repaymentAmount=this.repaymentAmount.toFixed(2)
                }).catch(err=>{

                })
           },
           edit(){
             this.$confirm('已为可转让标的，确定继续编辑?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.$router.push('/')
             })
           }
        },
        components: {

        },
      filters:{
        repaymentStatus
      }
    }
</script>
<style lang="less" scoped>
/deep/.el-table td{
        text-align: center !important;
        text-align: -webkit-center !important;
         div{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
/deep/.is-leaf{
      text-align: center !important;
     text-align: -webkit-center !important;
}
/deep/.warning-row {
  background-color: #eee !important;
}

/deep/.success-row {
  background-color: #f0f9eb !important;
}
.cell{
    a{
        color: #4f9dff;
        text-decoration: underline;
    }
}
</style>

