@echo off
echo === 立即修复环境变量 ===

:: 设置当前会话的环境变量
set DEVECO_SDK_HOME=E:\DevEco Studio\sdk
set HARMONYOS_SDK_PATH=E:\DevEco Studio\sdk\default
set NODEJS_PATH=E:\DevEco Studio\tools\node
set OHPM_PATH=E:\DevEco Studio\tools\ohpm

:: 更新当前PATH
set PATH=%PATH%;%HARMONYOS_SDK_PATH%\toolchains;%NODEJS_PATH%;%OHPM_PATH%\bin

echo 当前会话环境变量已设置！
echo.
echo 验证环境变量：
echo DEVECO_SDK_HOME=%DEVECO_SDK_HOME%
echo HARMONYOS_SDK_PATH=%HARMONYOS_SDK_PATH%

echo.
echo 停止hvigor守护进程...
call hvigorw --stop-daemon 2>nul || echo 守护进程已停止

echo.
echo 清理构建缓存...
call hvigorw clean

echo.
echo 尝试构建...
call hvigorw assembleDebug

echo.
echo 如果构建成功，请以管理员身份运行 set_env.bat 设置永久环境变量
pause