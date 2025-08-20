if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Cube3DView_Params {
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
    autoRotate?: boolean;
    showLabels?: boolean;
    cubeSize?: number;
    colors?: ColorMap;
    faceLabels?: FaceLabels;
}
interface ColorMap {
    white: string;
    yellow: string;
    red: string;
    orange: string;
    blue: string;
    green: string;
}
interface FaceLabels {
    front: string;
    back: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
}
export class Cube3DView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__rotationX = new SynchedPropertySimpleOneWayPU(params.rotationX, this, "rotationX");
        this.__rotationY = new SynchedPropertySimpleOneWayPU(params.rotationY, this, "rotationY");
        this.__rotationZ = new SynchedPropertySimpleOneWayPU(params.rotationZ, this, "rotationZ");
        this.__autoRotate = new SynchedPropertySimpleOneWayPU(params.autoRotate, this, "autoRotate");
        this.__showLabels = new SynchedPropertySimpleOneWayPU(params.showLabels, this, "showLabels");
        this.__cubeSize = new SynchedPropertySimpleOneWayPU(params.cubeSize, this, "cubeSize");
        this.colors = {
            white: '#FFFFFF',
            yellow: '#FFD700',
            red: '#FF0000',
            orange: '#FFA500',
            blue: '#0000FF',
            green: '#00FF00'
        };
        this.faceLabels = {
            front: '前',
            back: '后',
            left: '左',
            right: '右',
            top: '上',
            bottom: '下'
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Cube3DView_Params) {
        if (params.rotationX === undefined) {
            this.__rotationX.set(0);
        }
        if (params.rotationY === undefined) {
            this.__rotationY.set(0);
        }
        if (params.rotationZ === undefined) {
            this.__rotationZ.set(0);
        }
        if (params.autoRotate === undefined) {
            this.__autoRotate.set(false);
        }
        if (params.showLabels === undefined) {
            this.__showLabels.set(false);
        }
        if (params.cubeSize === undefined) {
            this.__cubeSize.set(108);
        }
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
        if (params.faceLabels !== undefined) {
            this.faceLabels = params.faceLabels;
        }
    }
    updateStateVars(params: Cube3DView_Params) {
        this.__rotationX.reset(params.rotationX);
        this.__rotationY.reset(params.rotationY);
        this.__rotationZ.reset(params.rotationZ);
        this.__autoRotate.reset(params.autoRotate);
        this.__showLabels.reset(params.showLabels);
        this.__cubeSize.reset(params.cubeSize);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__rotationX.purgeDependencyOnElmtId(rmElmtId);
        this.__rotationY.purgeDependencyOnElmtId(rmElmtId);
        this.__rotationZ.purgeDependencyOnElmtId(rmElmtId);
        this.__autoRotate.purgeDependencyOnElmtId(rmElmtId);
        this.__showLabels.purgeDependencyOnElmtId(rmElmtId);
        this.__cubeSize.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__rotationX.aboutToBeDeleted();
        this.__rotationY.aboutToBeDeleted();
        this.__rotationZ.aboutToBeDeleted();
        this.__autoRotate.aboutToBeDeleted();
        this.__showLabels.aboutToBeDeleted();
        this.__cubeSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __rotationX: SynchedPropertySimpleOneWayPU<number>;
    get rotationX() {
        return this.__rotationX.get();
    }
    set rotationX(newValue: number) {
        this.__rotationX.set(newValue);
    }
    private __rotationY: SynchedPropertySimpleOneWayPU<number>;
    get rotationY() {
        return this.__rotationY.get();
    }
    set rotationY(newValue: number) {
        this.__rotationY.set(newValue);
    }
    private __rotationZ: SynchedPropertySimpleOneWayPU<number>;
    get rotationZ() {
        return this.__rotationZ.get();
    }
    set rotationZ(newValue: number) {
        this.__rotationZ.set(newValue);
    }
    private __autoRotate: SynchedPropertySimpleOneWayPU<boolean>;
    get autoRotate() {
        return this.__autoRotate.get();
    }
    set autoRotate(newValue: boolean) {
        this.__autoRotate.set(newValue);
    }
    private __showLabels: SynchedPropertySimpleOneWayPU<boolean>;
    get showLabels() {
        return this.__showLabels.get();
    }
    set showLabels(newValue: boolean) {
        this.__showLabels.set(newValue);
    }
    private __cubeSize: SynchedPropertySimpleOneWayPU<number>;
    get cubeSize() {
        return this.__cubeSize.get();
    }
    set cubeSize(newValue: number) {
        this.__cubeSize.set(newValue);
    }
    // 魔方颜色
    private colors: ColorMap;
    // 面标签
    private faceLabels: FaceLabels;
    aboutToAppear(): void {
        if (this.autoRotate) {
            this.startAutoRotation();
        }
    }
    aboutToDisappear(): void {
        this.stopAutoRotation();
    }
    private startAutoRotation(): void {
        setInterval(() => {
            if (this.autoRotate) {
                this.rotationY += 1;
                this.rotationX += 0.3;
            }
        }, 50);
    }
    private stopAutoRotation(): void {
        // 停止自动旋转
    }
    private getCubeFace(face: string, color: string): void {
        // 这个方法暂时不需要实现，因为直接在build中构建了UI
        // 这里不应该包含UI组件，只在build方法中构建UI
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 3D魔方容器 - 使用简单的3D效果
            Column.create();
            // 3D魔方容器 - 使用简单的3D效果
            Column.width(300);
            // 3D魔方容器 - 使用简单的3D效果
            Column.height(300);
            // 3D魔方容器 - 使用简单的3D效果
            Column.backgroundColor('#F9FAFB');
            // 3D魔方容器 - 使用简单的3D效果
            Column.borderRadius(16);
            // 3D魔方容器 - 使用简单的3D效果
            Column.shadow({
                radius: 20,
                color: '#00000008',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用多个旋转的矩形模拟3D魔方
            Stack.create();
            // 使用多个旋转的矩形模拟3D魔方
            Stack.width(200);
            // 使用多个旋转的矩形模拟3D魔方
            Stack.height(200);
            // 使用多个旋转的矩形模拟3D魔方
            Stack.alignContent(Alignment.Center);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 前面 - 白色
            Column.create();
            // 前面 - 白色
            Column.rotate({
                x: 0, y: 1, z: 0,
                angle: this.rotationY,
                centerX: 0, centerY: 0
            } as RotateOptions);
            // 前面 - 白色
            Column.rotate({
                x: 1, y: 0, z: 0,
                angle: this.rotationX,
                centerX: 0, centerY: 0
            } as RotateOptions);
            // 前面 - 白色
            Column.width(this.cubeSize);
            // 前面 - 白色
            Column.height(this.cubeSize);
            // 前面 - 白色
            Column.position({ x: 0, y: 0 });
            // 前面 - 白色
            Column.zIndex(6);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.white);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        // 前面 - 白色
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右面 - 红色
            Column.create();
            // 右面 - 红色
            Column.rotate({
                x: 0, y: 1, z: 0,
                angle: this.rotationY + 90,
                centerX: 0, centerY: 0
            } as RotateOptions);
            // 右面 - 红色
            Column.rotate({
                x: 1, y: 0, z: 0,
                angle: this.rotationX,
                centerX: 0, centerY: 0
            } as RotateOptions);
            // 右面 - 红色
            Column.width(this.cubeSize);
            // 右面 - 红色
            Column.height(this.cubeSize);
            // 右面 - 红色
            Column.position({ x: 36, y: 0 });
            // 右面 - 红色
            Column.zIndex(5);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.red);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        // 右面 - 红色
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 上面 - 蓝色
            Column.create();
            // 上面 - 蓝色
            Column.rotate({
                x: 1, y: 0, z: 0,
                angle: this.rotationX - 90,
                centerX: 0, centerY: 0
            } as RotateOptions);
            // 上面 - 蓝色
            Column.rotate({
                x: 0, y: 1, z: 0,
                angle: this.rotationY,
                centerX: 0, centerY: 0
            } as RotateOptions);
            // 上面 - 蓝色
            Column.width(this.cubeSize);
            // 上面 - 蓝色
            Column.height(this.cubeSize);
            // 上面 - 蓝色
            Column.position({ x: 0, y: -36 });
            // 上面 - 蓝色
            Column.zIndex(4);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.cubeSize / 3);
            Column.height(this.cubeSize / 3);
            Column.backgroundColor(this.colors.blue);
            Column.border({ width: 1, color: '#333' });
            Column.borderRadius(2);
        }, Column);
        Column.pop();
        Row.pop();
        // 上面 - 蓝色
        Column.pop();
        // 使用多个旋转的矩形模拟3D魔方
        Stack.pop();
        // 3D魔方容器 - 使用简单的3D效果
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 控制按钮
            Row.create();
            // 控制按钮
            Row.padding(16);
            // 控制按钮
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 控制按钮
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('旋转');
            Button.onClick(() => {
                this.autoRotate = !this.autoRotate;
                if (this.autoRotate) {
                    this.startAutoRotation();
                }
            });
            Button.backgroundColor('#6366F1');
            Button.borderRadius(20);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置');
            Button.onClick(() => {
                this.rotationX = 0;
                this.rotationY = 0;
                this.rotationZ = 0;
            });
            Button.backgroundColor('#8B5CF6');
            Button.borderRadius(20);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('标签');
            Button.onClick(() => {
                this.showLabels = !this.showLabels;
            });
            Button.backgroundColor('#10B981');
            Button.borderRadius(20);
        }, Button);
        Button.pop();
        // 控制按钮
        Row.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
