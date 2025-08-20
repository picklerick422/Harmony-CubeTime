if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TimerDisplay_Params {
    timeLeft?: number;
    isRunning?: boolean;
    currentMode?: string;
}
export class TimerDisplay extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__timeLeft = new SynchedPropertySimpleOneWayPU(params.timeLeft, this, "timeLeft");
        this.__isRunning = new SynchedPropertySimpleOneWayPU(params.isRunning, this, "isRunning");
        this.__currentMode = new SynchedPropertySimpleOneWayPU(params.currentMode, this, "currentMode");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TimerDisplay_Params) {
    }
    updateStateVars(params: TimerDisplay_Params) {
        this.__timeLeft.reset(params.timeLeft);
        this.__isRunning.reset(params.isRunning);
        this.__currentMode.reset(params.currentMode);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__timeLeft.purgeDependencyOnElmtId(rmElmtId);
        this.__isRunning.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__timeLeft.aboutToBeDeleted();
        this.__isRunning.aboutToBeDeleted();
        this.__currentMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __timeLeft: SynchedPropertySimpleOneWayPU<number>;
    get timeLeft() {
        return this.__timeLeft.get();
    }
    set timeLeft(newValue: number) {
        this.__timeLeft.set(newValue);
    }
    private __isRunning: SynchedPropertySimpleOneWayPU<boolean>;
    get isRunning() {
        return this.__isRunning.get();
    }
    set isRunning(newValue: boolean) {
        this.__isRunning.set(newValue);
    }
    private __currentMode: SynchedPropertySimpleOneWayPU<string>;
    get currentMode() {
        return this.__currentMode.get();
    }
    set currentMode(newValue: string) {
        this.__currentMode.set(newValue);
    }
    formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        else {
            return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/components/TimerDisplay.ets(20:5)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.padding({ top: 32, bottom: 32 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentMode);
            Text.debugLine("entry/src/main/ets/components/TimerDisplay.ets(21:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.timeLeft));
            Text.debugLine("entry/src/main/ets/components/TimerDisplay.ets(26:7)", "entry");
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.isRunning ? '#007AFF' : '#000000');
            Text.fontFamily('HarmonyOS Sans Mono');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
