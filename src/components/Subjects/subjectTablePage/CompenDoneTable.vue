<template>
    <div class="m-t-40">
        <!-- 已还款代偿 -->
            <el-row class="m-b-40">
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab11btn1')" >开启自动回款</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab11btn2')" type="success">同意代偿回款</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab11btn3')" type="info">驳回代偿申请</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab11btn4')" type="warning">借款人代偿款申请</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab11btn5')" type="danger">同意借款人还代偿款申请</el-button>
            <el-button v-if="DataRoles($store.state.login.roles,'subjectsTab11btn6')" type="primary">驳回借款人还款申请</el-button>
        </el-row>
         <el-table  fit
            :data = "listItem"
            :row-class-name="tableRowClassName"
            border style="width: 100%" >
            <el-table-column type="selection" > </el-table-column>
			<el-table-column prop="subjectTitle" label="项目名称"  width="200px;"> </el-table-column>
			<el-table-column prop="catalog" label="产品类型"  > </el-table-column>
			<el-table-column prop="amount" label="出借金额"  > </el-table-column>
			<el-table-column prop="annualRate" label="利率"  > </el-table-column>
			<el-table-column prop="userName" label="借款人"  width="150px;" > </el-table-column>
			<el-table-column prop="effectDate" label="生效日期"  > </el-table-column>
			<el-table-column prop="instalType" label="还款方式" > </el-table-column>
			<el-table-column prop="nextRepaymentDate" label="下期还款日期	" > </el-table-column>
			<el-table-column prop="nextStatusText" label="回款状态" > </el-table-column>
			<el-table-column prop="transferable" label="转让标" > </el-table-column>
            <el-table-column  label="操作" width="200px;" >
                <template slot-scope="scope">
                    <a target="_blank" :href="scope.row.uri+'?view=pdf'" v-if="DataRoles($store.state.login.roles,'subjectsTab11btn7')" >查看合同</a>
                    <router-link :to="{path:'/admin/allassetslist/details', query: {id: scope.row.subjectId, userId: scope.row.userId}}" v-if="DataRoles($store.state.login.roles,'subjectsTab11btn8')" >详情</router-link>
                    <a v-if="DataRoles($store.state.login.roles,'subjectsTab11btn9')" >编辑</a>
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
                        item.annualRate = (item.annualRate*100).toFixed(2)+'%';
                        item.amount = item.amount.amount+"元";
                        item.effectDate = formatDate(item.effectDate);
                        item.instalType = payWay(item.instalType);
                        item.nextRepaymentDate = formatDate(item.nextRepaymentDate)
                        item.nextStatusText = "已代偿-未结清";
                        item.transferable =  item.transferable ? "否" : "是";
                        item.userAuthorization =  item.userAuthorization ? "未完成" : "已完成";
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

