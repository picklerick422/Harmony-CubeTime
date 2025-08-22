/**
 * 动画管理器 - 提供打断动画支持
 */
export class AnimationManager {
  private isAnimating: boolean = false;
  private animationQueue: (() => void)[] = [];
  private currentAnimationId: number = 0;

  /**
   * 执行动画，支持打断
   * @param animationFn 动画函数
   * @param duration 动画持续时间
   * @param curve 动画曲线
   */
  public animate(animationFn: () => void, duration: number = 300, curve: Curve = Curve.Friction): Promise<void> {
    return new Promise((resolve) => {
      const animationId = ++this.currentAnimationId;
      
      // 如果有正在进行的动画，加入队列
      if (this.isAnimating) {
        this.animationQueue.push(() => {
          if (this.currentAnimationId === animationId) {
            this.executeAnimation(animationFn, duration, curve, resolve);
          }
        });
        return;
      }
      
      this.executeAnimation(animationFn, duration, curve, resolve);
    });
  }

  /**
   * 立即执行动画
   */
  private executeAnimation(animationFn: () => void, duration: number, curve: Curve, resolve: () => void): void {
    this.isAnimating = true;
    
    animateToImmediately({
      duration: duration,
      curve: curve,
      onFinish: () => {
        this.isAnimating = false;
        this.processNextAnimation();
        resolve();
      }
    }, animationFn);
  }

  /**
   * 打断当前动画，立即执行新动画
   */
  public interrupt(animationFn: () => void, duration: number = 200, curve: Curve = Curve.Friction): Promise<void> {
    return new Promise((resolve) => {
      // 清空队列并停止当前动画
      this.animationQueue = [];
      this.currentAnimationId++;
      
      this.executeAnimation(animationFn, duration, curve, resolve);
    });
  }

  /**
   * 处理队列中的下一个动画
   */
  private processNextAnimation(): void {
    if (this.animationQueue.length > 0) {
      const nextAnimation = this.animationQueue.shift();
      if (nextAnimation) {
        nextAnimation();
      }
    }
  }

  /**
   * 清空所有待执行动画
   */
  public clearQueue(): void {
    this.animationQueue = [];
    this.currentAnimationId++;
  }

  /**
   * 检查是否正在动画中
   */
  public get isRunning(): boolean {
    return this.isAnimating;
  }
}

/**
 * 动画状态管理器 - 用于页面切换动画
 */
export class PageAnimationManager {
  private animationManager = new AnimationManager();

  /**
   * 页面进入动画
   */
  public animateIn(
    titleScale: number, titleOpacity: number,
    calendarScale: number, calendarOpacity: number,
    taskScale: number, taskOpacity: number,
    duration: number = 400
  ): Promise<void> {
    return this.animationManager.interrupt(() => {
      // 标题动画 - 先出现
      animateToImmediately({ duration: duration * 0.6, curve: Curve.EaseOut }, () => {
        titleScale = 1;
        titleOpacity = 1;
      });
      
      // 日历网格动画 - 第二个出现
      animateToImmediately({ duration: duration * 0.6, curve: Curve.EaseOut, delay: duration * 0.25 }, () => {
        calendarScale = 1;
        calendarOpacity = 1;
      });
      
      // 任务列表动画 - 最后出现
      animateToImmediately({ duration: duration * 0.6, curve: Curve.EaseOut, delay: duration * 0.5 }, () => {
        taskScale = 1;
        taskOpacity = 1;
      });
    }, duration);
  }

  /**
   * 页面退出动画
   */
  public animateOut(
    titleScale: number, titleOpacity: number,
    calendarScale: number, calendarOpacity: number,
    taskScale: number, taskOpacity: number,
    duration: number = 250
  ): Promise<void> {
    return this.animationManager.interrupt(() => {
      titleOpacity = 0;
      titleScale = 0.3;
      calendarOpacity = 0;
      calendarScale = 0.3;
      taskOpacity = 0;
      taskScale = 0.3;
    }, duration);
  }

  /**
   * 重置可见性状态
   */
  public resetVisibility(
    titleScale: number, titleOpacity: number,
    calendarScale: number, calendarOpacity: number,
    taskScale: number, taskOpacity: number
  ): void {
    titleScale = 0.8;
    titleOpacity = 0;
    calendarScale = 0.8;
    calendarOpacity = 0;
    taskScale = 0.8;
    taskOpacity = 0;
  }
}