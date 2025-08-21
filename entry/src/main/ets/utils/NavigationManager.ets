import router from '@ohos.router';

// 页面切换动画类型
export enum TransitionType {
  SLIDE_RIGHT = 'slide_right',
  SLIDE_LEFT = 'slide_left',
  SLIDE_UP = 'slide_up',
  SLIDE_DOWN = 'slide_down',
  FADE = 'fade',
  ZOOM = 'zoom',
  FLIP = 'flip',
  CUSTOM = 'custom' // 自定义动画类型
}

// 页面切换管理器 - 支持自定义动画序列
export class NavigationManager {
  private static instance: NavigationManager;
  
  // 当前页面动画状态
  private currentTransition: TransitionType = TransitionType.SLIDE_RIGHT;
  
  // 单例模式
  public static getInstance(): NavigationManager {
    if (!NavigationManager.instance) {
      NavigationManager.instance = new NavigationManager();
    }
    return NavigationManager.instance;
  }

  // 设置全局默认动画
  public setDefaultTransition(type: TransitionType): void {
    this.currentTransition = type;
  }

  // 使用自定义动画序列的页面跳转
  public navigateToWithCustomAnimation(
    page: string, 
    currentPageAnimation: () => void,
    onAnimationComplete: () => void
  ): void {
    try {
      // 执行当前页面的缩小动画
      currentPageAnimation();
      
      // 等待动画完成后跳转
      setTimeout(() => {
        router.pushUrl({
          url: `pages/${page}`,
          params: { useCustomAnimation: true }
        });
        onAnimationComplete();
      }, 300); // 等待缩小动画完成
    } catch (error) {
      console.error('自定义导航失败:', error);
    }
  }

  // 简单的页面跳转，使用系统默认动画
  public navigateTo(page: string, transitionType?: TransitionType): void {
    try {
      router.pushUrl({
        url: `pages/${page}`
      });
    } catch (error) {
      console.error('导航失败:', error);
    }
  }

  // 简单的页面返回
  public navigateBack(transitionType?: TransitionType): void {
    try {
      router.back();
    } catch (error) {
      console.error('返回失败:', error);
    }
  }

  // 替换当前页面
  public replaceTo(page: string, transitionType?: TransitionType): void {
    try {
      router.replaceUrl({
        url: `pages/${page}`
      });
    } catch (error) {
      console.error('替换页面失败:', error);
    }
  }

  // 获取当前页面路径
  public getCurrentPage(): string {
    try {
      return router.getState()?.path || '';
    } catch (error) {
      console.error('获取当前页面失败:', error);
      return '';
    }
  }
}

// 导出单例实例
export const navigationManager = NavigationManager.getInstance();