<template>
  <el-tabs v-model="active"  @tab-click="handleClick">
        <el-tab-pane label="未上架" name="NEW">
            <SubjectQuery :active="active"></SubjectQuery>
            <NewTable></NewTable>
        </el-tab-pane>
        <el-tab-pane label="募集中" name="FUNDING">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>
        <el-tab-pane label="满标待放款" name="FUNDED">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->
        </el-tab-pane>
        <el-tab-pane label="流标" name="PASS">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>
        <el-tab-pane label="回款中" name="PENDING">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>
        <el-tab-pane label="回款完成" name="DONE">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>
        <el-tab-pane label="已下架" name="UN_SHELVE">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>
        
        <el-tab-pane label="已撤销" name="ABORT">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>

        <el-tab-pane label="逾期中" name="PENDING2">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>

        <el-tab-pane label="代偿中" name="COMPENSATORY_REQUESTING">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>
        <el-tab-pane label="已还款代偿" name="COMPENSATORY_DONE">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->

        </el-tab-pane>

        <el-tab-pane label="中间状态" name="PASS_PENDING">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->


        </el-tab-pane>

        <el-tab-pane label="还款详情" name="REPAYMENT_DETAILS">
            <!-- <SubjectQuery :active="active"></SubjectQuery> -->
            
        </el-tab-pane>
  </el-tabs>
</template>
<script>
import SubjectQuery from './SubjectQuery'
import NewTable from './subjectTablePage/NewTable'
  export default {
    data() {
      return {
        active: 'NEW'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    },
    components: {
        SubjectQuery,
        NewTable
    }
  };
</script>
<style lang="less" scoped>

</style>
