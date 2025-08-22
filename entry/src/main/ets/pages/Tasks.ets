import { router } from '@kit.ArkUI'
import { NavigationManager, NavigationHelper, PageAnimationState } from '../utils/NavigationManager'
import { transitionManager } from '../utils/PageTransitionManager'

interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

interface TasksState {
  tasks: Task[]
  newTaskTitle: string
  showCompleted: boolean
  navigationManager?: NavigationManager
  animationState: PageAnimationState
}

@Entry
@Component
struct Tasks {
  @State state: TasksState = {
    tasks: [
      { id: '1', title: '完成项目报告', completed: false, createdAt: new Date() },
      { id: '2', title: '学习ArkTS开发', completed: true, createdAt: new Date() },
      { id: '3', title: '整理工作笔记', completed: false, createdAt: new Date() }
    ],
    newTaskTitle: '',
    showCompleted: true,
    animationState: {
      contentScale: 0.9,
      contentOpacity: 0,
      titleTranslateY: -20,
      titleOpacity: 0,
      buttonScale: 0.8,
      buttonOpacity: 0,
      listOpacity: 0,
      calendarOpacity: 0,
      sectionOpacity: 0
    }
  }

  aboutToAppear() {
    const navigationManager = NavigationManager.getInstance()
    this.state.navigationManager = navigationManager
    this.state.animationState = navigationManager.getInitialState()
    
    // 页面进入动画
    setTimeout(() => {
      navigationManager.animateIn()
    }, 100)
  }

  build() {
    Column() {
      // 标题区域
      Row() {
        Text('任务管理')
          .fontSize(28)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .scale({ x: this.state.animationState.titleOpacity, y: this.state.animationState.titleOpacity })
          .opacity(this.state.animationState.titleOpacity)
          .translate({ y: this.state.animationState.titleTranslateY })

        Blank()

        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .onClick(() => {
            // 返回首页的退出动画
            animateToImmediately({ duration: 300, curve: Curve.EaseIn }, () => {
              this.state.animationState.contentScale = 0.95
              this.state.animationState.contentOpacity = 0
              this.state.animationState.titleTranslateY = -20
              this.state.animationState.titleOpacity = 0
              this.state.animationState.buttonScale = 0.8
              this.state.animationState.buttonOpacity = 0
              this.state.animationState.listOpacity = 0
            })
            
            setTimeout(() => {
              transitionManager.navigateTo('pages/Index').catch((err: Error) => {
                console.error('Navigation failed:', err)
              })
            }, 300)
          })
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 60, bottom: 20 })

      // 添加任务区域
      Row() {
        TextInput({ placeholder: '添加新任务...', text: this.state.newTaskTitle })
          .width('70%')
          .height(48)
          .backgroundColor('#FFFFFF')
          .borderRadius(24)
          .padding({ left: 16, right: 16 })
          .onChange((value: string) => {
            this.state.newTaskTitle = value
          })

        Button('添加')
          .width('25%')
          .height(48)
          .backgroundColor('#4CAF50')
          .fontColor('#FFFFFF')
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .borderRadius(24)
          .margin({ left: 8 })
          .onClick(() => {
            this.addTask()
          })
          .scale({ x: this.state.animationState.buttonScale, y: this.state.animationState.buttonScale })
          .opacity(this.state.animationState.buttonOpacity)
      }
      .width('100%')
      .padding({ left: 20, right: 20, bottom: 20 })

      // 任务列表
      List() {
        ForEach(this.filteredTasks, (task: Task) => {
          ListItem() {
            Row() {
              Checkbox()
                  .select(task.completed)
                  .onChange((value: boolean) => {
                    this.toggleTask(task.id)
                  })
              .margin({ right: 12 })

              Text(task.title)
                .fontSize(16)
                .fontColor(task.completed ? '#95A5A6' : '#2C3E50')
                .decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None })
                .layoutWeight(1)

              Image($r('app.media.ic_back'))
                .width(20)
                .height(20)
                .fillColor('#E74C3C')
                .onClick(() => {
                  this.deleteTask(task.id)
                })
            }
            .width('100%')
            .padding(16)
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .margin({ bottom: 8 })
          }
        }, (task: Task) => task.id)
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 20, right: 20 })
      .scale({ x: this.state.animationState.listScale, y: this.state.animationState.listScale })
      .opacity(this.state.animationState.listOpacity)

      // 底部控制区域
      Row() {
        Toggle({ type: ToggleType.Switch, isOn: this.state.showCompleted })
          .onChange((value: boolean) => {
            this.state.showCompleted = value
          })

        Text('显示已完成任务')
          .fontSize(14)
          .fontColor('#7F8C8D')
          .margin({ left: 8 })
      }
      .width('100%')
      .padding({ left: 20, right: 20, bottom: 20 })
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F7FA')
    .scale({ x: this.state.animationState.contentScale, y: this.state.animationState.contentScale })
    .opacity(this.state.animationState.contentOpacity)
  }

  get filteredTasks(): Task[] {
    if (this.state.showCompleted) {
      return this.state.tasks
    }
    return this.state.tasks.filter(task => !task.completed)
  }

  private addTask() {
    if (this.state.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: this.state.newTaskTitle.trim(),
        completed: false,
        createdAt: new Date()
      }
      this.state.tasks.push(newTask)
      this.state.newTaskTitle = ''
    }
  }

  private toggleTask(taskId: string) {
    const task = this.state.tasks.find(t => t.id === taskId)
    if (task) {
      task.completed = !task.completed
    }
  }

  private deleteTask(taskId: string) {
    const index = this.state.tasks.findIndex(t => t.id === taskId)
    if (index !== -1) {
      this.state.tasks.splice(index, 1)
    }
  }
}