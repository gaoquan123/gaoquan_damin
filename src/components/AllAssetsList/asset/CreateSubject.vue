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
                        <el-select placeholder="请选择项目类别" v-model="ruleForm.type" @change="typeChange">
                            <el-option label="利息赢" value="JIASHI_V2">利息赢</el-option>
                            <el-option label="新手标" value="JIASHI_V3">新手标</el-option>
                            <el-option label="企业借款标" value="JIASHI_V13">企业借款标</el-option>
                            
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="amount" :label="this.ruleStatus.type == 'JIASHI_V2' ? '转让金额' : '借款项目金额'" >
                        <el-input placeholder="请输入内容" v-model="ruleForm.amount">
                            <template slot="append">¥</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="分期方式" prop="payWay">
                        <el-select disabled placeholder="请选择分期方式" v-model="ruleForm.payWay">
                            <el-option :label="this.ruleStatus.type == 'JIASHI_V2' ? '到期一次性支付本金及利息' : '到期还本付息'" value="ONCE_PRINCIPAL_AND_INTEREST"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="instalmentInterval" :label="this.ruleStatus.type == 'JIASHI_V2' ? '转让期限（天）' : '借款期限'" >
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

                    <el-form-item label="服务费率" prop="commissionRate" v-if="this.ruleStatus.type != 'JIASHI_V2'">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.commissionRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <div v-if="this.ruleStatus.type != 'JIASHI_V13'">
                        <el-form-item label="预计转让生效日" prop="predicateChangeDate">
                            <el-input disabled placeholder="日期格式为: 年-月-日" v-model="ruleForm.predicateChangeDate">
                                <template slot="append">(预计)</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="金融资产持有起始日" prop="fundKeepStartDate">
                            <el-input v-model="ruleForm.fundKeepStartDate" placeholder="日期格式为: 年-月-日"></el-input>
                        </el-form-item>

                        <el-form-item label="金融资产持有终止日" prop="fundKeepEndDate">
                            <el-input v-model="ruleForm.fundKeepEndDate" placeholder="日期格式为: 年-月-日"></el-input>
                        </el-form-item>
                    </div>

                    <div v-if="this.ruleStatus.type == 'JIASHI_V13'">
                        <el-form-item label="借款起始日" prop="predicateValueDate">
                            <el-input disabled placeholder="日期格式为: 年-月-日" v-model="ruleForm.predicateValueDate">
                                <template slot="append">(预计)</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="借款到期日" prop="expiryDate">
                            <el-input v-model="ruleForm.expiryDate" placeholder="日期格式为: 年-月-日"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="自动上架时间">
                            <el-date-picker
                            @change="autoAndPassDaysChange"
                            v-model="ruleForm.autoShelfAt"
                            type="datetime"
                            placeholder="手动上架不填">
                            </el-date-picker>
                    </el-form-item>

                    <el-form-item label="最低满标金额" prop="portionAmount">
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

                    
                    <el-form-item prop="contractType" label="合同类型" v-if="this.ruleStatus.type == 'JIASHI_V2'">
                        <el-select @change="contractTypeChange" placeholder="请选择合同类型" v-model="ruleForm.contractType">
                            <el-option label="原始合同" value="oldContract"></el-option>
                            <el-option label="新合同" value="newContract"></el-option>
                        </el-select>
                    </el-form-item>

                    <div v-if="ruleStatus.contractType == 'oldContract'">
                        <el-form-item label="是否可转让">
                            <el-select @change="yesOrNo('transferAbility')" v-model="ruleForm.transferAbility" placeholder="请选择项目类型">
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="可转让起始时间" v-if="ruleStatus.transferAbility">
                            <el-input @keyup.native="transferableDaysKeyup('start')" type="number" placeholder="请输入内容" v-model="ruleForm.transferableStartDays">
                                <template slot="append">天</template>
                            </el-input>
                            <span>{{ ruleForm.transferableStartText }}</span>
                        </el-form-item>
                        <el-form-item label="可转让终止时间" v-if="ruleStatus.transferAbility">
                            <el-input @keyup.native="transferableDaysKeyup('end')" type="number" placeholder="请输入内容" v-model="ruleForm.transferableEndDays">
                                <template slot="append">天</template>
                            </el-input>
                                <span>{{ ruleForm.transferableEndText }}</span>
                        </el-form-item>
                    </div>

                    <div v-if="ruleStatus.contractType == 'newContract'">
                        <el-form-item label="提前转出日">
                            <el-input placeholder="日期格式为: 年-月-日" v-model="ruleForm.aheadTransferDate"></el-input>
                        </el-form-item>
                        <el-form-item label="项目简介">
                            <el-input type="textarea" v-model="ruleForm.projectProfile" ></el-input>
                        </el-form-item>
                        <el-form-item label="退出时间">
                            <el-input type="textarea" v-model="ruleForm.endTime" ></el-input>
                        </el-form-item>
                        <el-form-item label="提前退出">
                            <el-input type="textarea" v-model="ruleForm.aheadOut" ></el-input>
                        </el-form-item>
                    </div>

                    <div v-if="this.ruleStatus.type != 'JIASHI_V2'">
                        <el-form-item label="是否可转让">
                            <el-select disabled @change="yesOrNo('transferAbility')" v-model="ruleForm.transferAbility" placeholder="请选择项目类型">
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="可转让起始时间" v-if="ruleStatus.transferAbility">
                            <el-input @keyup.native="transferableDaysKeyup('start')" type="number" placeholder="请输入内容" v-model="ruleForm.transferableStartDays">
                                <template slot="append">天</template>
                            </el-input>
                            <span>{{ ruleForm.transferableStartText }}</span>
                        </el-form-item>
                        <el-form-item label="可转让终止时间" v-if="ruleStatus.transferAbility">
                            <el-input @keyup.native="transferableDaysKeyup('end')" type="number" placeholder="请输入内容" v-model="ruleForm.transferableEndDays">
                                <template slot="append">天</template>
                            </el-input>
                                <span>{{ ruleForm.transferableEndText }}</span>
                        </el-form-item>

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
                    </div>

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
                    <div v-if="this.ruleStatus.type == 'JIASHI_V3' || this.ruleStatus.type == 'JIASHI_V13'">
                        <el-form-item label="出借限额" prop="stepInvestmentAmount">
                            <el-input  placeholder="请输入内容" v-model="ruleForm.investmentLimitMoney">
                                <template slot="append">￥</template>
                            </el-input>
                        </el-form-item>
                    </div> 
                    <div v-if="this.ruleStatus.type == 'JIASHI_V2' || this.ruleStatus.type == 'JIASHI_V13'">
                        <el-form-item label="投资限额">
                            <el-select v-model="ruleForm.limitAmountLs" @change="limitAmountLsChange" placeholder="请选择项目类型">
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="单标限投金额" v-if="ruleStatus.limitAmountLs">
                            <el-input  placeholder="请输入内容" v-model="ruleForm.subjectLimitAmount">
                                <template slot="append">￥</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>标的介绍</legend>

                    <el-form-item label="项目描述" prop="subjectDesc">
                        <el-input type="textarea" placeholder="项目描述" v-model="ruleForm.subjectDesc"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="还款保障" prop="repaymentEnsure">
                        <el-input type="textarea" placeholder="还款保障" v-model="ruleForm.repaymentEnsure"></el-input>
                    </el-form-item>

                    <el-form-item label="风险提醒" prop="riskAlert">
                        <el-input type="textarea" placeholder="风险提醒" v-model="ruleForm.riskAlert"></el-input>
                    </el-form-item>

                    <el-form-item label="增信措施" prop="addTrustMeasures">
                        <el-input type="textarea" placeholder="增信措施" v-model="ruleForm.addTrustMeasures"></el-input>
                    </el-form-item>

                    <div v-if="this.ruleStatus.type != 'JIASHI_V13'">
                        <el-form-item label="借款用途" prop="loanPurpose">
                            <el-input type="textarea" placeholder="借款用途" v-model="ruleForm.loanPurpose"></el-input>
                        </el-form-item>
                    </div>

                    <div v-if="this.ruleStatus.type == 'JIASHI_V3' || this.ruleStatus.type == 'JIASHI_V13'">
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
                    </div>

                   <el-form-item label="添加标签">
                        <el-input  placeholder="添加标签" v-model="ruleForm.tagName"></el-input>
                    </el-form-item>

                    <el-form-item label="标签说明">
                        <el-input  placeholder="标签说明" v-model="ruleForm.tagDescription"></el-input>
                    </el-form-item>

                    <div v-if="this.ruleStatus.tyep != 'JIASHI_V13'">
                        <el-form-item label="联系方式">
                            <el-input type="textarea" placeholder="联系方式" v-model="ruleForm.contactInformation"></el-input>
                        </el-form-item>

                        <el-form-item label="项目资产">
                            <el-input type="textarea" placeholder="项目资产" v-model="ruleForm.subjectCapital"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="风控措施" prop="riskMeasure"  v-if="this.ruleStatus.type == 'JIASHI_V13' || this.ruleStatus.type == 'JIASHI_V3'">
                        <el-input type="textarea" placeholder="风控措施" v-model="ruleForm.riskMeasure"></el-input>
                    </el-form-item>

                    <el-form-item label="企业借款用途"  v-if="this.ruleStatus.type == 'JIASHI_V13'">
                        <el-input type="textarea" placeholder="企业借款用途" v-model="ruleForm.enterpriseLoanUsage"></el-input>
                    </el-form-item>

                </fieldset>

                <fieldset>
                    <legend>标的参数</legend>

                    <el-form-item label="募集期天数" prop="subjectPassDays">
                        <el-input type="number" placeholder="请输入内容" @change="autoAndPassDaysChange" v-model="ruleForm.subjectPassDays">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>

                    <div v-if="this.ruleStatus.type == 'JIASHI_V2'">
                        <el-form-item label="平台手续费率" prop="p2pCommissionRate">
                            <el-input type="number" placeholder="请输入内容" v-model="ruleForm.p2pCommissionRate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="风险备用金提取比例" prop="riskRate">
                            <el-input type="number" placeholder="请输入内容" v-model="ruleForm.riskRate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="出借利息手续费率" prop="investProfitFeeRate">
                            <el-input disabled type="number" placeholder="请输入内容" v-model="ruleForm.investProfitFeeRate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="逾期罚息日利率" prop="overduePenaltyRate">
                            <el-input type="number" placeholder="请输入内容" v-model="ruleForm.overduePenaltyRate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="列为坏账的最长逾期天数" prop="redDays">
                            <el-input type="number" placeholder="请输入内容" v-model="ruleForm.redDays">
                                <template slot="append">天</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </fieldset>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">创建</el-button>
                </el-form-item>
            </el-form>

            <!-- 右边卡片企业信息 -->
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
import { formatDate, formatDateAll, addDays, addNewDays } from 'PublicMethods/MethodsJs.js'
import { callbackify } from 'util';
export default {
    data() {
        return {
            enterpriseUesrInfo:{},
            assetId:this.$route.query.assetId,
            userId:this.$route.query.userId,
            // from默认数据
            ruleForm: {
                title: '', // 标的项目名称
                type: 'JIASHI_V2', // 标的项目类别
                amount: '', // 借款金额
                payWay: '', // 分期方式
                instalmentInterval: '', // 借款期限
                annualRate: 0, // 标的基础利率
                addinterestRate: 0, // 标的加息利率
                basicsRate: 0, // 标的总利率(年化利率)
                commissionRate: 0, // 服务费率
                predicateChangeDate: '', // 预计转让生效日
                fundKeepStartDate: '', // 金融资产持有起始日
                fundKeepEndDate: '', // 金融资产持有终止日
                predicateValueDate: '', // 借款起始日
                expiryDate: '', // 借款到期日
                autoShelfAt: '', // 自动上架时间
                voucherTypeChoose: '', //活动方式
                promotionStyle: '', //促销方式
                customPromotionExplain: '', // 自定义促销方式
                promotionStyleExplain: '', // 促销方式说明
                contractType: 'oldContract', // 合同类型
                transferAbility: "0", //是否可转让
                transferableStartDays: '', //可转让起始时间
                transferableStartText: '--日起', 
                transferableEndDays: '', // 可转让终止时间
                transferableEndText: '--日起',
                aheadTransferDate: '', // 提前转出日
                projectProfile: '', // 项目简介
                endTime: '', // 退出时间
                aheadOut: '', // 提前退出
                mortgageAbility: "0", //是否有抵押
                mortgageDescription: '', // 抵押说明
                guaranteeAbility: "0", //是否有担保
                guaranteeDescription: '', //担保说明
                minimumInvestmentAmount: 10000, // 最小出借金额
                stepInvestmentAmount: 10000, // 出借递增金额
                investmentLimitMoney: 10000, // 出借限额
                limitAmountLs: "0", //投资限额
                subjectLimitAmount: '', // 单标限投金额
                subjectDesc: '', //项目描述
                repaymentEnsure: '', // 还款保障
                riskAlert: '',  // 风险提醒
                addTrustMeasures: '', // 增信措施
                loanPurpose: '', // 借款用途
                housePropertyPosition: '', // 房产位置
                coveredArea: '', // 建筑面积
                planningPurposes: '', // 规划用途
                evaluationValue: '', // 评估价值
                tagName: '', // 添加标签
                tagDescription: '', // 标签说明
                contactInformation: '', // 联系方式
                subjectCapital: '', // 项目资产
                riskMeasure: '', // 风控措施
                enterpriseLoanUsage: '', // 企业借款用途
                subjectPassDays: 3, // 募集期天数
                p2pCommissionRate: 0, // 平台手续费率
                riskRate: 0, // 风险备用金提取比例
                investProfitFeeRate: 0, // 出借利息手续费率
                overduePenaltyRate: 0, // 逾期罚息日利率
                redDays: 999, // 列为坏账的最长逾期天数

                useCoupon: '',
                loan_type: '',
                loan_type_fpn: '',
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

                contractType: 'oldContract', // 合同类型
                limitAmountLs: false, // 投资限额
                type: 'JIASHI_V2', // 标的项目类别

            },
            rules: {
                title : [
                    { required: true, message: '标的项目名称不能为空', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择标的项目类别', trigger: 'change' }
                ],
                amount: [
                    { required: true, message: '金额不能为空', trigger: 'blur' },
                    { validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                payWay: [
                    { required: true, message: '请选择分期方式', trigger: 'change' }
                ],
                instalmentInterval: [
                    { required: true, message: '期限不能为空', trigger: 'blur' },
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
                predicateChangeDate: [
                    { required: true, message: '预计转让生效日不能为空', trigger: 'blur' },
                    { type: 'date', message: '时间格式不正确', trigger: 'blur' }
                ],
                fundKeepStartDate: [
                    { required: true, message: '金融资产持有起始日不能为空', trigger: 'blur' },
                    { type: 'date', message: '时间格式不正确', trigger: 'blur' }
                ],
                fundKeepEndDate: [
                    { required: true, message: '金融资产持有终止日不能为空', trigger: 'blur' },
                    { type: 'date', message: '时间格式不正确', trigger: 'blur' }
                ],
                predicateValueDate: [
                    { required: true, message: '借款起始日不能为空', trigger: 'blur' },
                    { type: 'date', message: '时间格式不正确', trigger: 'blur' }
                ],
                expiryDate: [
                    { required: true, message: '借款到期日不能为空', trigger: 'blur' },
                    { type: 'date', message: '时间格式不正确', trigger: 'blur' }
                ],
                portionAmount: [
                    { type: 'number', validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                customPromotionExplain: [
                    { required: true, message: '自定义促销方式不能为空', trigger: 'blur' }
                ],
                contractType: [
                    { required: true, message: '请选择合同类型', trigger: 'change' }
                ],
                minimumInvestmentAmount: [
                    { required: true, message: '最小出借金额不能为空', trigger: 'blur' },
                    { validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                stepInvestmentAmount: [
                    { required: true, message: '出借递增金额不能为空', trigger: 'blur' },
                    { validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                investmentLimitMoney: [
                    { required: true, message: '出借限额不能为空', trigger: 'blur' },
                    { validator: this.$valid.getAmountValidator, trigger: 'blur' }
                ],
                repaymentEnsure: [
                    { required: true, message: '还款保障还款保障不能为空', trigger: 'blur' },
                    { max: 6000, message: '还款保障还款保障不能超过300个字符', trigger: 'blur' }
                ],
                riskAlert: [
                    { required: true, message: '风险提醒不能为空', trigger: 'blur' },
                    { max: 300, message: '风险提醒不能超过300个字符', trigger: 'blur' }
                ],
                addTrustMeasures: [
                    { required: true, message: '增信措施不能为空', trigger: 'blur' },
                    { max: 300, message: '增信措施不能超过300个字符', trigger: 'blur' }
                ],
                loanPurpose: [
                    { required: true, message: '借款用途不能为空', trigger: 'blur' },
                    { max: 300, message: '借款用途不能超过300个字符', trigger: 'blur' }
                ],
                subjectPassDays: [
                    { required: true, message: '募集期天数不能为空', trigger: 'blur' }
                ],
                p2pCommissionRate: [
                    { required: true, message: '平台手续费率不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                riskRate: [
                    { required: true, message: '风险备用金提取比例不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                overduePenaltyRate: [
                    { required: true, message: '出借利息手续费率不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                redDays: [
                    { required: true, message: '列为坏账的最长逾期天数不能为空', trigger: 'blur' },
                    { min: 0, message: '列为坏账的最长逾期天数输入有误', trigger: 'blur' }
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
                console.log(this.initSubjectForm(this.ruleForm))
                return
                /* this.$axios({
                    url: '/admin/api/users/' + this.userId + '/subjects',
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
                }) */
            })
        },
        // 初始化数据
        initSubjectForm(form) {
            let params = {}
            const subjectType = this.ruleForm.type // 标的类型
            params.title = form.title
            params.catalog = form.type
            params.amount = {
                amount: form.amount,
                currency: 'CNY'
            }
            params.instalmentPolicy = this.retrieveInstalmentPolicy(form)
            params.investmentPolicy = {
                minimumInvestmentAmount: {
                    amount: form.minimumInvestmentAmount,
                    currency: 'CNY'
                },
                stepInvestmentAmount: {
                    amount: form.stepInvestmentAmount,
                    currency: 'CNY'
                }
            }

            if(subjectType == 'JIASHI_V2') {
                params.type = 'BEGINNER_SUBJECT'
            }

            if(subjectType == 'JIASHI_V3') {
                params.investmentPolicy.investmentLimitMoney = {
                    amount: form.investmentLimitMoney,
                    currency: 'CNY'
                }
                params.type = 'P2P_LOAN'
            }

            if(subjectType == 'JIASHI_V13') {
                params.type = 'ENTERPRISE_2_PERSONAL_LOAN'
            }

            if(subjectType != 'JIASHI_V13') {
                params.agreements = [{
                    commissionRate: form.p2pCommissionRate / 100,
                    type: "P2P_COMMISSION",
                    party: "p2p"
                },{
                    riskRate: form.riskRate / 100,
                    type: "RISK",
                    party: "risk"
                }]
            }

            params.loaneeInformation = this.retrieveLoaneeInformation(form)
            
            if(form.type == 'JIASHI_V8') {
                params.type = 'PERSONAL_LOAN'
                params.config = this.retrieveConfigForJIASHI_V8(form)
                params.subjectInvestLimit = {
                    siLimit: 0,
                    subjectLimitAmount: 0
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
            let config = {
                investProfitFeeRate: form.investProfitFeeRate / 100,
                investProfitFeeBeneficiaryParty: "p2p-investor-profit",
                prepaymentPenaltyDays: 0,
                overduePenaltyRate: parseFloat(form.overduePenaltyRate) / 100,
                overdueAdvanceDays: 0,
                overdueAdvanceParty: "risk",
                payOffDaysLimit: 0,
                prepaySettledInstalmentsCount: 0,
                prepayPendingInstalmentsCount: 0,
                graceDays: 5,
                redDays: parseInt(form.redDays, 10),
                passDays: parseInt(form.subjectPassDays, 10),
                tagName: form.tagName,
                tagDescription: form.tagDescription,
                expiryDate: form.expiryDate,
                valueDays: 0,
                useCoupon: form.voucherTypeChoose ? form.voucherTypeChoose : 'nothing',
                commissionRate: form.p2pCommissionRate
            }
            if(subjectType == 'JIASHI_V2') {
                config.transferableStartDays = form.transferableStartDays
                config.transferableEndDays = form.transferableEndDays
                config.financialAssetsHeldTerminationDate = form.financialAssetsHeldTerminationDate
                config.financialAssetsHeldInceptionDate = form.financialAssetsHeldInceptionDate
                config.contractType = form.contractType
                // config.maxPomegranate = 
                
            }

            if(subjectType == 'JIASHI_V3') {
                
            }

            if(subjectType == 'JIASHI_V13') {
                
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
            let j = this.ruleForm.type
            if(type == 'ONCE_PRINCIPAL_AND_INTEREST' || j == 'JIASHI_V2' || j == 'JIASHI_V3') {
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
        retrieveLoaneeInformation(form) {
            let loanee = {
                highlight: '', // 项目亮点
                subjectCapital: form.subjectCapital,
                organizationName: this.enterpriseUesrInfo.organizationName,
                organizationProfile: this.enterpriseUesrInfo.organizationProfile,
                organizationAddress: this.enterpriseUesrInfo.organizationAddress,
                _customizedFields: [] // 自定义标题
            }
            const subjectType = form.ruleForm.type

            loanee.addTrustMeasures = form.addTrustMeasures // 增信措施
            loanee.repaymentEnsure = form.repaymentEnsure // 还款保障
            if(subjectType == 'JIASHI_V2') {
                loanee.usage = form.subjectDesc // 项目描述
                loanee.predicateValueDate = form.predicateChangeDate // 预计转让生效日
                loanee.aheadTransferDate = form.aheadTransferDate // 提前转出日
                loanee.projectProfile = form.projectProfile
                loanee.endTime = form.endTime
                loanee.aheadOut = form.aheadOut
                loanee.riskAlert = form.riskAlert
                loanee.loanPurpose = form.loanPurpose
            }

            if(subjectType == 'JIASHI_V3') {
                loanee.usage = form.subjectDesc
                loanee.predicateValueDate = form.predicateChangeDate
                loanee.riskMeasure = form.riskMeasure
                loanee.riskAlert = form.riskAlert
                loanee.loanPurpose = form.loanPurpose
                loanee.housePropertyPosition = form.housePropertyPosition
                loanee.coveredArea = form.coveredArea
                loanee.planningPurposes = form.planningPurposes
                loanee.evaluationValue = form.evaluationValue
            }

            if(subjectType == 'JIASHI_V13') {
                loanee.predicateValueDate = form.predicateValueDate
                loanee.subjectDesc = form.subjectDesc
                loanee.riskMeasure = form.riskMeasure
                loanee.usage = form.enterpriseLoanUsage
            }
            
            return loaneeinformation
        },
        reloadsUserInfo(){
            // 右边个人信息菜单显示
            this.$axios.get(`/admin/ums/users/${this.userId}`)
            .then((res)=>{
                this.enterpriseUesrInfo = res.data
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

                    ruleForm.loan_type = data.timeLimitType
                    ruleForm.loan_type_fpn = data.limitDays

                    
                    ruleForm.title = data.title // 标题
                    ruleForm.payWay = data.payWay // 分期方式
                    ruleForm.basicsRate = parseFloat(data.annualRate) * 100 // 标的总利率(年化利率)
                    ruleForm.loanAssetRate = parseFloat(data.annualRate) * 100

                    if(data.housePropertyPosition != '') {
                        ruleForm.mortgageAbility = '1' // 是否抵押
                        this.ruleStatus.mortgageAbility = true
                        ruleForm.mortgageDescription = "抵押物位于" + data.housePropertyPosition + "，建筑面积" + data.coveredArea + "平米，评估总价值" + data.evaluationValue + "万元"
                    }

                    ruleForm.housePropertyPosition = data.housePropertyPosition // 房产位置
                    ruleForm.coveredArea = data.coveredArea // 建筑面积
                    ruleForm.planningPurposes = data.planningPurposes // 规划用途
                    ruleForm.evaluationValue = data.evaluationValue // 评估价值

                    ruleForm.fundKeepStartDate = data.startTime.substr(0, 10) // 金融资产持有起始日
                    ruleForm.fundKeepEndDate = data.endTime.substr(0, 10)
                    ruleForm.subjectDesc = data.description // 项目描述
                    ruleForm.amount = data.remaindAmount.amount // 借款项目金额
                    ruleForm.loanPurpose = data.loanPurpose // 借款用途
                    ruleForm.enterpriseLoanUsage = data.loanPurpose // 企业借款用途
                    ruleForm.repaymentEnsure = data.repayGuarantee // 还款保障
                    ruleForm.riskMeasure = data.riskManageStep // 风控措施
                    ruleForm.riskAlert = data.riskAlert // 风险提醒
                    ruleForm.addTrustMeasures = data.addTrustMeasures // 增信措施

                    ruleForm.predicateChangeDate = formatDate(addDays(ruleForm.subjectPassDays))
                    // // 资产代收利率
                    // ruleForm.collectorRate = parseFloat(data.collectorRate == 'null' || data.collectorRate == null ? 0 : data.collectorRate) * 100
                    // ruleForm.subjectDesc = data.description == "null" ? "" : data.description // 项目描述
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
                this.ruleForm.predicateChangeDate = formatDate(addNewDays(autoShelfAt, subjectPassDays))
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
        },
        // 标的项目类别 改变时
        typeChange() {
            this.ruleStatus.type = this.ruleForm.type

            // 转让也会变
            if(this.ruleForm.type != 'JIASHI_V2') {
                this.ruleForm.transferAbility = "1"
                this.ruleStatus.transferAbility = 1
            }
        },
        // 合同类型 改变时
        contractTypeChange() {
            this.ruleStatus.contractType = this.ruleForm.contractType
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
