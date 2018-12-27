<template>
  <div>
    <h3 class="front-20"> {{msg}}</h3>
    <div class="basic_area">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
        <el-form-item label="渠道编码" prop="channelCode">
          <el-input v-model="ruleForm.channelCode" placeholder="渠道编码" :disabled="!!this.id"></el-input>
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
          <el-checkbox v-model="managerUpdateChecked" name="managerUpdateFlag" label="1" v-if="!!this.id">更新本渠道项下历史资产的项目负责人</el-checkbox>
        </el-form-item>
        <div class="online-content" v-if="online">
          <div class="property-set-content">
            <el-form-item label="费率设置：">
              <el-button type="danger" @click="addProperty">新增＋</el-button>
            </el-form-item>
            <div class="property-set" v-for="(val,index) in ruleForm.alldata">
              <el-form-item label="资产期数"
                            :prop="'alldata.' + index + '.decimal'"
                            :rules="rules.decimalRule">
                <el-input v-model.number="val.decimal" ></el-input>
                期
              </el-form-item>
              <el-form-item label="资产年化利率："
                            :prop="'alldata.' + index + '.assetRate'"
                            :rules="rules.assetRateRule">
                <el-input v-model.number="val.assetRate"></el-input>
                %
              </el-form-item>
              <el-form-item label="前端服务费率："
                            :prop="'alldata.' + index + '.serviceRate'"
                            :rules="rules.serviceRateRule">
                <el-input v-model.number="val.serviceRate"></el-input>
                %
              </el-form-item>
              <el-form-item label="标的年利率："
                            :prop="'alldata.' + index + '.subjectRate'"
                            :rules="rules.subjectRateRule">
                <el-input v-model.number="val.subjectRate"></el-input>
                %
              </el-form-item>
              <el-button type="danger" @click="deleteProperty(index)">删除-</el-button>
            </div>
          </div>
          <el-form-item label="最小投资金额" prop="minInvAmount">
            <el-input v-model.number="ruleForm.minInvAmount" placeholder="最小投资金额" >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>

          <el-form-item label="投资递增金额" prop="stepInvAmount">
            <el-input v-model.number="ruleForm.stepInvAmount" placeholder="投资递增金额">
              <template slot="append">元</template>
            </el-input>

          </el-form-item>

          <el-form-item label="募集期天数" prop="passDays">
            <el-input v-model.number="ruleForm.passDays" placeholder="募集期天数">
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
          <el-form-item label="已验收资料" >
            <template v-if="showPersonnel">
              <el-checkbox-group v-model="isAccepteData_personnel">
                <el-checkbox label="isAccepteData_personnel" name="isAccepteData_personnel" disabled>小微</el-checkbox>
              </el-checkbox-group>
              <el-form-item prop="accepteData_personnel">
              <el-checkbox-group v-model="ruleForm.accepteData_personnel" class="personnel" >
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
              </el-form-item>
            </template >
            <template v-if="showEnterprise">
              <el-checkbox-group v-model="isAccepteData_personnel">
                <el-checkbox label="isAccepteData_enterprise" name="isAccepteData_enterprise" disabled>供应链</el-checkbox>
              </el-checkbox-group>
            <el-form-item prop="accepteData_enterprise">
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
            </el-form-item>
            </template >
          </el-form-item>

        </div>
        <el-form-item label="渠道说明" prop="detail">
          <el-input type="textarea" v-model="ruleForm.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      const checkDecimal = (rule, value, callback) => {
            if (!Number.isInteger(value)||value<=0) {
            callback(new Error('请输入大于0的整数'));
          } else {
                const arr=this.ruleForm.alldata.sort();
                for(var i=0;i<arr .length-1;i++){
                  if(arr[i].decimal==arr[i+1].decimal){
                    callback(new Error('资产期数不能重复'));
                  }
                }
              callback();
          }
      };
      const checkAssetRate=(rule, value, callback) => {
        if (value<=0) {
          callback(new Error('不能小于0'));
        } else {
          callback();
        }
      };
      const checkServiceRate=(rule, value, callback) => {
        if (value<=0) {
          callback(new Error('不能小于0'));
        } else {
          this.ruleForm.alldata.forEach((val,index)=>{
              if(val.serviceRate>=val.assetRate){
                callback(new Error('应小于资产年化利率'));
              }else{
                callback();
              }
          })
        }
      };
      const checkSubjectRate=(rule, value, callback) => {
        if (value<=0) {
          callback(new Error('不能小于0'));
        } else {
          this.ruleForm.alldata.forEach((val,index)=>{
            if(val.subjectRate>=val.assetRate){
              callback(new Error('应小于资产年化利率'));
            }else{
              callback();
            }
          })
        }
      };
      const checkMinInvAmount = (rule, value, callback) => {
        if (value<0) {
          callback(new Error('请输入不小于0的数'));
        } else if( !/^[1-9]+\d*(\.\d{0,2})?$|^0?\.\d{0,2}$/.test(value)) {
          callback(new Error('请输入不超过小数点后2位的数字'));
        }else{
          callback()
        }
      };
      const checkStepInvAmount = (rule, value, callback) => {
        if (value<0.01) {
          callback(new Error('不能小于0.01'));
        } else if( !/^[1-9]+\d*(\.\d{0,2})?$|^0?\.\d{0,2}$/.test(value)) {
          callback(new Error('请输入不超过小数点后2位的数字'));
        }else{
          callback()
        }
      };
      const checkPassDays = (rule, value, callback) => {
        if(!/^[1-9]\d*$/.test(value)) {
          callback(new Error('必须填写正整数'));
        }else{
          callback()
        }
      };

      return {
        ruleForm: {
          channelCode: '',
          title: '',
          bizPersonnelType: [],
          lineType: 'ON_LINE',
          manager: '',
          alldata: [{
            decimal:'',assetRate:'',serviceRate:'',subjectRate:''
          }],
          minInvAmount: '',
          stepInvAmount: '',
          passDays: '',
          description: '',
          repaymentSource: '',
          repayGuarantee: '',
          riskManageStep: '',
          riskAlert: '',
          addTrustMeasures: '',
          accepteData_personnel: [],
          accepteData_enterprise: []
        },
        online: true,
        showPersonnel: false,
        showEnterprise: false,
        msg:'新增渠道',
        id:'',
        //更新渠道负责人是否勾选
        managerUpdateChecked:false,
        isAccepteData_personnel: ['isAccepteData_personnel', 'isAccepteData_enterprise'],
        submitData:{},
        rules: {
          channelCode: [
            {required: true, message: '渠道编码不能为空', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '渠道名称不能为空', trigger: 'blur'},
          ],
          bizPersonnelType: [
            {type: 'array', required: true, message: '请至少选择一个资产类型', trigger: 'change'}
          ],
          manager: [
            {required: true, message: '渠道负责人不能为空', trigger: 'blur'},
          ],
          decimalRule: [
            {required: true, message: '资产期数不能为空', trigger: 'blur'},
            { type: 'number', message: '资产期数必须为数字值',trigger: 'blur'},
            { validator: checkDecimal, trigger: 'blur' }
          ],
          assetRateRule: [
            {required: true, message: '资产年化利率不能为空', trigger: 'blur'},
            { type: 'number', message: '资产年化利率为数字值'},
            { validator: checkAssetRate, trigger: 'blur' }
          ],
          serviceRateRule: [
            {required: true, message: '前端服务费率不能为空', trigger: 'blur'},
            { type: 'number', message: '前端服务费率必须为数字值',trigger: 'blur'},
            { validator: checkServiceRate, trigger: 'blur' }
          ],
          subjectRateRule: [
            {required: true, message: '标的年利率不能为空', trigger: 'blur'},
            { type: 'number', message: '标的年利率必须为数字值',trigger: 'blur'},
            { validator: checkSubjectRate, trigger: 'blur' }
          ],
          minInvAmount: [
            {required: true, message: '最小投资金额不能为空', trigger: 'blur'},
            {type: 'number', message: '请输入最小投资金额为数字值',trigger: 'blur'},
            { validator: checkMinInvAmount, trigger: 'blur' }
          ],
          stepInvAmount: [
            {required: true, message: '投资递增金额不能为空', trigger: 'blur'},
            {type: 'number', message: '投资递增金额为数字值',trigger: 'blur'},
            { validator: checkStepInvAmount, trigger: 'blur' }

          ],
          passDays: [
            { required: true, message: '募集期天数不能为空'},
            { type: 'number', message: '募集期天数必须为正整数'},
            { validator: checkPassDays, trigger: 'blur' }
          ],
          description: [
            {required: true, message: '资产描述不能为空', trigger: 'blur'},
            {max: 400, message: '请输入不超过 400 个字符', trigger: 'blur' }
          ],
          repaymentSource: [
            {required: true, message: '还款来源不能为空', trigger: 'blur'},
            {max: 400, message: '请输入不超过 400 个字符', trigger: 'blur' }
          ],
          repayGuarantee: [
            {required: true, message: '还款保障不能为空', trigger: 'blur'},
            {max: 400, message: '请输入不超过 400 个字符', trigger: 'blur' }
          ],
          riskManageStep: [
            {required: true, message: '风控措施不能为空', trigger: 'blur'},
            {max: 400, message: '请输入不超过 400 个字符', trigger: 'blur' }
          ],
          riskAlert: [
            {required: true, message: '项目风险提醒不能为空', trigger: 'blur'},
            {max: 400, message: '请输入不超过 400 个字符', trigger: 'blur' }
          ],
          addTrustMeasures: [
            {required: true, message: '增信措施不能为空', trigger: 'blur'},
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
              if (this.ruleForm.lineType == 'OFF_LINE') {
                this.submitData={
                  channelCode:this.ruleForm.channelCode,
                  title:this.ruleForm.title,
                  bizPersonnelType:this.ruleForm.bizPersonnelType.join(','),
                  lineType:this.ruleForm.lineType,
                  manager:this.ruleForm.manager,
                  detail:this.ruleForm.detail
                }
              } else {
                this.submitData={
                  channelCode:this.ruleForm.channelCode,
                  title:this.ruleForm.title,
                  bizPersonnelType:this.ruleForm.bizPersonnelType.join(','),
                  lineType:this.ruleForm.lineType,
                  manager:this.ruleForm.manager,
                  alldata:this.ruleForm.alldata,
                  minInvAmount:this.ruleForm.minInvAmount,
                  stepInvAmount:this.ruleForm.stepInvAmount,
                  passDays:this.ruleForm.passDays,
                  description:this.ruleForm.description,
                  repaymentSource:this.ruleForm.repaymentSource,
                  repayGuarantee:this.ruleForm.repayGuarantee,
                  riskManageStep:this.ruleForm.riskManageStep,
                  riskAlert:this.ruleForm.riskAlert,
                  addTrustMeasures:this.ruleForm.addTrustMeasures,
                  acceptedData:this.ruleForm.accepteData_personnel.concat(this.ruleForm.accepteData_enterprise).join(','),
                  detail:this.ruleForm.detail
                }
              }
              if(this.id){
                this.submitData.id=this.id
                if(this.managerUpdateChecked){
                  this.submitData.managerUpdateFlag=1
                }
                this.$axios({
                  url: '/admin/api/assetsChannel/updateAssetsChannel',
                  method: 'post',
                  data: JSON.stringify(this.submitData),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then( (response)=> {
                  this.$message({
                    message: '创建渠道成功',
                    type: 'success'
                  });
                  this.$router.push('/admin/allassetslist')
                }).catch( (error)=> {
                  this.$message.error('创建渠道失败');
                  alert("创建渠道失败");
                });
              }else{
                this.$axios({
                  url: '/admin/api/assetsChannel/createAssetsChannel',
                  method: 'post',
                  data: JSON.stringify(this.submitData),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then( (response)=> {
                  alert("创建渠道成功");
                  this.$router.push('/admin/allassetslist')
                }).catch( (error)=> {
                  alert("创建渠道失败");
                  console.log(error);
                });
              }

            } else {
              console.log('error submit!!');
              return false;
            }
          }
        );
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        history.go(-1);
      },
      addProperty(){
        this.ruleForm.alldata.push({
          decimal:'',assetRate:'',serviceRate:'',subjectRate:''
        });
      },
      deleteProperty(index){
        if (this.ruleForm.alldata.length == 1) {
          return
        }
        this.ruleForm.alldata.splice(index, 1)
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
          this.showEnterprise = true;
        } else {
          this.showEnterprise = false;
        }
        if (val.includes('PERSONNEL')) {
          this.showPersonnel = true;
        } else {
          this.showPersonnel = false;
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
    mounted(){
        //有序号就是编辑
      this.id=this.$route.query.id;
      if(this.id){
       this.msg='编辑渠道'
       this.$axios({
         url: `/api/assetsChannel/${this.id}`,
       }).then( (res)=> {
         if(res.data.lineType=='OFF_LINE'){
             this.ruleForm.channelCode=res.data.channelCode
             this.ruleForm.title=res.data.title
             this.ruleForm.bizPersonnelType=res.data.bizPersonnelType.split(',')
             this.ruleForm.lineType=res.data.lineType
             this.ruleForm.manager=res.data.manager
             this.ruleForm.detail=res.data.detail
         }else{
            this.ruleForm.channelCode=res.data.channelCode
            this.ruleForm.title=res.data.title
            this.ruleForm.bizPersonnelType=res.data.bizPersonnelType.split(',')
            this.ruleForm.lineType=res.data.lineType
            this.ruleForm.manager=res.data.manager
            this.ruleForm.minInvAmount=res.data.minInvAmount
            this.ruleForm.stepInvAmount=res.data.stepInvAmount
            this.ruleForm.passDays=res.data.passDays
            this.ruleForm.description=res.data.description
            this.ruleForm.repaymentSource=res.data.repaymentSource
            this.ruleForm.repayGuarantee=res.data.repayGuarantee
            this.ruleForm.riskManageStep=res.data.riskManageStep
            this.ruleForm.riskAlert=res.data.riskAlert
            this.ruleForm.addTrustMeasures=res.data.addTrustMeasures
            this.ruleForm.detail=res.data.manager
           for(var i=0;i<res.data.rateList.length;i++){
             this.ruleForm.alldata[i].decimal=res.data.rateList[i].num_instal;
             this.ruleForm.alldata[i].assetRate=res.data.rateList[i].ASSET_RATE*100;
             this.ruleForm.alldata[i].serviceRate=res.data.rateList[i].SERVICE_RATE*100;
             this.ruleForm.alldata[i].subjectRate=res.data.rateList[i].SUBJECT_RATE*100;
           }
           const self=this
           setTimeout(()=>{
             const $accepteData_enterprise = $("input[name=accepteData_enterprise]");
             const $accepteData_personnel = $("input[name=accepteData_personnel]");
             $accepteData_enterprise.each(function(i){
                 var accepteDatasArray=res.data.acceptedData.split(',')
               for (i=0; i<accepteDatasArray.length; i++){
                 if($(this).val()==accepteDatasArray[i]){
                   self.ruleForm.accepteData_enterprise.push($(this).val())
                 }
               }
             });
             $accepteData_personnel.each(function(i){
               var accepteDatasArray=res.data.acceptedData.split(',')
               for (i=0; i<accepteDatasArray.length; i++){
                 if($(this).val()==accepteDatasArray[i]){
                   self.ruleForm.accepteData_personnel.push($(this).val())
                 }
               }
             });
           },0)

         }
       }).catch( (error)=> {
         alert("创建渠道失败");
         console.log(error);
       });
     }

    }
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
    background: #eee;
    padding-top: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .property-set .el-form-item {
    margin-right: 20px;
    display: inline-block;

  .el-input {
    width: 120px;
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

  button{
    width: 150px;
  }
</style>
