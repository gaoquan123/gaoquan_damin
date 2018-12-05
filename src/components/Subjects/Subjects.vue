<template>
  <el-tabs v-model="activeName2"  @tab-click="handleClick">
        <el-tab-pane label="未上架" name="tab1">
            <SubjectQuery></SubjectQuery>
        </el-tab-pane>
        <el-tab-pane label="募集中" name="tab2">
            <SubjectQuery></SubjectQuery>


        </el-tab-pane>
        <el-tab-pane label="满标待放款" name="tab3">满标待放款

        </el-tab-pane>
        <el-tab-pane label="流标" name="tab4">流标

        </el-tab-pane>
        <el-tab-pane label="回款中" name="tab5">回款中

        </el-tab-pane>
        <el-tab-pane label="回款完成" name="tab6">回款完成

        </el-tab-pane>
        <el-tab-pane label="已下架" name="tab7">已下架

        </el-tab-pane>
        <el-tab-pane label="已撤销" name="tab8">已撤销

        </el-tab-pane>
        <el-tab-pane label="代偿中" name="tab9">代偿中

        </el-tab-pane>
        <el-tab-pane label="已还款代偿" name="tab10">已还款代偿

        </el-tab-pane>
        <el-tab-pane label="中间状态" name="tab11">流标

        </el-tab-pane>
        <el-tab-pane label="还款详情" name="tab12">流标
            
        </el-tab-pane>
  </el-tabs>
</template>
<script>
import SubjectQuery from './SubjectQuery'
  export default {
    data() {
      return {
        activeName2: 'tab1'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
        SubjectQuery
    }
  };
</script>
<style lang="less" scoped>

</style>
