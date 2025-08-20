@echo off
echo === 设置环境变量并运行构建 ===

:: 设置环境变量
set DEVECO_SDK_HOME=E:\DevEco Studio\sdk
set HARMONYOS_SDK_PATH=E:\DevEco Studio\sdk\default
set NODEJS_PATH=E:\DevEco Studio\tools\node
set OHPM_PATH=E:\DevEco Studio\tools\ohpm

:: 验证环境变量
echo DEVECO_SDK_HOME=%DEVECO_SDK_HOME%
echo HARMONYOS_SDK_PATH=%HARMONYOS_SDK_PATH%

:: 停止守护进程
echo 停止hvigor守护进程...
"E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat" --stop-daemon

:: 清理构建
echo 清理构建...
"E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat" clean

:: 执行构建
echo 执行构建...
"E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleDebug

echo 构建完成！
pause