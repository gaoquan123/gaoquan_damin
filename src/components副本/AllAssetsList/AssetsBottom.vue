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
                        <router-link to="/admin/allassetslist/newsubject">创建标的</router-link>
                        <a>标的信息</a>
                        <a>编辑</a>
                        <br>
                        <a>修改库存</a>
                        <a>删除</a>
                        <a>提前到期</a>
                    </template>
                </el-table-column>
        </el-table>
          
    </div>

  
</template>

<style lang="less" scoped>

 /deep/.warning-row {
    background-color: #Eee !important;
  }

 /deep/.success-row {
    background-color: #f0f9eb!important;
  }
  /deep/.el-table td{
          text-align: center!important;
          text-align: -webkit-center!important;
  }
   /deep/.el-table th{
         text-align: center!important;
          text-align: -webkit-center!important;
  }
</style>

<script>
  export default {
    data() {
      return {
            currentPage:1, //初始页
            pagesize:10,    //    每页的数据
      }
    },
     computed: {
        FilterList(){
          return this.$store.state.allassetslist.getLoanAssetList
        }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 1) {
          return 'warning-row';
        } 
        return '';
      }
 
    }
  }
</script>