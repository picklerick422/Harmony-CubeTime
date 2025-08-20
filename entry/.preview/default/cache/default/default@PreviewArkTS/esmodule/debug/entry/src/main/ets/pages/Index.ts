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
    currentScale?: number;
    currentOpacity?: number;
    selectedTab?: number;
    timer?: number;
}
import router from "@ohos:router";
interface CubeState {
    isSolved: boolean;
    currentTime: string;
    scrambleMoves: string[];
    sessionCount: number;
    bestTime: string;
    totalPracticeTime: string;
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
        this.__bestTime = new ObservedPropertySimplePU(0, this, "bestTime");
        this.__currentScale = new ObservedPropertySimplePU(1, this, "currentScale");
        this.__currentOpacity = new ObservedPropertySimplePU(1, this, "currentOpacity");
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
        if (params.currentScale !== undefined) {
            this.currentScale = params.currentScale;
        }
        if (params.currentOpacity !== undefined) {
            this.currentOpacity = params.currentOpacity;
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
        this.__currentScale.purgeDependencyOnElmtId(rmElmtId);
        this.__currentOpacity.purgeDependencyOnElmtId(rmElmtId);
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
        this.__currentScale.aboutToBeDeleted();
        this.__currentOpacity.aboutToBeDeleted();
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
    private __currentScale: ObservedPropertySimplePU<number>;
    get currentScale() {
        return this.__currentScale.get();
    }
    set currentScale(newValue: number) {
        this.__currentScale.set(newValue);
    }
    private __currentOpacity: ObservedPropertySimplePU<number>;
    get currentOpacity() {
        return this.__currentOpacity.get();
    }
    set currentOpacity(newValue: number) {
        this.__currentOpacity.set(newValue);
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
    }
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(98:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F9FAFB');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(100:7)", "entry");
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.height(56);
            // 标题栏
            Row.backgroundColor('#2563EB');
            // 标题栏
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('CubeTime');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(101:9)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 魔方状态显示
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(112:7)", "entry");
            // 魔方状态显示
            Column.width('100%');
            // 魔方状态显示
            Column.padding(16);
            // 魔方状态显示
            Column.backgroundColor('#F3F4F6');
            // 魔方状态显示
            Column.borderRadius(12);
            // 魔方状态显示
            Column.margin({ top: 16, left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('魔方状态');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(113:9)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cubeState);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(119:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        // 魔方状态显示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 打乱显示
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(130:7)", "entry");
            // 打乱显示
            Column.width('100%');
            // 打乱显示
            Column.padding(16);
            // 打乱显示
            Column.margin({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('打乱');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(131:9)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.scramble);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(137:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('#374151');
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.padding(12);
            Text.backgroundColor('#FFFFFF');
            Text.borderRadius(8);
            Text.border({ width: 1, color: '#D1D5DB' });
        }, Text);
        Text.pop();
        // 打乱显示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计时器显示
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(152:7)", "entry");
            // 计时器显示
            Column.width('100%');
            // 计时器显示
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.solveTime));
            Text.debugLine("entry/src/main/ets/pages/Index.ets(153:9)", "entry");
            Context.animation({
                duration: 200,
                curve: Curve.EaseInOut
            });
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.padding(32);
            Text.backgroundColor('#FFFFFF');
            Text.borderRadius(16);
            Text.border({ width: 2, color: '#2563EB' });
            Text.scale({ x: this.currentScale, y: this.currentScale });
            Text.opacity(this.currentOpacity);
            Context.animation(null);
        }, Text);
        Text.pop();
        // 计时器显示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 最佳时间
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(174:7)", "entry");
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
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('最佳时间');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(175:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.bestTime));
            Text.debugLine("entry/src/main/ets/pages/Index.ets(178:9)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#059669');
        }, Text);
        Text.pop();
        // 最佳时间
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 控制按钮
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(190:7)", "entry");
            // 控制按钮
            Row.width('100%');
            // 控制按钮
            Row.justifyContent(FlexAlign.Center);
            // 控制按钮
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(191:9)", "entry");
            Button.width(100);
            Button.height(40);
            Button.backgroundColor('#6B7280');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(20);
            Button.onClick(() => {
                this.resetTimer();
                Context.animateTo({
                    duration: 200,
                    curve: Curve.EaseInOut
                }, () => {
                    this.currentScale = 1.1;
                    this.currentOpacity = 0.8;
                });
                setTimeout(() => {
                    this.currentScale = 1;
                    this.currentOpacity = 1;
                }, 200);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isTiming ? '停止' : '开始');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(212:9)", "entry");
            Button.width(120);
            Button.height(48);
            Button.backgroundColor(this.isTiming ? '#EF4444' : '#10B981');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(24);
            Button.margin({ left: 16 });
            Button.onClick(() => {
                if (this.isTiming) {
                    this.stopTimer();
                }
                else {
                    this.startTimer();
                }
                Context.animateTo({
                    duration: 200,
                    curve: Curve.EaseInOut
                }, () => {
                    this.currentScale = 1.1;
                    this.currentOpacity = 0.8;
                });
                setTimeout(() => {
                    this.currentScale = 1;
                    this.currentOpacity = 1;
                }, 200);
            });
        }, Button);
        Button.pop();
        // 控制按钮
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(243:7)", "entry");
            // 底部导航
            Row.width('100%');
            // 底部导航
            Row.height(60);
            // 底部导航
            Row.backgroundColor('#FFFFFF');
            // 底部导航
            Row.border({ width: 1, color: '#E5E7EB', style: BorderStyle.Solid });
            // 底部导航
            Row.position({ bottom: 0 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(244:9)", "entry");
            Column.width('25%');
            Column.onClick(() => {
                this.selectedTab = 0;
                // 已经在首页，不需要跳转
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🏠');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(245:11)", "entry");
            Text.fontSize(24);
            Text.fontColor(this.selectedTab === 0 ? '#2563EB' : '#9CA3AF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('首页');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(248:11)", "entry");
            Text.fontSize(12);
            Text.fontColor(this.selectedTab === 0 ? '#2563EB' : '#9CA3AF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(258:9)", "entry");
            Column.width('25%');
            Column.onClick(() => {
                this.selectedTab = 1;
                router.pushUrl({ url: 'pages/Dashboard' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📊');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(259:11)", "entry");
            Text.fontSize(24);
            Text.fontColor(this.selectedTab === 1 ? '#2563EB' : '#9CA3AF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('统计');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(262:11)", "entry");
            Text.fontSize(12);
            Text.fontColor(this.selectedTab === 1 ? '#2563EB' : '#9CA3AF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(272:9)", "entry");
            Column.width('25%');
            Column.onClick(() => {
                this.selectedTab = 2;
                router.pushUrl({ url: 'pages/Pomodoro' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⏱️');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(273:11)", "entry");
            Text.fontSize(24);
            Text.fontColor(this.selectedTab === 2 ? '#2563EB' : '#9CA3AF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('计时');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(276:11)", "entry");
            Text.fontSize(12);
            Text.fontColor(this.selectedTab === 2 ? '#2563EB' : '#9CA3AF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(286:9)", "entry");
            Column.width('25%');
            Column.onClick(() => {
                this.selectedTab = 3;
                router.pushUrl({ url: 'pages/Settings' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚙️');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(287:11)", "entry");
            Text.fontSize(24);
            Text.fontColor(this.selectedTab === 3 ? '#2563EB' : '#9CA3AF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(290:11)", "entry");
            Text.fontSize(12);
            Text.fontColor(this.selectedTab === 3 ? '#2563EB' : '#9CA3AF');
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
