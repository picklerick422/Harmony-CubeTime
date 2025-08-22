import { display } from '@kit.ArkUI';

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

@Entry
@Component
struct CalendarSwipe {
  @State currentDate: Date = new Date();
  @State selectedDate: Date = new Date();
  @State tasks: CalendarTask[] = [
    { id: '1', title: '完成项目报告', date: '2024-01-15', completed: false },
    { id: '2', title: '团队会议', date: '2024-01-15', completed: true },
    { id: '3', title: '代码审查', date: '2024-01-16', completed: false },
  ];
  @State events: CalendarEvent[] = [
    { id: '1', title: '产品发布会', date: '2024-01-20', time: '14:00' },
    { id: '2', title: '客户会议', date: '2024-01-18', time: '10:00' },
  ];
  
  // 滑动相关状态
  @State swipeOffset: number = 0;
  @State isSwiping: boolean = false;
  @State startX: number = 0;
  @State screenWidth: number = 375;
  
  @State titleScale: number = 0;
  @State titleOpacity: number = 0;
  @State calendarScale: number = 0;
  @State calendarOpacity: number = 0;
  @State taskScale: number = 0;
  @State taskOpacity: number = 0;

  aboutToAppear() {
    this.screenWidth = display.getDefaultDisplaySync().width;
    this.animateIn();
  }

