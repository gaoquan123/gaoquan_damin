<template>
    <div class="m-t-40">
         <el-table  :data="listItemTab" fit  
          element-loading-text="拼命加载中"
          border style="width: 100%" >
			<el-table-column prop="title" label="项目名称"  > </el-table-column>
			<el-table-column prop="catalog" label="产品类型"  > </el-table-column>
			<el-table-column prop="autoShelfAt" label="自动上架时间"  > </el-table-column>
			<el-table-column prop="annualRate" label="年华利率"  > </el-table-column>
			<el-table-column prop="amount" label="借款金额"  > </el-table-column>
			<el-table-column prop="currentInvestmentAmount" label="当前出借金额"  > </el-table-column>
			<el-table-column prop="status" label="状态"  > </el-table-column>
			<el-table-column prop="instalType" label="还款方式"  > </el-table-column>
			<el-table-column prop="laModel" label="代收付信息"  > </el-table-column>
            	<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<a>上架</a>
					<a>修改</a>
					<a>取消</a>
				</template>
			</el-table-column>
        </el-table>
        <!-- <el-pagination
            class="m-t-40 m-b-40"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="this.$store.state.subjects.GetSubjectInfoItem.totalCount">
        </el-pagination> -->
    </div>
</template>
<script>
import {catalogText,formatDate,payWay,ModelType,dealElement} from '../../../PublicMethods/MethodsJs'

    export default {
        // props:['queryForm'],
        data () {
            return {
                // page:1,
            }
        },
        computed: {
            listItemTab(){
                if(this.$store.state.subjects.GetSubjectInfoItem.items){
                  let result  = this.$store.state.subjects.GetSubjectInfoItem.items;
                   result.map((item)=>{
                        item.catalog = catalogText(item.catalog);
                        if(item.autoShelfAt){
                           item.autoShelfAt =  formatDate(item.autoShelfAt);
                        }
                        item.annualRate = (item.annualRate*100).toFixed(2)+'%';
                        item.amount = item.amount.amount+'元'
                        item.currentInvestmentAmount = item.currentInvestmentAmount.amount+'元'
                        item.status = '未上架';
                        item.instalType = payWay(item.instalType)
                        item.laModel = ModelType(item.laModel)
                   })
                   return  result
                }
            }
        },
        methods: {
            // handleCurrentChange(currentPage){
            //   this.queryForm.page = currentPage;
            //   this.$store.dispatch("GetSubjectAllTab",{"type":dealElement(this.queryForm)})
            // }
        },
        
        
         
    }
</script>
<style lang="less" scoped>
.dialog-footer{
	text-align: center;
}
/deep/.el-table td{
      text-align: center !important;
        text-align: -webkit-center !important;
}
/deep/.is-leaf{
      text-align: center !important;
     text-align: -webkit-center !important;
}
.cell a{
    color: #337ab7;
    text-decoration: underline;
}

/deep/ .el-loading-mask{
        background-color: rgba(255,255,255,.5);
}
</style>

