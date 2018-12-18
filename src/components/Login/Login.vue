<template>
        <div class="admin_bac">
            <vue-particles
                color="#fff"
                :particleOpacity="1"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#dedede"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
            >
            </vue-particles>
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
                        this.$store.commit({type:'set_token',token:Cookies.set('_csrf')})
                        this.$router.push({path:'/admin/allassetslist'})
                    }) .catch((err,msg,s)=>{
                        this.$alert(err.message , '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                    this.$message({
                                    message: `提示: ${ err.message }`
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
    },
    components: {
   

   }

}

    
</script>
<style lang="less" scoped>

.admin_bac{
    background: -webkit-linear-gradient(-150deg, #999, #2952c6); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(-150deg,  #999, #2952c6); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(-150deg,  #999, #2952c6); /* Firefox 3.6 - 15 */
    background: linear-gradient(-150deg,  #999, #2952c6); /* 标准的语法（必须放在最后） */
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
}
    @keyframes auto {
    0% { transform: translateY(-300px); }
    100% { transform: translateY(200px); }
    }
    .admin_login{
        opacity: 0.9;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 360px;
        height: 350px;
        top: 0px;
        margin-left: -180px;
        animation: auto 1s alternate forwards;
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
