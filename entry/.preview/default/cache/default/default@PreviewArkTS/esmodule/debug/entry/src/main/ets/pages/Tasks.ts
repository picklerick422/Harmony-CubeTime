if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Tasks_Params {
    tasks?: Array<Task>;
}
interface Task {
    id: string;
    title: string;
    completed: boolean;
}
class Tasks extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tasks = new ObservedPropertyObjectPU([
            { id: '1', title: '完成项目报告', completed: false },
            { id: '2', title: '学习鸿蒙开发', completed: true },
            { id: '3', title: '锻炼身体', completed: false }
        ], this, "tasks");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Tasks_Params) {
        if (params.tasks !== undefined) {
            this.tasks = params.tasks;
        }
    }
    updateStateVars(params: Tasks_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tasks.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tasks.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tasks: ObservedPropertyObjectPU<Array<Task>>;
    get tasks() {
        return this.__tasks.get();
    }
    set tasks(newValue: Array<Task>) {
        this.__tasks.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Tasks.ets(17:5)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待办事项');
            Text.debugLine("entry/src/main/ets/pages/Tasks.ets(18:7)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin(16);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.debugLine("entry/src/main/ets/pages/Tasks.ets(23:7)", "entry");
            List.layoutWeight(1);
            List.padding(16);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
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
                        ListItem.debugLine("entry/src/main/ets/pages/Tasks.ets(25:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/Tasks.ets(26:13)", "entry");
                            Row.width('100%');
                            Row.padding(16);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.debugLine("entry/src/main/ets/pages/Tasks.ets(27:15)", "entry");
                            Text.fontSize(16);
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.completed ? '已完成' : '未完成');
                            Text.debugLine("entry/src/main/ets/pages/Tasks.ets(31:15)", "entry");
                            Text.fontSize(14);
                            Text.fontColor(item.completed ? '#10B981' : '#EF4444');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.tasks, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Tasks";
    }
}
registerNamedRoute(() => new Tasks(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Tasks", pageFullPath: "entry/src/main/ets/pages/Tasks", integratedHsp: "false", moduleType: "followWithHap" });
