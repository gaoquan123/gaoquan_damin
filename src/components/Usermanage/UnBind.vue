<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admins/usermanage' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>解绑银行卡申请</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="front-20 m-t-30"> 解绑银行卡申请</h3>
    <el-row>
      <el-col :span="6">
        <div class="block">
          <span class="demonstration">起始日期</span>
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block">
          <span class="demonstration">结束日期</span>
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="demonstration">数据范围</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%" class="m-t-40">
      <el-table-column
        prop="date"
        label="编号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="时间"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="申请用户"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="银行卡ID"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="账户ID"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">确认解绑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">取消解绑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        startTime: new Date(),
        endTime: new Date(),
        value: '0',
        options: [{
          value: '0',
          label: '历史数据'
        }, {
          value: '1',
          label: '即时数据'
        }],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      query: function () {
        console.log(this.startTime,this.endTime.getTime());
      }
    },
  }
</script>
<style lang="less" scoped>
  h3 {
    font-size: 24px;
    margin-bottom: 25px;
    color: #4f9dff;
  }
  .el-pagination{
    text-align: center;
    margin-top: 30px;
  }


</style>
