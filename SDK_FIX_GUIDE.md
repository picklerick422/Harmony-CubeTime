# SDK环境变量修复指南

## 问题描述
出现错误：
```
hvigor ERROR: 00303217 Configuration Error 
Error Message: Invalid value of 'DEVECO_SDK_HOME' in the system environment path.
```

## 解决方案

### 方法1：自动修复（推荐）

1. **以管理员身份运行修复脚本**
   ```
   右键点击 fix_sdk_environment.bat → 以管理员身份运行
   ```

2. **重启电脑**
   环境变量需要重启才能生效

3. **验证修复**
   ```
   运行 verify_build.bat
   ```

### 方法2：手动修复

#### 步骤1：设置系统环境变量
1. 打开系统属性 → 高级 → 环境变量
2. 在"系统变量"中添加：
   - **DEVECO_SDK_HOME**: `E:\DevEco Studio\sdk`
   - **HARMONYOS_SDK_PATH**: `E:\DevEco Studio\sdk\HarmonyOS\5.0.0.36`
   - **NODEJS_PATH**: `E:\DevEco Studio\tools\node`
   - **OHPM_PATH**: `E:\DevEco Studio\tools\ohpm`

#### 步骤2：更新PATH
在PATH变量中添加：
```
%DEVECO_SDK_HOME%\HarmonyOS\5.0.0.36\toolchains
%NODEJS_PATH%
%OHPM_PATH%\bin
```

#### 步骤3：验证环境变量
打开新的命令窗口，运行：
```
echo %DEVECO_SDK_HOME%
dir %DEVECO_SDK_HOME%\HarmonyOS\5.0.0.36
```

### 方法3：通过DevEco Studio修复

1. 打开DevEco Studio
2. 进入 File → Settings → HarmonyOS → SDK
3. 确保安装了HarmonyOS 5.0.0.36 SDK
4. 点击"Apply"保存配置

## 验证步骤

### 检查环境变量
```batch
check_environment.bat
```

### 验证构建
```batch
verify_build.bat
```

### 手动检查
```batch
:: 检查环境变量
echo %DEVECO_SDK_HOME%
echo %HARMONYOS_SDK_PATH%

:: 检查目录存在性
dir "%DEVECO_SDK_HOME%\HarmonyOS\5.0.0.36"

:: 检查node和hvigor
where node
where hvigorw
```

## 常见问题

### 1. 路径问题
确保路径中没有中文或特殊字符
```
E:\DevEco Studio\sdk\HarmonyOS\5.0.0.36
```

### 2. 权限问题
以管理员身份运行命令
```
runas /user:Administrator cmd
```

### 3. 守护进程问题
停止所有hvigor进程：
```
hvigorw --stop-daemon
taskkill /f /im node.exe
```

### 4. 缓存问题
清理构建缓存：
```
hvigorw clean
```

## 完整修复流程

```batch
:: 1. 检查当前状态
check_environment.bat

:: 2. 修复环境变量（管理员权限）
fix_sdk_environment.bat

:: 3. 重启电脑
shutdown /r /t 0

:: 4. 验证修复
verify_build.bat
```

## 技术支持

如果问题仍然存在：
1. 检查DevEco Studio版本是否为最新
2. 重新安装HarmonyOS SDK
3. 联系华为开发者支持

## 文件说明
- `check_environment.bat` - 环境检查
- `fix_sdk_environment.bat` - 自动修复
- `verify_build.bat` - 构建验证
- `SDK_FIX_GUIDE.md` - 本指南