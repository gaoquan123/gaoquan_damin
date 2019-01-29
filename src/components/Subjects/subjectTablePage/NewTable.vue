<template>
    <div class="m-t-40">
        <!-- 未上架 -->
         <el-table  :data="listItemTab" fit
         :row-class-name="tableRowClassName"
          border style="width: 100%" >
			<el-table-column prop="title" label="项目名称"  width="200px;" > </el-table-column>
			<el-table-column prop="catalog" label="产品类型"  > </el-table-column>
			<el-table-column prop="autoShelfAt" label="自动上架时间"  > </el-table-column>
			<el-table-column prop="annualRate" label="年化利率"  > </el-table-column>
			<el-table-column prop="amount" label="借款金额"  > </el-table-column>
			<el-table-column prop="currentInvestmentAmount" label="当前出借金额"  > </el-table-column>
			<el-table-column prop="status" label="状态"  > </el-table-column>
			<el-table-column prop="instalType" label="还款方式"  > </el-table-column>
			<el-table-column prop="laModel" label="代收付信息"  > </el-table-column>
            	<el-table-column label="操作" width="250">
				<template slot-scope="scope">
                     <el-button  v-if="DataRoles($store.state.login.roles,'subjectsTab1btn1')" type="primary" plain round  size="mini" @click="subjectConfirm(scope.row)">上架</el-button>
                     <el-button  v-if="DataRoles($store.state.login.roles,'subjectsTab1btn2')" type="success" plain round  size="mini">修改</el-button>
                     <el-button  v-if="DataRoles($store.state.login.roles,'subjectsTab1btn3')" type="danger" plain round  size="mini" @click="subjectCancel(scope.row)">撤销</el-button>
				</template>
			</el-table-column>
        </el-table>
    </div>
</template>
<script>
import {catalogText,formatDate,payWay,ModelType,dealElement} from '../../../PublicMethods/MethodsJs'

    export default {
        // props:['queryForm'],
        data () {
            return {
                // page:1,
            }
        },
        computed: {
            listItemTab(){
                if(this.$store.state.subjects.GetSubjectInfoItem.items){
                  let result  = this.$store.state.subjects.GetSubjectInfoItem.items;
                   result.map((item)=>{
                        item.catalog = catalogText(item.catalog);
                        if(item.autoShelfAt){
                           item.autoShelfAt =  formatDate(item.autoShelfAt);
                        }
                        item.annualRate = (item.annualRate*100).toFixed(2)+'%';
                        item.amount = item.amount.amount+'元'
                        item.currentInvestmentAmount = item.currentInvestmentAmount.amount+'元'
                        item.status = '未上架';
                        item.instalType = payWay(item.instalType)
                        item.laModel = ModelType(item.laModel)
                   })
                   return  result
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
            subjectConfirm(row) {
            this.$confirm(`是否确定上架标的:${row.title}`, '确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios({
                url: `/api/users/${row.userId}/subjects/${row.id}/shelf`,
                data:{},
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then( (response)=> {
                this.$message({
                  type: 'success',
                  message: '上架成功!'
                });
                this.$store.dispatch("GetSubjectAllTab",{'type':{status: 'NEW',orderByFlag:-1,queryFlag:1,page:1}})
              }).catch( (error)=> {
                this.$message.error('上架失败');
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消上架'
              });
            });
          },
            subjectCancel(row) {
              this.$axios({
                url: `/api/users/${row.userId}/subjects/${row.id}/abort`,
                data:{},
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then( (response)=> {
                this.$message({
                  type: 'success',
                  message: '撤销成功!'
                });
                this.$store.dispatch("GetSubjectAllTab",{'type':{status: 'NEW',orderByFlag:-1,queryFlag:1,page:1}})
              }).catch( (error)=> {
                this.$message.error('撤销失败');
              });
          }
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
</style>

