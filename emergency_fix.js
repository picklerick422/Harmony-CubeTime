const fs = require('fs');
const path = require('path');

// 页面文件路径
const pagesDir = 'e:\\Deveco_Project\\test\\entry\\src\\main\\ets\\pages';
const files = {
    'Index.ets': path.join(pagesDir, 'Index.ets'),
    'Dashboard.ets': path.join(pagesDir, 'Dashboard.ets'),
    'Calendar.ets': path.join(pagesDir, 'Calendar.ets'),
    'Settings.ets': path.join(pagesDir, 'Settings.ets')
};

// 修复方法
function fixIndexFile() {
    const filepath = files['Index.ets'];
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 添加缺失的itemScale和itemOpacity属性
    if (!content.includes('itemScale: number')) {
        content = content.replace(
            /(@State private navOpacity: number = 0\s*\n)/,
            '$1  @State private itemScale: number = 1\n  @State private itemOpacity: number = 1\n'
        );
    }

    // 添加缺失的animateIn方法
    if (!content.includes('animateIn() {')) {
        const animateInMethod = `
  // 入场动画
  private animateIn() {
    animateTo({ duration: 600, curve: Curve.EaseOut }, () => {
      this.titleOpacity = 1;
      this.titleScale = 1;
      this.cardOpacity = 1;
      this.cardScale = 1;
      this.buttonOpacity = 1;
      this.buttonScale = 1;
      this.timerOpacity = 1;
      this.timerScale = 1;
      this.navOpacity = 1;
      this.navScale = 1;
      this.itemOpacity = 1;
      this.itemScale = 1;
    });
  }
`;
        content = content.replace(/(aboutToAppear\(\) {[^}]*})/, '$1' + animateInMethod);
    }

    fs.writeFileSync(filepath, content);
    console.log('✅ Index.ets 修复完成');
}

function fixDashboardFile() {
    const filepath = files['Dashboard.ets'];
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 添加缺失的方法
    if (!content.includes('generateScramble() {')) {
        const methods = `
  // 生成打乱步骤
  private generateScramble(): string {
    const moves = ["R", "U", "F", "L", "D", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    for (let i = 0; i < 20; i++) {
      scramble += moves[Math.floor(Math.random() * moves.length)] + 
                  modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
    }
    return scramble.trim();
  }

  // 加载最佳时间
  private loadBestTime(): number {
    return 0;
  }

  // 重置可见性
  private resetVisibility(): void {
    this.titleOpacity = 1;
    this.titleScale = 1;
    this.buttonOpacity = 1;
    this.buttonScale = 1;
    this.cardOpacity = 1;
    this.cardScale = 1;
    this.itemOpacity = 1;
    this.itemScale = 1;
    this.timerOpacity = 1;
    this.timerScale = 1;
    this.navOpacity = 1;
    this.navScale = 1;
  }

  // 页面切换动画
  private animateTransition(targetPath: string): void {
    animateTo({ duration: 300, curve: Curve.EaseIn }, () => {
      this.titleOpacity = 0;
      this.titleScale = 0.8;
      this.buttonOpacity = 0;
      this.buttonScale = 0.8;
      this.cardOpacity = 0;
      this.cardScale = 0.8;
      this.itemOpacity = 0;
      this.itemScale = 0.8;
      this.timerOpacity = 0;
      this.timerScale = 0.8;
      this.navOpacity = 0;
      this.navScale = 0.8;
    });
    setTimeout(() => {
      navigationManager.navigateTo(targetPath);
    }, 300);
  }
`;
        content = content.replace(/(}\s*$)/, methods + '\n$1');
    }

    fs.writeFileSync(filepath, content);
    console.log('✅ Dashboard.ets 修复完成');
}

function fixCalendarFile() {
    const filepath = files['Calendar.ets'];
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 添加缺失的方法
    if (!content.includes('generateScramble() {')) {
        const methods = `
  // 生成打乱步骤
  private generateScramble(): string {
    const moves = ["R", "U", "F", "L", "D", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    for (let i = 0; i < 20; i++) {
      scramble += moves[Math.floor(Math.random() * moves.length)] + 
                  modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
    }
    return scramble.trim();
  }

  // 加载最佳时间
  private loadBestTime(): number {
    return 0;
  }
`;
        content = content.replace(/(}\s*$)/, methods + '\n$1');
    }

    // 添加缺失的属性
    if (!content.includes('cardScale: number')) {
        content = content.replace(
            /(@State private [^:]*: number[^\n]*\n)/g,
            '$1  @State private cardScale: number = 1\n  @State private cardOpacity: number = 1\n  @State private itemScale: number = 1\n  @State private itemOpacity: number = 1\n  @State private buttonScale: number = 1\n  @State private buttonOpacity: number = 1\n  @State private timerScale: number = 1\n  @State private timerOpacity: number = 1\n  @State private navScale: number = 1\n  @State private navOpacity: number = 1\n'
        );
    }

    fs.writeFileSync(filepath, content);
    console.log('✅ Calendar.ets 修复完成');
}

function fixSettingsFile() {
    const filepath = files['Settings.ets'];
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 添加缺失的属性
    if (!content.includes('buttonScale: number')) {
        content = content.replace(
            /(@State private [^:]*: number[^\n]*\n)/g,
            '$1  @State private buttonScale: number = 1\n  @State private buttonOpacity: number = 1\n  @State private timerScale: number = 1\n  @State private timerOpacity: number = 1\n  @State private navScale: number = 1\n  @State private navOpacity: number = 1\n'
        );
    }

    fs.writeFileSync(filepath, content);
    console.log('✅ Settings.ets 修复完成');
}

// 执行修复
console.log('🚀 开始紧急修复...\n');

Object.keys(files).forEach(filename => {
    const filepath = files[filename];
    if (fs.existsSync(filepath)) {
        try {
            switch(filename) {
                case 'Index.ets':
                    fixIndexFile();
                    break;
                case 'Dashboard.ets':
                    fixDashboardFile();
                    break;
                case 'Calendar.ets':
                    fixCalendarFile();
                    break;
                case 'Settings.ets':
                    fixSettingsFile();
                    break;
            }
        } catch (error) {
            console.error(`修复 ${filename} 失败:`, error.message);
        }
    } else {
        console.warn(`文件不存在: ${filepath}`);
    }
});

console.log('\n🎉 紧急修复完成！');
console.log('请在DevEco Studio中重新构建项目。');