/**
 * PageTransitionManager 使用示例
 * 展示如何在页面中使用优化后的动画管理器
 */

import { transitionManager } from './PageTransitionManager'

// 示例1：在页面组件中使用
@Component
struct ExamplePage {
  // 动画状态变量
  @State pageOpacity: number = 0
  @State pageScale: number = 0.3
  @State isReadyForAnimation: boolean = false

  aboutToAppear() {
    // 1. 设置动画状态回调
    transitionManager.setAnimationStateCallback((state) => {
      switch (state) {
        case 'in':
          // 入场动画开始
          this.startEnterAnimation()
          break
        case 'out':
          // 出场动画开始
          this.startExitAnimation()
          break
        case 'idle':
          // 动画完成
          this.onAnimationComplete()
          break
      }
    })

    // 2. 预加载动画资源
    transitionManager.preloadAnimationResources()

    // 3. 执行入场动画
    transitionManager.animateIn()
  }

  aboutToDisappear() {
    // 清理资源
    transitionManager.resetAnimationState()
  }

  // 入场动画实现
  private startEnterAnimation() {
    animateTo({
      duration: 350,
      curve: Curve.EaseOut,
      onFinish: () => {
        this.isReadyForAnimation = true
      }
    }, () => {
      this.pageOpacity = 1
      this.pageScale = 1
    })
  }

  // 出场动画实现
  private startExitAnimation() {
    animateTo({
      duration: 250,
      curve: Curve.EaseIn
    }, () => {
      this.pageOpacity = 0
      this.pageScale = 0.8
    })
  }

  private onAnimationComplete() {
    // 动画完成后的处理
    console.info('Animation completed')
  }

  build() {
    Column() {
      Text('示例页面')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })

      Button('跳转到下一页')
        .onClick(async () => {
          try {
            await transitionManager.navigateTo('pages/NextPage')
          } catch (error) {
            console.error('Navigation failed:', error)
          }
        })

      Button('返回上一页')
        .onClick(async () => {
          try {
            await transitionManager.navigateBack()
          } catch (error) {
            console.error('Back navigation failed:', error)
          }
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .opacity(this.pageOpacity)
    .scale({ x: this.pageScale, y: this.pageScale })
  }
}

// 示例2：使用原生PageTransition的替代方案
@Component
struct OptimizedPage {
  build() {
    Column() {
      Text('使用原生PageTransition的页面')
        .fontSize(24)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .pageTransition({
      enter: {
        type: PageTransitionType.None,
        custom: (() => {
          return {
            opacity: { from: 0, to: 1, duration: 350, curve: Curve.EaseOut },
            scale: { from: 0.92, to: 1, duration: 350, curve: Curve.EaseOut }
          }
        })()
      },
      exit: {
        type: PageTransitionType.None,
        custom: (() => {
          return {
            opacity: { from: 1, to: 0, duration: 250, curve: Curve.EaseIn },
            scale: { from: 1, to: 0.92, duration: 250, curve: Curve.EaseIn }
          }
        })()
      }
    })
  }
}

// 示例3：快速操作防护测试
@Component
struct FastOperationTest {
  build() {
    Column() {
      Text('快速操作测试')
        .fontSize(20)
        .margin({ bottom: 20 })

      Button('快速连续点击测试')
        .onClick(async () => {
          // 即使快速连续点击，也不会导致动画堆积
          await transitionManager.navigateTo('pages/AnotherPage')
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}