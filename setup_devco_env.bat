@echo off
echo 正在设置DevEco Studio环境变量...

REM 设置DevEco SDK路径
set "DEVECO_SDK_HOME=E:\DevEco Studio\sdk"
set "HARMONYOS_SDK_PATH=E:\DevEco Studio\sdk\HarmonyOS\5.0.0.36"

REM 设置工具路径
set "NODE_PATH=E:\DevEco Studio\tools\node"
set "OHPM_PATH=E:\DevEco Studio\tools\ohpm"
set "HVIGOR_PATH=E:\DevEco Studio\tools\hvigor"

REM 添加到PATH
set "PATH=%NODE_PATH%;%OHPM_PATH%\bin;%HVIGOR_PATH%;%PATH%"

echo 环境变量设置完成！
echo DEVECO_SDK_HOME: %DEVECO_SDK_HOME%
echo NODE_PATH: %NODE_PATH%

REM 停止hvigor守护进程
echo 正在停止hvigor守护进程...
call "E:\DevEco Studio\tools\node\node.exe" "E:\DevEco Studio\tools\hvigor\bin\hvigorw.js" --stop-daemon

echo 环境配置完成，可以重新构建项目！
pause