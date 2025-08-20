import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import BluetoothService from '../services/BluetoothService';
import NotificationService from '../services/NotificationService';
import TimeManagementService from '../services/TimeManagementService';
import CubeStateManager from '../services/CubeStateManager';

export default class EntryAbility extends UIAbility {
  private bluetoothService: BluetoothService;
  private notificationService: NotificationService;
  private timeManagementService: TimeManagementService;
  private cubeStateManager: CubeStateManager;

  onCreate(want, launchParam) {
    hilog.info(0x0000, 'CubeTime', 'Ability onCreate');
    
    // 初始化服务
    this.bluetoothService = new BluetoothService();
    this.notificationService = NotificationService.getInstance();
    this.timeManagementService = TimeManagementService.getInstance();
    this.cubeStateManager = CubeStateManager.getInstance();
    
    // 初始化蓝牙服务
    this.bluetoothService.init();
    
    // 设置魔方状态变化监听
    this.cubeStateManager.onCubeStateChanged((face: string) => {
      this.handleCubeFaceChange(face);
    });
    
    // 设置双击事件监听
    this.cubeStateManager.onCubeDoubleTap(() => {
      this.handleCubeDoubleTap();
    });
  }

  onDestroy() {
    hilog.info(0x0000, 'CubeTime', 'Ability onDestroy');
    this.bluetoothService.destroy();
    this.notificationService.destroy();
    this.timeManagementService.destroy();
    this.cubeStateManager.destroy();
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    hilog.info(0x0000, 'CubeTime', 'Ability onWindowStageCreate');
    
    windowStage.loadContent('pages/Splash', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'CubeTime', `Failed to load the content. Cause: ${JSON.stringify(err)}`);
        return;
      }
      hilog.info(0x0000, 'CubeTime', 'Succeeded in loading the content. Data: ${JSON.stringify(data)}');
    });
  }

  onWindowStageDestroy() {
    hilog.info(0x0000, 'CubeTime', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    hilog.info(0x0000, 'CubeTime', 'Ability onForeground');
    this.notificationService.showLiveWindow();
  }

  onBackground() {
    hilog.info(0x0000, 'CubeTime', 'Ability onBackground');
  }

  private handleCubeFaceChange(face: string) {
    hilog.info(0x0000, 'CubeTime', `Cube face changed to: ${face}`);
    
    // 根据魔方面朝更新工作状态
    const workMode = this.getWorkModeFromFace(face);
    this.timeManagementService.setCurrentMode(workMode);
    
    // 更新实况窗
    this.notificationService.updateLiveWindowContent({
      mode: workMode,
      duration: this.timeManagementService.getCurrentDuration()
    });
    
    // 震动反馈
    this.notificationService.vibrate();
  }

  private handleCubeDoubleTap() {
    hilog.info(0x0000, 'CubeTime', 'Cube double tapped');
    
    // 开始计时
    this.timeManagementService.startTiming();
    
    // 更新实况窗
    this.notificationService.updateLiveWindowContent({
      mode: this.timeManagementService.getCurrentMode(),
      duration: this.timeManagementService.getCurrentDuration(),
      isTiming: true
    });
    
    // 震动反馈
    this.notificationService.vibrateDouble();
  }

  private getWorkModeFromFace(face: string): string {
    const modeMap = {
      'A': '学习模式',
      'B': '工作模式',
      'C': '休息模式',
      'D': '运动模式',
      'E': '阅读模式',
      'F': '冥想模式'
    };
    return modeMap[face] || '未知模式';
  }
}