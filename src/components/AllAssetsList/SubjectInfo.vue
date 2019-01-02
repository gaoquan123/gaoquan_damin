<template>
  <div>
    <h3 class="front-20">标的信息</h3>
    <p class="front-16 p-t-30 asset-title">所属资产概况</p>
    <p class="asset-info">
      <span><strong>资产名称：</strong>{{title}}</span>
      <span><strong>资产总规模：</strong>{{totalAmount|fmoney}} </span>
      <span><strong>资产剩余规模：</strong>{{remaindAmount|fmoney}}</span>
    </p>
    <p class="asset-date">
      <span><strong>资产起始日：</strong>{{startTime|assetDate}}</span>
      <span><strong>资产终止日： </strong>{{endTime|assetDate}}</span>
    </p>
    <el-table  :data="listItem" fit border style="width: 100%">
      <el-table-column prop="id" label=" 标的ID"  > </el-table-column>
      <el-table-column prop="title" label="名称 "  > </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{scope.row.catalog|catalogText}}
        </template>
      </el-table-column>
      <el-table-column label="自动上架时间">
        <template slot-scope="scope">
        {{scope.row.autoShelfAt|countDown(scope.row.onlineCountDown)}}
        </template>
      </el-table-column>
      <el-table-column prop="annualRate" label="年化利率">
        <template slot-scope="scope">
        {{scope.row.annualRate|percent}}
        </template>
      </el-table-column>
      <el-table-column label="借款金额(元)">
        <template slot-scope="scope">
          {{scope.row.amount.amount|fmoney}}
        </template>
      </el-table-column>
      <el-table-column label=" 最小出借金额(元)">
        <template slot-scope="scope">
          {{scope.row.minInvAmount.amount|fmoney}}
        </template>
      </el-table-column>
      <el-table-column label=" 已出借金额(元)">
        <template slot-scope="scope">
          {{scope.row.currentInvestmentAmount.amount|fmoney}}
        </template>
      </el-table-column>
      <el-table-column label="剩余额度(元)">
        <template slot-scope="scope">
          {{scope.row.amount.amount|surplus(scope.row.currentInvestmentAmount.amount,scope.row.status,scope.row.contractStatus)}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" >
          {{scope.row.contractStatus|subjectStatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间"  >
        <template slot-scope="scope">
          {{scope.row.createdAt|formatToSec}}
        </template>
      </el-table-column>
      <el-table-column prop="ownerName" label="所有人"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" plain round  size="mini" @click="toDetails(scope.row)">详情</el-button>
          <el-button type="success" plain round  size="mini">复制</el-button>
          <el-button type="danger" plain round  size="mini" @click="subjectCancel(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="currentChange"
      :current-page.sync="page"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import {catalogText,formatDate,percent,fmoney,countDown,subjectStatus,surplus,assetDate,formatToSec} from '../../PublicMethods/MethodsJs'
  export default {
    data() {
      return {
        listItem: [],
        title:'',
        totalAmount:'',
        remaindAmount:'',
        startTime:'',
        endTime:'',
        page:1,
        total:1
      }
    },
    methods: {
      getSubjectList(){
          const loanAssetId=this.$route.query.assetId;
        this.$axios.get('/api/loanAssets/getSubjectList', {
          params:  {
            loanAssetId: loanAssetId,
            pageLimit: 10,
            page: this.page,
              }
        }).then((res)=>{
            this.listItem=res.data.items;
            this.title=res.data.loanAsset.title;
            this.totalAmount=res.data.loanAsset.totalAmount.amount;
            this.remaindAmount=res.data.loanAsset.remaindAmount.amount;
            this.startTime=res.data.loanAsset.startTime;
            this.endTime=res.data.loanAsset.endTime;
          }).catch((err)=>{

          })
      },
      currentChange(page){
        this.page=page;
        this.getSubjectList()
      },
      toDetails(row){
        this.$router.push({path:'/admin/allassetslist/details',query:{id:row.id,userId:row.userId}})
      }
    },
    created(){
      this.getSubjectList()
    },
    filters: {
      catalogText,
      formatDate,
      percent,
      fmoney,
      countDown,
      subjectStatus,
      surplus,
      assetDate,
      formatToSec
    }
  }
</script>
<style lang="less" scoped>
  h3 {
    font-weight: 700;
    color: #409EFF;
  }
  .asset-title{
    border-bottom:1px solid #eee;
    font-weight: 700;
  }
  .asset-title,.asset-info,.asset-date{
    padding: 10px;
    margin: 10px;
    span{
      margin-right: 20px;
    }
  }
  .el-pagination{
    text-align: center;
    margin: 20px;
  }
</style>
