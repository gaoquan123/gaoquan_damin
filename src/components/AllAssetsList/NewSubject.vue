<template>
    <div class="newsubject">
        <h1 class="front-22 m-t-30 color">创建个人借款标的</h1>
        <div class="Newform m-t-50">

            <el-form ref="form" :model="ruleForm" label-width="150px">
                <el-form-item label="标的项目名称">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item label="标的项目类别" prop="region">
                    <el-input disabled v-model="ruleForm.payWay"></el-input>
                </el-form-item>

                <el-form-item label="借款金额">
                    <el-input placeholder="请输入内容" v-model="ruleForm.remaindAmount">
                        <template slot="append">¥</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="分期方式">
                    <el-input disabled v-model="ruleForm.type"></el-input>
                </el-form-item>

                <el-form-item label="借款期限" >
                    <el-input  placeholder="请输入内容" v-model="ruleForm.limitDays">
                        <template slot="append"></template>
                    </el-input>
                </el-form-item>

                <el-form-item label="标的基础利率">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.name">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="标的加息利率">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.name">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                 <el-form-item label="标的总利率(年化利率)">
                    <el-input disabled placeholder="请输入内容" v-model="ruleForm.name">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="服务费率">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.name">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                 <el-form-item label="借款起始日(预计)">
                    <el-input disabled placeholder="请输入内容" v-model="ruleForm.name"></el-input>
                </el-form-item>

                 <el-form-item label="借款到期日(预计)">
                        <el-date-picker
                        v-model="ruleForm.date1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                 <el-form-item label="自动上架时间">
                        <el-date-picker
                        v-model="ruleForm.date1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="最低满标金额">
                    <el-input  placeholder="请输入内容" v-model="ruleForm.name">
                        <template slot="append">￥</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="活动方式">
                    <el-radio v-model="ruleForm.radio7" label="1" border>代金券</el-radio>
                    <el-radio v-model="ruleForm.radio7" label="2" border>返现券</el-radio>
                    <el-radio v-model="ruleForm.radio7" label="2" border>无</el-radio>
                </el-form-item>


                <el-form-item label="促销方式">
                    <el-radio v-model="ruleForm.radio7" label="1" border>秒杀</el-radio>
                    <el-radio v-model="ruleForm.radio7" label="2" border>加息</el-radio>
                    <el-radio v-model="ruleForm.radio7" label="2" border>特供</el-radio>
                    <el-radio v-model="ruleForm.radio7" label="1" border>限量</el-radio>
                    <el-radio v-model="ruleForm.radio7" label="2" border>自定义</el-radio>
                    <el-radio v-model="ruleForm.radio7" label="2" border>无</el-radio>
                </el-form-item>

                <el-form-item label="促销方式说明">
                    <el-input type="textarea" v-model="ruleForm.radio7"></el-input>
                </el-form-item>


                <el-form-item label="是否可以转让" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                        <el-option label="否" value="shanghai"></el-option>
                        <el-option label="是" value="beijing"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="是否有抵押" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                        <el-option label="否" value="shanghai"></el-option>
                        <el-option label="是" value="beijing"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="是否有担保" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                        <el-option label="否" value="shanghai"></el-option>
                        <el-option label="是" value="beijing"></el-option>
                    </el-select>
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
    export default {
    data() {
      return {
        userInfo:{},
        enterpriseUesrInfo:{},
        assetId:this.$route.query.assetId,
        userId:this.$route.query.userId,
        // from默认数据
        ruleForm: {
            name:'',
          title: '',
          payWay: '',
          remaindAmount:'',
          limitDays:'',
          type:'',
          date1: '',
          date2: '',
          delivery: false,
          resource: '',
          desc: '',
          value:'',
          region:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      reloadsUserInfo(){
        // 右边个人信息菜单显示
          this.$axios.get(`/admin/ums/users/${this.userId}`)
          .then((res)=>{
              if(res.data.type="ENTERPRISE"){
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
              this.ruleForm.title = res.data.title;
              if(res.data.payWay == "MATCHING_PRINCIPAL_AND_INTEREST"){
                this.ruleForm.payWay = '个人借款'
                this.ruleForm.type = "等额本息"
                this.ruleForm.limitDays = res.data.limitDays;
              }else if(res.data.payWay=="ONCE_PRINCIPAL_AND_INTEREST"){
                 this.ruleForm.payWay = '新手标'
                 this.ruleForm.type = "到期还本付息"
              }
              this.ruleForm.remaindAmount = res.data.remaindAmount.amount;   //出借金额

              console.log(res.data,"222")

          })
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
</style>
