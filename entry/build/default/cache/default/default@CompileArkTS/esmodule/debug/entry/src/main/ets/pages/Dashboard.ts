if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Dashboard_Params {
    timerOpacity?: number;
    timerScale?: number;
    navOpacity?: number;
    navScale?: number;
    timeLeft?: number;
    isRunning?: boolean;
    currentMode?: string;
    statistics?: StatisticsData;
    totalFocusTime?: number;
    todayFocusTime?: number;
    sessionsCount?: number;
    currentStreak?: number;
    titleScale?: number;
    titleOpacity?: number;
    cardScale?: number;
    cardOpacity?: number;
    itemScale?: number;
    itemOpacity?: number;
    buttonScale?: number;
    buttonOpacity?: number;
    timeService?: TimeManagementService;
}
import TimeManagementService from "@bundle:com.example.cubetime/entry/ets/services/TimeManagementService";
import type { StatisticsData } from "@bundle:com.example.cubetime/entry/ets/services/TimeManagementService";
import { TimerDisplay } from "@bundle:com.example.cubetime/entry/ets/components/TimerDisplay";
import { NavigationManager } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
class Dashboard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.timerOpacity = 1;
        this.timerScale = 1;
        this.navOpacity = 1;
        this.navScale = 1;
        this.__timeLeft = new ObservedPropertySimplePU(0, this, "timeLeft");
        this.__isRunning = new ObservedPropertySimplePU(false, this, "isRunning");
        this.__currentMode = new ObservedPropertySimplePU('Work', this, "currentMode");
        this.__statistics = new ObservedPropertyObjectPU({
            totalSessions: 0,
            totalTime: 0,
            totalFocusTime: 0,
            todaySessions: 0,
            todayTime: 0,
            todayFocusTime: 0,
            weekSessions: 0,
            weekTime: 0,
            monthSessions: 0,
            monthTime: 0,
            sessionsCount: 0,
            currentStreak: 0,
            modeStats: {}
        }, this, "statistics");
        this.__totalFocusTime = new ObservedPropertySimplePU(0, this, "totalFocusTime");
        this.__todayFocusTime = new ObservedPropertySimplePU(0, this, "todayFocusTime");
        this.__sessionsCount = new ObservedPropertySimplePU(0, this, "sessionsCount");
        this.__currentStreak = new ObservedPropertySimplePU(0, this, "currentStreak");
        this.__titleScale = new ObservedPropertySimplePU(0.8, this, "titleScale");
        this.__titleOpacity = new ObservedPropertySimplePU(0, this, "titleOpacity");
        this.__cardScale = new ObservedPropertySimplePU(0.8, this, "cardScale");
        this.__cardOpacity = new ObservedPropertySimplePU(0, this, "cardOpacity");
        this.__itemScale = new ObservedPropertySimplePU(0.8, this, "itemScale");
        this.__itemOpacity = new ObservedPropertySimplePU(0, this, "itemOpacity");
        this.__buttonScale = new ObservedPropertySimplePU(0.8, this, "buttonScale");
        this.__buttonOpacity = new ObservedPropertySimplePU(0, this, "buttonOpacity");
        this.timeService = TimeManagementService.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Dashboard_Params) {
        if (params.timerOpacity !== undefined) {
            this.timerOpacity = params.timerOpacity;
        }
        if (params.timerScale !== undefined) {
            this.timerScale = params.timerScale;
        }
        if (params.navOpacity !== undefined) {
            this.navOpacity = params.navOpacity;
        }
        if (params.navScale !== undefined) {
            this.navScale = params.navScale;
        }
        if (params.timeLeft !== undefined) {
            this.timeLeft = params.timeLeft;
        }
        if (params.isRunning !== undefined) {
            this.isRunning = params.isRunning;
        }
        if (params.currentMode !== undefined) {
            this.currentMode = params.currentMode;
        }
        if (params.statistics !== undefined) {
            this.statistics = params.statistics;
        }
        if (params.totalFocusTime !== undefined) {
            this.totalFocusTime = params.totalFocusTime;
        }
        if (params.todayFocusTime !== undefined) {
            this.todayFocusTime = params.todayFocusTime;
        }
        if (params.sessionsCount !== undefined) {
            this.sessionsCount = params.sessionsCount;
        }
        if (params.currentStreak !== undefined) {
            this.currentStreak = params.currentStreak;
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
        if (params.itemScale !== undefined) {
            this.itemScale = params.itemScale;
        }
        if (params.itemOpacity !== undefined) {
            this.itemOpacity = params.itemOpacity;
        }
        if (params.buttonScale !== undefined) {
            this.buttonScale = params.buttonScale;
        }
        if (params.buttonOpacity !== undefined) {
            this.buttonOpacity = params.buttonOpacity;
        }
        if (params.timeService !== undefined) {
            this.timeService = params.timeService;
        }
    }
    updateStateVars(params: Dashboard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__timeLeft.purgeDependencyOnElmtId(rmElmtId);
        this.__isRunning.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMode.purgeDependencyOnElmtId(rmElmtId);
        this.__statistics.purgeDependencyOnElmtId(rmElmtId);
        this.__totalFocusTime.purgeDependencyOnElmtId(rmElmtId);
        this.__todayFocusTime.purgeDependencyOnElmtId(rmElmtId);
        this.__sessionsCount.purgeDependencyOnElmtId(rmElmtId);
        this.__currentStreak.purgeDependencyOnElmtId(rmElmtId);
        this.__titleScale.purgeDependencyOnElmtId(rmElmtId);
        this.__titleOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
        this.__cardOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__itemScale.purgeDependencyOnElmtId(rmElmtId);
        this.__itemOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__buttonScale.purgeDependencyOnElmtId(rmElmtId);
        this.__buttonOpacity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__timeLeft.aboutToBeDeleted();
        this.__isRunning.aboutToBeDeleted();
        this.__currentMode.aboutToBeDeleted();
        this.__statistics.aboutToBeDeleted();
        this.__totalFocusTime.aboutToBeDeleted();
        this.__todayFocusTime.aboutToBeDeleted();
        this.__sessionsCount.aboutToBeDeleted();
        this.__currentStreak.aboutToBeDeleted();
        this.__titleScale.aboutToBeDeleted();
        this.__titleOpacity.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__cardOpacity.aboutToBeDeleted();
        this.__itemScale.aboutToBeDeleted();
        this.__itemOpacity.aboutToBeDeleted();
        this.__buttonScale.aboutToBeDeleted();
        this.__buttonOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private timerOpacity: number;
    private timerScale: number;
    private navOpacity: number;
    private navScale: number;
    private __timeLeft: ObservedPropertySimplePU<number>;
    get timeLeft() {
        return this.__timeLeft.get();
    }
    set timeLeft(newValue: number) {
        this.__timeLeft.set(newValue);
    }
    private __isRunning: ObservedPropertySimplePU<boolean>;
    get isRunning() {
        return this.__isRunning.get();
    }
    set isRunning(newValue: boolean) {
        this.__isRunning.set(newValue);
    }
    private __currentMode: ObservedPropertySimplePU<string>;
    get currentMode() {
        return this.__currentMode.get();
    }
    set currentMode(newValue: string) {
        this.__currentMode.set(newValue);
    }
    private __statistics: ObservedPropertyObjectPU<StatisticsData>;
    get statistics() {
        return this.__statistics.get();
    }
    set statistics(newValue: StatisticsData) {
        this.__statistics.set(newValue);
    }
    private __totalFocusTime: ObservedPropertySimplePU<number>;
    get totalFocusTime() {
        return this.__totalFocusTime.get();
    }
    set totalFocusTime(newValue: number) {
        this.__totalFocusTime.set(newValue);
    }
    private __todayFocusTime: ObservedPropertySimplePU<number>;
    get todayFocusTime() {
        return this.__todayFocusTime.get();
    }
    set todayFocusTime(newValue: number) {
        this.__todayFocusTime.set(newValue);
    }
    private __sessionsCount: ObservedPropertySimplePU<number>;
    get sessionsCount() {
        return this.__sessionsCount.get();
    }
    set sessionsCount(newValue: number) {
        this.__sessionsCount.set(newValue);
    }
    private __currentStreak: ObservedPropertySimplePU<number>;
    get currentStreak() {
        return this.__currentStreak.get();
    }
    set currentStreak(newValue: number) {
        this.__currentStreak.set(newValue);
    }
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
    private timeService: TimeManagementService;
    // 页面入场动画 - 更快更有弹性
    private animateIn() {
        // 标题动画 - 弹性进入
        Context.animateToImmediately({
            duration: 350,
            curve: Curve.Friction
        }, () => {
            this.titleScale = 1;
            this.titleOpacity = 1;
        });
        // 卡片动画 - 轻微延迟的弹性效果
        Context.animateToImmediately({
            duration: 400,
            curve: Curve.Friction,
            delay: 80
        }, () => {
            this.cardScale = 1;
            this.cardOpacity = 1;
        });
        // 项目动画 - 更有弹性的效果
        Context.animateToImmediately({
            duration: 450,
            curve: Curve.Friction,
            delay: 150
        }, () => {
            this.itemScale = 1;
            this.itemOpacity = 1;
        });
        // 按钮动画 - 弹性效果
        Context.animateToImmediately({
            duration: 500,
            curve: Curve.Friction,
            delay: 220
        }, () => {
            this.buttonScale = 1;
            this.buttonOpacity = 1;
        });
    }
    async aboutToAppear() {
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F2F2F7');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.create();
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.width('100%');
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.backgroundColor('#6366F1');
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.White);
            Image.onClick(() => {
                // 使用自定义返回动画
                Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.itemOpacity = 0;
                    this.itemScale = 0.3;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0.3;
                });
                setTimeout(() => {
                    NavigationManager.getInstance().navigateBack();
                }, 300);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('仪表盘');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
            Text.scale({ x: this.titleScale, y: this.titleScale });
            Text.opacity(this.titleOpacity);
        }, Text);
        Text.pop();
        Row.pop();
        // 统一紫色背景，覆盖整个顶部包括状态栏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F2F2F7');
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Timer Section
            Column.create();
            // Timer Section
            Column.width('100%');
            // Timer Section
            Column.padding(16);
            // Timer Section
            Column.backgroundColor('#FFFFFF');
            // Timer Section
            Column.borderRadius(12);
            // Timer Section
            Column.margin({ left: 16, right: 16, top: 16, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.scale({ x: this.cardScale, y: this.cardScale });
            __Common__.opacity(this.cardOpacity);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TimerDisplay(this, {
                        timeLeft: this.timeLeft,
                        isRunning: this.isRunning,
                        currentMode: this.currentMode
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Dashboard.ets", line: 150, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            timeLeft: this.timeLeft,
                            isRunning: this.isRunning,
                            currentMode: this.currentMode
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        timeLeft: this.timeLeft,
                        isRunning: this.isRunning,
                        currentMode: this.currentMode
                    });
                }
            }, { name: "TimerDisplay" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Start');
            Button.width(100);
            Button.onClick(() => {
                this.timeService.startPomodoro();
            });
            Button.visibility(this.isRunning ? Visibility.None : Visibility.Visible);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Pause');
            Button.width(100);
            Button.onClick(() => {
                this.timeService.stopTiming();
            });
            Button.visibility(this.isRunning ? Visibility.Visible : Visibility.None);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Reset');
            Button.width(100);
            Button.onClick(() => {
                this.timeService.stopTiming();
            });
        }, Button);
        Button.pop();
        Row.pop();
        // Timer Section
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Statistics Section
            Column.create();
            // Statistics Section
            Column.width('100%');
            // Statistics Section
            Column.padding(16);
            // Statistics Section
            Column.backgroundColor('#FFFFFF');
            // Statistics Section
            Column.borderRadius(12);
            // Statistics Section
            Column.margin({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Statistics');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 12 });
            Text.scale({ x: this.itemScale, y: this.itemScale });
            Text.opacity(this.itemOpacity);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.scale({ x: this.itemScale, y: this.itemScale });
            Column.opacity(this.itemOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Total Focus');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${Math.floor(this.totalFocusTime / 60)} min`);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.scale({ x: this.itemScale, y: this.itemScale });
            Column.opacity(this.itemOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Today');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${Math.floor(this.todayFocusTime / 60)} min`);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.scale({ x: this.itemScale, y: this.itemScale });
            Column.opacity(this.itemOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Sessions');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.sessionsCount.toString());
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.scale({ x: this.itemScale, y: this.itemScale });
            Column.opacity(this.itemOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Streak');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.currentStreak} days`);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // Statistics Section
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Quick Actions
            Row.create({ space: 16 });
            // Quick Actions
            Row.width('100%');
            // Quick Actions
            Row.padding({ left: 16, right: 16, top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Tasks');
            Button.layoutWeight(1);
            Button.onClick(() => {
                // 使用自定义动画序列
                Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.itemOpacity = 0;
                    this.itemScale = 0.3;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0.3;
                });
                setTimeout(() => {
                    NavigationManager.getInstance().navigateTo('Tasks');
                }, 300);
            });
            Button.scale({ x: this.buttonScale, y: this.buttonScale });
            Button.opacity(this.buttonOpacity);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Calendar');
            Button.layoutWeight(1);
            Button.onClick(() => {
                // 立即执行退出动画并导航
                Context.animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0;
                    this.cardOpacity = 0;
                    this.cardScale = 0;
                    this.itemOpacity = 0;
                    this.itemScale = 0;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0;
                });
                setTimeout(() => {
                    NavigationManager.getInstance().navigateTo('Calendar');
                }, 200);
            });
            Button.scale({ x: this.buttonScale, y: this.buttonScale });
            Button.opacity(this.buttonOpacity);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Settings');
            Button.layoutWeight(1);
            Button.onClick(() => {
                // 使用自定义动画序列
                Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.itemOpacity = 0;
                    this.itemScale = 0.3;
                    this.buttonOpacity = 0;
                    this.buttonScale = 0.3;
                });
                setTimeout(() => {
                    NavigationManager.getInstance().navigateTo('Settings');
                }, 300);
            });
            Button.scale({ x: this.buttonScale, y: this.buttonScale });
            Button.opacity(this.buttonOpacity);
        }, Button);
        Button.pop();
        // Quick Actions
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    // 生成打乱步骤
    private generateScramble(): string {
        const moves = ["R", "U", "F", "L", "D", "B"];
        const modifiers = ["", "'", "2"];
        let scramble = "";
        for (let i = 0; i < 20; i++) {
            scramble += moves[Math.floor(Math.random() * moves.length)] +
                modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
        }
        return scramble.trim();
    }
    // 加载最佳时间
    private loadBestTime(): number {
        return 0;
    }
    // 重置可见性
    private resetVisibility(): void {
        this.titleOpacity = 1;
        this.titleScale = 1;
        this.buttonOpacity = 1;
        this.buttonScale = 1;
        this.cardOpacity = 1;
        this.cardScale = 1;
        this.itemOpacity = 1;
        this.itemScale = 1;
        this.timerOpacity = 1;
        this.timerScale = 1;
        this.navOpacity = 1;
        this.navScale = 1;
    }
    // 页面切换动画 - 从小放大的缩放效果
    private animateTransition(callback: () => void) {
        Context.animateToImmediately({
            duration: 250,
            curve: Curve.Friction,
            onFinish: callback
        }, () => {
            // 页面缩小消失效果
            this.titleOpacity = 0;
            this.titleScale = 0.3;
            this.cardOpacity = 0;
            this.cardScale = 0.3;
            this.itemOpacity = 0;
            this.itemScale = 0.3;
            this.buttonOpacity = 0;
            this.buttonScale = 0.3;
        });
    }
    // 卡片点击动画
    private animateCardClick(index: number) {
        Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
            this.cardScale = 0.95;
        });
        setTimeout(() => {
            Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                this.cardScale = 1;
            });
        }, 150);
    }
    // 项目点击动画
    private animateItemClick() {
        Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
            this.itemScale = 0.95;
        });
        setTimeout(() => {
            Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                this.itemScale = 1;
            });
        }, 150);
    }
    // 按钮点击动画
    private animateButtonClick() {
        Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
            this.buttonScale = 0.95;
        });
        setTimeout(() => {
            Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                this.buttonScale = 1;
            });
        }, 150);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Dashboard";
    }
}
registerNamedRoute(() => new Dashboard(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Dashboard", pageFullPath: "entry/src/main/ets/pages/Dashboard", integratedHsp: "false", moduleType: "followWithHap" });
