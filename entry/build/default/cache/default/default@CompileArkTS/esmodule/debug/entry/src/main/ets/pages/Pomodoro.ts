if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
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
        this.resetVisibility();
        this.animateIn();
        this.startTimer();
    }
    onPageShow() {
        this.resetVisibility();
        this.animateIn();
    }
    onBackPress(): boolean | void {
        this.animateOut();
        return true;
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
    private animateOut(): void {
        Context.animateToImmediately({
            duration: 300,
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
    private animateIn(): void {
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
            this.titleScale = 1;
            this.titleOpacity = 1;
        });
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
            this.cardScale = 1;
            this.cardOpacity = 1;
        });
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 300 }, () => {
            this.timerScale = 1;
            this.timerOpacity = 1;
        });
        Context.animateToImmediately({ duration: 600, curve: Curve.EaseOut, delay: 400 }, () => {
            this.taskScale = 1;
            this.taskOpacity = 1;
        });
    }
    private resetVisibility(): void {
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
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#6366F1');
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('番茄时钟');
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
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.White);
            Image.onClick(() => {
                this.animateOut();
            });
        }, Image);
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
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
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.padding(32);
                    Column.alignItems(HorizontalAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.isWorkTime ? '工作时间' : '休息时间');
                    Text.fontSize(20);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(this.isWorkTime ? '#10B981' : '#F59E0B');
                    Text.margin({ bottom: 16 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                    Stack.width(200);
                    Stack.height(200);
                    Stack.margin({ bottom: 32 });
                    Stack.opacity(this.timerOpacity);
                    Stack.scale({ x: this.timerScale, y: this.timerScale });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Circle.create();
                    Circle.width(200);
                    Circle.height(200);
                    Circle.fill('#F3F4F6');
                }, Circle);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Circle.create();
                    Circle.width(200);
                    Circle.height(200);
                    Circle.fill('#10B981');
                    Circle.fillOpacity(0.1);
                    Circle.clipShape(new Rect());
                    Circle.rotate({ angle: this.getProgress() * 3.6 });
                }, Circle);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.formatTime(this.timeLeft));
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
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(this.isRunning ? '暂停' : '开始');
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
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
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
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.padding({ left: 16, right: 16, bottom: 16 });
                                Column.opacity(this.taskOpacity);
                                Column.scale({ x: this.taskScale, y: this.taskScale });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('当前任务');
                                Text.fontSize(18);
                                Text.fontWeight(FontWeight.Medium);
                                Text.fontColor('#1F2937');
                                Text.margin({ bottom: 8 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.padding(12);
                                Row.backgroundColor('#FFFFFF');
                                Row.borderRadius(8);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.currentTask.title);
                                Text.fontSize(16);
                                Text.fontColor('#1F2937');
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${this.currentTask.pomodoros}/${this.currentTask.estimatedPomodoros}`);
                                Text.fontSize(14);
                                Text.fontColor('#6B7280');
                            }, Text);
                            Text.pop();
                            Row.pop();
                            Column.pop();
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                });
            }
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
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 8 });
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 8 });
                    Row.opacity(this.taskOpacity);
                    Row.scale({ x: this.taskScale, y: this.taskScale });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '添加新任务...', text: this.newTaskTitle });
                    TextInput.layoutWeight(1);
                    TextInput.height(40);
                    TextInput.backgroundColor('#F9FAFB');
                    TextInput.borderRadius(8);
                    TextInput.onChange((value: string) => {
                        this.newTaskTitle = value;
                    });
                    TextInput.onSubmit(() => {
                        this.addTask();
                    });
                }, TextInput);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('添加');
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
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding(12);
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(8);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Checkbox.create();
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
                            Text.fontSize(14);
                            Text.fontColor(task.completed ? '#9CA3AF' : '#1F2937');
                            Text.decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None });
                            Text.layoutWeight(1);
                            Text.margin({ left: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width(90);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('开始');
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
        ForEach.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
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
                    Text.fontSize(18);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#1F2937');
                    Text.margin({ bottom: 12 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('工作时长:');
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
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('休息时长:');
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
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PomodoroPage";
    }
}
registerNamedRoute(() => new PomodoroPage(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Pomodoro", pageFullPath: "entry/src/main/ets/pages/Pomodoro", integratedHsp: "false", moduleType: "followWithHap" });
