<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admins/allassetslist' }">资产管理</el-breadcrumb-item>
      <el-breadcrumb-item>标的信息</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="front-20  m-t-30">标的信息</h3>
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
    <el-table :data="listItem" fit border style="width: 100%">
      <el-table-column prop="id" label=" 标的ID"></el-table-column>
      <el-table-column prop="title" label="名称 "></el-table-column>
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
        <template slot-scope="scope">
          {{scope.row.contractStatus|subjectStatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createdAt|formatToSec}}
        </template>
      </el-table-column>
      <el-table-column prop="ownerName" label="所有人"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" plain round size="mini" @click="toDetails(scope.row)">详情</el-button>
          <el-button type="success" plain round size="mini" @click="copySubject(scope.row,'copy')">复制</el-button>
          <el-button type="danger" plain round size="mini" @click="copySubject(scope.row,'edit')" v-if="scope.row.status=='NEW'">编辑</el-button>
          <el-button type="danger" disabled plain round size="mini" @click="copySubject(scope.row,'edit')" v-else>编辑</el-button>
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
  import {
    catalogText,
    formatDate,
    percent,
    fmoney,
    countDown,
    subjectStatus,
    surplus,
    assetDate,
    formatToSec
  } from '../../PublicMethods/MethodsJs'
  export default {
    data() {
      return {
        listItem: [],
        title: '',
        totalAmount: '',
        remaindAmount: '',
        startTime: '',
        endTime: '',
        page: 1,
        total: 1
      }
    },
    methods: {
      getSubjectList(){
        const loanAssetId = this.$route.query.assetId;
        this.$axios.get('/api/loanAssets/getSubjectList', {
          params: {
            loanAssetId: loanAssetId,
            pageLimit: 10,
            page: this.page,
          }
        }).then((res) => {
          this.listItem = res.data.items;
          this.title = res.data.loanAsset.title;
          this.totalAmount = res.data.loanAsset.totalAmount.amount;
          this.remaindAmount = res.data.loanAsset.remaindAmount.amount;
          this.startTime = res.data.loanAsset.startTime;
          this.endTime = res.data.loanAsset.endTime;
        }).catch((err) => {

        })
      },
      currentChange(page){
        this.page = page;
        this.getSubjectList()
      },
      toDetails(row){
        this.$router.push({path: '/admins/allassetslist/details', query: {id: row.id, userId: row.userId}})
      },
      copySubject(row, type){
        let version = 2
        //复制和编辑写同一个方法里面
        if (type == 'edit') {
          if (row.catalog == 'JIASHI_V3') {
            if (row.userType !== 'ENTERPRISE') {
              version = 0
            }else{
              version = 1
            }
          } else if (row.catalog == 'JIASHI_V8') {
            version = 0
          } else {
            version = 1
          }
        }
        console.log(version);
        const subjectId = row.id
        const assetId = row.loanAssetId
        const userId = row.userId
        this.decideAccIdAndTypeForCopySubject(subjectId, assetId, userId, version)
      },
      decideAccIdAndTypeForCopySubject(subjectId, assetId, userId, version){
        this.$axios.get('/admin/api/users/findAccIdAndType', {
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data == undefined) {
            this.$notify({
              title: '提示',
              message: '查询存管账户ID失败',
              duration: 0
            });
          } else {
            if (res.data.status == "success") {
              this.getDepositoryAuthStatus(res.data.accountId, res.data.userType, userId, subjectId, assetId, version)
            }
          }
        }).catch((err) => {
          this.$notify({
            title: '提示',
            message: '查询存管账户ID失败',
            duration: 0
          });
        })
      },
      getDepositoryAuthStatus(accountId, userType, userId, subjectId, assetId, version){
        this.$axios.get('/pay/lanmao/form/QUERY_USER_INFORMATION.json', {
          params: {
            platformUserNo: accountId
          }
        }).then((res) => {
          if (userType == 'ENTERPRISE') {
            if (res.data.auditStatus !== '' && typeof(res.data.auditStatus) !== 'undefined') {
              if (res.data.auditStatus !== 'PASSED') {
                this.$confirm('温馨提醒：该用户存管还未审核通过，请注意！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.decideIsBankNo(res.data.bankcardNo, userId, subjectId, assetId, version);
                }).catch(() => {
                  return false;
                });
              } else {
                this.decideIsBankNo(res.data.bankcardNo, userId, subjectId, assetId, version);
              }
            } else {
              this.$confirm('温馨提醒：该用户存管还未审核通过，请注意！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.decideIsBankNo(res.data.bankcardNo, userId, subjectId, assetId, version);
              }).catch(() => {
                return false;
              });
            }
          } else {
            this.decideIsBankNo(res.data.bankcardNo, userId, subjectId, assetId, version);
          }
        })
      },
      decideIsBankNo(bankcardNo, userId, subjectId, assetId, version){
        if (bankcardNo == '' || typeof(bankcardNo) == 'undefined') {
          this.$confirm('温馨提醒：该用户当前未绑定银行卡，请知悉！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (version == '1') {
              this.$router.push({ name: 'modifySubject', query: { userId: userId, subjectId: subjectId } });
            }
            if (version == '0') {
              this.$router.push({ name: 'modifyPersionLoanSubject', query: { userId: userId, subjectId: subjectId } });
            }
            if (version == '2') {
              this.copySubjectForEnd(userId, subjectId, assetId);
            }
          }).catch(() => {
            return false;
          });
        } else {
          if (version == '1') {
           this.$router.push({ name: 'modifySubject', query: { userId: userId, subjectId: subjectId } });
          }
          if (version == '0') {
            this.$router.push({ name: 'modifyPersionLoanSubject', query: { userId: userId, subjectId: subjectId } });
          }
          if (version == '2') {
            this.copySubjectForEnd(userId, subjectId, assetId);
          }
        }
      },
      copySubjectForEnd(userId, subjectId, assetId){
        this.$axios({
          method: 'post',
          url: '/api/loanAssets/copysubject',
          data: {
            userId: userId,
            subjectId: subjectId,
            assetId: assetId
          },
          headers: {
            'contentType': 'application/json',
          },
          responseType: 'text',

        }).then((res) => {
          this.$notify({
            title: '提示',
            message: res.data.status,
            duration: 0
          })
          this.getSubjectList()
        }).catch((err) => {
          this.$notify({
            title: '提示',
            message: err.data.status,
            duration: 0
          })
        })
      },
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

  .asset-title {
    border-bottom: 1px solid #eee;
    font-weight: 700;
  }

  .asset-title, .asset-info, .asset-date {
    padding: 10px;
    margin: 10px;

  span {
    margin-right: 20px;
  }

  }
  .el-pagination {
    text-align: center;
    margin: 20px;
  }
</style>
