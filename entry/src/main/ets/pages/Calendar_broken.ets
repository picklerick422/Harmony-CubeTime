import router from '@ohos.router'
import { transitionManager } from '../utils/PageTransitionManager'

interface CalendarEvent {
  id: string
  title: string
  date: Date
  completed: boolean
}

@Entry
@Component
struct CalendarPage {
  @State events: CalendarEvent[] = [
    { id: '1', title: '项目会议', date: new Date(), completed: false },
    { id: '2', title: '代码审查', date: new Date(Date.now() + 86400000), completed: true },
    { id: '3', title: '产品演示', date: new Date(Date.now() + 172800000), completed: false }
  ]
  @State selectedDate: Date = new Date()
  @State currentMonth: Date = new Date()
  
  // 动画状态变量
  @State titleOpacity: number = 0
  @State titleScale: number = 0.8
  @State calendarOpacity: number = 0
  @State calendarScale: number = 0.8
  @State eventsOpacity: number = 0
  @State eventsScale: number = 0.8
  
  // 滑动相关
  @State calendarTranslateX: number = 0
  @State eventsTranslateX: number = 0
  @State isAnimating: boolean = false
  @State gestureOffsetX: number = 0
  @State gestureType: 'calendar' | 'events' | null = null
  
  // 日期点击动画
  @State selectedDateAnim: number = 1

  aboutToAppear() {
    this.animateIn()
    // 注册系统返回键监听
    this.registerBackPress()
  }

  onPageShow() {
    this.animateIn()
  }

  onBackPress(): boolean | void {
    // 系统返回键处理
    this.animateOut()
    return true // 阻止默认返回，由动画完成后处理
  }

  private registerBackPress() {
    // 系统会自动调用onBackPress，无需额外注册
  }

  private animateIn() {
    // 标题动画（与状态栏融合）
    animateTo({
      duration: 400,
      curve: Curve.EaseOut,
      delay: 100
    }, () => {
      this.titleOpacity = 1
      this.titleScale = 1
    })

    // 日历动画
    animateTo({
      duration: 500,
      curve: Curve.EaseOut,
      delay: 200
    }, () => {
      this.calendarOpacity = 1
      this.calendarScale = 1
    })

    // 事件列表动画
    animateTo({
      duration: 600,
      curve: Curve.EaseOut,
      delay: 300
    }, () => {
      this.eventsOpacity = 1
      this.eventsScale = 1
    })
  }

  private animateOut(targetUrl?: string) {
    // 退出动画 - 恢复到之前的效果
    interface AnimationItem {
      target: string
      duration: number
      delay: number
      opacity: number
      scale: number
    }

    const exitSequence: AnimationItem[] = [
      { target: 'title', duration: 200, delay: 0, opacity: 0, scale: 0.9 },
      { target: 'calendar', duration: 200, delay: 100, opacity: 0, scale: 0.9 },
      { target: 'events', duration: 200, delay: 200, opacity: 0, scale: 0.9 }
    ]

    exitSequence.forEach((item: AnimationItem) => {
      setTimeout(() => {
        if (item.target === 'title') {
          animateTo({ duration: item.duration, curve: Curve.EaseIn }, () => {
            this.titleOpacity = item.opacity
            this.titleScale = item.scale
          })
        } else if (item.target === 'calendar') {
          animateTo({ duration: item.duration, curve: Curve.EaseIn }, () => {
            this.calendarOpacity = item.opacity
            this.calendarScale = item.scale
          })
        } else if (item.target === 'events') {
          animateTo({ duration: item.duration, curve: Curve.EaseIn }, () => {
            this.eventsOpacity = item.opacity
            this.eventsScale = item.scale
          })
        }
      }, item.delay)
    })

    setTimeout(() => {
      if (targetUrl) {
        transitionManager.navigateTo(targetUrl)
      } else {
        transitionManager.navigateTo('pages/Index')
      }
    }, 450)
  }

  // 日历区域滑动
  private handleCalendarSwipe(event: TouchEvent) {
    if (this.isAnimating) return

    if (event.type === TouchType.Down) {
      this.gestureOffsetX = 0
      this.gestureType = 'calendar'
    } else if (event.type === TouchType.Move && this.gestureType === 'calendar') {
      this.gestureOffsetX = event.touches[0].x - event.touches[0].windowX
      const offset = this.gestureOffsetX * 0.5
      this.calendarTranslateX = Math.max(-100, Math.min(100, offset))
    } else if (event.type === TouchType.Up && this.gestureType === 'calendar') {
      const threshold = 50
      if (Math.abs(this.gestureOffsetX) > threshold) {
        const direction = this.gestureOffsetX > 0 ? 1 : -1
        this.changeMonth(direction)
      } else {
        animateTo({ duration: 200 }, () => {
          this.calendarTranslateX = 0
        })
      }
      this.gestureType = null
    }
  }

