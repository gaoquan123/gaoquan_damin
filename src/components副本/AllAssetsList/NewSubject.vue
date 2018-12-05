<template>
    <div class="newsubject">
        <h1 class="front-22 m-t-30 color">创建个人借款标的</h1>
        <div class="Newform m-t-50">

            <el-form ref="form" :model="ruleForm" label-width="150px">

                <el-form-item label="标的项目名称">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="标的项目类别" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择项目类型">
                        <el-option label="个人借款" value="shanghai"></el-option>
                        <el-option label="新手标" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款金额">
                    <el-input placeholder="请输入内容" v-model="ruleForm.name">
                        <template slot="append">¥</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="分期方式" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择分期方式">
                        <el-option label="到期还本付息" value="shanghai"></el-option>
                        <el-option label="等额本息" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="借款期限">
                    <el-input disabled placeholder="请输入内容" v-model="ruleForm.name">
                        <template slot="append">天</template>
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
            <!-- 右边卡片 -->
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>个人借款用户信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">借款人姓名:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
    <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">身份证号:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
    <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">性别:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
     <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">年龄:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>


      <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">学历:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
      <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">婚姻情况:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
      <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">房产情况:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
      <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">工作行业:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>

    <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">工作城市:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
    <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">工作年限:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>
    <el-row class="text item row">
        <el-col :span="12"><div class="grid-content bg-purple">年收入:</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">朱天天</div></el-col>
    </el-row>

</el-card>

          
        </div>
    </div>
</template>
<script>
    export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="less" scoped>
.Newform{
        position: relative;
        left: 50%;
        margin-left: -30%;
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
    width: 400px;
    position: fixed;
    right: 100px;
    top: 200px;
    float: right;
  }
</style>
