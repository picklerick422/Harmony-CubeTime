@echo off
echo === 简单环境检查 ===

:: 检查DEVECO_SDK_HOME
echo DEVECO_SDK_HOME=%DEVECO_SDK_HOME%

:: 检查目录存在性
if exist "E:\DevEco Studio\sdk" (
    echo SDK目录存在
) else (
    echo SDK目录不存在
)

:: 检查HarmonyOS SDK
if exist "E:\DevEco Studio\sdk\HarmonyOS\5.0.0.36" (
    echo HarmonyOS SDK存在
) else (
    echo HarmonyOS SDK不存在
)

:: 检查local.properties
echo local.properties内容：
type local.properties

pause