import notification from '@ohos.notification';
import vibrator from '@ohos.vibrator';
import hilog from '@ohos.hilog';

export interface LiveWindowContent {
  mode: string;
  duration: number;
  isTiming?: boolean;
  battery?: number;
}

export default class NotificationService {
  private static instance: NotificationService | null = null;
  private liveWindowId = 1001;
  private notificationId = 2001;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async showLiveWindow() {
    try {
      const notificationRequest = {
        id: this.notificationId,
        slotType: notification.SlotType.SOCIAL_COMMUNICATION,
        content: {
          contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
          normal: {
            title: 'CubeTime 智能时间管理',
            text: '正在连接魔方...',
            additionalText: ''
          }
        },
        isOngoing: true,
        isUnremovable: true,
        deliveryTime: new Date().getTime(),
        showDeliveryTime: true,
        actionButtons: [
          {
            title: '暂停',
            wantAgent: {
              wants: [
                {
                  bundleName: 'com.example.cubetime',
                  abilityName: 'EntryAbility',
                  parameters: {
                    action: 'pause'
                  }
                }
              ],
              operationType: 0,
              requestCode: 0
            }
          },
          {
            title: '停止',
            wantAgent: {
              wants: [
                {
                  bundleName: 'com.example.cubetime',
                  abilityName: 'EntryAbility',
                  parameters: {
                    action: 'stop'
                  }
                }
              ],
              operationType: 0,
              requestCode: 1
            }
          }
        ]
      };

      await notification.publish(notificationRequest);
      hilog.info(0x0000, 'NotificationService', 'Live window shown');
    } catch (error) {
      hilog.error(0x0000, 'NotificationService', `Show live window error: ${JSON.stringify(error)}`);
    }
  }

  async updateLiveWindowContent(content: LiveWindowContent) {
    try {
      const formattedDuration = this.formatDuration(content.duration);
      const statusText = content.isTiming ? '计时中' : '已暂停';
      
      const notificationRequest = {
        id: this.notificationId,
        slotType: notification.SlotType.SOCIAL_COMMUNICATION,
        content: {
          contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
          normal: {
            title: `当前模式: ${content.mode}`,
            text: `持续时间: ${formattedDuration} | ${statusText}`,
            additionalText: content.battery ? `电量: ${content.battery}%` : ''
          }
        },
        isOngoing: true,
        isUnremovable: true,
        deliveryTime: new Date().getTime(),
        showDeliveryTime: true,
        actionButtons: [
          {
            title: content.isTiming ? '暂停' : '继续',
            wantAgent: {
              wants: [
                {
                  bundleName: 'com.example.cubetime',
                  abilityName: 'EntryAbility',
                  parameters: {
                    action: content.isTiming ? 'pause' : 'resume'
                  }
                }
              ],
              operationType: 0,
              requestCode: 0
            }
          },
          {
            title: '停止',
            wantAgent: {
              wants: [
                {
                  bundleName: 'com.example.cubetime',
                  abilityName: 'EntryAbility',
                  parameters: {
                    action: 'stop'
                  }
                }
              ],
              operationType: 0,
              requestCode: 1
            }
          }
        ]
      };

      await notification.publish(notificationRequest);
      hilog.info(0x0000, 'NotificationService', 'Live window updated');
    } catch (error) {
      hilog.error(0x0000, 'NotificationService', `Update live window error: ${JSON.stringify(error)}`);
    }
  }

  async hideLiveWindow() {
    try {
      await notification.cancel(this.notificationId);
      hilog.info(0x0000, 'NotificationService', 'Live window hidden');
    } catch (error) {
      hilog.error(0x0000, 'NotificationService', `Hide live window error: ${JSON.stringify(error)}`);
    }
  }

  async vibrate() {
    try {
      await vibrator.startVibration({
        type: 'time',
        duration: 100
      }, {
        id: 0,
        usage: 'unknown'
      });
    } catch (error) {
      hilog.error(0x0000, 'NotificationService', `Vibrate error: ${JSON.stringify(error)}`);
    }
  }

  async vibrateDouble() {
    try {
      await vibrator.startVibration({
        type: 'preset',
        effectId: 'haptic.clock.timer'
      }, {
        id: 0,
        usage: 'unknown'
      });
    } catch (error) {
      hilog.error(0x0000, 'NotificationService', `Double vibrate error: ${JSON.stringify(error)}`);
    }
  }

  async showNotification(title: string, content: string) {
    try {
      const notificationRequest = {
        id: Date.now(),
        slotType: notification.SlotType.SOCIAL_COMMUNICATION,
        content: {
          contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
          normal: {
            title: title,
            text: content,
            additionalText: ''
          }
        }
      };

      await notification.publish(notificationRequest);
    } catch (error) {
      hilog.error(0x0000, 'NotificationService', `Show notification error: ${JSON.stringify(error)}`);
    }
  }

  private formatDuration(duration: number): string {
    const totalSeconds = Math.floor(duration / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  destroy() {
    this.hideLiveWindow();
  }
}