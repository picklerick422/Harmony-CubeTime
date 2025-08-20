import hilog from "@ohos:hilog";
import BluetoothService from "@bundle:com.example.cubetime/entry/ets/services/BluetoothService";
import type { CubeData } from "@bundle:com.example.cubetime/entry/ets/services/BluetoothService";
export interface CubeFace {
    face: string;
    mode: string;
    color: string;
}
export default class CubeStateManager {
    private static instance: CubeStateManager | null = null;
    private bluetoothService: BluetoothService;
    private currentFace: string = 'A';
    private tapCount: number = 0;
    private lastTapTime: number = 0;
    private onStateChangedCallback: ((face: string) => void) | null = null;
    private onDoubleTapCallback: (() => void) | null = null;
    private doubleTapThreshold: number = 500; // 500ms内双击
    private readonly faceConfig: Record<string, CubeFace> = {
        'A': { face: 'A', mode: '学习模式', color: '#FF6B6B' },
        'B': { face: 'B', mode: '工作模式', color: '#4ECDC4' },
        'C': { face: 'C', mode: '休息模式', color: '#45B7D1' },
        'D': { face: 'D', mode: '运动模式', color: '#96CEB4' },
        'E': { face: 'E', mode: '阅读模式', color: '#FECA57' },
        'F': { face: 'F', mode: '冥想模式', color: '#DDA0DD' }
    };
    private constructor() {
        this.bluetoothService = new BluetoothService();
        this.init();
    }
    static getInstance(): CubeStateManager {
        if (!CubeStateManager.instance) {
            CubeStateManager.instance = new CubeStateManager();
        }
        return CubeStateManager.instance;
    }
    private init() {
        this.bluetoothService.onDataReceived((data: CubeData) => {
            this.handleCubeData(data);
        });
        this.bluetoothService.onConnectionChanged((connected: boolean) => {
            hilog.info(0x0000, 'CubeStateManager', `Cube connection: ${connected}`);
        });
    }
    private handleCubeData(data: CubeData) {
        // 处理魔方面朝变化
        if (data.face !== this.currentFace) {
            this.currentFace = data.face;
            this.notifyStateChanged();
        }
        // 处理敲击事件
        if (data.tapCount > 0) {
            this.handleTapEvent(data.tapCount);
        }
    }
    private handleTapEvent(tapCount: number) {
        const now = Date.now();
        if (tapCount === 1) {
            // 单击事件
            if (now - this.lastTapTime < this.doubleTapThreshold) {
                // 双击检测
                this.notifyDoubleTap();
                this.tapCount = 0;
            }
            else {
                this.tapCount = 1;
            }
        }
        else if (tapCount >= 2) {
            // 多击事件
            this.notifyDoubleTap();
            this.tapCount = 0;
        }
        this.lastTapTime = now;
    }
    private notifyStateChanged() {
        hilog.info(0x0000, 'CubeStateManager', `Face changed to: ${this.currentFace}`);
        if (this.onStateChangedCallback) {
            this.onStateChangedCallback(this.currentFace);
        }
    }
    private notifyDoubleTap() {
        hilog.info(0x0000, 'CubeStateManager', 'Double tap detected');
        if (this.onDoubleTapCallback) {
            this.onDoubleTapCallback();
        }
    }
    onCubeStateChanged(callback: (face: string) => void) {
        this.onStateChangedCallback = callback;
    }
    onCubeDoubleTap(callback: () => void) {
        this.onDoubleTapCallback = callback;
    }
    getCurrentFace(): string {
        return this.currentFace;
    }
    getCurrentMode(): string {
        return this.faceConfig[this.currentFace]?.mode || '未知模式';
    }
    getCurrentColor(): string {
        return this.faceConfig[this.currentFace]?.color || '#666666';
    }
    getFaceConfig(): Record<string, CubeFace> {
        return { ...this.faceConfig };
    }
    updateFaceConfig(face: string, config: Partial<CubeFace>) {
        if (this.faceConfig[face]) {
            this.faceConfig[face] = { ...this.faceConfig[face], ...config };
        }
    }
    isConnected(): boolean {
        // 这里应该从蓝牙服务获取连接状态
        return true; // 简化版本
    }
    getBatteryLevel(): number {
        // 这里应该从蓝牙服务获取电池电量
        return Math.floor(Math.random() * 30) + 70; // 模拟70-100%电量
    }
    getBluetoothStatus(): string {
        return this.isConnected() ? '已连接' : '未连接';
    }
    getTotalUsageTime(): number {
        // 返回总使用时长（秒）
        return 3600 * 5 + Math.floor(Math.random() * 3600); // 模拟5小时+随机时间
    }
    getTodayUsageTime(): number {
        // 返回今日使用时长（秒）
        return 3600 * 2 + Math.floor(Math.random() * 1800); // 模拟2小时+随机时间
    }
    getSessionCount(): number {
        // 返回会话次数
        return 42 + Math.floor(Math.random() * 10); // 模拟42-52次会话
    }
    getCubeOrientation(): {
        x: number;
        y: number;
        z: number;
        face: string;
    } {
        // 返回魔方朝向信息
        return {
            x: Math.random() * 360,
            y: Math.random() * 360,
            z: Math.random() * 360,
            face: this.getCurrentFace()
        };
    }
    getSensorData(): {
        accelerometer: number[];
        gyroscope: number[];
    } {
        return {
            accelerometer: [
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ],
            gyroscope: [
                Math.random() * 0.5 - 0.25,
                Math.random() * 0.5 - 0.25,
                Math.random() * 0.5 - 0.25
            ]
        };
    }
    destroy() {
        // 清理资源
        this.onStateChangedCallback = null;
        this.onDoubleTapCallback = null;
    }
}
