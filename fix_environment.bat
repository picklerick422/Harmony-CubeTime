@echo off
echo 正在修复DevEco Studio环境配置...

:: 设置DEVECO_SDK_HOME环境变量
set "DEVECO_SDK_HOME=E:\DevEco Studio\sdk"
setx DEVECO_SDK_HOME "E:\DevEco Studio\sdk" /M

echo DEVECO_SDK_HOME已设置为: %DEVECO_SDK_HOME%

:: 检查SDK目录是否存在
if exist "E:\DevEco Studio\sdk" (
    echo SDK目录存在: E:\DevEco Studio\sdk
) else (
    echo 警告: SDK目录不存在，请检查DevEco Studio安装路径
)

:: 停止hvigor守护进程
echo 正在停止hvigor守护进程...
call "E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat" --stop-daemon

echo 环境配置修复完成！
echo 请重新启动DevEco Studio或命令行窗口，然后重试构建。
pause