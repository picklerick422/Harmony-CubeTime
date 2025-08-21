import { navigationManager, TransitionType } from '../utils/NavigationManager';

class OptionItem {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

class SettingsItem {
  key: string;
  title: string;
  description: string;
  type: string;
  options: OptionItem[];
  value: string;

  constructor(
    key: string,
    title: string,
    description: string,
    type: string,
    options: OptionItem[],
    value: string
  ) {
    this.key = key;
    this.title = title;
    this.description = description;
    this.type = type;
    this.options = options;
    this.value = value;
  }
}

@Entry
@Component
struct SettingsPage {
  buttonOpacity: number = 1
  buttonScale: number = 1
  timerOpacity: number = 1
  timerScale: number = 1
  navOpacity: number = 1
  navScale: number = 1

  @State titleScale: number = 0.8
  @State titleOpacity: number = 0
  @State cardScale: number = 0.9
  @State cardOpacity: number = 0
  @State itemScale: number = 0.8
  @State itemOpacity: number = 0

  @State settingsItems: SettingsItem[] = [
    new SettingsItem(
      'theme',
      '主题模式',
      '选择应用的主题颜色',
      'select',
      [
        new OptionItem('light', '浅色'),
        new OptionItem('dark', '深色'),
        new OptionItem('auto', '跟随系统')
      ],
      'light'
    ),
    new SettingsItem(
      'pomodoro_duration',
      '番茄钟时长',
      '设置一个番茄钟的时间长度',
      'select',
      [
        new OptionItem('15', '15分钟'),
        new OptionItem('25', '25分钟'),
        new OptionItem('30', '30分钟'),
        new OptionItem('45', '45分钟')
      ],
      '25'
    ),
    new SettingsItem(
      'short_break',
      '短休息时长',
      '设置短休息的时间长度',
      'select',
      [
        new OptionItem('3', '3分钟'),
        new OptionItem('5', '5分钟'),
        new OptionItem('10', '10分钟')
      ],
      '5'
    ),
    new SettingsItem(
      'long_break',
      '长休息时长',
      '设置长休息的时间长度',
      'select',
      [
        new OptionItem('15', '15分钟'),
        new OptionItem('20', '20分钟'),
        new OptionItem('30', '30分钟')
      ],
      '15'
    ),
    new SettingsItem(
      'notifications',
      '通知提醒',
      '开启或关闭通知提醒',
      'toggle',
      [],
      'true'
    ),
    new SettingsItem(
      'sound',
      '提示音',
      '开启或关闭提示音',
      'toggle',
      [],
      'true'
    )
  ];

  private updateSetting(key: string, value: string): void {
    const itemIndex = this.settingsItems.findIndex(item => item.key === key);
    if (itemIndex !== -1) {
      this.settingsItems[itemIndex].value = value;
    }
  }

  // 页面切换动画 - 底部导航条保持不动
  private animateTransition(callback: () => void): void {
    animateTo({ 
      duration: 400, 
      curve: Curve.Friction,
      onFinish: callback
    }, () => {
      // 导航条保持不动，只隐藏其他元素
      this.titleOpacity = 0
      this.titleScale = 0.3
      this.itemOpacity = 0
      this.itemScale = 0.3
      this.cardOpacity = 0
      this.cardScale = 0.3
      // 导航条保持可见和原始大小
      this.navOpacity = 1
      this.navScale = 1
    })
  }

  // 页面入场动画 - 只在页面加载时触发
  private animateIn(): void {
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
      this.cardScale = 1
      this.cardOpacity = 1
    })
    
