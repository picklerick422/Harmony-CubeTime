import { router } from '@kit.ArkUI'

interface CalendarTask {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasTasks: boolean;
  hasEvents: boolean;
}

@Component
export struct CalendarSwipe {
  @State currentDate: Date = new Date()
  @State selectedDate: Date = new Date()
  @State tasks: CalendarTask[] = [
    { id: '1', title: '完成项目报告', date: '2024-01-15', completed: false },
    { id: '2', title: '团队会议', date: '2024-01-15', completed: true },
    { id: '3', title: '代码审查', date: '2024-01-16', completed: false },
  ]
  @State events: CalendarEvent[] = [
    { id: '1', title: '产品发布会', date: '2024-01-20', time: '14:00' },
    { id: '2', title: '客户会议', date: '2024-01-18', time: '10:00' },
  ]
  
  // 滑动相关状态
  @State translateX: number = 0
  @State isAnimating: boolean = false
  @State startX: number = 0
  
  // 动画状态
  @State titleScale: number = 0
  @State titleOpacity: number = 0
  @State calendarScale: number = 0.8
  @State calendarOpacity: number = 0
  @State contentScale: number = 0.9
  @State contentOpacity: number = 0

  private screenWidth: number = 0

  aboutToAppear() {
    this.screenWidth = 720 // 默认宽度，实际应用中可通过display获取
    this.animateIn()
  }

  formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  getCalendarDays(date: Date): CalendarDay[] {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: CalendarDay[] = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      
      const dateStr = this.formatDate(currentDate)
      const hasTasks = this.tasks.some(task => task.date === dateStr)
      const hasEvents = this.events.some(event => event.date === dateStr)

      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        hasTasks: hasTasks,
        hasEvents: hasEvents
      })
    }
    return days
  }

  getWeeks(date: Date): CalendarDay[][] {
    const weeks: CalendarDay[][] = []
    const days = this.getCalendarDays(date)
    for (let i = 0; i < 6; i++) {
      weeks.push(days.slice(i * 7, (i + 1) * 7))
    }
    return weeks
  }

  getWeekDays(): string[] {
    return ['日', '一', '二', '三', '四', '五', '六']
  }

  // 手势处理
  private handleSwipeStart(offsetX: number) {
    if (this.isAnimating) return
    this.startX = offsetX
  }

  private handleSwipeMove(offsetX: number) {
    if (this.isAnimating) return
    this.translateX = offsetX - this.startX
  }

  private handleSwipeEnd(offsetX: number) {
    if (this.isAnimating) return
    
    const threshold = this.screenWidth * 0.2
    
    if (Math.abs(this.translateX) > threshold) {
      if (this.translateX > 0) {
        // 向右滑动，显示上个月
        this.changeMonth(-1)
      } else {
        // 向左滑动，显示下个月
        this.changeMonth(1)
      }
    } else {
      // 回弹到当前月份
      this.resetPosition()
    }
  }

  private changeMonth(delta: number) {
    this.isAnimating = true
    
    // 计算新的月份
    const newDate = new Date(this.currentDate)
    newDate.setMonth(newDate.getMonth() + delta)
    
    // 设置滑动方向
    const targetX = delta > 0 ? this.screenWidth : -this.screenWidth
    
    // 执行滑动动画
    animateToImmediately({
      duration: 300,
      curve: Curve.EaseInOut,
      onFinish: () => {
        this.currentDate = newDate
        this.translateX = 0
        this.isAnimating = false
        
        // 重新加载动画
        this.animateContentIn()
      }
    }, () => {
      this.translateX = targetX
    })
  }

  private resetPosition() {
    animateToImmediately({
      duration: 200,
      curve: Curve.EaseOut
    }, () => {
      this.translateX = 0
    })
  }

  // 页面入场动画
  private animateIn() {
    animateToImmediately({ duration: 400, curve: Curve.EaseOut }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })
    
    this.animateContentIn()
  }

  private animateContentIn() {
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut,
      delay: 100
    }, () => {
      this.calendarScale = 1
      this.calendarOpacity = 1
    })
    
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut,
      delay: 200
    }, () => {
      this.contentScale = 1
      this.contentOpacity = 1
    })
  }

  // 月份导航
  private navigateMonth(delta: number) {
    if (this.isAnimating) return
    this.changeMonth(delta)
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .fillColor('#6366F1')
          .onClick(() => {
            router.back()
          })
        
        Text(`${this.currentDate.getFullYear()}年${this.currentDate.getMonth() + 1}月`)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Image($r('app.media.ic_settings'))
          .width(24)
          .height(24)
          .fillColor('#6366F1')
          .onClick(() => {
            router.pushUrl({ url: 'pages/Settings' })
          })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#FFFFFF')
      .scale({ x: this.titleScale, y: this.titleScale })
      .opacity(this.titleOpacity)

      // 月份导航按钮
      Row() {
        Image($r('app.media.ic_chevron_left'))
          .width(24)
          .height(24)
          .fillColor('#6366F1')
          .onClick(() => this.navigateMonth(-1))
        
        Text('今天')
          .fontSize(14)
          .fontColor('#6366F1')
          .padding({ left: 16, right: 16 })
          .onClick(() => {
            this.currentDate = new Date()
            this.selectedDate = new Date()
          })
        
        Image($r('app.media.ic_chevron_right'))
          .width(24)
          .height(24)
          .fillColor('#6366F1')
          .onClick(() => this.navigateMonth(1))
      }
      .width('100%')
      .height(48)
      .justifyContent(FlexAlign.Center)
      .backgroundColor('#FFFFFF')

      // 可滑动区域
      Stack() {
        // 当前月份
        Column() {
          // 星期标题
          Row() {
            ForEach(this.getWeekDays(), (day: string) => {
              Text(day)
                .fontSize(14)
                .fontColor('#6B7280')
                .fontWeight(FontWeight.Medium)
                .layoutWeight(1)
                .textAlign(TextAlign.Center)
            })
          }
          .width('100%')
          .height(32)
          .backgroundColor('#F9FAFB')

          // 日历网格
          Column() {
            ForEach(this.getWeeks(this.currentDate), (week: CalendarDay[]) => {
              Row() {
                ForEach(week, (day: CalendarDay) => {
                  Stack() {
                    Text(day.date.getDate().toString())
                      .fontSize(14)
                      .fontColor(day.isCurrentMonth ? 
                        (day.isToday ? '#FFFFFF' : '#1F2937') : 
                        '#D1D5DB')
                      .fontWeight(day.isToday ? FontWeight.Bold : FontWeight.Normal)
                    
                    if (day.hasTasks || day.hasEvents) {
                      Circle()
                        .width(4)
                        .height(4)
                        .fill(day.hasTasks ? '#EF4444' : '#3B82F6')
                        .position({ bottom: 2 })
                    }
                  }
                  .width('100%')
                  .aspectRatio(1)
                  .backgroundColor(day.isToday ? '#6366F1' : 'transparent')
                  .borderRadius(day.isToday ? 16 : 0)
                  .onClick(() => {
                    if (day.isCurrentMonth) {
                      this.selectedDate = day.date
                    }
                  })
                })
              }
              .width('100%')
            })
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
        }
        .width('100%')
        .translate({ x: this.translateX })
        .scale({ x: this.calendarScale, y: this.calendarScale })
        .opacity(this.calendarOpacity)
      }
      .width('100%')
      .gesture(
        PanGesture()
          .onActionStart((event: any) => {
            this.handleSwipeStart(event.offsetX)
          })
          .onActionUpdate((event: any) => {
            this.handleSwipeMove(event.offsetX)
          })
          .onActionEnd((event: any) => {
            this.handleSwipeEnd(event.offsetX)
          })
      )

      // 选中日期信息
      Column() {
        Text(`选中日期: ${this.formatDate(this.selectedDate)}`)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .margin({ bottom: 12 })
        
        // 这里可以添加任务和事件列表
        Text('滑动切换月份')
          .fontSize(14)
          .fontColor('#6B7280')
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#FFFFFF')
      .margin({ top: 8 })
      .scale({ x: this.contentScale, y: this.contentScale })
      .opacity(this.contentOpacity)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F3F4F6')
  }
}