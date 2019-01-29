<template>
  <div id="app">
      <div class="headerTop">
            <Header></Header>
      </div>
      <div class="leftNavContentItem w100 fl">
            <NavMenu></NavMenu>
            <div class="content_right fl">
                    <router-view/>
            </div>
     </div>
     <div class="haha"></div>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
      NavMenu,Header
  }
}
</script>

<style>
.content_right{
    width:-webkit-calc(100% - 240px);
    width:-moz-calc(100% - 240px);
    width:calc(100% - 240px);
    left: 180px;
    position: absolute;
    background: #fff;
    margin-top: 20px;
    margin-left: 20px;
    padding:20px;
    box-sizing: border-box;

}
.el-loading-parent--hidden {
  overflow: visible!important;
}
.el-popup-parent--hidden {
    overflow: unset!important;
}
.el-dialog__wrapper{
  overflow: visible!important;
}

.w5{width: 5% !important;}
.w10{width: 10% !important;}
.w15{width: 15% !important;}
.w20{width: 20% !important;}
.w25{width: 25% !important;}
.w30{width: 30% !important;}
.w35{width: 35% !important;}
.w40{width: 40% !important;}
.w45{width: 45% !important;}
.w50{width: 50% !important;}
.w55{width: 55% !important;}
.w60{width: 60% !important;}
.w65{width: 65% !important;}
.w70{width: 70% !important;}
.w75{width: 75% !important;}
.w80{width: 80% !important;}
.w85{width: 85% !important;}
.w90{width: 90% !important;}
.w95{width: 95% !important;}
.w100{width: 100% !important;}
.h100{height: 100% !important;}
.h50{height: 50% !important;}
.m-r-10{margin-right: 10px !important;}
.m-r-15{margin-right: 15px !important;}
.m-r-20{margin-right: 20px !important;}
.m-r-30{margin-right: 30px !important;}
.m-r-40{margin-right: 40px !important;}
.m-r-50{margin-right: 50px !important;}

.m-t-10{margin-top: 10px !important;}
.m-t-15{margin-top: 15px !important;}
.m-t-20{margin-top: 20px !important;}
.m-t-30{margin-top: 30px !important;}
.m-t-40{margin-top: 40px !important;}
.m-t-50{margin-top: 50px !important;}

.m-l-10{margin-left: 10px !important;}
.m-l-15{margin-left: 15px !important;}
.m-l-20{margin-left: 20px !important;}
.m-l-30{margin-left: 30px !important;}
.m-l-40{margin-left: 40px !important;}
.m-l-50{margin-left: 50px !important;}

.m-b-10{margin-bottom: 10px !important;}
.m-b-15{margin-bottom: 15px !important;}
.m-b-20{margin-bottom: 20px !important;}
.m-b-30{margin-bottom: 30px !important;}
.m-b-40{margin-bottom: 40px !important;}
.m-b-50{margin-bottom: 50px !important;}

.p-b-10{padding-bottom: 10px !important;}
.p-b-15{padding-bottom: 15px !important;}
.p-b-20{padding-bottom: 20px !important;}
.p-b-30{padding-bottom: 30px !important;}
.p-b-40{padding-bottom: 40px !important;}
.p-b-50{padding-bottom: 50px !important;}

.p-t-10{padding-top: 10px !important;}
.p-t-15{padding-top: 15px !important;}
.p-t-20{padding-top: 20px !important;}
.p-t-30{padding-top: 30px !important;}
.p-t-40{padding-top: 40px !important;}
.p-t-50{padding-top: 50px !important;}


.p-l-10{padding-left: 10px !important;}
.p-l-15{padding-left: 15px !important;}
.p-l-20{padding-left: 20px !important;}
.p-l-30{padding-left: 30px !important;}
.p-l-40{padding-left: 40px !important;}
.p-l-50{padding-left: 50px !important;}

.p-r-10{padding-right: 10px !important;}
.p-r-15{padding-right: 15px !important;}
.p-r-20{padding-right: 20px !important;}
.p-r-30{padding-right: 30px !important;}
.p-r-40{padding-right: 40px !important;}
.p-r-50{padding-right: 50px !important;}
.color{color:#409EFF}
.p20{
    padding: 20px !important;
}
.p10{
    padding: 10px !important;
}


.w33{width: 33% !important;}
.cl{clear: both;}
.fl{float: left;}
.fr{float: right;}
.front14{font-size: 14px !important;}
.front13{font-size: 13px !important;}
.front12{font-size: 12px !important;}
.front16{font-size: 16px !important;}
.front18{font-size: 18px !important;}
.front20{font-size: 20px !important;}
.ipt{
    display: inline-block;
    background-color: #f5f7fa;
    color: #909399;
    border: 1px solid #dcdfe6;
    border-radius: 4px 0px 0px 4px;
    padding: 11px 10px;
    margin-right: -6px;
}
.border{
    border: 1px solid #eee;
}
</style>
