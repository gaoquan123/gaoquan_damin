<template>
  <div>
    <h3 class="front-20"> 新增渠道</h3>
    <div class="basic_area">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="渠道编码" prop="channelCode">
          <el-input v-model="ruleForm.channelCode" placeholder="渠道编码"></el-input>
        </el-form-item>
        <el-form-item label="渠道名称" prop="title">
          <el-input v-model="ruleForm.title" placeholder="渠道名称"></el-input>
        </el-form-item>
        <el-form-item label="资产类型" prop="bizPersonnelType">
          <el-checkbox-group v-model="ruleForm.bizPersonnelType">
            <el-checkbox label="BIZ" name="bizPersonnelType">供应链</el-checkbox>
            <el-checkbox label="PERSONNEL" name="bizPersonnelType">小微</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="渠道类型" prop="lineType">
          <el-radio-group v-model="ruleForm.lineType">
            <el-radio label="ON_LINE">线上</el-radio>
            <el-radio label="OFF_LINE">线下</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="渠道负责人" prop="manager">
          <el-input v-model="ruleForm.manager" placeholder="渠道负责人"></el-input>
        </el-form-item>


        <div class="online-content" v-show="online">
          <div class="property-set-content">
            <el-form-item label="费率设置：">
              <el-button type="danger" @click="addProperty">新增＋</el-button>
            </el-form-item>
            <div class="property-set" v-for="(val,index) in ruleForm.propertyList">
              <el-form-item label="资产期数：">
                <el-input v-model="ruleForm.manager"></el-input> 期
              </el-form-item>
              <el-form-item label="资产年化利率：">
                <el-input v-model="ruleForm.manager"></el-input> %
              </el-form-item>
              <el-form-item label="前端服务费率：">
                <el-input v-model="ruleForm.manager"></el-input> %
              </el-form-item>
              <el-form-item label="标的年利率：">
                <el-input v-model="ruleForm.manager"></el-input> %
              </el-form-item>
              <el-button type="danger" @click="deleteProperty(index)">删除-</el-button>
            </div>
          </div>
          <el-form-item label="最小投资金额" prop="minInvAmount">
            <el-input v-model="ruleForm.minInvAmount" placeholder="最小投资金额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="投资递增金额" prop="stepInvAmount">
            <el-input v-model="ruleForm.stepInvAmount" placeholder="投资递增金额">
              <template slot="append">元</template>
            </el-input>

          </el-form-item>

          <el-form-item label="募集期天数" prop="passDays">
            <el-input v-model="ruleForm.passDays" placeholder="募集期天数">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
          <el-form-item label="资产描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description" placeholder="资产描述"></el-input>
          </el-form-item>
          <el-form-item label="还款来源" prop="repaymentSource">
            <el-input type="textarea" v-model="ruleForm.repaymentSource" placeholder="还款来源"></el-input>
          </el-form-item>
          <el-form-item label="还款保障" prop="repayGuarantee">
            <el-input type="textarea" v-model="ruleForm.repayGuarantee" placeholder="还款保障"></el-input>
          </el-form-item>
          <el-form-item label="风控措施" prop="riskManageStep">
            <el-input type="textarea" v-model="ruleForm.riskManageStep" placeholder="风控措施"></el-input>
          </el-form-item>
          <el-form-item label="项目风险提醒" prop="riskAlert">
            <el-input type="textarea" v-model="ruleForm.riskAlert" placeholder="项目风险提醒"></el-input>
          </el-form-item>
          <el-form-item label="增信措施" prop="addTrustMeasures">
            <el-input type="textarea" v-model="ruleForm.addTrustMeasures" placeholder="增信措施"></el-input>
          </el-form-item>
          <el-form-item label="已验收资料" prop="detail">
            <template v-if="showPersonnel">
              <el-checkbox-group v-model="isAccepteData_personnel">
                <el-checkbox label="isAccepteData_personnel" name="isAccepteData_personnel" disabled>小微</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="ruleForm.accepteData_personnel" class="personnel">
                <el-checkbox label="15" name="accepteData_personnel">身份证</el-checkbox>
                <el-checkbox label="16" name="accepteData_personnel">户口本</el-checkbox>
                <el-checkbox label="17" name="accepteData_personnel">婚姻状况声明</el-checkbox>
                <el-checkbox label="18" name="accepteData_personnel">征信报告</el-checkbox>
                <el-checkbox label="19" name="accepteData_personnel">银行流水</el-checkbox>
                <el-checkbox label="20" name="accepteData_personnel">反担保物权属证明</el-checkbox>
                <el-checkbox label="21" name="accepteData_personnel">个人收入证明</el-checkbox>
                <el-checkbox label="22" name="accepteData_personnel">被执行人情况查询</el-checkbox>
                <el-checkbox label="23" name="accepteData_personnel">担保措施登记手续</el-checkbox>
                <el-checkbox label="24" name="accepteData_personnel">合作机构代偿</el-checkbox>
              </el-checkbox-group>
            </template>
            <template v-if="showEnterprise">
              <el-checkbox-group v-model="isAccepteData_personnel">
                <el-checkbox label="isAccepteData_enterprise" name="isAccepteData_enterprise" disabled>供应链</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="ruleForm.accepteData_enterprise" class="biz">
                <el-checkbox label="1" name="accepteData_enterprise">法人及实际控制人征信报告</el-checkbox>
                <el-checkbox label="2" name="accepteData_enterprise">法人及实际控制人身份证</el-checkbox>
                <el-checkbox label="3" name="accepteData_enterprise">企业营业执照</el-checkbox>
                <el-checkbox label="4" name="accepteData_enterprise">企业征信报告</el-checkbox>
                <el-checkbox label="5" name="accepteData_enterprise">反担保股东会决议</el-checkbox>
                <el-checkbox label="6" name="accepteData_enterprise">被执行情况查询</el-checkbox>
                <el-checkbox label="7" name="accepteData_enterprise">上年度财务报表</el-checkbox>
                <el-checkbox label="8" name="accepteData_enterprise">近三个月财务报表</el-checkbox>
                <el-checkbox label="9" name="accepteData_enterprise">主结算账户近6个月的流水</el-checkbox>
                <el-checkbox label="10" name="accepteData_enterprise">贸易合同及交易发票</el-checkbox>
                <el-checkbox label="11" name="accepteData_enterprise">物流单据/出入库单</el-checkbox>
                <el-checkbox label="12" name="accepteData_enterprise">实地走访</el-checkbox>
                <el-checkbox label="13" name="accepteData_enterprise">商票背书转让</el-checkbox>
                <el-checkbox label="14" name="accepteData_enterprise">中登网债权登记</el-checkbox>
                <el-checkbox label="24" name="accepteData_enterprise">合作机构代偿</el-checkbox>
                <el-checkbox label="23" name="accepteData_enterprise">担保措施登记手续</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
        </div>
        <el-form-item label="渠道说明" prop="detail">
          <el-input type="textarea" v-model="ruleForm.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          channelCode: '',
          title: '',
          bizPersonnelType: [],
          lineType: 'ON_LINE',
          manager: '',
          detail: '',
          propertyList: [0],
          minInvAmount: '',
          stepInvAmount: '',
          passDays: '',
          description: '',
          repaymentSource: '',
          repayGuarantee: '',
          riskManageStep: '',
          riskAlert: '',
          addTrustMeasures: '',
          accepteData_personnel:[],
          accepteData_enterprise:[]
        },
        online: true,
        showPersonnel: false,
        showEnterprise: false,
        isAccepteData_personnel: ['isAccepteData_personnel', 'isAccepteData_enterprise'],
        rules: {
          channelCode: [
            {required: true, message: '请输入渠道编码', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请输入渠道名称', trigger: 'blur'},
          ],
          bizPersonnelType: [
            {type: 'array', required: true, message: '请至少选择一个资产类型', trigger: 'change'}
          ],
          manager: [
            {required: true, message: '请输入渠道负责人', trigger: 'blur'},
          ],
          minInvAmount: [
            {required: true, message: '请输入最小投资金额', trigger: 'blur'},
          ],
          stepInvAmount: [
            {required: true, message: '投资递增金额', trigger: 'blur'},
          ],
          passDays: [
            {required: true, message: '请输入募集期天数', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入资产描述', trigger: 'blur'}
          ],
          repaymentSource: [
            {required: true, message: '请输入还款来源', trigger: 'blur'}
          ],
          repayGuarantee: [
            {required: true, message: '请输入还款保障', trigger: 'blur'},
          ],
          riskManageStep: [
            {required: true, message: '请输入风控措施', trigger: 'blur'}
          ],
          riskAlert: [
            {required: true, message: '请输入项目风险提醒', trigger: 'blur'}
          ],
          addTrustMeasures: [
            {required: true, message: '请输入增信措施', trigger: 'blur'},
          ],
          accepteData_personnel: [
            {type: 'array', required: true, message: '请至少选择一个资产类型', trigger: 'change'}
          ],
          accepteData_enterprise: [
            {type: 'array', required: true, message: '请至少选择一个资产类型', trigger: 'change'}
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        }
      );
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addProperty(){
        this.ruleForm.propertyList.push(1);
      },
      deleteProperty(index){
        if (this.ruleForm.propertyList.length == 1) {
          return
        }
        this.ruleForm.propertyList.splice(index, 1)
      }
    },
    watch: {
      lineType(val){
        if (val == 'ON_LINE') {
          this.online = true
        } else {
          this.online = false
        }
      },
      bizPersonnelType(val){
        if (val.includes('BIZ')) {
          this.showEnterprise=true;
        }else{
          this.showEnterprise=false;
        }
        if (val.includes('PERSONNEL')) {
          this.showPersonnel=true;
        }else{
          this.showPersonnel=false;
        }
      }
    },
    computed: {
      lineType() {
        return this.ruleForm.lineType
      },
      bizPersonnelType(){
        return this.ruleForm.bizPersonnelType
      }
    },
  }

</script>
<style lang="less" scoped>
  h3 {
    font-weight: 700;
    color: #409EFF;
  }

  .basic_area {
    margin-top: 20px;
    padding-left: 200px;
  }

  .el-input, .el-textarea {
    width: 380px;
  }

  .property-set-content {
    background: #eeeeee;
    padding-top: 20px;
    margin-right: 400px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .property-set .el-form-item {
    margin-right: 20px;
    display: inline-block;

  .el-input {
    width: 100px;
  }

  }
  .personnel {
    width: 700px;
    padding-left: 20px;

  .el-checkbox:nth-of-type(7) {
    margin-left: 0;
  }

  }
  .biz {
    width: 700px;
    padding-left: 20px;

  .el-checkbox:nth-of-type(5), .el-checkbox:nth-of-type(9), .el-checkbox:nth-of-type(13) {
    margin-left: 0;
  }

  }
</style>
