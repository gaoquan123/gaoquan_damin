<template>
  <div>
    <el-row :gutter="20" v-if="catalog=='JIASHI_V2'" >
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签名称:</strong>{{tagName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签说明:</strong>{{tagDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>资产模式:</strong>{{loanAssetModel|loanAssetModel}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>代收账户:</strong>{{collUserName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>转让人:</strong>{{userName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>预计转让生成日:</strong>{{predicateValueDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>金融资产持有起始日:</strong>{{financialAssetsHeldInceptionDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>金融资产持有终止日:</strong>{{financialAssetsHeldTerminationDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>金融资产描述:</strong>{{usage}}</div></el-col>
      <template v-if="transferable">
        <el-col :span="12"><div class="grid-content bg-purple"><strong>可转让起始日:</strong>{{transferableStartDate}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple"><strong>可转让终止日:</strong>{{transferableEndDate}}</div></el-col>
      </template>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>项目亮点:</strong>{{highlight}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>还款保障:</strong>{{repaymentEnsure}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>风险提醒:</strong>{{riskAlert}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>借款用途:</strong>{{loanPurpose}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>项目资产:</strong>{{subjectCapital}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>合同类型:</strong>
        <span v-if="contractType=='newContract'">新合同</span>
        <span v-else>老合同</span>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>提前转出日:</strong>{{aheadTransferDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>项目简介:</strong>{{projectProfile}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>退出时间:</strong>{{endTime}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>提前退出:</strong>{{aheadOut}}</div></el-col>
    </el-row>
    <el-row :gutter="20" v-if="catalog=='JIASHI_V3'" >
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签名称:</strong>{{tagName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签说明:</strong>{{tagDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>资产模式:</strong>{{loanAssetModel|loanAssetModel}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>代收账户:</strong>{{collUserName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>转让人:</strong>{{userName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>预计转让生成日:</strong>{{predicateValueDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>金融资产持有起始日:</strong>{{financialAssetsHeldInceptionDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>金融资产持有终止日:</strong>{{financialAssetsHeldTerminationDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>金融资产描述:</strong>{{usage}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>项目亮点:</strong>{{highlight}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>还款保障:</strong>{{repaymentEnsure}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>风险提醒:</strong>{{riskAlert}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>借款用途:</strong>{{loanPurpose}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>项目资产:</strong>{{subjectCapital}}</div></el-col>
    </el-row>
    <el-row :gutter="20" v-if="catalog=='JIASHI_V8'" >
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签名称:</strong>{{tagName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签说明:</strong>{{tagDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>资产模式:</strong>{{loanAssetModel|loanAssetModel}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>代收账户:</strong>{{collUserName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>借款人:</strong>{{userName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>预计起息日:</strong>{{predicateValueDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>到期日:</strong>{{expiryDate}}</div></el-col>
      <template v-if="transferable">
        <el-col :span="12"><div class="grid-content bg-purple"><strong>可转让起始日:</strong>{{transferableStartDate}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple"><strong>可转让终止日:</strong>{{transferableEndDate}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple"><strong>转让说明:</strong>{{transferDescription}}</div></el-col>
      </template>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>是否有抵押:</strong><span v-if="mortgageable">是</span><span v-else>否</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>抵押说明:</strong>{{mortgageDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>是否有担保:</strong><span v-if="guaranteeable">是</span><span v-else>否</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>担保说明:</strong>{{guaranteeDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>其他说明:</strong>{{highlight}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>借款用途:</strong>{{usage}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>项目描述:</strong>{{subjectDesc}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>还款保障:</strong>{{repaymentEnsure}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>风险提醒:</strong>{{riskAlert}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>风控措施:</strong>{{riskMeasure}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>债务人姓名:</strong>{{debtorName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>债务人婚姻状况:</strong>{{debtorMaritalStatus}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>债务人性别:</strong>{{debtorSex}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>债务人年龄:</strong>{{debtorAge}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>债务人所在城市:</strong>{{debtorCity}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>房产位置:</strong>{{housePropertyPosition}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>建筑面积:</strong>{{coveredArea}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>规划用途:</strong>{{planningPurposes}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>评估价值:</strong>{{evaluationValue}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>合同类型:</strong>
        <span v-if="contractType=='oldContract'">债转合同</span>
        <span v-else>个人借款合同</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>原始债权金额:</strong>{{originalObligatoryRightAmount}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>原始债权起始日:</strong>{{originalObligatoryRightStartDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>原始债权到期日:</strong>{{originalObligatoryRightEndDate}}</div></el-col>
    </el-row>
    <el-row :gutter="20" v-if="catalog=='JIASHI_V13'" >
      <el-col :span="12"><div class="grid-content bg-purple"><strong>资产模式:</strong>{{loanAssetModel|loanAssetModel}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>代收账户:</strong>{{collUserName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>项目描述:</strong>{{subjectDesc}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>还款保障:</strong>{{repaymentEnsure}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>风险提醒:</strong>{{riskAlert}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>是否有抵押:</strong><span v-if="mortgageable">是</span><span v-else>否</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>抵押说明:</strong>{{mortgageDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>是否有担保:</strong><span v-if="guaranteeable">是</span><span v-else>否</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>担保说明:</strong>{{guaranteeDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>房产位置:</strong>{{housePropertyPosition}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>建筑面积:</strong>{{coveredArea}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>规划用途:</strong>{{planningPurposes}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>评估价值:</strong>{{evaluationValue}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>风控措施:</strong>{{riskMeasure}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>企业借款用途:</strong>{{usage}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>增信措施:</strong>{{addTrustMeasures}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签名称:</strong>{{tagName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>标签说明:</strong>{{tagDescription}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>借款人:</strong>{{userName}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>预计起息日:</strong>{{predicateValueDate}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"><strong>到期日:</strong>{{expiryDate}}</div></el-col>
      <template v-if="transferable">
        <el-col :span="12"><div class="grid-content bg-purple"><strong>可转让起始日:</strong>{{transferableStartDate}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple"><strong>可转让终止日:</strong>{{transferableEndDate}}</div></el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
  import {loanAssetModel} from  '@/PublicMethods/MethodsJs'
  export default {
    props:['catalog',
           'tagName',
           'tagDescription',
           'loanAssetModel',
           'collUserName',
           'userName',
           'predicateValueDate',
           'financialAssetsHeldInceptionDate',
           'financialAssetsHeldTerminationDate',
           'usage',
           'highlight',
           'repaymentEnsure',
           'riskAlert',
           'loanPurpose',
           'subjectCapital',
           'transferable',
           'transferableStartDate',
           'transferableEndDate',
           'contractType',
           'aheadTransferDate',
           'projectProfile',
           'endTime',
           'aheadOut',
           'expiryDate',
           'transferDescription',
           'mortgageable',
           'mortgageDescription',
           'guaranteeable',
           'guaranteeDescription',
           'riskMeasure',
           'subjectDesc',
           'debtorName',
           'debtorMaritalStatus',
           'debtorSex',
           'debtorAge',
           'debtorCity',
           'housePropertyPosition',
           'coveredArea',
           'planningPurposes',
           'evaluationValue',
           'originalObligatoryRightAmount',
           'originalObligatoryRightStartDate',
           'originalObligatoryRightEndDate',
           'addTrustMeasures'
    ],
    filters:{
      loanAssetModel
    }
  }
</script>
<style lang="less" scoped>
  .grid-content{
    line-height: 30px;
    padding: 5px;
  }


</style>
