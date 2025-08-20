@echo off
echo 正在检查ArkTS编译错误修复效果...
echo.
echo 当前时间: %date% %time%
echo.
echo 项目路径: %cd%
echo.
echo 使用DevEco Studio hvigor构建项目...
echo.

REM 检查DevEco Studio路径
if exist "C:\Program Files\Huawei\DevEco Studio" (
    set "DEV_ECO_PATH=C:\Program Files\Huawei\DevEco Studio"
) else if exist "D:\Program Files\Huawei\DevEco Studio" (
    set "DEV_ECO_PATH=D:\Program Files\Huawei\DevEco Studio"
) else if exist "E:\DevEco Studio" (
    set "DEV_ECO_PATH=E:\DevEco Studio"
) else (
    echo 未找到DevEco Studio安装路径，请手动设置
    pause
    exit /b 1
)

echo 找到DevEco Studio: %DEV_ECO_PATH%
echo.

REM 设置环境变量
set "NODE_PATH=%DEV_ECO_PATH%\tools\node"
set "HVIGOR_PATH=%DEV_ECO_PATH%\tools\hvigor"
set "PATH=%NODE_PATH%;%HVIGOR_PATH%;%PATH%"

REM 运行构建
echo 开始构建...
echo.
call "%NODE_PATH%\node.exe" "%HVIGOR_PATH%\bin\hvigorw.js" build

echo.
echo 构建完成！
echo.
pause