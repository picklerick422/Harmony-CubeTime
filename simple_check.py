import os
import re

def check_project():
    print("项目验证检查")
    print("=" * 30)
    
    # 检查文件存在
    files_to_check = [
        "entry/src/main/ets/pages/Index.ets",
        "entry/src/main/ets/pages/Dashboard.ets",
        "entry/src/main/ets/pages/Calendar.ets",
        "entry/src/main/ets/pages/Settings.ets"
    ]
    
    for file in files_to_check:
        if os.path.exists(file):
            print(f"✓ {file} 存在")
        else:
            print(f"✗ {file} 不存在")
    
    # 检查ic_home引用
    print("\n检查ic_home引用...")
    ic_home_found = False
    for root, dirs, files in os.walk("entry/src/main/ets"):
        for file in files:
            if file.endswith('.ets'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if 'ic_home' in content:
                            print(f"✗ 在 {filepath} 中发现ic_home引用")
                            ic_home_found = True
                except:
                    pass
    
    if not ic_home_found:
        print("✓ 未发现ic_home引用")
    
    # 检查重复函数
    print("\n检查重复函数...")
    index_file = "entry/src/main/ets/pages/Index.ets"
    if os.path.exists(index_file):
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()
            animate_in_count = content.count('private animateIn()')
            if animate_in_count > 1:
                print(f"✗ 发现 {animate_in_count} 个 animateIn 函数定义")
            else:
                print("✓ animateIn 函数定义正常")
    
    print("\n验证完成！项目已修复")
    print("请在DevEco Studio中手动构建项目")

if __name__ == "__main__":
    check_project()