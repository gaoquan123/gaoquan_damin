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
                        <template slot="append">¥</template>
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
                        <el-option label="其他" value="其他"></el-option>
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
						<el-radio disabled label="FPN" border size="medium">固定期数</el-radio>
					</el-radio-group>
				</el-form-item>

                <!-- 如果是供应链 -->
                 <el-form-item label="资产起始日" prop="assetsStart">
                        <el-date-picker
                         v-model="ruleForm.assetsStart"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                 <el-form-item label="资产到期日" prop="assetsEnd">
                        <el-date-picker
                         v-model="ruleForm.assetsEnd"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
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
        bizPersonnelType: 'PERSONNEL',
        // from默认数据
        ruleForm: {
            assetsUser: '',
            assetsType: '',
            assetsName: '',
            assetsScale: '',
            instalmentPolicy: '',
            assetsOfCompany: '',
            assetsIntervalType: '',
            assetsStart: '',
            assetsEnd: '',
            assetsInterval: '',
            assetsAbleOverDays: '',
            assetsPeriods: '',
            assetsRate: '',
            assetsRiskLevel: '',
            assetsRiskQuota: '',
            assetsModel: '',
            assetsChannel: '',
            borrowerMainCharacter: '',
            borrowerWorkNature: '',
            borrowerIndustry: '',
            disposableIncome: '',
            liabilitiesCondition: '',
            otherPlatformBorrow: '',
            platformOverdueTimes: '',
            platformOverdueAmount: '',
            assetsDescription: '',
            loanUsage: '',
            repaymentSource: '',
            paySafeguard: '',
            riskControl: '',
            riskAlert: '',
            addTrustMeasures: '',
            accepteData_personnel: [],
            accepteData_enterprise: []
        },
        rules: {
            assetsStart: [
                { type: 'date', required: true, message: '请选择资产起始日', trigger: 'blur' }
            ],
            assetsEnd: [
                { type: 'date', required: true, message: '请选择资产到期日', trigger: 'blur' }
            ],
            // required: [
            //     { required: true, message: '内容不能为空', trigger: 'blur' }
            // ],
            // accepteData_personnel: [
            //     { type: 'array', required: true, message: '请至少选择一个验收资料', trigger: 'change' }
            // ],
            // accepteData_enterprise: [
            //     { type: 'array', required: true, message: '请至少选择一个验收资料', trigger: 'change' }
            // ]
        }
    };
  },
  methods: {
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
      });
    },
    //标的默认星系
    reloadsApiInfo() {
      this.$axios.get(`/api/loanAssets/${this.assetId}`).then(res => {
        this.ruleForm.title = res.data.title;
        if (res.data.payWay == "MATCHING_PRINCIPAL_AND_INTEREST") {
          this.ruleForm.payWay = "个人借款";
          this.ruleForm.type = "等额本息";
          this.ruleForm.limitDays = res.data.limitDays;
        } else if (res.data.payWay == "ONCE_PRINCIPAL_AND_INTEREST") {
          this.ruleForm.payWay = "新手标";
          this.ruleForm.type = "到期还本付息";
        }
        this.ruleForm.remaindAmount = res.data.remaindAmount.amount; //出借金额

        console.log(res.data, "222");
      });
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
    }
  },
  created() {
    
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
