import { router } from '@kit.ArkUI'


// 动画配置接口
interface AnimationConfig {
  fadeInDuration: number
  fadeOutDuration: number
  scaleFrom: number
  scaleTo: number
  opacityFrom: number
  opacityTo: number
  fadeInCurve: Curve
  fadeOutCurve: Curve
}

// 动画选项接口
interface AnimationOptions {
  duration: number
  curve: Curve
  delay: number
  iterations: number
  playMode: PlayMode
}

// 播放模式枚举
declare enum PlayMode {
  Normal = 0,
  Loop = 1,
  Reverse = 2
}

/**
 * 页面切换动画管理器
 * 提供统一的页面入场和出场动画，消除默认的右侧滑入滑出效果
 * 基于HarmonyOS动画最佳实践实现流畅的淡入淡出效果
 */
export class PageTransitionManager {
  private static instance: PageTransitionManager
  private isAnimating: boolean = false
  private currentAnimationId: number = 0

  // 优化后的动画配置 - 消除卡顿因素
  private readonly fadeInDuration: number = 350
  private readonly fadeOutDuration: number = 250
  private readonly scaleFrom: number = 0.92
  private readonly scaleTo: number = 1.0
  private readonly fadeInCurve: Curve = Curve.EaseOut
  private readonly fadeOutCurve: Curve = Curve.EaseIn

  static getInstance(): PageTransitionManager {
    if (!PageTransitionManager.instance) {
      PageTransitionManager.instance = new PageTransitionManager()
    }
    return PageTransitionManager.instance
  }

  /**
   * 页面入场动画 - 用于页面显示时的动画
   */
  animateIn(callback?: () => void): void {
    // 页面入场动画通过组件状态管理
    if (callback) {
      setTimeout(callback, this.fadeInDuration)
    }
  }

  /**
   * 页面出场动画 - 用于页面隐藏时的动画
   */
  animateOut(callback?: () => void): void {
    // 页面出场动画通过组件状态管理
    if (callback) {
      setTimeout(callback, this.fadeOutDuration)
    }
  }

  /**
   * 打断当前动画
   * 用于快速响应用户操作，如快速返回
   */
  interruptAnimation(): void {
    this.currentAnimationId++
    this.isAnimating = false
  }

  /**
   * 获取页面动画选项
   */
  private getAnimationConfig(): AnimationOptions {
    return {
      duration: this.fadeInDuration,
      curve: this.fadeInCurve,
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Normal
    }
  }

  /**
   * 获取页面根元素
   * 页面动画通过组件状态管理，不需要获取DOM元素
   */
  private getPageElement(): object | null {
    return null
  }

  /**
   * 导航到指定页面
   * 使用自定义动画替代默认动画
   */
  async navigateTo(targetUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // 确保URL有效
        if (!targetUrl || targetUrl.trim() === '') {
          reject(new Error('Invalid target URL'))
          return
        }

        // 标记动画开始
        this.isAnimating = true
        this.currentAnimationId++
        const animationId = this.currentAnimationId

        // 执行淡出动画
        this.animateOut(() => {
          // 检查动画是否被中断
          if (animationId !== this.currentAnimationId) {
            this.isAnimating = false
            resolve()
            return
          }

          try {
            // 使用replaceUrl避免栈积累，并禁用系统动画
            router.replaceUrl({
              url: targetUrl
            })
            
            this.isAnimating = false
            resolve()
          } catch (error) {
            this.isAnimating = false
            reject(error)
          }
        })
      } catch (error) {
        this.isAnimating = false
        reject(error)
      }
    })
  }

  /**
   * 返回上一页
   */
  navigateBack(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.animateOut(() => {
        router.back()
        resolve()
      })
    })
  }

  /**
   * 重置动画状态
   */
  resetAnimationState(): void {
    this.interruptAnimation()
  }
}

// 全局实例
export const transitionManager = PageTransitionManager.getInstance()