<template>
    <div class="newsubject">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admins/subjects' }">标的管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建标的</el-breadcrumb-item>
        </el-breadcrumb>
        <h1 class="front-22 m-t-30 color">创建标的</h1>
        <div class="Newform m-t-50">

            <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="180px">
                <fieldset>
                    <legend>基本信息</legend>

                    <el-form-item label="标的项目名称" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>

                    <el-form-item label="标的项目类别" prop="type">
                        <el-select placeholder="请选择项目类别" v-model="ruleForm.type">
                            <el-option label="个人借款" value="JIASHI_V8">个人借款</el-option>
                            <el-option v-if="ruleStatus.typeStatus" label="新手标" value="JIASHI_V3">新手标</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="借款金额" prop="remaindAmount">
                        <el-input placeholder="请输入内容" v-model="ruleForm.remaindAmount">
                            <template slot="append">¥</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="分期方式" prop="payWay">
                        <el-select disabled placeholder="请选择分期方式" v-model="ruleForm.payWay">
                            <el-option label="到期还本付息" value="ONCE_PRINCIPAL_AND_INTEREST"></el-option>
                            <el-option label="等额本息" value="MATCHING_PRINCIPAL_AND_INTEREST"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="借款期数" v-if="ruleStatus.limitDays" prop="limitDays">
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.limitDays">
                            <template slot="append">个月</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="借款期限" prop="instalmentInterval">
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.instalmentInterval">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="标的基础利率" prop="annualRate">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.annualRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="标的加息利率" prop="addinterestRate">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.addinterestRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="标的总利率(年化利率)" prop="basicsRate">
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.basicsRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="服务费率" prop="commissionRate">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.commissionRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item v-show="false" label="资产代收利率">
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.collectorRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="借款起始日(预计)">
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.predicateValueDate">
                            <template slot="append">(预计)</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="借款到期日">
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.expiryDate"></el-input>
                    </el-form-item>

                    <el-form-item label="自动上架时间">
                            <el-date-picker
                            @change="autoAndPassDaysChange"
                            v-model="ruleForm.autoShelfAt"
                            type="datetime"
                            placeholder="手动上架不填">
                            </el-date-picker>
                    </el-form-item>

                    <el-form-item label="最低满标金额">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.portionAmount">
                            <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="活动方式">
                        <el-radio-group v-model="ruleForm.voucherTypeChoose">
                            <!-- <el-radio label="voucher" border>代金券</el-radio> -->
                            <el-radio label="coupon" border>返现券</el-radio>
                            <el-radio label="" border>无</el-radio>
                        </el-radio-group>
                        
                    </el-form-item>

                    <el-form-item label="促销方式">
                        <el-radio-group v-model="ruleForm.promotionStyle" @change="promotionStyleChange">
                            <el-radio label="seckill" border>秒杀</el-radio>
                            <el-radio label="raise" border>加息</el-radio>
                            <el-radio label="supply" border>特供</el-radio>
                            <el-radio label="limit" border>限量</el-radio>
                            <el-radio label="custom" border>自定义</el-radio>
                            <el-radio label="" border>无</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="自定义促销方式" v-if="ruleStatus.customPromotionExplain" prop="customPromotionExplain">
                        <el-input type="textarea" v-model="ruleForm.customPromotionExplain"  maxlength="2"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="促销方式说明">
                        <el-input type="textarea" v-model="ruleForm.promotionStyleExplain" maxlength="30"></el-input>
                    </el-form-item>

                    <el-form-item label="是否可转让">
                        <el-select @change="yesOrNo('transferAbility')" v-model="ruleForm.transferAbility" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <div v-if="ruleStatus.transferAbility">
                        <el-form-item label="可转让起始时间">
                            <el-input @keyup.native="transferableDaysKeyup('start')" type="number" placeholder="请输入内容" v-model="ruleForm.transferableStartDays">
                                <template slot="append">天</template>
                            </el-input>
                            <span>{{ ruleForm.transferableStartText }}</span>
                        </el-form-item>
                        <el-form-item label="可转让终止时间">
                            <el-input @keyup.native="transferableDaysKeyup('end')" type="number" placeholder="请输入内容" v-model="ruleForm.transferableEndDays">
                                <template slot="append">天</template>
                            </el-input>
                             <span>{{ ruleForm.transferableEndText }}</span>
                        </el-form-item>
                        <el-form-item label="转让说明">
                            <el-input type="textarea" placeholder="其他说明" v-model="ruleForm.transferDescription"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="是否有抵押">
                        <el-select @change="yesOrNo('mortgageAbility')" v-model="ruleForm.mortgageAbility" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="抵押说明" v-if="ruleStatus.mortgageAbility">
                        <el-input type="textarea" placeholder="其他说明" v-model="ruleForm.mortgageDescription"></el-input>
                    </el-form-item>

                    <el-form-item label="是否有担保">
                        <el-select @change="yesOrNo('guaranteeAbility')" v-model="ruleForm.guaranteeAbility" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="担保说明" v-if="ruleStatus.guaranteeAbility">
                        <el-input type="textarea" placeholder="其他说明" v-model="ruleForm.guaranteeDescription"></el-input>
                    </el-form-item>

                </fieldset>
                
                <fieldset>
                    <legend>出借规则</legend>

                     <el-form-item label="最小出借金额" prop="minimumInvestmentAmount">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.minimumInvestmentAmount">
                            <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="出借递增金额" prop="stepInvestmentAmount">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.stepInvestmentAmount">
                            <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="投资限额">
                        <el-select @change="limitAmountLsChange" v-model="ruleForm.limitAmountLs" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单标限投金额" v-if="ruleStatus.limitAmountLs">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.subjectLimitAmount">
                            <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>
                </fieldset>

                <fieldset>
                    <legend>标的介绍</legend>

                    <el-form-item label="添加标签">
                        <el-input  placeholder="添加标签" v-model="ruleForm.tagName"></el-input>
                    </el-form-item>

                    <el-form-item label="标签说明">
                        <el-input  placeholder="标签说明" v-model="ruleForm.tagDescription"></el-input>
                    </el-form-item>

                    <el-form-item label="借款用途">
                        <el-input type="textarea" placeholder="借款用途" v-model="ruleForm.usage"></el-input>
                    </el-form-item>

                    <el-form-item label="其他说明">
                        <el-input type="textarea" placeholder="其他说明" v-model="ruleForm.highlight"></el-input>
                    </el-form-item>

                    <el-form-item label="项目描述" prop="subjectDesc">
                        <el-input type="textarea" placeholder="项目描述" v-model="ruleForm.subjectDesc"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="还款保障" prop="repaymentEnsure">
                        <el-input type="textarea" placeholder="还款保障" v-model="ruleForm.repaymentEnsure"></el-input>
                    </el-form-item>

                    <el-form-item label="风险提醒" prop="riskAlert">
                        <el-input type="textarea" placeholder="风险提醒" v-model="ruleForm.riskAlert"></el-input>
                    </el-form-item>

                    <el-form-item label="风控措施" prop="riskMeasure">
                        <el-input type="textarea" placeholder="风控措施" v-model="ruleForm.riskMeasure"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人姓名" prop="debtorName">
                        <el-input type="textarea" placeholder="债务人姓名" v-model="ruleForm.debtorName"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人婚姻状况" prop="debtorMaritalStatus">
                        <el-input type="textarea" placeholder="债务人婚姻状况" v-model="ruleForm.debtorMaritalStatus"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="债务人性别" prop="debtorSex">
                        <el-input type="textarea" placeholder="债务人性别" v-model="ruleForm.debtorSex"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人年龄" prop="debtorAge">
                        <el-input type="textarea" placeholder="债务人年龄" v-model="ruleForm.debtorAge"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人所在城市" prop="debtorCity">
                        <el-input type="textarea" placeholder="债务人所在城市" v-model="ruleForm.debtorCity"></el-input>
                    </el-form-item>

                    <el-form-item label="房产位置">
                        <el-input type="textarea" placeholder="房产位置" v-model="ruleForm.housePropertyPosition"></el-input>
                    </el-form-item>

                    <el-form-item label="建筑面积">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.coveredArea">
                            <template slot="append">平米</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="规划用途">
                        <el-input type="textarea" placeholder="规划用途" v-model="ruleForm.planningPurposes"></el-input>
                    </el-form-item>

                    <el-form-item label="评估价值">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.evaluationValue">
                            <template slot="append">万元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="合同类型" prop="contractType">
                        <el-select placeholder="请选择合同类型" v-model="ruleForm.contractType">
                            <el-option label="债转合同" value="oldContract"></el-option>
                            <el-option label="个人借款合同" value="newContract"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="原始债权金额">
                        <el-input type="textarea" placeholder="原始债权金额" v-model="ruleForm.originalObligatoryRightAmount"></el-input>
                    </el-form-item>

                    <el-form-item label="原始债权起始日">
                        <el-input type="textarea" placeholder="原始债权起始日" v-model="ruleForm.originalObligatoryRightStartDate"></el-input>
                    </el-form-item>

                    <el-form-item label="原始债权到期日">
                        <el-input type="textarea" placeholder="原始债权到期日" v-model="ruleForm.originalObligatoryRightEndDate"></el-input>
                    </el-form-item>

                    <el-form-item label="债权增信措施">
                        <el-input type="textarea" placeholder="债权增信措施" v-model="ruleForm.addTrustMeasures"></el-input>
                    </el-form-item>
                </fieldset>

                <fieldset>
                    <legend>标的参数</legend>

                    <el-form-item label="募集期天数" prop="subjectPassDays">
                        <el-input type="number" placeholder="请输入内容" @change="autoAndPassDaysChange" v-model="ruleForm.subjectPassDays">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </fieldset>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">创建</el-button>
                </el-form-item>
            </el-form>
            <!-- 右边卡片个人借款用户信息 -->
            <el-card class="box-card"  v-if="userInfo.type  == 'PERSONAL_LOAN'">
                <div slot="header" class="clearfix">
                    <span class="color">个人借款用户信息</span>
                     <el-button style="float: right; padding: 3px 0" @click="displayBtn()" type="text">隐藏</el-button>
                </div>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">借款人姓名:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.certification.certifiedName}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">身份证号:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.certification.certifiedIdentity}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">性别:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.sex}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">年龄:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.age}}</div></el-col>
                </el-row>


                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">学历:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.qualification}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">婚姻情况:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.marriageStatus}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">房产情况:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.realEstateSituation}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">工作行业:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.workIndustry}}</div></el-col>
                </el-row>

                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">工作城市:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.workCity}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">工作年限:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.workYears}}</div></el-col>
                </el-row>
                <el-row class="text item row">
                    <el-col :span="12"><div class="grid-content bg-purple">年收入:</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">{{userInfo.annualIncome}}</div></el-col>
                </el-row>
            </el-card>
          
        </div>
    </div>
