import router from '@ohos.router'
import { transitionManager } from '../utils/PageTransitionManager'

interface CalendarEvent {
  id: string
  title: string
  date: Date
  completed: boolean
  category?: string
}

@Entry
@Component
struct CalendarPage {
  @State events: CalendarEvent[] = [
    { id: '1', title: '项目会议', date: new Date(), completed: false, category: '工作' },
    { id: '2', title: '代码审查', date: new Date(Date.now() + 86400000), completed: true, category: '工作' },
    { id: '3', title: '产品演示', date: new Date(Date.now() + 172800000), completed: false, category: '会议' },
    { id: '4', title: '健身', date: new Date(), completed: false, category: '个人' }
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
  
  // 滑动动画相关
  @State translateX: number = 0
  @State scaleCalendar: number = 1
  @State opacityCalendar: number = 1
  @State isAnimating: boolean = false
  @State gestureOffsetX: number = 0
  @State isDragging: boolean = false
  
  // 日期点击动画
  @State selectedDateScale: number = 1
  @State selectedDateOpacity: number = 1
  @State dateAnimations: Map<string, DateAnimationState> = new Map()
  
  // 事件列表动画
  @State eventsTranslateY: number = 0
  @State eventsScaleY: number = 1
  @State eventsFadeInProgress: number = 0
  
  private animator?: AnimatorResult

  aboutToAppear() {
    this.resetVisibility()
    setTimeout(() => {
      this.animateIn()
    }, 50)
    this.registerBackPressListener()
  }

  onPageShow(): void {
    this.animateIn()
  }

  onBackPress(): boolean | void {
    this.animateOut()
    return true
  }

  private registerBackPressListener(): void {}

  private resetVisibility(): void {
    this.titleScale = 0.8
    this.titleOpacity = 0
    this.calendarScale = 0.8
    this.calendarOpacity = 0
    this.eventsScale = 0.8
    this.eventsOpacity = 0
    this.eventsTranslateY = 20
    this.eventsScaleY = 0.9
  }

  private animateIn(): void {
    // 标题动画
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut, 
      delay: 100
    }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })

    // 日历网格动画
    animateToImmediately({ 
      duration: 500, 
      curve: Curve.SpringMotion(0.8, 0.8), 
      delay: 200
    }, () => {
      this.calendarScale = 1
      this.calendarOpacity = 1
    })

    // 事件列表动画
    animateToImmediately({ 
      duration: 600, 
      curve: Curve.SpringMotion(0.6, 0.8), 
      delay: 300
    }, () => {
      this.eventsScale = 1
      this.eventsOpacity = 1
      this.eventsTranslateY = 0
      this.eventsScaleY = 1
    })
  }

  private animateOut(targetUrl?: string): void {
    if (targetUrl) {
      const sequence = [
        { duration: 200, delay: 0, target: 'title' },
        { duration: 200, delay: 100, target: 'calendar' },
        { duration: 200, delay: 200, target: 'events' }
      ]
      
      sequence.forEach((item, index) => {
        setTimeout(() => {
          animateToImmediately({ duration: item.duration, curve: Curve.EaseIn }, () => {
            if (item.target === 'title') {
              this.titleScale = 0.9
              this.titleOpacity = 0
            } else if (item.target === 'calendar') {
              this.calendarScale = 0.9
              this.calendarOpacity = 0
            } else if (item.target === 'events') {
              this.eventsScale = 0.9
              this.eventsOpacity = 0
            }
          })
        }, item.delay)
      })
      
      setTimeout(() => {
        transitionManager.navigateTo(targetUrl).catch((err: Error) => {
          console.error('Navigation failed:', err)
        })
      }, 450)
    } else {
      this.animateOut('pages/Index')
    }
  }

  // 跟手滑动处理
  private handleSwipeStart(event: GestureEvent): void {
    if (this.isAnimating) return
    this.isDragging = true
    this.gestureOffsetX = 0
  }

  private handleSwipeMove(event: GestureEvent): void {
    if (!this.isDragging || this.isAnimating) return
    
    this.gestureOffsetX = event.offsetX
    const screenWidth = 360
    const maxOffset = screenWidth * 0.3
    
    // 使用缓动函数
    const easedOffset = this.gestureOffsetX * 0.5
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, easedOffset))
    
    // 实时更新视觉效果
    const progress = Math.abs(limitedOffset) / maxOffset
    this.translateX = limitedOffset
    this.scaleCalendar = 1 - progress * 0.1
    this.opacityCalendar = 1 - progress * 0.2
  }

  private handleSwipeEnd(event: GestureEvent): void {
    if (!this.isDragging || this.isAnimating) return
    this.isDragging = false
    
    const screenWidth = 360
    const threshold = screenWidth * 0.15
    
    if (Math.abs(this.gestureOffsetX) > threshold) {
      const direction = this.gestureOffsetX > 0 ? -1 : 1
      this.animateMonthChange(direction)
    } else {
      this.animateToOrigin()
    }
    
    this.gestureOffsetX = 0
  }

  private animateMonthChange(direction: number): void {
    this.isAnimating = true
    const screenWidth = 360
    
    // 创建流畅的月份切换动画
    const exitAnimation = {
      duration: 300,
      curve: Curve.Friction,
      onFinish: () => {
        // 切换月份数据
        if (direction > 0) {
          this.previousMonth()
        } else {
          this.nextMonth()
        }
        
        // 从另一侧滑入
        this.translateX = direction > 0 ? screenWidth : -screenWidth
        this.scaleCalendar = 0.85
        this.opacityCalendar = 0.3
        
        animateTo({
          duration: 350,
          curve: Curve.SpringMotion(0.7, 0.8),
          onFinish: () => {
            this.isAnimating = false
          }
        }, () => {
          this.translateX = 0
          this.scaleCalendar = 1
          this.opacityCalendar = 1
        })
      }
    }
    
    animateTo(exitAnimation, () => {
      this.translateX = direction > 0 ? -screenWidth : screenWidth
      this.scaleCalendar = 0.85
      this.opacityCalendar = 0.3
    })
  }

  private animateToOrigin(): void {
    animateTo({
      duration: 200,
      curve: Curve.SpringMotion(0.8, 0.8),
      onFinish: () => {
        this.isDragging = false
      }
    }, () => {
      this.translateX = 0
      this.scaleCalendar = 1
      this.opacityCalendar = 1
    })
  }

  // 月份导航按钮动画
  private animateMonthButton(direction: number): void {
    if (this.isAnimating) return
    this.animateMonthChange(direction)
  }

  // 日期点击动画
  private animateDateClick(date: Date, isSelected: boolean): void {
    const dateKey = date.toDateString()
    
    // 创建点击波纹效果
    animateTo({
      duration: 150,
      curve: Curve.EaseOut
    }, () => {
      this.selectedDateScale = isSelected ? 1.2 : 1
    })
    
    setTimeout(() => {
      animateTo({
        duration: 200,
        curve: Curve.SpringMotion(0.6, 0.8)
      }, () => {
        this.selectedDateScale = 1
      })
    }, 150)
  }

  // 事件列表切换动画
  private animateEventsChange(): void {
    // 淡出当前事件
    animateTo({
      duration: 200,
      curve: Curve.EaseOut
    }, () => {
      this.eventsOpacity = 0
      this.eventsTranslateY = -10
      this.eventsScaleY = 0.95
    })
    
    setTimeout(() => {
      // 淡入新事件
      animateTo({
        duration: 300,
        curve: Curve.SpringMotion(0.7, 0.8)
      }, () => {
        this.eventsOpacity = 1
        this.eventsTranslateY = 0
        this.eventsScaleY = 1
      })
    }, 200)
  }

  private selectDate(date: Date): void {
    const wasSelected = this.selectedDate.toDateString() === date.toDateString()
    this.selectedDate = date
    
    // 触发动画序列
    this.animateDateClick(date, !wasSelected)
    this.animateEventsChange()
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

  private getDateFontWeight(date: Date): FontWeight {
    if (this.isToday(date) || this.isSelected(date)) {
      return FontWeight.Bold
    }
    return FontWeight.Normal
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

  private getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  private getEventCategoryColor(category: string): string {
    const colors = {
      '工作': '#EF4444',
      '会议': '#F59E0B',
      '个人': '#10B981',
      '默认': '#6366F1'
    }
    return colors[category as keyof typeof colors] || colors['默认']
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
            .scale({ x: this.titleScale, y: this.titleScale })
            .opacity(this.titleOpacity)

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

      // 月份导航 - 添加按钮动画
      Row() {
        Text(this.formatMonth(this.currentMonth))
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')

        Blank()

        Row() {
          // 上一月按钮
          Stack() {
            Circle()
              .width(36)
              .height(36)
              .fill('#F3F4F6')
              .scale({ x: this.isAnimating ? 0.9 : 1 })
            
            Text('‹')
              .fontSize(20)
              .fontColor('#6B7280')
              .fontWeight(FontWeight.Bold)
          }
          .width(36)
          .height(36)
          .onClick(() => {
            this.animateMonthButton(1)
          })
          .margin({ right: 12 })

          // 下一月按钮
          Stack() {
            Circle()
              .width(36)
              .height(36)
              .fill('#F3F4F6')
              .scale({ x: this.isAnimating ? 0.9 : 1 })
            
            Text('›')
              .fontSize(20)
              .fontColor('#6B7280')
              .fontWeight(FontWeight.Bold)
          }
          .width(36)
          .height(36)
          .onClick(() => {
            this.animateMonthButton(-1)
          })
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

      // 日历网格 - 支持跟手滑动
      Stack() {
        Column() {
          ForEach(this.generateCalendarDays(), (week: Date[], weekIndex: number) => {
            Row() {
              ForEach(week, (date: Date, dayIndex: number) => {
                Stack() {
                  // 日期背景
                  Circle()
                    .width(40)
                    .height(40)
                    .fill(this.getDateBackground(date))
                    .scale({ 
                      x: this.isSelected(date) ? this.selectedDateScale : 1,
                      y: this.isSelected(date) ? this.selectedDateScale : 1
                    })
                  
                  // 日期数字
                  Text(date.getDate().toString())
                    .fontSize(16)
                    .fontColor(this.getDateColor(date))
                    .fontWeight(this.getDateFontWeight(date))
                    .textAlign(TextAlign.Center)
                }
                .width('14%')
                .height(40)
                .alignContent(Alignment.Center)
                .onClick(() => {
                  this.selectDate(date)
                })
              })
            }
            .width('100%')
            .margin({ bottom: 4 })
          })
        }
        .width('100%')
        .padding({ left: 16, right: 16 })
        .translate({ x: this.translateX })
        .scale({ x: this.scaleCalendar, y: this.scaleCalendar })
        .opacity(this.opacityCalendar)
      }
      .width('100%')
      .gesture(
        PanGesture()
          .onActionStart((event) => this.handleSwipeStart(event))
          .onActionUpdate((event) => this.handleSwipeMove(event))
          .onActionEnd((event) => this.handleSwipeEnd(event))
      )

      // 事件列表 - 带动画效果
      List() {
        ListItem() {
          Column() {
            Row() {
              Text('今日事件')
                .fontSize(18)
                .fontWeight(FontWeight.Bold)
                .fontColor('#1F2937')
              
              Text(this.formatDate(this.selectedDate))
                .fontSize(14)
                .fontColor('#6B7280')
                .margin({ left: 8 })
            }
            .width('100%')
            .margin({ bottom: 12 })

            List() {
              ForEach(this.getEventsForDate(this.selectedDate), (event: CalendarEvent, index: number) => {
                ListItem() {
                  Row() {
                    // 事件类别标识
                    Circle()
                      .width(12)
                      .height(12)
                      .fill(this.getEventCategoryColor(event.category || '默认'))
                      .margin({ right: 12 })
                    
                    Column() {
                      Text(event.title)
                        .fontSize(16)
                        .fontColor('#1F2937')
                        .fontWeight(FontWeight.Medium)
                        .margin({ bottom: 2 })
                      
                      Text(event.category || '未分类')
                        .fontSize(12)
                        .fontColor('#6B7280')
                    }
                    .alignItems(HorizontalAlign.Start)
                    .layoutWeight(1)

                    Circle()
                      .width(8)
                      .height(8)
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
            .scrollBar(BarState.Off)
            
            if (this.getEventsForDate(this.selectedDate).length === 0) {
              Column() {
                Image($r('app.media.ic_calendar'))
                  .width(48)
                  .height(48)
                  .fillColor('#9CA3AF')
                  .opacity(0.5)
                  .margin({ bottom: 8 })
                
                Text('今天没有安排事件')
                  .fontSize(14)
                  .fontColor('#9CA3AF')
              }
              .width('100%')
              .padding(32)
              .alignItems(HorizontalAlign.Center)
            }
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .translate({ y: this.eventsTranslateY })
          .scale({ x: 1, y: this.eventsScaleY })
          .opacity(this.eventsOpacity)
        }
        .margin({ left: 16, right: 16, bottom: 32 })
      }
      .layoutWeight(1)
      .edgeEffect(EdgeEffect.Spring)
      .scrollBar(BarState.Off)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F3F4F6')
  }
}

interface DateAnimationState {
  scale: number
  opacity: number
  backgroundColor: string
}