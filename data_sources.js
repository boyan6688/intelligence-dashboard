const dataSources = {
    "china": {
        "官方决策层": [
            { "name": "国家统计局 (NBS)", "url": "https://data.stats.gov.cn/" }, { "name": "中国人民银行 (PBC)", "url": "http://www.pbc.gov.cn/" }, { "name": "国家外汇管理局 (SAFE)", "url": "http://www.safe.gov.cn/" },
            { "name": "国家金融监督管理总局 (NFRA)", "url": "https://www.nfra.gov.cn/" }, { "name": "中国证券监督管理委员会 (CSRC)", "url": "http://www.csrc.gov.cn/" }, { "name": "财政部 (MOF)", "url": "http://www.mof.gov.cn/" },
            { "name": "商务部 (MOFCOM)", "url": "http://www.mofcom.gov.cn/" }, { "name": "国家发展和改革委员会 (NDRC)", "url": "https://www.ndrc.gov.cn/" }, { "name": "海关总署 (GAC)", "url": "http://www.customs.gov.cn/" },
            { "name": "工业和信息化部 (MIIT)", "url": "https://www.miit.gov.cn/" }, { "name": "人力资源和社会保障部 (MOHRSS)", "url": "http://www.mohrss.gov.cn/" }, { "name": "农业农村部 (MARA)", "url": "http://www.moa.gov.cn/" },
            { "name": "国家能源局 (NEA)", "url": "http://www.nea.gov.cn/" }, { "name": "国家税务总局 (STA)", "url": "http://www.chinatax.gov.cn/" }, { "name": "国务院国有资产监督管理委员会 (SASAC)", "url": "http://www.sasac.gov.cn/" }
        ],
        "智库研报层": [
            { "name": "中国社会科学院 (CASS)", "url": "http://www.cass.cn/" }, { "name": "国务院发展研究中心 (DRC)", "url": "http://www.drc.gov.cn/" }, { "name": "中国国际经济交流中心 (CCIEE)", "url": "https://www.cciee.org.cn/" },
            { "name": "中国物流与采购联合会 (CFLP)", "url": "http://www.cflp.org.cn/" }, { "name": "中国互联网信息中心 (CNNIC)", "url": "http://www.cnnic.cn/" }
        ],
        "权威媒体层": [
            { "name": "《求是》杂志 (Qiushi Journal)", "url": "http://www.qstheory.cn/" }, { "name": "新华社财经 (Xinhua Finance)", "url": "http://www.news.cn/fortune/" }, { "name": "人民网财经 (People's Daily Finance)", "url": "http://finance.people.com.cn/" },
            { "name": "央视财经 (CCTV Finance)", "url": "https://finance.cctv.com/" }, { "name": "中国经济网 (China Economic Net)", "url": "http://www.ce.cn/" }, { "name": "经济日报 (Economic Daily)", "url": "http://paper.ce.cn/" },
            { "name": "中国证券报 (China Securities Journal)", "url": "https://www.cs.com.cn/" }, { "name": "上海证券报 (Shanghai Securities News)", "url": "https://www.cnstock.com/" }, { "name": "证券时报 (Securities Times)", "url": "https://www.stcn.com/" },
            { "name": "21世纪经济报道 (21st Century Biz Herald)", "url": "https://www.21jingji.com/" }, { "name": "财新网 (Caixin)", "url": "https://www.caixin.com/" }
        ],
        "市场情绪层": [
            { "name": "上海证券交易所 (SSE)", "url": "http://www.sse.com.cn/" }, { "name": "深圳证券交易所 (SZSE)", "url": "http://www.szse.cn/" }, { "name": "北京证券交易所 (BSE)", "url": "http://www.bse.cn/" },
            { "name": "中国外汇交易中心 (CFETS)", "url": "http://www.chinamoney.com.cn/" }, { "name": "上海期货交易所 (SHFE)", "url": "http://www.shfe.com.cn/" }, { "name": "大连商品交易所 (DCE)", "url": "http://www.dce.com.cn/" },
            { "name": "郑州商品交易所 (ZCE)", "url": "http://www.zce.com.cn/" }, { "name": "Wind资讯 (Wind Information)", "url": "https://www.wind.com.cn/" }, { "name": "同花顺数据中心 (iFinD)", "url": "http://data.10jqka.com.cn/" }
        ]
    },
    "international": {
        "官方决策层": [
            { "name": "国际货币基金组织 (IMF)", "url": "https://www.imf.org/" }, { "name": "世界银行 (World Bank)", "url": "https://data.worldbank.org/" }, { "name": "国际清算银行 (BIS)", "url": "https://www.bis.org/" },
            { "name": "经济合作与发展组织 (OECD)", "url": "https://data.oecd.org/" }, { "name": "联合国统计司 (UNSD)", "url": "https://unstats.un.org/" }, { "name": "世界贸易组织 (WTO)", "url": "https://www.wto.org/" },
            { "name": "国际劳工组织 (ILO)", "url": "https://ilostat.ilo.org/" }, { "name": "国际能源署 (IEA)", "url": "https://www.iea.org/data-and-statistics" }, { "name": "联合国贸易和发展会议 (UNCTAD)", "url": "https://unctad.org/statistics" },
            { "name": "欧盟统计局 (Eurostat)", "url": "https://ec.europa.eu/eurostat" }, { "name": "欧洲中央银行 (ECB)", "url": "https://www.ecb.europa.eu/" }, { "name": "欧洲银行管理局 (EBA)", "url": "https://www.eba.europa.eu/" },
            { "name": "美国联邦储备系统 (The Fed)", "url": "https://www.federalreserve.gov/" }, { "name": "美国经济分析局 (BEA)", "url": "https://www.bea.gov/" }, { "name": "美国劳工统计局 (BLS)", "url": "https://www.bls.gov/" },
            { "name": "美国人口普查局 (U.S. Census Bureau)", "url": "https://www.census.gov/" }, { "name": "美国能源信息署 (EIA)", "url": "https://www.eia.gov/" }, { "name": "美国证券交易委员会 (SEC)", "url": "https://www.sec.gov/" },
            { "name": "美国商品期货交易委员会 (CFTC)", "url": "https://www.cftc.gov/" }, { "name": "日本银行 (BoJ)", "url": "https://www.boj.or.jp/" }, { "name": "日本总务省统计局", "url": "https://www.stat.go.jp/english/" },
            { "name": "英国国家统计局 (ONS)", "url": "https://www.ons.gov.uk/" }, { "name": "英格兰银行 (BoE)", "url": "https://www.bankofengland.co.uk/" }, { "name": "德国联邦统计局 (Destatis)", "url": "https://www.destatis.de/EN" },
            { "name": "德意志联邦银行", "url": "https://www.bundesbank.de/en" }, { "name": "法国国家统计与经济研究所 (INSEE)", "url": "https://www.insee.fr/en" }, { "name": "加拿大统计局", "url": "https://www.statcan.gc.ca/" },
            { "name": "加拿大银行", "url": "https://www.bankofcanada.ca/" }, { "name": "澳大利亚统计局 (ABS)", "url": "https://www.abs.gov.au/" }, { "name": "澳大利亚储备银行 (RBA)", "url": "https://www.rba.gov.au/" },
            { "name": "瑞士国家银行 (SNB)", "url": "https://www.snb.ch/" }, { "name": "韩国银行 (BOK)", "url": "https://www.bok.or.kr/eng/" }, { "name": "韩国统计厅", "url": "http://kostat.go.kr/portal/eng/" },
            { "name": "印度储备银行 (RBI)", "url": "https://www.rbi.org.in/" }, { "name": "巴西中央银行 (BCB)", "url": "https://www.bcb.gov.br/en" }, { "name": "俄罗斯中央银行 (CBR)", "url": "https://www.cbr.ru/eng/" },
            { "name": "南非储备银行 (SARB)", "url": "https://www.resbank.co.za/" }, { "name": "新加坡统计局", "url": "https://www.singstat.gov.sg/" }, { "name": "墨西哥国家统计局 (INEGI)", "url": "https://en.inegi.org.mx/" },
            { "name": "香港统计处 (C&SD)", "url": "https://www.censtatd.gov.hk/" }
        ],
        "权威媒体层": [
            { "name": "路透社 (Reuters)", "url": "https://www.reuters.com/" }, { "name": "彭博社 (Bloomberg)", "url": "https://www.bloomberg.com/" }, { "name": "华尔街日报 (WSJ)", "url": "https://www.wsj.com/" },
            { "name": "金融时报 (FT)", "url": "https://www.ft.com/" }, { "name": "经济学人 (The Economist)", "url": "https://www.economist.com/" }, { "name": "日经亚洲 (Nikkei Asia)", "url": "https://asia.nikkei.com/" }
        ],
        "智库研报层": [
            { "name": "彼得森国际经济研究所 (PIIE)", "url": "https://www.piie.com/" }, { "name": "布鲁金斯学会 (Brookings)", "url": "https://www.brookings.edu/" }, { "name": "世界经济论坛 (WEF)", "url": "https://www.weforum.org/" },
            { "name": "麦肯锡全球研究院 (MGI)", "url": "https://www.mckinsey.com/mgi" }
        ],
        "市场情绪层": [
            { "name": "标普全球 (S&P Global)", "url": "https://www.spglobal.com/" }, { "name": "穆迪 (Moody's)", "url": "https://www.moodys.com/" }, { "name": "惠誉评级 (Fitch Ratings)", "url": "https://www.fitchratings.com/" },
            { "name": "CEIC Data", "url": "https://www.ceicdata.com/" }, { "name": "Refinitiv (LSEG)", "url": "https://www.lseg.com/en/data-analytics" }, { "name": "道琼斯 (Dow Jones)", "url": "https://www.dowjones.com/" },
            { "name": "纽约证券交易所 (NYSE)", "url": "https://www.nyse.com/" }, { "name": "纳斯达克 (Nasdaq)", "url": "https://www.nasdaq.com/" }, { "name": "伦敦证券交易所集团 (LSEG)", "url": "https://www.lseg.com/" },
            { "name": "香港交易所 (HKEX)", "url": "https://www.hkex.com.hk/" }
        ]
    }
};

export { dataSources };
