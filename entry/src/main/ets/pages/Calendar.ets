import { router } from '@kit.ArkUI'

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
  @State titleOpacity: number = 1
  @State titleScale: number = 1
  @State calendarOpacity: number = 1
  @State calendarScale: number = 1
  @State eventsOpacity: number = 1
  @State eventsScale: number = 1

  aboutToAppear() {
    // 页面初始化
  }

  build() {
    Column() {
      // 统一标题栏设计
      Row() {
        Text('日历')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
          .layoutWeight(1)

        Text('←')
          .fontSize(24)
          .fontColor(Color.White)
          .onClick(() => {
            router.back()
          })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#6366F1')
      .justifyContent(FlexAlign.SpaceBetween)
      .alignItems(VerticalAlign.Center)
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