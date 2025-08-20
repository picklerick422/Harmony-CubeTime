import hilog from '@ohos.hilog';

export interface WorkSession {
  id: string;
  mode: string;
  startTime: number;
  endTime?: number;
  duration: number;
  completed: boolean;
}

export interface PomodoroConfig {
  workDuration: number;    // 工作时间(分钟)
  shortBreak: number;      // 短休息(分钟)
  longBreak: number;       // 长休息(分钟)
  sessionsBeforeLongBreak: number;
}

export interface StatisticsData {
  totalSessions: number;
  totalTime: number;
  totalFocusTime: number;
  todaySessions: number;
  todayTime: number;
  todayFocusTime: number;
  weekSessions: number;
  weekTime: number;
  monthSessions: number;
  monthTime: number;
  sessionsCount: number;
  currentStreak: number;
  modeStats: Record<string, { sessions: number; time: number }>;
}

export default class TimeManagementService {
  private static instance: TimeManagementService | null = null;
  private currentMode: string = '未知模式';
  private isTiming: boolean = false;
  private startTime: number = 0;
  private currentDuration: number = 0;
  private timer: number | null = null;
  private sessions: WorkSession[] = [];
  private pomodoroConfig: PomodoroConfig = {
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4
  };
  private currentPomodoroSession: number = 0;

  private constructor() {
    this.loadSessions();
  }

  static getInstance(): TimeManagementService {
    if (!TimeManagementService.instance) {
      TimeManagementService.instance = new TimeManagementService();
    }
    return TimeManagementService.instance;
  }

  async init(): Promise<void> {
    await this.loadSessions();
  }

  setCurrentMode(mode: string) {
    this.currentMode = mode;
    hilog.info(0x0000, 'TimeManagementService', `Current mode set to: ${mode}`);
  }

  getCurrentMode(): string {
    return this.currentMode;
  }

  startTiming() {
    if (this.isTiming) {
      this.stopTiming();
    }
    
    this.isTiming = true;
    this.startTime = Date.now();
    this.currentDuration = 0;
    
    this.timer = setInterval(() => {
      this.currentDuration = Date.now() - this.startTime;
    }, 1000);
    
    hilog.info(0x0000, 'TimeManagementService', 'Started timing');
  }

  stopTiming() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    if (this.isTiming) {
      const session: WorkSession = {
        id: this.generateSessionId(),
        mode: this.currentMode,
        startTime: this.startTime,
        endTime: Date.now(),
        duration: this.currentDuration,
        completed: true
      };
      
      this.sessions.push(session);
      this.saveSessions();
      
      this.isTiming = false;
      this.currentDuration = 0;
      
      hilog.info(0x0000, 'TimeManagementService', 'Stopped timing');
    }
  }

  getCurrentDuration(): number {
    return this.currentDuration;
  }

  getIsTiming(): boolean {
    return this.isTiming;
  }

  getTimeLeft(): number {
    return this.currentDuration;
  }

  isRunning(): boolean {
    return this.getIsTiming();
  }

  startPomodoro() {
    this.setCurrentMode('番茄工作');
    this.startPomodoroTimer();
  }

  private startPomodoroTimer() {
    const isWorkTime = this.currentPomodoroSession % 2 === 0;
    const duration = isWorkTime 
      ? this.pomodoroConfig.workDuration * 60 * 1000
      : this.getBreakDuration();
    
    this.startTimer(duration, () => {
      this.onPomodoroComplete();
    });
  }

  private getBreakDuration(): number {
    const sessionCount = Math.floor(this.currentPomodoroSession / 2);
    if (sessionCount > 0 && sessionCount % this.pomodoroConfig.sessionsBeforeLongBreak === 0) {
      return this.pomodoroConfig.longBreak * 60 * 1000;
    }
    return this.pomodoroConfig.shortBreak * 60 * 1000;
  }

  private onPomodoroComplete() {
    this.currentPomodoroSession++;
    
    // 保存完成的会话
    const session: WorkSession = {
      id: this.generateSessionId(),
      mode: this.currentMode,
      startTime: this.startTime,
      endTime: Date.now(),
      duration: this.currentDuration,
      completed: true
    };
    
    this.sessions.push(session);
    this.saveSessions();
    
    // 继续下一个会话
    this.startPomodoroTimer();
  }

  private startTimer(duration: number, onComplete: () => void) {
    this.startTime = Date.now();
    this.isTiming = true;
    this.currentDuration = 0;
    
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    this.timer = setInterval(() => {
      this.currentDuration = Date.now() - this.startTime;
      
      if (this.currentDuration >= duration) {
        this.stopTiming();
        onComplete();
      }
    }, 1000);
  }

  getSessions(): WorkSession[] {
    return [...this.sessions];
  }

  getTodaySessions(): WorkSession[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return this.sessions.filter(session => 
      session.startTime >= today.getTime() && session.startTime < tomorrow.getTime()
    );
  }

  getWeekSessions(): WorkSession[] {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    return this.sessions.filter(session => 
      session.startTime >= weekStart.getTime()
    );
  }

  getMonthSessions(): WorkSession[] {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return this.sessions.filter(session => 
      session.startTime >= monthStart.getTime()
    );
  }

  getTotalTimeByMode(mode: string): number {
    return this.sessions
      .filter(session => session.mode === mode)
      .reduce((total, session) => total + session.duration, 0);
  }

  getStatistics(): StatisticsData {
    const todaySessions = this.getTodaySessions();
    const weekSessions = this.getWeekSessions();
    const monthSessions = this.getMonthSessions();
    
    const todayTime = todaySessions.reduce((total, session) => total + session.duration, 0);
    const weekTime = weekSessions.reduce((total, session) => total + session.duration, 0);
    const monthTime = monthSessions.reduce((total, session) => total + session.duration, 0);
    const totalTime = this.sessions.reduce((total, session) => total + session.duration, 0);

    // 获取所有模式
    const modes = Array.from(new Set(this.sessions.map(session => session.mode)));
    const modeStats: Record<string, { sessions: number; time: number }> = {};
    
    modes.forEach(mode => {
      modeStats[mode] = {
        sessions: this.sessions.filter(s => s.mode === mode).length,
        time: this.getTotalTimeByMode(mode)
      };
    });

    return {
      totalSessions: this.sessions.length,
      totalTime,
      totalFocusTime: totalTime,
      todaySessions: todaySessions.length,
      todayTime,
      todayFocusTime: todayTime,
      weekSessions: weekSessions.length,
      weekTime,
      monthSessions: monthSessions.length,
      monthTime,
      sessionsCount: this.sessions.length,
      currentStreak: 1, // 简化的连续天数计算
      modeStats
    };
  }

  updatePomodoroConfig(config: Partial<PomodoroConfig>) {
    this.pomodoroConfig = { ...this.pomodoroConfig, ...config };
  }

  private generateSessionId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private saveSessions() {
    try {
      // 在实际应用中，这里应该使用持久化存储
      // 例如：preferences.putSync('sessions', JSON.stringify(this.sessions));
    } catch (error) {
      hilog.error(0x0000, 'TimeManagementService', `Save sessions error: ${JSON.stringify(error)}`);
    }
  }

  private loadSessions() {
    try {
      // 在实际应用中，这里应该从持久化存储加载
      // 例如：const saved = preferences.getSync('sessions', '[]');
      // this.sessions = JSON.parse(saved);
    } catch (error) {
      hilog.error(0x0000, 'TimeManagementService', `Load sessions error: ${JSON.stringify(error)}`);
      this.sessions = [];
    }
  }

  destroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}