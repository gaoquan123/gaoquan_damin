<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admins/allassetslist' }">资产管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admins/allassetslist/subjectinfo',query: {assetId:subject.loanAssetId }}">标的信息</el-breadcrumb-item>
      <el-breadcrumb-item>{{subject.catalog|catalogText}}-{{subject.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="front-20 title p-b-10  m-t-30">{{subject.catalog|catalogText}}-{{subject.title}}<span class="badge">{{subject.status|detailsStatus}}</span>
    </h3>
    <div class="details-info m-t-20">
      <h4 class="front-18">标的基本信息（ID:{{subject.id}}）</h4>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content "><strong>申请时间:</strong> {{subject.createdAt|formatDate}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>项目期限:</strong>
            <span v-if="subject.instalmentPolicy.type=='MATCHING_PRINCIPAL_AND_INTEREST'">{{subject.instalmentPolicy.numberOfInstalments}}月</span>
            <span v-else>{{subject.instalmentPolicy.interval&&subject.instalmentPolicy.interval.count}}天</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>申请借款额:</strong> {{subject.amount.amount|fmoney}}元</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>还款方式:</strong> {{subject.instalmentPolicy.type|payWay}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>标的基础利率:</strong>{{subject.instalmentPolicy.annualRate|percent}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>标的加息利率:</strong>{{subject.instalmentPolicy.addinterestRate|percent}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>标的总利率(年化利率):</strong>{{(subject.instalmentPolicy.annualRate+subject.instalmentPolicy.addinterestRate)|percent}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>标的实际募集金额:</strong>{{subject.currentInvestmentAmount.amount|fmoney}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            <strong>出借进度:</strong>
            <template v-if="showProgress">
              <span v-if="subject.status!='PASS'">{{(subject.currentInvestmentAmount.amount/subject.amount.amount)|percent}} (当前出借金额:{{subject.currentInvestmentAmount.amount|fmoney}})</span>
              <span v-else>已流标</span>
            </template>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>服务费率:</strong>{{subject.config.commissionRate|percent}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>自动上架时间:</strong>{{subject.autoShelfAt|formatToSec}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>实际上架时间:</strong>{{subject.shelfTime|formatToSec}}</div>
        </el-col>
        <template v-if="subject.voucherPolicy">
          <el-col :span="6">
            <div class="grid-content "><strong>使用代金券方式:</strong> {{subject.voucherPolicy.type|voucherType}}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content "><strong>代金券限额:</strong>{{subject.voucherPolicy.voucherQuota}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content "><strong>使用代金券最小出借金额:</strong>{{subject.voucherPolicy.investStartAmount.amount}}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content "><strong>使用代金券金额:</strong>{{subject.voucherPolicy.investStartAmount.amount}}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content "><strong>出借增加:</strong>{{subject.voucherPolicy.investStep}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content "><strong>代金券增加:</strong>{{subject.voucherPolicy.voucherStep}}</div>
          </el-col>
        </template>
        <el-col :span="6">
          <div class="grid-content "><strong>已使用代金券金额:</strong>{{subject.usedVouchersValue.amount}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>优惠品类:</strong>{{subject.config.useCoupon|useCouponText}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>石榴币使用限额:</strong>{{subject.config.maxPomegranate}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>促销方式:</strong>{{subject.config.promotionStyle|promotionStyle}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>自定义促销方式:</strong>
            <template v-if="subject.config.promotionStyle='custom'">
              {{subject.config.promotionStyleExplain}}
            </template>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>促销方式说明:</strong> {{subject.config.promotionStyleExplain}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content "><strong>限额金额:</strong>
            <span v-if="subject.catalog=='JIASHI_V3'">
              {{subject.investmentPolicy.maximumInvestmentAmount.amount|fmoney}}
            </span>
            <span v-else>{{subject.subjectLimitAmount|fmoney}}</span>元
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="details-introduction m-t-20">
      <h4 class="front-18">标的介绍</h4>
      <introduce :subject="subject"></introduce>
    </div>
    <div class="details-params m-t-20">
      <h4 class="front-18">标的参数信息</h4>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content"><strong>最小出借金额(元):</strong>
            {{subject.investmentPolicy.minimumInvestmentAmount.amount|fmoney}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>出借递增金额(元):</strong>
            {{subject.investmentPolicy.stepInvestmentAmount.amount|fmoney}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>出借限额(元):</strong>
            {{subject.investmentPolicy.maximumInvestmentAmount&&subject.investmentPolicy.maximumInvestmentAmount.amount|fmoney}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>募集期天数(天):</strong> {{subject.config.passDays}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>平台手续费率:</strong>{{subject.p2pCommissionRate|percent}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>风险备用金率:</strong>{{subject.riskRate|percent}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>出借人利息手续费率:</strong>{{subject.config.investProfitFeeRate|percent}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>逾期罚息日利率:</strong>{{subject.config.overduePenaltyRate|percent}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>逾期管理费率:</strong>{{subject.config.overdueCommission|percent}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>最低满标金额(元):</strong>{{subject.portionAmount.amount|fmoney}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>宽限期天数(天):</strong>{{subject.config.graceDays}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><strong>列为坏账的最长逾期天数(天):</strong> {{subject.config.redDays}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="detail-item m-t-20 m-b-20">
      <el-tabs type="border-card">
        <el-tab-pane label="还款记录" v-if="subject.status=='SIGNED'">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content "><strong>还款日</strong></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content "><strong>本金</strong></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content "><strong>利息</strong></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content "><strong>尾差</strong></div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content "><strong>状态</strong></div>
            </el-col>
            <template v-for="val in instalments">
              <el-col :span="4">
                <div class="grid-content ">{{val.settlementDate|formatDate}}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content ">{{val.principal.amount|fmoney}}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content ">{{val.interest.amount}}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content ">{{val|amountForItem('TAIL')}}</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content ">{{val.status|instalmentStatusFromBorrower}}</div>
              </el-col>
            </template>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="标的状态变动">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content "><strong>状态</strong></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content "><strong>操作时间</strong></div>
            </el-col>
            <template v-for="val in subject.statusHistories">
              <el-col :span="12">
                <div class="grid-content ">{{val.status|statusHistory}}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content ">{{val.createdAt|formatToSec}}</div>
              </el-col>
            </template>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="出借请求">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content "><strong>出借人</strong></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content "><strong>出借金额(元)</strong></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content "><strong>出借时间</strong></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content "><strong>代金券</strong></div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content "><strong>合同</strong></div>
            </el-col>
            <template v-for="val in investmentRequestsList">
              <el-col :span="4">
                <div class="grid-content ">{{val.user.name}}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content">{{val.investmentAmount.amount|fmoney}}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content ">{{val.investAt|formatDate}}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content "><span v-for="vouchersItem in val.vouchers">{{vouchersItem.amount}}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content "><span v-if="val.additionalContract">查看</span><span v-else>-</span></div>
              </el-col>
            </template>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {
    formatDate, payWay, percent, useCouponText, catalogText, formatToSec, fmoney,
    voucherType, detailsStatus, promotionStyle, statusHistory, getUri, amountForItem,
    instalmentStatusFromBorrower
  } from  '@/PublicMethods/MethodsJs'
  import introduce from  './introduce'

  export default {
    data() {
      return {
        showProgress: true,//是否显示进度
        instalments: [],   //还款记录
        investmentRequestsList: [],//出借请求
        subject: {
          agreements: {},
          instalmentPolicy: {},
          config: {},
          investmentPolicy: {
            minimumInvestmentAmount: {},
            stepInvestmentAmount: {},
            maximumInvestmentAmount: {}
          },
          currentInvestmentAmount: {},
          amount: {},
          usedVouchersValue: {},
          loaneeInformation: {},
          informationShow: {},
          portionAmount: {},
          p2pCommissionRate: '',//平台手续费率
          riskRate: '',//风险备用金率
        },
      }
    },
    methods: {},
    beforeMount(){
      const id = this.$route.query.id;
      const userId = this.$route.query.userId;
      this.$axios.get(`/admin/api/users/${userId}/subjects/${id}`)
        .then((res) => {
          res.data.collUserName = res.data.informationShow.loanAssetModel == 'COLLECT' ? res.data.informationShow.collUserName : '--'
          this.subject = res.data;
          this.showProgress = ['NEW', 'FUNDING', 'PASS', 'UN_SHELVE', 'FUNDED'].includes(this.subject.status);
          res.data.agreements.forEach((item) => {
            if (item.type === 'P2P_COMMISSION') {
              this.subject.p2pCommissionRate = item.commissionRate
            } else if (item.type === 'RISK') {
              this.subject.riskRate = item.riskRate
            }
          })
          return res
        })
        .then((res) => {
          let investmentRequestsUrl = res.data.investmentRequests.uri;
          let contractUrl = res.data.contract && res.data.contract.uri;
          investmentRequestsUrl = getUri(investmentRequestsUrl, '/api');
          //出借请求
          this.$axios.get(`${investmentRequestsUrl}`).then((res) => {
            this.investmentRequestsList = res.data;
          })
          if (contractUrl) {
            contractUrl = getUri(contractUrl, '/api');
            //还款记录,需要的时候才请求
            this.$axios.get(`${contractUrl}`, {
              headers: {Accept: "application/json"}
            }).then((res) => {
              this.instalments = res.data.instalments
            })
          }
        })
    },
    components: {
      introduce
    },
    filters: {
      formatDate,
      payWay,
      percent,
      useCouponText,
      catalogText,
      formatToSec,
      fmoney,
      voucherType,
      detailsStatus,
      promotionStyle,
      statusHistory,
      amountForItem,
      instalmentStatusFromBorrower
    }
  }
</script>
<style lang="less" scoped>
  h3 {
    font-weight: 700;
    color: #409EFF;
    border-bottom: 1px solid #eee;
  }

  h4 {
    line-height: 30px;
    background: #409EFF;
    color: #fff;
    padding: 5px;
  }

  .details-info, .details-introduction, .details-params, .detail-item {
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .grid-content {
    line-height: 30px;
    padding: 5px;
  }

  .badge {
    display: inline-block;
    background: #409EFF;
    color: #fff;
    border-radius: 10px;
    padding: 0 5px;
    margin-left: 10px;
  }

  .detail-item {
    padding: 10px;
  }

  .el-tabs__item {
    padding: 10px;
  }

  .detail-item {

  .el-row {
    padding: 0 20px;
  }

  .el-col {
    border-top: 1px solid #eee;
  }

  }
</style>