  private animateIn() {
    animateTo({ 
      duration: 350, 
      curve: Curve.Friction
    }, () => {
      this.titleScale = 1;
      this.titleOpacity = 1;
    });
    
    animateTo({ 
      duration: 400, 
      curve: Curve.Friction,
      delay: 80
    }, () => {
      this.calendarScale = 1;
      this.calendarOpacity = 1;
    });
    
    animateTo({ 
      duration: 450, 
      curve: Curve.Friction,
      delay: 160
    }, () => {
      this.taskScale = 1;
      this.taskOpacity = 1;
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCalendarDays(): CalendarDay[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateStr = this.formatDate(date);
      const hasTasks = this.tasks.some(task => task.date === dateStr);
      const hasEvents = this.events.some(event => event.date === dateStr);

      days.push({
        date: date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        hasTasks: hasTasks,
        hasEvents: hasEvents
      });
    }

    return days;
  }

  getWeeks(): CalendarDay[][] {
    const weeks: CalendarDay[][] = [];
    const days = this.getCalendarDays();
    for (let i = 0; i < 6; i++) {
      weeks.push(days.slice(i * 7, (i + 1) * 7));
    }
    return weeks;
  }

  getSelectedDateStr(): string {
    return this.formatDate(this.selectedDate);
  }

  getDayTasks(): CalendarTask[] {
    const selectedDateStr = this.getSelectedDateStr();
    return this.tasks.filter(task => task.date === selectedDateStr);
  }

  getDayEvents(): CalendarEvent[] {
    const selectedDateStr = this.getSelectedDateStr();
    return this.events.filter(event => event.date === selectedDateStr);
  }

  getWeekDays(): string[] {
    return ['日', '一', '二', '三', '四', '五', '六'];
  }

  // 滑动手势处理
  private handleSwipeStart(event: any) {
    this.isSwiping = true;
    this.startX = event.offsetX;
  }

  private handleSwipeMove(event: any) {
    if (!this.isSwiping) return;
    this.swipeOffset = event.offsetX - this.startX;
  }

  private handleSwipeEnd(event: any) {
    if (!this.isSwiping) return;
    this.isSwiping = false;
    
    const threshold = this.screenWidth * 0.2;
    
    if (Math.abs(this.swipeOffset) > threshold) {
      if (this.swipeOffset > 0) {
        // 向右滑动，切换到上个月
        this.animateMonthChange(-1);
      } else {
        // 向左滑动，切换到下个月
        this.animateMonthChange(1);
      }
    } else {
      // 回弹动画
      this.animateBack();
    }
  }

  private animateMonthChange(delta: number) {
    animateTo({
      duration: 300,
      curve: Curve.EaseInOut,
      onFinish: () => {
        const newDate = new Date(this.currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        this.currentDate = newDate;
        this.swipeOffset = 0;
        
        // 重新加载动画
        this.calendarScale = 0.8;
        this.calendarOpacity = 0.7;
        animateTo({
          duration: 200,
          curve: Curve.Friction
        }, () => {
          this.calendarScale = 1;
          this.calendarOpacity = 1;
        });
      }
    }, () => {
      this.swipeOffset = delta > 0 ? this.screenWidth : -this.screenWidth;
    });
  }

  private animateBack() {
    animateTo({
      duration: 200,
      curve: Curve.EaseOut
    }, () => {
      this.swipeOffset = 0;
    });
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  build() {
    Column() {
      // 顶部标题和月份切换按钮
      Row() {
        Text(`${this.currentDate.getFullYear()}年${this.currentDate.getMonth() + 1}月`)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .scale({ x: this.titleScale, y: this.titleScale })
          .opacity(this.titleOpacity)
          .animation({ duration: 350, curve: Curve.Friction })

        Row() {
          Button('上个月')
            .fontSize(14)
            .fontColor('#6366F1')
            .backgroundColor('#F3F4F6')
            .borderRadius(8)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .onClick(() => this.animateMonthChange(-1))

          Button('下个月')
            .fontSize(14)
            .fontColor('#6366F1')
            .backgroundColor('#F3F4F6')
            .borderRadius(8)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .onClick(() => this.animateMonthChange(1))
        }
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })
      .justifyContent(FlexAlign.SpaceBetween)
      .alignItems(VerticalAlign.Center)

      // 可滑动的日历区域
      Stack() {
        // 星期标题
        Row() {
          ForEach(this.getWeekDays(), (day: string) => {
            Text(day)
              .fontSize(14)
              .fontColor('#6B7280')
              .layoutWeight(1)
              .textAlign(TextAlign.Center)
          })
        }
        .width('100%')
        .padding({ left: 16, right: 16, bottom: 8 })

        // 日历网格
        Column() {
          ForEach(this.getWeeks(), (week: CalendarDay[]) => {
            Row() {
              ForEach(week, (day: CalendarDay) => {
                Stack() {
                  Column() {
                    Text(day.date.getDate().toString())
                      .fontSize(14)
                      .fontColor(day.isCurrentMonth ? 
                        (day.isToday ? '#FFFFFF' : '#1F2937') : '#9CA3AF')
                      .fontWeight(day.isToday ? FontWeight.Bold : FontWeight.Normal)

                    if (day.hasTasks || day.hasEvents) {
                      Row() {
                        if (day.hasTasks) {
                          Circle()
                            .width(4)
                            .height(4)
                            .fill('#EF4444')
                            .margin({ right: 2 })
                        }
                        if (day.hasEvents) {
                          Circle()
                            .width(4)
                            .height(4)
                            .fill('#10B981')
                        }
                      }
                      .margin({ top: 2 })
                    }
                  }
                  .width(40)
                  .height(40)
                  .borderRadius(20)
                  .backgroundColor(day.isToday ? '#10B981' : 'transparent')
                  .justifyContent(FlexAlign.Center)
                  .alignItems(HorizontalAlign.Center)
                }
                .width(40)
                .height(40)
                .onClick(() => this.selectDate(day.date))
              })
            }
          })
        }
        .width('100%')
        .padding({ left: 16, right: 16 })
        .scale({ x: this.calendarScale, y: this.calendarScale })
        .opacity(this.calendarOpacity)
        .animation({ duration: 400, curve: Curve.Friction, delay: 80 })
        .translate({ x: this.swipeOffset })
        .animation({ duration: 0 })
      }
      .width('100%')
      .gesture(
        PanGesture()
          .onActionStart((event: any) => {
            this.handleSwipeStart(event)
          })
          .onActionUpdate((event: any) => {
            this.handleSwipeMove(event)
          })
          .onActionEnd((event: any) => {
            this.handleSwipeEnd(event)
          })
      )

      // 选中日期详情
      Column() {
        Text(`${this.selectedDate.getMonth() + 1}月${this.selectedDate.getDate()}日`)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .margin({ bottom: 12 })

        // 任务列表
        Column() {
          Row() {
            Text('任务')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('#1F2937')
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .alignItems(VerticalAlign.Center)
          .margin({ bottom: 8 })

          List({ space: 8 }) {
            ForEach(this.getDayTasks(), (task: CalendarTask) => {
              ListItem() {
                Row() {
                  Checkbox()
                    .select(task.completed)
                    .width(20)
                    .height(20)
                    .selectedColor('#10B981')
                    .onChange((value: boolean) => {
                      const index = this.tasks.findIndex(t => t.id === task.id);
                      if (index !== -1) {
                        this.tasks[index].completed = value;
                      }
                    })

                  Text(task.title)
                    .fontSize(14)
                    .fontColor(task.completed ? '#9CA3AF' : '#1F2937')
                    .decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None })
                    .layoutWeight(1)
                    .margin({ left: 8 })
                }
                .width('100%')
                .alignItems(VerticalAlign.Center)
              }
            })
          }
          .height(80)
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 12 })

        // 事件列表
        Column() {
          Row() {
            Text('事件')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('#1F2937')
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .alignItems(VerticalAlign.Center)
          .margin({ bottom: 8 })

          List({ space: 8 }) {
            ForEach(this.getDayEvents(), (event: CalendarEvent) => {
              ListItem() {
                Row() {
                  Text(event.title)
                    .fontSize(14)
                    .fontColor('#1F2937')
                    .layoutWeight(1)

                  Text(event.time)
                    .fontSize(12)
                    .fontColor('#6B7280')
                    .margin({ right: 8 })
                }
                .width('100%')
                .alignItems(VerticalAlign.Center)
              }
            })
          }
          .height(80)
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 12 })
      }
      .width('100%')
      .layoutWeight(1)
      .scale({ x: this.taskScale, y: this.taskScale })
      .opacity(this.taskOpacity)
      .animation({ duration: 450, curve: Curve.Friction, delay: 160 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F9FAFB')
  }
}