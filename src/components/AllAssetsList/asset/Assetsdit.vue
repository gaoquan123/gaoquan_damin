<template>
    <div class="newsubject">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin/allassetslist' }">资产管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑资产</el-breadcrumb-item>
        </el-breadcrumb>
        <h1 class="front-22 m-t-30 color">编辑资产</h1>
        <div class="Newform m-t-50">
            <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="150px">
                <el-form-item label="资产所属人" prop="userName">
                    <el-input disabled v-model="ruleForm.userName"></el-input>
                </el-form-item>

                <el-form-item label="资产类型" prop="bizPersonnelType">
					<el-radio-group v-model="ruleForm.bizPersonnelType">
						<el-radio disabled label="BIZ"  border size="medium">供应链</el-radio>
						<el-radio disabled label="PERSONNEL" border size="medium">小微</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="资产名称" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item label="资产规模" prop="totalAmount">
                    <el-input type="number" placeholder="请输入内容" v-model="ruleForm.totalAmount">
                        <template slot="append">元</template>
                    </el-input>
                    <el-button type="primary" @click="findUserAssetLimit">资产剩余额度查询</el-button>
                </el-form-item>

                <el-form-item label="还款方式" prop="payWay">
                    <el-select disabled="" placeholder="请选择还款方式" v-model="ruleForm.payWay">
                        <el-option label="到期一次性还本付息" value="ONCE_PRINCIPAL_AND_INTEREST"></el-option>
                        <el-option label="等额本息" value="MATCHING_PRINCIPAL_AND_INTEREST"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资产所属公司" prop="assetsOfCompany">
                    <el-select placeholder="请选择资产所属公司" v-model="ruleForm.assetsOfCompany">
                        <el-option v-for="item in assetsOfCompanyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资产期限" prop="timeLimitType">
					<el-radio-group v-model="ruleForm.timeLimitType">
						<el-radio disabled label="DATE"  border size="medium">固定日期</el-radio>
						<el-radio disabled label="DAYS" border size="medium">固定期限</el-radio>
                        <!-- 如果是供应链 -->
						<el-radio disabled v-if="ruleStatus.timeLimitType" label="FPN" border size="medium">固定期数</el-radio>
					</el-radio-group>
				</el-form-item>

                <!-- 如果是供应链 -->
                <el-form-item label="资产起始日" prop="startTime" v-if="ruleStatus.startTime">
                        <el-date-picker
                         v-model="ruleForm.startTime"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="资产到期日" prop="endTime" v-if="ruleStatus.endTime">
                        <el-date-picker
                         v-model="ruleForm.endTime"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="资产期限" prop="limitDays" v-if="ruleStatus.limitDays">
                    <el-input  placeholder="请输入内容" :disabled="ruleStatus.limitDaysDisabled" v-model="ruleForm.limitDays">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="宽限期" prop="assetsAbleOverDays" v-if="ruleStatus.assetsAbleOverDays">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.assetsAbleOverDays">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <!-- 如果是供应链 -->


                <!-- 如果是小微 -->
                <el-form-item label="资产期数" prop="assetsPeriods" v-if="ruleStatus.assetsPeriods">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.assetsPeriods">
                        <template slot="append">月</template>
                    </el-input>
                </el-form-item>
                <!-- 如果是小微 -->

                <el-form-item label="资产年化利率" prop="annualRate">
                    <el-input placeholder="请输入内容" v-model="ruleForm.annualRate">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="前端服务费率" v-show="false">
                    <el-input placeholder="请输入内容" v-model="ruleForm.serviceRate">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="风险等级" prop="assetsRiskLevel">
                    <el-select :disabled="ruleStatus.levelAndQuota" placeholder="请选择风险等级" v-model="ruleForm.assetsRiskLevel">
                        <el-option v-for="item in assetsRiskLevelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="风险限额" prop="assetsRiskQuota">
                    <el-input type="number" :disabled="ruleStatus.levelAndQuota" placeholder="请输入内容" v-model="ruleForm.assetsRiskQuota">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="资产模式" prop="model">
					<el-radio-group v-model="ruleForm.model">
						<!-- <el-radio label="TRANSFER"  border size="medium">债转</el-radio> -->
						<el-radio label="DIRECT" disabled border size="medium">直投</el-radio>
						<el-radio label="COLLECT" disabled border size="medium">受托支付</el-radio>
					</el-radio-group>
				</el-form-item>
               
                 <el-form-item label="所属渠道" prop="channelId">
                    <el-select placeholder="请选择所属渠道" v-model="ruleForm.channelId" @change="channelIdChange()" ref="channelId">
                        <el-option v-for="item in channels" 
                                :key="item.id" 
                                :label="item.title" 
                                :value="item.id" :data-title="item.title"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款人主体性质" prop="borrowerMainCharacter" v-if="ruleStatus.borrowerMainCharacter">
					<el-radio-group v-model="ruleForm.borrowerMainCharacter" @change="borrowerMainChange">
						<el-radio label="natural"  border size="medium">自然人</el-radio>
						<el-radio label="legal" border size="medium">法人</el-radio>
						<el-radio label="other" border size="medium">其它组织</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="借款人工作性质" prop="borrowerWorkNature" v-if="ruleStatus.borrowerWorkNature">
                    <el-select placeholder="请选择借款人工作性质" v-model="ruleForm.borrowerWorkNature">
                        <el-option v-for="item in borrowerWorkNatureList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款人所属行业" prop="borrowerIndustry">
                    <el-select placeholder="请选择借借款人所属行业" v-model="ruleForm.borrowerIndustry">
                        <el-option v-for="item in borrowerIndustryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="月均收入" prop="disposableIncome">
                    <el-select placeholder="请选择月均收入" v-model="ruleForm.disposableIncome">
                        <el-option v-for="item in disposableIncomeList[ruleForm.bizPersonnelType]" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="负债情况" prop="liabilitiesCondition">
                    <el-input type="textarea" v-model="ruleForm.liabilitiesCondition"></el-input>
                </el-form-item>

                <el-form-item label="其他P2P平台借款" prop="otherPlatformBorrow">
                    <el-input type="textarea" v-model="ruleForm.otherPlatformBorrow"></el-input>
                </el-form-item>

                <el-form-item label="征信情况" prop="creditCondition">
                    <el-input type="textarea" v-model="ruleForm.creditCondition"></el-input>
                </el-form-item>

                <el-form-item label="平台逾期次数" prop="platformOverdueTimes">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.platformOverdueTimes">
                        <template slot="append">次</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="平台逾期总金额" prop="platformOverdueAmount">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.platformOverdueAmount">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="资产描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>

                <el-form-item label="资产亮点" prop="strength" v-if="ruleStatus.strength">
                    <el-input type="textarea" v-model="ruleForm.strength"></el-input>
                </el-form-item>

                <el-form-item label="借款用途" prop="loanPurpose">
                    <el-input type="textarea" v-model="ruleForm.loanPurpose"></el-input>
                </el-form-item>

                <el-form-item label="还款来源" prop="repaymentSource">
                    <el-input type="textarea" v-model="ruleForm.repaymentSource"></el-input>
                </el-form-item>

                <el-form-item label="还款保障" prop="repayGuarantee">
                    <el-input type="textarea" v-model="ruleForm.repayGuarantee"></el-input>
                </el-form-item>

                 <!-- 如果是小微 -->
                <el-form-item label="风控措施" prop="riskManageStep" v-if="ruleStatus.riskManageStep">
                    <el-input type="textarea" v-model="ruleForm.riskManageStep"></el-input>
                </el-form-item>
                 <!-- 如果是小微 -->

                <el-form-item label="项目风险提醒" prop="riskAlert">
                    <el-input type="textarea" v-model="ruleForm.riskAlert"></el-input>
                </el-form-item>

                <el-form-item label="增信措施" prop="addTrustMeasures">
                    <el-input type="textarea" v-model="ruleForm.addTrustMeasures"></el-input>
                </el-form-item>

                <el-form-item label="已验收资料" prop="accepteData" v-if="ruleStatus.accepteDataType">
                    <el-checkbox-group v-model="ruleForm.accepteData">
                        <el-checkbox label="15" name="accepteData" value="15">身份证</el-checkbox>
                        <el-checkbox label="16" name="accepteData" value="16">户口本</el-checkbox>
                        <el-checkbox label="17" name="accepteData" value="17">婚姻状况证明</el-checkbox>
                        <el-checkbox label="18" name="accepteData" value="18">征信报告</el-checkbox>
                        <br>
                         <el-checkbox label="19" name="accepteData" value="19">银行流水</el-checkbox>
                        <el-checkbox label="20" name="accepteData" value="20">反担保特权属证明</el-checkbox>
                        <el-checkbox label="21" name="accepteData" value="21">个人收入证明</el-checkbox>
                        <el-checkbox label="22" name="accepteData" value="22">被执行人情况查询</el-checkbox>
                        <br>
                         <el-checkbox label="23" name="accepteData" value="23">担保措施登手续</el-checkbox>
                        <el-checkbox label="24" name="accepteData" value="24">合作机构代偿</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="已验收资料" prop="accepteData" v-if="!ruleStatus.accepteDataType">
                    <el-checkbox-group v-model="ruleForm.accepteData">
                        <el-checkbox label="1" name="accepteData" value="1">法人及实际控制人征信报告</el-checkbox>
                        <el-checkbox label="2" name="accepteData" value="2">法人及实际控制人身份证</el-checkbox>
                        <el-checkbox label="3" name="accepteData" value="3">企业营业执照</el-checkbox>
                        <el-checkbox label="4" name="accepteData" value="4">企业征信报告</el-checkbox>
                        <br />
                         <el-checkbox label="5" name="accepteData" value="5">反担保股东会决议</el-checkbox>
                        <el-checkbox label="6" name="accepteData" value="6">被执行情况查询</el-checkbox>
                        <el-checkbox label="7" name="accepteData" value="7">上年度财务报表</el-checkbox>
                        <el-checkbox label="8" name="accepteData" value="8">近三个月财务报表</el-checkbox>
                        <br />
                        <el-checkbox label="9" name="accepteData" value="9">主结算账户近6个月流水</el-checkbox>
                        <el-checkbox label="10" name="accepteData" value="10">贸易合同及交易发票</el-checkbox>
                        <el-checkbox label="11" name="accepteData" value="11">物流单据/出入库单</el-checkbox>
                        <el-checkbox label="12" name="accepteData" value="12">实地走访</el-checkbox>
                        <br />
                         <el-checkbox label="13" name="accepteData" value="13">商票背书转让</el-checkbox>
                        <el-checkbox label="14" name="accepteData" value="14">中登网债权登记</el-checkbox>
                        <el-checkbox label="23" name="accepteData" value="23">担保措施登记手续</el-checkbox>
                        <el-checkbox label="24" name="accepteData" value="24">物流单据/合作机构代偿</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
           
        </div>
    </div>
</template>
<script src="./AssetsEdit.js"></script>
<style lang="less" scoped>
.Newform {
  margin-left: 10%;
}
/deep/.el-input {
  width: 400px !important;
}
/deep/.el-textarea {
  width: 400px !important;
}
.text {
  font-size: 14px;
}
.el-card__body {
  padding: 10px 20px 20px 20px;
}

.item {
  // margin-bottom: 18px;
  margin-left: 5px;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  height: 40px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 380px;
  position: fixed;
  right: 2%;
  top: 10%;
  float: right;
}
</style>
