<template>
    <div class="m-t-30">
        <div class="w80" style="margin:0 auto;">
            <el-input class="w70" placeholder="请输入内容" v-model="GetData.title">
                <template slot="prepend">渠道名称</template>
            </el-input>
         <el-button class="m-l-10" type="primary" icon="el-icon-search" @click="SearchBtn()">查询</el-button>
         <router-link v-if="this.DataRoles(this.$store.state.login.roles,'allassetslistTab2btn3')"  to="/admins/allassetslist/addhannel" >
            <el-button  type="success" icon="el-icon-plus">添加渠道</el-button>
         </router-link>
        </div>
         <div class="cl p-t-50">
             <el-table :data="ChannelWholeList"  border style="width: 100%">
                <el-table-column  prop="id" label="序号" width="50"></el-table-column>
                <el-table-column  prop="channelCode" label="渠道编码"></el-table-column>
                <el-table-column  prop="title" label="渠道名称"></el-table-column>
                <el-table-column  prop="bizPersonnelType" label="渠道类别"></el-table-column>
                <el-table-column  prop="lineType" label="渠道类型"></el-table-column>
                <el-table-column  prop="manager" label="渠道负责人"></el-table-column>
                <el-table-column  prop="daylyMaxLimitAmount" label="当日进件上限"></el-table-column>
                <el-table-column  prop="monthlyMaxLimitAmount" label="当月进件上限"></el-table-column>
                <el-table-column  prop="overdueRateLimit" label="逾期率上限"></el-table-column>
                <el-table-column  prop="payWay" label="支持还款方式"></el-table-column>
                <el-table-column  prop="assetsNum" label="渠道资产数量"></el-table-column>
                <el-table-column  prop="assetsTotalAmount" label="渠道资产总额"></el-table-column>
                <el-table-column  prop="updateAdmin" label="更新人"></el-table-column>
                <el-table-column label="更多时间" >
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                        <p>更新时间: {{ scope.row.updatedAt }}</p>
                        <p>进件期限区间: {{ scope.row.incomeSectionStart }}－{{ scope.row.incomeSectionEnd}}天</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">查看</el-tag>
                        </div>
                        </el-popover>
                    </template>
                </el-table-column>
                 <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <a v-if="DataRoles($store.state.login.roles,'allassetslistTab2btn1')"  @click="editBtn(scope.row.id)">编辑</a>
                        <a v-if="DataRoles($store.state.login.roles,'allassetslistTab2btn2')"  @click="ruleBtn(scope.row.id)">进件规则</a>
                        <span v-if="DataRoles($store.state.login.roles,'allassetslistTab2btn4')" >
                            <a @click="blockUpBtn(scope.row.id,scope.row.status)" v-if="scope.row.status==0">停用</a>
                            <a @click="blockUpBtn(scope.row.id,scope.row.status)" v-else-if="scope.row.status==1">启用</a>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
         </div>
         <!-- 分页条 -->
         <el-pagination
            background
            v-if="paginationShow"
            layout="prev, pager, next,jumper"
            @current-change="ChangePage"
            :total="this.$store.state.allassetslist.channelList.totalCount">
        </el-pagination>

        <!-- 进件规则弹框 -->

            <el-dialog title="渠道进件规则维护" :visible.sync="dialogFormVisible">
                    <el-form :model="relueForm" :rules="rules" status-icon  ref="relueForm" id="form1" label-width="100px">

                    <el-form-item label="渠道编码" label-width="220px">
                        <el-input  disabled v-model="input1" class="w60"></el-input>
                    </el-form-item>

                     <el-form-item label="渠道名称" label-width="220px">
                        <el-input disabled v-model="input2" class="w60"></el-input>
                    </el-form-item>

                    <el-form-item label="当日进件上限" label-width="220px" prop="daylyMaxLimitAmount">
                        <el-input  type="number" class="w60" placeholder="请输入内容" v-model="relueForm.daylyMaxLimitAmount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="当月进件上限" label-width="220px" prop="monthlyMaxLimitAmount">
                        <el-input type="number" class="w60" placeholder="请输入内容" v-model="relueForm.monthlyMaxLimitAmount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="逾期率上限" label-width="220px" prop="overdueRateLimit">
                        <el-input  type="number" class="w60" placeholder="请输入内容" v-model="relueForm.overdueRateLimit">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>

                     <el-form-item label="支持还款方式" label-width="220px" prop="payWay">
                        <el-radio-group v-model="relueForm.payWay">
                            <el-radio  label="A_DEBT_SERVICE_DUE" border size="medium">一次性还本付息</el-radio>
                            <el-radio  label="MATCHING_PRINCIPAL_AND_INTEREST" border size="medium">等额本息</el-radio>
                        </el-radio-group>
                    </el-form-item>


                     <el-form-item  class="fl" label="支持期限区间" label-width="220px" prop="incomeSectionStart">
                        <el-input type="number" style="width:130px;" v-model="relueForm.incomeSectionStart" placeholder="请输入内容"></el-input>
                     </el-form-item>
                     <el-form-item  class="fl Mnone"  prop="incomeSectionStart" >
                          -
                        <el-input type="number" style="width:130px;"  v-model="relueForm.incomeSectionEnd" placeholder="请输入内容"></el-input>
                     </el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer cl">
                    <el-button type="primary"  @click="SubmitRule('relueForm')">保 存</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>

        <!-- 是否停用弹框 -->
    </div>
