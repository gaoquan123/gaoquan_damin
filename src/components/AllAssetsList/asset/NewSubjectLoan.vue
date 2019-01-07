<template>
    <div class="newsubject">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin/subjects' }">标的管理</el-breadcrumb-item>
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

                    <el-form-item label="标的项目类别">
                        <el-select placeholder="请选择项目类别" v-model="ruleForm.type">
                            <el-option label="个人借款" value="7">个人借款</el-option>
                            <el-option v-if="ruleStatus.typeStatus" label="新手标" value="2">新手标</el-option>
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
                            type="date"
                            placeholder="手动上架不填">
                            </el-date-picker>
                    </el-form-item>

                    <el-form-item label="最低满标金额">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.portionAmount">
                            <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="活动方式">
                        <el-radio-group v-model="ruleForm.voucherTypeChoose" @change="voucherTypeChooseChange">
                            <el-radio label="voucher" border>代金券</el-radio>
                            <el-radio label="coupon" border>返现券</el-radio>
                            <el-radio label="no" border>无</el-radio>
                        </el-radio-group>
                        
                    </el-form-item>

                    <el-form-item label="促销方式">
                        <el-radio-group v-model="ruleForm.promotionStyle" @change="promotionStyleChange">
                            <el-radio label="seckill" border>秒杀</el-radio>
                            <el-radio label="raise" border>加息</el-radio>
                            <el-radio label="supply" border>特供</el-radio>
                            <el-radio label="limit" border>限量</el-radio>
                            <el-radio label="custom" border>自定义</el-radio>
                            <el-radio label="no" border>无</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="自定义促销方式" v-if="ruleStatus.customPromotionExplain" prop="customPromotionExplain">
                        <el-input type="textarea" v-model="ruleForm.customPromotionExplain"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="促销方式说明">
                        <el-input type="textarea" v-model="ruleForm.promotionStyleExplain"></el-input>
                    </el-form-item>

                    <div v-if="ruleStatus.voucherTypeChoose">
                        <el-form-item label="代金券使用限额">
                            <el-input  placeholder="代金券使用限额" v-model="ruleForm.voucherQuota">
                                <template slot="append">￥</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="使用代金券最小出借金额">
                            <el-input  placeholder="使用代金券最小出借金额" v-model="ruleForm.investStartAmount">
                                <template slot="append">￥</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="使用代金券金额">
                            <el-input  placeholder="使用代金券金额" v-model="ruleForm.voucherStartAmount">
                                <template slot="append">￥</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="使用代金券增加方式">
                            <el-radio-group v-model="ruleForm.voucherGeometric" @change="voucherGeometricChange">
                                <el-radio label="0" border>等比增加</el-radio>
                                <el-radio label="1" border>非等比增加</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>

                    <el-form-item label="是否可转让">
                        <el-select v-model="ruleForm.transferAbility" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否有抵押">
                        <el-select v-model="ruleForm.mortgageAbility" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否有担保">
                        <el-select v-model="ruleForm.guaranteeAbility" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
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
                        <el-select v-model="ruleForm.limitAmountLs" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
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
                    
                    <el-form-item label="还款保障还款保障" prop="repaymentEnsure">
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


            <!-- 右边卡片借款人信息 -->
            <el-card class="box-card"  v-if="enterpriseUesrInfo.type  == 'ENTERPRISE'">
                <div slot="header" class="clearfix">
                    <span class="color">借款人信息</span>
                     <el-button style="float: right; padding: 3px 0" @click="displayBtn()" type="text">隐藏</el-button>
                </div>

                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">用户名:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.username}}</div></el-col>
                </el-row>

                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">企业名称:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationName}}</div></el-col>
                </el-row>
                
                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">组织机构代码:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationCode}}</div></el-col>
                </el-row>
                
                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">法定代表人姓名:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationEntity}}</div></el-col>
                </el-row>
                
                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">法定代表人身份证号:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationEntityId}}</div></el-col>
                </el-row>
                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">营业执照编号:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationLicenseCode}}</div></el-col>
                </el-row>
                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">税务登记证编号:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationTaxCode}}</div></el-col>
                </el-row>
                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">注册资本:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationCapital}}</div></el-col>
                </el-row>

                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">成立日期:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.foundDate}}</div></el-col>
                </el-row>

                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">联系人姓名:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationContactName}}</div></el-col>
                </el-row>

                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">联系人电话:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationContactPhone}}</div></el-col>
                </el-row>

                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">联系人邮箱:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationContactEmail}}</div></el-col>
                </el-row>
                
                 <el-row class="text item row">
                    <el-col :span="10"><div class="grid-content bg-purple">企业简介:</div></el-col>
                    <el-col :span="14"><div class="grid-content bg-purple-light">{{enterpriseUesrInfo.organizationProfile}}</div></el-col>
                </el-row>
                
                
     
            </el-card>
          
        </div>
    </div>