</template>
<script>
import { formatDate, formatDateAll, addDays, addNewDays } from 'PublicMethods/MethodsJs.js'
import { callbackify } from 'util';
export default {
    data() {
        return {
            userInfo:{},
            assetId:this.$route.query.assetId,
            userId:this.$route.query.userId,
            // from默认数据
            ruleForm: {
                title: '', // 标的项目名称
                type: 'JIASHI_V8', // 标的项目类别
                payWay: '', // 分期方式
                remaindAmount: '', // 借款金额
                limitDays: '', // 借款期数
                instalmentInterval: '', // 借款期限
                annualRate: 0, // 标的基础利率
                addinterestRate: 0, // 标的加息利率
                basicsRate: 0, // 标的总利率(年化利率)
                commissionRate: 0, // 服务费率
                subjectPassDays: 3, // 募集期天数
                voucherTypeChoose: '', //活动方式
                promotionStyle: '', //促销方式
                customPromotionExplain: '', // 自定义促销方式
                promotionStyleExplain: '', // 促销方式说明
                transferAbility: "0", //是否可转让
                transferableStartDays: '', //可转让起始时间
                transferableStartText: '--日起', 
                transferableEndDays: '', // 可转让终止时间
                transferableEndText: '--日起',
                transferDescription: '', // 转让说明
                mortgageAbility: "0", //是否有抵押
                mortgageDescription: '', // 抵押说明
                guaranteeAbility: "0", //是否有担保
                guaranteeDescription: '', //担保说明
                limitAmountLs: "0", //投资限额
                subjectLimitAmount: '0', //单标限投金额
                investmentLimitMoney: 10000, // 出借限额
                minimumInvestmentAmount: 100, // 最小出借金额
                stepInvestmentAmount: 100, // 出借递增金额
                predicateValueDate: '', // 借款起始日(预计)
                productDetailTitle: '', // 项目详情标题
                productDetail: '', // 项目详情
                riskEvaluate: '', // 风险评价
                expiryDate: '', // 借款到期日
                contractType: 'newContract', // 合同类型
                tagName: '', // 添加标签
                tagDescription: '', // 标签说明
                subjectDesc: '', //项目描述
                repaymentEnsure: '', // 还款保障还款保障
                riskAlert: '',  // 风险提醒
                riskMeasure: '', // 风控措施
                debtorName: '', // 债务人姓名
                debtorMaritalStatus: '', // 债务人婚姻状况
                debtorSex: '', // 债务人性别
                debtorAge: '', // 债务人年龄
                debtorCity: '', // 债务人所在城市
                steps: [ // 非等比增加
                    { 
                        invest: '', // 出借金额
                        voucher: ''  //可使用代金券金额
                    }
                ],
                steps1: { // 等比增加
                    investStep: '', // 出借金额
                    voucherStep: ''  //可使用代金券金额
                },

                useCoupon: '',
                loan_type: '',
                loanAssetRate: '',
                assertsAbleOverEndDate: ''
            },
            ruleStatus: {
                typeStatus: true, // 标的项目类别 新手标
                limitDays: true, // 借款期数
                customPromotionExplain: false, // 自定义促销方式
                voucherTypeChoose: false, //促销方式
                transferAbility: false, // 是否可转让
                mortgageAbility: false, // 是否有抵押
                guaranteeAbility: false, // 是否有担保
                voucherGeometric: '', // 使用代金券增加方式
                limitAmountLs: false, // 投资限额

            },
            rules: {
                title : [
                    { required: true, message: '标的项目名称不能为空', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择标的项目类别', trigger: 'change' }
                ],
                remaindAmount: [
                    { required: true, message: '金额不能为空', trigger: 'blur' },
                    { validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                payWay: [
                    { required: true, message: '请选择分期方式', trigger: 'change' }
                ],
                limitDays: [
                    { required: true, message: '借款期数不能为空', trigger: 'blur' },
                    { type: 'number', message: '输入有误', trigger: 'blur' }
                ],
                instalmentInterval: [
                    { required: true, message: '借款期限不能为空', trigger: 'blur' },
                    { type: 'number', min: 1, max: 9999, message: '输入有误', trigger: 'blur' }
                ],
                annualRate: [
                    { required: true, message: '标的基础利率不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                addinterestRate: [
                    { required: true, message: '标的加息利率不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                basicsRate: [
                    { required: true, message: '标的总利率不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                commissionRate: [
                    { required: true, message: '服务费率不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                customPromotionExplain: [
                    { required: true, message: '自定义促销方式不能为空', trigger: 'blur' }
                ],
                minimumInvestmentAmount: [
                    { required: true, message: '最小出借金额不能为空', trigger: 'blur' },
                    { validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                stepInvestmentAmount: [
                    { required: true, message: '出借递增金额不能为空', trigger: 'blur' },
                    { validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                subjectDesc: [
                    { required: true, message: '项目描述不能为空', trigger: 'blur' }
                ],
                repaymentEnsure: [
                    { required: true, message: '还款保障还款保障不能为空', trigger: 'blur' },
                    { max: 6000, message: '还款保障还款保障不能超过300个字符', trigger: 'blur' }
                ],
                riskAlert: [
                    { required: true, message: '风险提醒不能为空', trigger: 'blur' },
                    { max: 300, message: '风险提醒不能超过300个字符', trigger: 'blur' }
                ],
                riskMeasure: [
                    { required: true, message: '风控措施不能为空', trigger: 'blur' }
                ],
                debtorName: [
                    { required: true, message: '债务人姓名不能为空', trigger: 'blur' }
                ],
                debtorMaritalStatus: [
                    { required: true, message: '债务人婚姻状况不能为空', trigger: 'blur' }
                ],
                debtorSex: [
                    { required: true, message: '债务人性别不能为空', trigger: 'blur' }
                ],
                debtorAge: [
                    { required: true, message: '债务人年龄不能为空', trigger: 'blur' }
                ],
                debtorCity: [
                    { required: true, message: '债务人所在城市不能为空', trigger: 'blur' }
                ],
                contractType: [
                    { required: true, message: '请选择合同类型', trigger: 'change' }
                ],
                subjectPassDays: [
                    { required: true, message: '募集期天数不能为空', trigger: 'blur' }
                ]
            }
       }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if(!valid) {
                    return false
                }
                this.$axios({
                    url: '/admin/api/users/' + this.userId + '/subjects/create_personal_loan',
                    method: 'post',
                    data: JSON.stringify(this.initSubjectForm(this.ruleForm)),
                    headers: {
                        'Content-Type': 'application/json',
                        'csrf-token': Cookies.get('_csrf')
                    }
                }).then( (response)=> {
                    console.log(response)
                    this.$message({
                        message: '创建标的成功',
                        type: 'success'
                    });
                    this.$router.push('/admins/allassetslist/subjectinfo?userId='+ this.userId +'&assetId='+ this.assetId)
                }).catch( (error)=> {
                    this.$message.error('创建标的失败')
                })
            })
        },
        // 初始化数据
        initSubjectForm(form) {
            let params = {}
            params.title = form.title
            params.catalog = form.type
            params.amount = {
                amount: form.remaindAmount,
                currency: 'CNY'
            }
            params.instalmentPolicy = this.retrieveInstalmentPolicy(form)
            params.investmentPolicy = {
                maximumInvestmentAmount: {
                    amount: form.investmentLimitMoney,
                    currency: 'CNY'
                },
                minimumInvestmentAmount: {
                    amount: form.minimumInvestmentAmount,
                    currency: 'CNY'
                },
                stepInvestmentAmount: {
                    amount: form.stepInvestmentAmount,
                    currency: 'CNY'
                }
            }
            params.loaneeInformation = {
                //质押标的详情页优化
                productDetailTitle: form.productDetailTitle,
                productDetail: form.productDetail,
                riskEvaluate: form.riskEvaluate,
                highlight: form.highlight,
                usage: form.usage,
                // 华燕项目转让 添加字段
                subjectDesc : form.subjectDesc,
                debtorName : form.debtorName,
                debtorMaritalStatus : form.debtorMaritalStatus,
                debtorSex : form.debtorSex,
                debtorAge : form.debtorAge,
                debtorCity : form.debtorCity,
                housePropertyPosition : form.housePropertyPosition,
                coveredArea : form.coveredArea,
                planningPurposes : form.planningPurposes,
                evaluationValue : form.evaluationValue,
                originalObligatoryRightAmount : form.originalObligatoryRightAmount,
                originalObligatoryRightStartDate : form.originalObligatoryRightStartDate,
                originalObligatoryRightEndDate : form.originalObligatoryRightEndDate,

                //回传个人借款用户信息 midas
                phone: this.userInfo.phone,
                address: this.userInfo.address,
                sex: this.userInfo.sex,
                age: this.userInfo.age,
                realEstateSituation: this.userInfo.realEstateSituation,
                annualIncome: this.userInfo.annualIncome,
                marriageStatus: this.userInfo.marriageStatus,
                qualification: this.userInfo.qualification,
                workIndustry: this.userInfo.workIndustry,
                workCity: this.userInfo.workCity,
                workYears: this.userInfo.workYears,
                id: this.userInfo.id,
                creditLevel: this.userInfo.creditLevel,
                certificateName: this.userInfo.certification.certifiedName,
                certificateIdentity: this.userInfo.certification.certifiedIdentity,
                username: this.userInfo.username,

                predicateValueDate: form.predicateValueDate,
                //自定义标题
                _customizedFields: [],
                //还款保障
                repaymentEnsure:form.repaymentEnsure,
                //风险提醒
                riskAlert:form.riskAlert,
                //风控措施
                riskMeasure:form.riskMeasure,
                //增信措施
                addTrustMeasures:form.addTrustMeasures,
                //是否抵押
                isMortgage:form.mortgageAbility
            }
            
            if(form.type == 'JIASHI_V8') {
                params.type = 'PERSONAL_LOAN'
                params.config = this.retrieveConfigForJIASHI_V8(form)
                params.subjectInvestLimit = {
                    siLimit: 0,
                    subjectLimitAmount: this.ruleForm.subjectLimitAmount
                }
            } else if(form.type == 'JIASHI_V3') {
                params.type = 'BEGINNER_SUBJECT'
                params.config = this.retrieveConfigJIASHI_V3(form)
            }

            params.autoShelfAt = form.autoShelfAt ? formatDateAll(form.autoShelfAt) : ''

            params.portionAmount = {
                amount: form.portionAmount ? form.portionAmount : 0,
                currency: 'CNY'
            }

            params.voucherPolicy = this.voucherPolicyForJIASHI_V6(form)

            params.loanAssetId = this.assetId

            return params
        },
        retrieveConfigForJIASHI_V8(form) {
            let commonConfig = this.retrieveConfig(form)
            commonConfig.commissionRate = parseFloat(form.commissionRate / 100)
            commonConfig.transferableStartDays = parseInt(form.transferableStartDays)
            commonConfig.transferableEndDays = parseInt(form.transferableEndDays)
            commonConfig.contractType = form.contractType
		    return commonConfig;
        },
        retrieveConfigJIASHI_V3(form) {
            let commonConfig = retrieveConfig(form);
            commonConfig.financialAssetsHeldTerminationDate = form.expiryDate;
            commonConfig.financialAssetsHeldInceptionDate = form.predicateValueDate
            commonConfig.commissionRate = parseFloat(form.commissionRate / 100);
		    return commonConfig;
        },
        retrieveConfig(form) {
            return {
                investProfitFeeRate: 0,
                investProfitFeeBeneficiaryParty: "p2p-investor-profit",
                prepaymentPenaltyDays: null,
                overduePenaltyRate: 0,
                overdueAdvanceDays: null,
                overdueAdvanceParty: "risk",
                payOffDaysLimit: null,
                prepaySettledInstalmentsCount: null,
                prepayPendingInstalmentsCount: null,
                graceDays: null,
                redDays: null,
                passDays: parseInt(form.subjectPassDays, 10),
                tagName: form.tagName,
                tagDescription: form.tagDescription,
                expiryDate: form.expiryDate,
                transferDescription: form.transferDescription,
                mortgageDescription: form.mortgageDescription,
                guaranteeDescription: form.guaranteeDescription,
                morAble: form.mortgageAbility,
                guaAble: form.guaranteeAbility,
                valueDays: 0,
                useCoupon: form.voucherTypeChoose ? form.voucherTypeChoose : 'nothing',
                promotionStyle: form.promotionStyle,
                promotionStyleExplain: form.promotionStyleExplain,
                customPromotionExplain: form.customPromotionExplain
            }
        },
        voucherPolicyForJIASHI_V6(form) {
            let voucherGeometric = this.ruleForm.voucherGeometric // 使用代金券增加方式
            let investStartAmount = this.ruleForm.investStartAmount // 使用代金券最小出借金额
            let voucherQuota = this.ruleForm.voucherQuota // 代金券使用限额
            if(voucherGeometric != 'voucherGeometric' && voucherGeometric != 'voucherUnGeometric') {
                if(!investStartAmount && !voucherQuota) {
                    return 
                } else {
                    return {
                        type: "SIMPLE",
                        investStartAmount: {
                            amount: parseFloat(investStartAmount),
                            currency: "CNY"
                        },
                        voucherQuota: {
                            amount: parseFloat(voucherQuota),
                            currency: "CNY"
                        }
                    }
                }
            } else if(voucherGeometric == 'voucherGeometric') {
                return {
                    type: "EQUAL_STEP",
                    investStartAmount:{
                        amount: parseFloat(investStartAmount),
                        currency: "CNY"
                    },
                    voucherStartAmount: {
                        amount: parseFloat(form.voucherStartAmount),
                        currency: "CNY"
                    },
                    voucherQuota: {
                        amount: parseFloat(voucherQuota),
                        currency: "CNY"
                    },
                    investStep: {
                        amount: parseFloat(form.steps1.investStep),
                        currency: "CNY"
                    },
                    voucherStep: {
                        amount: parseFloat(form.steps1.voucherStep),
                        currency: "CNY"
                    }
                }
            } else if(voucherGeometric == 'voucherUnGeometric') {
                let result =  {
                    type: "NOT_EQUAL_STEP",
                    steps: []
                }
                //原始数据提交
                let stepOrigin = {
                    invest: {
                        amount: 0,
                        currency: "CNY"
                    },
                    voucher: {
                        amount: 0,
                        currency: "CNY"
                    }
                }
                stepOrigin.invest.amount = parseFloat(investStartAmount)
                stepOrigin.voucher.amount = parseFloat(voucherQuota)
                result.steps.push(stepOrigin)
                //非等比增加内容提交
                let stepArr = form.steps
                if(stepArr) {
                    for(let i = 0; i < stepArr.length; i++) {
                        let step = {
                            invest: {
                                amount: 0,
                                currency: "CNY"
                            },
                            voucher: {
                                amount: 0,
                                currency: "CNY"
                            }
                        }
                        step.invest.amount = stepArr[i].invest
                        step.voucher.amount =  stepArr[i].voucher
                        result.steps.push(step)
                    }
                }
                return result
            }
        },
        retrieveInstalmentPolicy(form) {
            let type = form.payWay
            if(type == 'ONCE_PRINCIPAL_AND_INTEREST') {
                return {
                    basicsRate: parseFloat(form.basicsRate / 100),
                    addinterestRate: parseFloat(form.addinterestRate / 100),
                    annualRate: parseFloat(form.annualRate / 100),
                    type: type,
                    numberOfInstalments: 1,
                    interval: {
                        count: parseInt(form.instalmentInterval, 10),
                        unit: "DAY"
                    }
                }
            } else if(type == 'MATCHING_PRINCIPAL_AND_INTEREST') {
                return {
                    basicsRate: parseFloat(form.basicsRate / 100),
                    addinterestRate: parseFloat(form.addinterestRate / 100),
                    annualRate: parseFloat(form.annualRate / 100),
                    type: type,
                    numberOfInstalments: parseInt(form.limitDays, 10),
                    interval: {
                        count: 1,
                        unit: "MONTH"
                    }
                }
            }
        },
        reloadsUserInfo(){
            // 右边个人信息菜单显示
            this.$axios.get(`/admin/ums/users/${this.userId}`)
            .then((res)=>{
                this.userInfo = res.data
            })
        },
        //隐藏按钮
        displayBtn(){
            $(".box-card").hide();
        },
        //标的默认星系
        reloadsApiInfo(){
            this.$axios.get(`/api/loanAssets/${this.assetId}`)
            .then((res)=>{
                    let data = res.data
                    let ruleForm = this.ruleForm
                    ruleForm.title = data.title;
                    let limitDays = 0
                    if(data.payWay == "MATCHING_PRINCIPAL_AND_INTEREST"){
                        this.ruleStatus.typeStatus = false
                        limitDays = data.limitDays * 30
                    }else if(data.payWay=="ONCE_PRINCIPAL_AND_INTEREST"){
                        this.ruleStatus.limitDays = false
                        limitDays = data.limitDays
                    }
                    ruleForm.payWay = data.payWay // 分期方式
                    ruleForm.remaindAmount = data.remaindAmount.amount   //出借金额
                    ruleForm.limitDays = data.limitDays // 借款期数
                    ruleForm.instalmentInterval = limitDays // 借款期限
                    ruleForm.basicsRate = parseFloat(data.annualRate) * 100 // 标的总利率(年化利率)
                    ruleForm.predicateValueDate = formatDate(addDays(ruleForm.subjectPassDays)) // 借款到期日 
                    ruleForm.expiryDate = formatDate(addDays(ruleForm.subjectPassDays + limitDays)) // 借款到期日

                    ruleForm.usage = data.loanPurpose // 借款用途
                    ruleForm.repaymentEnsure = data.repayGuarantee // 还款保障
                    ruleForm.riskMeasure = data.riskManageStep // 风控措施
                    ruleForm.addTrustMeasures = data.addTrustMeasures // 债权增信措施
                    ruleForm.debtorName = data.name // 债务人姓名
                    ruleForm.debtorMaritalStatus = data.marriageStatus //债务人婚姻状况
                    ruleForm.debtorSex = data.sex // 债务人性别
                    ruleForm.debtorAge = data.age // 债务人年龄
                    ruleForm.debtorCity = data.city // 债务人所在城市

                    ruleForm.housePropertyPosition = data.housePropertyPosition // 房产位置
                    ruleForm.coveredArea = data.coveredArea // 建筑面积
                    ruleForm.planningPurposes = data.planningPurposes // 规划用途
                    ruleForm.evaluationValue = data.evaluationValue // 评估价值
                    // 资产代收利率
                    ruleForm.collectorRate = parseFloat(data.collectorRate == 'null' || data.collectorRate == null ? 0 : data.collectorRate) * 100
                    ruleForm.subjectDesc = data.description == "null" ? "" : data.description // 项目描述
                    // if(data.timeLimitType == 'DATE') {

                    // } else if(data.timeLimitType == 'DAYS') {

                    // } else if(data.timeLimitType == "FPN") {

                    // }
            })
        },
        // 自动上架时间 & 募集期天数 改变时
        autoAndPassDaysChange() {
                let autoShelfAt = this.ruleForm.autoShelfAt ? this.ruleForm.autoShelfAt : new Date()
                let subjectPassDays = this.ruleForm.subjectPassDays ? this.ruleForm.subjectPassDays : 0
                this.ruleForm.predicateValueDate = formatDate(addNewDays(autoShelfAt, subjectPassDays))
                this.ruleForm.expiryDate = formatDate(addNewDays(autoShelfAt, parseInt(subjectPassDays) + parseInt(this.ruleForm.instalmentInterval)))
        },
        // 促销方式 改变时
        promotionStyleChange() {
            this.ruleStatus.customPromotionExplain = this.ruleForm.promotionStyle == 'custom' ? true : false
        },
        
        // 可转让起始时间 可转让终止时间
        transferableDaysKeyup(str) {
            if(str == 'start') {
                this.ruleForm.transferableStartText = formatDate(addDays(this.ruleForm.transferableStartDays))
            } else {
                this.ruleForm.transferableEndText = formatDate(addDays(this.ruleForm.transferableEndDays))
            }
        },
        // 是否转让  抵押  担保
        yesOrNo(str) {
            if(str == 'transferAbility') {
                this.ruleStatus.transferAbility = !this.ruleStatus.transferAbility 
            } else if(str == 'mortgageAbility') {
                this.ruleStatus.mortgageAbility = !this.ruleStatus.mortgageAbility
            } else if(str == 'guaranteeAbility') {
                this.ruleStatus.guaranteeAbility = !this.ruleStatus.guaranteeAbility
            }
        },
        // 投资限额
        limitAmountLsChange() {
            this.ruleStatus.limitAmountLs = this.ruleForm.limitAmountLs == 1 ? true : false
        }

    },
    created(){
        this.reloadsUserInfo();
        this.reloadsApiInfo();
    }
  }
</script>
<style lang="less" scoped>
.Newform{
        margin-left: 10%;
}
  /deep/.el-input{
     width: 400px !important;
  }
   /deep/.el-textarea{
     width: 400px !important;
  }
    .text {
    font-size: 14px;
  }
  .el-card__body{
          padding: 10px 20px 20px 20px;
  }

  .item {
    // margin-bottom: 18px;
    margin-left: 5px;
    border-bottom: 1px solid #eee;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 380px;
    position: fixed;
    right: 2%;
    top: 10%;
    float: right;
  }
   legend {
      width: 550px;
      font-size: 22px;
      padding-bottom: 5px;
      margin-bottom: 22px;
      border-bottom: 1px solid #ccc;
  }

    .property-block {
        background: #f2f2f2;
        width: 620px;
        margin-bottom: 22px;
        border-radius: 10px;
        .property-set + .property-set {
            margin-top: 22px;
        }
        .property-set {
            position: relative;
            background: #e9e2e2;
            border-radius: 10px;
            padding: 22px 0;
           
            .el-form-item:last-child {
                margin-bottom: 0;
            }

            .proterty-del {
                position: absolute;
                right: -20px;
                top: 30px;
                z-index: 10;
            }
        }
    }

</style>
