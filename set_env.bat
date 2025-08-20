@echo off
echo === 设置环境变量 ===

:: 设置系统环境变量
setx DEVECO_SDK_HOME "E:\DevEco Studio\sdk" /M
setx HARMONYOS_SDK_PATH "E:\DevEco Studio\sdk\HarmonyOS\5.0.0.36" /M
setx NODEJS_PATH "E:\DevEco Studio\tools\node" /M
setx OHPM_PATH "E:\DevEco Studio\tools\ohpm" /M

:: 更新PATH
setx PATH "%PATH%;E:\DevEco Studio\sdk\HarmonyOS\5.0.0.36\toolchains;E:\DevEco Studio\tools\node;E:\DevEco Studio\tools\ohpm\bin" /M

echo 环境变量已设置完成！
echo 请重启电脑后再次运行构建命令。
echo.
echo 重启命令：
echo shutdown /r /t 0
pause