  // 事件区域滑动
  private handleEventsSwipe(event: TouchEvent) {
    if (this.isAnimating) return

    if (event.type === TouchType.Down) {
      this.gestureOffsetX = 0
      this.gestureType = 'events'
    } else if (event.type === TouchType.Move && this.gestureType === 'events') {
      this.gestureOffsetX = event.touches[0].x - event.touches[0].windowX
      const offset = this.gestureOffsetX * 0.5
      this.eventsTranslateX = Math.max(-100, Math.min(100, offset))
    } else if (event.type === TouchType.Up && this.gestureType === 'events') {
      const threshold = 50
      if (Math.abs(this.gestureOffsetX) > threshold) {
        const direction = this.gestureOffsetX > 0 ? 1 : -1
        this.changeDate(direction)
      } else {
        animateTo({ duration: 200 }, () => {
          this.eventsTranslateX = 0
        })
      }
      this.gestureType = null
    }
  }

  private changeMonth(direction: number) {
    if (this.isAnimating) return
    this.isAnimating = true

    const screenWidth = 360
    animateTo({
      duration: 300,
      curve: Curve.EaseInOut,
      onFinish: () => {
        if (direction > 0) {
          this.previousMonth()
        } else {
          this.nextMonth()
        }
        
        this.calendarTranslateX = -direction * screenWidth
        animateTo({
          duration: 300,
          curve: Curve.EaseInOut,
          onFinish: () => {
            this.isAnimating = false
          }
        }, () => {
          this.calendarTranslateX = 0
        })
      }
    }, () => {
      this.calendarTranslateX = direction * screenWidth
    })
  }

  private changeDate(direction: number) {
    if (this.isAnimating) return
    this.isAnimating = true

    const screenWidth = 360
    const newDate = new Date(this.selectedDate)
    newDate.setDate(newDate.getDate() + (direction > 0 ? -1 : 1))
    
    // 检查是否需要切换月份
    if (newDate.getMonth() !== this.currentMonth.getMonth()) {
      this.currentMonth = new Date(newDate)
    }
    
    animateTo({
      duration: 300,
      curve: Curve.EaseInOut,
      onFinish: () => {
        this.selectedDate = newDate
        this.eventsTranslateX = -direction * screenWidth
        animateTo({
          duration: 300,
          curve: Curve.EaseInOut,
          onFinish: () => {
            this.isAnimating = false
          }
        }, () => {
          this.eventsTranslateX = 0
        })
      }
    }, () => {
      this.eventsTranslateX = direction * screenWidth
    })
  }

  private selectDate(date: Date) {
    if (this.selectedDate.toDateString() === date.toDateString()) return
    
    this.selectedDate = date
    
    // 日期点击动画
    animateTo({
      duration: 150,
      curve: Curve.EaseOut
    }, () => {
      this.selectedDateAnim = 1.2
    })

    setTimeout(() => {
      animateTo({
        duration: 200,
        curve: Curve.EaseOut
      }, () => {
        this.selectedDateAnim = 1
      })
    }, 150)

    // 事件列表切换动画
    animateTo({ duration: 200 }, () => {
      this.eventsOpacity = 0
    })

    setTimeout(() => {
      animateTo({ duration: 200 }, () => {
        this.eventsOpacity = 1
      })
    }, 200)
  }

