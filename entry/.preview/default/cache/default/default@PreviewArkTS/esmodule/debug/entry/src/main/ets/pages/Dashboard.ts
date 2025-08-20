if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Dashboard_Params {
    timeLeft?: number;
    isRunning?: boolean;
    currentMode?: string;
    statistics?: StatisticsData;
    totalFocusTime?: number;
    todayFocusTime?: number;
    sessionsCount?: number;
    currentStreak?: number;
    timeService?: TimeManagementService;
}
import TimeManagementService from "@bundle:com.example.cubetime/entry/ets/services/TimeManagementService";
import type { StatisticsData } from "@bundle:com.example.cubetime/entry/ets/services/TimeManagementService";
import { TimerDisplay } from "@bundle:com.example.cubetime/entry/ets/components/TimerDisplay";
import router from "@ohos:router";
class Dashboard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
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
        this.timeService = TimeManagementService.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Dashboard_Params) {
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
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
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
    private timeService: TimeManagementService;
    async aboutToAppear() {
        await this.timeService.init();
        this.loadStatistics();
        this.startTimerUpdate();
    }
    loadStatistics(): void {
        const stats: StatisticsData = this.timeService.getStatistics();
        this.totalFocusTime = stats.totalFocusTime;
        this.todayFocusTime = stats.todayFocusTime;
        this.sessionsCount = stats.sessionsCount;
        this.currentStreak = stats.currentStreak;
    }
    startTimerUpdate() {
        setInterval(() => {
            this.timeLeft = this.timeService.getTimeLeft();
            this.isRunning = this.timeService.isRunning();
            this.currentMode = this.timeService.getCurrentMode();
        }, 1000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(57:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F2F2F7');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(59:7)", "entry");
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.width('100%');
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.backgroundColor('#6366F1');
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Dashboard.ets(60:9)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/Dashboard.ets(61:11)", "entry");
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.White);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('仪表盘');
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(69:11)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Row.pop();
        // 统一紫色背景，覆盖整个顶部包括状态栏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/Dashboard.ets(86:7)", "entry");
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F2F2F7');
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(87:9)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Timer Section
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(89:11)", "entry");
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TimerDisplay(this, {
                        timeLeft: this.timeLeft,
                        isRunning: this.isRunning,
                        currentMode: this.currentMode
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Dashboard.ets", line: 90, col: 13 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("entry/src/main/ets/pages/Dashboard.ets(96:13)", "entry");
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Start');
            Button.debugLine("entry/src/main/ets/pages/Dashboard.ets(97:15)", "entry");
            Button.width(100);
            Button.onClick(() => {
                this.timeService.startPomodoro();
            });
            Button.visibility(this.isRunning ? Visibility.None : Visibility.Visible);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Pause');
            Button.debugLine("entry/src/main/ets/pages/Dashboard.ets(104:15)", "entry");
            Button.width(100);
            Button.onClick(() => {
                this.timeService.stopTiming();
            });
            Button.visibility(this.isRunning ? Visibility.Visible : Visibility.None);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Reset');
            Button.debugLine("entry/src/main/ets/pages/Dashboard.ets(111:15)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(126:11)", "entry");
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
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(127:13)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Dashboard.ets(132:13)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(133:15)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Total Focus');
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(134:17)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${Math.floor(this.totalFocusTime / 60)} min`);
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(137:17)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(144:15)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Today');
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(145:17)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${Math.floor(this.todayFocusTime / 60)} min`);
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(148:17)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(155:15)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Sessions');
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(156:17)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.sessionsCount.toString());
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(159:17)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Dashboard.ets(166:15)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Streak');
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(167:17)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.currentStreak} days`);
            Text.debugLine("entry/src/main/ets/pages/Dashboard.ets(170:17)", "entry");
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
            Row.debugLine("entry/src/main/ets/pages/Dashboard.ets(185:11)", "entry");
            // Quick Actions
            Row.width('100%');
            // Quick Actions
            Row.padding({ left: 16, right: 16, top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Tasks');
            Button.debugLine("entry/src/main/ets/pages/Dashboard.ets(186:13)", "entry");
            Button.layoutWeight(1);
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/Tasks' });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Calendar');
            Button.debugLine("entry/src/main/ets/pages/Dashboard.ets(192:13)", "entry");
            Button.layoutWeight(1);
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/Calendar' });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Settings');
            Button.debugLine("entry/src/main/ets/pages/Dashboard.ets(198:13)", "entry");
            Button.layoutWeight(1);
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/Settings' });
            });
        }, Button);
        Button.pop();
        // Quick Actions
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Dashboard";
    }
}
registerNamedRoute(() => new Dashboard(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Dashboard", pageFullPath: "entry/src/main/ets/pages/Dashboard", integratedHsp: "false", moduleType: "followWithHap" });
