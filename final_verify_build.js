const fs = require('fs');
const path = require('path');

// 验证所有文件
const pagesDir = 'e:\\Deveco_Project\\test\\entry\\src\\main\\ets\\pages';
const files = [
    'Index.ets',
    'Dashboard.ets',
    'Calendar.ets',
    'Settings.ets'
];

console.log('🔍 最终构建验证\n');

let hasErrors = false;

files.forEach(filename => {
    const filepath = path.join(pagesDir, filename);
    console.log(`=== 检查 ${filename} ===`);
    
    if (!fs.existsSync(filepath)) {
        console.log(`❌ 文件不存在`);
        hasErrors = true;
        return;
    }
    
    const content = fs.readFileSync(filepath, 'utf8');
    
    // 检查具体错误
    const checks = [
        { name: 'animateIn方法', pattern: /animateIn\s*\(\s*\)/ },
        { name: 'resetVisibility方法', pattern: /resetVisibility\s*\(\s*\)/ },
        { name: 'animateTransition方法', pattern: /animateTransition\s*\(/ },
        { name: 'generateScramble方法', pattern: /generateScramble\s*\(/ },
        { name: 'loadBestTime方法', pattern: /loadBestTime\s*\(/ },
        { name: 'itemScale属性', pattern: /itemScale\s*:\s*number/ },
        { name: 'itemOpacity属性', pattern: /itemOpacity\s*:\s*number/ },
        { name: 'cardScale属性', pattern: /cardScale\s*:\s*number/ },
        { name: 'cardOpacity属性', pattern: /cardOpacity\s*:\s*number/ },
        { name: 'buttonScale属性', pattern: /buttonScale\s*:\s*number/ },
        { name: 'buttonOpacity属性', pattern: /buttonOpacity\s*:\s*number/ },
        { name: 'timerScale属性', pattern: /timerScale\s*:\s*number/ },
        { name: 'timerOpacity属性', pattern: /timerOpacity\s*:\s*number/ },
        { name: 'navScale属性', pattern: /navScale\s*:\s*number/ },
        { name: 'navOpacity属性', pattern: /navOpacity\s*:\s*number/ }
    ];
    
    checks.forEach(check => {
        if (check.pattern.test(content)) {
            console.log(`✅ ${check.name} 已定义`);
        } else {
            console.log(`❌ ${check.name} 缺失`);
            hasErrors = true;
        }
    });
    
    // 检查导入
    if (content.includes('navigationManager')) {
        console.log('✅ navigationManager 导入正确');
    } else {
        console.log('❌ navigationManager 导入缺失');
        hasErrors = true;
    }
    
    console.log('');
});

if (hasErrors) {
    console.log('⚠️  仍有错误需要修复');
} else {
    console.log('🎉 所有文件验证通过！');
    console.log('📋 建议操作：');
    console.log('1. 在DevEco Studio中执行 Build → Clean Project');
    console.log('2. 执行 Build → Rebuild Project');
    console.log('3. 检查是否还有编译错误');
}

// 创建一键构建脚本
const buildScript = `@echo off
cd /d "e:\Deveco_Project\test"
echo 🧹 清理项目...
hvigor clean --no-daemon
echo.
echo 🔨 重新构建项目...
hvigor build --no-daemon
echo.
if %errorlevel% neq 0 (
    echo ❌ 构建失败！请检查错误信息
    pause
    exit /b %errorlevel%
)
echo ✅ 构建成功！
echo.
echo 🎯 项目已修复完成，可以正常运行了！
pause`;

fs.writeFileSync('e:\\Deveco_Project\\test\\rebuild_project.bat', buildScript);
console.log('✅ rebuild_project.bat 已创建，可直接运行');