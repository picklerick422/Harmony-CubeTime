@echo off
setlocal enabledelayedexpansion

echo === DevEco SDK 环境修复脚本 ===
echo.

:: 检查并设置DEVECO_SDK_HOME环境变量
set "DEVECO_SDK_HOME=E:\DevEco Studio\sdk"
echo 设置 DEVECO_SDK_HOME=%DEVECO_SDK_HOME%

:: 检查SDK目录是否存在
if exist "%DEVECO_SDK_HOME%" (
    echo [✓] SDK目录存在: %DEVECO_SDK_HOME%
) else (
    echo [✗] SDK目录不存在: %DEVECO_SDK_HOME%
    echo 请检查DevEco Studio安装路径
    pause
    exit /b 1
)

:: 设置HarmonyOS SDK路径
set "HARMONYOS_SDK_PATH=%DEVECO_SDK_HOME%\HarmonyOS\5.0.0.36"

:: 检查HarmonyOS SDK是否存在
if exist "%HARMONYOS_SDK_PATH%" (
    echo [✓] HarmonyOS SDK存在: %HARMONYOS_SDK_PATH%
) else (
    echo [✗] HarmonyOS SDK不存在: %HARMONYOS_SDK_PATH%
    echo 请检查HarmonyOS SDK安装
    pause
    exit /b 1
)

:: 设置Node.js路径
set "NODEJS_PATH=E:\DevEco Studio\tools\node"

:: 设置OHPM路径
set "OHPM_PATH=E:\DevEco Studio\tools\ohpm"

:: 设置系统环境变量（需要管理员权限）
echo 正在设置系统环境变量...
setx DEVECO_SDK_HOME "%DEVECO_SDK_HOME%" /M
setx HARMONYOS_SDK_PATH "%HARMONYOS_SDK_PATH%" /M
setx NODEJS_PATH "%NODEJS_PATH%" /M
setx OHPM_PATH "%OHPM_PATH%" /M

:: 更新当前会话的环境变量
set "DEVECO_SDK_HOME=%DEVECO_SDK_HOME%"
set "HARMONYOS_SDK_PATH=%HARMONYOS_SDK_PATH%"
set "NODEJS_PATH=%NODEJS_PATH%"
set "OHPM_PATH=%OHPM_PATH%"

:: 添加到PATH
set "PATH=%DEVECO_SDK_HOME%\toolchains;%NODEJS_PATH%;%OHPM_PATH%;%PATH%"
setx PATH "%PATH%" /M

echo.
echo === 环境变量设置完成 ===
echo DEVECO_SDK_HOME=%DEVECO_SDK_HOME%
echo HARMONYOS_SDK_PATH=%HARMONYOS_SDK_PATH%
echo NODEJS_PATH=%NODEJS_PATH%
echo OHPM_PATH=%OHPM_PATH%
echo.

:: 停止hvigor守护进程
echo 正在停止hvigor守护进程...
call gradlew --stop-daemon 2>nul
call hvigorw --stop-daemon 2>nul

:: 验证设置
echo 验证环境变量...
if defined DEVECO_SDK_HOME (
    echo [✓] DEVECO_SDK_HOME已设置
) else (
    echo [✗] DEVECO_SDK_HOME未设置
)

echo.
echo === 修复完成 ===
echo 请重启电脑后再次尝试构建！
echo 或者运行: verify_build.bat 进行验证
pause