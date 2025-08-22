import { router } from '@kit.ArkUI'
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

  // 与设置界面一致的动画状态变量
  @State titleOpacity: number = 0
  @State titleScale: number = 0.8
  @State calendarOpacity: number = 0
  @State calendarScale: number = 0.8
  @State eventsOpacity: number = 0
  @State eventsScale: number = 0.8

  aboutToAppear() {
    // 首次进入时重置状态
    this.resetVisibility();
    // 执行入场动画，添加延迟确保状态重置完成
    setTimeout(() => {
      this.animateIn();
    }, 50);
    // 注册系统返回事件监听
    this.registerBackPressListener();
  }

  onPageShow(): void {
    // 页面重新显示时重置可见性和动画
    //this.resetVisibility();
    this.animateIn();
  }

  onBackPress(): boolean | void {
    // 系统返回时执行退出动画
    this.animateOut();
    return true; // 阻止默认返回行为，由动画完成后处理
  }

  private registerBackPressListener(): void {
    // HarmonyOS会自动调用onBackPress方法
  }

  private resetVisibility(): void {
    // 重置为初始隐藏状态，用于入场动画
    this.titleScale = 0.8
    this.titleOpacity = 0
    this.calendarScale = 0.8
    this.calendarOpacity = 0
    this.eventsScale = 0.8
    this.eventsOpacity = 0
  }

  private animateIn(): void {
    // 标题动画 - 第一个出现
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut, 
      delay: 100
    }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })

    // 日历网格动画 - 第二个出现
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut, 
      delay: 200
    }, () => {
      this.calendarScale = 1
      this.calendarOpacity = 1
    })

    // 事件列表动画 - 最后一个出现
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut, 
      delay: 300
    }, () => {
      this.eventsScale = 1
      this.eventsOpacity = 1
    })
  }

  private animateOut(targetUrl?: string): void {
    if (targetUrl) {
      // 分层退出动画：标题→日历网格→事件列表
      animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
        this.titleScale = 0.9
        this.titleOpacity = 0
      })

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.calendarScale = 0.9
          this.calendarOpacity = 0
        })
      }, 100)

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.eventsScale = 0.9
          this.eventsOpacity = 0
        })
      }, 200)
      
      setTimeout(() => {
        transitionManager.navigateTo(targetUrl).catch((err: Error) => {
          console.error('Navigation failed:', err)
        })
      }, 350)
    } else {
      // 返回首页的退出动画
      animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
        this.titleScale = 0.9
        this.titleOpacity = 0
      })

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.calendarScale = 0.9
          this.calendarOpacity = 0
        })
      }, 100)

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.eventsScale = 0.9
          this.eventsOpacity = 0
        })
      }, 200)
      
      setTimeout(() => {
        transitionManager.navigateTo('pages/Index').catch((err: Error) => {
          console.error('Navigation failed:', err)
        })
      }, 350)
    }
  }

  build() {
    Column() {
      // 顶部标题栏 - 与状态栏融合
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
              this.animateOut();
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

      // 日历头部
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
            .onClick(() => {
              this.previousMonth()
            })

          Text('›')
            .fontSize(24)
            .fontColor('#6B7280')
            .margin({ left: 20 })
            .onClick(() => {
              this.nextMonth()
            })
        }
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 16, bottom: 16 })

      // 日历网格
      Column() {
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
        .padding({ bottom: 12 })

        // 日期网格
        ForEach(this.generateCalendarDays(), (week: Date[]) => {
          Row() {
            ForEach(week, (date: Date) => {
              Column() {
                Text(date.getDate().toString())
                  .fontSize(16)
                  .fontColor(this.getDateColor(date))
                  .fontWeight(this.isToday(date) ? FontWeight.Bold : FontWeight.Normal)
                  .width(40)
                  .height(40)
                  .textAlign(TextAlign.Center)
                  .backgroundColor(this.isToday(date) ? '#6366F1' : 'transparent')
                  .borderRadius(20)
                  .padding(4)
              }
              .width('14%')
              .aspectRatio(1)
              .justifyContent(FlexAlign.Center)
              .onClick(() => {
                this.selectDate(date)
              })
            })
          }
          .width('100%')
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 16, bottom: 16 })
      .backgroundColor('#FFFFFF')
      .borderRadius(12)
      .margin({ left: 16, right: 16, bottom: 16 })
      .scale({ x: this.calendarScale, y: this.calendarScale })
      .opacity(this.calendarOpacity)

      // 事件列表
      Column() {
        Text('今日事件')
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

                  Text(this.formatDate(event.date))
                    .fontSize(12)
                    .fontColor('#6B7280')
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
      }
      .width('100%')
      .padding({ left: 16, right: 16 })
      .scale({ x: this.eventsScale, y: this.eventsScale })
      .opacity(this.eventsOpacity)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F3F4F6')
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

  private getDateColor(date: Date): string | Color {
    const today = new Date()
    if (date.getMonth() !== this.currentMonth.getMonth()) {
      return '#9CA3AF'
    }
    if (this.isToday(date)) {
      return Color.White
    }
    return '#1F2937'
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

  private selectDate(date: Date) {
    this.selectedDate = date
  }

  private getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }
}