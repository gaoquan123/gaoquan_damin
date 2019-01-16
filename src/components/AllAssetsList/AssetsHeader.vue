<template>
      <div>
           <!-- 第一排 -->
            <div class="w100 fl sumInput">
                  <div class="fl w30">
                        <el-input class="w80" placeholder="请输入资产名称" v-model="FromData.loanAssetName">
                                <template slot="prepend">资产名称</template>
                        </el-input>
                    </div>
                    <div class="fl" style="width:26%">
                        <span class="ipt fl">资产类型</span>
                        <el-select v-model="FromData.bizPersonnelType" class="w60" placeholder="请选择">
                            <el-option
                            v-for="item in bizPersonnelTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="fl">
                        <span class="ipt">资产到期日</span>
                        <el-date-picker
                            v-model="input2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                            </el-date-picker>
                    </div>
            </div>

            <!-- 第二排 -->
            <div class="w100 fl sumInput">
                <div class="fl w30">
                    <el-input class="w80" placeholder="请输入资产名称" v-model="FromData.userName">
                        <template slot="prepend">用户名</template>
                    </el-input>
                </div>
                <div class="fl" style="width:26%">
                    <span class="ipt">资产状态</span>
                    <el-select class="w60" v-model="FromData.state" placeholder="请选择资产状态">
                        <el-option
                            v-for="item in stateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                </div>
                <div class="fl">
                        <el-input class="fl" style="width:236px;" placeholder="请输入内容" v-model="FromData.startRemaindAmount">
                        <template slot="prepend">剩余资产规模</template>
                        </el-input>
                    <div class="fl ">
                        <span class="cl_text">到</span>
                        <el-input style="width:170px;" class="m-l-20" v-model="FromData.endRemaindAmount" placeholder="请输入内容"></el-input>
                    </div> 
                </div>
            </div>
            <!-- 第三排 -->

                <div class="w100 fl sumInput">
                <div class="fl w30">
                    <el-input class="w80" placeholder="请输入标名" v-model="FromData.subjectTitle">
                        <template slot="prepend">标名</template>
                    </el-input>
                </div>
                <div class="fl" style="width:26%">
                    <span class="ipt">资产模式</span>
                    <el-select class="w60" v-model="FromData.model" placeholder="请选择资产模式">
                        <el-option
                            v-for="item in modelOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl">
                    <span class="ipt">资产起始日</span>
                        <el-date-picker
                            v-model="input3"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                     </el-date-picker>
                </div>
            </div>

            <!-- 第四排 -->

                <div class="w100 fl sumInput">
                <div class="fl w30">
                    <el-input class="w80" placeholder="请输入资产期限天数" v-model="FromData.limitDays">
                        <template slot="prepend">资产期限</template>
                    </el-input>
                </div>
                <div class="fl" style="width:26%">
                    <span class="ipt">还款方式</span>
                    <el-select class="w60" v-model="FromData.repaymentType" placeholder="请选择还款方式">
                        <el-option
                            v-for="item in repaymentTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl">
                    <span class="ipt">所属渠道商</span>
                    <el-select class="w60" v-model="FromData.channelId" placeholder="请选择">
                        <el-option
                                v-for="item in channelIdOptions"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <!-- 第五排 -->
                <div class="w100 fl sumInput">
                <div class="fl w30">
                    <el-input class="w80" placeholder="请输入剩余天数" v-model="FromData.remainingDays">
                        <template slot="prepend">剩余天数</template>
                    </el-input>
                </div>
                <div class="fl" style="width:26%">
                    <span class="ipt">零剩余资产</span>
                    <el-select class="w60" v-model="FromData.remaindAmountIsZero" placeholder="请选择">
                        <el-option
                            v-for="item in remaindAmountIsZeroOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl">
                    <span class="ipt">资产所属公司</span>
                    <el-select class="w60" v-model="FromData.assetsOfCompany" placeholder="请选择">
                        <el-option
                        v-for="item in assetsOfCompanyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <!-- 按钮筛选与导出 -->
             <div class="cl sumInput fl">
                    <el-button  v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn1')" type="primary">个金资产报表导出<i class="el-icon-download el-icon--right"></i></el-button>
                    <el-button  v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn2')" type="success">对公资产报表导出<i class="el-icon-download el-icon--right"></i></el-button>
                    <el-button  v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn3')" type="primary">标的报表到出<i class="el-icon-download el-icon--right"></i></el-button>
                    <el-button  v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn4')" type="info">历史数据处理<i class="el-icon-printer el-icon--right"></i></el-button>
                    <el-button  @click="clearBtn()" type="danger">清空<i class="el-icon-delete el-icon--right"></i></el-button>
                    <el-button  @click="QueryBtn()" type="primary">搜索<i class="el-icon-search el-icon--right"></i></el-button>
                    <el-button  v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn6')" type="warning">新增资产<i class="el-icon-plus el-icon--right"></i></el-button>
            </div>
            <!-- 分页条 -->
            <div class="pages w100 h100 p-t-40 p-b-40 cl">
                <div class="block">
                    <el-pagination
                        v-if="paginationShow"
                        background
                        layout="prev, pager, next,jumper"
                        @current-change="handleCurrentChange"
                        :total="this.$store.state.allassetslist.getLoanAssetList.totalCount">
                    </el-pagination>
                </div>
                <AssetsBottom :FromData="FromData"></AssetsBottom>
            </div>
      </div>
