const chinaMacroEvents = [
    {
        msiScore: 92,
        source: '中国人民银行',
        sourceType: 'official',
        title: '央行超预期降息25个基点，并下调LPR',
        summary: '中国人民银行宣布将一年期中期借贷便利（MLF）利率下调25个基点至2.4%，同时引导5年期以上贷款市场报价利率（LPR）下降15个基点，旨在降低实体经济融资成本，激发市场活力。',
        timestamp: '2小时前',
        analysis: {
            generalAnalysis: {
                summary: "本次降息幅度超出市场预期，是典型的强力宽松货币政策信号。此举旨在应对经济下行压力，通过降低信贷成本刺激投资和消费，稳定房地产市场预期。",
                impactTerm: "【短期】",
                affectedIndustry: "【房地产、银行、高负债行业】"
            },
            marketImpacts: [
                { market: "A股 (CSI 300)", impactLevel: "Major Bullish", impactTerm: "【短期】", reasoning: "流动性释放直接利好股市估值，特别是对利率敏感的成长股和券商板块构成重大利好。" },
                { market: "港股 (HSI)", impactLevel: "Major Bullish", impactTerm: "【短期】", reasoning: "内地流动性宽松预期将提振在港上市的中资股，改善市场整体风险偏好。" },
                { market: "USD/CNY", impactLevel: "Moderate Bearish", impactTerm: "【短期】", reasoning: "中美利差扩大可能短期内给人民币带来贬值压力，但强烈的稳增长信号可能对冲部分影响。" },
                { market: "美债 (10Y)", impactLevel: "Moderate Bullish", impactTerm: "【短期】", reasoning: "中国宽松政策可能引发全球增长担忧，部分避险资金可能流入美债，推高价格。" },
                { market: "黄金 (XAU/USD)", impactLevel: "Moderate Bullish", impactTerm: "【短期】", reasoning: "宽松货币政策通常利好黄金等非孳息资产。" },
                { market: "美股 (S&P 500)", impactLevel: "Neutral", impactTerm: "【短期】", reasoning: "对美股影响复杂，一方面担忧中国经济，另一方面全球流动性预期改善。" }
            ],
            economicPrinciples: [
                { 
                    principleName: "蒙代尔不可能三角",
                    explanation: "一个国家没法同时又要资本自由流动，又要独立的货币政策，又要稳定的汇率，最多只能三选二。这次降息就是优先保独立的货币政策和经济增长，可能会在汇率和资本流动上做些取舍。"
                }, 
                { 
                    principleName: "利率平价模型",
                    explanation: "钱会流向利息高的地方。如果两国利息有差距，那么高息货币的未来价格（远期汇率）就会下跌，低息货币未来价格就会上涨，直到两边投资收益差不多，没啥套利空间为止。中美利差扩大，会给人民币汇率带来短期压力。"
                }
            ]
        }
    },
    {
        msiScore: 78,
        source: '国家统计局',
        sourceType: 'official',
        title: '中国公布强劲的工业产出及零售数据',
        summary: '最新数据显示，全国规模以上工业增加值同比增长6.5%，社会消费品零售总额增长7.8%，双双超出市场预期，显示经济内生动力正在修复。',
        timestamp: '5小时前',
        analysis: {
            generalAnalysis: {
                summary: "宏观经济数据全面向好，确认了经济企稳回升的态势。工业生产的韧性和消费的复苏是主要驱动力，减轻了市场对经济硬着陆的担忧。",
                impactTerm: "【中长期】",
                affectedIndustry: "【制造业、消费品、物流】"
            },
            marketImpacts: [
                { market: "A股 (CSI 300)", impactLevel: "Major Bullish", impactTerm: "【短期】", reasoning: "强劲的经济基本面直接提升企业盈利预期，为股市提供坚实支撑。" },
                { market: "港股 (HSI)", impactLevel: "Major Bullish", impactTerm: "【短期】", reasoning: "中资股的盈利预期改善，同时提振国际投资者对中国资产的信心。" },
                { market: "USD/CNY", impactLevel: "Major Bullish", impactTerm: "【短期】", reasoning: "经济基本面走强支撑人民币汇率，人民币升值预期增强。" },
                { market: "美债 (10Y)", impactLevel: "Moderate Bearish", impactTerm: "【短期】", reasoning: "全球经济增长前景改善，风险偏好上升，避险资产美债承压。" },
                { market: "黄金 (XAU/USD)", impactLevel: "Moderate Bearish", impactTerm: "【短期】", reasoning: "避险情绪降温，对黄金价格构成压力。" },
                { market: "美股 (S&P 500)", impactLevel: "Moderate Bullish", impactTerm: "【短期】", reasoning: "中国作为全球增长的重要引擎，其经济走强利好全球供应链及在华有业务的跨国公司。" }
            ],
            economicPrinciples: [
                { 
                    principleName: "购买力平价理论",
                    explanation: "长期来看，一种货币的汇率应该能让它在不同国家买到同样多的东西。哪个国家经济强劲、通胀稳定，长期看它的货币就会升值。"
                }
            ]
        }
    }
];

