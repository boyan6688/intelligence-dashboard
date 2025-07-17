document.addEventListener('DOMContentLoaded', () => {
    // 确保DOM加载完成后再执行数据加载
    loadNewsData();
    loadGamingNewsData(); // 同时加载游戏新闻数据
});

function loadNewsData() {
    // 关键修复(1): 路径必须是相对于 index.html 的正确相对路径
    const newsDataUrl = 'data/news_data.json'; 

    fetch(newsDataUrl)
        .then(response => {
            if (!response.ok) {
                // 如果请求失败，抛出错误，方便在控制台看到
                throw new Error(`HTTP error! status: ${response.status} for ${newsDataUrl}`);
            }
            return response.json();
        })
        .then(data => {
            // 关键修复(2): 确保使用正确且存在的HTML元素ID
            const newsContainer = document.getElementById('tech-news-container'); 
            if (!newsContainer) {
                console.error('Error: Element with id "tech-news-container" not found.');
                return;
            }
            newsContainer.innerHTML = ''; // 清空旧内容

            if (data.articles && data.articles.length > 0) {
                const articlesToShow = data.articles.slice(0, 10); // 只显示前10条
                articlesToShow.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item'; // 方便CSS美化
                    newsItem.innerHTML = `
                        <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
                        <p>${article.description || '暂无描述'}</p>
                        <small>来源: ${article.source.name}</small>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p>未能加载到科技新闻。</p>';
            }
        })
        .catch(error => {
            console.error('加载或解析科技新闻数据时出错:', error);
            const newsContainer = document.getElementById('tech-news-container');
            if (newsContainer) {
                newsContainer.innerHTML = '<p>加载科技新闻失败，请检查浏览器控制台获取详细信息。</p>';
            }
        });
}

function loadGamingNewsData() {
    // 关键修复(1): 同样使用正确的相对路径
    const gamingNewsDataUrl = 'data/gaming_news_data.json';

    fetch(gamingNewsDataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${gamingNewsDataUrl}`);
            }
            return response.json();
        })
        .then(data => {
            // 关键修复(2): 确保使用正确且存在的HTML元素ID
            const gamingNewsContainer = document.getElementById('gaming-news-container');
            if (!gamingNewsContainer) {
                console.error('Error: Element with id "gaming-news-container" not found.');
                return;
            }
            gamingNewsContainer.innerHTML = ''; // 清空旧内容

            if (data.articles && data.articles.length > 0) {
                const articlesToShow = data.articles.slice(0, 10); // 只显示前10条
                articlesToShow.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item'; // 方便CSS美化
                    newsItem.innerHTML = `
                        <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
                        <p>${article.description || '暂无描述'}</p>
                        <small>来源: ${article.source.name}</small>
                    `;
                    gamingNewsContainer.appendChild(newsItem);
                });
            } else {
                gamingNewsContainer.innerHTML = '<p>未能加载到游戏新闻。</p>';
            }
        })
        .catch(error => {
            console.error('加载或解析游戏新闻数据时出错:', error);
            const gamingNewsContainer = document.getElementById('gaming-news-container');
            if (gamingNewsContainer) {
                gamingNewsContainer.innerHTML = '<p>加载游戏新闻失败，请检查浏览器控制台获取详细信息。</p>';
            }
        });
}
