<template>
    <div>
          <h3 class="btn2">标的管理</h3>
            <el-tabs v-model="active"  @tab-click="handleClick">
                <!-- v-if="DataRoles($store.state.login.roles,'subjectsTab1')" -->
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab1')" class="tabsBoxlist" data-type="NEW" label="未上架" name="NEW"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab2')" class="tabsBoxlist" data-type="FUNDING" label="募集中" name="FUNDING"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab3')" class="tabsBoxlist" data-type="FUNDED" label="满标待放款" name="FUNDED"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab4')" class="tabsBoxlist" data-type="PASS" label="流标" name="PASS"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab5')" class="tabsBoxlist" data-type="PENDING" label="回款中" name="PENDING"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab6')" class="tabsBoxlist" data-type="DONE" label="回款完成" name="DONE"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab7')" class="tabsBoxlist" data-type="UN_SHELVE" label="已下架" name="UN_SHELVE"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab8')" class="tabsBoxlist" data-type="ABORT" label="已撤销" name="ABORT"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab9')" class="tabsBoxlist" data-type="PENDING2" label="逾期中" name="PENDING2"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab10')" class="tabsBoxlist" data-type="COMPENSATORY_REQUESTING" label="代偿中" name="COMPENSATORY_REQUESTING"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab11')" class="tabsBoxlist" data-type="COMPENSATORY_DONE" label="已还款代偿" name="COMPENSATORY_DONE"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab12')" class="tabsBoxlist" data-type="PASS_PENDING" label="中间状态" name="PASS_PENDING"></el-tab-pane>
                    <el-tab-pane v-if="DataRoles($store.state.login.roles,'subjectsTab13')" class="tabsBoxlist" data-type="REPAYMENT_DETAILS" label="还款详情" name="REPAYMENT_DETAILS"></el-tab-pane>
                    <SubjectQuery :active="active"></SubjectQuery>
            </el-tabs>
    </div>
</template>
<script>
import SubjectQuery from './SubjectQuery'

  export default {
    data() {
      return {
        active: '',
      
      };
    },
    methods: {
      handleClick(tab, event) {
      },
    },
  
    components: {
        SubjectQuery,
    },
  
    mounted: function() {
        const self = this;
        self.active =  $(".tabsBoxlist")[0].getAttribute("data-type") 
    },

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
