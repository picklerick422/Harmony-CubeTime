if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Settings_Params {
    state?: SettingsState;
}
interface SettingsPage_Params {
    buttonOpacity?: number;
    buttonScale?: number;
    timerOpacity?: number;
    timerScale?: number;
    navOpacity?: number;
    navScale?: number;
    titleScale?: number;
    titleOpacity?: number;
    cardScale?: number;
    cardOpacity?: number;
    itemScale?: number;
    itemOpacity?: number;
    itemScales?: number[];
    itemOpacities?: number[];
    aboutScale?: number;
    aboutOpacity?: number;
    bottomNavScale?: number;
    bottomNavOpacity?: number;
    settingsItems?: SettingsItem[];
}
import router from "@ohos:router";
import { NavigationManager, NavigationHelper } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
import type { PageAnimationState } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
class OptionItem {
    value: string;
    label: string;
    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}
class SettingsItem {
    key: string;
    title: string;
    description: string;
    type: string;
    options: OptionItem[];
    value: string;
    constructor(key: string, title: string, description: string, type: string, options: OptionItem[], value: string) {
        this.key = key;
        this.title = title;
        this.description = description;
        this.type = type;
        this.options = options;
        this.value = value;
    }
}
class SettingsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.buttonOpacity = 1;
        this.buttonScale = 1;
        this.timerOpacity = 1;
        this.timerScale = 1;
        this.navOpacity = 1;
        this.navScale = 1;
        this.__titleScale = new ObservedPropertySimplePU(0.8, this, "titleScale");
        this.__titleOpacity = new ObservedPropertySimplePU(0, this, "titleOpacity");
        this.__cardScale = new ObservedPropertySimplePU(0.9, this, "cardScale");
        this.__cardOpacity = new ObservedPropertySimplePU(0, this, "cardOpacity");
        this.__itemScale = new ObservedPropertySimplePU(0.8, this, "itemScale");
        this.__itemOpacity = new ObservedPropertySimplePU(0
        // 每个设置项的独立动画状态
        , this, "itemOpacity");
        this.__itemScales = new ObservedPropertyObjectPU([0.8, 0.8, 0.8, 0.8, 0.8, 0.8], this, "itemScales");
        this.__itemOpacities = new ObservedPropertyObjectPU([0, 0, 0, 0, 0, 0], this, "itemOpacities");
        this.__aboutScale = new ObservedPropertySimplePU(0.9, this, "aboutScale");
        this.__aboutOpacity = new ObservedPropertySimplePU(0, this, "aboutOpacity");
        this.__bottomNavScale = new ObservedPropertySimplePU(0.9, this, "bottomNavScale");
        this.__bottomNavOpacity = new ObservedPropertySimplePU(0, this, "bottomNavOpacity");
        this.__settingsItems = new ObservedPropertyObjectPU([
            new SettingsItem('theme', '主题模式', '选择应用的主题颜色', 'select', [
                new OptionItem('light', '浅色'),
                new OptionItem('dark', '深色'),
                new OptionItem('auto', '跟随系统')
            ], 'light'),
            new SettingsItem('pomodoro_duration', '番茄钟时长', '设置一个番茄钟的时间长度', 'select', [
                new OptionItem('15', '15分钟'),
                new OptionItem('25', '25分钟'),
                new OptionItem('30', '30分钟'),
                new OptionItem('45', '45分钟')
            ], '25'),
            new SettingsItem('short_break', '短休息时长', '设置短休息的时间长度', 'select', [
                new OptionItem('3', '3分钟'),
                new OptionItem('5', '5分钟'),
                new OptionItem('10', '10分钟')
            ], '5'),
            new SettingsItem('long_break', '长休息时长', '设置长休息的时间长度', 'select', [
                new OptionItem('15', '15分钟'),
                new OptionItem('20', '20分钟'),
                new OptionItem('30', '30分钟')
            ], '15'),
            new SettingsItem('notifications', '通知提醒', '开启或关闭通知提醒', 'toggle', [], 'true'),
            new SettingsItem('sound', '提示音', '开启或关闭提示音', 'toggle', [], 'true')
        ], this, "settingsItems");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SettingsPage_Params) {
        if (params.buttonOpacity !== undefined) {
            this.buttonOpacity = params.buttonOpacity;
        }
        if (params.buttonScale !== undefined) {
            this.buttonScale = params.buttonScale;
        }
        if (params.timerOpacity !== undefined) {
            this.timerOpacity = params.timerOpacity;
        }
        if (params.timerScale !== undefined) {
            this.timerScale = params.timerScale;
        }
        if (params.navOpacity !== undefined) {
            this.navOpacity = params.navOpacity;
        }
        if (params.navScale !== undefined) {
            this.navScale = params.navScale;
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
        if (params.itemScale !== undefined) {
            this.itemScale = params.itemScale;
        }
        if (params.itemOpacity !== undefined) {
            this.itemOpacity = params.itemOpacity;
        }
        if (params.itemScales !== undefined) {
            this.itemScales = params.itemScales;
        }
        if (params.itemOpacities !== undefined) {
            this.itemOpacities = params.itemOpacities;
        }
        if (params.aboutScale !== undefined) {
            this.aboutScale = params.aboutScale;
        }
        if (params.aboutOpacity !== undefined) {
            this.aboutOpacity = params.aboutOpacity;
        }
        if (params.bottomNavScale !== undefined) {
            this.bottomNavScale = params.bottomNavScale;
        }
        if (params.bottomNavOpacity !== undefined) {
            this.bottomNavOpacity = params.bottomNavOpacity;
        }
        if (params.settingsItems !== undefined) {
            this.settingsItems = params.settingsItems;
        }
    }
    updateStateVars(params: SettingsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__titleScale.purgeDependencyOnElmtId(rmElmtId);
        this.__titleOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
        this.__cardOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__itemScale.purgeDependencyOnElmtId(rmElmtId);
        this.__itemOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__itemScales.purgeDependencyOnElmtId(rmElmtId);
        this.__itemOpacities.purgeDependencyOnElmtId(rmElmtId);
        this.__aboutScale.purgeDependencyOnElmtId(rmElmtId);
        this.__aboutOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomNavScale.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomNavOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__settingsItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__titleScale.aboutToBeDeleted();
        this.__titleOpacity.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__cardOpacity.aboutToBeDeleted();
        this.__itemScale.aboutToBeDeleted();
        this.__itemOpacity.aboutToBeDeleted();
        this.__itemScales.aboutToBeDeleted();
        this.__itemOpacities.aboutToBeDeleted();
        this.__aboutScale.aboutToBeDeleted();
        this.__aboutOpacity.aboutToBeDeleted();
        this.__bottomNavScale.aboutToBeDeleted();
        this.__bottomNavOpacity.aboutToBeDeleted();
        this.__settingsItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private buttonOpacity: number;
    private buttonScale: number;
    private timerOpacity: number;
    private timerScale: number;
    private navOpacity: number;
    private navScale: number;
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
    private __itemScale: ObservedPropertySimplePU<number>;
    get itemScale() {
        return this.__itemScale.get();
    }
    set itemScale(newValue: number) {
        this.__itemScale.set(newValue);
    }
    private __itemOpacity: ObservedPropertySimplePU<number>;
    get itemOpacity() {
        return this.__itemOpacity.get();
    }
    set itemOpacity(newValue: number) {
        this.__itemOpacity.set(newValue);
    }
    // 每个设置项的独立动画状态
    private __itemScales: ObservedPropertyObjectPU<number[]>;
    get itemScales() {
        return this.__itemScales.get();
    }
    set itemScales(newValue: number[]) {
        this.__itemScales.set(newValue);
    }
    private __itemOpacities: ObservedPropertyObjectPU<number[]>;
    get itemOpacities() {
        return this.__itemOpacities.get();
    }
    set itemOpacities(newValue: number[]) {
        this.__itemOpacities.set(newValue);
    }
    private __aboutScale: ObservedPropertySimplePU<number>;
    get aboutScale() {
        return this.__aboutScale.get();
    }
    set aboutScale(newValue: number) {
        this.__aboutScale.set(newValue);
    }
    private __aboutOpacity: ObservedPropertySimplePU<number>;
    get aboutOpacity() {
        return this.__aboutOpacity.get();
    }
    set aboutOpacity(newValue: number) {
        this.__aboutOpacity.set(newValue);
    }
    private __bottomNavScale: ObservedPropertySimplePU<number>;
    get bottomNavScale() {
        return this.__bottomNavScale.get();
    }
    set bottomNavScale(newValue: number) {
        this.__bottomNavScale.set(newValue);
    }
    private __bottomNavOpacity: ObservedPropertySimplePU<number>;
    get bottomNavOpacity() {
        return this.__bottomNavOpacity.get();
    }
    set bottomNavOpacity(newValue: number) {
        this.__bottomNavOpacity.set(newValue);
    }
    private __settingsItems: ObservedPropertyObjectPU<SettingsItem[]>;
    get settingsItems() {
        return this.__settingsItems.get();
    }
    set settingsItems(newValue: SettingsItem[]) {
        this.__settingsItems.set(newValue);
    }
    private updateSetting(key: string, value: string): void {
        const itemIndex = this.settingsItems.findIndex(item => item.key === key);
        if (itemIndex !== -1) {
            this.settingsItems[itemIndex].value = value;
        }
    }
    // 页面入场动画 - 每个元素依次出现
    private animateIn(): void {
        // 标题动画 - 第1个出现
        Context.animateToImmediately({ duration: 400, curve: Curve.EaseOut }, () => {
            this.titleScale = 1;
            this.titleOpacity = 1;
        });
        // 设置项动画 - 依次出现，每个间隔100ms
        this.settingsItems.forEach((_, index) => {
            Context.animateToImmediately({
                duration: 400,
                curve: Curve.EaseOut,
                delay: 100 + index * 100
            }, () => {
                this.itemScales[index] = 1;
                this.itemOpacities[index] = 1;
            });
        });
        // 关于应用卡片 - 倒数第2个出现
        Context.animateToImmediately({
            duration: 400,
            curve: Curve.EaseOut,
            delay: 100 + this.settingsItems.length * 100 + 100
        }, () => {
            this.aboutScale = 1;
            this.aboutOpacity = 1;
        });
        // 底部导航 - 最后一个出现
        Context.animateToImmediately({
            duration: 400,
            curve: Curve.EaseOut,
            delay: 100 + this.settingsItems.length * 100 + 200
        }, () => {
            this.bottomNavScale = 1;
            this.bottomNavOpacity = 1;
        });
    }
    aboutToAppear(): void {
        // 首次进入时直接执行动画，不重置状态
        this.animateIn();
        // 注册系统返回事件监听
        this.registerBackPressListener();
    }
    private animateTransition(duration: number = 250): void {
        this.animateOut();
    }
    onPageShow(): void {
        // 页面重新显示时重置可见性和动画
        this.resetVisibility();
        this.animateIn();
    }
    onBackPress(): boolean | void {
        // 系统返回时执行退出动画
        this.animateOut();
        return true; // 阻止默认返回行为，由动画完成后处理
    }
    private animateOut(targetUrl?: string): void {
        // 反向依次消失动画
        // 底部导航先消失
        Context.animateToImmediately({ duration: 200, curve: Curve.Friction }, () => {
            this.bottomNavOpacity = 0;
            this.bottomNavScale = 0.7;
        });
        // 关于应用卡片消失
        Context.animateToImmediately({ duration: 200, curve: Curve.Friction, delay: 50 }, () => {
            this.aboutOpacity = 0;
            this.aboutScale = 0.7;
        });
        // 设置项依次消失（反向顺序）
        this.settingsItems.forEach((_, index) => {
            Context.animateToImmediately({
                duration: 200,
                curve: Curve.Friction,
                delay: 100 + (this.settingsItems.length - 1 - index) * 50
            }, () => {
                this.itemOpacities[index] = 0;
                this.itemScales[index] = 0.7;
            });
        });
        // 标题最后消失
        Context.animateToImmediately({
            duration: 200,
            curve: Curve.Friction,
            delay: 200 + this.settingsItems.length * 50,
            onFinish: () => {
                if (targetUrl) {
                    router.replaceUrl({
                        url: targetUrl
                    });
                }
                else {
                    router.back();
                }
            }
        }, () => {
            this.titleOpacity = 0;
            this.titleScale = 0.7;
        });
    }
    private registerBackPressListener(): void {
        // 注册系统返回事件
        // HarmonyOS会自动调用onBackPress方法
    }
    private resetVisibility(): void {
        // 重置为初始隐藏状态，用于入场动画
        this.titleScale = 0.8;
        this.titleOpacity = 0;
        this.cardScale = 0.8;
        this.cardOpacity = 0;
        this.aboutScale = 0.9;
        this.aboutOpacity = 0;
        this.bottomNavScale = 0.9;
        this.bottomNavOpacity = 0;
        // 重置每个设置项的状态
        this.itemScales = new Array(this.settingsItems.length).fill(0.8);
        this.itemOpacities = new Array(this.settingsItems.length).fill(0);
    }
    // 生成打乱步骤
    private generateScramble(): string {
        const moves = ["R", "U", "F", "L", "D", "B"];
        const modifiers = ["", "'", "2"];
        let scramble = "";
        for (let i = 0; i < 20; i++) {
            scramble += moves[Math.floor(Math.random() * moves.length)] +
                modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
        }
        return scramble.trim();
    }
    // 加载最佳时间
    private loadBestTime(): number {
        return 0;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F9FAFB');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏 - 与状态栏融合
            Column.create();
            // 顶部标题栏 - 与状态栏融合
            Column.width('100%');
            // 顶部标题栏 - 与状态栏融合
            Column.backgroundColor('#6366F1');
            // 顶部标题栏 - 与状态栏融合
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
            Text.create('设置');
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
        // 顶部标题栏 - 与状态栏融合
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置列表 - 添加弹性滑动
            List.create({ space: 12 });
            // 设置列表 - 添加弹性滑动
            List.layoutWeight(1);
            // 设置列表 - 添加弹性滑动
            List.padding(16);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('100%');
                            Column.padding(16);
                            Column.backgroundColor('#FFFFFF');
                            Column.borderRadius(12);
                            Column.scale({ x: this.itemScales[index], y: this.itemScales[index] });
                            Column.opacity(this.itemOpacities[index]);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Medium);
                            Text.fontColor('#1F2937');
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (item.type === 'toggle') {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Toggle.create({ type: ToggleType.Switch, isOn: item.value === 'true' });
                                        Toggle.selectedColor('#10B981');
                                        Toggle.onChange((isOn: boolean) => {
                                            this.updateSetting(item.key, isOn ? 'true' : 'false');
                                        });
                                    }, Toggle);
                                    Toggle.pop();
                                });
                            }
                            else if (item.type === 'select') {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Select.create(item.options);
                                        Select.selected(item.options.findIndex(option => option.value === item.value));
                                        Select.onSelect((index: number) => {
                                            this.updateSetting(item.key, item.options[index].value);
                                        });
                                        Select.width(100);
                                        Select.height(32);
                                        Select.backgroundColor('#F3F4F6');
                                        Select.borderRadius(8);
                                    }, Select);
                                    Select.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(2, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.description);
                            Text.fontSize(14);
                            Text.fontColor('#6B7280');
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.settingsItems, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 设置列表 - 添加弹性滑动
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关于应用
            Column.create();
            // 关于应用
            Column.width('100%');
            // 关于应用
            Column.padding({ left: 16, right: 16, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关于应用');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.scale({ x: this.aboutScale, y: this.aboutScale });
            Column.opacity(this.aboutOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('版本');
            Text.fontSize(14);
            Text.fontColor('#1F2937');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('v1.0.0');
            Text.fontSize(14);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('开发者');
            Text.fontSize(14);
            Text.fontColor('#1F2937');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('GIthub: picklerick422');
            Text.fontSize(14);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('联系邮箱');
            Text.fontSize(14);
            Text.fontColor('#1F2937');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('971711470@qq.com');
            Text.fontSize(14);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        // 关于应用
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //.backgroundColor('#FFFFFF')
            // 底部导航
            Row.create();
            //.backgroundColor('#FFFFFF')
            // 底部导航
            Row.width('100%');
            //.backgroundColor('#FFFFFF')
            // 底部导航
            Row.padding({ top: 12, bottom: 8 });
            //.backgroundColor('#FFFFFF')
            // 底部导航
            Row.backgroundColor('#FFFFFF');
            //.backgroundColor('#FFFFFF')
            // 底部导航
            Row.border({
                width: { top: 1 },
                color: '#E5E7EB'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#10B981');
            Image.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Image.opacity(this.bottomNavOpacity);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Text.fontSize(12);
            Text.fontColor('#10B981');
            Text.margin({ top: 4 });
            Text.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Text.opacity(this.bottomNavOpacity);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                // 快速退出动画 - 所有元素依次消失，跳转到番茄时钟
                this.animateOut('pages/Pomodoro');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Image.opacity(this.bottomNavOpacity);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('番茄时钟');
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
            Text.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Text.opacity(this.bottomNavOpacity);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                // 快速退出动画 - 所有元素依次消失，跳转到待办
                this.animateOut('pages/Tasks');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Image.opacity(this.bottomNavOpacity);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待办');
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
            Text.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Text.opacity(this.bottomNavOpacity);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                // 快速退出动画 - 所有元素依次消失，跳转到日历
                this.animateOut('pages/Calendar');
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Image.opacity(this.bottomNavOpacity);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('日历');
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
            Text.scale({ x: this.bottomNavScale, y: this.bottomNavScale });
            Text.opacity(this.bottomNavOpacity);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                // 快速返回动画 - 使用统一的animateOut方法
                this.animateOut();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.rotate({ angle: 180 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('返回');
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        //.backgroundColor('#FFFFFF')
        // 底部导航
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SettingsPage";
    }
}
interface SettingsState {
    notificationsEnabled: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    workDuration: number;
    breakDuration: number;
    navigationManager?: NavigationManager;
    animationState: PageAnimationState;
}
class Settings extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertyObjectPU({
            notificationsEnabled: true,
            soundEnabled: true,
            vibrationEnabled: true,
            workDuration: 25,
            breakDuration: 5,
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
    setInitiallyProvidedValue(params: Settings_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
    }
    updateStateVars(params: Settings_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __state: ObservedPropertyObjectPU<SettingsState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: SettingsState) {
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
            Text.create('设置');
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
                NavigationHelper.navigateBack(this.state.navigationManager);
            });
        }, Image);
        // 标题区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置内容区域
            Scroll.create();
            // 设置内容区域
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 通知设置
            Column.create();
            // 通知设置
            Column.width('100%');
            // 通知设置
            Column.padding(20);
            // 通知设置
            Column.backgroundColor('#FFFFFF');
            // 通知设置
            Column.borderRadius(16);
            // 通知设置
            Column.margin({ left: 20, right: 20, bottom: 16 });
            // 通知设置
            Column.scale({ x: this.state.animationState.sectionScale, y: this.state.animationState.sectionScale });
            // 通知设置
            Column.opacity(this.state.animationState.sectionOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('通知设置');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('启用通知');
            Text.fontSize(16);
            Text.fontColor('#2C3E50');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.state.notificationsEnabled });
            Toggle.onChange((value: boolean) => {
                this.state.notificationsEnabled = value;
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('声音提醒');
            Text.fontSize(16);
            Text.fontColor('#2C3E50');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.state.soundEnabled });
            Toggle.onChange((value: boolean) => {
                this.state.soundEnabled = value;
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('振动提醒');
            Text.fontSize(16);
            Text.fontColor('#2C3E50');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.state.vibrationEnabled });
            Toggle.onChange((value: boolean) => {
                this.state.vibrationEnabled = value;
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        // 通知设置
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 时间设置
            Column.create();
            // 时间设置
            Column.width('100%');
            // 时间设置
            Column.padding(20);
            // 时间设置
            Column.backgroundColor('#FFFFFF');
            // 时间设置
            Column.borderRadius(16);
            // 时间设置
            Column.margin({ left: 20, right: 20, bottom: 16 });
            // 时间设置
            Column.scale({ x: this.state.animationState.sectionScale, y: this.state.animationState.sectionScale });
            // 时间设置
            Column.opacity(this.state.animationState.sectionOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('时间设置');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('工作时间（分钟）');
            Text.fontSize(16);
            Text.fontColor('#2C3E50');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.state.workDuration.toString());
            Text.fontSize(16);
            Text.fontColor('#7F8C8D');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('休息时间（分钟）');
            Text.fontSize(16);
            Text.fontColor('#2C3E50');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.state.breakDuration.toString());
            Text.fontSize(16);
            Text.fontColor('#7F8C8D');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.state.workDuration,
                min: 15,
                max: 60,
                step: 5
            });
            Slider.width('100%');
            Slider.onChange((value: number) => {
                this.state.workDuration = value;
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.state.breakDuration,
                min: 5,
                max: 30,
                step: 5
            });
            Slider.width('100%');
            Slider.onChange((value: number) => {
                this.state.breakDuration = value;
            });
        }, Slider);
        // 时间设置
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关于应用
            Column.create();
            // 关于应用
            Column.width('100%');
            // 关于应用
            Column.padding(20);
            // 关于应用
            Column.backgroundColor('#FFFFFF');
            // 关于应用
            Column.borderRadius(16);
            // 关于应用
            Column.margin({ left: 20, right: 20 });
            // 关于应用
            Column.scale({ x: this.state.animationState.sectionScale, y: this.state.animationState.sectionScale });
            // 关于应用
            Column.opacity(this.state.animationState.sectionOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关于应用');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('版本');
            Text.fontSize(16);
            Text.fontColor('#2C3E50');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1.0.0');
            Text.fontSize(16);
            Text.fontColor('#7F8C8D');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('开发者');
            Text.fontSize(16);
            Text.fontColor('#2C3E50');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('鸿蒙团队');
            Text.fontSize(16);
            Text.fontColor('#7F8C8D');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置所有设置');
            Button.width('100%');
            Button.height(48);
            Button.backgroundColor('#E74C3C');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.borderRadius(24);
            Button.onClick(() => {
                this.resetSettings();
            });
            Button.scale({ x: this.state.animationState.buttonScale, y: this.state.animationState.buttonScale });
            Button.opacity(this.state.animationState.buttonOpacity);
        }, Button);
        Button.pop();
        // 关于应用
        Column.pop();
        Column.pop();
        // 设置内容区域
        Scroll.pop();
        Column.pop();
    }
    private resetSettings() {
        this.state.notificationsEnabled = true;
        this.state.soundEnabled = true;
        this.state.vibrationEnabled = true;
        this.state.workDuration = 25;
        this.state.breakDuration = 5;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new SettingsPage(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Settings", pageFullPath: "entry/src/main/ets/pages/Settings", integratedHsp: "false", moduleType: "followWithHap" });