</template>
<script>
import { dealElement, formatDate } from "PublicMethods/MethodsJs";
import AssetsBottom from "./AssetsBottom";

export default {
  data() {
    return {
      // 从新加载组件
      paginationShow: true,
      //资产到期日
      input2: "",
      // 资产起始日
      input3: "",
      FromData: {
        loanAssetName: "", // 资产名称
        bizPersonnelType: "", // 资产类型
        endTimeFrom: "", //资产到期日
        endTimeTo: "", //资产到期日
        userName: "", // 用户名
        state: "", //资产状态
        startRemaindAmount: "", // 剩余资产规模
        endRemaindAmount: "", // 剩余资产规模
        subjectTitle: "", // 标名
        model: "", // 资产模式
        startTimeFrom: "", // 资产起始日
        startTimeTo: "", // 资产起始日
        limitDays: "", // 资产期限
        repaymentType: "", //还款方式
        channelId: "", //  所属渠道商
        remainingDays: "", //剩余天数
        remaindAmountIsZero: "", // 零剩余天数
        assetsOfCompany: "", //  资产所属公司
        page: 1,
        pageLimit: 10
      },
      // 资产类型
      bizPersonnelTypeOptions: [
        { value: "BIZ", label: "供应链" },
        { value: "PERSONNEL", label: "小微" }
      ],

      //资产状态
      stateOptions: [
        { value: "EXISTENCE", label: "存续中" },
        { value: "PARTIAL_MATURITY", label: "部分到期" },
        { value: "PREMATURE_MATURITY", label: "提前到期" },
        { value: "MATURITY", label: "已到期" }
      ],
      // 资产模式
      modelOptions: [
        { value: "TRANSFER", label: "债权" },
        { value: "DIRECT", label: "直投" }
      ],

      //还款方式
      repaymentTypeOptions: [
        { value: "ALL", label: "全部" },
        { value: "ONCE_PRINCIPAL_AND_INTEREST", label: "到期一次性还本付息" },
        { value: "MATCHING_PRINCIPAL_AND_INTEREST", label: "等额本息" }
      ],
      //  所属渠道商
      channelIdOptions: [],
      // 零剩余天数
      remaindAmountIsZeroOptions: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ],
      //  资产所属公司
      assetsOfCompanyOptions: [
        { value: "", label: "全部" },
        { value: "NULL", label: "其他" },
        { value: "众邦保理", label: "众邦保理" },
        { value: "众邦融资租赁", label: "众邦融资租赁" },
        { value: "杭州九鱼", label: "杭州九鱼" },
        { value: "卓尔金服", label: "卓尔金服" },
        { value: "汉口北担保", label: "汉口北担保" },
        { value: "业务一部", label: "业务一部" },
        { value: "业务二部", label: "业务二部" },
        { value: "业务三部", label: "业务三部" },
        { value: "供应链团队", label: "供应链团队" },
        { value: "嘉实金服", label: "嘉实金服" }
      ],

      // 资产到期日
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 分页
    handleCurrentChange(currentPage) {
      this.FromData.page = currentPage;
      this.$store.dispatch("LoanAssetList", dealElement(this.FromData));
    },
    // 查询
    QueryBtn() {
      // 资产到期日时间转换
      if (this.input2) {
        this.FromData.endTimeFrom = formatDate(this.input2[0]);
        this.FromData.endTimeTo = formatDate(this.input2[1]);
      } else {
        this.FromData.endTimeFrom = "";
        this.FromData.endTimeTo = "";
      }
      if (this.input3) {
        this.FromData.startTimeFrom = formatDate(this.input3[0]);
        this.FromData.startTimeTo = formatDate(this.input3[1]);
      } else {
        this.FromData.endTimeFrom = "";
        this.FromData.endTimeTo = "";
      }
      // 从新加载组件
      this.paginationShow = false;
      this.handleCurrentChange(1);
      this.$nextTick(function() {
        this.paginationShow = true;
      });
    },
    // 清空
    clearBtn() {
      Object.keys(this.FromData).forEach((key, val) => {
        if (key == "page" || key == "pageLimit" || key == "userName") {
          return;
        } else {
          this.FromData[key] = "";
        }
        this.input2 = "";
        this.input3 = "";
      });
      // 从新加载组件
      this.paginationShow = false;
      this.handleCurrentChange(1);
      this.$nextTick(function() {
        this.paginationShow = true;
      });
    },
    //  所属渠道商
    request() {
      this.$axios.get("/admin/api/loanChannels").then(res => {
        this.channelIdOptions = res.data;
      });
    }
  },
  created() {
    this.request();
    this.$store.dispatch("LoanAssetList", dealElement(this.FromData));
  },
  components: {
    AssetsBottom
  }
};
</script>
<style lang="less" scoped>
/deep/ .is-top {
  font-size: 18px;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0;
}
.sumInput {
  height: 50px;
  margin-top: 25px;
}
.cl_text {
  float: left;
  height: 0px;
  position: relative;
  top: 14px;
  left: 3px;
}
.el-pagination {
  text-align: center;
  margin-bottom: 50px;
}
.el-button{
    padding: 12px 12px;
}
</style>
