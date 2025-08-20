if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SettingsPage_Params {
    settingsItems?: SettingsItem[];
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
        if (params.settingsItems !== undefined) {
            this.settingsItems = params.settingsItems;
        }
    }
    updateStateVars(params: SettingsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingsItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingsItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingsItems: ObservedPropertyObjectPU<SettingsItem[]>;
    get settingsItems() {
        return this.__settingsItems.get();
    }
    set settingsItems(newValue: SettingsItem[]) {
        this.__settingsItems.set(newValue);
    }
    private updateSetting(key: string, value: string) {
        const itemIndex = this.settingsItems.findIndex(item => item.key === key);
        if (itemIndex !== -1) {
            this.settingsItems[itemIndex].value = value;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F9FAFB');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题
            Row.create();
            // 顶部标题
            Row.width('100%');
            // 顶部标题
            Row.padding(16);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        // 顶部标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置列表
            List.create({ space: 12 });
            // 设置列表
            List.layoutWeight(1);
            // 设置列表
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('100%');
                            Column.padding(16);
                            Column.backgroundColor('#FFFFFF');
                            Column.borderRadius(12);
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
            this.forEachUpdateFunction(elmtId, this.settingsItems, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 设置列表
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
            Text.create('1.0.0');
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
            Text.create('番茄工作法团队');
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
            Text.create('support@pomodoro.com');
            Text.fontSize(14);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        // 关于应用
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航
            Row.create();
            // 底部导航
            Row.width('100%');
            // 底部导航
            Row.padding({ top: 12, bottom: 8 });
            // 底部导航
            Row.backgroundColor('#FFFFFF');
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
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Text.fontSize(12);
            Text.fontColor('#10B981');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                router.pushUrl({ url: 'pages/Pomodoro' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('番茄时钟');
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                router.pushUrl({ url: 'pages/Tasks' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待办');
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                router.pushUrl({ url: 'pages/Calendar' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('日历');
            Text.fontSize(12);
            Text.fontColor('#6B7280');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('20%');
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                router.back();
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
registerNamedRoute(() => new SettingsPage(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Settings", pageFullPath: "entry/src/main/ets/pages/Settings", integratedHsp: "false", moduleType: "followWithHap" });
