@echo off
echo 正在检查项目状态...
echo.
echo 1. 检查资源文件...
dir "e:\Deveco_Project\test\entry\src\main\resources\base\media\*.svg"
echo.
echo 2. 检查ic_home引用...
findstr /s /n "ic_home" "e:\Deveco_Project\test\entry\src\main\ets\pages\*.ets"
echo.
echo 3. 项目检查完成！
echo 如果第2步没有输出，表示ic_home引用已完全移除
pause