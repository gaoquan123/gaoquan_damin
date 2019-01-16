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
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn8')" >查看合同</a>
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn9')" >详情</a>
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn10')" >编辑</a>
                    <br>
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn11')" >还款计划</a>
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab5btn12')" >预约还款</a>
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

