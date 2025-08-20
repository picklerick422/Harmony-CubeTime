import CubeStateManager from '../services/CubeStateManager';
import TimeManagementService from '../services/TimeManagementService';
import router from '@ohos.router';

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
  @State private currentScale: number = 1
  @State private currentOpacity: number = 1
  @State private selectedTab: number = 0

  private timer: number = 0

  aboutToAppear() {
    this.generateScramble()
    this.loadBestTime()
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

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('CubeTime')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
      }
      .width('100%')
      .height(56)
      .backgroundColor('#2563EB')
      .justifyContent(FlexAlign.Center)

      // 魔方状态显示
      Column() {
        Text('魔方状态')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .margin({ bottom: 8 })

        Text(this.cubeState)
          .fontSize(16)
          .fontColor('#6B7280')
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#F3F4F6')
      .borderRadius(12)
      .margin({ top: 16, left: 16, right: 16 })

      // 打乱显示
      Column() {
        Text('打乱')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .margin({ bottom: 8 })

        Text(this.scramble)
          .fontSize(16)
          .fontColor('#374151')
          .textAlign(TextAlign.Center)
          .width('100%')
          .padding(12)
          .backgroundColor('#FFFFFF')
          .borderRadius(8)
          .border({ width: 1, color: '#D1D5DB' })
      }
      .width('100%')
      .padding(16)
      .margin({ left: 16, right: 16 })

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
          .border({ width: 2, color: '#2563EB' })
          .scale({ x: this.currentScale, y: this.currentScale })
          .opacity(this.currentOpacity)
          .animation({
            duration: 200,
            curve: Curve.EaseInOut
          })
      }
      .width('100%')
      .padding(16)

      // 最佳时间
      Column() {
        Text('最佳时间')
          .fontSize(16)
          .fontColor('#6B7280')
        Text(this.formatTime(this.bestTime))
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#059669')
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#F0FDF4')
      .borderRadius(12)
      .margin({ left: 16, right: 16 })

      // 控制按钮
      Row() {
        Button('重置')
          .width(100)
          .height(40)
          .backgroundColor('#6B7280')
          .fontColor('#FFFFFF')
          .borderRadius(20)
          .onClick(() => {
            this.resetTimer()
            animateTo({
              duration: 200,
              curve: Curve.EaseInOut
            }, () => {
              this.currentScale = 1.1
              this.currentOpacity = 0.8
            })
            setTimeout(() => {
              this.currentScale = 1
              this.currentOpacity = 1
            }, 200)
          })

        Button(this.isTiming ? '停止' : '开始')
          .width(120)
          .height(48)
          .backgroundColor(this.isTiming ? '#EF4444' : '#10B981')
          .fontColor('#FFFFFF')
          .borderRadius(24)
          .margin({ left: 16 })
          .onClick(() => {
            if (this.isTiming) {
              this.stopTimer()
            } else {
              this.startTimer()
            }
            animateTo({
              duration: 200,
              curve: Curve.EaseInOut
            }, () => {
              this.currentScale = 1.1
              this.currentOpacity = 0.8
            })
            setTimeout(() => {
              this.currentScale = 1
              this.currentOpacity = 1
            }, 200)
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .margin({ top: 16 })

      // 底部导航
      Row() {
        Column() {
          Text('🏠')
            .fontSize(24)
            .fontColor(this.selectedTab === 0 ? '#2563EB' : '#9CA3AF')
          Text('首页')
            .fontSize(12)
            .fontColor(this.selectedTab === 0 ? '#2563EB' : '#9CA3AF')
        }
        .width('25%')
        .onClick(() => {
          this.selectedTab = 0
          // 已经在首页，不需要跳转
        })

        Column() {
          Text('📊')
            .fontSize(24)
            .fontColor(this.selectedTab === 1 ? '#2563EB' : '#9CA3AF')
          Text('统计')
            .fontSize(12)
            .fontColor(this.selectedTab === 1 ? '#2563EB' : '#9CA3AF')
        }
        .width('25%')
        .onClick(() => {
          this.selectedTab = 1
          router.pushUrl({ url: 'pages/Dashboard' })
        })

        Column() {
          Text('⏱️')
            .fontSize(24)
            .fontColor(this.selectedTab === 2 ? '#2563EB' : '#9CA3AF')
          Text('计时')
            .fontSize(12)
            .fontColor(this.selectedTab === 2 ? '#2563EB' : '#9CA3AF')
        }
        .width('25%')
        .onClick(() => {
          this.selectedTab = 2
          router.pushUrl({ url: 'pages/Pomodoro' })
        })

        Column() {
          Text('⚙️')
            .fontSize(24)
            .fontColor(this.selectedTab === 3 ? '#2563EB' : '#9CA3AF')
          Text('设置')
            .fontSize(12)
            .fontColor(this.selectedTab === 3 ? '#2563EB' : '#9CA3AF')
        }
        .width('25%')
        .onClick(() => {
          this.selectedTab = 3
          router.pushUrl({ url: 'pages/Settings' })
        })
      }
      .width('100%')
      .height(60)
      .backgroundColor('#FFFFFF')
      .border({ width: 1, color: '#E5E7EB', style: BorderStyle.Solid })
      .position({ bottom: 0 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F9FAFB')
  }
}