// 修复语法错误的脚本
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

console.log('🔧 修复语法错误...');

function cleanSyntaxErrors(content, filename) {
  // 修复错误的括号匹配和语法结构
  
  // 1. 修复aboutToAppear方法
  content = content.replace(
    /aboutToAppear\(\)\s*\{[\s\S]*?\}(?=\s*(private|public|async|function|build|onPageShow))/g,
    `aboutToAppear() {
    this.generateScramble()
    this.loadBestTime()
    // 确保页面返回时重置为可见状态
    this.resetVisibility()
    this.animateIn()
  }`
  );

  // 2. 修复onPageShow方法
  content = content.replace(
    /onPageShow\(\)\s*\{[\s\S]*?\}(?=\s*(private|public|async|function|build))/g,
    `onPageShow() {
    this.resetVisibility();
    // 延迟再次重置，确保完全恢复
    setTimeout(() => {
      this.resetVisibility();
    }, 100);
  }`
  );

  // 3. 修复多余的括号和逗号
  content = content.replace(/}},\s*\d+\);/g, '');
  content = content.replace(/}},\s*\d+/g, '');
  
  // 4. 修复animateTransition方法中的错误
  content = content.replace(
    /animateTransition\([^)]*callback[^)]*\)\s*:\s*void\s*\{[\s\S]*?\}(?=\s*(private|public|async|function|build))/g,
    `animateTransition(callback: () => void): void {
    // 创建退出动画效果
    animateTo({ 
      duration: 200, 
      curve: Curve.EaseIn,
      onFinish: callback
    }, () => {
      // 页面淡出效果
      this.titleOpacity = 0
      this.cardOpacity = 0
      this.timerOpacity = 0
      this.buttonOpacity = 0
      this.navOpacity = 0
    })
  }`
  );

  // 5. 修复resetVisibility方法
  content = content.replace(
    /resetVisibility\(\)\s*:\s*void\s*\{[\s\S]*?\}(?=\s*(private|public|async|function|build))/g,
    `resetVisibility(): void {
    // 强制重置所有动画状态为可见
    this.titleScale = 1
    this.titleOpacity = 1
    this.cardScale = 1
    this.cardOpacity = 1
    this.itemScale = 1
    this.itemOpacity = 1
    this.buttonScale = 1
    this.buttonOpacity = 1
    this.timerScale = 1
    this.timerOpacity = 1
    this.navScale = 1
    this.navOpacity = 1
  }`
  );

  return content;
}

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // 清理语法错误
  content = cleanSyntaxErrors(content, page);
  
  // 确保基本结构正确
  if (!content.includes('aboutToAppear()')) {
    // 添加正确的aboutToAppear方法
    content = content.replace(
      /(@Entry[\s\S]*?)(?=\s*(private|public|async|function|build))/,
      `$1

  aboutToAppear() {
    // 确保页面返回时重置为可见状态
    this.resetVisibility()
    this.animateIn()
  }

  onPageShow() {
    this.resetVisibility();
    setTimeout(() => {
      this.resetVisibility();
    }, 100);
  }
`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`✅ 已修复 ${page} 的语法错误`);
});

console.log('\n📋 语法错误修复完成！');
console.log('请在DevEco Studio中重新构建项目');