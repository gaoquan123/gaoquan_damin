<template>
    <div>
        我是回款完成
    </div>
</template>
<script>
    export default {
        computed:{
        listItemTab(){
          return  this.$store.state.subjects.GetSubjectInfoItem
        }
    },
    }
</script>