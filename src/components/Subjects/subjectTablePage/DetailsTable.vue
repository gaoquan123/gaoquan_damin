<template>
    <div class="m-t-40">
        <!-- 还款详情 -->
         <el-table  fit  
            :data = "listItem"
            :row-class-name="tableRowClassName"
            border style="width: 100%" >
            <el-table-column type="selection" > </el-table-column>
			<el-table-column prop="subjectId" label="标的ID"> </el-table-column>
			<el-table-column prop="title" label="标的名称" width="180px;"> </el-table-column>
			<el-table-column prop="loanTitle" label="所属资产"> </el-table-column>
			<el-table-column prop="instalmentPolicy" label="还款方式" width="120px;"> </el-table-column>
			<el-table-column prop="amount" label="到期总金额" > </el-table-column>
			<el-table-column prop="interest" label="到期利息" > </el-table-column>
			<el-table-column prop="principal" label="募集本金" > </el-table-column>
			<el-table-column prop="differentialAmount" label="账号管理费" > </el-table-column>
			<el-table-column prop="repaymentUserCount" label="出借者数量" > </el-table-column>
			<el-table-column prop="day" label="期限" > </el-table-column>
			<el-table-column prop="annualRate" label="利息率" > </el-table-column>
			<el-table-column prop="nextRepaymentDate" label="到期日" > </el-table-column>
			<el-table-column prop="createdAt" label="系统确认交割日" > </el-table-column>
			<el-table-column prop="createdAt" label="满标日期" > </el-table-column>
			<el-table-column prop="annualRate" label="出借详情" >
                 <template slot-scope="scope">
                    <a  v-if="DataRoles($store.state.login.roles,'subjectsTab13btn3')">查看</a>
                </template>
             </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {catalogText,formatDate,payWay,ModelType,dealElement} from '../../../PublicMethods/MethodsJs'
    export default {
        computed: {
          listItem(){
              if(this.$store.state.subjects.getRepaymentDetailsItem.items){
                  let result  = this.$store.state.subjects.getRepaymentDetailsItem.items;
                 result.map((item)=>{
                    //   item.catalog = catalogText(item.catalog);
                      item.annualRate = (item.annualRate*100).toFixed(2)+'%';
                    //   item.amount = item.amount.amount+"元";
                    //   item.currentInvestmentAmount = item.currentInvestmentAmount.amount+"元";
                    //   item.status = '已流标';
                      item.instalmentPolicy = payWay(item.instalmentPolicy.type);
                      item.amount =  item.instalments.amount.amount +"元"
                      item.interest =  item.instalments.interest.amount +"元"
                      item.principal =  item.instalments.principal.amount +"元"
                      item.differentialAmount =  item.instalments.differentialAmount.amount +"元"
                        if(item.instalmentPolicy.type == 'MATCHING_PRINCIPAL_AND_INTEREST'){
                        item.day = item.instalmentPolicy.numberOfInstalments +'月'
                        }else{
                            item.day = item.intervalCount+"天"
                        }
                        item.nextRepaymentDate = formatDate(item.nextRepaymentDate)
                        item.createdAt = formatDate(item.nextRepaymentDate)



                 })
                  return result
              }
          }  
        },
         methods: {
          	tableRowClassName({ row, rowIndex }) {
                if (rowIndex % 2 == 1) {
                    return "warning-row";
                }
                return "";
            },
        },
        components: {
            
        },
    }
</script>
<style lang="less" scoped>
/deep/.el-table td{
        text-align: center !important;
        text-align: -webkit-center !important;
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

