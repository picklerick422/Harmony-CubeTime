@echo off
echo === 验证构建环境 ===
echo.

:: 首先运行环境检查
call check_environment.bat

:: 检查DEVECO_SDK_HOME
echo 检查DEVECO_SDK_HOME环境变量...
if "%DEVECO_SDK_HOME%"=="" (
    echo 错误: DEVECO_SDK_HOME未设置
    echo 正在尝试自动修复...
    call fix_sdk_environment.bat
    echo 请重启电脑后再次运行此脚本
    pause
    exit /b 1
)

:: 验证SDK目录存在
if not exist "%DEVECO_SDK_HOME%" (
    echo 错误: SDK目录不存在: %DEVECO_SDK_HOME%
    echo 请检查DevEco Studio安装路径
    pause
    exit /b 1
)

:: 检查HarmonyOS SDK
if not exist "%DEVECO_SDK_HOME%\HarmonyOS\5.0.0.36" (
    echo 错误: HarmonyOS SDK未找到
    echo 请通过DevEco Studio安装HarmonyOS SDK
    pause
    exit /b 1
)

:: 检查local.properties配置
echo 检查local.properties配置...
if exist "local.properties" (
    echo local.properties已配置
    type local.properties | findstr /C:"deveco_sdk_home"
) else (
    echo 创建local.properties...
    echo deveco_sdk_home=E:\DevEco Studio\sdk > local.properties
    echo harmonyos_sdk_path=E:\DevEco Studio\sdk\HarmonyOS\5.0.0.36 >> local.properties
    echo nodejs_path=E:\DevEco Studio\tools\node >> local.properties
    echo ohpm_path=E:\DevEco Studio\tools\ohpm >> local.properties
)

:: 停止hvigor守护进程
echo 停止hvigor守护进程...
call hvigorw --stop-daemon 2>nul || echo 守护进程已停止或不存在

:: 清理构建缓存
echo 清理构建缓存...
call hvigorw clean --info

:: 执行构建
echo 执行构建...
echo 构建命令: hvigorw assembleDebug --info
call hvigorw assembleDebug --info

set BUILD_RESULT=%errorlevel%

if %BUILD_RESULT% neq 0 (
    echo.
    echo === 构建失败分析 ===
    echo 可能的原因：
    echo 1. 环境变量未正确设置
    echo 2. SDK路径错误
    echo 3. 权限问题
    echo 4. 磁盘空间不足
    echo.
    echo 解决方案：
    echo 1. 以管理员身份运行 fix_sdk_environment.bat
    echo 2. 重启电脑
    echo 3. 检查E:\DevEco Studio\sdk目录是否存在
    echo 4. 通过DevEco Studio重新安装SDK
    pause
    exit /b 1
)

echo.
echo === 构建验证完成！===
echo 项目可以正常构建了！
pause