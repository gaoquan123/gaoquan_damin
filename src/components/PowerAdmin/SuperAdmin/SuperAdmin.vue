<template>
    <div>
        <h3>管理员权限维护</h3>
        <div class="nameTitle">{{resulte.name}}</div>
        <div class="tabCheckedAll">

        <table border="1">
            <thead>
                <tr>
                    <th>模块菜单</th>
                    <th>模块子页面</th>
                    <th>模块子页面方法</th>
                </tr>
            </thead>
            <tbody>
                <!-- 资产管理开始 -->
                <tr>
                    <td rowspan="2"  class="center" >
                        <el-checkbox   @change="checkedAllassetslist" v-model="arrObj0.allassetslist">资产管理</el-checkbox>
                    </td>
                    <td  class="center_left" >
                        <el-checkbox  @change="checkedAllassetsTab1"  v-model="arrObj0.allassetslistTab1">资产管理</el-checkbox>
                    </td>
                    <td class="SP20">
                          <el-row :gutter="20">
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn1">个金资产报表导出</el-checkbox>
                            </el-col>
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn2">对公资产报表导出</el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn3">标的报表导出</el-checkbox>
                            </el-col>
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn4">历史数据处理</el-checkbox>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn5"  class="p-t-10">创建标的</el-checkbox>
                            </el-col>
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn6"  class="p-t-10">新增资产</el-checkbox>
                            </el-col>
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn7"  class="p-t-10">标的信息</el-checkbox>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20" >
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn8"  class="p-t-10">修改库存</el-checkbox>
                            </el-col>
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn9"  class="p-t-10">编辑</el-checkbox>
                            </el-col>
                             <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab1btn10"  class="p-t-10">删除</el-checkbox>
                            </el-col>
                           
                        </el-row>
                    </td>
                </tr>
                <tr>
                    <td  class="center_left" >
                        <el-checkbox @change="checkedAllassetsTab2" v-model="arrObj0.allassetslistTab2">渠道管理</el-checkbox>
                    </td>
                    <td class="SP20">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab2btn1">编辑</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab2btn2">进件规则</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab2btn3">添加渠道</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj0.allassetslistTab2btn4">停用</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>
                <!-- 资产管理结束 -->
                

                <!-- 标的管理开始 -->
                <tr>
                    <td rowspan="13" class="center" >
                          <el-checkbox   @change="checkedSubject"  v-model="arrObj.subjects">标的管理</el-checkbox>
                    </td>
                    <td class="center_left" >
                            <el-checkbox @change="checkedSubect1"  v-model="arrObj.subjectsTab1">未上架</el-checkbox>
                    </td>
                    <td class="SP20">
                        <el-row :gutter="20" >
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab1btn1">上架</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab1btn2">修改</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab1btn3">撤销</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>
                <tr>
                    <td class="center_left" >
                        <el-checkbox @change="checkedSubject2"  v-model="arrObj.subjectsTab2">募集中</el-checkbox>
                    </td>
                    <td class="SP20">
                        <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab2btn1">pc精选置顶</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab2btn2">移动精选制定</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab2btn3">下架</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>
                <tr>
                     <td class="center_left SH50" ><el-checkbox  v-model="arrObj.subjectsTab3">满标待放款</el-checkbox></td>
                     <td class="center">-</td>
                </tr>
                
                 <tr>
                     <td class="center_left SH50" ><el-checkbox  v-model="arrObj.subjectsTab4">流标</el-checkbox></td>
                     <td class="center"> - </td>
                </tr>

                <tr>
                     <td class="center_left" @change="checkedSubject5" ><el-checkbox  v-model="arrObj.subjectsTab5">回款中</el-checkbox></td>
                     <td class="SP20">
                            <el-row :gutter="20">
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn1">开启自动回款</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn2">申请回款</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn3">申请代偿</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn4">申请提前还款</el-checkbox>
                                </el-col>
                            </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn5" class="p-t-10">同意申请</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn6" class="p-t-10">驳回申请</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn7" class="p-t-10">驳回提前还款申请</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn8" class="p-t-10">查看合同</el-checkbox>
                                </el-col>
                            </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn9" class="p-t-10">详情</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn10" class="p-t-10">编辑</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn11" class="p-t-10">还款计划</el-checkbox>
                                </el-col>
                                    <el-col :span="6">
                                    <el-checkbox  v-model="arrObj.subjectsTab5btn12" class="p-t-10">预约还款</el-checkbox>
                                </el-col>
                            </el-row>
                     </td>
                </tr>
                <tr>
                    <td class="center_left" ><el-checkbox @change="checkedSubject6"  v-model="arrObj.subjectsTab6">回款完成</el-checkbox></td>
                    <td class="SP20">
                        <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab6btn1">导出标的出借信息</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab6btn2">查看合同</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab6btn3">详情</el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab6btn4">编辑</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>
                <tr>
                    <td class="center_left SH50" ><el-checkbox  v-model="arrObj.subjectsTab7">已下架</el-checkbox></td>
                    <td class="center">-</td>
                </tr>

                <tr>
                    <td class="center_left SH50" ><el-checkbox  v-model="arrObj.subjectsTab8">已撤销</el-checkbox></td>
                    <td class="center">-</td>
                </tr>

                <tr>
                    <td class="center_left" ><el-checkbox @change="checkedSubject9"  v-model="arrObj.subjectsTab9">逾期中</el-checkbox></td>
                    <td class="SP20">
                        <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab9btn1">查看合同</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab9btn2">详情</el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab9btn3">编辑</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>

                <tr>
                    <td class="center_left" ><el-checkbox @change="checkedSubject10"  v-model="arrObj.subjectsTab10">代偿中</el-checkbox></td>
                    <td class="SP20">
                        <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn1">自动代偿记录导出</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn2">开启自动回款</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn3">同意代偿回款</el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn4">驳回代偿申请</el-checkbox>
                            </el-col>
                        </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn5"  class="p-t-10">借款人代偿款申请</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn6"  class="p-t-10">同意借款人还代偿款申请</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn7"  class="p-t-10">驳回借款人还款申请</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn8"  class="p-t-10">详情</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn9"  class="p-t-10">编辑</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab10btn10"  class="p-t-10">查看合同</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>

                <tr>
                    <td class="center_left" ><el-checkbox @change="checkedSubject11"  v-model="arrObj.subjectsTab11">已还款代偿</el-checkbox></td>
                    <td class="SP20">
                        <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn1">开启自动回款</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn2">同意代偿回款</el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn3">驳回代偿申请</el-checkbox>
                            </el-col>
                        </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn4"  class="p-t-10">借款人代偿款申请</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn5"  class="p-t-10">同意借款人还代偿款申请</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn6"  class="p-t-10">驳回借款人还款申请</el-checkbox>
                            </el-col>
                        </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn7"  class="p-t-10">详情</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn8"  class="p-t-10">编辑</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab11btn9"  class="p-t-10">查看合同</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>

                <tr>
                    <td class="center_left SH50" ><el-checkbox  v-model="arrObj.subjectsTab12">中间状态</el-checkbox></td>
                    <td class="center">－</td>
                </tr>

                <tr>
                    <td class="center_left" ><el-checkbox @change="checkedSubject11"  v-model="arrObj.subjectsTab13">还款详情</el-checkbox></td>
                    <td class="SP20">
                        <el-row :gutter="20">
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab13btn1">导出标的信息</el-checkbox>
                            </el-col>
                                <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab13btn2">等额本息标的还款详情</el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox  v-model="arrObj.subjectsTab13btn3">查看</el-checkbox>
                            </el-col>
                        </el-row>
                    </td>
                </tr>
              
            </tbody>
            <!-- <tfoot>
                <tr>
                <td>Sum</td>
                <td>$180</td>
                </tr>
            </tfoot> -->
        </table>

            <el-row class="m-b-50 center">
                <el-button @click="submitChecked" type="primary" style="width:300px;">更新权限</el-button>
            </el-row>


        </div>
    </div>
