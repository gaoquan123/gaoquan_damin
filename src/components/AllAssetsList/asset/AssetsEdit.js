export default {
    data() {
        // 年化利率验证
        var assetsRateValidate = (rule, value, callback) => {
            let reg = /^\d+(?:\.\d{1,2})?$/
            if(!reg.test(this.ruleForm.assetsRate)) {
                callback(new Error('资产年化利率输入在误'))
            } else if(value <= 0) { 
                callback(new Error('输入资产年化利率必须大于0'))
            } else {
                callback()
            }
        }
        // 风险限额
        var assetsRiskQuotaValidate = (rule, value, callback) => {
            if(value < 0 || value > 999999999) {
                callback(new Error('范围在0到999999999之间'))
            } else {
                callback()
            }
        }
        return {
            userInfo: {},
            enterpriseUesrInfo: {},
            assetId: this.$route.query.assetId,
            userId: this.$route.query.userId,
            // from默认数据
            ruleForm: {
                assetsUser: '', // 资产所属人
                bizPersonnelType: '', // 资产类型
                assetsName: '', // 资产名称
                assetsScale: '', // 资产规模
                instalmentPolicy: '', // 还款方式
                assetsOfCompany: '', // 所属公司
                assetsIntervalType: '', // 资产期限
                assetsStart: '', // 资产起始日
                assetsEnd: '', // 资产到期日
                assetsInterval: '', //  资产期限
                assetsAbleOverDays: '', // 宽限期
                assetsPeriods: '', // 资产基数
                assetsRate: '', // 资产年华利率
                assetsRiskLevel: '', // 风险等级
                assetsRiskQuota: '', // 风险限额
                assetsModel: '', // 资产模式

                collectorName: '', // 受托支付账户
                collectorAccountType: '', // 账户类型
                collectRate: 100, // 受托支付比例
                borrowerType: '', // 实际借款人类型
                borrowerName: '',// 实际借款人名称
                borrowerFoundTime: '', // 成立时间
                borrowerLegalPersonName: '', // 法定代表人
                borrowerRegistAmount: '', // 注册规模（万元）
                borrowerRegistAddress: '', // 注册地址
                borrowerIdNum: '', // 证件号码

                assetsChannel: '', // 所属渠道
                borrowerMainCharacter: '', // 借款人主体性质
                borrowerWorkNature: '', // 借款人工作性质
                borrowerIndustry: '', // 借款人所属行业
                disposableIncome: '', // 月均收入
                liabilitiesCondition: '', // 负债情况
                otherPlatformBorrow: '', // 其他P2P平台借款
                creditCondition: '', // 征信情况
                platformOverdueTimes: '', // 平台逾期次数
                platformOverdueAmount: '', // 平台逾期总金额
                assetsDescription: '', // 资产描述
                assetsHighlight: '',
                loanUsage: '',  // 借款用途
                repaymentSource: '', // 还款来源
                paySafeguard: '', // 还款保障
                riskControl: '', // 风控措施
                riskAlert: '', // 项目风险提醒
                addTrustMeasures: '', // 增信措施
                accepteData: [], // 已验收资料
            },
            ruleStatus: {
                assetsIntervalType: false, // 固定基数
                assetsIntervalDisabled: true, // 资产期限是否禁用
                assetsInterDisabled: true, // 资产期限
                assetsAbleOverDays: false, // 宽限期
                assetsStart: true,
                assetsEnd: true,
                assetsInterval: true,
                assetsPeriods: true, // 资产期数
                levelAndQuota: false,
                borrowerMainCharacter: true, // 借款人主体性质
                disposableIncome: 'BIZ', // 月均收入
                accepteDataType: true, // 验证资料
                borrowerWorkNature: true, // 借款人工作性质
                assetsHighlight: true, //资产亮点
                riskControl: true, // 风控措施
            },
            rules: {
                assetsUser : [
                    { required: true, message: '资产所属人不能为空', trigger: 'blur' }
                ],
                bizPersonnelType: [
                    { required: true, message: '请选择资产类型', trigger: 'change' }
                ],
                assetsName: [
                    { required: true, message: '资产名称不能为空', trigger: 'blur' },
                    { max: 40, message: '资产名称不能超过40个字符', trigger: 'blur' }
                ],
                assetsScale: [
                    { required: true, message: '资产规模不能为空', trigger: 'blur' },
                    { min: 0, type: 'number', message: '资产规模必须为数字', trigger: 'blur' }
                ],
                instalmentPolicy: [
                    { required: true, message: '请选择还款方式', trigger: 'change' }
                ],
                assetsOfCompany: [
                    { required: true, message: '请选择资产所属公司', trigger: 'change' }
                ],
                assetsIntervalType: [
                    { required: true, message: '请选择资产期限', trigger: 'change' }
                ],
                assetsStart: [
                    { type: 'date', required: true, message: '请选择资产起始日', trigger: 'blur' }
                ],
                assetsEnd: [
                    { type: 'date', required: true, message: '请选择资产到期日', trigger: 'blur' }
                ],
                assetsInterval: [
                    { required: true, message: '资产期限不能为空', trigger: 'blur' },
                    { type: 'number', message: '资产期限必须为数字', min: 0, trigger: 'blur' }
                ],
                assetsAbleOverDays: [
                    { required: true, message: '宽限期不能为空', trigger: 'blur' },
                    { type: 'number', message: '宽限期必须为数字', min: 0, trigger: 'blur' }
                ],
                assetsPeriods: [
                    { required: true, message: '资产期数不能为空', trigger: 'blur' },
                    { type: 'number', message: '资产期数必须为数字', min: 0, trigger: 'blur' }
                ],
                assetsRate: [
                    { required: true, message: '资产年华利率不能为空', trigger: 'blur' },
                    { validator: assetsRateValidate, trigger: 'blur' }
                ],
                assetsRiskLevel: [
                    { required: true, message: '请选择风险等级', trigger: 'change' }
                ],
                assetsRiskQuota: [
                    { required: true, message: '风险限额不能为空', trigger: 'blur' },
                    { type: 'number', validator: assetsRiskQuotaValidate, trigger: 'blur' }
                ],
                assetsModel: [
                    { required: true, message: '请选择资产模式', trigger: 'change' }
                ],
                assetsChannel: [
                    { required: true, message: '请选择所属渠道', trigger: 'change' }
                ],
                borrowerMainCharacter: [
                    { required: true, message: '请选择借款人主体性质', trigger: 'change' }
                ],
                borrowerWorkNature: [
                    { required: true, message: '请选择借款人工作性质', trigger: 'change' }
                ],
                borrowerIndustry: [
                    { required: true, message: '请选择借款人所属行业', trigger: 'change' }
                ],
                disposableIncome: [
                    { required: true, message: '请选择请选择月均收入', trigger: 'change' }
                ],
                liabilitiesCondition: [
                    { required: true, message: '负债情况不能为空', trigger: 'blur' },
                    { max: 50, message: '负债情况不能超过50个字符', trigger: 'blur' }
                ],
                otherPlatformBorrow: [
                    { required: true, message: '其他P2P平台借款不能为空', trigger: 'blur' },
                    { max: 100, message: '期货P2P平台借款不能超过100个字符', trigger: 'blur' }
                ],
                creditCondition: [
                    { required: true, message: '征信情况不能为空', trigger: 'blur' },
                    { max: 50, message: '征信情况不能超过50个字符', trigger: 'blur' }
                ],
                platformOverdueTimes: [
                    { required: true, message: '平台逾期次数不能为空', trigger: 'blur' },
                    { type: 'number', message: '平台逾期次数为数字', trigger: 'blur' }
                ],
                platformOverdueAmount: [
                    { required: true, message: '平台逾期总金额不能为空', trigger: 'blur' },
                    { type: 'number', message: '平台逾期总金额为数字', trigger: 'blur' }
                ],
                assetsDescription: [
                    { required: true, message: '资产描述不能为空', trigger: 'blur' },
                    { max: 6000, message: '资产描述不能超过6000个字符', trigger: 'blur' }
                ],
                assetsHighlight: [
                    { max: 6000, message: '资产亮点不能超过6000个字符', trigger: 'blur' }
                ],
                loanUsage: [
                    { required: true, message: '借款用途不能为空', trigger: 'blur' },
                    { max: 300, message: '借款用途不能超过300个字符', trigger: 'blur' }
                ],
                repaymentSource: [
                    { required: true, message: '还款来源不能为空', trigger: 'blur' },
                    { max: 200, message: '还款来源不能超过200个字符', trigger: 'blur' }
                ],
                paySafeguard: [
                    { required: true, message: '还款保障不能为空', trigger: 'blur' },
                    { max: 6000, message: '还款保障不能超过6000个字符', trigger: 'blur' }
                ],
                riskControl: [
                    { required: true, message: '风控措施不能为空', trigger: 'blur' },
                    { max: 6000, message: '风控措施不能超过6000个字符', trigger: 'blur' }
                ],
                riskAlert: [
                    { required: true, message: '项目风险提醒不能为空', trigger: 'blur' },
                    { max: 300, message: '项目风险提醒不能超过300个字符', trigger: 'blur' }
                ],
                addTrustMeasures: [
                    { required: true, message: '增信措施不能为空', trigger: 'blur' },
                    { max: 300, message: '增信措施不能超过300个字符', trigger: 'blur' }
                ],
                accepteData_personnel: [
                    { type: 'array', required: true, message: '请至少选择一个验收资料', trigger: 'change' }
                ],
                accepteData_enterprise: [
                    { type: 'array', required: true, message: '请至少选择一个验收资料', trigger: 'change' }
                ]
            },
            channels: [], // 过滤后的渠道
            collectorName: [], // 受托支付账户列表
            // 资产所属公司列表
            assetsOfCompanyList: [
                {
                    label: '其他',
                    value: 'NULL'
                },
                {
                    label: '众邦保理',
                    value: '众邦保理'
                },
                {
                    label: '众邦融资租赁',
                    value: '众邦融资租赁'
                },
                {
                    label: '杭州九鱼',
                    value: '杭州九鱼'
                },
                {
                    label: '卓尔金服',
                    value: '卓尔金服'
                },
                {
                    label: '汉口北担保',
                    value: '汉口北担保'
                },
                {
                    label: '业务一部',
                    value: '业务一部'
                },
                {
                    label: '业务二部',
                    value: '业务二部'
                },
                {
                    label: '业务三部',
                    value: '业务三部'
                },
                {
                    label: '供应链团队',
                    value: '供应链团队'
                },
                {
                    label: '嘉实金服',
                    value: '嘉实金服'
                }
            ],
            // 借款人所属行业 列表
            borrowerIndustryList: [
                { 
                    label: '农、林、牧、渔业', 
                    value: 'A' 
                },
                { 
                    label: '采矿业', 
                    value: 'B' 
                },
                { 
                    label: '制造业', 
                    value: 'C' 
                },
                { 
                    label: '电力、热力、燃气及水生产和供应业', 
                    value: 'D' 
                },
                { 
                    label: '建筑业', 
                    value: 'E' 
                },
                { 
                    label: '批发和零售业', 
                    value: 'F' 
                },
                { 
                    label: '交通运输、仓储和邮政业', 
                    value: 'G' 
                },
                { 
                    label: '住宿和餐饮业', 
                    value: 'H' 
                },
                { 
                    label: '信息传输、软件和信息技术服务业', 
                    value: 'I' 
                },
                { 
                    label: '金融业', 
                    value: 'J' 
                },
                { 
                    label: '房地产业', 
                    value: 'K' 
                },
                { 
                    label: '租赁和商务服务业', 
                    value: 'L' 
                },
                { 
                    label: '科学研究和技术服务业', 
                    value: 'M' 
                },
                { 
                    label: '水利、环境和公共设施管理业', 
                    value: 'N' 
                },
                { 
                    label: '居民服务、修理和其他服务业', 
                    value: 'O' 
                },
                { 
                    label: '教育', 
                    value: 'P' 
                },
                { 
                    label: '卫生和社会工作', 
                    value: 'Q' 
                },
                { 
                    label: '文化、体育和娱乐业', 
                    value: 'R' 
                },
                { 
                    label: '公共管理、社会保障和社会组织', 
                    value: 'S' 
                },
                { 
                    label: '国际组织', 
                    value: 'T' 
                },
                { 
                    label: '其他', 
                    value: 'U' 
                }
            ],
            // 风险等级列表
            assetsRiskLevelList: [
                {   
                   label: "高风险", 
                    value: "1" 
                },
                {   
                   label: "较高风险", 
                    value: "2" 
                },
                {   
                   label: "中等风险", 
                    value: "3" 
                },
                {   
                   label: "低级风险", 
                    value: "4" 
                },
                {   
                   label: "极低风险", 
                    value: "5" 
                }
            ],
            // 借款人工作性质列表
            borrowerWorkNatureList: [
                { 
                    label: "公司白领", 
                    value:"1" 
                },
                { 
                    label: "商人", 
                    value:"2" 
                },
                { 
                    label: "工人", 
                    value:"3" 
                },
                { 
                    label: "农民", 
                    value:"4" 
                },
                { 
                    label: "学生", 
                    value:"5" 
                },
                { 
                    label: "自由职业", 
                    value:"6" 
                }
            ],
            // 月均收入数据列表  
            disposableIncomeList: {
                'BIZ': [
                    {
                        label: '2000元以下',
                        value: '1'
                    },
                    {
                        label: '2001-5000',
                        value: '2'
                    },
                    {
                        label: '5001-10000',
                        value: '3'
                    },
                    {
                        label: '10001-20000',
                        value: '4'
                    },
                    {
                        label: '20001-50000',
                        value: '11'
                    },
                    {
                        label: '50001-100000',
                        value: '12'
                    },
                    {
                        label: '100000以上',
                        value: '13'
                    }
                ],
                'PERSONNEL': [
                     {
                        label: '5万以下',
                        value: '6'
                    },
                    {
                        label: '5万-20万',
                        value: '7'
                    },
                    {
                        label: '20万-50万',
                        value: '8'
                    },
                    {
                        label: '50-100万',
                        value: '9'
                    },
                    {
                        label: '100万以上',
                        value: '10'
                    }
                 ]
            }
        };
    },
     methods: {
        init() {
            this.$axios.get('/api/loanAssets/'+ this.$route.query.assetId).then((result) => {
                let data = result.data
                // this.ruleForm.userId = data.userId
                this.ruleForm.assetsUser = data.userName
                this.ruleForm.bizPersonnelType = data.bizPersonnelType
                this.ruleForm.assetsName = data.title
                this.ruleForm.assetsScale = data.totalAmount.amount
                if(data.timeLimitType == "FPN") {
                    this.ruleStatus.assetsIntervalType = true // 显示固定基数
                    this.ruleStatus.assetsStart = false
                    this.ruleStatus.assetsEnd = false
                    this.ruleStatus.assetsInterval = false
                    this.ruleForm.instalmentPolicy = 'MATCHING_PRINCIPAL_AND_INTEREST'
                    this.ruleForm.assetsPeriods = this.limitDays
                } else {
                    this.ruleForm.instalmentPolicy = 'ONCE_PRINCIPAL_AND_INTEREST'
                    this.ruleForm.assetsInterval = data.limitDays
                    this.ruleStatus.assetsPeriods = false
                }

                if(!data.assetsOfCompany){
                    this.ruleForm.assetsOfCompany = 'NULL'
                } else {
                    this.ruleForm.assetsOfCompany = data.assetsOfCompany
                }
                
                this.ruleForm.assetsIntervalType = data.timeLimitType
                 // 资产期限
                if (data.timeLimitType == "DATE") {
                    this.ruleForm.assetsStart = new Date(data.startTime)
                    this.ruleForm.assetsEnd = new Date(data.endTime)
                }

                if(data.payMay === 'ONCE_PRINCIPAL_AND_INTEREST') {
                    this.ruleStatus.assetsAbleOverDays = true
                    this.ruleForm.assetsAbleOverDays = data.assetsAbleOverDays
                }

                this.ruleForm.assetsRate = Number(data.annualRate *100)
                this.ruleStatus.levelAndQuota = data.hasSubjectInLoanAsset ? false : true
                this.ruleForm.assetsRiskLevel = data.assetsRiskLevel.toString()
                this.ruleForm.assetsRiskQuota = data.assetsRiskQuota
                this.ruleForm.assetsModel = data.model

                // this.ruleForm.assetsChannel = data.channelId
                this.getChannel(data.channelId, data.bizPersonnelType)
                this.ruleForm.borrowerMainCharacter = data.borrowerMainCharacter
                
                if(data.borrowerMainCharacter == 'natural' || data.borrowerMainCharacter == null) {
                    this.ruleForm.borrowerWorkNature = data.borrowerWorkNature
                } else {
                    this.ruleStatus.borrowerWorkNature = false
                }
                this.ruleForm.borrowerIndustry = data.borrowerIndustry
                this.ruleForm.disposableIncome = data.disposableIncome
                this.ruleStatus.disposableIncome = data.bizPersonnelType
                this.ruleForm.liabilitiesCondition = data.liabilitiesCondition
                this.ruleForm.otherPlatformBorrow = data.otherPlatformBorrow
                this.ruleForm.creditCondition = data.creditCondition
                this.ruleForm.platformOverdueTimes = data.platformOverdueTimes
                this.ruleForm.platformOverdueAmount = data.platformOverdueAmount
                this.ruleForm.assetsDescription = data.description ? data.description : ''
                this.ruleForm.loanUsage = data.loanPurpose ? data.loanPurpose : ''
                this.ruleForm.repaymentSource = data.repaymentSource
                this.ruleForm.paySafeguard = data.repayGuarantee ? data.repayGuarantee : ''

                if(data.bizPersonnelType == 'BIZ') {
                    this.ruleForm.assetsHighlight = data.strength ? data.strength : ''
                    this.ruleStatus.riskControl = false
                } else if(data.bizPersonnelType == 'PERSONNEL') {
                    this.ruleForm.riskControl = data.riskManageStep ? data.riskManageStep : ''
                    this.ruleStatus.assetsHighlight = false
                }

                this.ruleForm.riskAlert = data.riskAlert ? data.riskAlert : ''
                this.ruleForm.addTrustMeasures = data.addTrustMeasures ? data.addTrustMeasures : ''

                //已验收资料 begin
                if(data.model=="DIRECT"||data.model=="COLLECT"){
                    if(data.usertype == "ENTERPRISE"){  //资产模式为直投，且资产录入用户为企业类型用户

                        this.setEnterpriseAccepteData(data.accepteData);
                    }else{ //资产模式为直投，且资产录入用户类型为非企业用户
                        this.setPersonnelAccepteData(data.accepteData);
                    }
                }else{
                    if(data.actualBorrowerType == "ENTERPRISE"){   //资产模式为债转，且实际借款人类型为企业
                        this.setEnterpriseAccepteData(data.accepteData);
                    }else{ //资产模式为债转，且实际借款人类型为个人
                        this.setPersonnelAccepteData(data.accepteData);
                    }
                }
                //已验收资料 end

                // 债转类型代收设置 start
                // this.ruleForm.collectorName = 
                this.ruleForm.collectorAccountType = data.collectorAccountType
                this.ruleForm.collectRate = data.collectorRate ? parseFloat(data.collectorRate) * 100 : ''
                this.ruleForm.borrowerType = data.actualBorrowerType
                this.ruleForm.borrowerName = data.actualBorrowerName
                this.ruleForm.borrowerFoundTime = data.actualBorrowerFoundTime ? new Date(data.actualBorrowerFoundTime) : ''
                this.ruleForm.borrowerLegalPersonName = data.actualBorrowerLegalPersonName
                this.ruleForm.borrowerRegistAmount = data.actualBorrowerRegistAmount
                this.ruleForm.borrowerRegistAddress = data.actualBorrowerRegistAddress
                this.ruleForm.borrowerIdNum = data.actualBorrowerIdNum
                // 债转类型代收设置 end
                if(data.model == 'TRANSFER') {
                    if(data.actualBorrowerType == 'ENTERPRISE' || data.actualBorrowerType == '') {

                    }
                }



            }).catch((err) => {
                console.log(err)
            })
        },
        // 所属渠道
        getChannel(channelId, type) {
            this.$axios.get('/api/loanChannels').then((result) => {
                let data = result.data
                if(data.length <= 0) {
                    return false
                }
                let resultArr = []
                for(let i = 0; i < data.length; i++) {
                    if(data[i].status == 0 && data[i].bizPersonnelType.indexOf(type) > -1) {
                        resultArr.push(data[i])
                    }
                }
                this.channels = resultArr
                this.ruleForm.assetsChannel = channelId
               
            })
        },
        // 受托支付账户
        getCollectorName(collectorName) {
            // this.$axios.get('/')
        },
         // 对公 已验收资料
        setEnterpriseAccepteData(accepteDatas) {
            this.ruleStatus.accepteDataType = false
            this.ruleForm.accepteData = accepteDatas.split(',')
        },
        // 个金 已验收资料
        setPersonnelAccepteData(accepteDatas) {
            this.ruleStatus.accepteDataType = true
            this.ruleForm.accepteData = accepteDatas.split(',')
        },
        // 初始化数据
        getSubmitData() {
            let submitData = {}
            let ruleForm = this.ruleForm
            submitData.bizPersonnelType = ruleForm.bizPersonnelType // 资产类型
            submitData.model = ruleForm.assetsModel // 资产模式
            submitData.title = ruleForm.assetsName // 资产名称
            submitData.totalAmount = ruleForm.assetsScale // 资产规模

            return submitData
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                console.log(this.ruleForm)
                if(!valid) {
                    return false
                }

                this.$axios.put('/api/loanAssets/' + this.$route.query.assetId, this.getSubmitData()).then(result => {
                    if(data == undefined) {
                        this.$notify({
                            title: '成功',
                            message: '修改资产成功',
                            type: 'success'
                        })
                    } else if(data.status == 'error') {
                        this.$notify.error({
                            title: "错误",
                            message: data.message
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    this.$notify.error({
                        title: '错误',
                        message: '修改资产失败:' + err.responseJSON.message
                    })
                })
            })
        },
        // 资产剩余额度查询
        findUserAssetLimit() {
            this.$axios.post('/api/loanAssets/findUserAssetLimit', {
                userId: this.userId
            }).then(res => {
                this.$alert("用户当前存续中资产:" + res.data.remainderAmount +"元，剩余可增额度:"+ res.data.surplusAmout +"元。", '提示', {
                    confirmButtonText: '确定'
                })
            }).catch(xhr => {
                console.log(xhr)
            })
        },
        accMul(arg1,arg2) {
            let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try{ m += s1.split(".")[1].length }catch(e){}
            try{ m += s2.split(".")[1].length }catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
        },
        // 借款人主体性质 改变时
        borrowerMainChange() {
            if(this.ruleForm.borrowerMainCharacter == 'natural') {
                this.ruleStatus.borrowerWorkNature = true
                this.ruleStatus.disposableIncome = 'PERSONNEL'

            } else {
                this.ruleStatus.borrowerWorkNature = false
                this.ruleStatus.disposableIncome = 'BIZ'
            }
            this.ruleForm.disposableIncome = ''
        },
        // 还款方式 改变时
        instalmentPolicyChange() {
            if(this.ruleForm.instalmentPolicy == 'MATCHING_PRINCIPAL_AND_INTEREST') {
                // 显示 固定期数
                this.ruleStatus.assetsIntervalType = true
                // 显示资产期数
                this.ruleStatus.assetsPeriods = true
                this.ruleStatus.assetsInterval = false
                // 资产起始日
                this.ruleStatus.assetsStart = false
                this.ruleStatus.assetsEnd = false

                this.ruleForm.assetsIntervalType = 'FPN'
                this.ruleStatus.assetsIntervalDisabled = true
            } else {
                // 隐藏 固定期数
                this.ruleStatus.assetsIntervalType = false
                // 显示资产期数
                this.ruleStatus.assetsPeriods = false
                this.ruleStatus.assetsInterval = true
                // 资产起始日
                this.ruleStatus.assetsStart = true
                this.ruleStatus.assetsEnd = true

                this.ruleForm.assetsIntervalType = 'DATE'
                this.ruleStatus.assetsIntervalDisabled = false
            }
        },
        // 资产期限 改变时
        assetsIntervalChange() {
            let type = this.ruleForm.assetsIntervalType
            if(type == 'DATE') {
                this.ruleStatus.assetsStart = true
                this.ruleStatus.assetsEnd = true
                this.ruleStatus.assetsInterDisabled = true
            } else if(type == 'DAYS') {
                this.ruleStatus.assetsStart = false
                this.ruleStatus.assetsEnd = false
                this.ruleStatus.assetsInterDisabled = false
            }
        },
        // 渠道改变时
        assetsChannelChange() {
            this.ruleForm.accepteData_personnel = []
            this.ruleForm.accepteData_enterprise = []

            let channels = this.channels
            let assetsChannel = this.ruleForm.assetsChannel
            for(let i = 0; i < channels.length; i++) {
                if(assetsChannel == channels[i].id) {
                    if(channels[i].lineType == 'ON_LINE') {
                        this.ruleForm.assetsDescription = channels[i].description
                        this.ruleForm.repaymentSource = channels[i].repaymentSource
                        this.ruleForm.paySafeguard = channels[i].repayGuarantee
                        this.ruleForm.riskControl = channels[i].riskManageStep
                        this.ruleForm.riskAlert = channels[i].riskAlert
                        this.ruleForm.addTrustMeasures = channels[i].addTrustMeasures
                    }
                    let result = []
                    if(channels[i].acceptedData) {
                        result = channels[i].acceptedData.split(',')
                    }
                    // true为 个金已验收资料
                    if(this.ruleStatus.accepteDataType) {
                        this.ruleForm.accepteData_personnel = result
                    } else {
                        // false为 对公已验收资料
                        this.ruleForm.accepteData_enterprise = result
                    }
                }
            }
        }
    },
    created() {
        this.init()
    }
};
