import TimeManagementService, { StatisticsData } from '../services/TimeManagementService'
import DataStorage from '../utils/DataStorage'
import { TimerDisplay } from '../components/TimerDisplay'
import { navigationManager, TransitionType } from '../utils/NavigationManager'

@Entry
@Component
struct Dashboard {
  timerOpacity: number = 1
  timerScale: number = 1
  navOpacity: number = 1
  navScale: number = 1

  @State timeLeft: number = 0
  @State isRunning: boolean = false
  @State currentMode: string = 'Work'
  @State private statistics: StatisticsData = { 
    totalSessions: 0, 
    totalTime: 0, 
    totalFocusTime: 0, 
    todaySessions: 0, 
    todayTime: 0, 
    todayFocusTime: 0, 
    weekSessions: 0, 
    weekTime: 0, 
    monthSessions: 0, 
    monthTime: 0, 
    sessionsCount: 0, 
    currentStreak: 0,
    modeStats: {}
  }
  @State private totalFocusTime: number = 0
  @State private todayFocusTime: number = 0
  @State private sessionsCount: number = 0
  @State private currentStreak: number = 0
  @State private titleScale: number = 0.8
  @State private titleOpacity: number = 0
  @State private cardScale: number = 0.8
  @State private cardOpacity: number = 0
  @State private itemScale: number = 0.8
  @State private itemOpacity: number = 0
  @State private buttonScale: number = 0.8
  @State private buttonOpacity: number = 0

  private timeService: TimeManagementService = TimeManagementService.getInstance();

  // 页面入场动画 - 更快更有弹性
  private animateIn() {
    // 标题动画 - 弹性进入
    animateTo({ 
      duration: 350, 
      curve: Curve.Friction
    }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })
    
    // 卡片动画 - 轻微延迟的弹性效果
    animateTo({ 
      duration: 400, 
      curve: Curve.Friction,
      delay: 80
    }, () => {
      this.cardScale = 1
      this.cardOpacity = 1
    })
    
    // 项目动画 - 更有弹性的效果
    animateTo({ 
      duration: 450, 
      curve: Curve.Friction,
      delay: 150
    }, () => {
      this.itemScale = 1
      this.itemOpacity = 1
    })
    
