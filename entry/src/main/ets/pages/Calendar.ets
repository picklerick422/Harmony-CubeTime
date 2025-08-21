import { navigationManager, TransitionType } from '../utils/NavigationManager';

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
struct CalendarPage {
  buttonOpacity: number = 1
  buttonScale: number = 1
  cardOpacity: number = 1
  cardScale: number = 1
  itemOpacity: number = 1
  itemScale: number = 1
  timerOpacity: number = 1
  timerScale: number = 1
  navOpacity: number = 1
  navScale: number = 1

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
  @State showAddTask: boolean = false;
  @State showAddEvent: boolean = false;
  @State newTaskTitle: string = '';
  @State newEventTitle: string = '';
  @State newEventTime: string = '';

  @State titleScale: number = 0
  @State titleOpacity: number = 0
  @State calendarScale: number = 0
  @State calendarOpacity: number = 0
  @State taskScale: number = 0
  @State taskOpacity: number = 0

  // 页面入场动画 - 只在页面加载时触发
  private animateIn() {
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
      this.calendarScale = 1
      this.calendarOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 300 }, () => {
      this.taskScale = 1
      this.taskOpacity = 1
    })
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

  // 页面切换动画
  private animateTransition(callback: () => void) {
    animateTo({ 
      duration: 200, 
      curve: Curve.EaseIn,
      onFinish: callback
    }, () => {
      this.titleOpacity = 0
      this.calendarOpacity = 0
      this.taskOpacity = 0
    })
  }

  changeMonth(delta: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    this.currentDate = newDate;
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  toggleTask(taskId: string): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks[index].completed = !this.tasks[index].completed;
    }
  }

  deleteTask(taskId: string): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  deleteEvent(eventId: string): void {
    const index = this.events.findIndex(event => event.id === eventId);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }

  aboutToAppear() {
    this.generateScramble()
    this.loadBestTime()
    // 确保页面返回时重置为可见状态
    this.resetVisibility()
    this.animateIn()
  }

  onPageShow() {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility()
    this.animateIn()
  }

  private resetVisibility(): void {
    // 强制重置所有动画状态为可见
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
      // 顶部标题栏
      Row() {
        Text('日历')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
        
        Blank()
        
        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .fillColor('#6B7280')
          .onClick(() => this.animateTransition(() => navigationManager.navigateBack()))
      }
      .width('100%')
      .padding(16)
      .justifyContent(FlexAlign.SpaceBetween)

      // 月份导航
      Row() {
        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .fillColor('#6B7280')
          .onClick(() => this.changeMonth(-1))

        Text(`${this.currentDate.getFullYear()}年${this.currentDate.getMonth() + 1}月`)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .fontColor('#1F2937')

        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .fillColor('#6B7280')
          .rotate({ angle: 180 })
          .onClick(() => this.changeMonth(1))
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 12 })
      .justifyContent(FlexAlign.SpaceBetween)
      .alignItems(VerticalAlign.Center)

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
            
            Button('添加')
              .fontSize(12)
              .fontColor('#FFFFFF')
              .backgroundColor('#10B981')
              .borderRadius(8)
              .padding({ left: 8, right: 8, top: 4, bottom: 4 })
              .onClick(() => this.showAddTask = true)
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

                  Button('删除')
                    .fontSize(10)
                    .fontColor('#FFFFFF')
                    .backgroundColor('#EF4444')
                    .borderRadius(6)
                    .padding({ left: 6, right: 6, top: 2, bottom: 2 })
                    .onClick(() => this.deleteTask(task.id))
                }
                .width('100%')
                .alignItems(VerticalAlign.Center)
              }
            })
          }
          .height(120)
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
            
            Button('添加')
              .fontSize(12)
              .fontColor('#FFFFFF')
              .backgroundColor('#10B981')
              .borderRadius(8)
              .padding({ left: 8, right: 8, top: 4, bottom: 4 })
              .onClick(() => this.showAddEvent = true)
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

                  Button('删除')
                    .fontSize(10)
                    .fontColor('#FFFFFF')
                    .backgroundColor('#EF4444')
                    .borderRadius(6)
                    .padding({ left: 6, right: 6, top: 2, bottom: 2 })
                    .onClick(() => this.deleteEvent(event.id))
                }
                .width('100%')
                .alignItems(VerticalAlign.Center)
              }
            })
          }
          .height(120)
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 12 })
      }
      .width('100%')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F9FAFB')
  }

  // 生成打乱步骤
  private generateScramble(): string {
    const moves = ["R", "U", "F", "L", "D", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    for (let i = 0; i < 20; i++) {
      scramble += moves[Math.floor(Math.random() * moves.length)] + 
                  modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
    }
    return scramble.trim();
  }

  // 加载最佳时间
  private loadBestTime(): number {
    return 0;
  }

}