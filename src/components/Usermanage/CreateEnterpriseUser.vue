<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/usermanage' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>创建企业用户</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="front-20 m-t-30"> 创建企业用户</h3>
    <h4 class="front-18 m-t-20 m-b-30"> 企业信息</h4>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="260px" class="demo-ruleForm">
      <el-form-item label="企业用户名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="企业用户名"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="organizationName">
        <el-input v-model="ruleForm.organizationName" placeholder="企业名称"></el-input>
      </el-form-item>
      <el-form-item label="法定代表人姓名" prop="organizationEntity">
        <el-input v-model="ruleForm.organizationEntity" placeholder="法定代表人姓名"></el-input>
      </el-form-item>
      <el-form-item label="法定代表人身份证号" prop="organizationEntityId">
        <el-input v-model="ruleForm.organizationEntityId" placeholder="法定代表人身份证号"></el-input>
      </el-form-item>
      <el-form-item label="机构信息代码" prop="organizationCreditCode">
        <el-input v-model="ruleForm.organizationCreditCode" placeholder="机构信息代码"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="organizationUnifiedCode">
        <el-input v-model="ruleForm.organizationUnifiedCode" placeholder="统一社会信用代码"></el-input>
        <span>“统一社会信用代码”或者“组织机构代码&营业执照编号&税务登记证编号”二选一，必须填写</span>
      </el-form-item>
      <el-form-item label="组织机构代码" prop="organizationCode">
        <el-input v-model="ruleForm.organizationCode" placeholder="组织机构代码"></el-input>
      </el-form-item>
      <el-form-item label="营业执照编号" prop="organizationLicenseCode">
        <el-input v-model="ruleForm.organizationLicenseCode" placeholder="营业执照编号"></el-input>
      </el-form-item>
      <el-form-item label="税务登记证编号" prop="organizationTaxCode">
        <el-input v-model="ruleForm.organizationTaxCode" placeholder="税务登记证编号"></el-input>
      </el-form-item>
      <el-form-item label="开户银行许可证号" prop="bankLicense">
        <el-input v-model="ruleForm.bankLicense" placeholder="开户银行许可证号"></el-input>
      </el-form-item>
      <el-form-item label="银行编码" poop="organizationBankCode">
        <el-select v-model="ruleForm.organizationBankCode" placeholder="请选择银行编码">
          <el-option label="中国农业银行" value="ABOC"></el-option>
          <el-option label="中国银行" value="BKCH"></el-option>
          <el-option label="中国光大银行" value="EVER"></el-option>
          <el-option label="兴业银行" value="FJIB"></el-option>
          <el-option label="广发银行" value="GDBK"></el-option>
          <el-option label="华夏银行" value="HXBK"></el-option>
          <el-option label="中国工商银行" value="ICBK"></el-option>
          <el-option label="中国民生银行" value="MSBC"></el-option>
          <el-option label="中国建设银行" value="PCBC"></el-option>
          <el-option label="中国邮政储蓄银行" value="PSBC"></el-option>
          <el-option label="平安银行" value="SZDB"></el-option>
          <el-option label="浦发银行" value="SPDB"></el-option>
          <el-option label="北京银行" value="BJCN"></el-option>
          <el-option label="招商银行" value="CMBC"></el-option>
          <el-option label="交通银行" value="COMM"></el-option>
          <el-option label="厦门银行" value="CBXM"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-radio-group v-model="ruleForm.userRole">
          <el-radio label="NORMAL">普通用户</el-radio>
          <el-radio label="GUARANTEECORP">担保机构</el-radio>
          <el-radio label="COLLABORATOR">合作机构</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="企业对公账户" prop="organizationCardNo">
        <el-input v-model="ruleForm.organizationCardNo" placeholder="企业对公账户"></el-input>
      </el-form-item>
      <el-form-item label="注册资本" prop="organizationCapital">
        <el-input v-model="ruleForm.organizationCapital" placeholder="注册资本"></el-input>
        万元
      </el-form-item>
      <el-form-item label="币种">
        <el-radio-group v-model="ruleForm.money">
          <el-radio label="￥">人民币</el-radio>
          <el-radio label="$">美元</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="注册地址" prop="organizationAddress">
        <el-input v-model="ruleForm.organizationAddress" placeholder="注册地址"></el-input>
      </el-form-item>
      <el-form-item label="成立日期" prop="foundDate">
        <el-input v-model="ruleForm.foundDate" placeholder="日期格式为: 年-月-日"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="organizationContactName">
        <el-input v-model="ruleForm.organizationContactName" placeholder="联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话" prop="organizationContactPhone">
        <el-input v-model="ruleForm.organizationContactPhone" placeholder="联系人电话"></el-input>
      </el-form-item>
      <el-form-item label="联系人邮箱" prop="organizationContactEmail">
        <el-input v-model="ruleForm.organizationContactEmail" placeholder="联系人邮箱"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="organizationProfile">
        <el-input type="textarea" v-model="ruleForm.organizationProfile" placeholder="企业简介"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        ruleForm: {
          name: '',
          organizationName: '',
          organizationEntity: '',
          organizationEntityId: '',
          organizationCreditCode: '',
          organizationCode: '',
          organizationLicenseCode: '',
          organizationTaxCode: '',
          bankLicense: '',
          organizationBankCode: '中国农业银行',
          userRole: 'NORMAL',
          organizationCardNo: '',
          organizationCapital: '',
          money: '￥',
          organizationAddress: '',
          foundDate: '',
          organizationContactName: '',
          organizationContactPhone: '',
          organizationContactEmail:'',
          organizationProfile:''
        },
        rules: {
          name: [
            {required: true, message: '请输入企业用户名', trigger: 'blur'},
            {min: 6, message: '请至少输入6个字符', trigger: 'blur'}
          ],
          organizationName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
          ],
          organizationEntity: [
            {required: true, message: '请输入法定代表人姓名', trigger: 'blur'},
          ],
          organizationEntityId: [
            {required: true, message: '请输入法定代表人身份证号', trigger: 'blur'},
          ],
          bankLicense: [
            {required: true, message: '请输入开户银行许可证号', trigger: 'blur'},
          ],
          organizationBankCode: [
            {required: true, message: '请选择银行编码', trigger: 'change'},
          ],
          organizationCardNo: [
            {required: true, message: '请输入企业对公账户', trigger: 'blur'},
          ],
          organizationCapital: [
            {required: true, message: '请输入注册资本', trigger: 'blur'},
          ],
          organizationAddress: [
            {required: true, message: '请输入注册地址', trigger: 'blur'},
          ],
          foundDate:[
            {required: true, message: '请输入成立日期', trigger: 'blur'},
          ],
          organizationContactName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          ],
          organizationContactPhone: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
                url:'/admin/ums/users',
                data:this.form,
                headers: {'Content-Type': 'application/vnd.tw.enterprise+json'}
            }).then()
              .catch()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
  h3 {
    font-size: 24px;
    margin-bottom: 25px;
    color: #4f9dff;
  }

  h4 {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #eee;
    font-weight: 700;
  }

  .el-input, .el-select, .el-textarea {
    width: 500px;
  }

</style>
