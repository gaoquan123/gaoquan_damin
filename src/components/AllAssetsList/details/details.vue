<template>
  <div>
    <h3 class="front-20 title p-b-10">{{catalog|catalogText}}-{{title}}<span class="badge">{{status|detailsStatus}}</span></h3>
    <div class="details-info m-t-20">
      <h4 class="front-18">标的基本信息（ID:{{id}}）</h4>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"><strong>申请时间:</strong> {{createdAt|formatDate}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>项目期限:</strong> {{numberOfInvest}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>申请借款额:</strong> {{amount|fmoney}}元</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>还款方式:</strong> {{repaymentType|payWay}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>标的基础利率:</strong>{{annualRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>标的加息利率:</strong>{{addinterestRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>标的总利率(年化利率):</strong>{{totalRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>标的实际募集金额:</strong>{{currentInvestmentAmount|fmoney}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
                 <strong >出借进度:</strong>
                <template v-if="showProgress">
                    <span v-if="status!='PASS'">{{currentInvestmentAmount/amount|percent}} (当前出借金额:{{currentInvestmentAmount|fmoney}})</span>
                    <span v-else>已流标</span>
                </template>
                </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>服务费率:</strong>{{commissionRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>自动上架时间:</strong>{{autoShelfAt|formatToSec}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>实际上架时间:</strong>{{shelfTime|formatToSec}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>使用代金券方式:</strong> {{voucherType|voucherType}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>代金券限额:</strong>{{voucherQuota}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>使用代金券最小出借金额:</strong>{{investStartAmount}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>使用代金券金额:</strong>{{voucherAmount}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>出借增加:</strong>{{investStep}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>代金券增加:</strong>{{voucherStep}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>已使用代金券金额:</strong>{{usedVouchersValue}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>优惠品类:</strong>{{useCoupon|useCouponText}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>石榴币使用限额:</strong>{{maxPomegranate}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>促销方式:</strong>{{promotionStyle|promotionStyle}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>促销方式说明:</strong> {{promotionStyleExplain}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>限额金额:</strong>{{subjectLimitAmount|fmoney}}元</div></el-col>
      </el-row>
    </div>
    <div class="details-introduction m-t-20">
      <h4 class="front-18">标的介绍</h4>
      <introduce
        :catalog="catalog"
        :tagName="tagName"
        :tagDescription="tagDescription"
        :loanAssetModel="loanAssetModel"
        :collUserName="collUserName"
        :userName="userName"
        :predicateValueDate="predicateValueDate"
        :financialAssetsHeldInceptionDate="financialAssetsHeldInceptionDate"
        :financialAssetsHeldTerminationDate="financialAssetsHeldTerminationDate"
        :usage="usage"
        :highlight="highlight"
        :repaymentEnsure="repaymentEnsure"
        :riskAlert="riskAlert"
        :loanPurpose="loanPurpose"
        :subjectCapital="subjectCapital"
        :transferable="transferable"
        :transferableStartDate="transferableStartDate"
        :transferableEndDate="transferableEndDate"
        :contractType="contractType"
        :aheadTransferDate="aheadTransferDate"
        :projectProfile="projectProfile"
        :endTime="endTime"
        :aheadOut="aheadOut"
        :expiryDate="expiryDate"
        :transferDescription="transferDescription"
        :mortgageable="mortgageable"
        :mortgageDescription="mortgageDescription"
        :guaranteeable="guaranteeable"
        :guaranteeDescription="guaranteeDescription"
        :riskMeasure="riskMeasure"
        :subjectDesc="subjectDesc"
        :debtorName="debtorName"
        :debtorMaritalStatus="debtorMaritalStatus"
        :debtorSex="debtorSex"
        :debtorAge="debtorAge"
        :debtorCity="debtorCity"
        :housePropertyPosition="housePropertyPosition"
        :coveredArea="coveredArea"
        :planningPurposes="planningPurposes"
        :evaluationValue="evaluationValue"
        :originalObligatoryRightAmount="originalObligatoryRightAmount"
        :originalObligatoryRightStartDate="originalObligatoryRightStartDate"
        :originalObligatoryRightEndDate="originalObligatoryRightEndDate"
        :addTrustMeasures="addTrustMeasures"
      ></introduce>
    </div>
    <div class="details-params m-t-20">
      <h4 class="front-18">标的参数信息</h4>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"><strong>最小出借金额(元):</strong> {{minimumInvestmentAmount|fmoney}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>出借递增金额(元):</strong> {{stepInvestmentAmount|fmoney}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>出借限额(元):</strong> {{maximumInvestmentAmount|fmoney}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>募集期天数(天):</strong> {{passDays}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>平台手续费率:</strong>{{p2pCommissionRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>风险备用金率:</strong>{{riskRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>出借人利息手续费率:</strong>{{investProfitFeeRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>逾期罚息日利率:</strong>{{overduePenaltyRate|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>逾期管理费率:</strong>{{overdueCommission|percent}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>最低满标金额(元):</strong>{{portionAmount|fmoney}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>宽限期天数(天):</strong>{{graceDays}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><strong>列为坏账的最长逾期天数(天):</strong> {{redDays}}</div></el-col>

      </el-row>
    </div>
    <div class="detail-item m-t-20 m-b-20">
      <el-tabs >
        <el-tab-pane label="标的状态变动" >用户管理</el-tab-pane>
        <el-tab-pane label="出借请求" >配置管理</el-tab-pane>
      </el-tabs>

    </div>


  </div>
</template>
<script>
  import {formatDate,payWay,percent,useCouponText,catalogText,formatToSec,fmoney,voucherType,detailsStatus,promotionStyle} from  '@/PublicMethods/MethodsJs'
  import introduce from  './introduce'

  export default {
    data() {
      return {
        showProgress:true,//是否显示进度
        title:'',//标题
        id:'',//id
        catalog:'',//类型
        status:'',//状态
        createdAt:'',//申请时间
        numberOfInvest:'',//项目期限
        amount:'',//申请转让额
        repaymentType:'',//支付方式
        annualRate:'',//标的基础利率
        addinterestRate:'',//标的加息利率
        totalRate:'',//标的总利率
        currentInvestmentAmount:'',//标的实际募集金额
        commissionRate:'',//服务费率
        progress:'',//出借进度
        autoShelfAt:'',//自动上架时间
        shelfTime:'',//实际上架时间
        voucherType:'',//使用代金券方式
        voucherQuota:'',//代金券限额
        investStartAmount:'',//使用代金券最小出借金额
        voucherAmount:'',//使用代金券金额
        investStep:'',//出借增加
        voucherStep:'',//代金券增加
        usedVouchersValue:'',//已使用代金券金额
        useCoupon:'',//优惠品类
        maxPomegranate:'',//石榴币使用限额
        promotionStyle:'',//促销方式
        customPromotionExplain:'',//自定义促销方式
        promotionStyleExplain:'',//促销方式说明
        subjectLimitAmount:'',//限额金额

        tagName:'',//标签名称
        tagDescription:'',//标签说明
        loanAssetModel:'',//资产模式
        collUserName:'',//代收账户
        userName:'',//转让人
        predicateValueDate:'',//预计转让生成日
        financialAssetsHeldInceptionDate:'',//金融资产持有起始日
        financialAssetsHeldTerminationDate:'',//金融资产持有终止日
        usage:'',//金融资产描述
        highlight:'',//项目亮点
        repaymentEnsure:'',//还款保障
        riskAlert:'',//风险提醒
        loanPurpose:'',//借款用途
        subjectCapital:'',//项目资产
        transferable:'',//可转让
        transferableStartDate:'',//可转让起始日
        transferableEndDate:'', //可转让终止日
        contractType:'',       //合同类型
        aheadTransferDate:'', //提前转出日
        projectProfile:'',     //项目简介
        endTime:'',   //退出时间
        aheadOut:'',  // 提前退出

        expiryDate:'',//到期日
        transferDescription:'',//转让说明
        mortgageable:'',//是否有抵押
        mortgageDescription:'',//抵押说明
        guaranteeable:'',//是否有担保
        guaranteeDescription:'',//担保说明
        riskMeasure:'',//风控措施
        subjectDesc:'',//项目描述
        debtorName:'',//债务人姓名
        debtorMaritalStatus:'',//债务人婚姻状况
        debtorSex:'',//债务人性别
        debtorAge:'',//债务人年龄
        debtorCity:'',//债务人所在城市
        housePropertyPosition:'',//房产位置
        coveredArea:'',//建筑面积
        planningPurposes:'',//规划用途
        evaluationValue:'',//评估价值
        originalObligatoryRightAmount:'',//原始债权金额
        originalObligatoryRightStartDate:'',//原始债权起始日
        originalObligatoryRightEndDate:'',//原始债权到期日
        addTrustMeasures:'',//增信措施

        minimumInvestmentAmount:'',//最小出借金额
        stepInvestmentAmount:'',//出借递增金额
        maximumInvestmentAmount:'',//出借限额
        passDays:'',//募集期天数
        p2pCommissionRate:'',//平台手续费率
        riskRate:'',//风险备用金率
        investProfitFeeRate:'',//出借人利息手续费率
        overduePenaltyRate:'',//逾期罚息日利率
        overdueCommission:'',//逾期管理费率
        portionAmount:'',//最低满标金额
        graceDays:'',//宽限期天数
        redDays:'',//列为坏账的最长逾期天数



      }
    },
    methods: {

    },
    created(){
      const id=this.$route.query.id;
      const userId=this.$route.query.userId;
      this.$axios.get(`/admin/api/users/${userId}/subjects/${id}`)
        .then((res)=>{
          this.catalog=res.data.catalog;
          this.title=res.data.title;
          this.id=res.data.id;
          this.status=res.data.status;
          this.showProgress=['NEW', 'FUNDING', 'PASS', 'UN_SHELVE', 'FUNDED'].includes(this.status)
          this.createdAt=res.data.createdAt;
          this.numberOfInvest=res.data.instalmentPolicy.type=='MATCHING_PRINCIPAL_AND_INTEREST'
            ?res.data.instalmentPolicy.numberOfInstalments+'月':
            res.data.instalmentPolicy.interval.count+'天';
          this.amount=res.data.amount.amount;
          this.repaymentType=res.data.instalmentPolicy.type;
          this.annualRate=res.data.instalmentPolicy.annualRate;
          this.addinterestRate=res.data.instalmentPolicy.addinterestRate;
          this.totalRate=res.data.instalmentPolicy.addinterestRate+res.data.instalmentPolicy.annualRate;
          this.currentInvestmentAmount=res.data.currentInvestmentAmount.amount;
          this.commissionRate=res.data.config.commissionRate;
          this.autoShelfAt=res.data.autoShelfAt;
          this.shelfTime=res.data.shelfTime;
          this.voucherType=res.data.voucherPolicy&&res.data.voucherPolicy.type;
          this.voucherQuota=res.data.voucherPolicy&&res.data.voucherPolicy.voucherQuota;
          this.investStartAmount=res.data.voucherPolicy&&res.data.voucherPolicy.investStartAmount.amount;
          this.voucherAmount=res.data.voucherPolicy&&voucherPolicy.investStartAmount.amount;
          this.investStep=res.data.voucherPolicy&&res.data.voucherPolicy.investStep;
          this.voucherStep=res.data.voucherPolicy&&res.data.voucherPolicy.voucherStep;
          this.usedVouchersValue=res.data.usedVouchersValue.amount;
          this.useCoupon=res.data.config.useCoupon;
          this.maxPomegranate=res.data.config.maxPomegranate;
          this.promotionStyle=res.data.config.promotionStyle;
          this.customPromotionExplain=res.data.config.customPromotionExplain;
          this.promotionStyleExplain=res.data.config.promotionStyleExplain;
          this.subjectLimitAmount=res.data.catalog=='JIASHI_V3'?res.data.investmentPolicy.maximumInvestmentAmount.amount:res.data.subjectLimitAmount;


          this.tagName=res.data.config.tagName;
          this.tagDescription=res.data.config.tagDescription;
          this.loanAssetModel=res.data.informationShow.loanAssetModel;
          this.collUserName=res.data.informationShow.loanAssetModel=='COLLECT'?res.data.informationShow.collUserName:'--';
          this.userName=res.data.user.name;
          this.predicateValueDate=res.data.loaneeInformation.predicateValueDate;
          this.financialAssetsHeldInceptionDate=res.data.config.financialAssetsHeldInceptionDate;
          this.financialAssetsHeldTerminationDate=res.data.config.financialAssetsHeldTerminationDate;
          this.usage=res.data.loaneeInformation.usage;
          this.highlight=res.data.loaneeInformation.highlight;
          this.repaymentEnsure=res.data.loaneeInformation.repaymentEnsure;
          this.riskAlert=res.data.loaneeInformation.riskAlert;
          this.loanPurpose=res.data.loaneeInformation.loanPurpose;
          this.subjectCapital=res.data.loaneeInformation.subjectCapital;
          this.transferable=res.data.transferable;
          this.transferableStartDate=res.data.transferableStartDate;
          this.transferableEndDate=res.data.transferableEndDate;
          this.contractType=res.data.config.contractType;
          this.aheadTransferDate=res.data.loaneeInformation.aheadTransferDate;
          this.projectProfile=res.data.loaneeInformation.projectProfile;
          this.endTime=res.data.loaneeInformation.endTime;
          this.aheadOut=res.data.loaneeInformation.aheadOut;

          this.expiryDate=res.data.config.expiryDate;
          this.transferDescription=res.data.config.transferDescription;;
          this.mortgageable=res.data.mortgageable;;
          this.mortgageDescription=res.data.config.mortgageDescription;
          this.guaranteeable=res.data.guaranteeable;
          this.guaranteeDescription=res.data.config.guaranteeDescription;
          this.riskMeasure=res.data.loaneeInformation.riskMeasure;;
          this.subjectDesc=res.data.loaneeInformation.subjectDesc;;
          this.debtorName=res.data.loaneeInformation.debtorName;;
          this.debtorMaritalStatus=res.data.loaneeInformation.debtorMaritalStatus;
          this.debtorSex=res.data.loaneeInformation.debtorSex;
          this.debtorAge=res.data.loaneeInformation.debtorAge;
          this.debtorCity=res.data.loaneeInformation.debtorCity;
          this.housePropertyPosition=res.data.loaneeInformation.housePropertyPosition;
          this.coveredArea=res.data.loaneeInformation.coveredArea;
          this.planningPurposes=res.data.loaneeInformation.planningPurposes;
          this.evaluationValue=res.data.loaneeInformation.evaluationValue;
          this.originalObligatoryRightAmount=res.data.loaneeInformation.originalObligatoryRightAmount;
          this.originalObligatoryRightStartDate=res.data.loaneeInformation.originalObligatoryRightStartDate;
          this.originalObligatoryRightEndDate=res.data.loaneeInformation.originalObligatoryRightEndDate;
          this.addTrustMeasures=res.data.loaneeInformation.addTrustMeasures;

          this.minimumInvestmentAmount=res.data.investmentPolicy.minimumInvestmentAmount.amount;
          this.stepInvestmentAmount=res.data.investmentPolicy.stepInvestmentAmount&&res.data.investmentPolicy.stepInvestmentAmount.amount;
          this.maximumInvestmentAmount=res.data.investmentPolicy.maximumInvestmentAmount&&res.data.investmentPolicy.maximumInvestmentAmount.amount;
          this.passDays=res.data.config.passDays;
          this.p2pCommissionRate=res.data.agreements.filter(function (agreement) {
                                          return agreement.type === 'P2P_COMMISSION';
                                          })[0].commissionRate;
          this.riskRate=res.data.agreements.filter(function (agreement) {
                                          return agreement.type === 'RISK';
                                          })[0].riskRate;
          this.investProfitFeeRate=res.data.config.investProfitFeeRate;
          this.overduePenaltyRate=res.data.config.overduePenaltyRate;
          this.overdueCommission=res.data.config.overdueCommission;
          console.log(this.overdueCommission);
          this.portionAmount=res.data.portionAmount.amount;
          this.graceDays=res.data.config.graceDays;
          this.redDays=res.data.config.redDays;

        })
        .catch((err)=>{

        })
    },
    components:{
      introduce
    },
    filters:{
      formatDate,
      payWay,
      percent,
      useCouponText,
      catalogText,
      formatToSec,
      fmoney,
      voucherType,
      detailsStatus,
      promotionStyle

    }
  }

</script>
<style lang="less" scoped>
  h3 {
    font-weight: 700;
    color: #409EFF;
    border-bottom:1px solid #eee;
  }
  h4{
    line-height: 30px;
    background: #409EFF;
    color: #fff;
    padding: 5px;
  }
  .details-info,.details-introduction,.details-params,.detail-item{
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .grid-content{
    line-height: 30px;
    padding: 5px;
  }
  .badge{
    display: inline-block;
    background: #409EFF;
    color: #fff;
    border-radius: 10px;
    padding: 0 5px;
    margin-left: 10px;
  }
  .detail-item{
    padding: 10px;
  }
  .el-tabs__item{
    padding: 10px;
  }

</style>
