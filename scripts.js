document.addEventListener('DOMContentLoaded', function () {
    // 关键修复：确保使用正确的相对路径获取数据文件。
    // 由于 news_data.json 和 index.html 在同一目录下，直接使用文件名即可。
    fetch('news_data.json')
        .then(response => {
            if (!response.ok) {
                // 如果请求失败，抛出错误，方便在控制台调试
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            if (!newsContainer) {
                console.error('Error: The element with id "news-container" was not found.');
                return;
            }

            // 清空容器，以防万一
            newsContainer.innerHTML = ''; 

            if (data && data.length > 0) {
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'news-card';

                    const title = document.createElement('h3');
                    const link = document.createElement('a');
                    link.href = item.url;
                    link.textContent = item.title;
                    link.target = '_blank'; // 在新标签页打开
                    title.appendChild(link);

                    const summary = document.createElement('p');
                    summary.textContent = item.summary;

                    const footer = document.createElement('div');
                    footer.className = 'news-footer';
                    
                    const source = document.createElement('span');
                    source.textContent = `来源: ${item.source}`;
                    
                    const time = document.createElement('span');
                    const date = new Date(item.published_at);
                    time.textContent = `发布于: ${date.toLocaleString()}`;

                    footer.appendChild(source);
                    footer.appendChild(time);
                    
                    card.appendChild(title);
                    card.appendChild(summary);
                    card.appendChild(footer);

                    newsContainer.appendChild(card);
                });
            } else {
                // 如果数据为空或格式不正确
                newsContainer.innerHTML = '<p>当前没有可显示的新闻数据。</p>';
            }
        })
        .catch(error => {
            // 在浏览器控制台清晰地报告错误
            console.error('Failed to load or parse news data:', error);
            const newsContainer = document.getElementById('news-container');
            if (newsContainer) {
                newsContainer.innerHTML = `<p style="color: red;">数据加载失败，请检查浏览器控制台获取详细错误信息。</p>`;
            }
        });
});
