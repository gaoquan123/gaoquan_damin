export default {
    data() {
      return {
        userInfo:{},
        enterpriseUesrInfo:{},
        assetId:this.$route.query.assetId,
        userId:this.$route.query.userId,
        // from默认数据
        ruleForm: {
            // name:'',
            title: '', // 标的项目名称
            type:'', // 标的项目类别
            remaindAmount:'', // 借款金额
            payWay: '', // 分期方式
            limitDays:'',
            date1: '',
            date2: '',
            delivery: false,
            resource: '',
            desc: '',
            value:'',
            region:''
        },
        ruleStatus: {
            typeStatus: true, // 标的项目类别 新手标
        }
      }
    },
    methods: {
        //标的默认数据
        reloadsApiInfo(){
            this.$axios.get(`/api/loanAssets/${this.assetId}`)
            .then((res)=>{
                let data = res.data
                this.ruleForm.title = data.title;
                if(data.payWay == "MATCHING_PRINCIPAL_AND_INTEREST"){
                    this.ruleStatus.typeStatus = false
                    this.ruleForm.limitDays = data.limitDays;
                }
                this.ruleForm.payWay = data.payWay
                this.ruleForm.remaindAmount = data.remaindAmount.amount;   //出借金额
                this.ruleForm.basicsRate = parseFloat(data.annualRate) * 100 //标的总利率

            })
        },
        onSubmit() {
            console.log('submit!');
        },
        reloadsUserInfo(){
                // 右边个人信息菜单显示
            this.$axios.get(`/admin/ums/users/${this.userId}`)
            .then((res)=>{
                if(res.data.type=="ENTERPRISE"){
                    this.enterpriseUesrInfo = res.data
                }else{
                    this.userInfo = res.data;
                }
            })
        },
        //隐藏按钮
        displayBtn(){
            $(".box-card").hide();
        }

    },
    created(){
        this.reloadsUserInfo();
        this.reloadsApiInfo();
    }
}
