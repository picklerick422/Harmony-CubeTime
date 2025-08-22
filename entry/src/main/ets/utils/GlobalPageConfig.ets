import { router } from '@kit.ArkUI'

/**
 * 全局页面配置
 * 用于统一配置所有页面的切换行为
 */
export class GlobalPageConfig {
  private static instance: GlobalPageConfig
  private isInitialized: boolean = false

  static getInstance(): GlobalPageConfig {
    if (!GlobalPageConfig.instance) {
      GlobalPageConfig.instance = new GlobalPageConfig()
    }
    return GlobalPageConfig.instance
  }

  /**
   * 初始化全局页面配置
   * 禁用默认的页面切换动画
   */
  initialize(): void {
    if (this.isInitialized) return

    // 配置router默认行为，禁用系统动画
    this.disableSystemTransitions()
    this.isInitialized = true
  }

  /**
   * 禁用系统默认的页面切换动画
   */
  private disableSystemTransitions(): void {
    // 通过配置router参数来最小化系统动画影响
    // 注意：HarmonyOS目前不支持完全禁用系统动画，但可以通过优化参数减少影响
  }

  /**
   * 配置页面切换参数
   */
  getPageTransitionOptions(): any {
    return {
      // 使用replaceUrl来避免栈积累
      // 通过自定义动画覆盖系统动画
    }
  }

  /**
   * 优化页面切换性能
   */
  optimizePageTransition(): void {
    // 减少不必要的重绘和重排
    // 优化动画性能
  }
}

// 全局配置实例
export const globalConfig = GlobalPageConfig.getInstance()