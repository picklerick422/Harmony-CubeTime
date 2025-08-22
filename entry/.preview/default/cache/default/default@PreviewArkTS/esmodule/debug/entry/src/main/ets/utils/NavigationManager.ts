import router from "@ohos:router";
interface AnimationConfig {
    duration: number;
    curve: Curve;
    delay: number;
}
interface PageAnimationState {
    contentScale: number;
    contentOpacity: number;
    titleTranslateY: number;
    titleOpacity: number;
    buttonScale: number;
    buttonOpacity: number;
    listScale?: number;
    calendarScale?: number;
    sectionScale?: number;
}
interface PageAnimationConfig {
    content: AnimationConfig;
    title: AnimationConfig;
    buttons: AnimationConfig;
}
export class NavigationManager {
    private static instance: NavigationManager;
    private currentState: PageAnimationState;
    private animationConfig: PageAnimationConfig;
    constructor() {
        this.currentState = {
            contentScale: 0.9,
            contentOpacity: 0,
            titleTranslateY: -20,
            titleOpacity: 0,
            buttonScale: 0.8,
            buttonOpacity: 0
        };
        this.animationConfig = {
            content: { duration: 600, curve: Curve.EaseOut, delay: 0 },
            title: { duration: 500, curve: Curve.EaseOut, delay: 100 },
            buttons: { duration: 400, curve: Curve.EaseOut, delay: 200 }
        };
    }
    static getInstance(): NavigationManager {
        if (!NavigationManager.instance) {
            NavigationManager.instance = new NavigationManager();
        }
        return NavigationManager.instance;
    }
    getInitialState(): PageAnimationState {
        return {
            contentScale: this.currentState.contentScale,
            contentOpacity: this.currentState.contentOpacity,
            titleTranslateY: this.currentState.titleTranslateY,
            titleOpacity: this.currentState.titleOpacity,
            buttonScale: this.currentState.buttonScale,
            buttonOpacity: this.currentState.buttonOpacity
        };
    }
    animateIn(callback?: () => void): void {
        const animateContent = () => {
            Context.animateToImmediately({
                duration: this.animationConfig.content.duration,
                curve: this.animationConfig.content.curve,
                delay: this.animationConfig.content.delay,
                onFinish: () => {
                    if (callback)
                        callback();
                }
            }, () => {
                this.currentState.contentScale = 1;
                this.currentState.contentOpacity = 1;
            });
        };
        const animateTitle = () => {
            Context.animateToImmediately({
                duration: this.animationConfig.title.duration,
                curve: this.animationConfig.title.curve,
                delay: this.animationConfig.title.delay
            }, () => {
                this.currentState.titleTranslateY = 0;
                this.currentState.titleOpacity = 1;
            });
        };
        const animateButtons = () => {
            Context.animateToImmediately({
                duration: this.animationConfig.buttons.duration,
                curve: this.animationConfig.buttons.curve,
                delay: this.animationConfig.buttons.delay
            }, () => {
                this.currentState.buttonScale = 1;
                this.currentState.buttonOpacity = 1;
            });
        };
        // 启动所有动画
        animateContent();
        animateTitle();
        animateButtons();
    }
    animateOut(targetPage: string, callback?: () => void): void {
        const animateContentOut = () => {
            Context.animateToImmediately({
                duration: 300,
                curve: Curve.EaseIn,
                onFinish: () => {
                    if (callback) {
                        callback();
                    }
                    else {
                        router.pushUrl({ url: `pages/${targetPage}` });
                    }
                }
            }, () => {
                this.currentState.contentScale = 0.95;
                this.currentState.contentOpacity = 0;
            });
        };
        const animateTitleOut = () => {
            Context.animateToImmediately({
                duration: 250,
                curve: Curve.EaseIn,
                delay: 50
            }, () => {
                this.currentState.titleTranslateY = -20;
                this.currentState.titleOpacity = 0;
            });
        };
        const animateButtonsOut = () => {
            Context.animateToImmediately({
                duration: 200,
                curve: Curve.EaseIn,
                delay: 100
            }, () => {
                this.currentState.buttonScale = 0.8;
                this.currentState.buttonOpacity = 0;
            });
        };
        // 启动退出动画
        animateContentOut();
        animateTitleOut();
        animateButtonsOut();
    }
    // 重置动画状态
    resetAnimation(): void {
        this.currentState = {
            contentScale: 0.9,
            contentOpacity: 0,
            titleTranslateY: -20,
            titleOpacity: 0,
            buttonScale: 0.8,
            buttonOpacity: 0
        };
    }
    // 自定义动画配置
    setCustomConfig(config: Partial<PageAnimationConfig>): void {
        this.animationConfig = {
            content: this.animationConfig.content,
            title: this.animationConfig.title,
            buttons: this.animationConfig.buttons,
            ...config
        };
    }
}
// 全局导航工具
export class NavigationHelper {
    static navigateTo(page: string, navigationManager?: NavigationManager): void {
        if (navigationManager) {
            navigationManager.animateOut(page);
        }
        else {
            setTimeout(() => {
                router.pushUrl({ url: `pages/${page}` });
            }, 300);
        }
    }
    static navigateBack(navigationManager?: NavigationManager): void {
        if (navigationManager) {
            navigationManager.animateOut('', () => {
                router.back();
            });
        }
        else {
            router.back();
        }
    }
}
