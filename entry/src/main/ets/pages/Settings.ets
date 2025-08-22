import { router } from '@kit.ArkUI'
import { transitionManager } from '../utils/PageTransitionManager'
import { NavigationManager, NavigationHelper, PageAnimationState } from '../utils/NavigationManager'


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
  
  // 每个设置项的独立动画状态
  @State itemScales: number[] = [0.8, 0.8, 0.8, 0.8, 0.8, 0.8]
  @State itemOpacities: number[] = [0, 0, 0, 0, 0, 0]
  @State aboutScale: number = 0.9
  @State aboutOpacity: number = 0
  @State bottomNavScale: number = 0.9
  @State bottomNavOpacity: number = 0

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



  // 页面入场动画 - 每个元素依次出现
  private animateIn(): void {
    // 标题动画 - 第1个出现
    animateToImmediately({ duration: 400, curve: Curve.EaseOut }, () => {
      this.titleScale = 1
      this.titleOpacity = 1
    })
    
    // 设置项动画 - 依次出现，每个间隔100ms
    this.settingsItems.forEach((_, index) => {
      animateToImmediately({ 
        duration: 400, 
        curve: Curve.EaseOut, 
        delay: 100 + index * 100 
      }, () => {
        this.itemScales[index] = 1
        this.itemOpacities[index] = 1
      })
    })
    
    // 关于应用卡片 - 倒数第2个出现
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut, 
      delay: 100 + this.settingsItems.length * 100 + 100
    }, () => {
      this.aboutScale = 1
      this.aboutOpacity = 1
    })
    
    // 底部导航 - 最后一个出现
    animateToImmediately({ 
      duration: 400, 
      curve: Curve.EaseOut, 
      delay: 200
    }, () => {
      this.bottomNavScale = 1
      this.bottomNavOpacity = 1
    })
  }

  aboutToAppear(): void {
    // 首次进入时重置状态并执行动画
    this.resetVisibility();
    setTimeout(() => {
      this.animateIn();
    }, 50);
    // 注册系统返回事件监听
    this.registerBackPressListener();
  }

  private animateTransition(duration: number = 250): void {
    this.animateOut()
  }

  onPageShow(): void {
    // 页面重新显示时重置可见性和动画
    this.resetVisibility();
    setTimeout(() => {
      this.animateIn();
    }, 50);
  }

  onBackPress(): boolean | void {
    // 系统返回时执行退出动画
    this.animateOut();
    return true; // 阻止默认返回行为，由动画完成后处理
  }

  private animateOut(targetUrl?: string): void {
    if (targetUrl) {
      // 分层退出动画：标题→设置项→底部内容→导航栏
      animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
        this.titleScale = 0.9
        this.titleOpacity = 0
      })

      // 设置项逐个消失（交错动画）
      this.settingsItems.forEach((_, index) => {
        setTimeout(() => {
          animateToImmediately({ duration: 150, curve: Curve.EaseIn }, () => {
            this.itemScales[index] = 0.85
            this.itemOpacities[index] = 0
          })
        }, 30 * index) // 更密集的延迟
      })

      // 关于应用卡片消失
      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.aboutScale = 0.85
          this.aboutOpacity = 0
        })
      }, 150)

      // 底部导航栏最后消失（模拟边框下沉）
      setTimeout(() => {
        animateToImmediately({ duration: 250, curve: Curve.EaseIn }, () => {
          this.bottomNavScale = 0.8
          this.bottomNavOpacity = 0
        })
      }, 50)
      
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

      // 设置项逐个消失
      this.settingsItems.forEach((_, index) => {
        setTimeout(() => {
          animateToImmediately({ duration: 150, curve: Curve.EaseIn }, () => {
            this.itemScales[index] = 0.85
            this.itemOpacities[index] = 0
          })
        }, 30 * index)
      })

      setTimeout(() => {
        animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
          this.aboutScale = 0.85
          this.aboutOpacity = 0
        })
      }, 150)

      // 底部导航栏消失
      setTimeout(() => {
        animateToImmediately({ duration: 250, curve: Curve.EaseIn }, () => {
          this.bottomNavScale = 0.8
          this.bottomNavOpacity = 0
        })
      }, 50)
      
      setTimeout(() => {
        transitionManager.navigateTo('pages/Index').catch((err: Error) => {
          console.error('Navigation failed:', err)
        })
      }, 350)
    }
  }

  private registerBackPressListener(): void {
    // 注册系统返回事件
    // HarmonyOS会自动调用onBackPress方法
  }

  private resetVisibility(): void {
    // 重置为初始隐藏状态，用于入场动画
    this.titleScale = 0.8
    this.titleOpacity = 0
    this.cardScale = 0.8
    this.cardOpacity = 0
    this.aboutScale = 0.9
    this.aboutOpacity = 0
    this.bottomNavScale = 0.9
    this.bottomNavOpacity = 0
    
    // 重置每个设置项的状态
    this.itemScales = new Array(this.settingsItems.length).fill(0.8)
    this.itemOpacities = new Array(this.settingsItems.length).fill(0)
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
      // 顶部标题栏 - 与状态栏融合
      Column() {
        Row() {
          Text('设置')
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

      // 设置列表 - 添加弹性滑动
      List({ space: 12 }) {
        ForEach(this.settingsItems, (item: SettingsItem, index: number) => {
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
            .scale({ x: this.itemScales[index], y: this.itemScales[index] })
            .opacity(this.itemOpacities[index])
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
            Text('v1.0.0')
              .fontSize(14)
              .fontColor('#6B7280')
          }
          .padding({ bottom: 8 })

          Row() {
            Text('开发者')
              .fontSize(14)
              .fontColor('#1F2937')
              .layoutWeight(1)
            Text('GIthub: picklerick422')
              .fontSize(14)
              .fontColor('#6B7280')
          }
          .padding({ bottom: 8 })

          Row() {
            Text('联系邮箱')
              .fontSize(14)
              .fontColor('#1F2937')
              .layoutWeight(1)
            Text('971711470@qq.com')
              .fontSize(14)
              .fontColor('#6B7280')
          }
          .padding({ bottom: 8 })
        }
        .width('100%')
        .padding(16)
        .backgroundColor('#FFFFFF')
        .borderRadius(12)
        .scale({ x: this.aboutScale, y: this.aboutScale })
        .opacity(this.aboutOpacity)
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 16 })
      //.backgroundColor('#FFFFFF')


      // 底部导航
      Row() {
        Column() {
          Image($r('app.media.ic_settings'))
            .width(24)
            .height(24)
            .fillColor('#10B981')
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
          Text('设置')
            .fontSize(12)
            .fontColor('#10B981')
            .margin({ top: 4 })
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)

        Column() {
          Image($r('app.media.ic_pomodoro'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
          Text('番茄时钟')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          // 快速退出动画 - 所有元素依次消失，跳转到番茄时钟
          this.animateOut('pages/Pomodoro');
        })

        Column() {
          Image($r('app.media.ic_tasks'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
          Text('待办')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          // 快速退出动画 - 所有元素依次消失，跳转到待办
          this.animateOut('pages/Tasks');
        })

        Column() {
          Image($r('app.media.ic_calendar'))
            .width(24)
            .height(24)
            .fillColor('#6B7280')
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
          Text('日历')
            .fontSize(12)
            .fontColor('#6B7280')
            .margin({ top: 4 })
            .scale({ x: this.bottomNavScale, y: this.bottomNavScale })
            .opacity(this.bottomNavOpacity)
        }
        .width('20%')
        .alignItems(HorizontalAlign.Center)
        .onClick(() => {
          // 快速退出动画 - 所有元素依次消失，跳转到日历
          this.animateOut('pages/Calendar');
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
          // 快速返回动画 - 使用统一的animateOut方法
          this.animateOut();
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

interface SettingsState {
  notificationsEnabled: boolean
  soundEnabled: boolean
  vibrationEnabled: boolean
  workDuration: number
  breakDuration: number
  navigationManager?: NavigationManager
  animationState: PageAnimationState
}

/*
@Component
struct Settings {
  @State state: SettingsState = {
    notificationsEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    workDuration: 25,
    breakDuration: 5,
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
        Text('设置')
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
            transitionManager.navigateTo('pages/Index')
          })
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 60, bottom: 20 })

      // 设置内容区域
      Scroll() {
        Column() {
          // 通知设置
          Column() {
            Text('通知设置')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#2C3E50')
              .margin({ bottom: 16 })

            Row() {
              Text('启用通知')
                .fontSize(16)
                .fontColor('#2C3E50')
                .layoutWeight(1)

              Toggle({ type: ToggleType.Switch, isOn: this.state.notificationsEnabled })
                .onChange((value: boolean) => {
                  this.state.notificationsEnabled = value
                })
            }
            .width('100%')
            .padding({ bottom: 12 })

            Row() {
              Text('声音提醒')
                .fontSize(16)
                .fontColor('#2C3E50')
                .layoutWeight(1)

              Toggle({ type: ToggleType.Switch, isOn: this.state.soundEnabled })
                .onChange((value: boolean) => {
                  this.state.soundEnabled = value
                })
            }
            .width('100%')
            .padding({ bottom: 12 })

            Row() {
              Text('振动提醒')
                .fontSize(16)
                .fontColor('#2C3E50')
                .layoutWeight(1)

              Toggle({ type: ToggleType.Switch, isOn: this.state.vibrationEnabled })
                .onChange((value: boolean) => {
                  this.state.vibrationEnabled = value
                })
            }
            .width('100%')
          }
          .width('100%')
          .padding(20)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .margin({ left: 20, right: 20, bottom: 16 })
          .scale({ x: this.state.animationState.sectionScale, y: this.state.animationState.sectionScale })
          .opacity(this.state.animationState.sectionOpacity)

          // 时间设置
          Column() {
            Text('时间设置')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#2C3E50')
              .margin({ bottom: 16 })

            Row() {
              Text('工作时间（分钟）')
                .fontSize(16)
                .fontColor('#2C3E50')
                .layoutWeight(1)

              Text(this.state.workDuration.toString())
                .fontSize(16)
                .fontColor('#7F8C8D')
            }
            .width('100%')
            .padding({ bottom: 12 })

            Row() {
              Text('休息时间（分钟）')
                .fontSize(16)
                .fontColor('#2C3E50')
                .layoutWeight(1)

              Text(this.state.breakDuration.toString())
                .fontSize(16)
                .fontColor('#7F8C8D')
            }
            .width('100%')
            .padding({ bottom: 12 })

            Slider({
              value: this.state.workDuration,
              min: 15,
              max: 60,
              step: 5
            })
              .width('100%')
              .onChange((value: number) => {
                this.state.workDuration = value
              })

            Slider({
              value: this.state.breakDuration,
              min: 5,
              max: 30,
              step: 5
            })
              .width('100%')
              .onChange((value: number) => {
                this.state.breakDuration = value
              })
          }
          .width('100%')
          .padding(20)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .margin({ left: 20, right: 20, bottom: 16 })
          .scale({ x: this.state.animationState.sectionScale, y: this.state.animationState.sectionScale })
          .opacity(this.state.animationState.sectionOpacity)

          // 关于应用
          Column() {
            Text('关于应用')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#2C3E50')
              .margin({ bottom: 16 })

            Row() {
              Text('版本')
                .fontSize(16)
                .fontColor('#2C3E50')
                .layoutWeight(1)

              Text('1.0.0')
                .fontSize(16)
                .fontColor('#7F8C8D')
            }
            .width('100%')
            .padding({ bottom: 12 })

            Row() {
              Text('开发者')
                .fontSize(16)
                .fontColor('#2C3E50')
                .layoutWeight(1)

              Text('鸿蒙团队')
                .fontSize(16)
                .fontColor('#7F8C8D')
            }
            .width('100%')
            .padding({ bottom: 12 })

            Button('重置所有设置')
              .width('100%')
              .height(48)
              .backgroundColor('#E74C3C')
              .fontColor('#FFFFFF')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .borderRadius(24)
              .onClick(() => {
                this.resetSettings()
              })
              .scale({ x: this.state.animationState.buttonScale, y: this.state.animationState.buttonScale })
              .opacity(this.state.animationState.buttonOpacity)
          }
          .width('100%')
          .padding(20)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .margin({ left: 20, right: 20 })
          .scale({ x: this.state.animationState.sectionScale, y: this.state.animationState.sectionScale })
          .opacity(this.state.animationState.sectionOpacity)
        }
        .width('100%')
        .padding({ bottom: 20 })
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F7FA')
    .scale({ x: this.state.animationState.contentScale, y: this.state.animationState.contentScale })
    .opacity(this.state.animationState.contentOpacity)
  }

  private resetSettings() {
    this.state.notificationsEnabled = true
    this.state.soundEnabled = true
    this.state.vibrationEnabled = true
    this.state.workDuration = 25
    this.state.breakDuration = 5
  }
}
* */