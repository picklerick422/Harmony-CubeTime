import CubeStateManager from '../services/CubeStateManager';
import TimeManagementService from '../services/TimeManagementService';
import { navigationManager, TransitionType } from '../utils/NavigationManager';
import { TimerDisplay } from '../components/TimerDisplay'

interface CubeState {
  isSolved: boolean;
  currentTime: string;
  scrambleMoves: string[];
  sessionCount: number;
  bestTime: string;
  totalPracticeTime: string;
}

@Entry
@Component
struct Index {
  @State private cubeState: string = '未开始'
  @State private scramble: string = ''
  @State private solveTime: number = 0
  @State private isTiming: boolean = false
  @State private startTime: number = 0
  @State private showScramble: boolean = false
  @State private bestTime: number = 0
  
  // 弹性动画状态变量
  @State private titleScale: number = 0.8
  @State private titleOpacity: number = 0
  @State private cardScale: number = 0.9
  @State private cardOpacity: number = 0
  @State private timerScale: number = 0.7
  @State private timerOpacity: number = 0
  @State private buttonScale: number = 0.8
  @State private buttonOpacity: number = 0
  @State private navScale: number = 0.9
  @State private navOpacity: number = 0
  
  @State private itemScale: number = 1
  @State private itemOpacity: number = 1
  @State private selectedTab: number = 0
  private timer: number = 0

  aboutToAppear() {
    this.generateScramble()
    this.loadBestTime()
    // 确保页面返回时重置为可见状态
    this.resetVisibility()
    this.animateIn()
  }

  onPageShow() {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility()
    this.animateIn()
  }
  // 入场动画
  private animateIn() {
    animateTo({ duration: 600, curve: Curve.EaseOut }, () => {
      this.titleOpacity = 1;
      this.titleScale = 1;
      this.cardOpacity = 1;
      this.cardScale = 1;
      this.buttonOpacity = 1;
      this.buttonScale = 1;
      this.timerOpacity = 1;
      this.timerScale = 1;
      this.navOpacity = 1;
      this.navScale = 1;
      this.itemOpacity = 1;
      this.itemScale = 1;
    });
  }


