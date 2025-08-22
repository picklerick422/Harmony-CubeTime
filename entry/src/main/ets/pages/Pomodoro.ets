import { router } from '@kit.ArkUI'
import { transitionManager } from '../utils/PageTransitionManager'


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
  @State titleScale: number = 0.8;
  @State titleOpacity: number = 0;
  @State cardScale: number = 0.8;
  @State cardOpacity: number = 0;
  @State timerScale: number = 0.8;
  @State timerOpacity: number = 0;
  @State taskScale: number = 0.8;
  @State taskOpacity: number = 0;
  private timer: number = 0;

  aboutToAppear() {
    this.resetVisibility();
    setTimeout(() => {
      this.animateIn();
    }, 50);
    this.startTimer();
  }

  onPageShow() {
    //this.resetVisibility();
    this.animateIn();
  }

  onBackPress(): boolean | void {
    this.animateOut();
    return true;
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
      animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
        this.timerScale = 1.05;
      });
    } else {
      animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
        this.timerScale = 1;
      });
    }
  }

  private resetTimer() {
    this.isRunning = false;
    this.timeLeft = this.isWorkTime ? this.workDuration : this.breakDuration;
    animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
      this.timerScale = 1;
    });
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
    animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
      this.timerScale = 1;
    });
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

  private animateOut(targetUrl?: string): void {
    if (targetUrl) {
      // 分层退出动画：标题→计时器→任务列表
      animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
        this.titleScale = 0.9
        this.titleOpacity = 0
      })

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.cardScale = 0.9
          this.cardOpacity = 0
          this.timerScale = 0.9
          this.timerOpacity = 0
        })
      }, 100)

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.taskScale = 0.9
          this.taskOpacity = 0
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
          this.cardScale = 0.9
          this.cardOpacity = 0
          this.timerScale = 0.9
          this.timerOpacity = 0
        })
      }, 100)

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.taskScale = 0.9
          this.taskOpacity = 0
        })
      }, 200)
      
      setTimeout(() => {
        transitionManager.navigateTo('pages/Index').catch((err: Error) => {
          console.error('Navigation failed:', err)
        })
      }, 350)
    }
  }

  private animateIn(): void {
    animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
      this.titleScale = 1;
      this.titleOpacity = 1;
    });

    animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
      this.cardScale = 1;
      this.cardOpacity = 1;
    });

    animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 300 }, () => {
      this.timerScale = 1;
      this.timerOpacity = 1;
    });

    animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 400 }, () => {
      this.taskScale = 1;
      this.taskOpacity = 1;
    });
  }

  private resetVisibility(): void {
    this.titleScale = 0.8;
    this.titleOpacity = 0;
    this.cardScale = 0.8;
    this.cardOpacity = 0;
    this.timerScale = 0.8;
    this.timerOpacity = 0;
    this.taskScale = 0.8;
    this.taskOpacity = 0;
  }

  build() {
    Column() {
      Column() {
        Row() {
          Text('番茄时钟')
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

      List() {
        ListItem() {
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
            .opacity(this.timerOpacity)
            .scale({ x: this.timerScale, y: this.timerScale })

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
        }

        if (this.currentTask) {
          ListItem() {
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
            .opacity(this.taskOpacity)
            .scale({ x: this.taskScale, y: this.taskScale })
          }
        }

        ListItem() {
          Row({ space: 8 }) {
            TextInput({ placeholder: '添加新任务...', text: this.newTaskTitle })
              .layoutWeight(1)
              .height(40)
              .backgroundColor('#F9FAFB')
              .borderRadius(8)
              .onChange((value: string) => {
                this.newTaskTitle = value;
              })
              .onSubmit(() => {
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
          .opacity(this.taskOpacity)
          .scale({ x: this.taskScale, y: this.taskScale })
        }

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

        ListItem() {
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
          .opacity(this.cardOpacity)
          .scale({ x: this.cardScale, y: this.cardScale })
        }
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F9FAFB')
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
  }
}