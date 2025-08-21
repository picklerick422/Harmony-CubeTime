@echo off
cd /d "e:Deveco_Project	est"
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
pause