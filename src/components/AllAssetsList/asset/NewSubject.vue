<template>
    <div class="newsubject">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin/subjects' }">标的管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建标的</el-breadcrumb-item>
        </el-breadcrumb>
        <h1 class="front-22 m-t-30 color">创建标的</h1>
        <div class="Newform m-t-50">

            <el-form ref="form" :model="ruleForm" label-width="150px">
                <fieldset>
                    <legend>基本信息</legend>

                    <el-form-item label="标的项目名称">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>

                    <el-form-item label="标的项目类别" prop="region">
                        <el-select placeholder="请选择项目类别" v-model="ruleForm.type">
                            <el-option label="JIASHI_V8" value="7">个人借款</el-option>
                            <el-option v-if="typeStatus" label="JIASHI_V3" value="2">新手标</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="借款金额">
                        <el-input placeholder="请输入内容" v-model="ruleForm.remaindAmount">
                            <template slot="append">¥</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="分期方式">
                        <el-select placeholder="请选择分期方式" v-model="ruleForm.payWay">
                            <el-option label="到期还本付息" value="ONCE_PRINCIPAL_AND_INTEREST"></el-option>
                            <el-option label="等额本息" value="MATCHING_PRINCIPAL_AND_INTEREST"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="借款期限" >
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.limitDays">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="标的基础利率">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.annualRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="标的加息利率" v-model="ruleForm.addinterestRate">
                        <el-input  placeholder="请输入内容">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="标的总利率(年化利率)">
                        <el-input disabled placeholder="请输入内容" v-model="ruleForm.basicsRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="服务费率">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.commissionRate">
                            <template slot="append">％</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item v-show="hide" label="资产代收利率">
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
                            <el-date-picker
                            v-model="ruleForm.expiryDate"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                    </el-form-item>

                    <el-form-item label="自动上架时间">
                            <el-date-picker
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
                        <el-radio v-model="ruleForm.radio7" label="1" border>代金券</el-radio>
                        <el-radio v-model="ruleForm.radio7" label="1" border>返现券</el-radio>
                        <el-radio v-model="ruleForm.radio7" label="1" border>无</el-radio>
                    </el-form-item>

                    <el-form-item label="促销方式">
                        <el-radio v-model="ruleForm.radio7" label="2" border>秒杀</el-radio>
                        <el-radio v-model="ruleForm.radio7" label="2" border>加息</el-radio>
                        <el-radio v-model="ruleForm.radio7" label="2" border>特供</el-radio>
                        <el-radio v-model="ruleForm.radio7" label="2" border>限量</el-radio>
                        <el-radio v-model="ruleForm.radio7" label="2" border>自定义</el-radio>
                        <el-radio v-model="ruleForm.radio7" label="2" border>无</el-radio>
                    </el-form-item>

                    <el-form-item label="自定义促销方式">
                        <el-input type="textarea" v-model="ruleForm.customPromotionExplain"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="促销方式说明">
                        <el-input type="textarea" v-model="ruleForm.promotionStyleExplain"></el-input>
                    </el-form-item>

                    <el-form-item label="是否可以转让" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否有抵押" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否有担保" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </fieldset>
                
                <fieldset>
                    <legend>出借规则</legend>

                     <el-form-item label="最小出借金额">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.name">
                            <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="出借递增金额">
                        <el-input  placeholder="请输入内容" v-model="ruleForm.name">
                            <template slot="append">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="投资限额" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </fieldset>

                <fieldset>
                    <legend>标的介绍</legend>

                    <el-form-item label="添加标签">
                        <el-input  placeholder="添加标签" v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="标签说明">
                        <el-input  placeholder="标签说明" v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="借款用途">
                        <el-input type="textarea" placeholder="借款用途" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="其他说明">
                        <el-input type="textarea" placeholder="其他说明" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="项目描述">
                        <el-input type="textarea" placeholder="项目描述" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="还款保障">
                        <el-input type="textarea" placeholder="还款保障" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="风险提醒">
                        <el-input type="textarea" placeholder="风险提醒" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="风控措施">
                        <el-input type="textarea" placeholder="风控措施" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人姓名">
                        <el-input type="textarea" placeholder="债务人姓名" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人婚姻状况">
                        <el-input type="textarea" placeholder="债务人婚姻状况" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="债务人性别">
                        <el-input type="textarea" placeholder="债务人性别" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人年龄">
                        <el-input type="textarea" placeholder="债务人年龄" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="债务人所在城市">
                        <el-input type="textarea" placeholder="债务人所在城市" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="房产位置">
                        <el-input type="textarea" placeholder="房产位置" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="建筑面积">
                        <el-input  placeholder="请输入内容">
                            <template slot="append">平米</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="规划用途">
                        <el-input type="textarea" placeholder="规划用途" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="评估价值">
                        <el-input  placeholder="请输入内容">
                            <template slot="append">万元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="合同类型">
                        <el-select placeholder="请选择分期方式" v-model="ruleForm.type">
                            <el-option label="债转合同" value="oldContract"></el-option>
                            <el-option label="个人借款合同" value="newContract"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="原始债权金额">
                        <el-input type="textarea" placeholder="原始债权金额" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="原始债权起始日">
                        <el-input type="textarea" placeholder="原始债权起始日" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="原始债权到期日">
                        <el-input type="textarea" placeholder="原始债权到期日" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>

                    <el-form-item label="债权增信措施">
                        <el-input type="textarea" placeholder="债权增信措施" v-model="ruleForm.radio7"></el-input>
                    </el-form-item>
                </fieldset>

                <fieldset>
                    <legend>标的参数</legend>

                    <el-form-item label="募集期天数">
                        <el-input type="number" placeholder="请输入内容">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </fieldset>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">创建</el-button>
                </el-form-item>
            </el-form>
            <!-- 右边卡片个人借款用户信息 -->
            <el-card class="box-card"  v-if="userInfo.type == 'PERSONAL_LOAN'">
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
<script src="./NewSubject.js"></script>
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

  .title {
      font-size: 22px;
      border-bottom: 1px solid #ccc;
  }

  legend {
      width: 550px;
      font-size: 22px;
      padding-bottom: 5px;
      margin-bottom: 22px;
      border-bottom: 1px solid #ccc;
  }

</style>
