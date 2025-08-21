const fs = require('fs');
const path = require('path');

const pagesDir = 'e:\\Deveco_Project\\test\\entry\\src\\main\\ets\\pages';

const pages = [
  'Index.ets',
  'Dashboard.ets', 
  'Calendar.ets',
  'Tasks.ets',
  'Pomodoro.ets',
  'Settings.ets',
  'CubeDetail.ets'
];

function checkAndFixOnPageShow(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否已有onPageShow
    if (content.includes('onPageShow()')) {
      console.log(`✅ ${path.basename(filePath)} 已包含onPageShow`);
      return;
    }
    
    // 查找aboutToAppear的位置
    const aboutToAppearMatch = content.match(/aboutToAppear\(\)\s*{[^}]*}/);
    if (aboutToAppearMatch) {
      const aboutToAppearEnd = content.indexOf(aboutToAppearMatch[0]) + aboutToAppearMatch[0].length;
      
      // 插入onPageShow方法
      const onPageShowMethod = `

  onPageShow() {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility()
    this.animateIn()
  }`;
      
      const newContent = content.slice(0, aboutToAppearEnd) + onPageShowMethod + content.slice(aboutToAppearEnd);
      fs.writeFileSync(filePath, newContent);
      console.log(`🔧 ${path.basename(filePath)} 已添加onPageShow方法`);
    } else {
      console.log(`⚠️ ${path.basename(filePath)} 未找到aboutToAppear方法`);
    }
  } catch (error) {
    console.error(`❌ 处理${path.basename(filePath)}时出错:`, error.message);
  }
}

// 处理所有页面
pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    checkAndFixOnPageShow(filePath);
  } else {
    console.log(`⚠️ ${page} 文件不存在`);
  }
});

console.log('\n🎉 页面显示修复完成！');
console.log('现在从任何页面返回时，主界面都会正确重新加载。');