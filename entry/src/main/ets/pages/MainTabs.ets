import { router, display } from '@kit.ArkUI'
import { CubeTimerPage } from './Index'
import { PomodoroPage } from './Pomodoro'
import { TasksPage } from './Tasks'
import { CalendarSwipe } from '../../../CalendarSwipe'

@Entry
@Component
struct MainTabs {
  @State private currentIndex: number = 0
  @State private isAnimating: boolean = false
  @State private offsetX: number = 0
  @State private startX: number = 0
  
  private tabs: string[] = ['魔方计时器', '番茄时钟', '待办', '日历']
  private tabWidth: number = 0
  private screenWidth: number = 0

  aboutToAppear() {
    this.screenWidth = display.getDefaultDisplaySync().width
    this.tabWidth = this.screenWidth
  }

  // 手势处理
  private onTouchStart(event: any) {
    if (this.isAnimating) return
    this.startX = event.offsetX
  }

  private onTouchMove(event: any) {
    if (this.isAnimating) return
    this.offsetX = event.offsetX - this.startX
  }

  private onTouchEnd(event: any) {
    if (this.isAnimating) return
    
    const threshold = this.screenWidth * 0.2
    
    if (Math.abs(this.offsetX) > threshold) {
      if (this.offsetX > 0 && this.currentIndex > 0) {
        // 向右滑动，切换到上一个页面
        this.switchTab(this.currentIndex - 1)
      } else if (this.offsetX < 0 && this.currentIndex < this.tabs.length - 1) {
        // 向左滑动，切换到下一个页面
        this.switchTab(this.currentIndex + 1)
      } else {
        // 边界回弹
        this.resetOffset()
      }
    } else {
      // 回弹到当前页面
      this.resetOffset()
    }
  }

  private switchTab(index: number) {
    if (index < 0 || index >= this.tabs.length || this.isAnimating) return
    
    this.isAnimating = true
    this.currentIndex = index
    
    animateToImmediately({
      duration: 300,
      curve: Curve.EaseInOut,
      onFinish: () => {
        this.isAnimating = false
        this.offsetX = 0
      }
    }, () => {
      this.offsetX = 0
    })
  }

  private resetOffset() {
    animateToImmediately({
      duration: 200,
      curve: Curve.EaseOut
    }, () => {
      this.offsetX = 0
    })
  }

  // 计算页面偏移量
  private getPageOffset(index: number): number {
    return (index - this.currentIndex) * this.screenWidth + this.offsetX
  }

  // 计算指示器位置
  private getIndicatorOffset(): number {
    return (this.currentIndex * (this.screenWidth / this.tabs.length)) + 
           (this.offsetX / this.tabs.length)
  }

  build() {
    Stack() {
      // 页面内容区域
      Stack() {
        // 魔方计时器页面
        Stack() {
          CubeTimerPage()
        }
        .width('100%')
        .height('100%')
        .translate({ x: this.getPageOffset(0) })
        .animation({ duration: 0 })

        // 番茄时钟页面
        Stack() {
          PomodoroPage()
        }
        .width('100%')
        .height('100%')
        .translate({ x: this.getPageOffset(1) })
        .animation({ duration: 0 })

        // 待办页面
        Stack() {
          TasksPage()
        }
        .width('100%')
        .height('100%')
        .translate({ x: this.getPageOffset(2) })
        .animation({ duration: 0 })

        // 日历页面（带滑动功能）
        Stack() {
          CalendarSwipe()
        }
        .width('100%')
        .height('100%')
        .translate({ x: this.getPageOffset(3) })
        .animation({ duration: 0 })
      }
      .width('100%')
      .height('100%')
      .gesture(
        PanGesture()
          .onActionStart((event: any) => {
            this.onTouchStart(event)
          })
          .onActionUpdate((event: any) => {
            this.onTouchMove(event)
          })
          .onActionEnd((event: any) => {
            this.onTouchEnd(event)
          })
      )

      // 顶部标签栏
      Column() {
        Row() {
          ForEach(this.tabs, (tab: string, index: number) => {
            Text(tab)
              .fontSize(16)
              .fontWeight(this.currentIndex === index ? FontWeight.Bold : FontWeight.Normal)
              .fontColor(this.currentIndex === index ? '#6366F1' : '#6B7280')
              .onClick(() => {
                this.switchTab(index)
              })
              .layoutWeight(1)
              .textAlign(TextAlign.Center)
          })
        }
        .width('100%')
        .height(48)
        .padding({ top: 8 })
        .backgroundColor('#FFFFFF')

        // 指示器
        Row() {
          Column()
            .width(`${100 / this.tabs.length}%`)
            .height(2)
            .backgroundColor('#6366F1')
            .translate({ x: this.getIndicatorOffset() })
            .animation({ duration: 300, curve: Curve.EaseInOut })
        }
        .width('100%')
        .height(2)
      }
      .width('100%')
      .position({ top: 0 })
      .zIndex(100)

      // 设置按钮
      Image($r('app.media.ic_settings'))
        .width(24)
        .height(24)
        .fillColor('#6366F1')
        .position({ top: 60, right: 16 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/Settings' })
        })
        .zIndex(101)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F3F4F6')
  }
}