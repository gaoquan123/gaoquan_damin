import Vue from 'vue'
import {p2p} from '../assets/superAdmin'

Vue.filter("adminroles", function(value) {
    return  p2p.admin.roles[value];
})

// Vue.directive('focus', {
//     inserted: function (el,binding) {
//       el.focus()
//         let roles = binding.value.roles;
//         let val = binding.value.val;
//         if(roles.length <= 0){
//                 el.parentNode.removeChild(el);
//         }else{
//             if(roles.indexOf(val) < 0){
//                 el.parentNode.removeChild(el);
//             }
//             // for(var i = 0 ; i < roles.length; i++){
//             //     if(roles[i] == val){
//             //         console.log(el,"2202020")
//             //         el.style.display = "block";
//             //         return;
//             //     }else{
//             //         console.log(el,"111111")
//             //         el.style.display = "none"
//             //     }
//             // }
         
//         }
//     }
//   })
//   Vue.directive('has', function (el, binding) {
//     let roles = binding.value.roles;
//     let val = binding.value.val;
//     if(roles.length <= 0){
//             el.parentNode.removeChild(el);
//     }else{
//         if(roles.indexOf(val) < 0){
//             el.parentNode.removeChild(el);
//             // $(el).addClass('Roleshide')
//             // el.parentNode.removeChild(el);
//             // $(el).parent().remove();
//             console.log(el,"202-02")
//             // el.parentNode.removeChild(el);
//         // console.log(el.parentNode.removeChild(el),"202020")
//         }
//     }
//   })