</template>
<script>
  import {mapActions} from 'vuex'
    export default {
        data () {
            return {
                // 初始化分页
                paginationShow:true,
                GetData:{
                    title:"",
                    page:1,
                },
              input1:"",
                input2:"",
                // 弹框表单
                dialogTableVisible: false,
                dialogFormVisible: false,
                relueForm:{
                    id:'',
                    daylyMaxLimitAmount:'',
                    monthlyMaxLimitAmount:'',
                    incomeSectionStart:'',
                    incomeSectionEnd:'',
                    overdueRateLimit:'',
                    payWay:''

                },
                // 表单验证
                rules:{
                    daylyMaxLimitAmount:[
                         {required: true,message: '请输入内容',trigger: 'blur'},
                        //   { validator:this.$valid.getPhoneValidator(), trigger: 'blur' }
                    ],
                    monthlyMaxLimitAmount:[
                         {required: true,message: '请输入内容',trigger: 'blur'},

                    ],
                    incomeSectionStart:[
                         {required: true,message: '请输入内容',trigger: 'blur'},

                    ],
                    overdueRateLimit:[
                         {required: true,message: '请输入内容',trigger: 'blur'},

                    ],
                    incomeSectionEnd:[
                         {required: true,message: '请输入内容',trigger: 'blur'},
                    ],
                     payWay:[
                         {required: true,message: '至少选择一项',trigger: 'change'},

                    ],

                }
            }
        },
        methods:{
            // 表格隔行变色
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 == 1) {
                return 'warning-row';
                }
                return '';
            },
            // 查询
            SearchBtn(){
                //初始化组件
                this.paginationShow = false
                this.ChangePage(1)
                this.$nextTick(function () {
                    this.paginationShow = true;
                })
            },
            // 分页条
            ChangePage(page){
               this.GetData.page = page;
               this.$store.dispatch('SearchChannel',this.GetData)
            },
            // 规则弹框
            ruleBtn(id){
                 this.dialogFormVisible = true;
                  Object.keys(this.relueForm).forEach((key,val)=>{
                    this.relueForm[key] = ""
                 })
                //  获取表单title数据
                 this.$axios.get(`/api/assetsChannel/${id}`).then((res)=>{
                     this.input1  =  res.data.channelCode;
                     this.input2  =  res.data.title;
                     this.relueForm.id = res.data.id;
                 })

            },
            // 规则表单提交保存
            SubmitRule(relueForm){
                this.$refs.relueForm.validate((valid)=>{
                    if(valid){
                     this.relueForm.overdueRateLimit =  Number(this.relueForm.overdueRateLimit);
                        this.$axios.post('/admin/api/assetsChannel/updateEntryRule',this.relueForm)
                        .then((res)=>{
                            this.$message({
                                showClose: true,
                                message: '恭喜您，保存成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                        }).catch((req)=>{
                            this.$message({
                                showClose: true,
                                message: '保存失败，请刷新重试',
                                type: 'error'
                            });
                        })
                    }else{
                            this.$message({
                                showClose: true,
                                message: '您输入有误',
                                type: 'error'
                            });
                    }

                })

            },
            //编辑
            editBtn(id){
              this.$router.push({name: 'AddChannel', query: { id : id}})
            },
            //停用
            blockUpBtn(id,status){
                const params={
                    id:id,
                    oldStatus: status,
                }
                if(status==0){
                  params.status=1
                }else if(status==1){
                  params.status=0
                }
              this.$axios.get('/admin/api/assetsChannel/updateStatus',{
                  params:params
              })
                .then((res)=>{
                  const h = this.$createElement;
                  this.$notify({
                    title: '标题名称',
                    message: h('i', '停用/启用渠道成功')
                  });
                  //停用后重新请求数据
                  this.$store.dispatch('SearchChannel',this.GetData)
              }).catch((err)=>{
                const h = this.$createElement;
                this.$notify({
                  title: '标题名称',
                  message: h('i', '停用/启用渠道失败')
                });
              })

            }
        },
        computed: {
            ChannelWholeList(){
                return this.$store.state.allassetslist.channelList.items;
            },
            //  storeRoles(){
            //         return this.$store.state.login.roles
            //     }
        },
        created(){
               this.$store.dispatch('SearchChannel',this.GetData)
        },
        components: {

        },
    }
</script>
<style lang="less" scoped>

 /deep/.warning-row {
    background-color: #Eee !important;
  }

 /deep/.success-row {
    background-color: #f0f9eb !important;
  }
  /deep/.el-table td{
          text-align: center !important;
          text-align: -webkit-center !important;
  }
   /deep/.el-table th{
         text-align: center! important;
          text-align: -webkit-center !important;
  }
    .el-pagination {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;

    }
     /deep/.el-dialog{
        width: 700px;
        margin-top:30px !important;
    }
    .dialog-footer{
        text-align: center;

    }
    .dialog-footer button{
        width: 120px;
    }
    /deep/.Mnone .el-form-item__content{
        margin-left: 0px !important;
    }
</style>
