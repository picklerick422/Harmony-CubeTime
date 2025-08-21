import TimeManagementService, { StatisticsData } from '../services/TimeManagementService'
import DataStorage from '../utils/DataStorage'
import { TimerDisplay } from '../components/TimerDisplay'
import router from '@ohos.router'

@Entry
@Component
struct Dashboard {
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

  // 页面入场动画 - 只在页面加载时触发
  private animateIn() {
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
      this.cardScale = 1
      this.cardOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 300 }, () => {
      this.itemScale = 1
      this.itemOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 400 }, () => {
      this.buttonScale = 1
      this.buttonOpacity = 1
    })
  }

  async aboutToAppear() {
    await this.timeService.init();
    this.loadStatistics();
    this.startTimerUpdate();
    this.animateIn();
  }

  loadStatistics(): void {
    const stats: StatisticsData = this.timeService.getStatistics();
    this.totalFocusTime = stats.totalFocusTime;
    this.todayFocusTime = stats.todayFocusTime;
    this.sessionsCount = stats.sessionsCount;
    this.currentStreak = stats.currentStreak;
  }

  startTimerUpdate() {
    setInterval(() => {
      this.timeLeft = this.timeService.getTimeLeft();
      this.isRunning = this.timeService.isRunning();
      this.currentMode = this.timeService.getCurrentMode();
    }, 1000);
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
                  router.back();
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
                  router.pushUrl({ url: 'pages/Tasks' });
                })
              .scale({ x: this.buttonScale, y: this.buttonScale }).opacity(this.buttonOpacity)

            Button('Calendar')
              .layoutWeight(1)
              .onClick(() => {
                  router.pushUrl({ url: 'pages/Calendar' });
                })
              .scale({ x: this.buttonScale, y: this.buttonScale }).opacity(this.buttonOpacity)

            Button('Settings')
              .layoutWeight(1)
              .onClick(() => {
                  router.pushUrl({ url: 'pages/Settings' });
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
}
