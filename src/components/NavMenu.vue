<template>
    <div class="navMenuBox fl">
        <!-- 左侧导航栏 -->
        <div class="leftnavMenu fl">
            <el-col :span="12" class="w100 h100">
                <el-menu
                        router
                        :defaultActive = "activeIndex"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item index="1" route="/admin/allassetslist">
                            <i class="el-icon-menu"></i>
                            <span slot="title">资产管理</span>
                        </el-menu-item>
                        <el-menu-item index="2" route="/admin/subjects">
                            <i class="el-icon-menu"></i>
                            <span slot="title">标的管理</span>
                        </el-menu-item>
                        <el-menu-item index="3" route="/admin/usermanage">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>

                        <el-menu-item index="4">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
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
                case "/admin/allassetslist":
                    this.activeIndex = "1";
                    break;
                case "/admin/subjects":
                    this.activeIndex = "2";
                    break;
                case "/admin/usermanage":
                    this.activeIndex = "3";
                    break;
                default:
                    break;
            }
     }
  }
</script>
<style lang="less" scoped>
.navMenuBox{
        background-color: rgb(84, 92, 100);
        width: 180px;
        position: relative;
        height:900px;
    .leftnavMenu{
        width: 100%;
        height: 100%;
          .el-menu-vertical-demo{
            border-right:none;
        }
    }
   
}
</style>
