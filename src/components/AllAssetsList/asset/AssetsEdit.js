import { formatDate } from 'PublicMethods/MethodsJs'
// import { getRateValidator } from 'PublicMethods/validatorPlugin'
export default {
    data() {
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
                userName: '', // 资产所属人
                bizPersonnelType: '', // 资产类型
                title: '', // 资产名称
                totalAmount: '', // 资产规模
                payWay: '', // 还款方式
                assetsOfCompany: '', // 所属公司
                timeLimitType: '', // 资产期限
                startTime: '', // 资产起始日
                endTime: '', // 资产到期日
                limitDays: '', //  资产期限
                assetsAbleOverDays: '', // 宽限期
                assetsPeriods: '', // 资产基数
                annualRate: '', // 资产年化利率
                serviceRate: '', // 前端服务费率
                assetsRiskLevel: '', // 风险等级
                assetsRiskQuota: '', // 风险限额
                model: '', // 资产模式

                collectorId: '', // 受托支付账户
                collectorAccountType: '', // 账户类型
                collectRate: 100, // 受托支付比例
                borrowerType: '', // 实际借款人类型
                borrowerName: '',// 实际借款人名称
                borrowerFoundTime: '', // 成立时间
                borrowerLegalPersonName: '', // 法定代表人
                borrowerRegistAmount: '', // 注册规模（万元）
                borrowerRegistAddress: '', // 注册地址
                borrowerIdNum: '', // 证件号码

                channelId: '', // 所属渠道ID
                channelTitle: '', // 所属渠道名称
                borrowerMainCharacter: '', // 借款人主体性质
                borrowerWorkNature: '', // 借款人工作性质
                borrowerIndustry: '', // 借款人所属行业
                disposableIncome: '', // 月均收入
                liabilitiesCondition: '', // 负债情况
                otherPlatformBorrow: '', // 其他P2P平台借款
                creditCondition: '', // 征信情况
                platformOverdueTimes: '', // 平台逾期次数
                platformOverdueAmount: '', // 平台逾期总金额
                description: '', // 资产描述
                strength: '', // 资产亮点
                loanPurpose: '',  // 借款用途
                repaymentSource: '', // 还款来源
                repayGuarantee: '', // 还款保障
                riskManageStep: '', // 风控措施
                riskAlert: '', // 项目风险提醒
                addTrustMeasures: '', // 增信措施
                accepteData: [], // 已验收资料
            },
            ruleStatus: {
                timeLimitType: false, // 固定基数
                limitDaysDisabled: true, // 资产期限是否禁用
                assetsAbleOverDays: false, // 宽限期
                startTime: true,
                endTime: true,
                limitDays: true,
                assetsPeriods: true, // 资产期数
                levelAndQuota: false, // 风险等级 ｜ 限额
                borrowerMainCharacter: true, // 借款人主体性质
                disposableIncome: 'BIZ', // 月均收入
                accepteDataType: true, // 验证资料
                borrowerWorkNature: true, // 借款人工作性质
                strength: true, //资产亮点
                riskManageStep: true, // 风控措施
            },
            rules: {
                userName : [
                    { required: true, message: '资产所属人不能为空', trigger: 'blur' }
                ],
                bizPersonnelType: [
                    { required: true, message: '请选择资产类型', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '资产名称不能为空', trigger: 'blur' },
                    { max: 40, message: '资产名称不能超过40个字符', trigger: 'blur' }
                ],
                totalAmount: [
                    { required: true, message: '资产规模不能为空', trigger: 'blur' },
                    { min: 0, type: 'number', message: '资产规模必须为数字', trigger: 'blur' }
                ],
                payWay: [
                    { required: true, message: '请选择还款方式', trigger: 'change' }
                ],
                assetsOfCompany: [
                    { required: true, message: '请选择资产所属公司', trigger: 'change' }
                ],
                timeLimitType: [
                    { required: true, message: '请选择资产期限', trigger: 'change' }
                ],
                startTime: [
                    { type: 'date', required: true, message: '请选择资产起始日', trigger: 'blur' }
                ],
                endTime: [
                    { type: 'date', required: true, message: '请选择资产到期日', trigger: 'blur' }
                ],
                limitDays: [
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
                annualRate: [
                    { required: true, message: '资产年化利率不能为空', trigger: 'blur' },
                    { validator: this.$valid.getRateValidator, trigger: 'blur' }
                ],
                assetsRiskLevel: [
                    { required: true, message: '请选择风险等级', trigger: 'change' }
                ],
                assetsRiskQuota: [
                    { required: true, message: '风险限额不能为空', trigger: 'blur' },
                    // { type: 'number', validator: assetsRiskQuotaValidate, trigger: 'blur' }
                ],
                model: [
                    { required: true, message: '请选择资产模式', trigger: 'change' }
                ],
                channelId: [
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
                description: [
                    { required: true, message: '资产描述不能为空', trigger: 'blur' },
                    { max: 6000, message: '资产描述不能超过6000个字符', trigger: 'blur' }
                ],
                strength: [
                    { max: 6000, message: '资产亮点不能超过6000个字符', trigger: 'blur' }
                ],
                loanPurpose: [
                    { required: true, message: '借款用途不能为空', trigger: 'blur' },
                    { max: 300, message: '借款用途不能超过300个字符', trigger: 'blur' }
                ],
                repaymentSource: [
                    { required: true, message: '还款来源不能为空', trigger: 'blur' },
                    { max: 200, message: '还款来源不能超过200个字符', trigger: 'blur' }
                ],
                repayGuarantee: [
                    { required: true, message: '还款保障不能为空', trigger: 'blur' },
                    { max: 6000, message: '还款保障不能超过6000个字符', trigger: 'blur' }
                ],
                riskManageStep: [
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
                accepteData: [
                    { type: 'array', required: true, message: '请至少选择一个验收资料', trigger: 'change' }
                ]
            },
            channels: [], // 过滤后的渠道
            collectorId: [], // 受托支付账户列表
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

                this.getChannel(data.bizPersonnelType)
                // 债转类型代收设置 start
                data.collectorRate = data.collectorRate ? parseFloat(data.collectorRate) * 100 : ''
                data.actualBorrowerFoundTime = data.actualBorrowerFoundTime ? new Date(data.actualBorrowerFoundTime) : ''
                // 债转类型代收设置 end

                data.assetsOfCompany = data.assetsOfCompany ? data.assetsOfCompany : 'NULL'
                data.totalAmount = data.totalAmount.amount
                data.annualRate = parseFloat(data.annualRate * 100)
                 // 资产期限
                 if (data.timeLimitType == "DATE") {
                    this.ruleForm.startTime = new Date(data.startTime)
                    this.ruleForm.endTime = new Date(data.endTime)
                }
                data.endTime = data.endTime ? new Date(data.endTime) : ''
                data.startTime = data.startTime ? new Date(data.startTime) : ''
                //已验收资料 begin
                if(data.model=="DIRECT"||data.model=="COLLECT"){
                    //资产模式为直投，且资产录入用户为企业类型用户  //资产模式为直投，且资产录入用户类型为非企业用户
                    this.ruleStatus.accepteDataType = data.usertype == "ENTERPRISE" ? false : true
                }else{
                     //资产模式为债转，且实际借款人类型为企业   //资产模式为债转，且实际借款人类型为个人
                    this.ruleStatus.accepteDataType = data.actualBorrowerType == "ENTERPRISE" ? false : true
                }
                data.accepteData = data.accepteData.split(',')
                //已验收资料 end
                // this.ruleForm = Object.assign(this.ruleForm, data)
                for(let item in this.ruleForm) {
                    this.ruleForm[item] = data[item]
                }
                /* 合并对象 */
                this.ruleForm.borrowerFoundTime = data.actualBorrowerFoundTime
                this.ruleForm.borrowerIdNum = data.actualBorrowerIdNum
                this.ruleForm.borrowerLegalPersonName = data.actualBorrowerLegalPersonName
                this.ruleForm.borrowerRegistAddress = data.actualBorrowerRegistAddress
                this.ruleForm.borrowerRegistAmount = data.actualBorrowerRegistAmount
                this.ruleForm.borrowerType = data.actualBorrowerType
                this.ruleForm.collectRate = data.collectorRate


                this.ruleForm.assetsPeriods = data.limitDays
                if(data.timeLimitType == "FPN") {
                    this.ruleStatus.timeLimitType = true // 显示固定基数
                    this.ruleStatus.startTime = false
                    this.ruleStatus.endTime = false
                    this.ruleStatus.limitDays = false
                } else {
                    this.ruleStatus.assetsPeriods = false
                }

                this.ruleStatus.assetsAbleOverDays = data.payMay === 'ONCE_PRINCIPAL_AND_INTEREST' ? true : false
                this.ruleStatus.levelAndQuota = data.hasSubjectInLoanAsset ? false : true
                this.ruleStatus.borrowerWorkNature = data.borrowerMainCharacter != 'natural' ? false : true
                this.ruleStatus.riskManageStep = data.bizPersonnelType == 'BIZ' ? false : true
                this.ruleStatus.strength = data.bizPersonnelType == 'PERSONNEL' ? false : true
            })
        },
        // 所属渠道
        getChannel(type) {
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
            })
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if(!valid) {
                    return false
                }
                let submitData = Object.assign({}, this.ruleForm);
                let channels = this.channels
                for(let i = 0; i < channels.length; i++) {
                    if(channels[i].id == submitData.channelId) {
                        submitData.channelTitle = channels[i].title
                    }
                }
                submitData.accepteData = submitData.accepteData.join(',')
                submitData.startTime = formatDate(submitData.startTime)
                submitData.endTime = formatDate(submitData.endTime)
                
                this.$axios.put('/api/loanAssets/' + this.$route.query.assetId, submitData).then(result => {
                    let data = result.data
                    if(data == '') {
                        this.$notify({
                            title: '成功',
                            message: '修改资产成功',
                            type: 'success'
                        })
                        this.$router.push('/admin/allassetslist')
                    } else if(data.status == 'error') {
                        this.$notify.error({
                            title: "错误",
                            message: data.message
                        })
                    }
                }).catch(err => {
                    this.$notify.error({
                        title: '错误',
                        message: '修改资产失败:' + err.message
                    })
                })
            })
        },
        onCancel() {
            this.$router.push('/admin/allassetslist')
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
        // 渠道改变时
        channelIdChange() {
            this.ruleForm.accepteData = []
            let channels = this.channels
            let channelId = this.ruleForm.channelId
            for(let i = 0; i < channels.length; i++) {
                if(channelId == channels[i].id) {
                    if(channels[i].lineType == 'ON_LINE') {
                        this.ruleForm.description = channels[i].description
                        this.ruleForm.repaymentSource = channels[i].repaymentSource
                        this.ruleForm.repayGuarantee = channels[i].repayGuarantee
                        this.ruleForm.riskManageStep = channels[i].riskManageStep
                        this.ruleForm.riskAlert = channels[i].riskAlert
                        this.ruleForm.addTrustMeasures = channels[i].addTrustMeasures
                    }
                    let result = []
                    if(channels[i].acceptedData) {
                        result = channels[i].acceptedData.split(',')
                    }
                    this.ruleForm.accepteData = result
                }
            }
        }
    },
    created() {
        this.init()
    }
};
