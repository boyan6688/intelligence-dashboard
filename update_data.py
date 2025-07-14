import json
import datetime

# 数据文件路径
DATA_FILE_PATH = 'data/news_data.json'

def fetch_new_data():
    """
    模拟从多个数据源抓取最新情报。
    在真实场景中，这里会包含使用 requests 和 BeautifulSoup 等库
    来爬取网页或调用API的代码。
    """
    print("正在模拟抓取新数据...")
    # 模拟抓取到的一条新情报
    new_article = {
        "id": f"cn_pmi_{datetime.datetime.utcnow().strftime('%Y%m%d%H%M')}",
        "category": "国内",
        "headline": "最新制造业PMI数据公布，显示经济扩张势头",
        "sourceName": "国家统计局",
        "sourceUrl": "http://www.stats.gov.cn/",
        "iso_timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "summary": "国家统计局公布的最新数据显示，制造业采购经理指数（PMI）为50.8%，高于荣枯线，表明制造业活动持续扩张。",
        "importance_score": 82,
        "analysis": {
            "logic": "关键宏观经济指标。PMI是经济活动的领先指标，高于50%表示经济扩张，反映出宏观政策支持下生产端保持韧性。",
            "path": "PMI数据向好 → 提振市场对经济基本面的信心 → 改善企业盈利预期 → 推动风险资产价格上涨。",
            "reaction": {
                "a_share": "利好。提振整体市场情绪，顺周期板块（如材料、工业）尤其受益。",
                "hk_stock": "利好。与A股联动，增强海外投资者信心。",
                "us_stock": "无关系",
                "us_bond": "无关系",
                "gold": "无关系",
                "sectors": "原材料、工业、制造业、大宗商品。"
            }
        }
    }
    print("新数据抓取完成。")
    return [new_article]

def run_update_process():
    """
    执行完整的数据更新流程。
    """
    print("开始数据更新流程...")
    # 1. 读取现有数据
    try:
        with open(DATA_FILE_PATH, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []
    
    # 2. 抓取新数据
    new_articles = fetch_new_data()
    
    # 3. 合并数据（将新数据置于顶部）并去重
    updated_data = new_articles + existing_data
    final_data = []
    seen_ids = set()
    for article in updated_data:
        if article['id'] not in seen_ids:
            final_data.append(article)
            seen_ids.add(article['id'])

    # 4. 保留最近的N条记录（例如100条）
    final_data = final_data[:100]

    # 5. 写回JSON文件
    with open(DATA_FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
    
    print(f"数据更新成功！'{DATA_FILE_PATH}' 已被更新，现有 {len(final_data)} 条记录。")

if __name__ == "__main__":
    run_update_process()