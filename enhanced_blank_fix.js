// 增强版空白页面修复脚本
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

console.log('🔧 增强版空白页面修复...');

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. 确保resetVisibility方法正确实现
  if (!content.includes('resetVisibility()')) {
    console.log(`⚠️  ${page} 缺少resetVisibility方法`);
    return;
  }

  // 2. 修复animateTransition方法，确保动画重置
  content = content.replace(
    /animateTransition\([^)]*callback[^)]*\)\s*\{[^}]*onFinish:\s*callback[^}]*\}/g,
    `animateTransition(callback: () => void): void {
    // 修复：确保页面切换时重置动画状态
    animateTo({ 
      duration: 1, 
      curve: Curve.Linear,
      onFinish: () => {
        this.resetVisibility(); // 立即重置可见性
        setTimeout(callback, 50); // 延迟执行导航，确保状态重置
      }
    }, () => {
      // 快速重置所有动画状态
      this.resetVisibility();
    })
  }`
  );

  // 3. 增强aboutToAppear，添加页面显示监听
  if (content.includes('aboutToAppear()')) {
    content = content.replace(
      /aboutToAppear\(\)\s*\{([^}]*)/,
      `aboutToAppear() {$1
    // 增强修复：页面显示时强制重置状态
    this.resetVisibility();
    
    // 延迟再次重置，确保完全恢复
    setTimeout(() => {
      this.resetVisibility();
    }, 100);
    
    // 延迟动画，确保页面完全加载
    setTimeout(() => {
      this.animateIn();
    }, 150);
  }

  // 页面显示时重置状态（HarmonyOS生命周期）
  onPageShow() {
    this.resetVisibility();
  }`
    );
  }

  // 4. 增强resetVisibility方法
  content = content.replace(
    /resetVisibility\(\)\s*\{[^}]*\}/g,
    `resetVisibility(): void {
    // 强制重置所有动画状态为可见
    try {
      // 重置所有可能的动画状态变量
      this.titleScale = 1;
      this.titleOpacity = 1;
      this.cardScale = 1;
      this.cardOpacity = 1;
      this.itemScale = 1;
      this.itemOpacity = 1;
      this.buttonScale = 1;
      this.buttonOpacity = 1;
      this.timerScale = 1;
      this.timerOpacity = 1;
      this.navScale = 1;
      this.navOpacity = 1;
      this.calendarScale = 1;
      this.calendarOpacity = 1;
      this.taskScale = 1;
      this.taskOpacity = 1;
    } catch (error) {
      console.error('重置可见性失败:', error);
    }
  }`
  );

  fs.writeFileSync(filePath, content);
  console.log(`✅ 已增强修复 ${page}`);
});

console.log('\n📋 增强修复完成！');
console.log('修复内容包括：');
console.log('1. 增强resetVisibility方法');
console.log('2. 修复animateTransition方法');
console.log('3. 添加onPageShow生命周期');
console.log('4. 优化动画时序');
console.log('5. 添加错误处理');
console.log('\n🚀 现在请：');
console.log('1. 在DevEco Studio中重新构建');
console.log('2. 清理项目缓存');
console.log('3. 测试页面切换');