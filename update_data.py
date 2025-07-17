# update_data.py

import os
import requests
import json
from pathlib import Path

# 从环境变量中安全地获取API密钥
API_KEY = os.getenv('NEWS_API_KEY')
if not API_KEY:
    raise ValueError("错误：未找到 NEWS_API_KEY 环境变量。请在GitHub仓库的Secrets中设置。")

# 定义新闻源和类别
# 注意：NewsAPI的免费版在生产环境中可能受限，这里使用占位符URL。
# 请替换为您的真实API端点。此处以GNews为例。
# 科技新闻API URL
TECH_API_URL = f"https://gnews.io/api/v4/top-headlines?category=technology&lang=zh&country=cn&max=10&apikey={API_KEY}"
# 游戏新闻API URL
GAMING_API_URL = f"https://gnews.io/api/v4/search?q=游戏&lang=zh&country=cn&max=10&apikey={API_KEY}"

def fetch_news(url, category_name):
    """根据URL获取新闻并添加类别标签"""
    print(f"正在获取 '{category_name}' 新闻...")
    try:
        response = requests.get(url)
        response.raise_for_status()  # 如果请求失败（如404, 500），则抛出异常
        articles = response.json().get('articles', [])
        
        formatted_news = []
        for article in articles:
            formatted_news.append({
                "title": article.get('title'),
                "link": article.get('url'),
                "source": article.get('source', {}).get('name'),
                "category": category_name  # 添加前端过滤所需的类别字段
            })
        print(f"成功获取 {len(formatted_news)} 条 '{category_name}' 新闻。")
        return formatted_news
    except requests.exceptions.RequestException as e:
        print(f"错误：获取 '{category_name}' 新闻失败: {e}")
        return []
    except json.JSONDecodeError:
        print(f"错误: 解析 '{category_name}' API响应失败。响应内容非JSON格式。")
        return []

def main():
    """主函数：获取所有新闻，合并，并保存到文件"""
    print("开始执行新闻数据更新脚本...")
    
    # 获取两类新闻
    tech_news = fetch_news(TECH_API_URL, 'Technology')
    gaming_news = fetch_news(GAMING_API_URL, 'Gaming')
    
    # 将两类新闻合并到一个列表中
    all_news = tech_news + gaming_news
    
    if not all_news:
        print("警告：未能获取到任何新闻，将不会更新JSON文件。")
        return

    # 准备输出数据结构，以匹配JS的期望
    output_data = {"news_items": all_news}
    
    # 确保 'data' 目录存在
    data_dir = Path("data")
    data_dir.mkdir(exist_ok=True)
    
    # 将数据写入JSON文件
    output_file = data_dir / "news_data.json"
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=4)
        print(f"成功！数据已保存至 {output_file}")
    except IOError as e:
        print(f"错误：无法写入文件 {output_file}: {e}")

if __name__ == "__main__":
    main()
