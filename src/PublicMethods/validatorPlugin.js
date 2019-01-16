const Validator = {
    /*手机号字符串校验*/
    isPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    /*获取校验器*/
    getPhoneValidator(){
       let validPhone=(rule, value, callback)=>{
           if (!Validator.isPhone(value)){
            callback(new Error('请输入正确的11位手机号码'))
          }else {
              callback()
          }
      }
      return validPhone
	  },
    /* 年化利率校验 */
    getRateValidator(rule, value, callback) {
      let reg = /^\d+(?:\.\d{1,2})?$/
      if(!reg.test(value)) {
        callback(new Error('利率输入在误'))
      } else if(value < 0) { 
        callback(new Error('利率必须大于0'))
      } else {
        callback()
      }
    },
    /* 金额校验 */
    getAmountValidator(rule, value, callback) {
      let reg = /^\d+(?:\.\d{1,2})?$/
      if(!reg.test(value)) {
        callback(new Error('金额有误'))
      } else if(value <= 0) { 
        callback(new Error('金额必须大于0'))
      } else {
        callback()
      }
    }
  }
   
  // 对Validator的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function(Vue, Option) {
      Object.defineProperty(Vue.prototype, "$valid", { value: Validator });
    }
  };
  