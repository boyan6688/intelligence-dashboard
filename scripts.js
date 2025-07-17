document.addEventListener('DOMContentLoaded', () => {
    // 确认目标容器存在
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
        console.error('错误：无法在页面上找到 ID 为 "news-container" 的元素。');
        return;
    }

    // 从正确的相对路径获取数据
    fetch('data/news_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 错误！状态: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 清空 "正在加载..." 提示
            newsContainer.innerHTML = ''; 

            // 检查数据是否存在且为数组
            if (data && Array.isArray(data.news) && data.news.length > 0) {
                data.news.forEach(item => {
                    const article = document.createElement('article');
                    article.className = 'news-item';

                    const title = document.createElement('h2');
                    title.textContent = item.title;

                    const content = document.createElement('p');
                    content.textContent = item.content;

                    article.appendChild(title);
                    article.appendChild(content);

                    newsContainer.appendChild(article);
                });
            } else {
                newsContainer.innerHTML = '<p>暂无新闻可显示。</p>';
            }
        })
        .catch(error => {
            console.error('获取新闻数据时出错:', error);
            newsContainer.innerHTML = '<p>加载新闻失败，请稍后重试。</p>';
        });
});
