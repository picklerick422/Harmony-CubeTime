if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CubeDetail_Params {
    cubeStateManager?: CubeStateManager;
    notificationService?: NotificationService;
    cubeConnected?: boolean;
    batteryLevel?: number;
    bluetoothStatus?: string;
    currentFace?: string;
    currentMode?: string;
    cubeOrientation?: CubeOrientation;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
    autoRotate?: boolean;
    totalUsageTime?: number;
    todayUsageTime?: number;
    sessionCount?: number;
    lastSyncTime?: string;
    accelerometerData?: Array<number>;
    gyroscopeData?: Array<number>;
}
import { NavigationManager } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
import CubeStateManager from "@bundle:com.example.cubetime/entry/ets/services/CubeStateManager";
import NotificationService from "@bundle:com.example.cubetime/entry/ets/services/NotificationService";
import { Cube3DView } from "@bundle:com.example.cubetime/entry/ets/components/Cube3DView";
interface CubeOrientation {
    x: number;
    y: number;
    z: number;
    face: string;
}
class CubeDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.cubeStateManager = CubeStateManager.getInstance();
        this.notificationService = NotificationService.getInstance();
        this.__cubeConnected = new ObservedPropertySimplePU(false, this, "cubeConnected");
        this.__batteryLevel = new ObservedPropertySimplePU(85, this, "batteryLevel");
        this.__bluetoothStatus = new ObservedPropertySimplePU('已连接', this, "bluetoothStatus");
        this.__currentFace = new ObservedPropertySimplePU('白色面', this, "currentFace");
        this.__currentMode = new ObservedPropertySimplePU('学习模式', this, "currentMode");
        this.__cubeOrientation = new ObservedPropertyObjectPU({ x: 0, y: 0, z: 0, face: '白色面' }, this, "cubeOrientation");
        this.__rotationX = new ObservedPropertySimplePU(0, this, "rotationX");
        this.__rotationY = new ObservedPropertySimplePU(0, this, "rotationY");
        this.__rotationZ = new ObservedPropertySimplePU(0, this, "rotationZ");
        this.__autoRotate = new ObservedPropertySimplePU(true, this, "autoRotate");
        this.__totalUsageTime = new ObservedPropertySimplePU(0, this, "totalUsageTime");
        this.__todayUsageTime = new ObservedPropertySimplePU(0, this, "todayUsageTime");
        this.__sessionCount = new ObservedPropertySimplePU(0, this, "sessionCount");
        this.__lastSyncTime = new ObservedPropertySimplePU('', this, "lastSyncTime");
        this.__accelerometerData = new ObservedPropertyObjectPU([0, 0, 0], this, "accelerometerData");
        this.__gyroscopeData = new ObservedPropertyObjectPU([0, 0, 0], this, "gyroscopeData");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CubeDetail_Params) {
        if (params.cubeStateManager !== undefined) {
            this.cubeStateManager = params.cubeStateManager;
        }
        if (params.notificationService !== undefined) {
            this.notificationService = params.notificationService;
        }
        if (params.cubeConnected !== undefined) {
            this.cubeConnected = params.cubeConnected;
        }
        if (params.batteryLevel !== undefined) {
            this.batteryLevel = params.batteryLevel;
        }
        if (params.bluetoothStatus !== undefined) {
            this.bluetoothStatus = params.bluetoothStatus;
        }
        if (params.currentFace !== undefined) {
            this.currentFace = params.currentFace;
        }
        if (params.currentMode !== undefined) {
            this.currentMode = params.currentMode;
        }
        if (params.cubeOrientation !== undefined) {
            this.cubeOrientation = params.cubeOrientation;
        }
        if (params.rotationX !== undefined) {
            this.rotationX = params.rotationX;
        }
        if (params.rotationY !== undefined) {
            this.rotationY = params.rotationY;
        }
        if (params.rotationZ !== undefined) {
            this.rotationZ = params.rotationZ;
        }
        if (params.autoRotate !== undefined) {
            this.autoRotate = params.autoRotate;
        }
        if (params.totalUsageTime !== undefined) {
            this.totalUsageTime = params.totalUsageTime;
        }
        if (params.todayUsageTime !== undefined) {
            this.todayUsageTime = params.todayUsageTime;
        }
        if (params.sessionCount !== undefined) {
            this.sessionCount = params.sessionCount;
        }
        if (params.lastSyncTime !== undefined) {
            this.lastSyncTime = params.lastSyncTime;
        }
        if (params.accelerometerData !== undefined) {
            this.accelerometerData = params.accelerometerData;
        }
        if (params.gyroscopeData !== undefined) {
            this.gyroscopeData = params.gyroscopeData;
        }
    }
    updateStateVars(params: CubeDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cubeConnected.purgeDependencyOnElmtId(rmElmtId);
        this.__batteryLevel.purgeDependencyOnElmtId(rmElmtId);
        this.__bluetoothStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__currentFace.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMode.purgeDependencyOnElmtId(rmElmtId);
        this.__cubeOrientation.purgeDependencyOnElmtId(rmElmtId);
        this.__rotationX.purgeDependencyOnElmtId(rmElmtId);
        this.__rotationY.purgeDependencyOnElmtId(rmElmtId);
        this.__rotationZ.purgeDependencyOnElmtId(rmElmtId);
        this.__autoRotate.purgeDependencyOnElmtId(rmElmtId);
        this.__totalUsageTime.purgeDependencyOnElmtId(rmElmtId);
        this.__todayUsageTime.purgeDependencyOnElmtId(rmElmtId);
        this.__sessionCount.purgeDependencyOnElmtId(rmElmtId);
        this.__lastSyncTime.purgeDependencyOnElmtId(rmElmtId);
        this.__accelerometerData.purgeDependencyOnElmtId(rmElmtId);
        this.__gyroscopeData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cubeConnected.aboutToBeDeleted();
        this.__batteryLevel.aboutToBeDeleted();
        this.__bluetoothStatus.aboutToBeDeleted();
        this.__currentFace.aboutToBeDeleted();
        this.__currentMode.aboutToBeDeleted();
        this.__cubeOrientation.aboutToBeDeleted();
        this.__rotationX.aboutToBeDeleted();
        this.__rotationY.aboutToBeDeleted();
        this.__rotationZ.aboutToBeDeleted();
        this.__autoRotate.aboutToBeDeleted();
        this.__totalUsageTime.aboutToBeDeleted();
        this.__todayUsageTime.aboutToBeDeleted();
        this.__sessionCount.aboutToBeDeleted();
        this.__lastSyncTime.aboutToBeDeleted();
        this.__accelerometerData.aboutToBeDeleted();
        this.__gyroscopeData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private cubeStateManager: CubeStateManager;
    private notificationService: NotificationService;
    // 魔方状态
    private __cubeConnected: ObservedPropertySimplePU<boolean>;
    get cubeConnected() {
        return this.__cubeConnected.get();
    }
    set cubeConnected(newValue: boolean) {
        this.__cubeConnected.set(newValue);
    }
    private __batteryLevel: ObservedPropertySimplePU<number>;
    get batteryLevel() {
        return this.__batteryLevel.get();
    }
    set batteryLevel(newValue: number) {
        this.__batteryLevel.set(newValue);
    }
    private __bluetoothStatus: ObservedPropertySimplePU<string>;
    get bluetoothStatus() {
        return this.__bluetoothStatus.get();
    }
    set bluetoothStatus(newValue: string) {
        this.__bluetoothStatus.set(newValue);
    }
    private __currentFace: ObservedPropertySimplePU<string>;
    get currentFace() {
        return this.__currentFace.get();
    }
    set currentFace(newValue: string) {
        this.__currentFace.set(newValue);
    }
    private __currentMode: ObservedPropertySimplePU<string>;
    get currentMode() {
        return this.__currentMode.get();
    }
    set currentMode(newValue: string) {
        this.__currentMode.set(newValue);
    }
    private __cubeOrientation: ObservedPropertyObjectPU<CubeOrientation>;
    get cubeOrientation() {
        return this.__cubeOrientation.get();
    }
    set cubeOrientation(newValue: CubeOrientation) {
        this.__cubeOrientation.set(newValue);
    }
    // 3D动画相关
    private __rotationX: ObservedPropertySimplePU<number>;
    get rotationX() {
        return this.__rotationX.get();
    }
    set rotationX(newValue: number) {
        this.__rotationX.set(newValue);
    }
    private __rotationY: ObservedPropertySimplePU<number>;
    get rotationY() {
        return this.__rotationY.get();
    }
    set rotationY(newValue: number) {
        this.__rotationY.set(newValue);
    }
    private __rotationZ: ObservedPropertySimplePU<number>;
    get rotationZ() {
        return this.__rotationZ.get();
    }
    set rotationZ(newValue: number) {
        this.__rotationZ.set(newValue);
    }
    private __autoRotate: ObservedPropertySimplePU<boolean>;
    get autoRotate() {
        return this.__autoRotate.get();
    }
    set autoRotate(newValue: boolean) {
        this.__autoRotate.set(newValue);
    }
    // 详细信息
    private __totalUsageTime: ObservedPropertySimplePU<number>;
    get totalUsageTime() {
        return this.__totalUsageTime.get();
    }
    set totalUsageTime(newValue: number) {
        this.__totalUsageTime.set(newValue);
    }
    private __todayUsageTime: ObservedPropertySimplePU<number>;
    get todayUsageTime() {
        return this.__todayUsageTime.get();
    }
    set todayUsageTime(newValue: number) {
        this.__todayUsageTime.set(newValue);
    }
    private __sessionCount: ObservedPropertySimplePU<number>;
    get sessionCount() {
        return this.__sessionCount.get();
    }
    set sessionCount(newValue: number) {
        this.__sessionCount.set(newValue);
    }
    private __lastSyncTime: ObservedPropertySimplePU<string>;
    get lastSyncTime() {
        return this.__lastSyncTime.get();
    }
    set lastSyncTime(newValue: string) {
        this.__lastSyncTime.set(newValue);
    }
    // 传感器数据
    private __accelerometerData: ObservedPropertyObjectPU<Array<number>>;
    get accelerometerData() {
        return this.__accelerometerData.get();
    }
    set accelerometerData(newValue: Array<number>) {
        this.__accelerometerData.set(newValue);
    }
    private __gyroscopeData: ObservedPropertyObjectPU<Array<number>>;
    get gyroscopeData() {
        return this.__gyroscopeData.get();
    }
    set gyroscopeData(newValue: Array<number>) {
        this.__gyroscopeData.set(newValue);
    }
    aboutToAppear() {
        this.loadCubeData();
        this.startAutoRotation();
        this.startSensorUpdates();
    }
    onPageShow() {
        // 页面重新显示时重置可见性和动画
        this.resetVisibility();
        this.animateIn();
    }
    aboutToDisappear() {
        this.stopAutoRotation();
        this.stopSensorUpdates();
    }
    private resetVisibility() {
        // 重置页面可见性状态
        // 这里可以添加重置动画状态或可见性相关的逻辑
    }
    private animateIn() {
        // 页面进入动画
        // 这里可以添加页面进入时的动画效果
    }
    private loadCubeData() {
        // 加载魔方状态数据
        this.cubeConnected = this.cubeStateManager.isConnected();
        this.batteryLevel = this.cubeStateManager.getBatteryLevel();
        this.currentFace = this.cubeStateManager.getCurrentFace();
        this.currentMode = this.cubeStateManager.getCurrentMode();
        // 加载统计数据
        this.totalUsageTime = this.cubeStateManager.getTotalUsageTime();
        this.todayUsageTime = this.cubeStateManager.getTodayUsageTime();
        this.sessionCount = this.cubeStateManager.getSessionCount();
        this.lastSyncTime = this.getCurrentTimeString();
    }
    private startAutoRotation() {
        if (this.autoRotate) {
            setInterval(() => {
                this.rotationY += 1;
                this.rotationX += 0.5;
            }, 50);
        }
    }
    private stopAutoRotation() {
        // 停止自动旋转
    }
    private startSensorUpdates() {
        // 模拟传感器数据更新
        setInterval(() => {
            this.accelerometerData = [
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ];
            this.gyroscopeData = [
                Math.random() * 0.5 - 0.25,
                Math.random() * 0.5 - 0.25,
                Math.random() * 0.5 - 0.25
            ];
        }, 1000);
    }
    private stopSensorUpdates() {
        // 停止传感器更新
    }
    private getCurrentTimeString(): string {
        const now = new Date();
        return now.toLocaleTimeString();
    }
    private formatDuration(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        }
        else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        }
        else {
            return `${secs}s`;
        }
    }
    private toggleAutoRotation() {
        this.autoRotate = !this.autoRotate;
        if (this.autoRotate) {
            this.startAutoRotation();
        }
        else {
            this.stopAutoRotation();
        }
    }
    private resetRotation() {
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(152:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(154:7)", "entry");
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.width('100%');
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.backgroundColor('#6366F1');
            // 统一紫色背景，覆盖整个顶部包括状态栏
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(155:9)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/CubeDetail.ets(156:11)", "entry");
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.White);
            Image.onClick(() => {
                NavigationManager.getInstance().navigateBack();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('魔方详情');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(164:11)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('刷新');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(171:11)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6366F1');
            Text.fontWeight(FontWeight.Medium);
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.backgroundColor(Color.White);
            Text.borderRadius(20);
            Text.onClick(() => {
                this.loadCubeData();
            });
        }, Text);
        Text.pop();
        Row.pop();
        // 统一紫色背景，覆盖整个顶部包括状态栏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/CubeDetail.ets(190:7)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F5F5F5');
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(191:9)", "entry");
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 3D魔方展示区域 - 现代化设计
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(193:11)", "entry");
            // 3D魔方展示区域 - 现代化设计
            Column.width('100%');
            // 3D魔方展示区域 - 现代化设计
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Cube3DView(this, {
                        rotationX: this.rotationX,
                        rotationY: this.rotationY,
                        rotationZ: this.rotationZ,
                        autoRotate: this.autoRotate,
                        cubeSize: 120,
                        showLabels: true
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CubeDetail.ets", line: 194, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            rotationX: this.rotationX,
                            rotationY: this.rotationY,
                            rotationZ: this.rotationZ,
                            autoRotate: this.autoRotate,
                            cubeSize: 120,
                            showLabels: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        rotationX: this.rotationX,
                        rotationY: this.rotationY,
                        rotationZ: this.rotationZ,
                        autoRotate: this.autoRotate,
                        cubeSize: 120,
                        showLabels: true
                    });
                }
            }, { name: "Cube3DView" });
        }
        // 3D魔方展示区域 - 现代化设计
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 控制按钮 - 现代化设计
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(207:11)", "entry");
            // 控制按钮 - 现代化设计
            Row.width('100%');
            // 控制按钮 - 现代化设计
            Row.justifyContent(FlexAlign.Center);
            // 控制按钮 - 现代化设计
            Row.padding({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置旋转');
            Button.debugLine("entry/src/main/ets/pages/CubeDetail.ets(208:13)", "entry");
            Button.onClick(() => {
                this.resetRotation();
            });
            Button.backgroundColor('#6366F1');
            Button.fontColor(Color.White);
            Button.borderRadius(20);
            Button.fontWeight(FontWeight.Medium);
            Button.margin({ right: 8 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.autoRotate ? '停止旋转' : '开始旋转');
            Button.debugLine("entry/src/main/ets/pages/CubeDetail.ets(218:13)", "entry");
            Button.onClick(() => {
                this.toggleAutoRotation();
            });
            Button.backgroundColor(this.autoRotate ? '#EF4444' : '#10B981');
            Button.fontColor(Color.White);
            Button.borderRadius(20);
            Button.fontWeight(FontWeight.Medium);
        }, Button);
        Button.pop();
        // 控制按钮 - 现代化设计
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 魔方状态卡片 - 现代化设计
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(232:11)", "entry");
            // 魔方状态卡片 - 现代化设计
            Column.width('100%');
            // 魔方状态卡片 - 现代化设计
            Column.padding(20);
            // 魔方状态卡片 - 现代化设计
            Column.backgroundColor(Color.White);
            // 魔方状态卡片 - 现代化设计
            Column.borderRadius(16);
            // 魔方状态卡片 - 现代化设计
            Column.shadow({
                radius: 20,
                color: '#00000008',
                offsetX: 0,
                offsetY: 4
            });
            // 魔方状态卡片 - 现代化设计
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('魔方状态');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(233:13)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(239:13)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('连接状态');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(240:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CubeDetail.ets(245:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cubeConnected ? '已连接' : '未连接');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(247:15)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.cubeConnected ? '#10B981' : '#EF4444');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(255:13)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('电池电量');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(256:19)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CubeDetail.ets(261:19)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(263:19)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.batteryLevel + '%');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(264:21)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.batteryLevel > 20 ? '#10B981' : '#EF4444');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/CubeDetail.ets(269:21)", "entry");
            Stack.margin({ left: 8 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(270:23)", "entry");
            Column.width(40);
            Column.height(8);
            Column.backgroundColor('#E5E7EB');
            Column.borderRadius(4);
            Column.margin({ left: 8 });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(277:23)", "entry");
            Column.width(this.batteryLevel * 0.4);
            Column.height(8);
            Column.backgroundColor(this.batteryLevel > 20 ? '#10B981' : '#EF4444');
            Column.borderRadius(4);
            Column.margin({ left: 8 });
        }, Column);
        Column.pop();
        Stack.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(290:13)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('当前面');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(291:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CubeDetail.ets(296:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentFace);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(298:15)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#6366F1');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(306:13)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('当前模式');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(307:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CubeDetail.ets(312:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentMode);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(314:15)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#F59E0B');
        }, Text);
        Text.pop();
        Row.pop();
        // 魔方状态卡片 - 现代化设计
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统计数据卡片 - 现代化设计
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(336:11)", "entry");
            // 统计数据卡片 - 现代化设计
            Column.width('100%');
            // 统计数据卡片 - 现代化设计
            Column.padding(20);
            // 统计数据卡片 - 现代化设计
            Column.backgroundColor(Color.White);
            // 统计数据卡片 - 现代化设计
            Column.borderRadius(16);
            // 统计数据卡片 - 现代化设计
            Column.shadow({
                radius: 20,
                color: '#00000008',
                offsetX: 0,
                offsetY: 4
            });
            // 统计数据卡片 - 现代化设计
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('使用统计');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(337:13)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(343:13)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(344:15)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDuration(this.totalUsageTime));
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(345:17)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#6366F1');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总使用时间');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(351:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(358:15)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDuration(this.todayUsageTime));
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(359:17)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#10B981');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日使用');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(365:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(372:15)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.sessionCount.toString());
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(373:17)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#F59E0B');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('会话次数');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(379:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#6B7280');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(389:13)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('最后同步');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(390:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#6B7280');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CubeDetail.ets(395:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.lastSyncTime);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(397:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#9CA3AF');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
        // 统计数据卡片 - 现代化设计
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 传感器数据卡片 - 现代化设计
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(417:11)", "entry");
            // 传感器数据卡片 - 现代化设计
            Column.width('100%');
            // 传感器数据卡片 - 现代化设计
            Column.padding(20);
            // 传感器数据卡片 - 现代化设计
            Column.backgroundColor(Color.White);
            // 传感器数据卡片 - 现代化设计
            Column.borderRadius(16);
            // 传感器数据卡片 - 现代化设计
            Column.shadow({
                radius: 20,
                color: '#00000008',
                offsetX: 0,
                offsetY: 4
            });
            // 传感器数据卡片 - 现代化设计
            Column.margin({ bottom: 32 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('传感器数据');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(418:13)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CubeDetail.ets(424:13)", "entry");
            Column.padding(16);
            Column.backgroundColor('#F9FAFB');
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(425:15)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('加速度计');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(426:17)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`X: ${this.accelerometerData[0].toFixed(2)}`);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(432:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#6366F1');
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`Y: ${this.accelerometerData[1].toFixed(2)}`);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(439:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#10B981');
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`Z: ${this.accelerometerData[2].toFixed(2)}`);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(446:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#F59E0B');
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CubeDetail.ets(456:15)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('陀螺仪');
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(457:17)", "entry");
            Text.fontSize(16);
            Text.fontColor('#6B7280');
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`X: ${this.gyroscopeData[0].toFixed(2)}`);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(463:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#6366F1');
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`Y: ${this.gyroscopeData[1].toFixed(2)}`);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(470:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#10B981');
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`Z: ${this.gyroscopeData[2].toFixed(2)}`);
            Text.debugLine("entry/src/main/ets/pages/CubeDetail.ets(477:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#F59E0B');
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        // 传感器数据卡片 - 现代化设计
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CubeDetail";
    }
}
registerNamedRoute(() => new CubeDetail(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/CubeDetail", pageFullPath: "entry/src/main/ets/pages/CubeDetail", integratedHsp: "false", moduleType: "followWithHap" });
