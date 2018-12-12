<template>
    <div>
        <el-table  :data="FilterList.items" fit  border style="width: 100%" :row-class-name="tableRowClassName">
			<el-table-column prop="id" label="资产ID"  width="50" > </el-table-column>
			<el-table-column prop="bizPersonnelType" label="类型" > </el-table-column>
			<el-table-column prop="title" label="名称" > </el-table-column>
			<el-table-column prop="userName" label="用户名" ></el-table-column>
			<el-table-column prop="totalAmountTable" label="规模(元)" > </el-table-column>
			<el-table-column prop="annualRate" label="资产年利率" > </el-table-column>
			<el-table-column prop="totalSettlementAmount" label="已售规模(元)" > </el-table-column>
			<el-table-column prop="remaindAmountTable" label="剩余规模(元)" > </el-table-column>
			<el-table-column prop="currentStockTable" label="实时剩余规模(元)" > </el-table-column>
			<el-table-column prop="model" label="代收付信息" > </el-table-column>
			<el-table-column prop="payWay" label="还款方式" > </el-table-column>
			<el-table-column prop="limitDays" label="期限" > </el-table-column>
			<el-table-column prop="createUser" label="添加人" > </el-table-column>
			<el-table-column prop="" label="更多日期" >
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
					<p>起始日: {{scope.row.startTime}}</p>
					<p>到期日: {{scope.row.endTime}}</p>
					<p>宽限到期日: {{scope.row.assertsAbleOverEndDate}}</p>
					<p>添加时间: {{scope.row.createTime}}</p>
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium">起，到，宽</el-tag>
					</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="state" label="状态" > </el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<a v-if="scope.row.currentStockTable <= 0" @click="open()">创建标的</a>
					<router-link  v-else :to="{path:'/admin/allassetslist/newsubject',query:{userId:scope.row.userId,assetId:scope.row.id}}">创建标的</router-link>
					<a>标的信息</a>
					<router-link :to="{path: '/admin/allassetslist/assetsbizedit', query:{userId:scope.row.userId,assetId:scope.row.id}}">编辑</router-link>
					<br>
					<a @click="editStock(scope.row.id)">修改库存</a>
					<a>删除</a>
					<a v-if="scope.row.state == 'PARTIAL_MATURITY'">提前到期</a>
				</template>
			</el-table-column>
        </el-table>
		
        <el-dialog title="编辑资产库存" :visible.sync="dialogFormVisible">
			<el-form :model="relueForm" :rules="rules" status-icon  ref="relueForm" id="form1" label-width="100px">
				<el-form-item label="资产类型" label-width="220px">
					<el-radio-group v-model="relueForm.bizPersonnelType">
						<el-radio disabled label="BIZ"  border size="medium">供应链</el-radio>
						<el-radio disabled label="PERSONNEL" border size="medium">小微</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="资产名称" label-width="220px">
					<el-input disabled v-model="relueForm.title" class="w60"></el-input>
				</el-form-item>

				<el-form-item label="资产规模" label-width="220px">
					<el-input disabled type="number" class="w60" placeholder="请输入内容" v-model="relueForm.totalAmount">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>

				<el-form-item label="实时资产剩余规模" label-width="220px">
					<el-input disabled type="number" class="w60" placeholder="请输入内容" v-model="relueForm.currentStock"></el-input>
				</el-form-item>

				<el-form-item label="库中资产剩余规模" label-width="220px">
					<el-input disabled type="number" class="w60" placeholder="请输入内容" v-model="relueForm.remaindAmount"></el-input>
				</el-form-item>

				<el-form-item label="修改剩余规模" label-width="220px" prop='changeRemaindAmount'>
					<el-input type="number" class="w60" placeholder="请输入内容" v-model="relueForm.changeRemaindAmount"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer cl">
				<el-button type="primary"  @click="SubmitRule('relueForm')">保 存</el-button>
				<el-button @click="dialogFormVisible = false">取 消</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<style lang="less" scoped>
/deep/.warning-row {
  background-color: #eee !important;
}

/deep/.success-row {
  background-color: #f0f9eb !important;
}
/deep/.el-table td {
  text-align: center !important;
  text-align: -webkit-center !important;
}
/deep/.el-table th {
  text-align: center !important;
  text-align: -webkit-center !important;
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

<script>
import { bizType, bizTypeCN, dealElement } from 'PublicMethods/MethodsJs'
export default {
	propus: [ "FromData" ],
	data() {
		return {
			currentPage: 1, //初始页
			pagesize: 10, //    每页的数据
			dialogFormVisible: false, // 资产库存弹窗状态
			relueForm: {
				id: '',
				bizPersonnelType: '',
				title: '',
				totalAmount: '',
				currentStock: '',
				remaindAmount: '',
				changeRemaindAmount: 0
			},
			rules: {
				changeRemaindAmount: [
					{ required: true, message: '修改剩余规模不能为空' }
				]
			}
		};
	},
	computed: {
		FilterList() {
		return this.$store.state.allassetslist.getLoanAssetList;
		}
	},
	methods: {
		tableRowClassName({ row, rowIndex }) {
		if (rowIndex % 2 == 1) {
			return "warning-row";
		}
		return "";
		},
		// 剩余资产为0
		open() {
		this.$alert("该资产剩余规模为0，无法创建", "提示", {
			confirmButtonText: "确定"
		});
		},
		editStock(subjectId) {
			this.dialogFormVisible = true
			Object.keys(this.relueForm).forEach((key, val) => {
				if(key == 'changeRemaindAmount') {
					this.relueForm[key] = 0
				} else {
					this.relueForm[key] = ''
				}
			})
			this.$axios.get('/api/loanAssets/' + subjectId).then((data) => {
				let result = data.data
				this.relueForm.id = result.id
				this.relueForm.title = result.title
				this.relueForm.bizPersonnelType = result.bizPersonnelType
				this.relueForm.totalAmount = result.totalAmount.amount
				this.relueForm.currentStock = result.currentStock.amount
				this.relueForm.remaindAmount = result.remaindAmount.amount
				if(result.remaindAmount.amount > 0) {
					this.relueForm.changeRemaindAmount = result.remaindAmount.amount
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		SubmitRule(formName) {
			this.$refs[formName].validate((valid) => {
				if(!valid) {
					return
				}
				this.$axios.put('/api/loanAssets/'+ this.relueForm.id +'/stock', {
					remaindAmount: this.relueForm.changeRemaindAmount
				}).then((data) => {
					this.$message({
						showClose: true,
						message: '恭喜您，保存成功',
						type: 'success'
					})
					this.dialogFormVisible = false
					this.$store.dispatch("LoanAssetList", dealElement(this.FromData));
				}).catch((err) => {
					this.$message({
						showClose: true,
						message: '保存失败，请刷新重试',
						type: 'error'
					})
				})
			})
		}
	}
};
</script>
