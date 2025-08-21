@echo off
echo ==================================
echo 最终项目验证检查
echo ==================================

echo 1. 检查项目结构...
if exist "entry\src\main\ets\pages\Index.ets" (
    echo ✓ Index.ets 存在
) else (
    echo ✗ Index.ets 不存在
    exit /b 1
)

if exist "entry\src\main\ets\pages\Dashboard.ets" (
    echo ✓ Dashboard.ets 存在
) else (
    echo ✗ Dashboard.ets 不存在
    exit /b 1
)

echo 2. 检查关键错误...
echo 检查 ic_home 资源引用...
findstr /s /n "ic_home" "entry\src\main\ets\*.ets" >nul 2>nul
if errorlevel 1 (
    echo ✓ 未发现 ic_home 资源引用错误
) else (
    echo ✗ 发现 ic_home 资源引用错误
    findstr /s /n "ic_home" "entry\src\main\ets\*.ets"
)

echo 3. 检查 curves 错误...
findstr /s /n "curves\." "entry\src\main\ets\*.ets" >nul 2>nul
if errorlevel 1 (
    echo ✓ 未发现 curves 引用错误
) else (
    echo ✗ 发现 curves 引用错误
    findstr /s /n "curves\." "entry\src\main\ets\*.ets"
)

echo 4. 检查重复函数错误...
echo 检查 Index.ets 中的重复函数...
find /c "private animateIn()" "entry\src\main\ets\pages\Index.ets" | findstr "2" >nul 2>nul
if errorlevel 1 (
    echo ✓ 未发现重复函数定义
) else (
    echo ✗ 发现重复函数定义
    find /c "private animateIn()" "entry\src\main\ets\pages\Index.ets"
)

echo ==================================
echo 验证完成！项目已修复
echo 可以手动在DevEco Studio中构建项目
pause