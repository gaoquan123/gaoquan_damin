<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/allassetslist' }">标的管理</el-breadcrumb-item>
      <el-breadcrumb-item>标的出借人详情</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="front-20 m-t-30">标的出借人详情</h3>
    <el-table class="m-t-30"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标的名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="loanTitle"
        label="所属资产"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="用户手机号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        label="出借本金"
        width="180"
        align="center">
        <template slot-scope="scope">
          {{scope.row.instalments.principal.amount|fmoney}}元
        </template>
      </el-table-column>
      <el-table-column
        label="获得总金额"
        align="center">
        <template slot-scope="scope">
          {{scope.row.instalments.amount.amount|fmoney}}元
        </template>
      </el-table-column>
      <el-table-column
        label="获得利息"
        align="center">
        <template slot-scope="scope">
          {{scope.row.instalments.interest.amount|fmoney}}元
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {fmoney} from '@/PublicMethods/MethodsJs'
  export default {
    data() {
      return {
        tableData: [],
        page:1,
        total:1
      }
    },
    created(){
      this.getRepaymentDetailsUsers()
    },
    methods:{
          getRepaymentDetailsUsers(){
          this.$axios('/admin/api/subjects/getRepaymentDetailsUsers',{
            params:{
              page:this.page,
              subjectId:38637
            }
          }).then(res=>{
              this.tableData=res.data.items
              this.total=res.data.totalCount
          }).catch(err=>{

          })
        },
      handleCurrentChange(val){
             this.page=val
            this.getRepaymentDetailsUsers()
      }
    },
    filters:{
      fmoney
    }
  }
</script>
<style lang="less" scoped>
  h3 {
    font-weight: 700;
    color: #409EFF;
  }
  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }

</style>
