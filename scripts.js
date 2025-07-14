document.addEventListener('DOMContentLoaded', () => {
    const chinaMarketContent = document.getElementById('china-market-content');
    const globalMarketsContent = document.getElementById('global-markets-content');

    const DOMESTIC_CATEGORY = '国内';

    function setupTheme() {
        const toggleButton = document.getElementById('theme-toggle');
        const body = document.body;
        const sunIcon = toggleButton.querySelector('[data-lucide="sun"]');
        const moonIcon = toggleButton.querySelector('[data-lucide="moon"]');

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                document.documentElement.classList.add('dark');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                body.classList.remove('dark-mode');
                document.documentElement.classList.remove('dark');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        };

        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(savedTheme);

        toggleButton.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    function setupDataSourcePanel() {
        const DATA_SOURCES = {
            "中国": [
                "中国人民银行", "国家统计局", "财政部", "商务部", "国家发展和改革委员会", "中国银行保险监督管理委员会", "中国证券监督管理委员会", "海关总署", "国家外汇管理局", "新华社", "人民日报", "财新网", "华尔街见闻", "第一财经", "证券时报", "中国证券报", "上海证券报", "中金公司研究部", "中信证券研究部", "海通证券研究所", "国泰君安证券研究所", "Wind资讯", "同花顺财经", "东方财富网", "格隆汇",
                "发改委", "《求是》杂志", "《新闻记者》", "《中国出版》", "《现代传播》", "《新闻界》", "《传媒》", "《电视研究》", "中央财经委员会会议", "中国政府网", "新华网/人民网", "社科院财经战略研究院", "国务院发展研究中心", "中国金融四十人论坛（CF40）", "国家信息中心", "上海财经大学高等研究院", "中国宏观经济论坛", "北京大学国家发展研究院", "财政部财政科学研究所"
            ],
            "美国": [
                "Federal Reserve (The Fed)", "U.S. Department of the Treasury", "Bureau of Labor Statistics (BLS)", "Bureau of Economic Analysis (BEA)", "U.S. Census Bureau", "The White House", "Securities and Exchange Commission (SEC)", "Commodity Futures Trading Commission (CFTC)", "The Wall Street Journal", "Bloomberg", "Reuters", "The New York Times", "Goldman Sachs Global Investment Research", "J.P. Morgan Research", "Morgan Stanley Research"
            ],
            "日本": [
                "日本銀行 (Bank of Japan)", "財務省 (Ministry of Finance)", "総務省統計局 (Statistics Bureau of Japan)", "内閣府 (Cabinet Office)", "経済産業省 (Ministry of Economy, Trade and Industry)", "金融庁 (Financial Services Agency)", "日本経済新聞 (Nikkei)", "共同通信社 (Kyodo News)", "時事通信社 (Jiji Press)", "野村総合研究所 (Nomura Research Institute)", "大和総研 (Daiwa Institute of Research)", "みずほリサーチ＆テクノロジーズ (Mizuho Research & Technologies)"
            ],
            "欧盟/欧元区": [
                "European Central Bank (ECB)", "Eurostat", "European Commission", "Deutsche Bundesbank (Germany)", "Banque de France (France)", "Banca d'Italia (Italy)", "Banco de España (Spain)", "Destatis (Federal Statistical Office of Germany)", "INSEE (National Institute of Statistics and Economic Studies, France)", "Istat (Italian National Institute of Statistics)", "Financial Times", "Reuters (European Desk)", "Agence France-Presse (AFP)", "IFO Institute for Economic Research (Germany)", "Bruegel"
            ],
            "跨国/国际机构": [
                "International Monetary Fund (IMF)", "World Bank", "Organisation for Economic Co-operation and Development (OECD)", "Bank for International Settlements (BIS)", "World Trade Organization (WTO)"
            ]
        };

        const toggleButton = document.getElementById('source-list-toggle');
        const panel = document.getElementById('source-list-panel');
        const sourceListContainer = document.getElementById('data-sources');
        
        if (!toggleButton || !panel || !sourceListContainer) {
            console.error("Data source panel elements not found!");
            return;
        }

        let listHtml = '';
        for (const category in DATA_SOURCES) {
            const count = DATA_SOURCES[category].length;
            listHtml += `<li class="not-prose">\n  <strong class="text-gray-800 dark:text-gray-200 text-sm font-semibold">${category} (${count}个)</strong>\n  <ul class="mt-1 space-y-1">\n${DATA_SOURCES[category].map(source => `    <li class="pl-2 text-gray-600 dark:text-gray-400 leading-tight">${source}</li>`).join('\n')}\n  </ul>\n</li>`;
        }
        sourceListContainer.innerHTML = listHtml;


        toggleButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const isVisible = panel.classList.toggle('visible');
            panel.classList.toggle('hidden', !isVisible);
            toggleButton.setAttribute('aria-expanded', isVisible);
        });

        document.addEventListener('click', (event) => {
            if (panel.classList.contains('visible') && !panel.contains(event.target)) {
                panel.classList.remove('visible');
                panel.classList.add('hidden');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    async function fetchNews() {
        try {
            const response = await fetch('data/news_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newsData = await response.json();
            renderNews(newsData);
        } catch (error) {
            console.error("Failed to fetch news data:", error);
            chinaMarketContent.innerHTML = `<p class="text-red-500">无法加载新闻数据。请确保您是通过本地服务器访问，而非直接打开文件。</p>`;
            globalMarketsContent.innerHTML = `<p class="text-red-500">无法加载新闻数据。</p>`;
        }
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function getImportanceClass(score) {
        if (score > 80) return 'high-importance';
        if (score > 60) return 'medium-importance';
        return 'low-importance';
    }

    function formatTimestamp(isoString) {
        const date = new Date(isoString);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${year}年${month}月${day}日 ${hours}:${minutes}`;
    }

    function renderNews(allNews) {
        const SEVENTY_TWO_HOURS_MS = 72 * 60 * 60 * 1000;
        const IMPORTANCE_THRESHOLD = 80;
        const MIN_NEWS_COUNT = 3;
        const now = new Date().getTime();

        const domesticNews = allNews.filter(item => item.category === DOMESTIC_CATEGORY);
        const foreignNews = allNews.filter(item => item.category !== DOMESTIC_CATEGORY);

        const processCategory = (newsList) => {
            const retained = [];
            const updatable = [];

            newsList.forEach(item => {
                const newsTimestamp = new Date(item.iso_timestamp).getTime();
                const isImportant = item.importance_score > IMPORTANCE_THRESHOLD;
                const isRecent = (now - newsTimestamp) < SEVENTY_TWO_HOURS_MS;

                if (isImportant && isRecent) {
                    retained.push(item);
                } else {
                    updatable.push(item);
                }
            });

            const needed = MIN_NEWS_COUNT - retained.length;
            let finalNews = [...retained];

            if (needed > 0 && updatable.length > 0) {
                const shuffledUpdatable = shuffleArray([...updatable]);
                finalNews.push(...shuffledUpdatable.slice(0, Math.min(needed, updatable.length)));
            }
            
            return finalNews;
        };

        const finalDomesticNews = processCategory(domesticNews);
        const finalForeignNews = processCategory(foreignNews);

        chinaMarketContent.innerHTML = '';
        globalMarketsContent.innerHTML = '';
        
        finalDomesticNews.forEach(item => {
            chinaMarketContent.appendChild(createNewsCard(item));
        });

        finalForeignNews.forEach(item => {
            globalMarketsContent.appendChild(createNewsCard(item));
        });

        lucide.createIcons();
    }

    function createNewsCard(item) {
        const card = document.createElement('div');
        card.className = 'news-card bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden';
        
        const importanceClass = getImportanceClass(item.importance_score);
        const formattedTimestamp = formatTimestamp(item.iso_timestamp);
        
        const marketMap = {
            a_share: 'A股',
            hk_stock: '港股',
            us_stock: '美股',
            us_bond: '美债',
            gold: '黄金',
            sectors: '相关板块'
        };

        const reactionHtml = Object.entries(item.analysis.reaction).map(([market, analysisText]) => {
            const isUnrelated = analysisText === '无关系';
            return `
                <div class="flex flex-col">
                    <span class="font-medium text-gray-800 dark:text-gray-100">${marketMap[market]}</span>
                    <span class="${isUnrelated ? 'text-gray-400 dark:text-gray-500 italic' : 'text-gray-600 dark:text-gray-300'}">${analysisText}</span>
                </div>
            `;
        }).join('');

        card.innerHTML = `
            <div class="p-5">
                <div class="flex justify-between items-start gap-4 mb-3">
                    <div class="flex-grow cursor-pointer" data-action="toggle-analysis">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">${item.headline}</h3>
                    </div>
                    <div class="importance-badge ${importanceClass} flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-sm font-bold">
                        <i data-lucide="zap" class="h-3.5 w-3.5"></i>
                        <span>${item.importance_score}</span>
                    </div>
                </div>
                <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <div class="flex items-center">
                        <span>${item.sourceName}</span>
                        <span class="mx-2">&bull;</span>
                        <span>${formattedTimestamp}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" title="打开来源链接" class="source-link-button p-1.5 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200">
                            <i data-lucide="external-link" class="h-4 w-4"></i>
                        </a>
                        <button title="展开/折叠分析" class="expand-btn flex-shrink-0 p-1.5 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200" data-action="toggle-analysis-btn">
                            <i data-lucide="chevron-down" class="h-5 w-5 transition-transform duration-300"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="analysis-content">
                <div class="analysis-prose px-5 pb-5 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <h4 class="font-bold text-base mt-2 mb-1 text-gray-900 dark:text-white">底层逻辑</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">${item.analysis.logic}</p>

                    <h4 class="font-bold text-base mt-2 mb-1 text-gray-900 dark:text-white">传导路径</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">${item.analysis.path}</p>
                    
                    <h4 class="font-bold text-base mt-2 mb-1 text-gray-900 dark:text-white">市场反应</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 mt-2 text-sm">
                        ${reactionHtml}
                    </div>
                </div>
            </div>
        `;

        const toggleHeadline = card.querySelector('[data-action="toggle-analysis"]');
        const toggleButton = card.querySelector('[data-action="toggle-analysis-btn"]');
        const analysisContent = card.querySelector('.analysis-content');
        const chevronIcon = card.querySelector('.expand-btn i');

        const toggleFunction = () => {
            const isExpanded = analysisContent.classList.toggle('expanded');
            chevronIcon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        };

        toggleHeadline.addEventListener('click', toggleFunction);
        toggleButton.addEventListener('click', toggleFunction);

        return card;
    }

    setupTheme();
    fetchNews();
    setupDataSourcePanel();
    lucide.createIcons();
});