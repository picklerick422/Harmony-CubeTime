@Component
export struct TimerDisplay {
  @Prop timeLeft: number
  @Prop isRunning: boolean
  @Prop currentMode: string

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
  }

  build() {
    Column() {
      Text(this.currentMode)
        .fontSize(14)
        .fontColor('#666666')
        .margin({ bottom: 8 })

      Text(this.formatTime(this.timeLeft))
        .fontSize(48)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.isRunning ? '#007AFF' : '#000000')
        .fontFamily('HarmonyOS Sans Mono')
    }
    .alignItems(HorizontalAlign.Center)
    .padding({ top: 32, bottom: 32 })
  }
}