    animateTo({ duration: 600, curve: Curve.EaseOut, delay: 300 }, () => {
      this.itemScale = 1
      this.itemOpacity = 1
    })
  }

  aboutToAppear(): void {
    // 首次进入时直接执行动画，不重置状态
    this.animateIn();
  }

  onPageShow(): void {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility();
    this.animateIn();
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

  // 生成打乱步骤
  private generateScramble(): string {
    const moves = ["R", "U", "F", "L", "D", "B"]
    const modifiers = ["", "'", "2"]
    let scramble = ""
    for (let i = 0; i < 20; i++) {
      scramble += moves[Math.floor(Math.random() * moves.length)] + 
                  modifiers[Math.floor(Math.random() * modifiers.length)] + " "
    }
    return scramble.trim()
  }

  // 加载最佳时间
  private loadBestTime(): number {
    return 0
  }

  build() {
    Column() {
      // 顶部标题
      Row() {
        Text('设置')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .layoutWeight(1)
          .scale({ x: this.titleScale, y: this.titleScale })
          .opacity(this.titleOpacity)

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
              this.itemOpacity = 0;
              this.itemScale = 0.3;
            });
            setTimeout(() => {
              navigationManager.navigateBack();
            }, 300);
          })
      }
      .width('100%')
      .padding(16)

      // 设置列表
      List({ space: 12 }) {
        ForEach(this.settingsItems, (item: SettingsItem) => {
          ListItem() {
            Column() {
              Row() {
                Text(item.title)
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .fontColor('#1F2937')
                  .layoutWeight(1)

                if (item.type === 'toggle') {
                  Toggle({ type: ToggleType.Switch, isOn: item.value === 'true' })
                    .selectedColor('#10B981')
                    .onChange((isOn: boolean) => {
                      this.updateSetting(item.key, isOn ? 'true' : 'false');
                    })
                } else if (item.type === 'select') {
                  Select(item.options)
                    .selected(item.options.findIndex(option => option.value === item.value))
                    .onSelect((index: number) => {
                      this.updateSetting(item.key, item.options[index].value);
                    })
                    .width(100)
                    .height(32)
                    .backgroundColor('#F3F4F6')
                    .borderRadius(8)
                }
              }

              Text(item.description)
                .fontSize(14)
                .fontColor('#6B7280')
                .margin({ top: 4 })
            }
            .width('100%')
            .padding(16)
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .scale({ x: this.itemScale, y: this.itemScale })
            .opacity(this.itemOpacity)
          }
        })
      }
      .layoutWeight(1)
      .padding(16)

      // 关于应用
      Column() {
        Text('关于应用')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1F2937')
          .margin({ bottom: 12 })

        Column() {
          Row() {
            Text('版本')
              .fontSize(14)
              .fontColor('#1F2937')
              .layoutWeight(1)
            Text('1.0.0')
              .fontSize(14)
              .fontColor('#6B7280')
          }
          .padding({ bottom: 8 })

          Row() {
            Text('开发者')
              .fontSize(14)
              .fontColor('#1F2937')
              .layoutWeight(1)
            Text('番茄工作法团队')
              .fontSize(14)
              .fontColor('#6B7280')
          }
          .padding({ bottom: 8 })

          Row() {
            Text('联系邮箱')
              .fontSize(14)
              .fontColor('#1F2937')
              .layoutWeight(1)
            Text('support@pomodoro.com')
              .fontSize(14)
              .fontColor('#6B7280')
          }
          .padding({ bottom: 8 })
        }
        .width('100%')
        .padding(16)
        .backgroundColor('#FFFFFF')
        .borderRadius(12)
        .scale({ x: this.cardScale, y: this.cardScale })
        .opacity(this.cardOpacity)
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 16 })

      // 底部导航
      Row() {
        Column() {
          Image($r('app.media.ic_settings'))
            .width(24)
            .height(24)
            .fillColor('#10B981')
          Text('设置')
            .fontSize(12)
            .fontColor('#10B981')
            .margin({ top: 4 })
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)

        Column() {
          Image($r('app.media.ic_pomodoro'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
          Text('番茄时钟')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          // 使用自定义动画序列
          animateTo({ duration: 300, curve: Curve.Friction }, () => {
            this.titleOpacity = 0;
            this.titleScale = 0.3;
            this.cardOpacity = 0;
            this.cardScale = 0.3;
            this.itemOpacity = 0;
            this.itemScale = 0.3;
          });
          setTimeout(() => {
            navigationManager.navigateTo('Pomodoro');
          }, 300);
        })

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
          // 使用自定义动画序列
          animateTo({ duration: 300, curve: Curve.Friction }, () => {
            this.titleOpacity = 0;
            this.titleScale = 0.3;
            this.cardOpacity = 0;
            this.cardScale = 0.3;
            this.itemOpacity = 0;
            this.itemScale = 0.3;
          });
          setTimeout(() => {
            navigationManager.navigateTo('Tasks');
          }, 300);
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
          // 使用自定义动画序列
          animateTo({ duration: 300, curve: Curve.Friction }, () => {
            this.titleOpacity = 0;
            this.titleScale = 0.3;
            this.cardOpacity = 0;
            this.cardScale = 0.3;
            this.itemOpacity = 0;
            this.itemScale = 0.3;
          });
          setTimeout(() => {
            navigationManager.navigateTo('Calendar');
          }, 300);
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
          // 使用自定义返回动画
          animateTo({ duration: 300, curve: Curve.Friction }, () => {
            this.titleOpacity = 0;
            this.titleScale = 0.3;
            this.cardOpacity = 0;
            this.cardScale = 0.3;
            this.itemOpacity = 0;
            this.itemScale = 0.3;
          });
          setTimeout(() => {
            navigationManager.navigateBack();
          }, 300);
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