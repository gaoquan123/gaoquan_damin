import Vue from 'vue'

Vue.filter("ModelType", function(value) {
    if(value == 'DIRECT'){
        return  '直投'
    }else if(value = 'TRANSFER'){
        return   '债转'
    }else if( value = 'COLLECT'){
        return '代收付'
    }
})