  private generateScramble() {
    const moves = ["R", "U", "F", "L", "D", "B"]
    const modifiers = ["", "'", "2"]
    let scramble = ""
    let lastMove = ""
    
    for (let i = 0; i < 20; i++) {
      let move = moves[Math.floor(Math.random() * moves.length)]
      while (move === lastMove) {
        move = moves[Math.floor(Math.random() * moves.length)]
      }
      lastMove = move
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)]
      scramble += move + modifier + " "
    }
    this.scramble = scramble.trim()
  }

  private loadBestTime() {
    this.bestTime = 0
  }

  private startTimer() {
    if (!this.isTiming) {
      this.isTiming = true
      this.startTime = Date.now()
      this.timer = setInterval(() => {
        this.solveTime = Date.now() - this.startTime
      }, 10)
    }
  }

  private stopTimer() {
    if (this.isTiming) {
      this.isTiming = false
      clearInterval(this.timer)
      if (this.solveTime < this.bestTime || this.bestTime === 0) {
        this.bestTime = this.solveTime
      }
    }
  }

  private resetTimer() {
    this.solveTime = 0
    this.isTiming = false
    clearInterval(this.timer)
    this.generateScramble()
  }

  private formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    } else {
      return `${seconds}.${milliseconds.toString().padStart(2, '0')}`
    }
  }

  private navigateTo(page: string) {
    // 使用带动画的页面切换
    this.animateTransition(() => {
      navigationManager.navigateTo(page, TransitionType.SLIDE_LEFT);
    })
  }

  // 页面切换动画
  private animateTransition(callback: () => void) {
    // 创建退出动画效果
    animateTo({ 
      duration: 200, 
      curve: Curve.EaseIn,
      onFinish: callback
    }, () => {
      // 页面淡出效果
      this.titleOpacity = 0
      this.cardOpacity = 0
      this.timerOpacity = 0
      this.buttonOpacity = 0
      this.navOpacity = 0
    })
  }

  // 重置页面可见性（解决返回空白问题）
  private resetVisibility(): void {
    // 强制重置所有动画状态为可见
    this.titleScale = 1
    this.titleOpacity = 1
    this.cardScale = 1
    this.cardOpacity = 1
    this.itemScale = 1
    this.itemOpacity = 1
    this.buttonScale = 1
    this.buttonOpacity = 1
    this.timerScale = 1
    this.timerOpacity = 1
    this.navScale = 1
    this.navOpacity = 1
  }

  build() {
    Column() {
      // 统一紫色背景标题栏，融入状态栏
      Column() {
        Row() {
          Text('CubeTime')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .layoutWeight(1)
            .textAlign(TextAlign.Center)
            .scale({ x: this.titleScale, y: this.titleScale })
            .opacity(this.titleOpacity)
            .animation({
              duration: 800,
              curve: Curve.EaseOut,
              delay: 100
            })
        }
        .width('100%')
        .height(56)
        .justifyContent(FlexAlign.Center)
        .alignItems(VerticalAlign.Center)
      }
      .width('100%')
      .backgroundColor('#6366F1')
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])

      Scroll() {
        Column() {
          // 魔方状态显示
          Column() {
            Text('魔方状态')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
              .margin({ bottom: 8 })
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
              duration: 800,
              curve: Curve.EaseOut,
              delay: 200
            })

            Text(this.cubeState)
              .fontSize(16)
              .fontColor('#6B7280')
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
                duration: 800,
                curve: Curve.EaseOut,
                delay: 200
              })
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .margin({ left: 16, right: 16, top: 16 })
          .scale({ x: this.cardScale, y: this.cardScale })
          .opacity(this.cardOpacity)
          .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 200
          })

          // 打乱显示
          Column() {
            Text('打乱')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
              .margin({ bottom: 8 })
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
              duration: 800,
              curve: Curve.EaseOut,
              delay: 250
            })

            Text(this.scramble)
              .fontSize(16)
              .fontColor('#374151')
              .textAlign(TextAlign.Center)
              .width('100%')
              .padding(12)
              .backgroundColor('#FFFFFF')
              .borderRadius(8)
              .border({ width: 1, color: '#E5E7EB' })
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
                duration: 800,
                curve: Curve.EaseOut,
                delay: 250
              })
          }
          .width('100%')
          .padding(16)
          .margin({ left: 16, right: 16 })
          .scale({ x: this.cardScale, y: this.cardScale })
          .opacity(this.cardOpacity)
          .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 250
          })

          // 计时器显示
          Column() {
            Text(this.formatTime(this.solveTime))
              .fontSize(48)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
              .textAlign(TextAlign.Center)
              .width('100%')
              .padding(32)
              .backgroundColor('#FFFFFF')
              .borderRadius(16)
              .border({ width: 2, color: '#6366F1' })
              .scale({ x: this.timerScale, y: this.timerScale })
              .opacity(this.timerOpacity)
              .animation({
              duration: 800,
              curve: Curve.EaseOut,
              delay: 300
            })
          }
          .width('100%')
          .padding(16)
          .scale({ x: this.timerScale, y: this.timerScale })
          .opacity(this.timerOpacity)
          .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 300
          })

          // 最佳时间
          Column() {
            Text('最佳时间')
              .fontSize(16)
              .fontColor('#6B7280')
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
              duration: 800,
              curve: Curve.EaseOut,
              delay: 350
            })
            Text(this.formatTime(this.bestTime))
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#059669')
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
                duration: 800,
                curve: Curve.EaseOut,
                delay: 350
              })
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#F0FDF4')
          .borderRadius(12)
          .margin({ left: 16, right: 16 })
          .scale({ x: this.cardScale, y: this.cardScale })
          .opacity(this.cardOpacity)
          .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 350
          })

          // 控制按钮
          Row() {
            Button('重置')
              .width(100)
              .height(40)
              .backgroundColor('#EF4444')
              .fontColor('#FFFFFF')
              .borderRadius(20)
              .scale({ x: this.buttonScale, y: this.buttonScale })
              .opacity(this.buttonOpacity)
              .animation({
              duration: 800,
              curve: Curve.EaseOut,
              delay: 400
            })
              .onClick(() => {
                this.resetTimer()
              })

            if (!this.isTiming) {
              Button('开始')
                .width(100)
                .height(40)
                .backgroundColor('#10B981')
                .fontColor('#FFFFFF')
                .borderRadius(20)
          .scale({ x: this.buttonScale, y: this.buttonScale })
          .opacity(this.buttonOpacity)
          .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 400
          })
                .onClick(() => {
                  this.startTimer()
                })
            } else {
              Button('停止')
                .width(100)
                .height(40)
                .backgroundColor('#F59E0B')
                .fontColor('#FFFFFF')
                .borderRadius(20)
          .scale({ x: this.buttonScale, y: this.buttonScale })
          .opacity(this.buttonOpacity)
          .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 400
          })
                .onClick(() => {
                  this.stopTimer()
                })
            }
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceEvenly)
          .padding(16)
          .scale({ x: this.buttonScale, y: this.buttonScale })
          .opacity(this.buttonOpacity)
          .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 500
          })
        }
      }
      .layoutWeight(1)

      // 底部导航
      Row() {
        Column() {
          Image($r('app.media.ic_tasks'))
            .width(24)
            .height(24)
            .fillColor('#6366F1')
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
              duration: 800,
              curve: Curve.EaseOut,
              delay: 500
            })
          Text('首页')
            .fontSize(12)
            .fontColor('#6366F1')
            .margin({ top: 4 })
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 500
          })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          // 首页按钮，无需导航
        })

        Column() {
          Image($r('app.media.ic_pomodoro'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 500
          })
          Text('番茄钟')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 500
          })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          this.navigateTo('Pomodoro')
        })

        Column() {
          Image($r('app.media.ic_calendar'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 500
          })
          Text('日历')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 500
          })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          this.navigateTo('Calendar')
        })

        Column() {
          Image($r('app.media.ic_settings'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
            duration: 800,
            curve: Curve.EaseOut,
            delay: 500
          })
          Text('设置')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
          duration: 800,
          curve: Curve.EaseOut,
          delay: 500
        })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          this.navigateTo('Settings')
        })
      }
      .width('100%')
      .padding({ top: 12, bottom: 8 })
      .backgroundColor('#FFFFFF')
      .border({
        width: { top: 1 },
        color: '#E5E7EB'
      })
      .scale({ x: this.navScale, y: this.navScale })
      .opacity(this.navOpacity)
      .animation({
          duration: 800,
          curve: Curve.EaseOut,
          delay: 500
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F2F2F7')
  }
}