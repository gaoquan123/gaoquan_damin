<template>
    <div class="navMenuBox fl">
        <!-- 左侧导航栏 -->
        <div class="leftnavMenu fl">
            <el-col :span="12" class="w100 h100">
                <el-menu
                        router
                        :defaultActive = "activeIndex"
                        class="el-menu-vertical-demo"
                        background-color="#fff"
                        text-color="#000"
                        active-text-color="#4f9dff">
                            <el-menu-item 
                                v-if="DataRoles($store.state.login.roles,'allassetslist')"
                                index="1" route="/admins/allassetslist">
                                <i class="el-icon-menu"></i>
                                <span slot="title">资产管理</span>
                            </el-menu-item>
                            <el-menu-item 
                            v-if="DataRoles($store.state.login.roles,'subjects')"
                            index="2" route="/admins/subjects">
                                <i class="el-icon-menu"></i>
                                <span slot="title">标的管理</span>
                            </el-menu-item>
                      
                        <el-menu-item index="3" route="/admins/usermanage">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>

                        <el-menu-item index="4"  route="/admins/poweradmin">
                            <i class="el-icon-menu"></i>
                            <span slot="title">权限管理</span>
                        </el-menu-item>
                        
                        <el-menu-item index="5">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                </el-menu>
            </el-col>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
        return {
            activeIndex:"1"
        }
    },
    
     beforeMount () {
            let path = this.$route.path;
            switch (path) {
                case "/admins/allassetslist":
                    this.activeIndex = "1";
                    break;
                case "/admins/subjects":
                    this.activeIndex = "2";
                    break;
                case "/admins/usermanage":
                    this.activeIndex = "3";
                    break;
                   case "/admins/poweradmin":
                    this.activeIndex = "4";
                    break;
                default:
                    break;
            }
     }
  }
</script>
<style lang="less" scoped>
.navMenuBox{
        background-color: #fff;
        width: 180px;
        position: relative;
        height:100vh;
        margin-top: 20px;
    .leftnavMenu{
        width: 100%;
        height: 100%;
          .el-menu-vertical-demo{
            border-right:none;
        }
    }
   
}
</style>
