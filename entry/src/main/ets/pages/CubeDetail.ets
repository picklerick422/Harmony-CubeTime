import { NavigationManager } from '../utils/NavigationManager';
import CubeStateManager from '../services/CubeStateManager';
import NotificationService from '../services/NotificationService';
import { Cube3DView } from '../components/Cube3DView';

interface CubeOrientation {
  x: number;
  y: number;
  z: number;
  face: string;
}

@Entry
@Component
struct CubeDetail {
  private cubeStateManager: CubeStateManager = CubeStateManager.getInstance();
  private notificationService: NotificationService = NotificationService.getInstance();
  
  // 魔方状态
  @State cubeConnected: boolean = false;
  @State batteryLevel: number = 85;
  @State bluetoothStatus: string = '已连接';
  @State currentFace: string = '白色面';
  @State currentMode: string = '学习模式';
  @State cubeOrientation: CubeOrientation = { x: 0, y: 0, z: 0, face: '白色面' };
  
  // 3D动画相关
  @State rotationX: number = 0;
  @State rotationY: number = 0;
  @State rotationZ: number = 0;
  @State autoRotate: boolean = true;
  
  // 详细信息
  @State totalUsageTime: number = 0;
  @State todayUsageTime: number = 0;
  @State sessionCount: number = 0;
  @State lastSyncTime: string = '';
  
  // 传感器数据
  @State accelerometerData: Array<number> = [0, 0, 0];
  @State gyroscopeData: Array<number> = [0, 0, 0];

  aboutToAppear() {
    this.loadCubeData();
    this.startAutoRotation();
    this.startSensorUpdates();
  }

  onPageShow() {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility()
    this.animateIn()
  }

  aboutToDisappear() {
    this.stopAutoRotation();
    this.stopSensorUpdates();
  }

  private resetVisibility() {
    // 重置页面可见性状态
    // 这里可以添加重置动画状态或可见性相关的逻辑
  }

  private animateIn() {
    // 页面进入动画
    // 这里可以添加页面进入时的动画效果
  }

  private loadCubeData() {
    // 加载魔方状态数据
    this.cubeConnected = this.cubeStateManager.isConnected();
    this.batteryLevel = this.cubeStateManager.getBatteryLevel();
    this.currentFace = this.cubeStateManager.getCurrentFace();
    this.currentMode = this.cubeStateManager.getCurrentMode();
    
    // 加载统计数据
    this.totalUsageTime = this.cubeStateManager.getTotalUsageTime();
    this.todayUsageTime = this.cubeStateManager.getTodayUsageTime();
    this.sessionCount = this.cubeStateManager.getSessionCount();
    this.lastSyncTime = this.getCurrentTimeString();
  }

  private startAutoRotation() {
    if (this.autoRotate) {
      setInterval(() => {
        this.rotationY += 1;
        this.rotationX += 0.5;
      }, 50);
    }
  }

  private stopAutoRotation() {
    // 停止自动旋转
  }

  private startSensorUpdates() {
    // 模拟传感器数据更新
    setInterval(() => {
      this.accelerometerData = [
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ];
      this.gyroscopeData = [
        Math.random() * 0.5 - 0.25,
        Math.random() * 0.5 - 0.25,
        Math.random() * 0.5 - 0.25
      ];
    }, 1000);
  }

  private stopSensorUpdates() {
    // 停止传感器更新
  }

