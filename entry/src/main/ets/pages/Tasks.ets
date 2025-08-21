import { navigationManager, TransitionType } from '../utils/NavigationManager';

interface Task {
  id: string
  title: string
  completed: boolean
}

@Entry
@Component
struct Tasks {
  @State tasks: Array<Task> = [
    { id: '1', title: '完成项目报告', completed: false },
    { id: '2', title: '学习鸿蒙开发', completed: true },
    { id: '3', title: '锻炼身体', completed: false }
  ]
  @State titleScale: number = 0.8
  @State titleOpacity: number = 0
  @State cardScale: number = 0.9
  @State cardOpacity: number = 0

  aboutToAppear() {
    this.resetVisibility()
    this.animateIn()
  }

  onPageShow() {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility()
    this.animateIn()
  }

  private animateIn() {
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
      this.cardScale = 1
      this.cardOpacity = 1
    })
  }

  // 页面切换动画 - 从小放大的缩放效果
  private animateTransition(callback: () => void) {
    animateTo({ 
      duration: 400, 
      curve: Curve.Friction,
      onFinish: callback
    }, () => {
      // 页面缩小消失效果
      this.titleOpacity = 0
      this.titleScale = 0.3
      this.cardOpacity = 0
      this.cardScale = 0.3
    })
  }

  private resetVisibility() {
    this.titleScale = 1
    this.titleOpacity = 1
    this.cardScale = 1
    this.cardOpacity = 1
  }

  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .fillColor('#6B7280')
          .onClick(() => {
            // 使用自定义返回动画
            animateTo({ duration: 300, curve: Curve.Friction }, () => {
              this.titleOpacity = 0;
              this.titleScale = 0.3;
              this.cardOpacity = 0;
              this.cardScale = 0.3;
            });
            setTimeout(() => {
              navigationManager.navigateBack();
            }, 300);
          })
        
        Text('待办事项')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
          .scale({ x: this.titleScale, y: this.titleScale })
          .opacity(this.titleOpacity)
      }
      .width('100%')
      .padding(16)

      List({ space: 8 }) {
        ForEach(this.tasks, (item: Task) => {
          ListItem() {
            Row() {
              Text(item.title)
                .fontSize(16)
                .layoutWeight(1)
              
              Text(item.completed ? '已完成' : '未完成')
                .fontSize(14)
                .fontColor(item.completed ? '#10B981' : '#EF4444')
            }
            .width('100%')
            .padding(16)
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .scale({ x: this.cardScale, y: this.cardScale })
            .opacity(this.cardOpacity)
          }
        })
      }
      .layoutWeight(1)
      .padding(16)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F2F2F7')
  }
}