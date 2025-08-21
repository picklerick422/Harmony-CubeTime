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

// 标准方法定义模板
const methodTemplates = {
    animateIn: `  animateIn() {
    animateTo({ duration: 600, curve: Curve.EaseOut }, () => {
      this.titleOpacity = 1;
      this.titleScale = 1;
      this.buttonOpacity = 1;
      this.buttonScale = 1;
    });
  }`,

    resetVisibility: `  resetVisibility() {
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
  }`,

    animateTransition: `  animateTransition(targetPath: string) {
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
  }`,

    generateScramble: `  generateScramble() {
    const moves = ["R", "U", "F", "L", "D", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    for (let i = 0; i < 20; i++) {
      scramble += moves[Math.floor(Math.random() * moves.length)] + modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
    }
    return scramble.trim();
  }`,

    loadBestTime: `  loadBestTime() {
    // 从首选项加载最佳时间
    return 0;
  }`,

    formatTime: `  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  }`
};

// 页面特定属性
const pageProperties = {
    'Index.ets': {
        properties: ['titleOpacity', 'titleScale', 'buttonOpacity', 'buttonScale'],
        methods: ['animateIn', 'resetVisibility', 'animateTransition', 'generateScramble', 'loadBestTime', 'formatTime']
    },
    'Dashboard.ets': {
        properties: ['titleOpacity', 'titleScale', 'buttonOpacity', 'buttonScale', 'cardOpacity', 'cardScale', 'itemOpacity', 'itemScale', 'timerOpacity', 'timerScale', 'navOpacity', 'navScale'],
        methods: ['animateIn', 'resetVisibility', 'animateTransition', 'loadStatistics', 'startTimerUpdate']
    },
    'Calendar.ets': {
        properties: ['titleOpacity', 'titleScale', 'buttonOpacity', 'buttonScale', 'cardOpacity', 'cardScale', 'itemOpacity', 'itemScale', 'timerOpacity', 'timerScale', 'navOpacity', 'navScale'],
        methods: ['animateIn', 'resetVisibility', 'animateTransition', 'generateScramble', 'loadBestTime']
    },
    'Settings.ets': {
        properties: ['titleOpacity', 'titleScale', 'buttonOpacity', 'buttonScale', 'timerOpacity', 'timerScale', 'navOpacity', 'navScale'],
        methods: ['animateIn', 'resetVisibility', 'animateTransition']
    }
};

// 修复文件
function fixFile(filename, filepath) {
    console.log(`修复 ${filename}...`);
    
    let content = fs.readFileSync(filepath, 'utf8');
    const pageConfig = pageProperties[filename];
    
    // 1. 确保属性声明
    let propertiesDeclaration = '';
    pageConfig.properties.forEach(prop => {
        if (!content.includes(`${prop}: number`)) {
            propertiesDeclaration += `  ${prop}: number = 1\n`;
        }
    });
    
    if (propertiesDeclaration) {
        // 在类定义后插入属性
        content = content.replace(/(@Entry\s*@Component\s*struct\s+\w+\s*{)/, `$1\n${propertiesDeclaration}`);
    }
    
    // 2. 确保方法存在
    pageConfig.methods.forEach(methodName => {
        if (!content.includes(`${methodName}(`) && methodTemplates[methodName]) {
            // 在类结束前插入方法
            content = content.replace(/(\s*}\s*$)/, `\n\n${methodTemplates[methodName]}\n$1`);
        }
    });
    
    // 3. 修复生命周期方法
    if (!content.includes('aboutToAppear')) {
        const lifecycleFix = `\n  aboutToAppear() {\n    this.resetVisibility();\n  }\n\n  onPageShow() {\n    setTimeout(() => {\n      this.resetVisibility();\n    }, 100);\n  }\n`;
        content = content.replace(/(\s*}\s*$)/, `${lifecycleFix}$1`);
    }
    
    // 4. 清理错误的修复
    content = content.replace(/this\.resetVisibility\(\);\s*this\.resetVisibility\(\);/g, 'this.resetVisibility();');
    content = content.replace(/setTimeout\(\s*\(\)\s*=\>\s*{\s*setTimeout\(/g, 'setTimeout(');
    
    fs.writeFileSync(filepath, content);
    console.log(`✓ ${filename} 修复完成`);
}

// 执行修复
Object.keys(files).forEach(filename => {
    const filepath = files[filename];
    if (fs.existsSync(filepath)) {
        try {
            fixFile(filename, filepath);
        } catch (error) {
            console.error(`修复 ${filename} 失败:`, error.message);
        }
    } else {
        console.warn(`文件不存在: ${filepath}`);
    }
});

console.log('\\n所有页面修复完成！');
console.log('建议在DevEco Studio中重新构建项目。');