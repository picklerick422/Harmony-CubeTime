if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    cubeState?: string;
    scramble?: string;
    solveTime?: number;
    isTiming?: boolean;
    startTime?: number;
    showScramble?: boolean;
    bestTime?: number;
    titleScale?: number;
    titleOpacity?: number;
    cardScale?: number;
    cardOpacity?: number;
    timerScale?: number;
    timerOpacity?: number;
    buttonScale?: number;
    buttonOpacity?: number;
    navScale?: number;
    navOpacity?: number;
    iconOpacity?: number;
    iconScale?: number;
    itemScale?: number;
    itemOpacity?: number;
    selectedTab?: number;
    timer?: number;
}
import type { NavigationManager, PageAnimationState } from '../utils/NavigationManager';
import { transitionManager } from "@bundle:com.example.cubetime/entry/ets/utils/PageTransitionManager";
interface CubeState {
    isSolved: boolean;
    currentTime: string;
    scrambleMoves: string[];
    sessionCount: number;
    bestTime: string;
    totalPracticeTime: string;
}
interface IndexState {
    navigationManager?: NavigationManager;
    animationState: PageAnimationState;
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cubeState = new ObservedPropertySimplePU('未开始', this, "cubeState");
        this.__scramble = new ObservedPropertySimplePU('', this, "scramble");
        this.__solveTime = new ObservedPropertySimplePU(0, this, "solveTime");
        this.__isTiming = new ObservedPropertySimplePU(false, this, "isTiming");
        this.__startTime = new ObservedPropertySimplePU(0, this, "startTime");
        this.__showScramble = new ObservedPropertySimplePU(false, this, "showScramble");
        this.__bestTime = new ObservedPropertySimplePU(0
        // 弹性动画状态变量
        , this, "bestTime");
        this.__titleScale = new ObservedPropertySimplePU(0.8, this, "titleScale");
        this.__titleOpacity = new ObservedPropertySimplePU(0, this, "titleOpacity");
        this.__cardScale = new ObservedPropertySimplePU(0.9, this, "cardScale");
        this.__cardOpacity = new ObservedPropertySimplePU(0, this, "cardOpacity");
        this.__timerScale = new ObservedPropertySimplePU(0.7, this, "timerScale");
        this.__timerOpacity = new ObservedPropertySimplePU(0, this, "timerOpacity");
        this.__buttonScale = new ObservedPropertySimplePU(0.8, this, "buttonScale");
        this.__buttonOpacity = new ObservedPropertySimplePU(0, this, "buttonOpacity");
        this.__navScale = new ObservedPropertySimplePU(0.9, this, "navScale");
        this.__navOpacity = new ObservedPropertySimplePU(0, this, "navOpacity");
        this.__iconOpacity = new ObservedPropertySimplePU(0, this, "iconOpacity");
        this.__iconScale = new ObservedPropertySimplePU(0, this, "iconScale");
        this.__itemScale = new ObservedPropertySimplePU(1, this, "itemScale");
        this.__itemOpacity = new ObservedPropertySimplePU(1, this, "itemOpacity");
        this.__selectedTab = new ObservedPropertySimplePU(0, this, "selectedTab");
        this.timer = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.cubeState !== undefined) {
            this.cubeState = params.cubeState;
        }
        if (params.scramble !== undefined) {
            this.scramble = params.scramble;
        }
        if (params.solveTime !== undefined) {
            this.solveTime = params.solveTime;
        }
        if (params.isTiming !== undefined) {
            this.isTiming = params.isTiming;
        }
        if (params.startTime !== undefined) {
            this.startTime = params.startTime;
        }
        if (params.showScramble !== undefined) {
            this.showScramble = params.showScramble;
        }
        if (params.bestTime !== undefined) {
            this.bestTime = params.bestTime;
        }
        if (params.titleScale !== undefined) {
            this.titleScale = params.titleScale;
        }
        if (params.titleOpacity !== undefined) {
            this.titleOpacity = params.titleOpacity;
        }
        if (params.cardScale !== undefined) {
            this.cardScale = params.cardScale;
        }
        if (params.cardOpacity !== undefined) {
            this.cardOpacity = params.cardOpacity;
        }
        if (params.timerScale !== undefined) {
            this.timerScale = params.timerScale;
        }
        if (params.timerOpacity !== undefined) {
            this.timerOpacity = params.timerOpacity;
        }
        if (params.buttonScale !== undefined) {
            this.buttonScale = params.buttonScale;
        }
        if (params.buttonOpacity !== undefined) {
            this.buttonOpacity = params.buttonOpacity;
        }
        if (params.navScale !== undefined) {
            this.navScale = params.navScale;
        }
        if (params.navOpacity !== undefined) {
            this.navOpacity = params.navOpacity;
        }
        if (params.iconOpacity !== undefined) {
            this.iconOpacity = params.iconOpacity;
        }
        if (params.iconScale !== undefined) {
            this.iconScale = params.iconScale;
        }
        if (params.itemScale !== undefined) {
            this.itemScale = params.itemScale;
        }
        if (params.itemOpacity !== undefined) {
            this.itemOpacity = params.itemOpacity;
        }
        if (params.selectedTab !== undefined) {
            this.selectedTab = params.selectedTab;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cubeState.purgeDependencyOnElmtId(rmElmtId);
        this.__scramble.purgeDependencyOnElmtId(rmElmtId);
        this.__solveTime.purgeDependencyOnElmtId(rmElmtId);
        this.__isTiming.purgeDependencyOnElmtId(rmElmtId);
        this.__startTime.purgeDependencyOnElmtId(rmElmtId);
        this.__showScramble.purgeDependencyOnElmtId(rmElmtId);
        this.__bestTime.purgeDependencyOnElmtId(rmElmtId);
        this.__titleScale.purgeDependencyOnElmtId(rmElmtId);
        this.__titleOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
        this.__cardOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__timerScale.purgeDependencyOnElmtId(rmElmtId);
        this.__timerOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__buttonScale.purgeDependencyOnElmtId(rmElmtId);
        this.__buttonOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__navScale.purgeDependencyOnElmtId(rmElmtId);
        this.__navOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__iconOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__iconScale.purgeDependencyOnElmtId(rmElmtId);
        this.__itemScale.purgeDependencyOnElmtId(rmElmtId);
        this.__itemOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedTab.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cubeState.aboutToBeDeleted();
        this.__scramble.aboutToBeDeleted();
        this.__solveTime.aboutToBeDeleted();
        this.__isTiming.aboutToBeDeleted();
        this.__startTime.aboutToBeDeleted();
        this.__showScramble.aboutToBeDeleted();
        this.__bestTime.aboutToBeDeleted();
        this.__titleScale.aboutToBeDeleted();
        this.__titleOpacity.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__cardOpacity.aboutToBeDeleted();
        this.__timerScale.aboutToBeDeleted();
        this.__timerOpacity.aboutToBeDeleted();
        this.__buttonScale.aboutToBeDeleted();
        this.__buttonOpacity.aboutToBeDeleted();
        this.__navScale.aboutToBeDeleted();
        this.__navOpacity.aboutToBeDeleted();
        this.__iconOpacity.aboutToBeDeleted();
        this.__iconScale.aboutToBeDeleted();
        this.__itemScale.aboutToBeDeleted();
        this.__itemOpacity.aboutToBeDeleted();
        this.__selectedTab.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cubeState: ObservedPropertySimplePU<string>;
    get cubeState() {
        return this.__cubeState.get();
    }
    set cubeState(newValue: string) {
        this.__cubeState.set(newValue);
    }
    private __scramble: ObservedPropertySimplePU<string>;
    get scramble() {
        return this.__scramble.get();
    }
    set scramble(newValue: string) {
        this.__scramble.set(newValue);
    }
    private __solveTime: ObservedPropertySimplePU<number>;
    get solveTime() {
        return this.__solveTime.get();
    }
    set solveTime(newValue: number) {
        this.__solveTime.set(newValue);
    }
    private __isTiming: ObservedPropertySimplePU<boolean>;
    get isTiming() {
        return this.__isTiming.get();
    }
    set isTiming(newValue: boolean) {
        this.__isTiming.set(newValue);
    }
    private __startTime: ObservedPropertySimplePU<number>;
    get startTime() {
        return this.__startTime.get();
    }
    set startTime(newValue: number) {
        this.__startTime.set(newValue);
    }
    private __showScramble: ObservedPropertySimplePU<boolean>;
    get showScramble() {
        return this.__showScramble.get();
    }
    set showScramble(newValue: boolean) {
        this.__showScramble.set(newValue);
    }
    private __bestTime: ObservedPropertySimplePU<number>;
    get bestTime() {
        return this.__bestTime.get();
    }
    set bestTime(newValue: number) {
        this.__bestTime.set(newValue);
    }
    // 弹性动画状态变量
    private __titleScale: ObservedPropertySimplePU<number>;
    get titleScale() {
        return this.__titleScale.get();
    }
    set titleScale(newValue: number) {
        this.__titleScale.set(newValue);
    }
    private __titleOpacity: ObservedPropertySimplePU<number>;
    get titleOpacity() {
        return this.__titleOpacity.get();
    }
    set titleOpacity(newValue: number) {
        this.__titleOpacity.set(newValue);
    }
    private __cardScale: ObservedPropertySimplePU<number>;
    get cardScale() {
        return this.__cardScale.get();
    }
    set cardScale(newValue: number) {
        this.__cardScale.set(newValue);
    }
    private __cardOpacity: ObservedPropertySimplePU<number>;
    get cardOpacity() {
        return this.__cardOpacity.get();
    }
    set cardOpacity(newValue: number) {
        this.__cardOpacity.set(newValue);
    }
    private __timerScale: ObservedPropertySimplePU<number>;
    get timerScale() {
        return this.__timerScale.get();
    }
    set timerScale(newValue: number) {
        this.__timerScale.set(newValue);
    }
    private __timerOpacity: ObservedPropertySimplePU<number>;
    get timerOpacity() {
        return this.__timerOpacity.get();
    }
    set timerOpacity(newValue: number) {
        this.__timerOpacity.set(newValue);
    }
    private __buttonScale: ObservedPropertySimplePU<number>;
    get buttonScale() {
        return this.__buttonScale.get();
    }
    set buttonScale(newValue: number) {
        this.__buttonScale.set(newValue);
    }
    private __buttonOpacity: ObservedPropertySimplePU<number>;
    get buttonOpacity() {
        return this.__buttonOpacity.get();
    }
    set buttonOpacity(newValue: number) {
        this.__buttonOpacity.set(newValue);
    }
    private __navScale: ObservedPropertySimplePU<number>;
    get navScale() {
        return this.__navScale.get();
    }
    set navScale(newValue: number) {
        this.__navScale.set(newValue);
    }
    private __navOpacity: ObservedPropertySimplePU<number>;
    get navOpacity() {
        return this.__navOpacity.get();
    }
    set navOpacity(newValue: number) {
        this.__navOpacity.set(newValue);
    }
    private __iconOpacity: ObservedPropertySimplePU<number>;
    get iconOpacity() {
        return this.__iconOpacity.get();
    }
    set iconOpacity(newValue: number) {
        this.__iconOpacity.set(newValue);
    }
    private __iconScale: ObservedPropertySimplePU<number>;
    get iconScale() {
        return this.__iconScale.get();
    }
    set iconScale(newValue: number) {
        this.__iconScale.set(newValue);
    }
    private __itemScale: ObservedPropertySimplePU<number>;
    get itemScale() {
        return this.__itemScale.get();
    }
    set itemScale(newValue: number) {
        this.__itemScale.set(newValue);
    }
    private __itemOpacity: ObservedPropertySimplePU<number>;
    get itemOpacity() {
        return this.__itemOpacity.get();
    }
    set itemOpacity(newValue: number) {
        this.__itemOpacity.set(newValue);
    }
    private __selectedTab: ObservedPropertySimplePU<number>;
    get selectedTab() {
        return this.__selectedTab.get();
    }
    set selectedTab(newValue: number) {
        this.__selectedTab.set(newValue);
    }
    private timer: number;
    aboutToAppear() {
        this.generateScramble();
        this.loadBestTime();
        // 首次进入时直接执行动画，不重置状态
        this.animateIn();
    }
    onPageShow() {
        // 页面重新显示时重置可见性和动画
        this.resetVisibility();
        this.animateIn();
    }
    // 页面加载动画 - 协调动画速度
    private animateIn() {
        // 快速但有层次的动画，总时长400ms
        // 标题 - 立即出现（200ms）
        Context.animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
            this.titleOpacity = 1;
            this.titleScale = 1;
        });
        // 主要内容 - 轻微延迟（250ms）
        setTimeout(() => {
            Context.animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
                this.cardOpacity = 1;
                this.cardScale = 1;
                this.timerOpacity = 1;
                this.timerScale = 1;
            });
        }, 100);
        // 操作按钮 - 最后出现（200ms）
        setTimeout(() => {
            Context.animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
                this.buttonOpacity = 1;
                this.buttonScale = 1;
                this.navOpacity = 1;
                this.navScale = 1;
                this.iconOpacity = 1;
                this.iconScale = 1;
            });
        }, 200);
        // 底部图标
    }
    //need to be corrected
    private generateScramble() {
        const moves = ["R", "U", "F", "L", "D", "B"];
        const modifiers = ["", "'", "2"];
        let scramble = "";
        let lastMove = "";
        for (let i = 0; i < 20; i++) {
            let move = moves[Math.floor(Math.random() * moves.length)];
            while (move === lastMove) {
                move = moves[Math.floor(Math.random() * moves.length)];
            }
            lastMove = move;
            const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
            scramble += move + modifier + " ";
        }
        this.scramble = scramble.trim();
    }
    private loadBestTime() {
        this.bestTime = 0;
    }
    private startTimer() {
        if (!this.isTiming) {
            this.isTiming = true;
            this.startTime = Date.now();
            this.timer = setInterval(() => {
                this.solveTime = Date.now() - this.startTime;
            }, 10);
        }
    }
    private stopTimer() {
        if (this.isTiming) {
            this.isTiming = false;
            clearInterval(this.timer);
            if (this.solveTime < this.bestTime || this.bestTime === 0) {
                this.bestTime = this.solveTime;
            }
        }
    }
    private resetTimer() {
        this.solveTime = 0;
        this.isTiming = false;
        clearInterval(this.timer);
        this.generateScramble();
    }
    private formatTime(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10);
        if (minutes > 0) {
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
        }
        else {
            return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
        }
    }
    // 统一的页面退出动画
    private animateOut(targetPage: string): void {
        // 分层退出动画：内容→导航栏→边框
        // 1. 内容区域先消失
        Context.animateToImmediately({ duration: 250, curve: Curve.EaseIn }, () => {
            this.titleScale = 0.8;
            this.titleOpacity = 0;
            this.cardScale = 0.3;
            this.cardOpacity = 0;
            this.timerScale = 0.3;
            this.timerOpacity = 0;
            this.buttonScale = 0.2;
            this.buttonOpacity = 0;
        });
        // 2. 导航栏图标逐个消失（交错动画）
        setTimeout(() => {
            Context.animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
                this.navScale = 0.3;
                this.navOpacity = 0;
                this.iconScale = 0.2;
                this.iconOpacity = 0;
            });
        }, 100);
        // 3. 导航栏边框高度变化（模拟下沉效果）
        setTimeout(() => {
            // 这里通过scaleY模拟边框高度变化
            Context.animateToImmediately({ duration: 200, curve: Curve.EaseIn }, () => {
                // 导航栏整体缩小，模拟边框下沉
                this.navScale = 0.3;
                this.navOpacity = 0;
            });
        }, 250);
        setTimeout(() => {
            const pagePath = `pages/${targetPage}`;
            transitionManager.navigateTo(pagePath).catch((err: Error) => {
                console.error('Navigation failed:', err);
            });
        }, 350);
    }
    private navigateTo(page: string): void {
        this.animateOut(page);
    }
    // 重置页面可见性（解决返回空白问题）
    private resetVisibility(): void {
        // 强制重置所有动画状态为可见，导航条始终保持可见
        this.titleScale = 1;
        this.titleOpacity = 1;
        this.cardScale = 1;
        this.cardOpacity = 1;
        this.itemScale = 1;
        this.itemOpacity = 1;
        this.buttonScale = 1;
        this.buttonOpacity = 1;
        this.timerScale = 1;
        this.timerOpacity = 1;
        this.navScale = 1;
        this.navOpacity = 1;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F2F2F7');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统一紫色背景标题栏，融入状态栏
            Column.create();
            // 统一紫色背景标题栏，融入状态栏
            Column.width('100%');
            // 统一紫色背景标题栏，融入状态栏
            Column.backgroundColor('#6366F1');
            // 统一紫色背景标题栏，融入状态栏
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(38);
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('  CubeTime');
            Context.animation({
                duration: 300,
                curve: Curve.Friction
            });
            Text.width('25%');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Start);
            Text.scale({ x: this.titleScale, y: this.titleScale });
            Text.opacity(this.titleOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Top);
            Row.height(17);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('      一个智能时间管理app');
            Context.animation({
                duration: 300,
                curve: Curve.Friction
            });
            Text.width('20%');
            Text.fontSize(10);
            Text.fontWeight(FontWeight.Normal);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Start);
            Text.scale({ x: this.titleScale, y: this.titleScale });
            Text.opacity(this.titleOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        Row.pop();
        // 统一紫色背景标题栏，融入状态栏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //主体部分
            Scroll.create();
            //主体部分
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 魔方状态显示
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction
            });
            // 魔方状态显示
            Column.width('90%');
            // 魔方状态显示
            Column.padding(16);
            // 魔方状态显示
            Column.backgroundColor('#FFFFFF');
            // 魔方状态显示
            Column.borderRadius(12);
            // 魔方状态显示
            Column.margin({ left: 16, right: 16, top: 16 });
            // 魔方状态显示
            Column.scale({ x: this.cardScale, y: this.cardScale });
            // 魔方状态显示
            Column.opacity(this.cardOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('魔方状态');
            Context.animation({
                duration: 500,
                curve: Curve.Friction
            });
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 8 });
            Text.scale({ x: this.cardScale, y: this.cardScale });
            Text.opacity(this.cardOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cubeState);
            Context.animation({
                duration: 500,
                curve: Curve.Friction
            });
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.scale({ x: this.cardScale, y: this.cardScale });
            Text.opacity(this.cardOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        // 魔方状态显示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 打乱显示
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 100
            });
            // 打乱显示
            Column.width('100%');
            // 打乱显示
            Column.padding(16);
            // 打乱显示
            Column.margin({ left: 16, right: 16 });
            // 打乱显示
            Column.scale({ x: this.cardScale, y: this.cardScale });
            // 打乱显示
            Column.opacity(this.cardOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('打乱');
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 100
            });
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 8 });
            Text.scale({ x: this.cardScale, y: this.cardScale });
            Text.opacity(this.cardOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.scramble);
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 100
            });
            Text.fontSize(16);
            Text.fontColor('#374151');
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.padding(12);
            Text.backgroundColor('#FFFFFF');
            Text.borderRadius(8);
            Text.border({ width: 1, color: '#E5E7EB' });
            Text.scale({ x: this.cardScale, y: this.cardScale });
            Text.opacity(this.cardOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        // 打乱显示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计时器显示
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 200
            });
            // 计时器显示
            Column.width('100%');
            // 计时器显示
            Column.padding(16);
            // 计时器显示
            Column.scale({ x: this.timerScale, y: this.timerScale });
            // 计时器显示
            Column.opacity(this.timerOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.solveTime));
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 200
            });
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.padding(32);
            Text.backgroundColor('#FFFFFF');
            Text.borderRadius(16);
            Text.border({ width: 2, color: '#6366F1' });
            Text.scale({ x: this.timerScale, y: this.timerScale });
            Text.opacity(this.timerOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        // 计时器显示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 最佳时间
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 300
            });
            // 最佳时间
            Column.width('100%');
            // 最佳时间
            Column.padding(16);
            // 最佳时间
            Column.backgroundColor('#F0FDF4');
            // 最佳时间
            Column.borderRadius(12);
            // 最佳时间
            Column.margin({ left: 16, right: 16 });
            // 最佳时间
            Column.scale({ x: this.cardScale, y: this.cardScale });
            // 最佳时间
            Column.opacity(this.cardOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('最佳时间');
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 300
            });
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.scale({ x: this.cardScale, y: this.cardScale });
            Text.opacity(this.cardOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.bestTime));
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 300
            });
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#059669');
            Text.scale({ x: this.cardScale, y: this.cardScale });
            Text.opacity(this.cardOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        // 最佳时间
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 控制按钮
            Row.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 400
            });
            // 控制按钮
            Row.width('100%');
            // 控制按钮
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 控制按钮
            Row.padding(16);
            // 控制按钮
            Row.scale({ x: this.buttonScale, y: this.buttonScale });
            // 控制按钮
            Row.opacity(this.buttonOpacity);
            Context.animation(null);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置');
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 400
            });
            Button.width(100);
            Button.height(40);
            Button.backgroundColor('#EF4444');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(20);
            Button.scale({ x: this.buttonScale, y: this.buttonScale });
            Button.opacity(this.buttonOpacity);
            Context.animation(null);
            Button.onClick(() => {
                Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.buttonScale = 0.95;
                });
                setTimeout(() => {
                    Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                        this.buttonScale = 1;
                    });
                }, 150);
                this.resetTimer();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isTiming) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('开始');
                        Context.animation({
                            duration: 500,
                            curve: Curve.Friction,
                            delay: 400
                        });
                        Button.width(100);
                        Button.height(40);
                        Button.backgroundColor('#10B981');
                        Button.fontColor('#FFFFFF');
                        Button.borderRadius(20);
                        Button.scale({ x: this.buttonScale, y: this.buttonScale });
                        Button.opacity(this.buttonOpacity);
                        Context.animation(null);
                        Button.onClick(() => {
                            Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                                this.buttonScale = 0.95;
                            });
                            setTimeout(() => {
                                Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                                    this.buttonScale = 1;
                                });
                            }, 150);
                            this.startTimer();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('停止');
                        Context.animation({
                            duration: 500,
                            curve: Curve.EaseOut,
                            delay: 400
                        });
                        Button.width(100);
                        Button.height(40);
                        Button.backgroundColor('#F59E0B');
                        Button.fontColor('#FFFFFF');
                        Button.borderRadius(20);
                        Button.scale({ x: this.buttonScale, y: this.buttonScale });
                        Button.opacity(this.buttonOpacity);
                        Context.animation(null);
                        Button.onClick(() => {
                            Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                                this.buttonScale = 0.95;
                            });
                            setTimeout(() => {
                                Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                                    this.buttonScale = 1;
                                });
                            }, 150);
                            this.stopTimer();
                        });
                    }, Button);
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        // 控制按钮
        Row.pop();
        Column.pop();
        //主体部分
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航
            Row.create();
            // 底部导航
            Row.width('100%');
            // 底部导航
            Row.padding({ top: 12, bottom: 8 });
            // 底部导航
            Row.backgroundColor('#FFFFFF');
            // 底部导航
            Row.border({
                width: { top: 1 },
                color: '#E5E7EB'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 0
            });
            Column.width('25%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                // 首页按钮，无需导航
            });
            Column.scale({ x: this.iconScale, y: this.iconScale });
            Column.opacity(this.iconOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Context.animation({
                duration: 500,
                curve: Curve.Friction
            });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6366F1');
            Image.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('首页');
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 500
            });
            Text.fontSize(12);
            Text.fontColor('#6366F1');
            Text.margin({ top: 4 });
            Text.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 0
            });
            Column.width('25%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.navigateTo('Pomodoro');
            });
            Column.scale({ x: this.iconScale, y: this.iconScale });
            Column.opacity(this.iconOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 500
            });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('番茄钟');
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 500
            });
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
            Text.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 0
            });
            Column.width('25%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.navigateTo('Calendar');
            });
            Column.scale({ x: this.iconScale, y: this.iconScale });
            Column.opacity(this.iconOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 500
            });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('日历');
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 500
            });
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
            Text.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({
                duration: 500,
                curve: Curve.Friction,
                delay: 0
            });
            Column.width('25%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.navigateTo('Settings');
            });
            Column.scale({ x: this.iconScale, y: this.iconScale });
            Column.opacity(this.iconOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Context.animation({
                duration: 800,
                curve: Curve.EaseOut,
                delay: 500
            });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Context.animation({
                duration: 500,
                curve: Curve.EaseOut,
                delay: 500
            });
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
            Text.scale({ x: this.navScale, y: this.navScale });
            Context.animation(null);
        }, Text);
        Text.pop();
        Column.pop();
        // 底部导航
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
