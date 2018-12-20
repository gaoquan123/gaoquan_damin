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

.w5{width: 5%;}
.w10{width: 10%;}
.w15{width: 15%;}
.w20{width: 20%;}
.w25{width: 25%;}
.w30{width: 30%;}
.w35{width: 35%;}
.w40{width: 40%;}
.w45{width: 45%;}
.w50{width: 50%;}
.w55{width: 55%;}
.w60{width: 60%;}
.w65{width: 65%;}
.w70{width: 70%;}
.w75{width: 75%;}
.w80{width: 80%;}
.w85{width: 85%;}
.w90{width: 90%;}
.w95{width: 95%;}
.w100{width: 100%;}
.h100{height: 100%;}
.h50{height: 50%;}
.m-r-10{margin-right: 10px;}
.m-r-15{margin-right: 15px;}
.m-r-20{margin-right: 20px;}
.m-r-30{margin-right: 30px;}
.m-r-40{margin-right: 40px;}
.m-r-50{margin-right: 50px;}

.m-t-10{margin-top: 10px;}
.m-t-15{margin-top: 15px;}
.m-t-20{margin-top: 20px;}
.m-t-30{margin-top: 30px;}
.m-t-40{margin-top: 40px;}
.m-t-50{margin-top: 50px;}

.m-l-10{margin-left: 10px;}
.m-l-15{margin-left: 15px;}
.m-l-20{margin-left: 20px;}
.m-l-30{margin-left: 30px;}
.m-l-40{margin-left: 40px;}
.m-l-50{margin-left: 50px;}

.m-b-10{margin-bottom: 10px;}
.m-b-15{margin-bottom: 15px;}
.m-b-20{margin-bottom: 20px;}
.m-b-30{margin-bottom: 30px;}
.m-b-40{margin-bottom: 40px;}
.m-b-50{margin-bottom: 50px;}

.p-b-10{padding-bottom: 10px;}
.p-b-15{padding-bottom: 15px;}
.p-b-20{padding-bottom: 20px;}
.p-b-30{padding-bottom: 30px;}
.p-b-40{padding-bottom: 40px;}
.p-b-50{padding-bottom: 50px;}

.p-t-10{padding-top: 10px;}
.p-t-15{padding-top: 15px;}
.p-t-20{padding-top: 20px;}
.p-t-30{padding-top: 30px;}
.p-t-40{padding-top: 40px;}
.p-t-50{padding-top: 50px;}


.p-l-10{padding-left: 10px;}
.p-l-15{padding-left: 15px;}
.p-l-20{padding-left: 20px;}
.p-l-30{padding-left: 30px;}
.p-l-40{padding-left: 40px;}
.p-l-50{padding-left: 50px;}

.p-r-10{padding-right: 10px;}
.p-r-15{padding-right: 15px;}
.p-r-20{padding-right: 20px;}
.p-r-30{padding-right: 30px;}
.p-r-40{padding-right: 40px;}
.p-r-50{padding-right: 50px;}
.front-16{font-size: 16px;}
.front-18{font-size: 18px;}
.front-20{font-size: 20px;}
.front-22{font-size: 22px;}
.front-14{font-size: 14px;}
.front-24{font-size: 24px;}
.front-26{font-size: 26px;}
.color{color:#409EFF}




.w33{width: 33%;}
.cl{clear: both;}
.fl{float: left;}
.fr{float: right;}
.front14{font-size: 14px}
.front16{font-size: 16px}
.front18{font-size: 18px}
.front20{font-size: 20px}
.ipt{
    display: inline-block;
    background-color: #f5f7fa;
    color: #909399;
    border: 1px solid #dcdfe6;
    border-radius: 4px 0px 0px 4px;
    padding: 11px 10px;
    margin-right: -6px;
}
</style>
