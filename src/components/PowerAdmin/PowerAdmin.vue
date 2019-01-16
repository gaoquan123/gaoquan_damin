<template>
    <div>
        <h3>权限管理</h3>
        <div>
            <div class="w80" style="margin:0 auto;">
                <el-input class="w70" placeholder="请输入内容" v-model="input1">
                    <template slot="prepend">用户名查询</template>
                </el-input>
                <el-button class="m-l-10" type="primary" icon="el-icon-search" @click="SearchBtn()">查询</el-button>
                <el-button class="" type="success" icon="el-icon-plus" @click="dialogFormVisible = true" >创建管理员</el-button>
            </div>
        </div>
        <!-- 创建管理员 -->
            <el-dialog title="创建管理员" :visible.sync="dialogFormVisible">
                    <el-form :model="relueForm" :rules="rules" status-icon  ref="relueForm" id="form1" label-width="100px">

                    <el-form-item label="用户名" label-width="80px" prop="name">
                        <el-input   v-model="relueForm.name" class="w90"></el-input>
                    </el-form-item>
 
                     <el-form-item label="密码" label-width="80px" prop="password">
                        <el-input  v-model="relueForm.password" class="w90"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer cl">
                    <el-button type="primary"  @click="SubmitRule('relueForm')">创 建</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        <!-- 管理员列表 -->
            <table border = "1" class="m-t-50">
                <tr>
                    <th>编号</th>
                    <th>用户名</th>
                    <th>现有权限</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in list.items" :key="item.name">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>
                        <span class="front13" v-for = "i in item.roles" :key="i.name">
                                {{i | adminroles}},
                        </span>
                    </td>
                    <td class="mbtn">
                        <el-row>
                            <el-button type="primary" icon="el-icon-edit" @click="editBtn(item.id)"  circle></el-button>
                            <el-button type="primary" icon="el-icon-edit-outline" @click="editBtn(item.id)"  circle></el-button>
                            <el-button type="danger"  icon="el-icon-delete" circle></el-button>

                        </el-row>
                    </td>
                </tr>
            </table>
            <el-pagination
                class="m-t-40 m-b-40"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="list.totalCount">
            </el-pagination>
      
    </div>
</template>
<script>
import VueFilter from '../../PublicMethods/VueFilter'
export default {
        data(){
            return{
                input1:'',
                dialogFormVisible:false,
                page:1,
                relueForm:{
                    name:'',
                    password:'',
                },
                rules:{
                    name:[
                         {required: true,message: '请输入内容',trigger: 'blur'},
                    ],
                    password:[
                         {required: true,message: '请输入内容',trigger: 'blur'},

                    ],
                },
                list:{}
            }
        },
        methods: {
            SubmitRule(relueForm){
                  this.$refs.relueForm.validate((valid)=>{
                    if(valid){
                        this.$axios.post('/admin/ums/admins/register',this.relueForm)
                        .then((res)=>{
                            const strId  =  res.headers.location.substr(26)
                            this.$message({
                                showClose: true,
                                message: '创建成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.$router.push({'path':"/admin/poweradmin/superadmin?id="+strId})
                        }).catch((req)=>{
                            this.$message({
                                showClose: true,
                                message: req.message,
                                type: 'error'
                            });
                        })
                    }

                })
            },
            // 数据初始化
            listPage(){
                this.$axios.get('/admin/ums/admins',{params:{page:1}}).then((res)=>{
                    this.list = res.data;
                })
            },
              // 分页
            handleCurrentChange(currentPage){
                this.page = currentPage;
                this.$axios.get('/admin/ums/admins',{params:{page:this.page}}).then((res)=>{
                    this.list = res.data;
                })
            },
            // 修改权限
            editBtn(id){
               this.$router.push({path:'/admin/poweradmin/superadmin?id='+id})
            },
            // 查询
            SearchBtn(){
                this.$axios.get('/admin/ums/admins',{params:{
                    page:this.page,
                    name:this.input1
                }}).then((res)=>{
                    this.list = res.data;
                })
            }
        },
        created(){
            this.listPage();
        }
}
</script>
<style lang="less" scoped>
    h3{
        font-size: 24px;
        margin-bottom: 25px;
        color: #4f9dff;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }
    /deep/.el-dialog{
        width: 500px !important;
    }
       .dialog-footer{
        text-align: center;

    }
    .dialog-footer button{
        width: 120px;
    }
    /deep/.el-dialog__body{
        padding: 30px 20px 0px 30px !important;
    }
       table{
        width: 100%;
        border: 1px solid #eee;
        height: 100%;
        margin-bottom: 50px;
        tr{
            th{
                text-align: center;
                height:50px;
            }
            td{
                text-align: center;
                padding: 10px;
            }
            td.mbtn{
                padding: 10px;
                width: 150px;
            }
        }
    }
    /deep/.is-background{
          text-align: center;
    }
</style>