  private formatMonth(date: Date): string {
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', 
                   '七月', '八月', '九月', '十月', '十一月', '十二月']
    return `${date.getFullYear()}年 ${months[date.getMonth()]}`.replace('年 ', '年')
  }

  private formatDate(date: Date): string {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]}`
  }

  private isToday(date: Date): boolean {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  private isSelected(date: Date): boolean {
    return date.toDateString() === this.selectedDate.toDateString()
  }

  private getDateColor(date: Date): string | Color {
    if (date.getMonth() !== this.currentMonth.getMonth()) {
      return '#9CA3AF'
    }
    if (this.isSelected(date)) {
      return Color.White
    }
    if (this.isToday(date)) {
      return '#6366F1'
    }
    return '#1F2937'
  }

  private getDateBackground(date: Date): string {
    if (this.isSelected(date)) {
      return '#6366F1'
    }
    if (this.isToday(date)) {
      return '#EEF2FF'
    }
    return 'transparent'
  }

  private generateCalendarDays(): Date[][] {
    const year = this.currentMonth.getFullYear()
    const month = this.currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const weeks: Date[][] = []
    let currentDate = new Date(startDate)
    
    for (let week = 0; week < 6; week++) {
      const weekDays: Date[] = []
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }
      weeks.push(weekDays)
    }
    
    return weeks
  }

  private previousMonth() {
    const newMonth = new Date(this.currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    this.currentMonth = newMonth
  }

  private nextMonth() {
    const newMonth = new Date(this.currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    this.currentMonth = newMonth
  }

  private getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  build() {
    Column() {
      // 顶部标题栏 - 与状态栏融为一体
      Column() {
        Row() {
          Text('日历')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .layoutWeight(1)
            .opacity(this.titleOpacity)
            .scale({ x: this.titleScale, y: this.titleScale })

          Image($r('app.media.ic_back'))
            .width(24)
            .height(24)
            .fillColor(Color.White)
            .onClick(() => {
              this.animateOut()
            })
        }
        .width('100%')
        .height(56)
        .padding({ left: 16, right: 16 })
        .justifyContent(FlexAlign.SpaceBetween)
        .alignItems(VerticalAlign.Center)
      }
      .width('100%')
      .backgroundColor('#6366F1')
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])

      // 月份导航
      Row() {
        Text(this.formatMonth(this.currentMonth))
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')

        Blank()

        Row() {
          Text('‹')
            .fontSize(24)
            .fontColor('#6B7280')
            .onClick(() => this.changeMonth(1))
            .margin({ right: 20 })

          Text('›')
            .fontSize(24)
            .fontColor('#6B7280')
            .onClick(() => this.changeMonth(-1))
        }
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 16, bottom: 8 })

      // 星期标题
      Row() {
        ForEach(['日', '一', '二', '三', '四', '五', '六'] as string[], (day: string) => {
          Text(day)
            .fontSize(14)
            .fontColor('#6B7280')
            .width('14%')
            .textAlign(TextAlign.Center)
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 8 })

      // 日历网格 - 支持左右滑动切换月份
      Column() {
        ForEach(this.generateCalendarDays(), (week: Date[]) => {
          Row() {
            ForEach(week, (date: Date) => {
              Stack() {
                Circle()
                  .width(40)
                  .height(40)
                  .fill(this.getDateBackground(date))
                  .scale({ 
                    x: this.isSelected(date) ? this.selectedDateAnim : 1,
                    y: this.isSelected(date) ? this.selectedDateAnim : 1
                  })
                
                Text(date.getDate().toString())
                  .fontSize(16)
                  .fontColor(this.getDateColor(date))
                  .fontWeight(this.isToday(date) || this.isSelected(date) ? 
                    FontWeight.Bold : FontWeight.Normal)
              }
              .width('14%')
              .height(40)
              .alignContent(Alignment.Center)
              .onClick(() => this.selectDate(date))
            })
          }
          .width('100%')
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16 })
      .translate({ x: this.calendarTranslateX })
      .opacity(this.calendarOpacity)
      .scale({ x: this.calendarScale, y: this.calendarScale })
      .touchable(true)
      .onTouch((event: TouchEvent) => this.handleCalendarSwipe(event))

      // 事件列表 - 支持左右滑动切换日期
      List() {
        ListItem() {
          Column() {
            Text(`今日事件 (${this.formatDate(this.selectedDate)})`)
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
              .margin({ bottom: 12 })

            List() {
              ForEach(this.getEventsForDate(this.selectedDate), (event: CalendarEvent) => {
                ListItem() {
                  Row() {
                    Column() {
                      Text(event.title)
                        .fontSize(16)
                        .fontColor('#1F2937')
                        .margin({ bottom: 4 })
                    }
                    .alignItems(HorizontalAlign.Start)
                    .layoutWeight(1)

                    Circle()
                      .width(12)
                      .height(12)
                      .fill(event.completed ? '#10B981' : '#EF4444')
                  }
                  .width('100%')
                  .padding(16)
                  .backgroundColor('#FFFFFF')
                  .borderRadius(12)
                  .margin({ bottom: 8 })
                }
              })
            }
            .layoutWeight(1)
            .edgeEffect(EdgeEffect.Spring)
            
            if (this.getEventsForDate(this.selectedDate).length === 0) {
              Text('今天没有安排事件')
                .fontSize(14)
                .fontColor('#9CA3AF')
                .margin({ top: 20 })
            }
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .opacity(this.eventsOpacity)
          .scale({ x: this.eventsScale, y: this.eventsScale })
          .translate({ x: this.eventsTranslateX })
        }
        .margin({ left: 16, right: 16, bottom: 32 })
      }
      .layoutWeight(1)
      .touchable(true)
      .onTouch((event: TouchEvent) => this.handleEventsSwipe(event))
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F3F4F6')
  }
}