  private getCurrentTimeString(): string {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  private toggleAutoRotation() {
    this.autoRotate = !this.autoRotate;
    if (this.autoRotate) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  private resetRotation() {
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
  }

  build() {
    Column() {
      // 统一紫色背景，覆盖整个顶部包括状态栏
      Column() {
        Row() {
          Image($r('app.media.ic_back'))
            .width(24)
            .height(24)
            .fillColor(Color.White)
            .onClick(() => {
              NavigationManager.getInstance().navigateBack();
            })
          
          Text('魔方详情')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .layoutWeight(1)
            .textAlign(TextAlign.Center)
          
          Text('刷新')
            .fontSize(16)
            .fontColor('#6366F1')
            .fontWeight(FontWeight.Medium)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .backgroundColor(Color.White)
            .borderRadius(20)
            .onClick(() => {
              this.loadCubeData();
            })
        }
        .width('100%')
        .height(56)
        .padding({ left: 16, right: 16 })
      }
      .width('100%')
      .backgroundColor('#6366F1')
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])

      Scroll() {
        Column() {
          // 3D魔方展示区域 - 现代化设计
          Column() {
            Cube3DView({
              rotationX: this.rotationX,
              rotationY: this.rotationY,
              rotationZ: this.rotationZ,
              autoRotate: this.autoRotate,
              cubeSize: 120,
              showLabels: true
            })
          }
          .width('100%')
          .padding(16)

          // 控制按钮 - 现代化设计
          Row() {
            Button('重置旋转')
              .onClick(() => {
                this.resetRotation();
              })
              .backgroundColor('#6366F1')
              .fontColor(Color.White)
              .borderRadius(20)
              .fontWeight(FontWeight.Medium)
              .margin({ right: 8 })

            Button(this.autoRotate ? '停止旋转' : '开始旋转')
              .onClick(() => {
                this.toggleAutoRotation();
              })
              .backgroundColor(this.autoRotate ? '#EF4444' : '#10B981')
              .fontColor(Color.White)
              .borderRadius(20)
              .fontWeight(FontWeight.Medium)
          }
          .width('100%')
          .justifyContent(FlexAlign.Center)
          .padding({ bottom: 16 })

          // 魔方状态卡片 - 现代化设计
          Column() {
            Text('魔方状态')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
              .margin({ bottom: 16 })

            Row() {
              Text('连接状态')
                .fontSize(16)
                .fontColor('#6B7280')
                .fontWeight(FontWeight.Medium)
              
              Blank()
              
              Text(this.cubeConnected ? '已连接' : '未连接')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor(this.cubeConnected ? '#10B981' : '#EF4444')
            }
            .width('100%')
            .margin({ bottom: 12 })

            Row() {
                  Text('电池电量')
                    .fontSize(16)
                    .fontColor('#6B7280')
                    .fontWeight(FontWeight.Medium)
                  
                  Blank()
                  
                  Row() {
                    Text(this.batteryLevel + '%')
                      .fontSize(16)
                      .fontWeight(FontWeight.Bold)
                      .fontColor(this.batteryLevel > 20 ? '#10B981' : '#EF4444')
                    
                    Stack() {
                      Column()
                        .width(40)
                        .height(8)
                        .backgroundColor('#E5E7EB')
                        .borderRadius(4)
                        .margin({ left: 8 })
                      
                      Column()
                        .width(this.batteryLevel * 0.4)
                        .height(8)
                        .backgroundColor(this.batteryLevel > 20 ? '#10B981' : '#EF4444')
                        .borderRadius(4)
                        .margin({ left: 8 })
                    }
                    .margin({ left: 8 })
              }
            }
            .width('100%')
            .margin({ bottom: 12 })

            Row() {
              Text('当前面')
                .fontSize(16)
                .fontColor('#6B7280')
                .fontWeight(FontWeight.Medium)
              
              Blank()
              
              Text(this.currentFace)
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#6366F1')
            }
            .width('100%')
            .margin({ bottom: 12 })

            Row() {
              Text('当前模式')
                .fontSize(16)
                .fontColor('#6B7280')
                .fontWeight(FontWeight.Medium)
              
              Blank()
              
              Text(this.currentMode)
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#F59E0B')
            }
            .width('100%')
          }
          .width('100%')
          .padding(20)
          .backgroundColor(Color.White)
          .borderRadius(16)
          .shadow({
            radius: 20,
            color: '#00000008',
            offsetX: 0,
            offsetY: 4
          })
          .margin({ bottom: 16 })



          // 统计数据卡片 - 现代化设计
          Column() {
            Text('使用统计')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
              .margin({ bottom: 16 })

            Row() {
              Column() {
                Text(this.formatDuration(this.totalUsageTime))
                  .fontSize(28)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#6366F1')
                  .margin({ bottom: 4 })
                
                Text('总使用时间')
                  .fontSize(14)
                  .fontColor('#6B7280')
              }
              .layoutWeight(1)
              .alignItems(HorizontalAlign.Start)

              Column() {
                Text(this.formatDuration(this.todayUsageTime))
                  .fontSize(28)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#10B981')
                  .margin({ bottom: 4 })
                
                Text('今日使用')
                  .fontSize(14)
                  .fontColor('#6B7280')
              }
              .layoutWeight(1)
              .alignItems(HorizontalAlign.Center)

              Column() {
                Text(this.sessionCount.toString())
                  .fontSize(28)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#F59E0B')
                  .margin({ bottom: 4 })
                
                Text('会话次数')
                  .fontSize(14)
                  .fontColor('#6B7280')
              }
              .layoutWeight(1)
              .alignItems(HorizontalAlign.End)
            }
            .width('100%')
            .margin({ bottom: 12 })

            Row() {
              Text('最后同步')
                .fontSize(14)
                .fontColor('#6B7280')
                .fontWeight(FontWeight.Medium)
              
              Blank()
              
              Text(this.lastSyncTime)
                .fontSize(14)
                .fontColor('#9CA3AF')
                .fontWeight(FontWeight.Medium)
            }
            .width('100%')
          }
          .width('100%')
          .padding(20)
          .backgroundColor(Color.White)
          .borderRadius(16)
          .shadow({
            radius: 20,
            color: '#00000008',
            offsetX: 0,
            offsetY: 4
          })
          .margin({ bottom: 16 })

          // 传感器数据卡片 - 现代化设计
          Column() {
            Text('传感器数据')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
              .margin({ bottom: 16 })

            Column() {
              Row() {
                Text('加速度计')
                  .fontSize(16)
                  .fontColor('#6B7280')
                  .fontWeight(FontWeight.Medium)
                  .layoutWeight(1)
                
                Text(`X: ${this.accelerometerData[0].toFixed(2)}`)
                  .fontSize(14)
                  .fontColor('#6366F1')
                  .fontWeight(FontWeight.Bold)
                  .layoutWeight(1)
                  .textAlign(TextAlign.Center)
                
                Text(`Y: ${this.accelerometerData[1].toFixed(2)}`)
                  .fontSize(14)
                  .fontColor('#10B981')
                  .fontWeight(FontWeight.Bold)
                  .layoutWeight(1)
                  .textAlign(TextAlign.Center)
                
                Text(`Z: ${this.accelerometerData[2].toFixed(2)}`)
                  .fontSize(14)
                  .fontColor('#F59E0B')
                  .fontWeight(FontWeight.Bold)
                  .layoutWeight(1)
                  .textAlign(TextAlign.Center)
              }
              .width('100%')
              .margin({ bottom: 12 })

              Row() {
                Text('陀螺仪')
                  .fontSize(16)
                  .fontColor('#6B7280')
                  .fontWeight(FontWeight.Medium)
                  .layoutWeight(1)
                
                Text(`X: ${this.gyroscopeData[0].toFixed(2)}`)
                  .fontSize(14)
                  .fontColor('#6366F1')
                  .fontWeight(FontWeight.Bold)
                  .layoutWeight(1)
                  .textAlign(TextAlign.Center)
                
                Text(`Y: ${this.gyroscopeData[1].toFixed(2)}`)
                  .fontSize(14)
                  .fontColor('#10B981')
                  .fontWeight(FontWeight.Bold)
                  .layoutWeight(1)
                  .textAlign(TextAlign.Center)
                
                Text(`Z: ${this.gyroscopeData[2].toFixed(2)}`)
                  .fontSize(14)
                  .fontColor('#F59E0B')
                  .fontWeight(FontWeight.Bold)
                  .layoutWeight(1)
                  .textAlign(TextAlign.Center)
              }
              .width('100%')
            }
            .padding(16)
            .backgroundColor('#F9FAFB')
            .borderRadius(12)
          }
          .width('100%')
          .padding(20)
          .backgroundColor(Color.White)
          .borderRadius(16)
          .shadow({
            radius: 20,
            color: '#00000008',
            offsetX: 0,
            offsetY: 4
          })
          .margin({ bottom: 32 })
        }
        .padding(16)
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F5F5F5')
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
}