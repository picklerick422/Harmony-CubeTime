if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TestEntry_Params {
}
import router from "@ohos:router";
class TestEntry extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TestEntry_Params) {
    }
    updateStateVars(params: TestEntry_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.backgroundColor('#F5F7FA');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('测试导航页面');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 32 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('测试番茄时钟');
            Button.width('80%');
            Button.height(48);
            Button.backgroundColor('#10B981');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(24);
            Button.margin({ bottom: 16 });
            Button.onClick(() => {
                console.info('开始导航到番茄时钟页面...');
                router.pushUrl({ url: 'pages/Pomodoro' })
                    .then(() => {
                    console.info('成功导航到番茄时钟页面');
                })
                    .catch((error: Error) => {
                    console.error('导航到番茄时钟页面失败:', error);
                });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('测试日历页面');
            Button.width('80%');
            Button.height(48);
            Button.backgroundColor('#3B82F6');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(24);
            Button.margin({ bottom: 16 });
            Button.onClick(() => {
                console.info('开始导航到日历页面...');
                router.pushUrl({ url: 'pages/Calendar' })
                    .then(() => {
                    console.info('成功导航到日历页面');
                })
                    .catch((error: Error) => {
                    console.error('导航到日历页面失败:', error);
                });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('测试任务页面');
            Button.width('80%');
            Button.height(48);
            Button.backgroundColor('#6366F1');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(24);
            Button.onClick(() => {
                console.info('开始导航到任务页面...');
                router.pushUrl({ url: 'pages/Tasks' })
                    .then(() => {
                    console.info('成功导航到任务页面');
                })
                    .catch((error: Error) => {
                    console.error('导航到任务页面失败:', error);
                });
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TestEntry";
    }
}
registerNamedRoute(() => new TestEntry(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/TestEntry", pageFullPath: "entry/src/main/ets/pages/TestEntry", integratedHsp: "false", moduleType: "followWithHap" });
