import os
import requests
import json

# 定义新闻API的URL和参数 (请根据需要替换为您自己的API)
# 这里我们使用一个公开的API作为示例
NEWS_API_ENDPOINT = "https://newsapi.org/v2/top-headlines"
# 注意：请将 'YOUR_API_KEY' 替换为您从 newsapi.org 获取的真实API密钥
# 如果您没有API密钥，可以去 newsapi.org 免费注册一个
# 强烈建议使用 GitHub Secrets 来管理您的 API 密钥
API_KEY = os.environ.get('NEWS_API_KEY', 'YOUR_FALLBACK_KEY') # 优先从环境变量读取
PARAMS = {
    'apiKey': API_KEY,
    'country': 'us',
    'category': 'technology',
    'pageSize': 10
}

# 定义数据文件的保存路径
DATA_FILE_PATH = 'data/news_data.json'

# --- 核心修复代码 --- #
# 获取文件路径的目录部分
directory = os.path.dirname(DATA_FILE_PATH)
# 检查目录是否存在，如果不存在，则创建它 (exist_ok=True 确保目录已存在时不会报错)
if directory: # 确保目录名不为空
    os.makedirs(directory, exist_ok=True)
    print(f"确保目录 '{directory}' 已存在。")
# -------------------- #

# 发起API请求获取新闻数据
try:
    if not API_KEY or API_KEY == 'YOUR_FALLBACK_KEY':
        raise ValueError("API密钥未设置。请在 GitHub Secrets 中设置 NEWS_API_KEY。")

    print("正在从API获取最新新闻数据...")
    response = requests.get(NEWS_API_ENDPOINT, params=PARAMS)
    response.raise_for_status()  # 如果请求失败 (状态码非2xx), 则抛出异常
    news_data = response.json()
    print("成功获取数据。")

    # 将获取的数据以JSON格式写入文件
    with open(DATA_FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(news_data, f, ensure_ascii=False, indent=4)
    print(f"最新新闻数据已成功保存至 '{DATA_FILE_PATH}'")

except requests.exceptions.RequestException as e:
    print(f"API请求失败: {e}")
except ValueError as e:
    print(f"配置错误: {e}")
except Exception as e:
    print(f"处理数据时发生错误: {e}")
    # 抛出非零退出码，以便GitHub Actions识别为失败
    exit(1)
