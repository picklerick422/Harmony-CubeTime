@echo off
echo === 修复构建环境 ===

set DEVECO_SDK_HOME=E:\DevEco Studio\sdk
set HARMONYOS_SDK_PATH=E:\DevEco Studio\sdk\default

echo SDK路径设置完成
echo DEVECO_SDK_HOME=%DEVECO_SDK_HOME%
echo HARMONYOS_SDK_PATH=%HARMONYOS_SDK_PATH%

echo 正在停止守护进程...
call "E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat" --stop-daemon

echo 正在清理...
call "E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat" clean

echo 正在构建...
call "E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleDebug

echo 构建完成
pause