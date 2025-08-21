import { navigationManager, TransitionType } from '../utils/NavigationManager';

class OptionItem {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

class Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  estimatedPomodoros: number;

  constructor(
    id: string,
    title: string,
    completed: boolean = false,
    pomodoros: number = 0,
    estimatedPomodoros: number = 1
  ) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.pomodoros = pomodoros;
    this.estimatedPomodoros = estimatedPomodoros;
  }
}

@Entry
@Component
struct PomodoroPage {
  @State timeLeft: number = 25 * 60;
  @State isRunning: boolean = false;
  @State isWorkTime: boolean = true;
  @State workDuration: number = 25 * 60;
  @State breakDuration: number = 5 * 60;
  @State longBreakDuration: number = 15 * 60;
  @State completedPomodoros: number = 0;
  @State currentTask: Task | null = null;
  @State tasks: Task[] = [
    new Task('1', '完成项目报告', false, 0, 3),
    new Task('2', '学习新技术', false, 1, 2),
    new Task('3', '回复邮件', true, 2, 1)
  ];
  @State newTaskTitle: string = '';

  @State titleScale: number = 0.8
  @State titleOpacity: number = 0
  @State cardScale: number = 0.8
  @State cardOpacity: number = 0
  @State timerScale: number = 0.8
  @State timerOpacity: number = 0
  @State taskScale: number = 0.8
  @State taskOpacity: number = 0

  private timer: number = 0;

  aboutToAppear() {
    // 确保页面返回时重置为可见状态
    this.resetVisibility();
    this.animateIn();
    this.startTimer();
  }

  onPageShow() {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility()
    this.animateIn()
  }

  aboutToDisappear() {
    this.clearTimer();
  }

  private startTimer() {
    this.clearTimer();
    this.timer = setInterval(() => {
      if (this.isRunning && this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.isRunning && this.timeLeft === 0) {
        this.handleTimerComplete();
      }
    }, 1000);
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }

  private handleTimerComplete() {
    this.isRunning = false;
    
    if (this.isWorkTime) {
      this.completedPomodoros++;
      if (this.currentTask) {
        this.currentTask.pomodoros++;
      }
      
      if (this.completedPomodoros % 4 === 0) {
        this.timeLeft = this.longBreakDuration;
      } else {
        this.timeLeft = this.breakDuration;
      }
      this.isWorkTime = false;
    } else {
      this.timeLeft = this.workDuration;
      this.isWorkTime = true;
    }
    
    this.startTimer();
  }

