<template>
    <div class="m-t-40">
        <!-- 募集中 -->
         <el-table  fit
         :data = "listItem"
         :row-class-name="tableRowClassName"
          border style="width: 100%" >
			<el-table-column type="selection" > </el-table-column>
			<el-table-column  prop="title" label="项目名称"  width="180px;"> </el-table-column>
			<el-table-column prop="catalog" label="产品类型"  > </el-table-column>
			<el-table-column prop="annualRate" label="年化利率"  > </el-table-column>
			<!-- <el-table-column prop="amount" label="借款金额"  > </el-table-column> -->
			<el-table-column prop="adjustmentAmount" label="进行中金额"  > </el-table-column>
			<el-table-column prop="voucherQuota" label="出借进度" > </el-table-column>
			<el-table-column prop="currentInvestmentAmount" label="当前出借金额" > </el-table-column>
			<el-table-column prop="valueDate" label="起息日" > </el-table-column>
			<el-table-column prop="status" label="状态" > </el-table-column>
			<el-table-column prop="instalType" label="还款方式" > </el-table-column>

			<el-table-column label="pc精选" >
                <template slot-scope="scope">
                     <span  v-if="DataRoles($store.state.login.roles,'subjectsTab2btn1')">
                        <el-button type="primary" plain round  size="mini" v-if="scope.row.isChoiceness=='N'||scope.row.isChoiceness=='A'" @click="setPreferredSubjectPC(scope.row)">置为精选</el-button>
                        <el-button type="primary" plain round  size="mini" v-else-if="scope.row.isChoiceness=='Y'||scope.row.isChoiceness=='B'" @click="cancelPreferredSubjectPC(scope.row)">取消精选</el-button>
                    </span>
				</template>
             </el-table-column>

			<el-table-column  label="移动精选" >
                  <template slot-scope="scope">
                      <span  v-if="DataRoles($store.state.login.roles,'subjectsTab2btn2')" >
                            <el-button type="primary" plain round  size="mini" v-if="scope.row.isChoiceness=='N'||scope.row.isChoiceness=='Y'" @click="setPreferredSubjectMobile(scope.row)">置为精选</el-button>
                            <el-button type="primary" plain round  size="mini" v-else-if="scope.row.isChoiceness=='A'||scope.row.isChoiceness=='B'" @click="cancelPreferredSubjectMobile(scope.row)">取消精选</el-button>
                      </span>
				  </template>
             </el-table-column>
			<el-table-column  label="操作" width="200">
                  <template slot-scope="scope">
                     <el-button type="danger"  v-if="DataRoles($store.state.login.roles,'subjectsTab2btn3')"  plain round  size="mini" @click="offShelf(scope.row)">下架</el-button>
                     <el-button type="danger"  plain round  size="mini"   @click="confirmFunded(scope.row)">手动满标</el-button>
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
                        item.status = '募集中';
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
           setPreferredSubjectPC(row){
             this.$confirm('确定将所选标的置为PC精选?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               if (row.isChoiceness == 'A') {
                 this.setPreferredSubject( row.id, "B");
               } else if (row.isChoiceness == 'N') {
                 this.setPreferredSubject( row.id, "Y");
               }
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               });
             });
           },
           setPreferredSubjectMobile(row){
             this.$confirm('确定将所选标的置为移动精选?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               if (row.isChoiceness == 'Y') {
                 this.setPreferredSubject( row.id, "B");
               } else if (row.isChoiceness == 'N') {
                 this.setPreferredSubject( row.id, "A");
               }
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               });
             });
           },
           cancelPreferredSubjectMobile(row){
             this.$confirm('确定将所选标的取消移动精选?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               if (row.isChoiceness == 'B') {
                 this.setPreferredSubject( row.id, "Y");
               } else if (row.isChoiceness == 'A') {
                 this.setPreferredSubject( row.id, "N");
               }
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               });
             });
           },
           cancelPreferredSubjectPC(row){
             this.$confirm('确定将所选标的取消PC精选?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               if (row.isChoiceness == 'B') {
                 this.setPreferredSubject( row.id, "A");
               } else if (row.isChoiceness == 'Y') {
                 this.setPreferredSubject( row.id, "N");
               }
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               });
             });
           },
           setPreferredSubject(id,choice){
              this.$axios({
                method: 'put',
                url: '/admin/api/subjects/choiceness',
                data: {ids: [id], isChoiceness: choice}
              }).then(()=>{
                this.$store.dispatch("GetSubjectAllTab",{'type':{status: 'FUNDING',orderByFlag:-1,queryFlag:1,page:1}})
              }).catch(()=>{

              })
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
           //手动满标
           confirmFunded(row){
             this.$confirm('标的正在募集中，确认马上满标?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.$axios({
                 method: 'POST',
                 url: `/api/users/${row.userId}/subjects/${row.id}/manualFunded`,
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

