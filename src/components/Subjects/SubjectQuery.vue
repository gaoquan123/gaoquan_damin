<template>
    <div class="subject_QueryBox">
        <el-row :gutter="20">
             <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="input3">
                    <template slot="prepend">标的名称</template>
                </el-input>
            </el-col>

              <el-col :span="8">
                 <el-input placeholder="请输入内容" class="w80"  v-model="input3">
                    <template slot="prepend">资产名字</template>
                </el-input>
            </el-col>
            <el-col :span="8">
                <span class="ipt fl">资产类型</span>
                <el-select v-model="value8" filterable placeholder="请选择资产类型">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="m-t-20">
             <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="input3">
                    <template slot="prepend">实际借款人</template>
                </el-input>
            </el-col>

              <el-col :span="8">
                 <el-input placeholder="请输入内容" class="w80"  v-model="input3">
                    <template slot="prepend">所属渠道商</template>
                </el-input>
            </el-col>
            <el-col :span="8">
                <span class="ipt fl">还款方式</span>
                <el-select v-model="value8" filterable placeholder="请选择资产类型">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>


          <el-row :gutter="20" class="m-t-20">
             <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="input3">
                    <template slot="prepend">最低出借</template>
                </el-input>
            </el-col>

              <el-col :span="8">
                 <el-input placeholder="请输入内容" class="w80"  v-model="input3">
                    <template slot="prepend">最高出借</template>
                </el-input>
            </el-col>
            <el-col :span="8">
               <div class="block">
                      <span class="ipt fl">起始日期</span>
                        <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="m-t-20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" class="w80"  v-model="input3">
                    <template slot="prepend">借款人用户名</template>
                </el-input>
            </el-col>

            <el-col :span="8">
                    <div class="block">
                      <span class="ipt fl">截止日期</span>
                        <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
            </el-col>

            <el-col :span="8">
                    <el-button class="w40" type="primary">搜索<i class="el-icon-search el-icon--right"></i></el-button>
            </el-col>


        </el-row>

    </div>
</template>
<script>
    
export default {
    data(){
        return{
            options: [
                {value: 'JIASHI_V1',label: '固收赢'}, 
                {value: 'JIASHI_V2',label: '利息赢'}, 
                {value: 'JIASHI_V16',label: '新手标'}, 
                {value: 'JIASHI_V3',label: '新手标_V3'}, 
                {value: 'JIASHI_V6',label: '众收赢'},
                {value: 'JIASHI_V7',label: '众乐乐'},
                {value: 'JIASHI_V8',label: '个人借款标的'},
                {value: 'JIASHI_V9',label: '个人理财质押'},
                {value: 'JIASHI_V11',label: '个人信用标的'},
                {value: 'JIASHI_V13',label: '企业借款标的'},

            ],
            value8: '',
            input3:'',
            value1:''
        }
    },
    methods: {
        
    },
    components: {
    },
}
</script>
<style lang="less" scoped>
    .subject_QueryBox{
        margin-top: 25px;
    }
</style>
