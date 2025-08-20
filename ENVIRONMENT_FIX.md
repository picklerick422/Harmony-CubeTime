# 环境配置修复指南

## 错误信息
```
hvigor ERROR: 00303217 Configuration Error
Error Message: Invalid value of 'DEVECO_SDK_HOME' in the system environment path.
```

## 修复步骤

### 方法1：使用自动修复脚本
1. 以管理员身份运行 `fix_environment.bat`
2. 重启DevEco Studio或命令行
3. 重新执行构建命令

### 方法2：手动修复

#### 1. 检查并设置环境变量
```batch
:: 检查当前值
echo %DEVECO_SDK_HOME%

:: 手动设置（临时）
set "DEVECO_SDK_HOME=E:\DevEco Studio\sdk"

:: 手动设置（永久）
setx DEVECO_SDK_HOME "E:\DevEco Studio\sdk" /M
```

#### 2. 验证SDK目录
```batch
:: 检查目录是否存在
dir "E:\DevEco Studio\sdk"

:: 检查关键子目录
dir "E:\DevEco Studio\sdk\HarmonyOS"
```

#### 3. 停止hvigor守护进程
```batch
cd e:\Deveco_Project\test
E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat --stop-daemon
```

#### 4. 检查配置文件
确保以下文件中的路径正确：
- `local.properties`: `deveco_sdk_home=E:\DevEco Studio\sdk`
- `hvigor-config.json5`: 包含正确的sdk路径配置

### 方法3：通过DevEco Studio设置
1. 打开DevEco Studio
2. 进入 File → Settings → Build, Execution, Deployment → Build Tools → Hvigor
3. 检查SDK路径配置
4. 点击 Apply 和 OK

## 验证修复

执行以下命令验证：
```batch
cd e:\Deveco_Project\test
E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat --version
E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat clean
E:\DevEco Studio\tools\hvigor\bin\hvigorw.bat assembleDebug
```

## 常见问题

### 如果SDK路径不同
如果DevEco Studio安装在不同的位置，请相应调整路径：
```batch
set "DEVECO_SDK_HOME=C:\\你的\\DevEco Studio\\路径\\sdk"
```

### 如果权限问题
以管理员身份运行命令提示符或PowerShell

### 如果问题仍然存在
1. 完全关闭DevEco Studio
2. 重启电脑
3. 重新执行修复步骤