if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Tasks_Params {
    state?: TasksState;
}
import { NavigationManager, NavigationHelper } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}
interface TasksState {
    tasks: Task[];
    newTaskTitle: string;
    showCompleted: boolean;
    navigationManager?: NavigationManager;
    animationState: {
        contentScale: number;
        contentOpacity: number;
        titleTranslateY: number;
        titleOpacity: number;
        listScale: number;
        listOpacity: number;
        buttonScale: number;
        buttonOpacity: number;
        calendarScale?: number;
        sectionScale?: number;
        itemScale?: number;
        itemOpacity?: number;
        cardScale?: number;
        cardOpacity?: number;
        timerScale?: number;
        timerOpacity?: number;
        navScale?: number;
        navOpacity?: number;
    };
}
class Tasks extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertyObjectPU({
            tasks: [
                { id: '1', title: '完成项目报告', completed: false, createdAt: new Date() },
                { id: '2', title: '学习ArkTS开发', completed: true, createdAt: new Date() },
                { id: '3', title: '整理工作笔记', completed: false, createdAt: new Date() }
            ],
            newTaskTitle: '',
            showCompleted: true,
            animationState: {
                contentScale: 0.9,
                contentOpacity: 0,
                titleTranslateY: -20,
                titleOpacity: 0,
                listScale: 0.8,
                listOpacity: 0,
                buttonScale: 0.8,
                buttonOpacity: 0
            }
        }, this, "state");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Tasks_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
    }
    updateStateVars(params: Tasks_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __state: ObservedPropertyObjectPU<TasksState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: TasksState) {
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
            Column.debugLine("entry/src/main/ets/pages/Tasks.ets(73:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F7FA');
            Column.scale({ x: this.state.animationState.contentScale, y: this.state.animationState.contentScale });
            Column.opacity(this.state.animationState.contentOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Tasks.ets(75:7)", "entry");
            // 标题区域
            Row.width('100%');
            // 标题区域
            Row.padding({ left: 20, right: 20, top: 60, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('任务管理');
            Text.debugLine("entry/src/main/ets/pages/Tasks.ets(76:9)", "entry");
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
            Blank.debugLine("entry/src/main/ets/pages/Tasks.ets(84:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.ic_public_back'));
            Image.debugLine("entry/src/main/ets/pages/Tasks.ets(86:9)", "entry");
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                NavigationHelper.navigateBack(this.state.navigationManager);
            });
        }, Image);
        // 标题区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加任务区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Tasks.ets(97:7)", "entry");
            // 添加任务区域
            Row.width('100%');
            // 添加任务区域
            Row.padding({ left: 20, right: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '添加新任务...', text: this.state.newTaskTitle });
            TextInput.debugLine("entry/src/main/ets/pages/Tasks.ets(98:9)", "entry");
            TextInput.width('70%');
            TextInput.height(48);
            TextInput.backgroundColor('#FFFFFF');
            TextInput.borderRadius(24);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.onChange((value: string) => {
                this.state.newTaskTitle = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加');
            Button.debugLine("entry/src/main/ets/pages/Tasks.ets(108:9)", "entry");
            Button.width('25%');
            Button.height(48);
            Button.backgroundColor('#4CAF50');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.borderRadius(24);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.addTask();
            });
            Button.scale({ x: this.state.animationState.buttonScale, y: this.state.animationState.buttonScale });
            Button.opacity(this.state.animationState.buttonOpacity);
        }, Button);
        Button.pop();
        // 添加任务区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 任务列表
            List.create();
            List.debugLine("entry/src/main/ets/pages/Tasks.ets(127:7)", "entry");
            // 任务列表
            List.width('100%');
            // 任务列表
            List.layoutWeight(1);
            // 任务列表
            List.padding({ left: 20, right: 20 });
            // 任务列表
            List.scale({ x: this.state.animationState.listScale, y: this.state.animationState.listScale });
            // 任务列表
            List.opacity(this.state.animationState.listOpacity);
        }, List);
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
                        ListItem.debugLine("entry/src/main/ets/pages/Tasks.ets(129:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/Tasks.ets(130:13)", "entry");
                            Row.width('100%');
                            Row.padding(16);
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(12);
                            Row.margin({ bottom: 8 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Checkbox.create({
                                selected: task.completed,
                                onChange: (value: boolean) => {
                                    this.toggleTask(task.id);
                                }
                            });
                            Checkbox.debugLine("entry/src/main/ets/pages/Tasks.ets(131:15)", "entry");
                            Checkbox.margin({ right: 12 });
                        }, Checkbox);
                        Checkbox.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(task.title);
                            Text.debugLine("entry/src/main/ets/pages/Tasks.ets(139:15)", "entry");
                            Text.fontSize(16);
                            Text.fontColor(task.completed ? '#95A5A6' : '#2C3E50');
                            Text.decoration(task.completed ? TextDecorationType.LineThrough : TextDecorationType.None);
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create($r('app.media.ic_public_delete'));
                            Image.debugLine("entry/src/main/ets/pages/Tasks.ets(145:15)", "entry");
                            Image.width(20);
                            Image.height(20);
                            Image.fillColor('#E74C3C');
                            Image.onClick(() => {
                                this.deleteTask(task.id);
                            });
                        }, Image);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.filteredTasks, forEachItemGenFunction, (task: Task) => task.id, false, false);
        }, ForEach);
        ForEach.pop();
        // 任务列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部控制区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Tasks.ets(168:7)", "entry");
            // 底部控制区域
            Row.width('100%');
            // 底部控制区域
            Row.padding({ left: 20, right: 20, bottom: 20 });
            // 底部控制区域
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.state.showCompleted });
            Toggle.debugLine("entry/src/main/ets/pages/Tasks.ets(169:9)", "entry");
            Toggle.onChange((value: boolean) => {
                this.state.showCompleted = value;
            });
        }, Toggle);
        Toggle.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('显示已完成任务');
            Text.debugLine("entry/src/main/ets/pages/Tasks.ets(174:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#7F8C8D');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 底部控制区域
        Row.pop();
        Column.pop();
    }
    private addTask() {
        if (this.state.newTaskTitle.trim()) {
            const newTask: Task = {
                id: Date.now().toString(),
                title: this.state.newTaskTitle.trim(),
                completed: false,
                createdAt: new Date()
            };
            this.state.tasks.push(newTask);
            this.state.newTaskTitle = '';
        }
    }
    private toggleTask(taskId: string) {
        const task = this.state.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }
    private deleteTask(taskId: string) {
        const index = this.state.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            this.state.tasks.splice(index, 1);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Tasks";
    }
}
registerNamedRoute(() => new Tasks(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Tasks", pageFullPath: "entry/src/main/ets/pages/Tasks", integratedHsp: "false", moduleType: "followWithHap" });
