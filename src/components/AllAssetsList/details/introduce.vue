<template>
  <div>
    <el-row :gutter="20" v-if="subject.catalog=='JIASHI_V2'">
      <el-col :span="12">
        <div class="grid-content"><strong>标签名称:</strong>{{subject.config.tagName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>标签说明:</strong>{{subject.config.tagDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>资产模式:</strong>{{subject.informationShow.loanAssetModel|loanAssetModel}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>代收账户:</strong>{{subject.informationShow.collUserName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>转让人:</strong>{{subject.user.name}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>预计转让生成日:</strong>{{subject.loaneeInformation.predicateValueDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>金融资产持有起始日:</strong>{{subject.config.financialAssetsHeldInceptionDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>金融资产持有终止日:</strong>{{subject.config.financialAssetsHeldTerminationDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"><strong>金融资产描述:</strong>{{subject.loaneeInformation.usage}}</div>
      </el-col>
      <template v-if="subject.transferable">
        <el-col :span="12">
          <div class="grid-content "><strong>可转让起始日:</strong>{{subject.transferableStartDate}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content "><strong>可转让终止日:</strong>{{subject.transferableEndDate}}</div>
        </el-col>
      </template>
      <el-col :span="12">
        <div class="grid-content "><strong>项目亮点:</strong>{{subject.loaneeInformation.highlight}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>还款保障:</strong>{{subject.loaneeInformation.repaymentEnsure}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>风险提醒:</strong>{{subject.loaneeInformation.riskAlert}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>借款用途:</strong>{{subject.loaneeInformation.oanPurpose}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>项目资产:</strong>{{subject.loaneeInformation.subjectCapital}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>合同类型:</strong>
          <span v-if="subject.config.contractType=='newContract'">新合同</span>
          <span v-else>老合同</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>提前转出日:</strong>{{subject.loaneeInformation.aheadTransferDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>项目简介:</strong>{{subject.loaneeInformation.projectProfile}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>退出时间:</strong>{{subject.loaneeInformation.endTime}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>提前退出:</strong>{{subject.loaneeInformation.aheadOut}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="subject.catalog=='JIASHI_V3'">
      <el-col :span="12">
        <div class="grid-content "><strong>标签名称:</strong>{{subject.config.tagName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>标签说明:</strong>{{subject.config.tagDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>资产模式:</strong>{{subject.informationShow.loanAssetModel|loanAssetModel}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>代收账户:</strong>{{subject.informationShow.collUserName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>转让人:</strong>{{subject.user.name}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>预计转让生成日:</strong>{{subject.loaneeInformation.predicateValueDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>金融资产持有起始日:</strong>{{subject.config.financialAssetsHeldInceptionDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>金融资产持有终止日:</strong>{{subject.config.financialAssetsHeldTerminationDate}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>金融资产描述:</strong>{{subject.loaneeInformation.usage}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>项目亮点:</strong>{{subject.loaneeInformation.highlight}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>还款保障:</strong>{{subject.loaneeInformation.repaymentEnsure}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>风险提醒:</strong>{{subject.loaneeInformation.riskAlert}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>借款用途:</strong>{{subject.loaneeInformation.loanPurpose}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>项目资产:</strong>{{subject.loaneeInformation.subjectCapital}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="subject.catalog=='JIASHI_V8'">
      <el-col :span="12">
        <div class="grid-content "><strong>标签名称:</strong>{{subject.config.tagName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>标签说明:</strong>{{subject.config.tagDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>资产模式:</strong>{{subject.informationShow.loanAssetModel|loanAssetModel}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>代收账户:</strong>{{subject.informationShow.collUserName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>借款人:</strong>{{subject.user.name}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>预计起息日:</strong>{{subject.loaneeInformation.predicateValueDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>到期日:</strong>{{subject.config.expiryDate}}</div>
      </el-col>
      <template v-if="subject.transferable">
        <el-col :span="12">
          <div class="grid-content "><strong>可转让起始日:</strong>{{subject.transferableStartDate}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content "><strong>可转让终止日:</strong>{{subject.transferableEndDate}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content "><strong>转让说明:</strong>{{subject.config.transferDescription}}</div>
        </el-col>
      </template>
      <el-col :span="12">
        <div class="grid-content "><strong>是否有抵押:</strong><span v-if="subject.mortgageable">是</span><span
          v-else>否</span></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>抵押说明:</strong>{{subject.config.mortgageDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>是否有担保:</strong><span v-if="subject.guaranteeable">是</span><span
          v-else>否</span></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>担保说明:</strong>{{subject.config.guaranteeDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>其他说明:</strong>{{subject.loaneeInformation.highlight}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>借款用途:</strong>{{subject.loaneeInformation.usage}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>项目描述:</strong>{{subject.loaneeInformation.subjectDesc}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>还款保障:</strong>{{subject.loaneeInformation.repaymentEnsure}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>风险提醒:</strong>{{subject.loaneeInformation.riskAlert}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>风控措施:</strong>{{subject.loaneeInformation.riskMeasure}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>债务人姓名:</strong>{{subject.loaneeInformation.debtorName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>债务人婚姻状况:</strong>{{subject.loaneeInformation.debtorMaritalStatus}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>债务人性别:</strong>{{subject.loaneeInformation.debtorSex}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>债务人年龄:</strong>{{subject.loaneeInformation.debtorAge}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>债务人所在城市:</strong>{{subject.loaneeInformation.debtorCity}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>房产位置:</strong>{{subject.loaneeInformation.housePropertyPosition}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>建筑面积:</strong>{{subject.loaneeInformation.coveredArea}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>规划用途:</strong>{{subject.loaneeInformation.planningPurposes}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>评估价值:</strong>{{subject.loaneeInformation.evaluationValue}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>合同类型:</strong>
          <span v-if="subject.config.contractType=='oldContract'">债转合同</span>
          <span v-else>个人借款合同</span></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>原始债权金额:</strong>{{subject.loaneeInformation.originalObligatoryRightAmount}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>原始债权起始日:</strong>{{subject.loaneeInformation.originalObligatoryRightStartDate}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>原始债权到期日:</strong>{{subject.loaneeInformation.originalObligatoryRightEndDate}}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="subject.catalog=='JIASHI_V13'">
      <el-col :span="12">
        <div class="grid-content "><strong>资产模式:</strong>{{subject.informationShow.loanAssetModel|loanAssetModel}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>代收账户:</strong>{{subject.informationShow.collUserName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>项目描述:</strong>{{subject.loaneeInformation.subjectDesc}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>还款保障:</strong>{{subject.loaneeInformation.repaymentEnsure}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>风险提醒:</strong>{{subject.loaneeInformation.riskAlert}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>是否有抵押:</strong><span v-if="subject.mortgageable">是</span><span
          v-else>否</span></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>抵押说明:</strong>{{subject.config.mortgageDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>是否有担保:</strong><span v-if="subject.guaranteeable">是</span><span
          v-else>否</span></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>担保说明:</strong>{{subject.config.guaranteeDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>房产位置:</strong>{{subject.loaneeInformation.housePropertyPosition}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>建筑面积:</strong>{{subject.loaneeInformation.coveredArea}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>规划用途:</strong>{{subject.loaneeInformation.planningPurposes}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>评估价值:</strong>{{subject.loaneeInformation.evaluationValue}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>风控措施:</strong>{{subject.loaneeInformation.riskMeasure}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>企业借款用途:</strong>{{subject.loaneeInformation.usage}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>增信措施:</strong>{{subject.loaneeInformation.addTrustMeasures}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>标签名称:</strong>{{subject.config.tagName}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>标签说明:</strong>{{subject.config.tagDescription}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>借款人:</strong>{{subject.user.name}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>预计起息日:</strong>{{subject.loaneeInformation.predicateValueDate}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content "><strong>到期日:</strong>{{subject.config.expiryDate}}</div>
      </el-col>
      <template v-if="subject.transferable">
        <el-col :span="12">
          <div class="grid-content "><strong>可转让起始日:</strong>{{subject.transferableStartDate}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content "><strong>可转让终止日:</strong>{{subject.transferableEndDate}}</div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
  import {loanAssetModel} from  '@/PublicMethods/MethodsJs'
  export default {
    props: {
      subject: {
        type: Object
      }
    },
    filters: {
      loanAssetModel
    }
  }
</script>
<style lang="less" scoped>
  .grid-content {
    line-height: 30px;
    padding: 5px;
  }
</style>
