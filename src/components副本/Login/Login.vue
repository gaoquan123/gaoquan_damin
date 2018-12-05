<template>
        <div class="admin_bac">
                <div class="admin_login">
                    <h3>
                        嘉实P2P后台管理系统
                    </h3>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" id="form1" label-width="100px">
                        <el-form-item label="手机号" prop="name">
                            <el-input v-model.number="ruleForm.name"/>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password"/>
                        </el-form-item>

                        <el-form-item id="captInput"  label="验证码" prop="captcha">
                            <el-input  v-model="ruleForm.captcha"/>
                            <img  @click="newCapt()" id="timeCapt"  src="/ums/captcha" alt="请刷新再试">
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                        </el-form-item>

                    </el-form>
                </div>    
        </div>

</template>
<script>
  import {mapActions} from 'vuex'
export default {
    data() {
      return {
        ruleForm: {
          name: 'superadmin',
          password:'abcd1234',
          captcha:'12345'
        },
        rules: {
            name: [
                    {required: true, message: '请输入手机号码',trigger: 'blur'}
            ],
            password:[
                    {required: true, message: '请输入密码', trigger: 'blur'},
            ],
            captcha:[
                    {required: true, message: '请输入验证码',trigger: 'blur'},
            ],
        }
      }
    },
    methods: {
        // 确认提交接口
       submitForm(ruleForm){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$axios.post("/admin/ums/admins/login",this.ruleForm,{
                        headers:{
                            'X-Requested-With':'XMLHttpRequest',
                            }
                    }).then((res)=>{
                        Cookies.set('username',res.data.name, { expires: 7 });
                        this.$store.commit({type:'islogin',msg: res.data.name})
                        this.$router.push({path:'/admin/allassetslist'})
                    }).catch((err,msg,s)=>{
                        this.$alert(err.response.data.message , '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                    this.$message({
                                    message: `提示: ${ err.response.data.message }`
                                    });
                                }
                            });
                            $('#timeCapt').attr("src", "/ums/captcha?t=" + new Date().getTime());
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
        });
        },
      
        // 刷新验证码
        newCapt(){
             $('#timeCapt').attr("src", "/ums/captcha?t=" + new Date().getTime());
        }
    },
    created () {
    }
}

    
</script>
<style lang="less" scoped>
.admin_bac{
    background: #2b5888;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
}
    .admin_login{
        position: fixed;
        top: 50%;
        left: 50%;
        width: 360px;
        height: 350px;
        margin-top: -175px;
        margin-left: -180px;
        background: #fff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
        h3{
            font-size: 18px;
            margin:10px;
            border-bottom: 1px solid lightgray;
            height: 50px;
            line-height: 50px;
            color: #409EFF;
            text-align: center;
        }
        // 登陆表单
        .el-form{
            margin-top: 20px;
            /deep/ .el-form-item{
                margin-left: -20px;
            }
             /deep/ .el-input{
                width: 80%;
            }
             /deep/ #captInput{
                width: 100%;
            }
            /deep/ #captInput .el-input{
                width: 35%;
            }
            /deep/ #captInput input{
                width: 100%;
            }
              /deep/ #captInput img{
                width: 100px;
                height: 38px;
                position: absolute;
                top: 0px;
                margin-left: 32px;
            }
            /deep/ button{
                width: 90%;
                margin-top: 10px;
                margin-left:-20px;
            }
        }
    }
</style>
