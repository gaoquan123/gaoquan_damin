<template>
    <div class="newsubject">
        <h1 class="front-22 m-t-30 color">编辑资产</h1>
        <div class="Newform m-t-50">
            <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="150px">
                <el-form-item label="资产所属人" prop="assetsUser">
                    <el-input disabled v-model="ruleForm.assetsUser"></el-input>
                </el-form-item>

                <el-form-item label="资产类型" prop="bizPersonnelType">
					<el-radio-group v-model="ruleForm.bizPersonnelType">
						<el-radio disabled label="BIZ"  border size="medium">供应链</el-radio>
						<el-radio disabled label="PERSONNEL" border size="medium">小微</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="资产名称" prop="assetsName">
                    <el-input v-model="ruleForm.assetsName"></el-input>
                </el-form-item>

                <el-form-item label="资产规模" prop="assetsScale">
                    <el-input type="number" placeholder="请输入内容" v-model="ruleForm.assetsScale">
                        <template slot="append">元</template>
                    </el-input>
                    <el-button type="primary" @click="findUserAssetLimit">资产剩余额度查询</el-button>
                </el-form-item>

                <el-form-item label="还款方式" prop="instalmentPolicy">
                    <el-select placeholder="请选择还款方式" v-model="ruleForm.instalmentPolicy" @change="instalmentPolicyChange">
                        <el-option label="到期一次性还本付息" value="ONCE_PRINCIPAL_AND_INTEREST"></el-option>
                        <el-option label="等额本息" value="MATCHING_PRINCIPAL_AND_INTEREST"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资产所属公司" prop="assetsOfCompany">
                    <el-select placeholder="请选择资产所属公司" v-model="ruleForm.assetsOfCompany">
                        <el-option v-for="item in assetsOfCompanyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资产期限" prop="assetsIntervalType">
					<el-radio-group v-model="ruleForm.assetsIntervalType" @change="assetsIntervalChange">
						<el-radio :disabled="ruleStatus.assetsIntervalDisabled" label="DATE"  border size="medium">固定日期</el-radio>
						<el-radio :disabled="ruleStatus.assetsIntervalDisabled" label="DAYS" border size="medium">固定期限</el-radio>
                        <!-- 如果是供应链 -->
						<el-radio :disabled="ruleStatus.assetsIntervalDisabled" v-if="ruleStatus.assetsIntervalType" label="FPN" border size="medium">固定期数</el-radio>
					</el-radio-group>
				</el-form-item>

                <!-- 如果是供应链 -->
                <el-form-item label="资产起始日" prop="assetsStart" v-if="ruleStatus.assetsStart">
                        <el-date-picker
                         v-model="ruleForm.assetsStart"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="资产到期日" prop="assetsEnd" v-if="ruleStatus.assetsEnd">
                        <el-date-picker
                         v-model="ruleForm.assetsEnd"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="资产期限" prop="assetsInterval" v-if="ruleStatus.assetsInterval">
                    <el-input  placeholder="请输入内容" :disabled="ruleStatus.assetsInterDisabled" v-model="ruleForm.assetsInterval">
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

                <el-form-item label="资产年华利率" prop="assetsRate">
                    <el-input placeholder="请输入内容" v-model="ruleForm.assetsRate">
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

                <el-form-item label="资产模式" prop="assetsModel">
					<el-radio-group v-model="ruleForm.assetsModel">
						<!-- <el-radio label="TRANSFER"  border size="medium">债转</el-radio> -->
						<el-radio label="DIRECT" disabled border size="medium">直投</el-radio>
						<el-radio label="COLLECT" disabled border size="medium">受托支付</el-radio>
					</el-radio-group>
				</el-form-item>
                <div v-show="false">
                     <!--债转类型代收设置-->
                    <el-form-item label="受托支付账户">
                        <el-select placeholder="请选择受托支付账户" v-model="ruleForm.collectorName">
                            <el-option></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账户类型">
                        <el-select placeholder="请选择账户类型" v-model="ruleForm.collectorAccountType">
                            <el-option label="出借理财账户" value="0"></el-option>
                            <el-option label="借款账户" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="受托支付比例">
                        <el-input placeholder="请输入受托支付比例" v-model="ruleForm.collectRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <!-- 实际借款人 begin --> 
                    <el-form-item label="实际借款人类型">
                        <el-radio-group v-model="ruleForm.borrowerType">
                            <el-radio disabled label="ENTERPRISE"  border size="medium">企业</el-radio>
                            <el-radio disabled label="PERSONNEL" border size="medium">个人</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="实际借款人名称">
                        <el-input placeholder="请输入实际借款人名称" v-model="ruleForm.borrowerName"></el-input>
                    </el-form-item>

                    <!-- 实际借款人-企业 begin   -->    
                    <el-form-item label="成立时间">
                            <el-date-picker
                            v-model="ruleForm.borrowerFoundTime"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="法定代表人">
                        <el-input placeholder="请输入法定代表人" v-model="ruleForm.borrowerLegalPersonName"></el-input>
                    </el-form-item>
                    <el-form-item label="注册规模（万元）">
                        <el-input placeholder="请输入注册规模（万元）" v-model="ruleForm.borrowerRegistAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="注册地址">
                        <el-input placeholder="请输入注册地址" v-model="ruleForm.borrowerRegistAddress"></el-input>
                    </el-form-item>
                    <!-- 实际借款人-企业 end   -->
                    <!-- 实际借款人-个人 begin   -->
                    <el-form-item label="证件号码">
                        <el-input placeholder="请输入证件号码" v-model="ruleForm.borrowerIdNum"></el-input>
                    </el-form-item>
                    <!-- 实际借款人-个人 end   -->
                    <!-- 实际借款人 end --> 
                </div>

                <el-form-item label="所属渠道" prop="assetsChannel">
                    <el-select placeholder="请选择所属渠道" v-model="ruleForm.assetsChannel" @change="assetsChannelChange">
                        <el-option v-for="item in channels" 
                                :key="item.id" 
                                :label="item.title" 
                                :value="item.id"></el-option>
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
                        <el-option v-for="item in disposableIncomeList[ruleForm.assetsType]" :key="item.value" :label="item.label" :value="item.value"></el-option>
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

                <el-form-item label="资产描述" prop="assetsDescription">
                    <el-input type="textarea" v-model="ruleForm.assetsDescription"></el-input>
                </el-form-item>

                <el-form-item label="资产亮点" prop="assetsHighlight" v-if="ruleStatus.assetsHighlight">
                    <el-input type="textarea" v-model="ruleForm.assetsHighlight"></el-input>
                </el-form-item>

                <el-form-item label="借款用途" prop="loanUsage">
                    <el-input type="textarea" v-model="ruleForm.loanUsage"></el-input>
                </el-form-item>

                <el-form-item label="还款来源" prop="repaymentSource">
                    <el-input type="textarea" v-model="ruleForm.repaymentSource"></el-input>
                </el-form-item>

                <el-form-item label="还款保障" prop="paySafeguard">
                    <el-input type="textarea" v-model="ruleForm.paySafeguard"></el-input>
                </el-form-item>

                 <!-- 如果是小微 -->
                <el-form-item label="风控措施" prop="riskControl" v-if="ruleStatus.riskControl">
                    <el-input type="textarea" v-model="ruleForm.riskControl"></el-input>
                </el-form-item>
                 <!-- 如果是小微 -->

                <el-form-item label="项目风险提醒" prop="riskAlert">
                    <el-input type="textarea" v-model="ruleForm.riskAlert"></el-input>
                </el-form-item>

                <el-form-item label="增信措施" prop="addTrustMeasures">
                    <el-input type="textarea" v-model="ruleForm.addTrustMeasures"></el-input>
                </el-form-item>

                <el-form-item label="已验收资料" prop="accepteData_personnel" v-if="ruleStatus.accepteDataType">
                    <el-checkbox-group v-model="ruleForm.accepteData">
                        <el-checkbox label="15" name="accepteData_personnel" value="15">身份证</el-checkbox>
                        <el-checkbox label="16" name="accepteData_personnel" value="16">户口本</el-checkbox>
                        <el-checkbox label="17" name="accepteData_personnel" value="17">婚姻状况证明</el-checkbox>
                        <el-checkbox label="18" name="accepteData_personnel" value="18">征信报告</el-checkbox>
                        <br>
                         <el-checkbox label="19" name="accepteData_personnel" value="19">银行流水</el-checkbox>
                        <el-checkbox label="20" name="accepteData_personnel" value="20">反担保特权属证明</el-checkbox>
                        <el-checkbox label="21" name="accepteData_personnel" value="21">个人收入证明</el-checkbox>
                        <el-checkbox label="22" name="accepteData_personnel" value="22">被执行人情况查询</el-checkbox>
                        <br>
                         <el-checkbox label="23" name="accepteData_personnel" value="23">担保措施登手续</el-checkbox>
                        <el-checkbox label="24" name="accepteData_personnel" value="24">合作机构代偿</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="已验收资料" prop="accepteData_enterprise" v-if="!ruleStatus.accepteDataType">
                    <el-checkbox-group v-model="ruleForm.accepteData">
                        <el-checkbox label="1" name="accepteData_enterprise" value="1">法人及实际控制人征信报告</el-checkbox>
                        <el-checkbox label="2" name="accepteData_enterprise" value="2">法人及实际控制人身份证</el-checkbox>
                        <el-checkbox label="3" name="accepteData_enterprise" value="3">企业营业执照</el-checkbox>
                        <el-checkbox label="4" name="accepteData_enterprise" value="4">企业征信报告</el-checkbox>
                        <br />
                         <el-checkbox label="5" name="accepteData_enterprise" value="5">反担保股东会决议</el-checkbox>
                        <el-checkbox label="6" name="accepteData_enterprise" value="6">被执行情况查询</el-checkbox>
                        <el-checkbox label="7" name="accepteData_enterprise" value="7">上年度财务报表</el-checkbox>
                        <el-checkbox label="8" name="accepteData_enterprise" value="8">近三个月财务报表</el-checkbox>
                        <br />
                        <el-checkbox label="9" name="accepteData_enterprise" value="9">主结算账户近6个月流水</el-checkbox>
                        <el-checkbox label="10" name="accepteData_enterprise" value="10">贸易合同及交易发票</el-checkbox>
                        <el-checkbox label="11" name="accepteData_enterprise" value="11">物流单据/出入库单</el-checkbox>
                        <el-checkbox label="12" name="accepteData_enterprise" value="12">实地走访</el-checkbox>
                        <br />
                         <el-checkbox label="13" name="accepteData_enterprise" value="13">商票背书转让</el-checkbox>
                        <el-checkbox label="14" name="accepteData_enterprise" value="14">中登网债权登记</el-checkbox>
                        <el-checkbox label="23" name="accepteData_enterprise" value="23">担保措施登记手续</el-checkbox>
                        <el-checkbox label="24" name="accepteData_enterprise" value="24">物流单据/合作机构代偿</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                    <el-button>取消</el-button>
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
