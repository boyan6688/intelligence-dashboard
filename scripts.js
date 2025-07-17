document.addEventListener('DOMContentLoaded', () => {
    // 使用正确的相对路径获取合并后的数据文件
    const dataUrl = 'data/news_data.json';

    // 确保ID选择器与index.html中的ID完全匹配
    const techNewsContainer = document.getElementById('tech-news-container');
    const gamingNewsContainer = document.getElementById('gaming-news-container');

    if (!techNewsContainer || !gamingNewsContainer) {
        console.error('关键错误: 未在页面中找到ID为 "tech-news-container" 或 "gaming-news-container" 的元素。');
        return;
    }

    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                // 如果文件未找到(404)，提供更具体的错误提示
                if(response.status === 404) {
                    throw new Error(`数据文件未找到(404): ${dataUrl}。请检查GitHub Action是否成功运行并生成了此文件。`);
                }
                throw new Error(`HTTP 错误! 状态: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const allNews = data.news_items;

            // 根据Python脚本中设置的'category'字段进行分类
            const techNews = allNews.filter(item => item.category === 'Technology');
            const gamingNews = allNews.filter(item => item.category === 'Gaming');

            populateNews(techNews, techNewsContainer, '科技新闻');
            populateNews(gamingNews, gamingNewsContainer, '游戏新闻');
        })
        .catch(error => {
            console.error('加载或处理新闻数据时失败:', error);
            techNewsContainer.innerHTML = `<p style="color: red;">科技新闻加载失败。详情: ${error.message}</p>`;
            gamingNewsContainer.innerHTML = `<p style="color: red;">游戏新闻加载失败。详情: ${error.message}</p>`;
        });

    function populateNews(newsItems, container, categoryName) {
        container.innerHTML = ''; // 清空容器

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
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            const sourceSpan = document.createElement('span');
            sourceSpan.className = 'news-source';
            sourceSpan.textContent = ` (${item.source})`;

            listItem.appendChild(link);
            listItem.appendChild(sourceSpan);
            list.appendChild(listItem);
        });
        container.appendChild(list);
    }
});
