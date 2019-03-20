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
				<!-- <template slot-scope="scope">
          <a v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn5')"  @click="assetsCreate(scope.row)">创建标的</a>
					<router-link v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn7')" :to="{path: '/admins/allassetslist/subjectinfo', query:{userId:scope.row.userId,assetId:scope.row.id}}">标的信息</router-link>
          <a v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn9')" @click="assetsEdit(scope.row)">编辑</a>
					<br>
					<a v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn8')" @click="editStock(scope.row.id)">修改库存</a>
					<a v-if="DataRoles($store.state.login.roles,'allassetslistTab1btn10')" >删除</a>
					<a v-if="scope.row.state == 'PARTIAL_MATURITY'">提前到期</a>
				</template> -->
				<template slot-scope="scope">
          <a  @click="assetsCreate(scope.row)">创建标的</a>
					<router-link :to="{path: '/admins/allassetslist/subjectinfo', query:{userId:scope.row.userId,assetId:scope.row.id}}">标的信息</router-link>
          <a @click="assetsEdit(scope.row)">编辑</a>
					<br>
					<a @click="editStock(scope.row.id)">修改库存</a>
					<a  >删除</a>
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
import { userInfo } from 'os';
export default {
	props: [ "FromData" ],
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
		assetsCreate(item) {
			if(parseFloat(item.remaindAmount.amount) <= 0) {
				this.$alert("该资产剩余规模为0，无法创建", "提示", {
					confirmButtonText: "确定",
					callback: action => {}
				})
				return false
			}
			item.operation = 'create'
			this.assetsOperation(item, item.usertype)

		},
		assetsEdit(item) {
			item.operation = 'edit'
			this.assetsOperation(item, item.usertype)
			// this.$router.push('/admins/allassetslist/assetsedit')
		},
		assetsOperation(item, type) {
			this.$axios.get('/api/users/findAccIdAndType?userId=' + item.userId).then(res => {
				let data = res.data
				if(data == '') {
					this.$notify.error({
						title: '失败',
						message: '查询存管账户ID失败',
					})
				} else if(data.status == 'success') {
					return data
				}
			}).catch( err => {
				this.$notify.error({
					title: '失败',
					message: '查询存管账户ID失败',
				})
			}).then(data => {
				this.$axios.get('/pay/lanmao/form/QUERY_USER_INFORMATION.json?platformUserNo=' + data.accountId).then(result => {
					if(data.usertype == 'ENTERPRISE') {
						this.$confirm('温馨提醒：该用户存管还未审核通过，请注意', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							return result.data
						})
					} else {
						return result.data
					}
				}).then(data => {
					if(data.bankcardNo == '' || typeof(data.bankcardNo) == 'undefined') {
						this.$confirm('温馨提醒：该用户当前未绑定银行卡，请知悉！', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						}).then(() => {
							this.checkStyle(item, type)
						})
					} else {
						this.checkStyle(item, type)
					}
				})
			})
		},
		checkStyle(item, type) {
			if(item.operation == 'edit') {
				this.$router.push({ name: 'AssetsEdit', query: { userId: item.userId, assetId: item.id }})
			}else {
				// this.$router.push({ name: 'NewSubjectLoan', query: { userId: item.userId, assetId: item.id }})

				this.$axios({
                    url: '/api/users/userInformatization',
                    method: 'post',
                    data: JSON.stringify({ userId: item.userId }),
                    headers: {
						'Content-Type': 'application/json',
						'csrf-token': Cookies.get('_csrf')
					}
                }).then( (response)=> {
					console.log(type)
					if (type == "ENTERPRISE") {
						this.$router.push({ name: 'CreateSubject', query: { userId: item.userId, assetId: item.id }})
					} else if (type == "PERSONAL_LOAN") {
						this.$router.push({ name: 'CreateSubjectLoan', query: { userId: item.userId, assetId: item.id }})
					}
                    
                }).catch( (error)=> {
					console.log(error)
                    this.$alert(error.message, "提示", {
						confirmButtonText: "确定",
						callback: action => {}
					})
                });
			}
		},
		// 修改库存
		editStock(subjectId) {
			Object.keys(this.relueForm).forEach((key, val) => {
				if(key == 'changeRemaindAmount') {
					this.relueForm[key] = 0
				} else {
					this.relueForm[key] = ''
				}
			})
			this.$axios.get('/api/loanAssets/' + subjectId).then((data) => {
				this.dialogFormVisible = true
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

				this.$axios({
					url: '/api/loanAssets/'+ this.relueForm.id +'/stock',
					method: 'put',
					data: JSON.stringify({ remaindAmount: this.relueForm.changeRemaindAmount }),
					headers: {
						'Content-Type': 'application/json',
						'csrf-token': Cookies.get('_csrf')
					}
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
