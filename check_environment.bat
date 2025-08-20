@echo off
setlocal enabledelayedexpansion

echo === 环境变量检查脚本 ===
echo.

:: 检查DEVECO_SDK_HOME
echo 检查 DEVECO_SDK_HOME:
if defined DEVECO_SDK_HOME (
    echo [✓] DEVECO_SDK_HOME=%DEVECO_SDK_HOME%
    if exist "%DEVECO_SDK_HOME%" (
        echo [✓] 目录存在
    ) else (
        echo [✗] 目录不存在
    )
) else (
    echo [✗] DEVECO_SDK_HOME未设置
)

:: 检查HarmonyOS SDK
echo.
echo 检查 HarmonyOS SDK:
if defined HARMONYOS_SDK_PATH (
    echo [✓] HARMONYOS_SDK_PATH=%HARMONYOS_SDK_PATH%
    if exist "%HARMONYOS_SDK_PATH%" (
        echo [✓] HarmonyOS SDK目录存在
    ) else (
        echo [✗] HarmonyOS SDK目录不存在
    )
) else (
    echo [✗] HARMONYOS_SDK_PATH未设置
)

:: 检查Node.js
echo.
echo 检查 Node.js:
if defined NODEJS_PATH (
    echo [✓] NODEJS_PATH=%NODEJS_PATH%
    if exist "%NODEJS_PATH%\node.exe" (
        echo [✓] Node.js可执行文件存在
    ) else (
        echo [✗] Node.js可执行文件不存在
    )
) else (
    echo [✗] NODEJS_PATH未设置
)

:: 检查local.properties
echo.
echo 检查 local.properties:
if exist "local.properties" (
    echo [✓] local.properties文件存在
    type local.properties | findstr /C:"deveco_sdk_home"
) else (
    echo [✗] local.properties文件不存在
)

:: 检查hvigor-config.json5
echo.
echo 检查 hvigor-config.json5:
if exist "hvigor-config.json5" (
    echo [✓] hvigor-config.json5文件存在
) else (
    echo [✗] hvigor-config.json5文件不存在
)

:: 检查PATH
echo.
echo 检查 PATH:
echo %PATH% | findstr /C:"DevEco Studio" >nul && (
    echo [✓] PATH中包含DevEco Studio路径
) || (
    echo [✗] PATH中未找到DevEco Studio路径
)

:: 检查文件权限
echo.
echo 检查文件权限:
if exist "E:\DevEco Studio\sdk" (
    icacls "E:\DevEco Studio\sdk" | findstr /C:"Everyone" >nul && (
        echo [✓] SDK目录权限正常
    ) || (
        echo [!] SDK目录权限可能需要调整
    )
)

:: 检查磁盘空间
echo.
echo 检查磁盘空间:
for /f "tokens=3" %%a in ('dir /-c "E:\DevEco Studio\sdk" ^| findstr /C:"个文件"') do (
    echo 可用空间: %%a
)

echo.
echo === 检查完成 ===
echo 如果发现任何问题，请运行: fix_sdk_environment.bat
pause