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
  @State translateX: number = 0
  @State isAnimating: boolean = false
  @State gestureOffsetX: number = 0
  
  // 日期点击动画
  @State selectedDateAnim: number = 1

  aboutToAppear() {
    this.animateIn()
  }

  private animateIn() {
    // 标题动画
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
    animateTo({ duration: 200 }, () => {
      this.titleOpacity = 0
      this.titleScale = 0.9
    })
    
    setTimeout(() => {
      animateTo({ duration: 200 }, () => {
        this.calendarOpacity = 0
        this.calendarScale = 0.9
      })
    }, 100)

    setTimeout(() => {
      animateTo({ duration: 200 }, () => {
        this.eventsOpacity = 0
        this.eventsScale = 0.9
      })
    }, 200)

    setTimeout(() => {
      if (targetUrl) {
        transitionManager.navigateTo(targetUrl)
      } else {
        transitionManager.navigateTo('pages/Index')
      }
    }, 400)
  }

  // 跟手滑动
  private handleSwipe(event: TouchEvent) {
    if (this.isAnimating) return

    if (event.type === TouchType.Down) {
      this.gestureOffsetX = 0
    } else if (event.type === TouchType.Move) {
      this.gestureOffsetX = event.touches[0].x - event.touches[0].windowX
      const offset = this.gestureOffsetX * 0.5
      this.translateX = Math.max(-100, Math.min(100, offset))
    } else if (event.type === TouchType.Up) {
      const threshold = 50
      if (Math.abs(this.gestureOffsetX) > threshold) {
        const direction = this.gestureOffsetX > 0 ? 1 : -1
        this.changeMonth(direction)
      } else {
        // 回弹
        animateTo({ duration: 200 }, () => {
          this.translateX = 0
        })
      }
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
        
        this.translateX = -direction * screenWidth
        animateTo({
          duration: 300,
          curve: Curve.EaseInOut,
          onFinish: () => {
            this.isAnimating = false
          }
        }, () => {
          this.translateX = 0
        })
      }
    }, () => {
      this.translateX = direction * screenWidth
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
    return `${date.getFullYear()}年 ${months[date.getMonth()]}`
  }

  private formatDate(date: Date): string {
    return `${date.getMonth() + 1}月${date.getDate()}日`
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
      // 顶部标题栏
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
        ForEach(['日', '一', '二', '三', '四', '五', '六'], (day: string) => {
          Text(day)
            .fontSize(14)
            .fontColor('#6B7280')
            .width('14%')
            .textAlign(TextAlign.Center)
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 8 })

      // 日历网格
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
      .translate({ x: this.translateX })
      .opacity(this.calendarOpacity)
      .scale({ x: this.calendarScale, y: this.calendarScale })
      .touchable(true)
      .onTouch((event: TouchEvent) => this.handleSwipe(event))

      // 事件列表
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
        }
        .margin({ left: 16, right: 16, bottom: 32 })
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F3F4F6')
  }
}