    // 按钮动画 - 弹性效果
    animateTo({ 
      duration: 500, 
      curve: Curve.Friction,
      delay: 220
    }, () => {
      this.buttonScale = 1
      this.buttonOpacity = 1
    })
  }

  async aboutToAppear() {
    this.generateScramble()
    this.loadBestTime()
    // 首次进入时直接执行动画，不重置状态
    this.animateIn()
  }

  onPageShow() {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility()
    this.animateIn()
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
                  // 使用自定义返回动画
                  animateTo({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.itemOpacity = 0;
                    this.itemScale = 0.3;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0.3;
                  });
                  setTimeout(() => {
                    navigationManager.navigateBack();
                  }, 300);
                })
              
              Text('仪表盘')
                .fontSize(20)
                .fontWeight(FontWeight.Bold)
                .fontColor(Color.White)
                .layoutWeight(1)
                .textAlign(TextAlign.Center)
                .scale({ x: this.titleScale, y: this.titleScale }).opacity(this.titleOpacity)
            }
        .width('100%')
        .height(56)
        .padding({ left: 16, right: 16 })
        .justifyContent(FlexAlign.Center)
        .alignItems(VerticalAlign.Center)
      }
      .width('100%')
      .backgroundColor('#6366F1')
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])

      Scroll() {
        Column() {
          // Timer Section
          Column() {
            TimerDisplay({
              timeLeft: this.timeLeft,
              isRunning: this.isRunning,
              currentMode: this.currentMode
            }).scale({ x: this.cardScale, y: this.cardScale }).opacity(this.cardOpacity)

            Row({ space: 16 }) {
              Button('Start')
                .width(100)
                .onClick(() => {
                  this.timeService.startPomodoro();
                })
                .visibility(this.isRunning ? Visibility.None : Visibility.Visible)

              Button('Pause')
                .width(100)
                .onClick(() => {
                  this.timeService.stopTiming();
                })
                .visibility(this.isRunning ? Visibility.Visible : Visibility.None)

              Button('Reset')
                .width(100)
                .onClick(() => {
                  this.timeService.stopTiming();
                })
            }
            .margin({ top: 16 })
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .margin({ left: 16, right: 16, top: 16, bottom: 16 })

          // Statistics Section
          Column() {
            Text('Statistics')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .margin({ bottom: 12 })
              .scale({ x: this.itemScale, y: this.itemScale }).opacity(this.itemOpacity)

            Row() {
              Column() {
                Text('Total Focus')
                  .fontSize(12)
                  .fontColor('#666666')
                Text(`${Math.floor(this.totalFocusTime / 60)} min`)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
              }
              .layoutWeight(1)
              .alignItems(HorizontalAlign.Center)
              .scale({ x: this.itemScale, y: this.itemScale }).opacity(this.itemOpacity)

              Column() {
                Text('Today')
                  .fontSize(12)
                  .fontColor('#666666')
                Text(`${Math.floor(this.todayFocusTime / 60)} min`)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
              }
              .layoutWeight(1)
              .alignItems(HorizontalAlign.Center)
              .scale({ x: this.itemScale, y: this.itemScale }).opacity(this.itemOpacity)

              Column() {
                Text('Sessions')
                  .fontSize(12)
                  .fontColor('#666666')
                Text(this.sessionsCount.toString())
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
              }
              .layoutWeight(1)
              .alignItems(HorizontalAlign.Center)
              .scale({ x: this.itemScale, y: this.itemScale }).opacity(this.itemOpacity)

              Column() {
                Text('Streak')
                  .fontSize(12)
                  .fontColor('#666666')
                Text(`${this.currentStreak} days`)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
              }
              .layoutWeight(1)
              .alignItems(HorizontalAlign.Center)
              .scale({ x: this.itemScale, y: this.itemScale }).opacity(this.itemOpacity)
            }
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .margin({ left: 16, right: 16 })

          // Quick Actions
          Row({ space: 16 }) {
            Button('Tasks')
              .layoutWeight(1)
              .onClick(() => {
                  // 使用自定义动画序列
                  animateTo({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.itemOpacity = 0;
                    this.itemScale = 0.3;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0.3;
                  });
                  setTimeout(() => {
                    navigationManager.navigateTo('pages/Tasks');
                  }, 300);
                })
              .scale({ x: this.buttonScale, y: this.buttonScale }).opacity(this.buttonOpacity)

            Button('Calendar')
              .layoutWeight(1)
              .onClick(() => {
                  // 使用自定义动画序列
                  animateTo({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.itemOpacity = 0;
                    this.itemScale = 0.3;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0.3;
                  });
                  setTimeout(() => {
                    navigationManager.navigateTo('pages/Calendar');
                  }, 300);
                })
              .scale({ x: this.buttonScale, y: this.buttonScale }).opacity(this.buttonOpacity)

            Button('Settings')
              .layoutWeight(1)
              .onClick(() => {
                  // 使用自定义动画序列
                  animateTo({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.itemOpacity = 0;
                    this.itemScale = 0.3;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0.3;
                  });
                  setTimeout(() => {
                    navigationManager.navigateTo('pages/Settings');
                  }, 300);
                })
              .scale({ x: this.buttonScale, y: this.buttonScale }).opacity(this.buttonOpacity)
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 16, bottom: 16 })
        }
        .width('100%')
      }
      .layoutWeight(1)
      .backgroundColor('#F2F2F7')
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F2F2F7')
  }

  // 生成打乱步骤
  private generateScramble(): string {
    const moves = ["R", "U", "F", "L", "D", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    for (let i = 0; i < 20; i++) {
      scramble += moves[Math.floor(Math.random() * moves.length)] + 
                  modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
    }
    return scramble.trim();
  }

  // 加载最佳时间
  private loadBestTime(): number {
    return 0;
  }

  // 重置可见性
  private resetVisibility(): void {
    this.titleOpacity = 1;
    this.titleScale = 1;
    this.buttonOpacity = 1;
    this.buttonScale = 1;
    this.cardOpacity = 1;
    this.cardScale = 1;
    this.itemOpacity = 1;
    this.itemScale = 1;
    this.timerOpacity = 1;
    this.timerScale = 1;
    this.navOpacity = 1;
    this.navScale = 1;
  }

  // 页面切换动画 - 底部导航条保持不动
  private animateTransition(callback: () => void): void {
    animateTo({ 
      duration: 400, 
      curve: Curve.Friction,
      onFinish: callback
    }, () => {
      // 导航条保持不动，只隐藏其他元素
      this.titleOpacity = 0;
      this.titleScale = 0.3;
      this.buttonOpacity = 0;
      this.buttonScale = 0.3;
      this.cardOpacity = 0;
      this.cardScale = 0.3;
      this.itemOpacity = 0;
      this.itemScale = 0.3;
      this.timerOpacity = 0;
      this.timerScale = 0.3;
      // 导航条保持可见和原始大小
      this.navOpacity = 1;
      this.navScale = 1;
    });
  }

}
