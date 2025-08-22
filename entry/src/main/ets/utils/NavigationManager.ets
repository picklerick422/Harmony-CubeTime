import { router } from '@kit.ArkUI'


interface AnimationConfig {
  duration: number
  curve: Curve
  delay: number
}

export interface PageAnimationState {
  calendarOpacity: number | Resource
  contentScale: number
  contentOpacity: number
  titleTranslateY: number
  titleOpacity: number
  buttonScale: number
  buttonOpacity: number
  listOpacity?: number
  listScale?: number
  calendarScale?: number
  sectionOpacity?: number
  sectionScale?: number
  timerScale?: number
  timerOpacity?: number
}

interface PageAnimationConfig {
  content: AnimationConfig
  title: AnimationConfig
  buttons: AnimationConfig
}

export class NavigationManager {
  private static instance: NavigationManager
  private currentState: PageAnimationState
  private animationConfig: PageAnimationConfig

  constructor() {
    this.currentState = {
      contentScale: 0.9,
      contentOpacity: 0,
      titleTranslateY: -20,
      titleOpacity: 0,
      buttonScale: 0.8,
      buttonOpacity: 0,
      calendarOpacity: 0
    }

    this.animationConfig = {
      content: { duration: 600, curve: Curve.EaseOut, delay: 0 },
      title: { duration: 500, curve: Curve.EaseOut, delay: 100 },
      buttons: { duration: 400, curve: Curve.EaseOut, delay: 200 }
    }
  }

  static getInstance(): NavigationManager {
    if (!NavigationManager.instance) {
      NavigationManager.instance = new NavigationManager()
    }
    return NavigationManager.instance
  }

  getInitialState(): PageAnimationState {
    return {
      contentScale: this.currentState.contentScale,
      contentOpacity: this.currentState.contentOpacity,
      titleTranslateY: this.currentState.titleTranslateY,
      titleOpacity: this.currentState.titleOpacity,
      buttonScale: this.currentState.buttonScale,
      buttonOpacity: this.currentState.buttonOpacity,
      calendarOpacity: 0
    }
  }

  animateIn(callback?: () => void): void {
    const animateContent = () => {
      animateToImmediately({
        duration: this.animationConfig.content.duration,
        curve: this.animationConfig.content.curve,
        delay: this.animationConfig.content.delay,
        onFinish: () => {
          if (callback) callback()
        }
      }, () => {
        this.currentState.contentScale = 1
        this.currentState.contentOpacity = 1
      })
    }

    const animateTitle = () => {
      animateToImmediately({
        duration: this.animationConfig.title.duration,
        curve: this.animationConfig.title.curve,
        delay: this.animationConfig.title.delay
      }, () => {
        this.currentState.titleTranslateY = 0
        this.currentState.titleOpacity = 1
      })
    }

    const animateButtons = () => {
      animateToImmediately({
        duration: this.animationConfig.buttons.duration,
        curve: this.animationConfig.buttons.curve,
        delay: this.animationConfig.buttons.delay
      }, () => {
        this.currentState.buttonScale = 1
        this.currentState.buttonOpacity = 1
      })
    }

    // 启动所有动画
    animateContent()
    animateTitle()
    animateButtons()
  }

  animateOut(targetPage: string, callback?: () => void): void {
    console.info(`NavigationManager: Starting animateOut for ${targetPage}`)
    // 同步执行所有退出动画，使用最长动画的时长
    animateToImmediately({
      duration: 300,
      curve: Curve.EaseIn,
      onFinish: () => {
        console.info(`NavigationManager: animateOut completed for ${targetPage}`)
        if (callback) {
          callback()
        }
      }
    }, () => {
      this.currentState.contentScale = 0.95
      this.currentState.contentOpacity = 0
      this.currentState.titleTranslateY = -20
      this.currentState.titleOpacity = 0
      this.currentState.buttonScale = 0.8
      this.currentState.buttonOpacity = 0
      this.currentState.calendarOpacity = 0
    })
  }

  // 重置动画状态
  resetAnimation(): void {
    this.currentState = {
      contentScale: 0.9,
      contentOpacity: 0,
      titleTranslateY: -20,
      titleOpacity: 0,
      buttonScale: 0.8,
      buttonOpacity: 0,
      calendarOpacity: 0
    }
  }

  // 自定义动画配置
  setCustomConfig(config: Partial<PageAnimationConfig>): void {
    this.animationConfig.content = config.content || this.animationConfig.content
    this.animationConfig.title = config.title || this.animationConfig.title
    this.animationConfig.buttons = config.buttons || this.animationConfig.buttons
  }

  // 导航到指定页面方法
  navigateTo(page: string): void {
    console.info(`NavigationManager: Starting navigation to ${page}`)
    this.animateOut(page, () => {
      console.info(`NavigationManager: Animation completed, navigating to ${page}`)
      router.pushUrl({
        url: `pages/${page}`
      }).then(() => {
        console.info(`NavigationManager: Successfully navigated to ${page}`)
      }).catch((err: Error) => {
        console.error(`NavigationManager navigateTo failed: ${JSON.stringify(err)}`)
      })
    })
  }

  // 替换页面方法
  replaceTo(page: string): void {
    this.animateOut(page, () => {
      router.replaceUrl({
        url: `pages/${page}`
      }).then(() => {
        console.info(`NavigationManager: Successfully replaced to ${page}`)
      }).catch((err: Error) => {
        console.error(`NavigationManager replaceTo failed: ${JSON.stringify(err)}`)
      })
    })
  }

  // 返回上一页方法
  navigateBack(): void {
    this.animateOut('', () => {
      router.back()
    })
  }
}

// 全局导航工具
export class NavigationHelper {
  static navigateTo(page: string, navigationManager?: NavigationManager): void {
    if (navigationManager) {
      navigationManager.animateOut(page)
    } else {
      setTimeout(() => {
        router.pushUrl({
          url: `pages/${page}`
        }).then(() => {
          console.info(`NavigationHelper: Successfully navigated to ${page}`)
        }).catch((err: Error) => {
          console.error(`NavigationHelper navigateTo failed: ${JSON.stringify(err)}`)
        })
      }, 300)
    }
  }

  static navigateBack(navigationManager?: NavigationManager): void {
    if (navigationManager) {
      navigationManager.animateOut('', () => {
        router.back()
      })
    } else {
      setTimeout(() => {
        router.back()
      }, 300)
    }
  }
}