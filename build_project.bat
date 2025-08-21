@echo off
cd /d "e:Deveco_Project	est"
echo 正在清理项目...
hvigor clean
echo.
echo 正在构建项目...
hvigor build
if %errorlevel% neq 0 (
    echo ❌ 构建失败！
    pause
    exit /b %errorlevel%
)
echo ✅ 构建成功！
pause