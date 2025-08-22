import { NavigationManager, PageAnimationState } from '../utils/NavigationManager'
import { router } from '@kit.ArkUI'

interface CubeState {
  isSolved: boolean;
  currentTime: string;
  scrambleMoves: string[];
  sessionCount: number;
  bestTime: string;
  totalPracticeTime: string;
}

interface IndexState {
  navigationManager?: NavigationManager
  animationState: PageAnimationState
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
  @State private iconOpacity: number = 0
  @State private iconScale: number = 0
  
  @State private itemScale: number = 1
  @State private itemOpacity: number = 1
  @State private selectedTab: number = 0
  private timer: number = 0

  aboutToAppear() {
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

  // 页面加载动画 - 协调动画速度
  private animateIn() {
    // 快速但有层次的动画，总时长400ms
    // 标题 - 立即出现（200ms）
    animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
      this.titleOpacity = 1
      this.titleScale = 1
    })

    // 主要内容 - 轻微延迟（250ms）
    setTimeout(() => {
      animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
        this.cardOpacity = 1
        this.cardScale = 1
        this.timerOpacity = 1
        this.timerScale = 1
      })
    }, 100)

    // 操作按钮 - 最后出现（200ms）
    setTimeout(() => {
      animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
        this.buttonOpacity = 1
        this.buttonScale = 1
        this.navOpacity = 1
        this.navScale = 1
        this.iconOpacity = 1
        this.iconScale = 1
      })
    }, 200)

    // 底部图标
  }

  //need to be corrected
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

  // 使用自定义动画序列的页面切换
  private navigateTo(page: string) {
    this.animateTransition(() => {
      NavigationManager.getInstance().navigateTo(page);
    });
  }

  // 页面切换动画 - 底部导航条保持不动
  private animateTransition(callback: () => void) {
    animateToImmediately({ 
      duration: 300, 
      curve: Curve.Friction,
      onFinish: callback
    }, () => {
      // 导航条保持不动，只隐藏其他元素
      this.titleOpacity = 0
      this.titleScale = 0.3
      this.cardOpacity = 0
      this.cardScale = 0.3
      this.timerOpacity = 0
      this.timerScale = 0.3
      this.buttonOpacity = 0
      this.buttonScale = 0.3
      // 导航条保持可见和原始大小
      this.navOpacity = 1
      this.navScale = 1
      this.iconOpacity = 0
      this.iconScale = 0.3
    })
  }

  // 重置页面可见性（解决返回空白问题）
  private resetVisibility(): void {
    // 强制重置所有动画状态为可见，导航条始终保持可见
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
          Text('  CubeTime')
            .width('25%')
            .fontSize(32)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .layoutWeight(1)
            .textAlign(TextAlign.Start)
            .scale({ x: this.titleScale, y: this.titleScale })
            .opacity(this.titleOpacity)
            .animation({
              duration: 500,
              curve: Curve.Friction
            })
        }
        .width('100%')
        .height(38)
        .justifyContent(FlexAlign.Center)
        .alignItems(VerticalAlign.Top)
        Row() {
          Text('      一个智能时间管理app')
            .width('20%')
            .fontSize(10)
            .fontWeight(FontWeight.Normal)
            .fontColor('#FFFFFF')
            .layoutWeight(1)
            .textAlign(TextAlign.Start)
            .scale({ x: this.titleScale, y: this.titleScale })
            .opacity(0.6)
            .animation({
              duration: 500,
              curve: Curve.Friction
            })
        }
        .justifyContent(FlexAlign.Center)
        .alignItems(VerticalAlign.Top)
        .height(17)
      }
      .width('100%')
      .backgroundColor('#6366F1')
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])

      //主体部分
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
              duration: 500,
              curve: Curve.Friction
            })

            Text(this.cubeState)
              .fontSize(16)
              .fontColor('#6B7280')
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
                duration: 500,
                curve: Curve.Friction
              })
          }
          .width('90%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .margin({ left: 16, right: 16, top: 16 })
          .scale({ x: this.cardScale, y: this.cardScale })
          .opacity(this.cardOpacity)
          .animation({
            duration: 500,
            curve: Curve.Friction
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
                duration: 500,
                curve: Curve.Friction,
                delay: 100
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
                duration: 500,
                curve: Curve.Friction,
                delay: 100
              })
          }
          .width('100%')
          .padding(16)
          .margin({ left: 16, right: 16 })
          .scale({ x: this.cardScale, y: this.cardScale })
          .opacity(this.cardOpacity)
          .animation({
            duration: 500,
            curve: Curve.Friction,
            delay: 100
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
                duration: 500,
                curve: Curve.Friction,
                delay: 200
            })
          }
          .width('100%')
          .padding(16)
          .scale({ x: this.timerScale, y: this.timerScale })
          .opacity(this.timerOpacity)
          .animation({
            duration: 500,
            curve: Curve.Friction,
            delay: 200
          })

          // 最佳时间
          Column() {
            Text('最佳时间')
              .fontSize(16)
              .fontColor('#6B7280')
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 300
            })
            Text(this.formatTime(this.bestTime))
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#059669')
              .scale({ x: this.cardScale, y: this.cardScale })
              .opacity(this.cardOpacity)
              .animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 300
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
            duration: 500,
            curve: Curve.EaseOut,
            delay: 300
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
              duration: 500,
              curve: Curve.EaseOut,
              delay: 400
            })
              .onClick(() => {
                animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                  this.buttonScale = 0.95
                })
                setTimeout(() => {
                  animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.buttonScale = 1
                  })
                }, 150)
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
                  duration: 500,
                  curve: Curve.Friction,
                  delay: 400
                })
                .onClick(() => {
                  animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.buttonScale = 0.95
                  })
                  setTimeout(() => {
                    animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                      this.buttonScale = 1
                    })
                  }, 150)
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
                  duration: 500,
                  curve: Curve.EaseOut,
                  delay: 400
                })
                .onClick(() => {
                  animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.buttonScale = 0.95
                  })
                  setTimeout(() => {
                    animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                      this.buttonScale = 1
                    })
                  }, 150)
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
            duration: 500,
            curve: Curve.Friction,
            delay: 400
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
              duration: 500,
              curve: Curve.Friction
            })
          Text('首页')
            .fontSize(12)
            .fontColor('#6366F1')
            .margin({ top: 4 })
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
              duration: 500,
              curve: Curve.EaseOut,
              delay: 500
            })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
            // 首页按钮，无需导航
        })
        .scale({ x: this.iconScale, y: this.iconScale })
        .opacity(this.iconOpacity)
        .animation({
          duration: 500,
          curve: Curve.Friction,
          delay: 0
        })

        Column() {
          Image($r('app.media.ic_pomodoro'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
              duration: 500,
              curve: Curve.EaseOut,
              delay: 500
            })
          Text('番茄钟')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
              duration: 500,
              curve: Curve.EaseOut,
              delay: 500
            })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          this.navigateTo('Pomodoro')
        })
        .scale({ x: this.iconScale, y: this.iconScale })
        .opacity(this.iconOpacity)
        .animation({
          duration: 500,
          curve: Curve.Friction,
          delay: 0
        })

        Column() {
          Image($r('app.media.ic_calendar'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
              duration: 500,
              curve: Curve.EaseOut,
              delay: 500
            })
          Text('日历')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.navScale, y: this.navScale })
            .animation({
              duration: 500,
              curve: Curve.EaseOut,
              delay: 500
            })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          this.navigateTo('Calendar')
        })
        .scale({ x: this.iconScale, y: this.iconScale })
        .opacity(this.iconOpacity)
        .animation({
          duration: 500,
          curve: Curve.Friction,
          delay: 0
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
              duration: 500,
              curve: Curve.EaseOut,
              delay: 500
            })
        }
        .width('25%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          this.navigateTo('Settings')
        })
        .scale({ x: this.iconScale, y: this.iconScale })
        .opacity(this.iconOpacity)
        .animation({
          duration: 500,
          curve: Curve.Friction,
          delay: 0
        })
      }
      .width('100%')
      .padding({ top: 12, bottom: 8 })
      .backgroundColor('#FFFFFF')
      .border({
        width: { top: 1 },
        color: '#E5E7EB'
      })

    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F2F2F7')
  }
}
