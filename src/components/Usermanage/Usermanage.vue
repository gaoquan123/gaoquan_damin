<template>
    <div>
        <h3>用户管理</h3>
        <div class="userContent">
            <div class="item1">
                    <div class="block fl w33">
                    <span class="ipt">起始时间</span>
                    <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>

                <div class="block fl w33">
                    <span class="ipt">结束时间</span>
                    <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
           </div>

             <div class="item2">
                 <div class="fl w33">
                    <span class="ipt">用户类型</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option
                        class="fl"
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl w33">
                    <span class="ipt">状态</span>
                    <el-select v-model="value" placeholder="请选择">
                    <el-option
                        class="fl"
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
           </div>

           <div class="item3 cl w100">
                <div class="fl">
                        <span class="ipt">条件查找</span>
                        <el-select v-model="value" placeholder="请选择">
                        <el-option
                            class="fl"
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-input class="w30" v-model="input" placeholder="请输入数字"></el-input>
            </div>
            <el-button  class="w20 m-t-40" type="primary">搜索<i class="el-icon-search el-icon--right"></i></el-button>
            <el-button>创建企业用户</el-button>
            <el-button type="success">创建个人借款用户</el-button>
            <el-button type="info">批量导入企业用户</el-button>
            <el-button type="warning">批量导入个人借款用户</el-button>
            <div class="m-t-30">
                  <el-button type="danger">资金解冻</el-button>
            <el-button type="primary">解绑银行卡申请</el-button>
            <el-button type="info">出借人风险金额设置</el-button>
            </div>
          
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                value1: '',
                value2: '',
                options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
                value: '',
                input:''
            }
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
    .item1,.item2,.item3{
        height: 50px;
        margin-bottom: 20px;
    }
</style>
