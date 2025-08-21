const fs = require('fs');
const path = require('path');

const pagesDir = 'e:\\Deveco_Project\\test\\entry\\src\\main\\ets\\pages';
const files = [
    'Index.ets',
    'Dashboard.ets',
    'Calendar.ets',
    'Settings.ets'
];

console.log('验证修复结果...\n');

files.forEach(filename => {
    const filepath = path.join(pagesDir, filename);
    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        
        console.log(`=== ${filename} ===`);
        
        // 检查关键方法
        const methods = ['animateIn', 'resetVisibility', 'animateTransition'];
        methods.forEach(method => {
            if (content.includes(`${method}(`)) {
                console.log(`✓ ${method} 方法已定义`);
            } else {
                console.log(`✗ ${method} 方法缺失`);
            }
        });
        
        // 检查生命周期方法
        if (content.includes('aboutToAppear')) {
            console.log('✓ aboutToAppear 生命周期方法存在');
        } else {
            console.log('✗ aboutToAppear 生命周期方法缺失');
        }
        
        if (content.includes('onPageShow')) {
            console.log('✓ onPageShow 生命周期方法存在');
        } else {
            console.log('✗ onPageShow 生命周期方法缺失');
        }
        
        // 检查属性声明
        const properties = ['titleOpacity', 'titleScale', 'buttonOpacity', 'buttonScale'];
        properties.forEach(prop => {
            if (content.includes(`${prop}: number`)) {
                console.log(`✓ ${prop} 属性已声明`);
            } else if (content.includes(`this.${prop}`)) {
                console.log(`? ${prop} 被使用但未明确声明`);
            }
        });
        
        console.log('');
    } else {
        console.log(`✗ ${filename} 文件不存在\n`);
    }
});

console.log('验证完成！');
console.log('请在DevEco Studio中重新构建项目以测试修复效果。');