<template>
    <div class="m-t-40">
        <!-- 满标待放款 -->
         <el-table  fit
         :data = "listItem"
         :row-class-name="tableRowClassName"
          border style="width: 100%" >
			<el-table-column  prop="title" label="项目名称"  width="180px;"> </el-table-column>
			<el-table-column prop="catalog" label="产品类型"  > </el-table-column>
			<el-table-column prop="annualRate" label="年化利率"  > </el-table-column>
			<el-table-column prop="amount" label="借款金额"  > </el-table-column>
			<el-table-column prop="currentInvestmentAmount" label="实际借款金额" > </el-table-column>
			<el-table-column prop="currentInvestmentAmount" label="当前出借金额" > </el-table-column>
			<el-table-column prop="valueDate" label="起息日" > </el-table-column>
			<el-table-column prop="status" label="状态" > </el-table-column>
			<el-table-column prop="instalType" label="还款方式" > </el-table-column>
           <el-table-column  label="操作" width="200">
             <template slot-scope="scope">
               <el-button type="danger"  plain round  size="mini" @click="offShelf(scope.row)">下架</el-button>
               <el-button type="danger"  plain round  size="mini" @click="signContract(scope.row)">确认交割</el-button>
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
              if(this.$store.state.subjects.GetSubjectInfoItem.items){
                  let result  = this.$store.state.subjects.GetSubjectInfoItem.items;
                 result.map((item)=>{
                      item.catalog = catalogText(item.catalog);
                      item.annualRate = (item.annualRate*100).toFixed(2)+'%';
                      item.amount = item.amount.amount+"元";
                      item.adjustmentAmount = item.adjustmentAmount.amount+"元";
                      item.voucherQuota = item.voucherQuota.amount+"%";
                      item.currentInvestmentAmount = item.currentInvestmentAmount.amount+"元";
                      item.status = '部分满标待放款';
                      item.instalType = payWay(item.instalType);

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
           //下架
           offShelf(row){
             this.$confirm('标的正在募集中，确认马上满标?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.$axios({
                 method: 'POST',
                 url: `/api/users/${row.userId}/subjects/${row.id}/unshelf`,
                 headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
                 },
                 data:{}
               }).then(()=>{
                 this.$store.dispatch("GetSubjectAllTab",{'type':{status: 'FUNDING',orderByFlag:-1,queryFlag:1,page:1}})
               }).catch(()=>{

               })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               });
             });
           },
           //确认交割
           signContract(row){
             this.$confirm('标的正在募集中，确认马上满标?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.$axios({
                 method: 'POST',
                 url: `/api/users/${row.userId}/subjects/${row.id}/contract`,
                 headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
                 },
                 data:{}
               }).then(()=>{
                 this.$store.dispatch("GetSubjectAllTab",{'type':{status: 'FUNDED',orderByFlag:-1,queryFlag:1,page:1}})
               }).catch(()=>{

               })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               });
             });
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
</style>

