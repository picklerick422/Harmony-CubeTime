if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Tasks_Params {
    state?: TasksState;
}
import { NavigationManager } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
import type { PageAnimationState } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
import { transitionManager } from "@bundle:com.example.cubetime/entry/ets/utils/PageTransitionManager";
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
    animationState: PageAnimationState;
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
                buttonScale: 0.8,
                buttonOpacity: 0,
                listOpacity: 0,
                calendarOpacity: 0,
                sectionOpacity: 0
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
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F7FA');
            Column.scale({ x: this.state.animationState.contentScale, y: this.state.animationState.contentScale });
            Column.opacity(this.state.animationState.contentOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题区域
            Row.create();
            // 标题区域
            Row.width('100%');
            // 标题区域
            Row.padding({ left: 20, right: 20, top: 60, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('任务管理');
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
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                // 返回首页的退出动画
                Context.animateToImmediately({ duration: 300, curve: Curve.EaseIn }, () => {
                    this.state.animationState.contentScale = 0.95;
                    this.state.animationState.contentOpacity = 0;
                    this.state.animationState.titleTranslateY = -20;
                    this.state.animationState.titleOpacity = 0;
                    this.state.animationState.buttonScale = 0.8;
                    this.state.animationState.buttonOpacity = 0;
                    this.state.animationState.listOpacity = 0;
                });
                setTimeout(() => {
                    transitionManager.navigateTo('pages/Index').catch((err: Error) => {
                        console.error('Navigation failed:', err);
                    });
                }, 300);
            });
        }, Image);
        // 标题区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加任务区域
            Row.create();
            // 添加任务区域
            Row.width('100%');
            // 添加任务区域
            Row.padding({ left: 20, right: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '添加新任务...', text: this.state.newTaskTitle });
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding(16);
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(12);
                            Row.margin({ bottom: 8 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Checkbox.create();
                            Checkbox.select(task.completed);
                            Checkbox.onChange((value: boolean) => {
                                this.toggleTask(task.id);
                            });
                            Checkbox.margin({ right: 12 });
                        }, Checkbox);
                        Checkbox.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(task.title);
                            Text.fontSize(16);
                            Text.fontColor(task.completed ? '#95A5A6' : '#2C3E50');
                            Text.decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None });
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
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
            // 底部控制区域
            Row.width('100%');
            // 底部控制区域
            Row.padding({ left: 20, right: 20, bottom: 20 });
            // 底部控制区域
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.state.showCompleted });
            Toggle.onChange((value: boolean) => {
                this.state.showCompleted = value;
            });
        }, Toggle);
        Toggle.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('显示已完成任务');
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
