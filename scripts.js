document.addEventListener('DOMContentLoaded', () => {
    // 核心修复：使用正确的相对路径获取数据
    const dataUrl = 'data/news_data.json';

    // 核心修复：确保ID选择器与index.html中的ID完全匹配
    const techNewsContainer = document.getElementById('tech-news-container');
    const gamingNewsContainer = document.getElementById('gaming-news-container');

    if (!techNewsContainer || !gamingNewsContainer) {
        console.error('关键错误: 未在页面中找到ID为 "tech-news-container" 或 "gaming-news-container" 的元素。');
        return;
    }

    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 错误! 状态: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const allNews = data.news_items;

            // 分类并填充新闻
            const techNews = allNews.filter(item => item.category === 'Technology');
            const gamingNews = allNews.filter(item => item.category === 'Gaming');

            populateNews(techNews, techNewsContainer, '科技新闻');
            populateNews(gamingNews, gamingNewsContainer, '游戏新闻');
        })
        .catch(error => {
            console.error('加载或处理新闻数据时失败:', error);
            techNewsContainer.innerHTML = `<p style="color: red;">科技新闻加载失败。请检查浏览器控制台获取更多信息。</p>`;
            gamingNewsContainer.innerHTML = `<p style="color: red;">游戏新闻加载失败。请检查浏览器控制台获取更多信息。</p>`;
        });

    function populateNews(newsItems, container, categoryName) {
        // 清空容器（例如，移除“正在加载...”提示）
        container.innerHTML = '';

        if (!newsItems || newsItems.length === 0) {
            container.innerHTML = `<p>暂无${categoryName}。</p>`;
            return;
        }

        const list = document.createElement('ul');
        newsItems.forEach(item => {
            const listItem = document.createElement('li');
            
            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = item.title;
            link.target = '_blank'; // 在新标签页打开链接
            link.rel = 'noopener noreferrer';
            
            const sourceSpan = document.createElement('span');
            sourceSpan.className = 'news-source'; // 用于CSS样式
            sourceSpan.textContent = ` (${item.source})`;

            listItem.appendChild(link);
            listItem.appendChild(sourceSpan);
            list.appendChild(listItem);
        });
        container.appendChild(list);
    }
});
