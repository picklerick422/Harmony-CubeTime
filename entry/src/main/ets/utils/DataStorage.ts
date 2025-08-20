import dataStorage from '@ohos.data.preferences';
import Logger from './Logger';

class DataStorage {
  private preferences: dataStorage.Preferences | null = null;

  async init(context: any): Promise<void> {
    try {
      this.preferences = await dataStorage.getPreferences(context, 'cube_time_data');
      Logger.info('DataStorage initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize DataStorage:', error);
    }
  }

  async setString(key: string, value: string): Promise<void> {
    if (!this.preferences) return;
    try {
      await this.preferences.put(key, value as any);
      await this.preferences.flush();
    } catch (error) {
      Logger.error('Failed to set string:', error);
    }
  }

  async getString(key: string, defaultValue: string = ''): Promise<string> {
    if (!this.preferences) return defaultValue;
    try {
      return await this.preferences.get(key, defaultValue) as string;
    } catch (error) {
      Logger.error('Failed to get string:', error);
      return defaultValue;
    }
  }

  async setNumber(key: string, value: number): Promise<void> {
    if (!this.preferences) return;
    try {
      await this.preferences.put(key, value as any);
      await this.preferences.flush();
    } catch (error) {
      Logger.error('Failed to set number:', error);
    }
  }

  async getNumber(key: string, defaultValue: number = 0): Promise<number> {
    if (!this.preferences) return defaultValue;
    try {
      return await this.preferences.get(key, defaultValue) as number;
    } catch (error) {
      Logger.error('Failed to get number:', error);
      return defaultValue;
    }
  }

  async setBoolean(key: string, value: boolean): Promise<void> {
    if (!this.preferences) return;
    try {
      await this.preferences.put(key, value as any);
      await this.preferences.flush();
    } catch (error) {
      Logger.error('Failed to set boolean:', error);
    }
  }

  async getBoolean(key: string, defaultValue: boolean = false): Promise<boolean> {
    if (!this.preferences) return defaultValue;
    try {
      return await this.preferences.get(key, defaultValue) as boolean;
    } catch (error) {
      Logger.error('Failed to get boolean:', error);
      return defaultValue;
    }
  }

  async setObject(key: string, value: Object): Promise<void> {
    if (!this.preferences) return;
    try {
      await this.preferences.put(key, JSON.stringify(value) as any);
      await this.preferences.flush();
    } catch (error) {
      Logger.error('Failed to set object:', error);
    }
  }

  async getObject(key: string, defaultValue: Object = null): Promise<Object> {
    if (!this.preferences) return defaultValue;
    try {
      const value = await this.preferences.get(key, '');
      return value && typeof value === 'string' ? JSON.parse(value) : defaultValue;
    } catch (error) {
      Logger.error('Failed to get object:', error);
      return defaultValue;
    }
  }

  async clear(): Promise<void> {
    if (!this.preferences) return;
    try {
      await this.preferences.clear();
      await this.preferences.flush();
      Logger.info('DataStorage cleared');
    } catch (error) {
      Logger.error('Failed to clear DataStorage:', error);
    }
  }
}

export default new DataStorage();