<template>
      <!-- 头部导航栏 -->
    <div class="navheader fl">
        <div class="leftlogo fl">
            <h3>嘉实P2P后台管理系统</h3>
        </div>
            <div class="rightprofile fr">
                <span>superadmin</span>
                <el-button type="primary" @click="submitaout()">退出登陆</el-button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        //  退出登陆
        submitaout(){
            this.$confirm('您确定要是退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    this.$router.go(0)
                    Cookies.remove('_csrf');
                    Cookies.remove('token');
                    this.$router.push({path:'/admins/login'})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });          
                });
        },
        
        },
}
</script>
<style lang="less" scoped>
   .navheader{
        background: #fff;
        height: 60px;
        width: 100%;
        div{
            padding: 20px;
        }
        .leftlogo h3{
            font-weight: 700;
            color: #409EFF;
            font-size: 18px;
        }
        .rightprofile{
            padding-right: 50px;
            span{
                color: #409EFF;
                font-weight: 700;
                margin-right: 20px;
            }
            button{
                display: inline-block;
                margin-top: -10px;
            }
        }
    }
</style>