</template>
<script>
 import {dealElement} from '../../../PublicMethods/MethodsJs'
export default {
    data () {
        return {
            checked:true,
            userId:this.$route.query.id,
            resulte:{},
            // 资产管理
            arrObj0:{
                allassetslist:'',
                allassetslistTab1:'',
                allassetslistTab1btn1:'',
                allassetslistTab1btn2:'',
                allassetslistTab1btn3:'',
                allassetslistTab1btn4:'',
                allassetslistTab1btn5:'',
                allassetslistTab1btn6:'',
                allassetslistTab1btn7:'',
                allassetslistTab1btn8:'',
                allassetslistTab1btn9:'',
                allassetslistTab1btn10:'',
                allassetslistTab2:'',
                allassetslistTab2btn1:'',
                allassetslistTab2btn2:'',
                allassetslistTab2btn3:'',
                allassetslistTab2btn4:'',
            },
            // 标的管理
            arrObj:{ 
                subjects:'',
                subjectsTab1:'',
                subjectsTab2:'',
                subjectsTab3:'',
                subjectsTab4:'',
                subjectsTab5:'',
                subjectsTab6:'',
                subjectsTab7:'',
                subjectsTab8:'',
                subjectsTab9:'',
                subjectsTab10:'',
                subjectsTab11:'',
                subjectsTab12:'',
                subjectsTab13:'',
                subjectsTab1btn1:'',
                subjectsTab1btn2:'',
                subjectsTab1btn3:'',

                subjectsTab2btn1:'',
                subjectsTab2btn2:'',
                subjectsTab2btn3:'',

                subjectsTab5btn1:'',
                subjectsTab5btn2:'',
                subjectsTab5btn3:'',
                subjectsTab5btn4:'',
                subjectsTab5btn5:'',
                subjectsTab5btn6:'',
                subjectsTab5btn7:'',
                subjectsTab5btn8:'',
                subjectsTab5btn9:'',
                subjectsTab5btn10:'',
                subjectsTab5btn11:'',
                subjectsTab5btn12:'',

                subjectsTab6btn1:'',
                subjectsTab6btn2:'',
                subjectsTab6btn3:'',
                subjectsTab6btn4:'',

                subjectsTab9btn1:'',
                subjectsTab9btn2:'',
                subjectsTab9btn3:'',
              
                subjectsTab10btn1:'',
                subjectsTab10btn2:'',
                subjectsTab10btn3:'',
                subjectsTab10btn4:'',
                subjectsTab10btn5:'',
                subjectsTab10btn6:'',
                subjectsTab10btn7:'',
                subjectsTab10btn8:'',
                subjectsTab10btn9:'',
                subjectsTab10btn10:'',
                
                subjectsTab11btn1:'',
                subjectsTab11btn2:'',
                subjectsTab11btn3:'',
                subjectsTab11btn4:'',
                subjectsTab11btn5:'',
                subjectsTab11btn6:'',
                subjectsTab11btn7:'',
                subjectsTab11btn8:'',
                subjectsTab11btn9:'',

                subjectsTab13btn1:'',
                subjectsTab13btn2:'',
                subjectsTab13btn3:'',

            }
        }
    },
    methods: {
        userInfo(){
          this.$axios.get('/admin/ums/admins/'+this.userId).then((res)=>{
              this.resulte = res.data;
          })
        },
        // 权限更新按钮
        submitChecked(){
            let obj = dealElement(this.arrObj)
            let obj0 = dealElement(this.arrObj0)
            let Objects =  Object.assign(obj, obj0);
            var arr = []
            for (let i in Objects) {
                arr.push(i);
            }
            this.$axios.post('/admin/ums/admins/'+this.$route.query.id+'/roles',{roles:arr}).then((res)=>{
                console.log(res,"11")
            })
            .catch((err)=>{
                console.log(err,"22")
            })
        },
        // 资产管理模块全选
        checkedAllassetslist(){
           this.arrObj0.allassetslist = !this.arrObj0.allassetslist;
           if(!this.arrObj0.allassetslist){
               for (let i in this.arrObj0) {
                   this.arrObj0[i] = false;
               }
           }else{
                 for (let i in this.arrObj0) {
                   this.arrObj0[i] = true;
               }
           }
            for (let i in this.arrObj0) {
                this.arrObj0[i] = !this.arrObj0[i];
            }
        },  
        // 资产管理子页面
        checkedAllassetsTab1(){
                let strArrTab1 =this.arrObj0;
                if(strArrTab1.allassetslistTab1){
                    for (let i in strArrTab1) {
                    if(i.length >= 21 && i.indexOf('Tab1') >= 0 ){
                        strArrTab1[i] = true;
                      }
                    } 
                    strArrTab1.allassetslistTab1  = true
                }else{
                    for (let i in strArrTab1) {
                        if(i.length >= 21 && i.indexOf('Tab1') >= 0 ){
                            strArrTab1[i] = false;
                        }
                    } 
                    strArrTab1.allassetslistTab1  = false
                }
        },
        // 资产管理子页面渠道管理
        checkedAllassetsTab2(){
            const strArrTab2 = this.arrObj0;
            strArrTab2.allassetslistTab2?
            [strArrTab2.allassetslistTab2btn1,strArrTab2.allassetslistTab2btn2,strArrTab2.allassetslistTab2btn3,strArrTab2.allassetslistTab2btn4] = [true,true,true,true]:
            [strArrTab2.allassetslistTab2btn1,strArrTab2.allassetslistTab2btn2,strArrTab2.allassetslistTab2btn3,strArrTab2.allassetslistTab2btn4] = [false,false,false,false]

        },
        // 标的管理模块全选
        checkedSubject(){
            this.arrObj.subjects = !this.arrObj.subjects;
              if(!this.arrObj.subjects){
               for (let i in this.arrObj) {
                   this.arrObj[i] = false;
               }
           }else{
                 for (let i in this.arrObj) {
                   this.arrObj[i] = true;
               }
           }
            for (let i in this.arrObj) {
                this.arrObj[i] = !this.arrObj[i];
            }
        },
        // 标的管理子页面未上架
        checkedSubect1(){
         const subject1 = this.arrObj;
         subject1.subjectsTab1?
         [subject1.subjectsTab1btn1,subject1.subjectsTab1btn2,subject1.subjectsTab1btn3] = [true,true,true]:
         [subject1.subjectsTab1btn1,subject1.subjectsTab1btn2,subject1.subjectsTab1btn3] = [false,false,false]
        },
         // 标的管理子页面募集中
         checkedSubject2(){
          const subject2 = this.arrObj;
          subject2.subjectsTab2?
          [subject2.subjectsTab2btn1, subject2.subjectsTab2btn2, subject2.subjectsTab2btn3] = [true,true,true]:
          [subject2.subjectsTab2btn1, subject2.subjectsTab2btn2, subject2.subjectsTab2btn3] = [false,false,false]
         },
         // 标的管理子页面回款中
         checkedSubject5(){
            let subject5 =this.arrObj;
            if(subject5.subjectsTab5){
                for (let i in subject5) {
                if(i.length >= 16 && i.indexOf('Tab5') >= 0 ){
                      subject5[i] = true;
                    }
                } 
                subject5.subjectsTab5  = true
            }else{
                for (let i in subject5) {
                    if(i.length >= 16 && i.indexOf('Tab5') >= 0 ){
                        subject5[i] = false;
                    }
                } 
                subject5.subjectsTab5  = false
            }
         },
        // 标的管理子页面回款完成
        checkedSubject6(){
          const subject6 = this.arrObj;
          subject6.subjectsTab6 ? 
          [subject6.subjectsTab6btn1,subject6.subjectsTab6btn2,subject6.subjectsTab6btn3,subject6.subjectsTab6btn4]=[true,true,true,true]:
          [subject6.subjectsTab6btn1,subject6.subjectsTab6btn2,subject6.subjectsTab6btn3,subject6.subjectsTab6btn4]=[false,false,false,false]
        },
        // 标的管理子页面预期中
        checkedSubject9(){
            const subject9 = this.arrObj;
            subject9.subjectsTab9?
            [subject9.subjectsTab9btn1,subject9.subjectsTab9btn2,subject9.subjectsTab9btn3]= [true,true,true]: 
            [subject9.subjectsTab9btn1,subject9.subjectsTab9btn2,subject9.subjectsTab9btn3]=[false,false,false]
        },
        // 标的管理子页面代偿中
        checkedSubject10(){
            let subject10 = this.arrObj;
            if(subject10.subjectsTab10){
                for (let i in subject10) {
                if(i.length >= 16 && i.indexOf('Tab10') >= 0 ){
                      subject10[i] = true;
                    }
                } 
                subject10.subjectsTab10  = true
            }else{
                for (let i in subject10) {
                    if(i.length >= 16 && i.indexOf('Tab10') >= 0 ){
                        subject10[i] = false;
                    }
                } 
                subject10.subjectsTab10  = false
            }
        },
        // 标的管理子页面已还款代偿
        checkedSubject11(){
            let subject11 = this.arrObj;
            if(subject11.subjectsTab11){
                for (let i in subject11) {
                if(i.length >= 16 && i.indexOf('Tab11') >= 0 ){
                      subject11[i] = true;
                    }
                } 
                subject11.subjectsTab11  = true
            }else{
                for (let i in subject11) {
                    if(i.length >= 16 && i.indexOf('Tab11') >= 0 ){
                        subject11[i] = false;
                    }
                } 
                subject11.subjectsTab11  = false
            }
        },
        // 标的管理子页面 还款状态
        checkedSubject11(){
            const subject13 = this.arrObj;
             subject13.subjectsTab13?
             [subject13.subjectsTab13btn1,subject13.subjectsTab13btn2,subject13.subjectsTab13btn3] =[true,true,true]:
             [subject13.subjectsTab13btn1,subject13.subjectsTab13btn2,subject13.subjectsTab13btn3] = [false,false,false]
        },

       
    },
    watch:{
         // 资产管理模块方法
        arrObj0:{
            handler(newName,oldName){
                let obj = dealElement(newName);
                const strArr =Object.keys(obj);
                if(strArr.length >= 1){
                    newName.allassetslist = true;
                }else{
                    newName.allassetslist = false;
                }
                //标的管理
                if( obj.allassetslistTab1btn1 || obj.allassetslistTab1btn2 ||obj.allassetslistTab1btn3 ||
                    obj.allassetslistTab1btn4 || obj.allassetslistTab1btn5 ||obj.allassetslistTab1btn6 ||
                    obj.allassetslistTab1btn7 || obj.allassetslistTab1btn8 ||obj.allassetslistTab1btn9 ||
                    obj.allassetslistTab1btn10 ){
                    newName.allassetslistTab1 = true;
                }
                //渠道管理
                if(obj.allassetslistTab2btn1 || obj.allassetslistTab2btn2 || obj.allassetslistTab2btn3 || obj.allassetslistTab2btn4){
                     newName.allassetslistTab2 = true;
                }
             
            },
            deep: true,
            immediate: true
        },
        arrObj:{
            handler(newName,oldName){
                 let objChannel = dealElement(newName);
                 const strArrChannel = Object.keys(objChannel);
                   if(strArrChannel.length >= 1){
                       newName.subjects = true;
                  }else{
                       newName.subjects = false;
                  }
                //  未上架
                if(objChannel.subjectsTab1btn1 || objChannel.subjectsTab1btn2 ||  objChannel.subjectsTab1btn3){
                    newName.subjectsTab1 = true;
                }
                // 募集中
                if(objChannel.subjectsTab2btn1 || objChannel.subjectsTab2btn2 ||  objChannel.subjectsTab2btn3){
                    newName.subjectsTab2 = true;
                }
                // // 回款中
                if(
                    objChannel.subjectsTab5btn1 || objChannel.subjectsTab5btn2 || objChannel.subjectsTab5btn3 || objChannel.subjectsTab5btn4 ||
                    objChannel.subjectsTab5btn5 || objChannel.subjectsTab5btn6 || objChannel.subjectsTab5btn7 || objChannel.subjectsTab5btn8 ||
                    objChannel.subjectsTab5btn9 || objChannel.subjectsTab5btn10 || objChannel.subjectsTab5btn11 || objChannel.subjectsTab5btn12 
                    ){
                    newName.subjectsTab5 = true;
                }
                // //回款完成
                if(objChannel.subjectsTab6btn1 ||  objChannel.subjectsTab6btn2 ||  objChannel.subjectsTab6btn3 ||  objChannel.subjectsTab6btn4 ){
                    newName.subjectsTab6 = true;
                }
                // //预期中
                if(objChannel.subjectsTab9btn1 ||  objChannel.subjectsTab9btn2 ||  objChannel.subjectsTab9btn3 ){
                    newName.subjectsTab9 = true;
                }
                // // 代偿中
                if(
                    objChannel.subjectsTab10btn1 ||  objChannel.subjectsTab10btn2 ||  objChannel.subjectsTab10btn3 ||  objChannel.subjectsTab10btn4 ||   
                    objChannel.subjectsTab10btn5 ||  objChannel.subjectsTab10btn6 ||  objChannel.subjectsTab10btn7 ||  objChannel.subjectsTab10btn8 ||   
                    objChannel.subjectsTab10btn9 ||  objChannel.subjectsTab10btn10 
                ){
                    newName.subjectsTab10 = true;
                }
                // // 已还款代偿
                if(
                    objChannel.subjectsTab11btn1 ||   objChannel.subjectsTab11btn2 ||  objChannel.subjectsTab11btn3 ||  objChannel.subjectsTab11btn4 ||      
                    objChannel.subjectsTab11btn5 ||   objChannel.subjectsTab11btn6 ||  objChannel.subjectsTab11btn7 ||  objChannel.subjectsTab11btn8 ||      
                    objChannel.subjectsTab11btn9 
                ){
                    newName.subjectsTab11 = true;
                }
                // // 还款详情
                if(
                    objChannel.subjectsTab13btn1 ||  objChannel.subjectsTab13btn2 || objChannel.subjectsTab13btn3 
                ){
                    newName.subjectsTab13 = true;
                }

               
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.userInfo();
        console.log(this.$store)
    },
   
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
    .nameTitle{
        font-size: 22px;
        margin-bottom: 25px;
        color: #000;
        padding-bottom: 10px;
    }
    .tabCheckedAll table{
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
                min-height: 40px;
            }
        }
    }
    .center{
        text-align: center;
    }
    .SP20{
        padding: 20px;
    }
    .SH50{
        height: 50px;
    }
    .center_left{
        width: 120px;
        text-align: left;
        padding-left: 20px;
    }

</style>
