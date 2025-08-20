import ble from '@ohos.bluetooth.ble';
import access from '@ohos.bluetooth.access';
import hilog from '@ohos.hilog';

export interface CubeData {
  face: string;
  tapCount: number;
  battery: number;
}

export default class BluetoothService {
  private gattClient: ble.GattClientDevice | null = null;
  private isConnected = false;
  private onDataCallback: ((data: CubeData) => void) | null = null;
  private onConnectCallback: ((connected: boolean) => void) | null = null;
  
  // 魔方蓝牙特征值
  private readonly CUBE_SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
  private readonly CUBE_CHARACTERISTIC_UUID = '0000fff1-0000-1000-8000-00805f9b34fb';

  async init() {
    try {
      // 检查蓝牙状态
      const state = access.getState();
      hilog.info(0x0000, 'BluetoothService', `Bluetooth state: ${state}`);
      
      if (state !== access.BluetoothState.STATE_ON) {
        hilog.warn(0x0000, 'BluetoothService', 'Bluetooth is not enabled');
        return;
      }

      // 开始扫描魔方设备
      this.startScan();
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Init error: ${JSON.stringify(error)}`);
    }
  }

  async startScan() {
    try {
      const scanFilter: ble.ScanFilter = {
        serviceUuid: this.CUBE_SERVICE_UUID
      };

      const scanOptions: ble.ScanOptions = {
        interval: 1000,
        dutyMode: ble.ScanDuty.SCAN_MODE_LOW_LATENCY,
        matchMode: ble.MatchMode.MATCH_MODE_AGGRESSIVE
      };

      ble.on('BLEDeviceFind', (data: ble.ScanResult[]) => {
        hilog.info(0x0000, 'BluetoothService', `Found devices: ${JSON.stringify(data)}`);
        if (data && data.length > 0) {
          this.connectToDevice(data[0]);
        }
      });

      await ble.startBLEScan([scanFilter], scanOptions);
      hilog.info(0x0000, 'BluetoothService', 'Started scanning for cube');
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Scan error: ${JSON.stringify(error)}`);
    }
  }

  async connectToDevice(deviceData: ble.ScanResult) {
    try {
      if (this.isConnected) {
        return;
      }

      this.gattClient = ble.createGattClientDevice(deviceData.deviceId);
      
      this.gattClient.on('BLEConnectionStateChange', (state) => {
        const connected = state.state === 2; // STATE_CONNECTED
        hilog.info(0x0000, 'BluetoothService', `Connection state: ${connected}`);
        this.isConnected = connected;
        
        if (this.onConnectCallback) {
          this.onConnectCallback(connected);
        }

        if (connected) {
          this.discoverServices();
        }
      });

      await this.gattClient.connect();
      hilog.info(0x0000, 'BluetoothService', 'Connecting to cube...');
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Connect error: ${JSON.stringify(error)}`);
    }
  }

  async discoverServices() {
    try {
      if (!this.gattClient) return;

      const services = await this.gattClient.getServices();
      hilog.info(0x0000, 'BluetoothService', `Services: ${JSON.stringify(services)}`);

      // 设置特征值监听
      this.setupCharacteristicNotify();
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Discover services error: ${JSON.stringify(error)}`);
    }
  }

  async setupCharacteristicNotify() {
    try {
      if (!this.gattClient) return;

      const descriptorUuid = '00002902-0000-1000-8000-00805f9b34fb';
      const descriptorValue = new Uint8Array([1, 0]);

      const notifyCharacteristic: ble.BLECharacteristic = {
        serviceUuid: this.CUBE_SERVICE_UUID,
        characteristicUuid: this.CUBE_CHARACTERISTIC_UUID,
        characteristicValue: new ArrayBuffer(0),
        descriptors: []
      };
      await this.gattClient.setCharacteristicChangeNotification(notifyCharacteristic, true);
      
      const descriptor: ble.BLEDescriptor = {
        serviceUuid: this.CUBE_SERVICE_UUID,
        characteristicUuid: this.CUBE_CHARACTERISTIC_UUID,
        descriptorUuid: descriptorUuid,
        descriptorValue: descriptorValue.buffer
      };
      await this.gattClient.writeDescriptorValue(descriptor);

      this.gattClient.on('BLECharacteristicChange', (data) => {
        this.handleCharacteristicChange(data);
      });

      hilog.info(0x0000, 'BluetoothService', 'Characteristic notify set up');
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Setup notify error: ${JSON.stringify(error)}`);
    }
  }

  handleCharacteristicChange(data: { characteristicValue: ArrayBuffer }) {
    try {
      const value = new Uint8Array(data.characteristicValue);
      const cubeData = this.parseCubeData(value);
      
      if (this.onDataCallback) {
        this.onDataCallback(cubeData);
      }
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Parse data error: ${JSON.stringify(error)}`);
    }
  }

  parseCubeData(data: Uint8Array): CubeData {
    // 解析魔方数据格式
    // 假设格式: [face(1字节), tapCount(1字节), battery(1字节)]
    return {
      face: String.fromCharCode(data[0] || 65), // A-F
      tapCount: data[1] || 0,
      battery: data[2] || 100
    };
  }

  onDataReceived(callback: (data: CubeData) => void) {
    this.onDataCallback = callback;
  }

  onConnectionChanged(callback: (connected: boolean) => void) {
    this.onConnectCallback = callback;
  }

  async sendData(data: Uint8Array) {
    try {
      if (!this.gattClient || !this.isConnected) return;
      
      const writeCharacteristic: ble.BLECharacteristic = {
        serviceUuid: this.CUBE_SERVICE_UUID,
        characteristicUuid: this.CUBE_CHARACTERISTIC_UUID,
        characteristicValue: data,
        descriptors: []
      };
      await this.gattClient.writeCharacteristicValue(writeCharacteristic, ble.GattWriteType.WRITE);
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Send data error: ${JSON.stringify(error)}`);
    }
  }

  destroy() {
    try {
      if (this.gattClient && this.isConnected) {
        this.gattClient.disconnect();
      }
      ble.off('BLEDeviceFind');
      ble.stopBLEScan();
    } catch (error) {
      hilog.error(0x0000, 'BluetoothService', `Destroy error: ${JSON.stringify(error)}`);
    }
  }
}