const internationalMacroEvents = [
    {
        msiScore: 95,
        source: '美联储',
        sourceType: 'official',
        title: '美联储主席发表鹰派言论，暗示将进一步加息',
        summary: '美联储主席在杰克逊霍尔全球央行年会上强调，尽管近期数据显示通胀有所放缓，但仍远高于2%的目标。为确保价格稳定，不排除在未来会议上进一步加息的可能。',
        timestamp: '刚刚',
        analysis: {
            generalAnalysis: {
                summary: "主席讲话超预期的鹰派，粉碎了市场关于紧缩周期即将结束的幻想。其核心逻辑是，宁可过度紧缩也要避免通胀风险的二次抬头。",
                impactTerm: "【短期】",
                affectedIndustry: "【科技股、金融市场、进口依赖型行业】"
            },
            marketImpacts: [
                { market: "美股 (S&P 500)", impactLevel: "Major Bearish", impactTerm: "【短期】", reasoning: "超预期的鹰派立场将显著提高企业融资成本和未来现金流的折现率，对股票估值构成重大利空。" },
                { market: "美债 (10Y)", impactLevel: "Major Bearish", impactTerm: "【短期】", reasoning: "加息预期推高未来政策利率路径，导致各期限国债收益率上行，债券价格承压。" },
                { market: "黄金 (XAU/USD)", impactLevel: "Major Bearish", impactTerm: "【短期】", reasoning: "更高的利率增加了持有无息资产黄金的机会成本，同时强势美元也对金价构成压力。" },
                { market: "USD/CNY", impactLevel: "Major Bullish", impactTerm: "【短期】", reasoning: "美联储的鹰派立场强化了美元的强势地位，扩大了与其他主要货币的利差，利好USD/CNY上行。" },
                { market: "A股 (CSI 300)", impactLevel: "Moderate Bearish", impactTerm: "【短期】", reasoning: "外部流动性收紧和风险偏好下降，可能通过资本流动和情绪传导对A股市场造成间接负面影响。" },
                { market: "港股 (HSI)", impactLevel: "Major Bearish", impactTerm: "【短期】", reasoning: "港股市场对全球流动性高度敏感，美元流动性收紧将直接冲击其估值体系，影响大于A股。" }
            ],
            economicPrinciples: [
                { 
                    principleName: "泰勒规则",
                    explanation: "一个给央行行长参考的“傻瓜公式”，告诉他在当前通胀和经济增长情况下，利率应该调到多少才合适。主席的鹰派发言，就是认为按规则来看，利率还不够高。"
                }, 
                { 
                    principleName: "利率平价模型",
                    explanation: "钱会流向利息高的地方。如果两国利息有差距，那么高息货币的未来价格（远期汇率）就会下跌，低息货币未来价格就会上涨，直到两边投资收益差不多，没啥套利空间为止。美元加息，美元资产就更香了。"
                }
            ]
        }
    },
    {
        msiScore: 85,
        source: '路透社',
        sourceType: 'media',
        title: '美国最新非农就业数据远超预期，失业率创历史新低',
        summary: '美国劳工部报告称，上月新增非农就业人口52.8万，远高于市场预期的25万。失业率降至3.5%，表明劳动力市场依然极度紧张。',
        timestamp: '1天前',
        analysis: {
            generalAnalysis: {
                summary: "异常强劲的就业报告加剧了市场对通胀的担忧，因为它意味着工资上涨压力将持续存在。这为美联储继续大幅加息提供了坚实的数据支持。",
                impactTerm: "【短期】",
                affectedIndustry: "【所有行业，特别是服务业和劳动力密集型行业】"
            },
            marketImpacts: [
                { market: "美股 (S&P 500)", impactLevel: "Major Bearish", impactTerm: "【短期】", reasoning: "强劲的就业数据强化了美联储的加息预期，对股市构成压力。" },
                { market: "美债 (10Y)", impactLevel: "Major Bearish", impactTerm: "【短期】", reasoning: "市场定价更激进的加息路径，导致国债收益率飙升，价格下跌。" },
                { market: "黄金 (XAU/USD)", impactLevel: "Moderate Bearish", impactTerm: "【短期】", reasoning: "加息预期和强势美元共同打压黄金。" },
                { market: "USD/CNY", impactLevel: "Moderate Bullish", impactTerm: "【短期】", reasoning: "美元因加息预期而走强。" },
                { market: "A股 (CSI 300)", impactLevel: "Moderate Bearish", impactTerm: "【短期】", reasoning: "外部紧缩压力增加，全球风险资产情绪受挫。" },
                { market: "港股 (HSI)", impactLevel: "Moderate Bearish", impactTerm: "【短期】", reasoning: "对全球流动性敏感，受美联储政策预期影响显著。" }
            ],
            economicPrinciples: [
                { 
                    principleName: "菲利普斯曲线",
                    explanation: "短期内，失业率和通胀率是反着来的。要想让失业率降低，就得忍受高一点的通胀；要想压住通胀，可能就得牺牲一些就业岗位。现在失业率这么低，通胀压力就大。"
                }, 
                { 
                    principleName: "泰勒规则",
                    explanation: "一个给央行行长参考的“傻瓜公式”，告诉他在当前通胀和经济增长情况下，利率应该调到多少才合适。火热的就业数据意味着经济好，支持加息。"
                }
            ]
        }
    }
];

export function generateChinaMacroEvents() {
    return chinaMacroEvents;
}

export function generateInternationalMacroEvents() {
    return internationalMacroEvents;
}
