import { CubeFace } from '../services/CubeStateManager';

@Component
export struct CubeFaceCard {
  @Prop face: CubeFace
  @Prop isActive: boolean
  private onFaceClick: () => void

  build() {
    Column() {
      Text(this.face.name)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.isActive ? '#FFFFFF' : '#000000')
        .margin({ bottom: 8 })

      Text(`${this.face.angle.x}°, ${this.face.angle.y}°`)
        .fontSize(12)
        .fontColor(this.isActive ? '#FFFFFF' : '#666666')
    }
    .width(120)
    .height(80)
    .backgroundColor(this.isActive ? '#007AFF' : '#F2F2F7')
    .borderRadius(12)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .onClick(() => {
      this.onFaceClick()
    })
    .animation({
      duration: 200,
      curve: Curve.EaseInOut
    })
  }
}