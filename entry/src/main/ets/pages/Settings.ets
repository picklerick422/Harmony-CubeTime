import router from '@ohos.router';

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

  private updateSetting(key: string, value: string) {
    const itemIndex = this.settingsItems.findIndex(item => item.key === key);
    if (itemIndex !== -1) {
      this.settingsItems[itemIndex].value = value;
    }
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

        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .fillColor('#6B7280')
          .onClick(() => {
            router.back();
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
          router.pushUrl({ url: 'pages/Pomodoro' });
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
          router.pushUrl({ url: 'pages/Tasks' });
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
          router.pushUrl({ url: 'pages/Calendar' });
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
          router.back();
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