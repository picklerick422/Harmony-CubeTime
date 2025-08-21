// 空白页面修复脚本
const fs = require('fs');
const path = require('path');

// 需要修复的页面列表
const pages = [
  'Index.ets',
  'Dashboard.ets', 
  'Calendar.ets',
  'Settings.ets'
];

const pagesDir = 'entry/src/main/ets/pages';

console.log('🔧 修复空白页面问题...');

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否已经修复
  if (content.includes('// 修复空白页面') || content.includes('onPageShow')) {
    console.log(`✅ ${page} 已修复`);
    return;
  }

  // 添加页面显示时的修复
  const aboutToAppearMatch = content.match(/aboutToAppear\(\)\s*\{([^}]*)/);
  if (aboutToAppearMatch) {
    const originalContent = aboutToAppearMatch[1];
    const fixedContent = `${originalContent}
    // 修复空白页面：确保页面可见
    this.resetVisibility();
    setTimeout(() => {
      this.resetVisibility();
    }, 100);`;
    
    content = content.replace(
      /aboutToAppear\(\)\s*\{[^}]*}/,
      `aboutToAppear() {${fixedContent}
  }`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ 已修复 ${page} 的空白页面问题`);
  } else {
    console.log(`⚠️  未找到aboutToAppear方法: ${page}`);
  }
});

console.log('\n📋 修复完成！');
console.log('建议在DevEco Studio中：');
console.log('1. 清理项目缓存');
console.log('2. 重新构建项目');
console.log('3. 测试页面切换');