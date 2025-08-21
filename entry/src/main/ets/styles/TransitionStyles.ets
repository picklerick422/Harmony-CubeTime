// 页面切换动画样式定义
export const TransitionStyles = {
  // 滑动进入动画 - 从右向左
  slideRightEnter: {
    type: 'transition',
    enter: {
      transform: 'translateX(100%)',
      opacity: 0
    },
    exit: {
      transform: 'translateX(0%)',
      opacity: 1
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 滑动退出动画 - 从左向右
  slideLeftExit: {
    type: 'transition',
    enter: {
      transform: 'translateX(0%)',
      opacity: 1
    },
    exit: {
      transform: 'translateX(-100%)',
      opacity: 0
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 滑动进入动画 - 从左向右
  slideLeftEnter: {
    type: 'transition',
    enter: {
      transform: 'translateX(-100%)',
      opacity: 0
    },
    exit: {
      transform: 'translateX(0%)',
      opacity: 1
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 滑动退出动画 - 从右向左
  slideRightExit: {
    type: 'transition',
    enter: {
      transform: 'translateX(0%)',
      opacity: 1
    },
    exit: {
      transform: 'translateX(100%)',
      opacity: 0
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 向上滑动进入
  slideUpEnter: {
    type: 'transition',
    enter: {
      transform: 'translateY(100%)',
      opacity: 0
    },
    exit: {
      transform: 'translateY(0%)',
      opacity: 1
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 向下滑动退出
  slideDownExit: {
    type: 'transition',
    enter: {
      transform: 'translateY(0%)',
      opacity: 1
    },
    exit: {
      transform: 'translateY(100%)',
      opacity: 0
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 向下滑动进入
  slideDownEnter: {
    type: 'transition',
    enter: {
      transform: 'translateY(-100%)',
      opacity: 0
    },
    exit: {
      transform: 'translateY(0%)',
      opacity: 1
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 向上滑动退出
  slideUpExit: {
    type: 'transition',
    enter: {
      transform: 'translateY(0%)',
      opacity: 1
    },
    exit: {
      transform: 'translateY(-100%)',
      opacity: 0
    },
    duration: 300,
    curve: 'easeOut'
  },

  // 淡入动画
  fadeEnter: {
    type: 'transition',
    enter: {
      opacity: 0
    },
    exit: {
      opacity: 1
    },
    duration: 250,
    curve: 'easeInOut'
  },

  // 淡出动画
  fadeExit: {
    type: 'transition',
    enter: {
      opacity: 1
    },
    exit: {
      opacity: 0
    },
    duration: 250,
    curve: 'easeInOut'
  },

  // 缩放进入动画
  zoomEnter: {
    type: 'transition',
    enter: {
      transform: 'scale(0.8)',
      opacity: 0
    },
    exit: {
      transform: 'scale(1)',
      opacity: 1
    },
    duration: 350,
    curve: 'easeOut'
  },

  // 缩放退出动画
  zoomExit: {
    type: 'transition',
    enter: {
      transform: 'scale(1)',
      opacity: 1
    },
    exit: {
      transform: 'scale(1.1)',
      opacity: 0
    },
    duration: 350,
    curve: 'easeOut'
  },

  // 翻转进入动画
  flipEnter: {
    type: 'transition',
    enter: {
      transform: 'rotateY(-90deg)',
      opacity: 0
    },
    exit: {
      transform: 'rotateY(0deg)',
      opacity: 1
    },
    duration: 400,
    curve: 'easeInOut'
  },

  // 翻转退出动画
  flipExit: {
    type: 'transition',
    enter: {
      transform: 'rotateY(0deg)',
      opacity: 1
    },
    exit: {
      transform: 'rotateY(90deg)',
      opacity: 0
    },
    duration: 400,
    curve: 'easeInOut'
  }
};

// 页面切换动画配置
export const PageTransitions = {
  // 默认页面切换动画
  default: {
    enter: TransitionStyles.slideRightEnter,
    exit: TransitionStyles.slideLeftExit
  },

  // 主页进入动画（从Splash）
  homeFromSplash: {
    enter: TransitionStyles.fadeEnter,
    exit: TransitionStyles.fadeExit
  },

  // 设置页面动画
  settings: {
    enter: TransitionStyles.slideUpEnter,
    exit: TransitionStyles.slideDownExit
  },

  // 详情页面动画
  detail: {
    enter: TransitionStyles.zoomEnter,
    exit: TransitionStyles.zoomExit
  },

  // 模态页面动画
  modal: {
    enter: TransitionStyles.slideUpEnter,
    exit: TransitionStyles.slideDownExit
  }
};