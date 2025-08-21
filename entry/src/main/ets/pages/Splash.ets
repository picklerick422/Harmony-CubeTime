import { navigationManager, TransitionType } from '../utils/NavigationManager'

@Entry
@Component
struct SplashPage {
  private timer: number = 0

  aboutToAppear() {
    // 3秒后跳转到首页，使用淡入淡出效果
    this.timer = setTimeout(() => {
      animateTo({
        duration: 500,
        curve: Curve.EaseInOut,
        onFinish: () => {
          navigationManager.replaceTo('Index', TransitionType.FADE)
        }
      }, () => {
        // 淡出动画
      })
    }, 3000)
  }

  aboutToDisappear() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  build() {
    Column() {
      // 应用图标
      Image($r('app.media.cube_icon'))
        .width(100)
        .height(100)
        .borderRadius(20)
        .shadow({
          radius: 20,
          color: '#6366F133',
          offsetX: 0,
          offsetY: 10
        })

      // 应用名称
      Text('CubeTime')
        .fontSize(32)
        .fontWeight(FontWeight.Bold)
        .fontColor('#1F2937')
        .margin({ top: 24 })

      // 副标题
      Text('智能时间管理')
        .fontSize(16)
        .fontColor('#6B7280')
        .margin({ top: 8 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
    .justifyContent(FlexAlign.Center)
  }
}