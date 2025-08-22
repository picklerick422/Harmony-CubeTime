if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SplashPage_Params {
    timer?: number;
}
import { NavigationManager } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
class SplashPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.timer = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SplashPage_Params) {
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    updateStateVars(params: SplashPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private timer: number;
    aboutToAppear() {
        // 3秒后跳转到首页，使用淡入淡出效果
        this.timer = setTimeout(() => {
            Context.animateToImmediately({
                duration: 500,
                curve: Curve.EaseInOut,
                onFinish: () => {
                    NavigationManager.getInstance().replaceTo('Index');
                }
            }, () => {
                // 淡出动画
            });
        }, 3000);
    }
    aboutToDisappear() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 应用图标
            Image.create({ "id": 16777248, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            // 应用图标
            Image.width(100);
            // 应用图标
            Image.height(100);
            // 应用图标
            Image.borderRadius(20);
            // 应用图标
            Image.shadow({
                radius: 20,
                color: '#6366F133',
                offsetX: 0,
                offsetY: 10
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 应用名称
            Text.create('CubeTime');
            // 应用名称
            Text.fontSize(32);
            // 应用名称
            Text.fontWeight(FontWeight.Bold);
            // 应用名称
            Text.fontColor('#1F2937');
            // 应用名称
            Text.margin({ top: 24 });
        }, Text);
        // 应用名称
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 副标题
            Text.create('智能时间管理');
            // 副标题
            Text.fontSize(16);
            // 副标题
            Text.fontColor('#6B7280');
            // 副标题
            Text.margin({ top: 8 });
        }, Text);
        // 副标题
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SplashPage";
    }
}
registerNamedRoute(() => new SplashPage(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Splash", pageFullPath: "entry/src/main/ets/pages/Splash", integratedHsp: "false", moduleType: "followWithHap" });
