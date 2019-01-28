exports.install = function (Vue, options) {
    Vue.prototype.DataRoles = function (roles,val){
        let isShow = false;
        if(roles.length <= 0){
             isShow = false;
        }else{
            if(roles.indexOf(val) < 0){
                isShow = false;
            }else{
                isShow = true;
            }
        }
        return isShow
    };
};