</template>
<script>
    import { formatDate, addDays, addNewDays } from 'PublicMethods/MethodsJs.js'
    export default {
    data() {
      return {
        userInfo:{},
        enterpriseUesrInfo:{},
        assetId:this.$route.query.assetId,
        userId:this.$route.query.userId,
        // from默认数据
        ruleForm: {
            title: '', // 标的项目名称
            payWay: '', // 分期方式
            remaindAmount: '', // 借款金额
            limitDays: '', // 借款期数
            instalmentInterval: '', // 借款期限
            annualRate: 0, // 标的基础利率
            addinterestRate: 0, // 标的加息利率
            basicsRate: 0, // 标的总利率(年化利率)
            commissionRate: 0, // 服务费率
            subjectPassDays: 3, // 募集期天数
            voucherTypeChoose: 'no', //活动方式
            promotionStyle: 'no', //促销方式
            transferAbility: "0", //是否可转让
            mortgageAbility: "0", //是否有抵押
            guaranteeAbility: "0", //是否有担保
            limitAmountLs: "0", //投资限额
            minimumInvestmentAmount: 100, // 最小出借金额
            stepInvestmentAmount: 100, // 出借递增金额
            predicateValueDate: '', // 借款起始日(预计)
            expiryDate: '', // 借款到期日
            contractType: 'newContract', // 合同类型
            subjectDesc: '', //项目描述
            repaymentEnsure: '', // 还款保障还款保障
            riskAlert: '',  // 风险提醒
            riskMeasure: '', // 风控措施
            debtorName: '', // 债务人姓名
            debtorMaritalStatus: '', // 债务人婚姻状况
            debtorSex: '', // 债务人性别
            debtorAge: '', // 债务人年龄
            debtorCity: '', // 债务人所在城市


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
            console.log(formName)
            this.$refs[formName].validate((valid) => {
                if(!valid) {
                    return false
                }
                console.log('commit')
            })
        },
        reloadsUserInfo(){
            // 右边个人信息菜单显示
            this.$axios.get(`/admin/ums/users/${this.userId}`)
            .then((res)=>{
                if(res.data.type=="ENTERPRISE"){
                    this.enterpriseUesrInfo = res.data
                }else{
                    this.userInfo = res.data;
                }
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
                    if(data.payWay == "MATCHING_PRINCIPAL_AND_INTEREST"){
                        this.ruleStatus.typeStatus = false
                        this.ruleStatus.type = '7'

                    }else if(data.payWay=="ONCE_PRINCIPAL_AND_INTEREST"){
                        this.ruleStatus.limitDays = false
                    }
                    ruleForm.payWay = data.payWay // 分期方式
                    ruleForm.remaindAmount = data.remaindAmount.amount   //出借金额
                    ruleForm.limitDays = data.limitDays // 借款期数
                    ruleForm.instalmentInterval = Number(data.limitDays * 30) // 借款期限
                    ruleForm.basicsRate = parseFloat(data.annualRate) * 100 // 标的总利率(年化利率)
                    ruleForm.predicateValueDate = formatDate(addDays(ruleForm.subjectPassDays)) // 借款到期日 
                    ruleForm.expiryDate = formatDate(addDays(ruleForm.subjectPassDays + data.limitDays * 30)) // 借款到期日

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
                    if(data.timeLimitType == 'DATE') {

                    } else if(data.timeLimitType == 'DAYS') {

                    } else if(data.timeLimitType == "FPN") {

                    }
            })
        },
        // 自动上架时间 & 募集期天数 改变时
        autoAndPassDaysChange() {
                let autoShelfAt = this.ruleForm.autoShelfAt ? this.ruleForm.autoShelfAt : new Date()
                let subjectPassDays = this.ruleForm.subjectPassDays ? this.ruleForm.subjectPassDays : 0
                this.ruleForm.predicateValueDate = formatDate(addNewDays(autoShelfAt, subjectPassDays))
                this.ruleForm.expiryDate = formatDate(addNewDays(autoShelfAt, parseInt(subjectPassDays) + parseInt(this.ruleForm.instalmentInterval)))
        },
        // 活动方式
        voucherTypeChooseChange() {
            this.ruleForm.voucherTypeChoose = this.ruleForm.voucherTypeChoose == 'voucher' ? true : false
        },
        // 促销方式 改变时
        promotionStyleChange() {
            this.ruleStatus.customPromotionExplain = this.ruleForm.promotionStyle == 'custom' ? true : false
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
        position: relative;
        left: 50%;
        margin-left: -40%;
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
</style>
