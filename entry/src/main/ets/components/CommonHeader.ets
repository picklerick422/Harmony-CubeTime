import { promptAction } from '@kit.ArkUI'

@Component
export struct CommonHeader {
  @Prop title: string
  @Prop showBack: boolean = false
  
  build() {
    Row() {
      if (this.showBack) {
        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .fillColor(Color.White)
          .onClick(() => {
            promptAction.showToast({ message: '返回' })
          })
          .margin({ right: 12 })
      }
      
      Text(this.title)
        .fontSize(20)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .layoutWeight(1)
        .textAlign(TextAlign.Center)
        
      if (!this.showBack) {
        Blank()
          .width(36)
      }
    }
    .width('100%')
    .height(56)
    .backgroundColor('#6366F1')
    .padding({ left: 16, right: 16 })
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])
  }
}