  private toggleTimer() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.startTimer();
    }
  }

  private resetTimer() {
    this.isRunning = false;
    this.timeLeft = this.isWorkTime ? this.workDuration : this.breakDuration;
  }

  private skipTimer() {
    this.isRunning = false;
    if (this.isWorkTime) {
      this.timeLeft = this.breakDuration;
      this.isWorkTime = false;
    } else {
      this.timeLeft = this.workDuration;
      this.isWorkTime = true;
    }
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private getProgress(): number {
    const total = this.isWorkTime ? this.workDuration : 
                  (this.completedPomodoros % 4 === 0 ? this.longBreakDuration : this.breakDuration);
    return ((total - this.timeLeft) / total) * 100;
  }

  private addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask = new Task(
        Date.now().toString(),
        this.newTaskTitle.trim(),
        false,
        0,
        1
      );
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }

  private toggleTask(taskId: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    }
  }

  private selectTask(task: Task) {
    this.currentTask = task;
  }

  private deleteTask(taskId: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      if (this.currentTask && this.currentTask.id === taskId) {
        this.currentTask = null;
      }
    }
  }

  private animateTransition(callback: () => void) {
    animateTo({
      duration: 200,
      curve: Curve.EaseIn,
      onFinish: () => {
        callback();
      }
    }, () => {
      this.titleScale = 0.8
      this.titleOpacity = 0
      this.cardScale = 0.8
      this.cardOpacity = 0
      this.timerScale = 0.8
      this.timerOpacity = 0
      this.taskScale = 0.8
      this.taskOpacity = 0
    });
  }

  private animateIn() {
    animateTo({
      duration: 600,
      curve: Curve.EaseOut
    }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
      this.cardScale = 1
      this.cardOpacity = 1
      this.timerScale = 1
      this.timerOpacity = 1
      this.taskScale = 1
      this.taskOpacity = 1
    });
  }

  private resetVisibility() {
    this.titleScale = 1
    this.titleOpacity = 1
    this.cardScale = 1
    this.cardOpacity = 1
    this.timerScale = 1
    this.timerOpacity = 1
    this.taskScale = 1
    this.taskOpacity = 1
  }

  build() {
    Column() {
      // 顶部标题
      Row() {
        Text('番茄时钟')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .layoutWeight(1)
      }
      .width('100%')
      .padding(16)

      // 计时器显示
      Column() {
        Text(this.isWorkTime ? '工作时间' : '休息时间')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor(this.isWorkTime ? '#10B981' : '#F59E0B')
          .margin({ bottom: 16 })

        Stack() {
          Circle()
            .width(200)
            .height(200)
            .fill('#F3F4F6')
            
          Circle()
            .width(200)
            .height(200)
            .fill('#10B981')
            .fillOpacity(0.1)
            .clipShape(new Rect())
            .rotate({ angle: this.getProgress() * 3.6 })
            
          Column() {
            Text(this.formatTime(this.timeLeft))
              .fontSize(48)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1F2937')
            
            if (this.currentTask) {
              Text(this.currentTask.title)
                .fontSize(16)
                .fontColor('#6B7280')
                .margin({ top: 8 })
            }
          }
        }
        .width(200)
        .height(200)
        .margin({ bottom: 32 })

        Row({ space: 16 }) {
          Button(this.isRunning ? '暂停' : '开始')
            .width(100)
            .height(44)
            .backgroundColor('#10B981')
            .fontColor('#FFFFFF')
            .borderRadius(22)
            .onClick(() => this.toggleTimer())

          Button('跳过')
            .width(100)
            .height(44)
            .backgroundColor('#6B7280')
            .fontColor('#FFFFFF')
            .borderRadius(22)
            .onClick(() => this.skipTimer())

          Button('重置')
            .width(100)
            .height(44)
            .backgroundColor('#F59E0B')
            .fontColor('#FFFFFF')
            .borderRadius(22)
            .onClick(() => this.resetTimer())
        }
      }
      .width('100%')
      .padding(32)
      .alignItems(HorizontalAlign.Center)

      // 当前任务
      if (this.currentTask) {
        Column() {
          Text('当前任务')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor('#1F2937')
            .margin({ bottom: 8 })

          Row() {
            Text(this.currentTask.title)
              .fontSize(16)
              .fontColor('#1F2937')
              .layoutWeight(1)

            Text(`${this.currentTask.pomodoros}/${this.currentTask.estimatedPomodoros}`)
              .fontSize(14)
              .fontColor('#6B7280')
          }
          .padding(12)
          .backgroundColor('#FFFFFF')
          .borderRadius(8)
        }
        .width('100%')
        .padding({ left: 16, right: 16, bottom: 16 })
      }

      // 添加任务
      Row({ space: 8 }) {
        TextInput({ placeholder: '添加新任务...', text: this.newTaskTitle })
          .layoutWeight(1)
          .height(40)
          .backgroundColor('#F9FAFB')
          .borderRadius(8)
          .onChange((value: string) => {
            this.newTaskTitle = value;
          })
          .onSubmit((enterKey: EnterKeyType) => {
            this.addTask();
          })

        Button('添加')
          .width(60)
          .height(40)
          .backgroundColor('#10B981')
          .fontColor('#FFFFFF')
          .borderRadius(8)
          .onClick(() => {
            this.addTask();
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 8 })

      // 任务列表
      List({ space: 4 }) {
        ForEach(this.tasks, (task: Task) => {
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

              Row() {
                Button('开始')
                  .width(40)
                  .height(28)
                  .backgroundColor(this.currentTask?.id === task.id ? '#10B981' : '#F3F4F6')
                  .fontColor(this.currentTask?.id === task.id ? '#FFFFFF' : '#1F2937')
                  .fontSize(12)
                  .borderRadius(14)
                  .onClick(() => {
                    this.selectTask(task);
                  })

                Button('删除')
                  .width(40)
                  .height(28)
                  .backgroundColor('#EF4444')
                  .fontColor('#FFFFFF')
                  .fontSize(12)
                  .borderRadius(14)
                  .onClick(() => {
                    this.deleteTask(task.id);
                  })
              }
              .width(90)
              .justifyContent(FlexAlign.SpaceBetween)
            }
            .width('100%')
            .padding(12)
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
          }
        }, (task: Task) => task.id)
      }
      .height(200)
      .padding({ left: 16, right: 16, top: 8 })

      // 设置区域
      Column() {
        Text('计时器设置')
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .fontColor('#1F2937')
          .margin({ bottom: 12 })

        Row() {
          Text('工作时长:')
            .fontSize(14)
            .fontColor('#6B7280')
            .layoutWeight(1)

          Select([
            new OptionItem('15', '15分钟'),
            new OptionItem('25', '25分钟'),
            new OptionItem('30', '30分钟'),
            new OptionItem('45', '45分钟')
          ])
            .selected(Math.floor(this.workDuration / 60) === 25 ? 1 : (
              Math.floor(this.workDuration / 60) === 15 ? 0 : (
                Math.floor(this.workDuration / 60) === 30 ? 2 : 3
              )
            ))
            .onSelect((index: number) => {
              const durations = [15, 25, 30, 45];
              this.workDuration = durations[index] * 60;
              if (this.isWorkTime) {
                this.resetTimer();
              }
            })
            .width(100)
            .height(32)
            .backgroundColor('#F3F4F6')
            .borderRadius(8)
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 8 })

        Row() {
          Text('休息时长:')
            .fontSize(14)
            .fontColor('#6B7280')
            .layoutWeight(1)

          Select([
            new OptionItem('3', '3分钟'),
            new OptionItem('5', '5分钟'),
            new OptionItem('10', '10分钟'),
            new OptionItem('15', '15分钟')
          ])
            .selected(Math.floor(this.breakDuration / 60) === 5 ? 1 : (
              Math.floor(this.breakDuration / 60) === 3 ? 0 : (
                Math.floor(this.breakDuration / 60) === 10 ? 2 : 3
              )
            ))
            .onSelect((index: number) => {
              const durations = [3, 5, 10, 15];
              this.breakDuration = durations[index] * 60;
              if (!this.isWorkTime) {
                this.resetTimer();
              }
            })
            .width(100)
            .height(32)
            .backgroundColor('#F3F4F6')
            .borderRadius(8)
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 8 })
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#FFFFFF')
      .borderRadius(12)
      .margin({ left: 16, right: 16, top: 16 })

      // 底部导航
      Row() {
        Column() {
          Image($r('app.media.ic_pomodoro'))
            .width(24)
            .height(24)
            .fillColor('#10B981')
          Text('番茄时钟')
            .fontSize(12)
            .fontColor('#10B981')
            .margin({ top: 4 })
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)

        Column() {
          Image($r('app.media.ic_tasks'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
          Text('待办')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          navigationManager.navigateTo('Tasks', TransitionType.SLIDE_LEFT);
        })

        Column() {
          Image($r('app.media.ic_calendar'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
          Text('日历')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          navigationManager.navigateTo('Calendar', TransitionType.SLIDE_LEFT);
        })

        Column() {
          Image($r('app.media.ic_settings'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
          Text('设置')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          navigationManager.navigateTo('Settings', TransitionType.SLIDE_LEFT);
        })

        Column() {
          Image($r('app.media.ic_back'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .rotate({ angle: 180 })
          Text('返回')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          this.animateTransition(() => navigationManager.navigateBack());
        })
      }
      .width('100%')
      .padding({ top: 12, bottom: 8 })
      .backgroundColor('#FFFFFF')
      .border({
        width: { top: 1 },
        color: '#E5E7EB'
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F9FAFB')
  }
}