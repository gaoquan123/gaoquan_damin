<template>
    <div class="newsubject">
        <h1 class="front-22 m-t-30 color">编辑资产</h1>
        <div class="Newform m-t-50">
            <el-form ref="form" :model="ruleForm" label-width="150px">
                <el-form-item label="资产所属人">
                    <el-input disabled></el-input>
                </el-form-item>

                <el-form-item label="资产类型">
					<el-radio-group>
						<el-radio disabled label="BIZ"  border size="medium">供应链</el-radio>
						<el-radio disabled label="PERSONNEL" border size="medium">小微</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="资产名称" prop="region">
                    <el-input disabled></el-input>
                </el-form-item>

                <el-form-item label="资产规模">
                    <el-input placeholder="请输入内容">
                        <template slot="append">¥</template>
                    </el-input>
                    <el-button>资产剩余额度查询</el-button>
                </el-form-item>

                <el-form-item label="还款方式" prop="region">
                    <el-select placeholder="请选择还款方式">
                        <el-option label="到期一次性还本付息" value="ONCE_PRINCIPAL_AND_INTEREST"></el-option>
                        <el-option label="等额本息" value="MATCHING_PRINCIPAL_AND_INTEREST"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资产所属公司" prop="region">
                    <el-select placeholder="请选择资产所属公司">
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
					<el-radio-group>
						<el-radio disabled label="BIZ"  border size="medium">固定日期</el-radio>
						<el-radio disabled label="PERSONNEL" border size="medium">固定期限</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="资产起始日">
                        <el-date-picker
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                 <el-form-item label="资产到期日">
                        <el-date-picker
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="资产期限">
                    <el-input disabled>
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="宽限期" >
                    <el-input  placeholder="请输入内容">
                        <template slot="append">天</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="资产年华利率">
                    <el-input  placeholder="请输入内容">
                        <template slot="append">％</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="风险等级" prop="region">
                    <el-select placeholder="请选择风险等级">
                        <el-option label="高风险" value="1"></el-option>
                        <el-option label="较高风险" value="1"></el-option>
                        <el-option label="中等风险" value="1"></el-option>
                        <el-option label="低级风险" value="1"></el-option>
                        <el-option label="极低风险" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="风险限额">
                    <el-input  placeholder="请输入内容">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="资产模式" >
					<el-radio-group>
						<el-radio label="DIRECT"  border size="medium">直投</el-radio>
						<el-radio label="COLLECT" border size="medium">受托支付</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="所属渠道" prop="region">
                    <el-select placeholder="请选择所属渠道">
                        <el-option label="高风险" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款人主体性质" >
					<el-radio-group>
						<el-radio label="natural"  border size="medium">自然人</el-radio>
						<el-radio label="legal" border size="medium">法人</el-radio>
						<el-radio label="other" border size="medium">其它组织</el-radio>
					</el-radio-group>
				</el-form-item>

                <el-form-item label="借款人工作性质" prop="region">
                    <el-select placeholder="请选择借款人工作性质">
                        <el-option label="公司白领" value="1"></el-option>
                        <el-option label="商人" value="2"></el-option>
                        <el-option label="工人" value="3"></el-option>
                        <el-option label="农民" value="4"></el-option>
                        <el-option label="学生" value="5"></el-option>
                        <el-option label="自由职业" value="6"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款人所属行业" prop="region">
                    <el-select placeholder="请选择借借款人所属行业">
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
                    <el-select placeholder="请选择月均收入">
                        <el-option label="2000元以下" value="1"></el-option>
                        <el-option label="2001-5000" value="2"></el-option>
                        <el-option label="5001-10000" value="3"></el-option>
                        <el-option label="10001-20000" value="4"></el-option>
                        <el-option label="20001-50000" value="11"></el-option>
                        <el-option label="50001-100000" value="12"></el-option>
                        <el-option label="100000以上" value="13"></el-option>

                        <el-option label="5万以下" value="6"></el-option>
                        <el-option label="5万-20万" value="7"></el-option>
                        <el-option label="20万-50万" value="8"></el-option>
                        <el-option label="50-100万" value="9"></el-option>
                        <el-option label="100万以上" value="10"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="负债情况">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="其他P2P平台借款">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="征信情况">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="平台逾期次数">
                    <el-input  placeholder="请输入内容">
                        <template slot="append">次</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="平台逾期总金额">
                    <el-input  placeholder="请输入内容">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="资产描述">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="借款用途">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="还款来源">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="还款保障">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="风控措施">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="项目风险提醒">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="增信措施">
                    <el-input type="textarea"></el-input>
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
      // from默认数据
      ruleForm: {
        name: "",
        title: "",
        payWay: "",
        remaindAmount: "",
        limitDays: "",
        type: "",
        date1: "",
        date2: "",
        delivery: false,
        resource: "",
        desc: "",
        value: "",
        region: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
    //隐藏按钮
    displayBtn() {
      $(".box-card").hide();
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
    }
  },
  created() {
    this.reloadsUserInfo();
    this.reloadsApiInfo();
  }
};
</script>
<style lang="less" scoped>
.Newform {
  position: relative;
  left: 50%;
  margin-left: -40%;
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
