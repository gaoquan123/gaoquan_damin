<template>
    <div class="newsubjectbox m-t-20">
        <el-table border  :data="tbaleList.item" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column  prop="totalPage" label="项目名称" width="180"></el-table-column>
        
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
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tbaleList:this.$store.state.subjects.GetSubjectInfoItem,
      }
    },
    created() {
        // console.log()
    },
  }
</script>