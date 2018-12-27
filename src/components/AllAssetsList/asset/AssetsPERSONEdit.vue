<template>
    <div class="newsubject">
        <h1 class="front-22 m-t-30 color">编辑资产</h1>
        <div class="Newform m-t-50">
            <el-form ref="ruleForm" :model="ruleForm" label-width="150px">
                <el-form-item label="资产所属人">
                    <el-input disabled v-model="ruleForm.assetsUser"></el-input>
                </el-form-item>

                <el-form-item label="资产类型">
					<el-radio-group v-model="ruleForm.assetsType">
						<el-radio disabled label="BIZ"  border size="medium">供应链</el-radio>
						<el-radio disabled label="PERSONNEL" border size="medium">小微</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="资产名称" prop="required">
                    <el-input v-model="ruleForm.assetsName"></el-input>
                </el-form-item>

                <el-form-item label="资产规模" prop="required">
                    <el-input type="number" placeholder="请输入内容" v-model="ruleForm.assetsScale">
                        <template slot="append">元</template>
                    </el-input>
                    <el-button type="primary" @click="findUserAssetLimit">资产剩余额度查询</el-button>
                </el-form-item>

                <el-form-item label="还款方式" prop="region">
                    <el-select placeholder="请选择还款方式" v-model="ruleForm.instalmentPolicy">
                        <el-option label="到期一次性还本付息" value="ONCE_PRINCIPAL_AND_INTEREST"></el-option>
                        <el-option label="等额本息" value="MATCHING_PRINCIPAL_AND_INTEREST"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资产所属公司" prop="region">
                    <el-select placeholder="请选择资产所属公司" v-model="ruleForm.assetsOfCompany">
                        <el-option label="NULL" value="其他"></el-option>
                        <el-option label="众邦保理" value="众邦保理"></el-option>
                        <el-option label="众邦融资租赁" value="众邦融资租赁"></el-option>
                        <el-option label="杭州九鱼" value="杭州九鱼"></el-option>
                        <el-option label="卓尔金服" value="卓尔金服"></el-option>
                        <el-option label="汉口北担保" value="汉口北担保"></el-option>
                        <el-option label="业务一部" value="业务一部"></el-option>
                        <el-option label="业务二部" value="业务二部"></el-option>
                        <el-option label="业务三部" value="业务三部"></el-option>
                        <el-option label="供应链团队" value="供应链团队"></el-option>
                        <el-option label="嘉实金服" value="嘉实金服"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资产期限" >
					<el-radio-group v-model="ruleForm.assetsIntervalType">
						<el-radio disabled label="DATE"  border size="medium">固定日期</el-radio>
						<el-radio disabled label="DAYS" border size="medium">固定期限</el-radio>
                        <!-- 如果是供应链 -->
						<el-radio disabled v-if="ruleStatus.assetsIntervalType" label="FPN" border size="medium">固定期数</el-radio>
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

                <el-form-item label="资产期限" v-if="ruleStatus.assetsInterval">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.assetsInterval">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="宽限期" v-if="ruleStatus.assetsAbleOverDays">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.assetsAbleOverDays">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>
                <!-- 如果是供应链 -->


                <!-- 如果是小微 -->
                <el-form-item label="资产期数" v-if="ruleStatus.assetsPeriods">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.assetsPeriods">
                        <template slot="append">月</template>
                    </el-input>
                </el-form-item>
                <!-- 如果是小微 -->

                <el-form-item label="资产年华利率">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.assetsRate">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="风险等级" prop="region">
                    <el-select :disabled="ruleStatus.levelAndQuota" placeholder="请选择风险等级" v-model="ruleForm.assetsRiskLevel">
                        <el-option label="高风险" value="1"></el-option>
                        <el-option label="较高风险" value="2"></el-option>
                        <el-option label="中等风险" value="3"></el-option>
                        <el-option label="低级风险" value="4"></el-option>
                        <el-option label="极低风险" value="5"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="风险限额">
                    <el-input :disabled="ruleStatus.levelAndQuota" placeholder="请输入内容" v-model="ruleForm.assetsRiskQuota">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="资产模式">
					<el-radio-group v-model="ruleForm.assetsModel">
						<!-- <el-radio label="TRANSFER"  border size="medium">债转</el-radio> -->
						<el-radio label="DIRECT"  border size="medium">直投</el-radio>
						<el-radio label="COLLECT" border size="medium">受托支付</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="所属渠道" prop="region">
                    <el-select placeholder="请选择所属渠道" v-model="ruleForm.assetsChannel">
                        <el-option v-for="item in channels" 
                                :key="item.id" 
                                :label="item.title" 
                                :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款人主体性质" v-if="ruleStatus.borrowerMainCharacter">
					<el-radio-group v-model="ruleForm.borrowerMainCharacter">
						<el-radio label="natural"  border size="medium">自然人</el-radio>
						<el-radio label="legal" border size="medium">法人</el-radio>
						<el-radio label="other" border size="medium">其它组织</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="借款人工作性质" prop="region">
                    <el-select placeholder="请选择借款人工作性质" v-model="ruleForm.borrowerWorkNature">
                        <el-option label="公司白领" value="1"></el-option>
                        <el-option label="商人" value="2"></el-option>
                        <el-option label="工人" value="3"></el-option>
                        <el-option label="农民" value="4"></el-option>
                        <el-option label="学生" value="5"></el-option>
                        <el-option label="自由职业" value="6"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款人所属行业" prop="region">
                    <el-select placeholder="请选择借借款人所属行业" v-model="ruleForm.borrowerIndustry">
                        <el-option label="农、林、牧、渔业" value="A"></el-option>
                        <el-option label="采矿业" value="B"></el-option>
                        <el-option label="制造业" value="C"></el-option>
                        <el-option label="电力、热力、燃气及水生产和供应业" value="D"></el-option>
                        <el-option label="建筑业" value="E"></el-option>
                        <el-option label="批发和零售业" value="F"></el-option>
                        <el-option label="交通运输、仓储和邮政业" value="G"></el-option>
                        <el-option label="住宿和餐饮业" value="H"></el-option>
                        <el-option label="信息传输、软件和信息技术服务业" value="I"></el-option>
                        <el-option label="金融业" value="J"></el-option>
                        <el-option label="房地产业" value="K"></el-option>
                        <el-option label="租赁和商务服务业" value="L"></el-option>
                        <el-option label="科学研究和技术服务业" value="M"></el-option>
                        <el-option label="水利、环境和公共设施管理业" value="N"></el-option>
                        <el-option label="居民服务、修理和其他服务业" value="O"></el-option>
                        <el-option label="教育" value="P"></el-option>
                        <el-option label="卫生和社会工作" value="Q"></el-option>
                        <el-option label="文化、体育和娱乐业" value="R"></el-option>
                        <el-option label="公共管理、社会保障和社会组织" value="S"></el-option>
                        <el-option label="国际组织" value="T"></el-option>
                        <el-option label="其他" value="U"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="月均收入">
                    <el-select placeholder="请选择月均收入" v-model="ruleForm.disposableIncome" v-if="ruleStatus.disposableIncome">
                        <el-option label="2000元以下" value="1"></el-option>
                        <el-option label="2001-5000" value="2"></el-option>
                        <el-option label="5001-10000" value="3"></el-option>
                        <el-option label="10001-20000" value="4"></el-option>
                        <el-option label="20001-50000" value="11"></el-option>
                        <el-option label="50001-100000" value="12"></el-option>
                        <el-option label="100000以上" value="13"></el-option>
                    </el-select>
                    <el-select placeholder="请选择月均收入" v-model="ruleForm.disposableIncome" v-else>
                        <el-option label="5万以下" value="6"></el-option>
                        <el-option label="5万-20万" value="7"></el-option>
                        <el-option label="20万-50万" value="8"></el-option>
                        <el-option label="50-100万" value="9"></el-option>
                        <el-option label="100万以上" value="10"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="负债情况">
                    <el-input type="textarea" v-model="ruleForm.liabilitiesCondition"></el-input>
                </el-form-item>

                <el-form-item label="其他P2P平台借款" prop="required">
                    <el-input type="textarea" v-model="ruleForm.otherPlatformBorrow"></el-input>
                </el-form-item>

                <el-form-item label="征信情况" prop="required">
                    <el-input type="textarea" v-model="ruleForm.creditCondition"></el-input>
                </el-form-item>

                <el-form-item label="平台逾期次数" prop="required">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.platformOverdueTimes">
                        <template slot="append">次</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="平台逾期总金额" prop="required">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.platformOverdueAmount">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="资产描述">
                    <el-input type="textarea" v-model="ruleForm.assetsDescription"></el-input>
                </el-form-item>

                <el-form-item label="借款用途" prop="required">
                    <el-input type="textarea" v-model="ruleForm.loanUsage"></el-input>
                </el-form-item>

                <el-form-item label="还款来源" prop="required">
                    <el-input type="textarea" v-model="ruleForm.repaymentSource"></el-input>
                </el-form-item>

                <el-form-item label="还款保障" prop="required">
                    <el-input type="textarea" v-model="ruleForm.paySafeguard"></el-input>
                </el-form-item>

                 <!-- 如果是小微 -->
                <el-form-item label="风控措施" prop="required">
                    <el-input type="textarea" v-model="ruleForm.riskControl"></el-input>
                </el-form-item>
                 <!-- 如果是小微 -->

                <el-form-item label="项目风险提醒" prop="required">
                    <el-input type="textarea" v-model="ruleForm.riskAlert"></el-input>
                </el-form-item>

                <el-form-item label="增信措施" prop="required">
                    <el-input type="textarea" v-model="ruleForm.addTrustMeasures"></el-input>
                </el-form-item>

                <el-form-item label="已验收资料" prop="accepteData_personnel">
                    <el-checkbox-group v-model="ruleForm.accepteData_personnel">
                        <el-checkbox label="身份证" name="accepteData_personnel" value="15"></el-checkbox>
                        <el-checkbox label="户口本" name="accepteData_personnel" value="16"></el-checkbox>
                        <el-checkbox label="婚姻状况证明" name="accepteData_personnel" value="17"></el-checkbox>
                        <el-checkbox label="征信报告" name="accepteData_personnel" value="18"></el-checkbox>
                        <br>
                         <el-checkbox label="银行流水" name="accepteData_personnel" value="19"></el-checkbox>
                        <el-checkbox label="反担保特权属证明" name="accepteData_personnel" value="20"></el-checkbox>
                        <el-checkbox label="个人收入证明" name="accepteData_personnel" value="21"></el-checkbox>
                        <el-checkbox label="被执行人情况查询" name="accepteData_personnel" value="22"></el-checkbox>
                        <br>
                         <el-checkbox label="担保措施登手续" name="accepteData_personnel" value="23"></el-checkbox>
                        <el-checkbox label="合作机构代偿" name="accepteData_personnel" value="24"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="已验收资料" prop="accepteData_enterprise">
                    <el-checkbox-group v-model="ruleForm.accepteData_enterprise">
                        <el-checkbox label="法人及实际控制人征信报告" name="accepteData_enterprise" value="1"></el-checkbox>
                        <el-checkbox label="法人及实际控制人身份证" name="accepteData_enterprise" value="2"></el-checkbox>
                        <el-checkbox label="企业营业执照" name="accepteData_enterprise" value="3"></el-checkbox>
                        <el-checkbox label="企业征信报告" name="accepteData_enterprise" value="4"></el-checkbox>
                        <br />
                         <el-checkbox label="反担保股东会决议" name="accepteData_enterprise" value="5"></el-checkbox>
                        <el-checkbox label="被执行情况查询" name="accepteData_enterprise" value="6"></el-checkbox>
                        <el-checkbox label="上年度财务报表" name="accepteData_enterprise" value="7"></el-checkbox>
                        <el-checkbox label="近三个月财务报表" name="accepteData_enterprise" value="8"></el-checkbox>
                        <br />
                        <el-checkbox label="主结算账户近6个月流水" name="accepteData_enterprise" value="9"></el-checkbox>
                        <el-checkbox label="贸易合同及交易发票" name="accepteData_enterprise" value="10"></el-checkbox>
                        <el-checkbox label="物流单据/出入库单" name="accepteData_enterprise" value="11"></el-checkbox>
                        <el-checkbox label="实地走访" name="accepteData_enterprise" value="12"></el-checkbox>
                        <br />
                         <el-checkbox label="商票背书转让" name="accepteData_enterprise" value="13"></el-checkbox>
                        <el-checkbox label="中登网债权登记" name="accepteData_enterprise" value="14"></el-checkbox>
                        <el-checkbox label="担保措施登记手续" name="accepteData_enterprise" value="23"></el-checkbox>
                        <el-checkbox label="物流单据/合作机构代偿" name="accepteData_enterprise" value="24"></el-checkbox>
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
<script>
export default {
    data() {
        return {
            userInfo: {},
            enterpriseUesrInfo: {},
            assetId: this.$route.query.assetId,
            userId: this.$route.query.userId,
            channels: [],
            // from默认数据
            ruleForm: {
                userId: null, // 资产所属人ID
                assetsUser: '', // 资产所属人
                assetsType: '', // 资产类型
                assetsName: '', // 资产名称
                assetsScale: '', // 资产规模
                instalmentPolicy: '', // 还款方式
                assetsOfCompany: '', // 所属公司
                assetsIntervalType: '', // 资产期限
                assetsStart: '', // 资产起始日
                assetsEnd: '', // 资产到期日
                assetsInterval: '', //  资产期限
                assetsAbleOverDays: '', // 宽限期
                assetsPeriods: '', // 资产基数
                assetsRate: '', // 资产年华利率
                assetsRiskLevel: '', // 风险等级
                assetsRiskQuota: '', // 风险限额
                assetsModel: '', // 资产模式
                assetsChannel: '', // 所属渠道
                borrowerMainCharacter: '', // 借款人主体性质
                borrowerWorkNature: '', // 借款人工作性质
                borrowerIndustry: '', // 借款人所属行业
                disposableIncome: '', // 月均收入
                liabilitiesCondition: '', // 负债情况
                otherPlatformBorrow: '', // 其他P2P平台借款
                creditCondition: '', // 征信情况
                platformOverdueTimes: '', // 平台逾期次数
                platformOverdueAmount: '', // 平台逾期总金额
                assetsDescription: '', // 资产描述
                loanUsage: '',  // 借款用途
                repaymentSource: '', // 还款来源
                paySafeguard: '', // 还款保障
                riskControl: '', // 风控措施
                riskAlert: '', // 项目风险提醒
                addTrustMeasures: '', // 增信措施
                accepteData_personnel: [], // 已验收资料
                accepteData_enterprise: [] // 已验收资料
            },
            ruleStatus: {
                assetsIntervalType: false, // 固定基数
                assetsAbleOverDays: false, // 宽限期
                assetsStart: true,
                assetsEnd: true,
                assetsInterval: true,
                assetsPeriods: true, // 资产期数
                levelAndQuota: false,
                borrowerMainCharacter: true,
                disposableIncome: true,
            },
            rules: {
                assetsStart: [
                    { type: 'date', required: true, message: '请选择资产起始日', trigger: 'blur' }
                ],
                assetsEnd: [
                    { type: 'date', required: true, message: '请选择资产到期日', trigger: 'blur' }
                ],
                required: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
                accepteData_personnel: [
                    { type: 'array', required: true, message: '请至少选择一个验收资料', trigger: 'change' }
                ],
                accepteData_enterprise: [
                    { type: 'array', required: true, message: '请至少选择一个验收资料', trigger: 'change' }
                ]
            }
        };
    },
     methods: {
        init() {
            this.$axios.get('/api/loanAssets/'+ this.$route.query.assetId).then((result) => {
                console.log(result)
                console.log(this.ruleForm)
                let data = result.data
                this.ruleForm.userId = data.userId
                this.ruleForm.assetsUser = data.userName
                this.ruleForm.assetsType = data.bizPersonnelType
                this.ruleForm.assetsName = data.title
                this.ruleForm.assetsScale = data.totalAmount.amount
                if(data.timeLimitType == "FPN") {
                    this.ruleStatus.assetsIntervalType = true // 显示固定基数
                    this.ruleStatus.assetsStart = false
                    this.ruleStatus.assetsEnd = false
                    this.ruleStatus.assetsInterval = false
                    this.ruleForm.instalmentPolicy = 'MATCHING_PRINCIPAL_AND_INTEREST'
                    this.ruleForm.assetsPeriods = this.limitDays
                } else {
                    this.ruleForm.instalmentPolicy = 'ONCE_PRINCIPAL_AND_INTEREST'
                    this.ruleForm.assetsInterval = data.limitDays
                    this.ruleStatus.assetsPeriods = false
                }

                if(!data.assetsOfCompany){
                    this.ruleForm.assetsOfCompany = 'NULL'
                } else {
                    this.ruleForm.assetsOfCompany = data.assetsOfCompany
                }
                
                this.ruleForm.assetsIntervalType = data.timeLimitType
                 // 资产期限
                if (data.timeLimitType == "DATE") {
                    this.ruleForm.assetsStart = data.startTime
                    this.ruleForm.assetsEnd = data.endTime
                }

                if(data.payMay === 'ONCE_PRINCIPAL_AND_INTEREST') {
                    this.ruleStatus.assetsAbleOverDays = true
                    this.ruleForm.assetsAbleOverDays = data.assetsAbleOverDays
                }

                this.ruleForm.assetsRate = this.accMul(data.annualRate, 100)

                if(!data.hasSubjectInLoanAsset) {
                    this.ruleStatus.levelAndQuota = true
                }
                this.ruleForm.assetsRiskLevel = data.assetsRiskLevel.toString()
                this.ruleForm.assetsRiskQuota = data.assetsRiskQuota
                this.ruleForm.assetsModel = data.model
                // this.ruleForm.assetsChannel = data.channelId
                this.getChannel(data.channelId, data.bizPersonnelType)
                this.ruleForm.borrowerMainCharacter = data.borrowerMainCharacter
                
                if(data.borrowerMainCharacter == 'natural' || data.borrowerMainCharacter == null) {
                    this.ruleForm.borrowerWorkNature = data.borrowerMainCharacter
                    this.ruleStatus.disposableIncome = true
                } else {
                    this.ruleStatus.borrowerWorkNature = false
                    this.ruleStatus.disposableIncome = false
                }

                this.ruleForm.borrowerIndustry = data.borrowerIndustry
                this.ruleForm.disposableIncome = data.disposableIncome
                this.ruleForm.liabilitiesCondition = data.liabilitiesCondition
                this.ruleForm.otherPlatformBorrow = data.otherPlatformBorrow
                this.ruleForm.creditCondition = data.creditCondition
                this.ruleForm.platformOverdueTimes = data.platformOverdueTimes
                this.ruleForm.platformOverdueAmount = data.platformOverdueAmount
                
                if(data.description) {
                    this.ruleForm.assetsDescription = data.description
                }
                if(data.loanPurpose) {
                    this.ruleForm.loanUsage = data.loanPurpose
                }
                this.ruleForm.repaymentSource = data.repaymentSource
                if(data.repayGuarantee) {
                    this.ruleForm.paySafeguard = data.repayGuarantee
                }

                if(data.bizPersonnelType == 'BIZ') {
                    if(data.strength) {

                    }
                } else if(data.bizPersonnelType == 'PERSONNEL') {
                    if(data.riskManageStep) {
                        this.ruleForm.riskControl = data.riskManageStep
                    }
                }

                if(data.riskAlert) {
                    this.ruleForm.riskAlert = data.riskAlert
                }

                if(data.addTrustMeasures) {
                    this.ruleForm.addTrustMeasures = data.addTrustMeasures
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getChannel(channelId, type) {
            this.$axios.get('/api/loanChannels').then((result) => {
                let data = result.data
                if(data.length <= 0) {
                    return false
                }
                let resultArr = []
                for(let i = 0; i < data.length; i++) {
                    if(data[i].status == 0 && data[i].bizPersonnelType.indexOf(type) > -1) {
                        resultArr.push(data[i])
                    }
                }
                console.log(resultArr)
                this.channels = resultArr
                console.log(channelId)
                setTimeout(() => {
                    this.ruleForm.assetsChannel = channelId.toString()
                }, 20);
               
            })
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if(valid) {
                    console.log('submit')
                } else {
                    console.log('error submit !!')
                }
            })
        },
        reloadsUserInfo() {
            // 右边个人信息菜单显示
            this.$axios.get(`/admin/ums/users/${this.userId}`).then(res => {
                if ((res.data.type = "ENTERPRISE")) {
                this.enterpriseUesrInfo = res.data;
                } else {
                this.userInfo = res.data;
                }
            })
        },
        findUserAssetLimit() {
            this.$axios.post('/api/loanAssets/findUserAssetLimit', {
                userId: this.userId
            }).then(res => {
                this.$alert("用户当前存续中资产:" + res.data.remainderAmount +"元，剩余可增额度:"+ res.data.surplusAmout +"元。", '提示', {
                    confirmButtonText: '确定'
                })
            }).catch(xhr => {
                console.log(xhr)
            })
        },
        accMul(arg1,arg2) {
            let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try{ m += s1.split(".")[1].length }catch(e){}
            try{ m += s2.split(".")[1].length }catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
        }
    },
    created() {
        this.init()
    }
};
</script>
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
