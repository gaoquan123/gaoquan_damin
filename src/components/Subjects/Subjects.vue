<template>
    <div>
          <h3>标的管理</h3>
            <el-tabs v-model="active"  @tab-click="handleClick">
                    <el-tab-pane label="未上架" name="NEW"></el-tab-pane>
                    <el-tab-pane label="募集中" name="FUNDING"></el-tab-pane>
                    <el-tab-pane label="满标待放款" name="FUNDED"></el-tab-pane>
                    <el-tab-pane label="流标" name="PASS"></el-tab-pane>
                    <el-tab-pane label="回款中" name="PENDING"></el-tab-pane>
                    <el-tab-pane label="回款完成" name="DONE"></el-tab-pane>
                    <el-tab-pane label="已下架" name="UN_SHELVE"></el-tab-pane>
                    <el-tab-pane label="已撤销" name="ABORT"></el-tab-pane>
                    <el-tab-pane label="逾期中" name="PENDING2"></el-tab-pane>
                    <el-tab-pane label="代偿中" name="COMPENSATORY_REQUESTING"></el-tab-pane>
                    <el-tab-pane label="已还款代偿" name="COMPENSATORY_DONE"></el-tab-pane>
                    <el-tab-pane label="中间状态" name="PASS_PENDING"></el-tab-pane>
                    <el-tab-pane label="还款详情" name="REPAYMENT_DETAILS"></el-tab-pane>
                    <SubjectQuery :active="active"></SubjectQuery>
            </el-tabs>
    </div>
</template>
<script>
import SubjectQuery from './SubjectQuery'

  export default {
    data() {
      return {
        active: 'NEW',
      
      };
    },
    methods: {
      handleClick(tab, event) {
        // var ItemRouter  = this.opstion.filter((item)=>{
        //      return item.name == tab.label;
        // })[0]
        // this.$router.push({path:ItemRouter.path})
      },
    },
  
    components: {
        SubjectQuery,
    }
  };
</script>
<style lang="less" scoped>
 /deep/.el-tabs__item{
        font-size: 16px !important;
    }
    h3{
        font-size: 24px;
        margin-bottom: 25px;
        color: #4f9dff;
    }
</style>
