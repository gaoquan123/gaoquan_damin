<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/usermanage' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>出借人风险金额设置</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="front-20 m-t-30"> 出借人风险金额设置</h3>
    <div class="m-t-20 risk-box" v-for="(val,index) in riskList" :key="index">
      <span>{{val.riskLimitName}}：</span>
      <el-input placeholder="请输入内容" v-model="val.riskLimit">
        <el-button slot="append" @click="update">更新</el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        riskList: []
      }
    },
    methods: {
      update(){
        this.$axios({
          url: '/api/users/dict/riskAmount/update',
          method: 'post',
          data:'60000,3000,1118000,2000',
          headers: {
            'csrf-token': Cookies.get('_csrf'),
          }
        }).then(res => {
          this.getRiskInfo()
        }).catch(err => {

        })
      },
      getRiskInfo(){
        //当你利用索引直接设置一个项时，Vue 不能检测以下变动的数组,自己定义一个数组
        let risk = []
        //获取金额
        this.$axios({
          url: 'admin/api/users/dict/riskAmount',
        }).then(res => {
          const riskLimit = res.data.riskLimit.split(',');
          riskLimit.forEach((val, i) => {
            risk.push({riskLimit: val})
          })
        }).catch(err => {
          //获取名字
        }).then(() => {
          this.$axios({
            url: 'admin/api/users/dict/riskLimitName',
          }).then(res => {
            const riskLimitName = res.data.riskLimitName.split(',');
            riskLimitName.forEach((val, i) => {
              risk[i].riskLimitName = val
              this.riskList = risk;
            })
          }).catch(err => {
          })
        })
      }
    },
    created(){
      this.getRiskInfo()
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

  .risk-box {
    margin-left: 300px;
  }

  span{
    font-weight: 700;
  }

  .el-input {
    width: 500px;
  }

</style>
