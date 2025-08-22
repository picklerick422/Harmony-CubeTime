if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Pomodoro_Params {
    state?: PomodoroState;
}
interface PomodoroPage_Params {
    timeLeft?: number;
    isRunning?: boolean;
    isWorkTime?: boolean;
    workDuration?: number;
    breakDuration?: number;
    longBreakDuration?: number;
    completedPomodoros?: number;
    currentTask?: Task | null;
    tasks?: Task[];
    newTaskTitle?: string;
    titleScale?: number;
    titleOpacity?: number;
    cardScale?: number;
    cardOpacity?: number;
    timerScale?: number;
    timerOpacity?: number;
    taskScale?: number;
    taskOpacity?: number;
    timer?: number;
}
import router from "@ohos:router";
import { NavigationManager, NavigationHelper } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
class OptionItem {
    value: string;
    label: string;
    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}
class Task {
    id: string;
    title: string;
    completed: boolean;
    pomodoros: number;
    estimatedPomodoros: number;
    constructor(id: string, title: string, completed: boolean = false, pomodoros: number = 0, estimatedPomodoros: number = 1) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.pomodoros = pomodoros;
        this.estimatedPomodoros = estimatedPomodoros;
    }
}
class PomodoroPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__timeLeft = new ObservedPropertySimplePU(25 * 60, this, "timeLeft");
        this.__isRunning = new ObservedPropertySimplePU(false, this, "isRunning");
        this.__isWorkTime = new ObservedPropertySimplePU(true, this, "isWorkTime");
        this.__workDuration = new ObservedPropertySimplePU(25 * 60, this, "workDuration");
        this.__breakDuration = new ObservedPropertySimplePU(5 * 60, this, "breakDuration");
        this.__longBreakDuration = new ObservedPropertySimplePU(15 * 60, this, "longBreakDuration");
        this.__completedPomodoros = new ObservedPropertySimplePU(0, this, "completedPomodoros");
        this.__currentTask = new ObservedPropertyObjectPU(null, this, "currentTask");
        this.__tasks = new ObservedPropertyObjectPU([
            new Task('1', '完成项目报告', false, 0, 3),
            new Task('2', '学习新技术', false, 1, 2),
            new Task('3', '回复邮件', true, 2, 1)
        ], this, "tasks");
        this.__newTaskTitle = new ObservedPropertySimplePU('', this, "newTaskTitle");
        this.__titleScale = new ObservedPropertySimplePU(0.8, this, "titleScale");
        this.__titleOpacity = new ObservedPropertySimplePU(0, this, "titleOpacity");
        this.__cardScale = new ObservedPropertySimplePU(0.8, this, "cardScale");
        this.__cardOpacity = new ObservedPropertySimplePU(0, this, "cardOpacity");
        this.__timerScale = new ObservedPropertySimplePU(0.8, this, "timerScale");
        this.__timerOpacity = new ObservedPropertySimplePU(0, this, "timerOpacity");
        this.__taskScale = new ObservedPropertySimplePU(0.8, this, "taskScale");
        this.__taskOpacity = new ObservedPropertySimplePU(0, this, "taskOpacity");
        this.timer = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PomodoroPage_Params) {
        if (params.timeLeft !== undefined) {
            this.timeLeft = params.timeLeft;
        }
        if (params.isRunning !== undefined) {
            this.isRunning = params.isRunning;
        }
        if (params.isWorkTime !== undefined) {
            this.isWorkTime = params.isWorkTime;
        }
        if (params.workDuration !== undefined) {
            this.workDuration = params.workDuration;
        }
        if (params.breakDuration !== undefined) {
            this.breakDuration = params.breakDuration;
        }
        if (params.longBreakDuration !== undefined) {
            this.longBreakDuration = params.longBreakDuration;
        }
        if (params.completedPomodoros !== undefined) {
            this.completedPomodoros = params.completedPomodoros;
        }
        if (params.currentTask !== undefined) {
            this.currentTask = params.currentTask;
        }
        if (params.tasks !== undefined) {
            this.tasks = params.tasks;
        }
        if (params.newTaskTitle !== undefined) {
            this.newTaskTitle = params.newTaskTitle;
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
        if (params.taskScale !== undefined) {
            this.taskScale = params.taskScale;
        }
        if (params.taskOpacity !== undefined) {
            this.taskOpacity = params.taskOpacity;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    updateStateVars(params: PomodoroPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__timeLeft.purgeDependencyOnElmtId(rmElmtId);
        this.__isRunning.purgeDependencyOnElmtId(rmElmtId);
        this.__isWorkTime.purgeDependencyOnElmtId(rmElmtId);
        this.__workDuration.purgeDependencyOnElmtId(rmElmtId);
        this.__breakDuration.purgeDependencyOnElmtId(rmElmtId);
        this.__longBreakDuration.purgeDependencyOnElmtId(rmElmtId);
        this.__completedPomodoros.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTask.purgeDependencyOnElmtId(rmElmtId);
        this.__tasks.purgeDependencyOnElmtId(rmElmtId);
        this.__newTaskTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__titleScale.purgeDependencyOnElmtId(rmElmtId);
        this.__titleOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
        this.__cardOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__timerScale.purgeDependencyOnElmtId(rmElmtId);
        this.__timerOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__taskScale.purgeDependencyOnElmtId(rmElmtId);
        this.__taskOpacity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__timeLeft.aboutToBeDeleted();
        this.__isRunning.aboutToBeDeleted();
        this.__isWorkTime.aboutToBeDeleted();
        this.__workDuration.aboutToBeDeleted();
        this.__breakDuration.aboutToBeDeleted();
        this.__longBreakDuration.aboutToBeDeleted();
        this.__completedPomodoros.aboutToBeDeleted();
        this.__currentTask.aboutToBeDeleted();
        this.__tasks.aboutToBeDeleted();
        this.__newTaskTitle.aboutToBeDeleted();
        this.__titleScale.aboutToBeDeleted();
        this.__titleOpacity.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__cardOpacity.aboutToBeDeleted();
        this.__timerScale.aboutToBeDeleted();
        this.__timerOpacity.aboutToBeDeleted();
        this.__taskScale.aboutToBeDeleted();
        this.__taskOpacity.aboutToBeDeleted();
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
    private __isWorkTime: ObservedPropertySimplePU<boolean>;
    get isWorkTime() {
        return this.__isWorkTime.get();
    }
    set isWorkTime(newValue: boolean) {
        this.__isWorkTime.set(newValue);
    }
    private __workDuration: ObservedPropertySimplePU<number>;
    get workDuration() {
        return this.__workDuration.get();
    }
    set workDuration(newValue: number) {
        this.__workDuration.set(newValue);
    }
    private __breakDuration: ObservedPropertySimplePU<number>;
    get breakDuration() {
        return this.__breakDuration.get();
    }
    set breakDuration(newValue: number) {
        this.__breakDuration.set(newValue);
    }
    private __longBreakDuration: ObservedPropertySimplePU<number>;
    get longBreakDuration() {
        return this.__longBreakDuration.get();
    }
    set longBreakDuration(newValue: number) {
        this.__longBreakDuration.set(newValue);
    }
    private __completedPomodoros: ObservedPropertySimplePU<number>;
    get completedPomodoros() {
        return this.__completedPomodoros.get();
    }
    set completedPomodoros(newValue: number) {
        this.__completedPomodoros.set(newValue);
    }
    private __currentTask: ObservedPropertyObjectPU<Task | null>;
    get currentTask() {
        return this.__currentTask.get();
    }
    set currentTask(newValue: Task | null) {
        this.__currentTask.set(newValue);
    }
    private __tasks: ObservedPropertyObjectPU<Task[]>;
    get tasks() {
        return this.__tasks.get();
    }
    set tasks(newValue: Task[]) {
        this.__tasks.set(newValue);
    }
    private __newTaskTitle: ObservedPropertySimplePU<string>;
    get newTaskTitle() {
        return this.__newTaskTitle.get();
    }
    set newTaskTitle(newValue: string) {
        this.__newTaskTitle.set(newValue);
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
    private __taskScale: ObservedPropertySimplePU<number>;
    get taskScale() {
        return this.__taskScale.get();
    }
    set taskScale(newValue: number) {
        this.__taskScale.set(newValue);
    }
    private __taskOpacity: ObservedPropertySimplePU<number>;
    get taskOpacity() {
        return this.__taskOpacity.get();
    }
    set taskOpacity(newValue: number) {
        this.__taskOpacity.set(newValue);
    }
    private timer: number;
    aboutToAppear() {
        // 确保页面返回时重置为可见状态
        this.resetVisibility();
        this.animateIn();
        this.startTimer();
    }
    // 页面重新显示时重置可见性和动画
    onPageShow() {
        this.resetVisibility();
        this.animateIn();
    }
    // 系统返回时执行退出动画
    onBackPress(): boolean | void {
        this.animateOut();
        return true;
    }
    private animateOut(): void {
        Context.animateToImmediately({
            duration: 250,
            curve: Curve.Friction,
            onFinish: () => {
                router.back();
            }
        }, () => {
            this.titleOpacity = 0;
            this.titleScale = 0.3;
            this.cardOpacity = 0;
            this.cardScale = 0.3;
            this.timerOpacity = 0;
            this.timerScale = 0.3;
            this.taskOpacity = 0;
            this.taskScale = 0.3;
        });
    }
    aboutToDisappear() {
        this.clearTimer();
    }
    private startTimer() {
        this.clearTimer();
        this.timer = setInterval(() => {
            if (this.isRunning && this.timeLeft > 0) {
                this.timeLeft--;
            }
            else if (this.isRunning && this.timeLeft === 0) {
                this.handleTimerComplete();
            }
        }, 1000);
    }
    private clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }
    private handleTimerComplete() {
        this.isRunning = false;
        if (this.isWorkTime) {
            this.completedPomodoros++;
            if (this.currentTask) {
                this.currentTask.pomodoros++;
            }
            if (this.completedPomodoros % 4 === 0) {
                this.timeLeft = this.longBreakDuration;
            }
            else {
                this.timeLeft = this.breakDuration;
            }
            this.isWorkTime = false;
        }
        else {
            this.timeLeft = this.workDuration;
            this.isWorkTime = true;
        }
        this.startTimer();
    }
    private toggleTimer() {
        this.isRunning = !this.isRunning;
        if (this.isRunning) {
            this.startTimer();
            Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                this.timerScale = 1.05;
            });
        }
        else {
            Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                this.timerScale = 1;
            });
        }
    }
    private resetTimer() {
        this.isRunning = false;
        this.timeLeft = this.isWorkTime ? this.workDuration : this.breakDuration;
        Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
            this.timerScale = 1;
        });
    }
    private skipTimer() {
        this.isRunning = false;
        if (this.isWorkTime) {
            this.timeLeft = this.breakDuration;
            this.isWorkTime = false;
        }
        else {
            this.timeLeft = this.workDuration;
            this.isWorkTime = true;
        }
        Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
            this.timerScale = 1;
        });
    }
    private formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    private getProgress(): number {
        const total = this.isWorkTime ? this.workDuration :
            (this.completedPomodoros % 4 === 0 ? this.longBreakDuration : this.breakDuration);
        return ((total - this.timeLeft) / total) * 100;
    }
    private addTask() {
        if (this.newTaskTitle.trim()) {
            const newTask = new Task(Date.now().toString(), this.newTaskTitle.trim(), false, 0, 1);
            this.tasks.push(newTask);
            this.newTaskTitle = '';
        }
    }
    private toggleTask(taskId: string) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
        }
    }
    private selectTask(task: Task) {
        this.currentTask = task;
    }
    private deleteTask(taskId: string) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            if (this.currentTask && this.currentTask.id === taskId) {
                this.currentTask = null;
            }
        }
    }
    // 页面切换动画 - 从小放大的缩放效果
    private animateTransition(callback: () => void) {
        Context.animateToImmediately({
            duration: 400,
            curve: Curve.Friction,
            onFinish: callback
        }, () => {
            // 页面缩小消失效果
            this.titleOpacity = 0;
            this.titleScale = 0.3;
            this.cardOpacity = 0;
            this.cardScale = 0.3;
            this.timerOpacity = 0;
            this.timerScale = 0.3;
            this.taskOpacity = 0;
            this.taskScale = 0.3;
        });
    }
    private animateIn() {
        // 标题动画 - 先出现
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
            this.titleScale = 1;
            this.titleOpacity = 1;
        });
        // 卡片动画 - 第二个出现
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
            this.cardScale = 1;
            this.cardOpacity = 1;
        });
        // 计时器动画 - 第三个出现
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 300 }, () => {
            this.timerScale = 1;
            this.timerOpacity = 1;
        });
        // 任务列表动画 - 最后出现
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 400 }, () => {
            this.taskScale = 1;
            this.taskOpacity = 1;
        });
    }
    private resetVisibility() {
        // 重置为初始隐藏状态，用于入场动画
        this.titleScale = 0.8;
        this.titleOpacity = 0;
        this.cardScale = 0.8;
        this.cardOpacity = 0;
        this.timerScale = 0.8;
        this.timerOpacity = 0;
        this.taskScale = 0.8;
        this.taskOpacity = 0;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(286:5)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏 - 与状态栏融合（参考Settings界面结构）
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(288:7)", "entry");
            // 顶部标题栏 - 与状态栏融合（参考Settings界面结构）
            Column.width('100%');
            // 顶部标题栏 - 与状态栏融合（参考Settings界面结构）
            Column.backgroundColor('#6366F1');
            // 顶部标题栏 - 与状态栏融合（参考Settings界面结构）
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(289:9)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('番茄时钟');
            Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(290:11)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
            Text.scale({ x: this.titleScale, y: this.titleScale });
            Text.opacity(this.titleOpacity);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/Pomodoro.ets(298:11)", "entry");
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.White);
            Image.onClick(() => {
                Context.animateToImmediately({ duration: 300, curve: Curve.Friction }, () => {
                    this.titleOpacity = 0;
                    this.titleScale = 0.3;
                    this.cardOpacity = 0;
                    this.cardScale = 0.3;
                    this.timerOpacity = 0;
                    this.timerScale = 0.3;
                    this.taskOpacity = 0;
                    this.taskScale = 0.3;
                });
                setTimeout(() => {
                    router.back();
                }, 300);
            });
        }, Image);
        Row.pop();
        // 顶部标题栏 - 与状态栏融合（参考Settings界面结构）
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/Pomodoro.ets(328:7)", "entry");
            List.width('100%');
            List.layoutWeight(1);
            List.backgroundColor('#F9FAFB');
            List.edgeEffect(EdgeEffect.Spring);
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    // 计时器显示
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/pages/Pomodoro.ets(331:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(332:9)", "entry");
                    Column.width('100%');
                    Column.padding(32);
                    Column.alignItems(HorizontalAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.isWorkTime ? '工作时间' : '休息时间');
                    Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(333:11)", "entry");
                    Text.fontSize(20);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(this.isWorkTime ? '#10B981' : '#F59E0B');
                    Text.margin({ bottom: 16 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                    Stack.debugLine("entry/src/main/ets/pages/Pomodoro.ets(339:11)", "entry");
                    Stack.width(200);
                    Stack.height(200);
                    Stack.margin({ bottom: 32 });
                    Stack.opacity(this.timerOpacity);
                    Stack.scale({ x: this.timerScale, y: this.timerScale });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Circle.create();
                    Circle.debugLine("entry/src/main/ets/pages/Pomodoro.ets(340:13)", "entry");
                    Circle.width(200);
                    Circle.height(200);
                    Circle.fill('#F3F4F6');
                }, Circle);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Circle.create();
                    Circle.debugLine("entry/src/main/ets/pages/Pomodoro.ets(345:13)", "entry");
                    Circle.width(200);
                    Circle.height(200);
                    Circle.fill('#10B981');
                    Circle.fillOpacity(0.1);
                    Circle.clipShape(new Rect());
                    Circle.rotate({ angle: this.getProgress() * 3.6 });
                }, Circle);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(353:13)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.formatTime(this.timeLeft));
                    Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(354:15)", "entry");
                    Text.fontSize(48);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#1F2937');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.currentTask) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.currentTask.title);
                                Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(360:17)", "entry");
                                Text.fontSize(16);
                                Text.fontColor('#6B7280');
                                Text.margin({ top: 8 });
                            }, Text);
                            Text.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
                Stack.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 16 });
                    Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(373:11)", "entry");
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(this.isRunning ? '暂停' : '开始');
                    Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(374:13)", "entry");
                    Button.width(100);
                    Button.height(44);
                    Button.backgroundColor('#10B981');
                    Button.fontColor('#FFFFFF');
                    Button.borderRadius(22);
                    Button.onClick(() => this.toggleTimer());
                }, Button);
                Button.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('跳过');
                    Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(382:13)", "entry");
                    Button.width(100);
                    Button.height(44);
                    Button.backgroundColor('#6B7280');
                    Button.fontColor('#FFFFFF');
                    Button.borderRadius(22);
                    Button.onClick(() => this.skipTimer());
                }, Button);
                Button.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('重置');
                    Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(390:13)", "entry");
                    Button.width(100);
                    Button.height(44);
                    Button.backgroundColor('#F59E0B');
                    Button.fontColor('#FFFFFF');
                    Button.borderRadius(22);
                    Button.onClick(() => this.resetTimer());
                }, Button);
                Button.pop();
                Row.pop();
                Column.pop();
                // 计时器显示
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // 计时器显示
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 当前任务
            if (this.currentTask) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            itemCreation2(elmtId, isInitialRender);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                            ListItem.debugLine("entry/src/main/ets/pages/Pomodoro.ets(406:9)", "entry");
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(407:11)", "entry");
                                Column.width('100%');
                                Column.padding({ left: 16, right: 16, bottom: 16 });
                                Column.opacity(this.taskOpacity);
                                Column.scale({ x: this.taskScale, y: this.taskScale });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('当前任务');
                                Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(408:13)", "entry");
                                Text.fontSize(18);
                                Text.fontWeight(FontWeight.Medium);
                                Text.fontColor('#1F2937');
                                Text.margin({ bottom: 8 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                //.backgroundColor('#F9FAFB')
                                Row.create();
                                Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(415:13)", "entry");
                                //.backgroundColor('#F9FAFB')
                                Row.padding(12);
                                //.backgroundColor('#F9FAFB')
                                Row.backgroundColor('#FFFFFF');
                                //.backgroundColor('#F9FAFB')
                                Row.borderRadius(8);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.currentTask.title);
                                Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(416:15)", "entry");
                                Text.fontSize(16);
                                Text.fontColor('#1F2937');
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${this.currentTask.pomodoros}/${this.currentTask.estimatedPomodoros}`);
                                Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(421:15)", "entry");
                                Text.fontSize(14);
                                Text.fontColor('#6B7280');
                            }, Text);
                            Text.pop();
                            //.backgroundColor('#F9FAFB')
                            Row.pop();
                            Column.pop();
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                });
            }
            // 添加任务
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    // 添加任务
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/pages/Pomodoro.ets(438:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 8 });
                    Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(439:9)", "entry");
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 8 });
                    Row.opacity(this.taskOpacity);
                    Row.scale({ x: this.taskScale, y: this.taskScale });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '添加新任务...', text: this.newTaskTitle });
                    TextInput.debugLine("entry/src/main/ets/pages/Pomodoro.ets(440:11)", "entry");
                    TextInput.layoutWeight(1);
                    TextInput.height(40);
                    TextInput.backgroundColor('#F9FAFB');
                    TextInput.borderRadius(8);
                    TextInput.onChange((value: string) => {
                        this.newTaskTitle = value;
                    });
                    TextInput.onSubmit((enterKey: EnterKeyType) => {
                        this.addTask();
                    });
                }, TextInput);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('添加');
                    Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(452:11)", "entry");
                    Button.width(60);
                    Button.height(40);
                    Button.backgroundColor('#10B981');
                    Button.fontColor('#FFFFFF');
                    Button.borderRadius(8);
                    Button.onClick(() => {
                        this.addTask();
                    });
                }, Button);
                Button.pop();
                Row.pop();
                // 添加任务
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // 添加任务
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 任务列表
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const task = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/pages/Pomodoro.ets(470:9)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(471:11)", "entry");
                            Row.width('100%');
                            Row.padding(12);
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(8);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Checkbox.create();
                            Checkbox.debugLine("entry/src/main/ets/pages/Pomodoro.ets(472:13)", "entry");
                            Checkbox.select(task.completed);
                            Checkbox.width(20);
                            Checkbox.height(20);
                            Checkbox.selectedColor('#10B981');
                            Checkbox.onChange((value: boolean) => {
                                const index = this.tasks.findIndex(t => t.id === task.id);
                                if (index !== -1) {
                                    this.tasks[index].completed = value;
                                }
                            });
                        }, Checkbox);
                        Checkbox.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(task.title);
                            Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(484:13)", "entry");
                            Text.fontSize(14);
                            Text.fontColor(task.completed ? '#9CA3AF' : '#1F2937');
                            Text.decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None });
                            Text.layoutWeight(1);
                            Text.margin({ left: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(491:13)", "entry");
                            Row.width(90);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('开始');
                            Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(492:15)", "entry");
                            Button.width(40);
                            Button.height(28);
                            Button.backgroundColor(this.currentTask?.id === task.id ? '#10B981' : '#F3F4F6');
                            Button.fontColor(this.currentTask?.id === task.id ? '#FFFFFF' : '#1F2937');
                            Button.fontSize(12);
                            Button.borderRadius(14);
                            Button.onClick(() => {
                                this.selectTask(task);
                            });
                        }, Button);
                        Button.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('删除');
                            Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(503:15)", "entry");
                            Button.width(40);
                            Button.height(28);
                            Button.backgroundColor('#EF4444');
                            Button.fontColor('#FFFFFF');
                            Button.fontSize(12);
                            Button.borderRadius(14);
                            Button.onClick(() => {
                                this.deleteTask(task.id);
                            });
                        }, Button);
                        Button.pop();
                        Row.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.tasks, forEachItemGenFunction, (task: Task) => task.id, false, false);
        }, ForEach);
        // 任务列表
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    // 设置区域
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/pages/Pomodoro.ets(525:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(526:13)", "entry");
                    Column.width('100%');
                    Column.padding(16);
                    Column.backgroundColor('#FFFFFF');
                    Column.borderRadius(12);
                    Column.margin({ left: 16, right: 16, top: 16 });
                    Column.opacity(this.cardOpacity);
                    Column.scale({ x: this.cardScale, y: this.cardScale });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('计时器设置');
                    Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(527:15)", "entry");
                    Text.fontSize(18);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#1F2937');
                    Text.margin({ bottom: 12 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(533:15)", "entry");
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('工作时长:');
                    Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(534:17)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#6B7280');
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create([
                        new OptionItem('15', '15分钟'),
                        new OptionItem('25', '25分钟'),
                        new OptionItem('30', '30分钟'),
                        new OptionItem('45', '45分钟')
                    ]);
                    Select.debugLine("entry/src/main/ets/pages/Pomodoro.ets(539:17)", "entry");
                    Select.selected(Math.floor(this.workDuration / 60) === 25 ? 1 : (Math.floor(this.workDuration / 60) === 15 ? 0 : (Math.floor(this.workDuration / 60) === 30 ? 2 : 3)));
                    Select.onSelect((index: number) => {
                        const durations = [15, 25, 30, 45];
                        this.workDuration = durations[index] * 60;
                        if (this.isWorkTime) {
                            this.resetTimer();
                        }
                    });
                    Select.width(100);
                    Select.height(32);
                    Select.backgroundColor('#F3F4F6');
                    Select.borderRadius(8);
                }, Select);
                Select.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(565:15)", "entry");
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('休息时长:');
                    Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(566:17)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#6B7280');
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create([
                        new OptionItem('3', '3分钟'),
                        new OptionItem('5', '5分钟'),
                        new OptionItem('10', '10分钟'),
                        new OptionItem('15', '15分钟')
                    ]);
                    Select.debugLine("entry/src/main/ets/pages/Pomodoro.ets(571:17)", "entry");
                    Select.selected(Math.floor(this.breakDuration / 60) === 5 ? 1 : (Math.floor(this.breakDuration / 60) === 3 ? 0 : (Math.floor(this.breakDuration / 60) === 10 ? 2 : 3)));
                    Select.onSelect((index: number) => {
                        const durations = [3, 5, 10, 15];
                        this.breakDuration = durations[index] * 60;
                        if (!this.isWorkTime) {
                            this.resetTimer();
                        }
                    });
                    Select.width(100);
                    Select.height(32);
                    Select.backgroundColor('#F3F4F6');
                    Select.borderRadius(8);
                }, Select);
                Select.pop();
                Row.pop();
                Column.pop();
                // 设置区域
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // 设置区域
            ListItem.pop();
        }
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
interface PomodoroState {
    minutes: number;
    seconds: number;
    isRunning: boolean;
    isBreak: boolean;
    navigationManager?: NavigationManager;
    animationState: {
        contentScale: number;
        contentOpacity: number;
        titleTranslateY: number;
        titleOpacity: number;
        timerScale: number;
        timerOpacity: number;
        buttonScale: number;
        buttonOpacity: number;
    };
}
class Pomodoro extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertyObjectPU({
            minutes: 25,
            seconds: 0,
            isRunning: false,
            isBreak: false,
            animationState: {
                contentScale: 0.9,
                contentOpacity: 0,
                titleTranslateY: -20,
                titleOpacity: 0,
                timerScale: 0.8,
                timerOpacity: 0,
                buttonScale: 0.8,
                buttonOpacity: 0
            }
        }, this, "state");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Pomodoro_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
    }
    updateStateVars(params: Pomodoro_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __state: ObservedPropertyObjectPU<PomodoroState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: PomodoroState) {
        this.__state.set(newValue);
    }
    aboutToAppear() {
        const navigationManager = NavigationManager.getInstance();
        this.state.navigationManager = navigationManager;
        this.state.animationState = navigationManager.getInitialState();
        // 页面进入动画
        setTimeout(() => {
            navigationManager.animateIn();
        }, 100);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(667:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F7FA');
            Column.scale({ x: this.state.animationState.contentScale, y: this.state.animationState.contentScale });
            Column.opacity(this.state.animationState.contentOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(669:7)", "entry");
            // 标题区域
            Row.width('100%');
            // 标题区域
            Row.padding({ left: 20, right: 20, top: 60, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('番茄钟');
            Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(670:9)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.scale({ x: this.state.animationState.titleOpacity, y: this.state.animationState.titleOpacity });
            Text.opacity(this.state.animationState.titleOpacity);
            Text.translate({ y: this.state.animationState.titleTranslateY });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Pomodoro.ets(678:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.ic_public_back'));
            Image.debugLine("entry/src/main/ets/pages/Pomodoro.ets(680:9)", "entry");
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                NavigationHelper.navigateBack(this.state.navigationManager);
            });
        }, Image);
        // 标题区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计时器区域
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(691:7)", "entry");
            // 计时器区域
            Column.width('100%');
            // 计时器区域
            Column.layoutWeight(1);
            // 计时器区域
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Pomodoro.ets(692:9)", "entry");
            Stack.width(280);
            Stack.height(280);
            Stack.alignItems(VerticalAlign.Center);
            Stack.scale({ x: this.state.animationState.timerScale, y: this.state.animationState.timerScale });
            Stack.opacity(this.state.animationState.timerOpacity);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景圆环
            Circle.create();
            Circle.debugLine("entry/src/main/ets/pages/Pomodoro.ets(694:11)", "entry");
            // 背景圆环
            Circle.width(280);
            // 背景圆环
            Circle.height(280);
            // 背景圆环
            Circle.fill('#F0F0F0');
            // 背景圆环
            Circle.opacity(0.3);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进度圆环
            Circle.create();
            Circle.debugLine("entry/src/main/ets/pages/Pomodoro.ets(701:11)", "entry");
            // 进度圆环
            Circle.width(280);
            // 进度圆环
            Circle.height(280);
            // 进度圆环
            Circle.fill('#FF6B6B');
            // 进度圆环
            Circle.opacity(0.1);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 时间显示
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Pomodoro.ets(708:11)", "entry");
            // 时间显示
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.state.minutes.toString().padStart(2, '0')}:${this.state.seconds.toString().padStart(2, '0')}`);
            Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(709:13)", "entry");
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.state.isBreak ? '休息时间' : '工作时间');
            Text.debugLine("entry/src/main/ets/pages/Pomodoro.ets(715:13)", "entry");
            Text.fontSize(16);
            Text.fontColor('#7F8C8D');
        }, Text);
        Text.pop();
        // 时间显示
        Column.pop();
        Stack.pop();
        // 计时器区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 控制按钮区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Pomodoro.ets(732:7)", "entry");
            // 控制按钮区域
            Row.width('100%');
            // 控制按钮区域
            Row.padding({ bottom: 40 });
            // 控制按钮区域
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.state.isRunning ? '暂停' : '开始');
            Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(733:9)", "entry");
            Button.width(120);
            Button.height(48);
            Button.backgroundColor(this.state.isRunning ? '#FF6B6B' : '#4CAF50');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.borderRadius(24);
            Button.onClick(() => {
                this.toggleTimer();
            });
            Button.scale({ x: this.state.animationState.buttonScale, y: this.state.animationState.buttonScale });
            Button.opacity(this.state.animationState.buttonOpacity);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置');
            Button.debugLine("entry/src/main/ets/pages/Pomodoro.ets(747:9)", "entry");
            Button.width(120);
            Button.height(48);
            Button.backgroundColor('#95A5A6');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.borderRadius(24);
            Button.margin({ left: 20 });
            Button.onClick(() => {
                this.resetTimer();
            });
            Button.scale({ x: this.state.animationState.buttonScale, y: this.state.animationState.buttonScale });
            Button.opacity(this.state.animationState.buttonOpacity);
        }, Button);
        Button.pop();
        // 控制按钮区域
        Row.pop();
        Column.pop();
    }
    private toggleTimer() {
        this.state.isRunning = !this.state.isRunning;
        // 这里可以添加实际的计时器逻辑
    }
    private resetTimer() {
        this.state.minutes = this.state.isBreak ? 5 : 25;
        this.state.seconds = 0;
        this.state.isRunning = false;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Pomodoro";
    }
}
registerNamedRoute(() => new Pomodoro(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Pomodoro", pageFullPath: "entry/src/main/ets/pages/Pomodoro", integratedHsp: "false", moduleType: "followWithHap" });
