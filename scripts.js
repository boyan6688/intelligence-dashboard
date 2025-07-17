// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');

    // 关键修复点 1: 从正确的相对路径获取数据
    const fetchData = async () => {
        try {
            const response = await fetch('data/news_data.json');

            // 关键修复点 3: 检查网络响应是否成功
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // 清空加载提示
            newsContainer.innerHTML = ''; 

            if (data.news && data.news.length > 0) {
                data.news.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';

                    const title = document.createElement('h2');
                    title.textContent = item.title;

                    const summary = document.createElement('p');
                    summary.textContent = item.summary;

                    newsItem.appendChild(title);
                    newsItem.appendChild(summary);
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p class="loading-message">暂无最新情报。</p>';
            }

        } catch (error) {
            // 关键修复点 3: 提供健壮的错误处理
            console.error("无法加载情报数据:", error);
            newsContainer.innerHTML = `<p class="error-message">数据加载失败。请稍后重试或联系管理员。错误详情: ${error.message}</p>`;
        }
    };

    fetchData();
});
