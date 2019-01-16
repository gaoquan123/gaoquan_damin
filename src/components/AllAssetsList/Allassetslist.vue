<template>
        <div class="allassetslist_card_box">
            <div class="allassetslist_card">
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                      <!-- v-if="this.DataRoles(this.$store.state.login.roles,'allassetslistTab1')" -->
                        <el-tab-pane 
                            data-type='first'
                            v-if="DataRoles($store.state.login.roles,'allassetslistTab1')"
                            label="资产管理" name="first" class="w100 labelfirst tabsBox">
                            <AssetsHeader></AssetsHeader>
                        </el-tab-pane>
                        <el-tab-pane
                                data-type='second'
                                class="tabsBox"
                                v-if="DataRoles($store.state.login.roles,'allassetslistTab2')"
                                label="渠道管理" name="second">
                                <ChannelWhole></ChannelWhole>
                        </el-tab-pane>
                   
                </el-tabs>
            </div>
        </div>
</template>
<script>
import AssetsHeader from './AssetsHeader'
import ChannelWhole from './ChannelWhole'


  export default {
    data() {
      return {
         // tab切换
         activeName: ''
      };
    },
    methods: {
      handleClick(tab, event) {
        
      },
    },
    components:{
         AssetsHeader,ChannelWhole
    },
    computed: {
    
    },
    mounted: function () {
        const self = this;
        self.activeName =  $(".tabsBox")[0].getAttribute("data-type") 
    },
    created() {
    },
      
       
       
  };
</script>
<style lang="less" scoped>
   /deep/.el-tabs__item{
        font-size: 18px !important;
    }
    /deep/ .el-date-editor .el-range-separator{
        padding:0;
    }
    .sumInput{
        height: 50px;
        margin-top: 25px;
    }
    .cl_text{
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

</style>
