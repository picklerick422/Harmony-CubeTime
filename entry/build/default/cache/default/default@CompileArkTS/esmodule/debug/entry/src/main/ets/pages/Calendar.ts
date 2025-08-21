if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CalendarPage_Params {
    buttonOpacity?: number;
    buttonScale?: number;
    cardOpacity?: number;
    cardScale?: number;
    itemOpacity?: number;
    itemScale?: number;
    timerOpacity?: number;
    timerScale?: number;
    navOpacity?: number;
    navScale?: number;
    currentDate?: Date;
    selectedDate?: Date;
    tasks?: CalendarTask[];
    events?: CalendarEvent[];
    showAddTask?: boolean;
    showAddEvent?: boolean;
    newTaskTitle?: string;
    newEventTitle?: string;
    newEventTime?: string;
    titleScale?: number;
    titleOpacity?: number;
    calendarScale?: number;
    calendarOpacity?: number;
    taskScale?: number;
    taskOpacity?: number;
}
import { navigationManager } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
interface CalendarTask {
    id: string;
    title: string;
    completed: boolean;
    date: string;
}
interface CalendarEvent {
    id: string;
    title: string;
    time: string;
    date: string;
}
interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    hasTasks: boolean;
    hasEvents: boolean;
}
class CalendarPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.buttonOpacity = 1;
        this.buttonScale = 1;
        this.cardOpacity = 1;
        this.cardScale = 1;
        this.itemOpacity = 1;
        this.itemScale = 1;
        this.timerOpacity = 1;
        this.timerScale = 1;
        this.navOpacity = 1;
        this.navScale = 1;
        this.__currentDate = new ObservedPropertyObjectPU(new Date(), this, "currentDate");
        this.__selectedDate = new ObservedPropertyObjectPU(new Date(), this, "selectedDate");
        this.__tasks = new ObservedPropertyObjectPU([
            { id: '1', title: '完成项目报告', date: '2024-01-15', completed: false },
            { id: '2', title: '团队会议', date: '2024-01-15', completed: true },
            { id: '3', title: '代码审查', date: '2024-01-16', completed: false },
        ], this, "tasks");
        this.__events = new ObservedPropertyObjectPU([
            { id: '1', title: '产品发布会', date: '2024-01-20', time: '14:00' },
            { id: '2', title: '客户会议', date: '2024-01-18', time: '10:00' },
        ], this, "events");
        this.__showAddTask = new ObservedPropertySimplePU(false, this, "showAddTask");
        this.__showAddEvent = new ObservedPropertySimplePU(false, this, "showAddEvent");
        this.__newTaskTitle = new ObservedPropertySimplePU('', this, "newTaskTitle");
        this.__newEventTitle = new ObservedPropertySimplePU('', this, "newEventTitle");
        this.__newEventTime = new ObservedPropertySimplePU('', this, "newEventTime");
        this.__titleScale = new ObservedPropertySimplePU(0, this, "titleScale");
        this.__titleOpacity = new ObservedPropertySimplePU(0, this, "titleOpacity");
        this.__calendarScale = new ObservedPropertySimplePU(0, this, "calendarScale");
        this.__calendarOpacity = new ObservedPropertySimplePU(0, this, "calendarOpacity");
        this.__taskScale = new ObservedPropertySimplePU(0, this, "taskScale");
        this.__taskOpacity = new ObservedPropertySimplePU(0
        // 页面入场动画 - 只在页面加载时触发
        , this, "taskOpacity");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CalendarPage_Params) {
        if (params.buttonOpacity !== undefined) {
            this.buttonOpacity = params.buttonOpacity;
        }
        if (params.buttonScale !== undefined) {
            this.buttonScale = params.buttonScale;
        }
        if (params.cardOpacity !== undefined) {
            this.cardOpacity = params.cardOpacity;
        }
        if (params.cardScale !== undefined) {
            this.cardScale = params.cardScale;
        }
        if (params.itemOpacity !== undefined) {
            this.itemOpacity = params.itemOpacity;
        }
        if (params.itemScale !== undefined) {
            this.itemScale = params.itemScale;
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
        if (params.currentDate !== undefined) {
            this.currentDate = params.currentDate;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.tasks !== undefined) {
            this.tasks = params.tasks;
        }
        if (params.events !== undefined) {
            this.events = params.events;
        }
        if (params.showAddTask !== undefined) {
            this.showAddTask = params.showAddTask;
        }
        if (params.showAddEvent !== undefined) {
            this.showAddEvent = params.showAddEvent;
        }
        if (params.newTaskTitle !== undefined) {
            this.newTaskTitle = params.newTaskTitle;
        }
        if (params.newEventTitle !== undefined) {
            this.newEventTitle = params.newEventTitle;
        }
        if (params.newEventTime !== undefined) {
            this.newEventTime = params.newEventTime;
        }
        if (params.titleScale !== undefined) {
            this.titleScale = params.titleScale;
        }
        if (params.titleOpacity !== undefined) {
            this.titleOpacity = params.titleOpacity;
        }
        if (params.calendarScale !== undefined) {
            this.calendarScale = params.calendarScale;
        }
        if (params.calendarOpacity !== undefined) {
            this.calendarOpacity = params.calendarOpacity;
        }
        if (params.taskScale !== undefined) {
            this.taskScale = params.taskScale;
        }
        if (params.taskOpacity !== undefined) {
            this.taskOpacity = params.taskOpacity;
        }
    }
    updateStateVars(params: CalendarPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentDate.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDate.purgeDependencyOnElmtId(rmElmtId);
        this.__tasks.purgeDependencyOnElmtId(rmElmtId);
        this.__events.purgeDependencyOnElmtId(rmElmtId);
        this.__showAddTask.purgeDependencyOnElmtId(rmElmtId);
        this.__showAddEvent.purgeDependencyOnElmtId(rmElmtId);
        this.__newTaskTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__newEventTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__newEventTime.purgeDependencyOnElmtId(rmElmtId);
        this.__titleScale.purgeDependencyOnElmtId(rmElmtId);
        this.__titleOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__calendarScale.purgeDependencyOnElmtId(rmElmtId);
        this.__calendarOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__taskScale.purgeDependencyOnElmtId(rmElmtId);
        this.__taskOpacity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentDate.aboutToBeDeleted();
        this.__selectedDate.aboutToBeDeleted();
        this.__tasks.aboutToBeDeleted();
        this.__events.aboutToBeDeleted();
        this.__showAddTask.aboutToBeDeleted();
        this.__showAddEvent.aboutToBeDeleted();
        this.__newTaskTitle.aboutToBeDeleted();
        this.__newEventTitle.aboutToBeDeleted();
        this.__newEventTime.aboutToBeDeleted();
        this.__titleScale.aboutToBeDeleted();
        this.__titleOpacity.aboutToBeDeleted();
        this.__calendarScale.aboutToBeDeleted();
        this.__calendarOpacity.aboutToBeDeleted();
        this.__taskScale.aboutToBeDeleted();
        this.__taskOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private buttonOpacity: number;
    private buttonScale: number;
    private cardOpacity: number;
    private cardScale: number;
    private itemOpacity: number;
    private itemScale: number;
    private timerOpacity: number;
    private timerScale: number;
    private navOpacity: number;
    private navScale: number;
    private __currentDate: ObservedPropertyObjectPU<Date>;
    get currentDate() {
        return this.__currentDate.get();
    }
    set currentDate(newValue: Date) {
        this.__currentDate.set(newValue);
    }
    private __selectedDate: ObservedPropertyObjectPU<Date>;
    get selectedDate() {
        return this.__selectedDate.get();
    }
    set selectedDate(newValue: Date) {
        this.__selectedDate.set(newValue);
    }
    private __tasks: ObservedPropertyObjectPU<CalendarTask[]>;
    get tasks() {
        return this.__tasks.get();
    }
    set tasks(newValue: CalendarTask[]) {
        this.__tasks.set(newValue);
    }
    private __events: ObservedPropertyObjectPU<CalendarEvent[]>;
    get events() {
        return this.__events.get();
    }
    set events(newValue: CalendarEvent[]) {
        this.__events.set(newValue);
    }
    private __showAddTask: ObservedPropertySimplePU<boolean>;
    get showAddTask() {
        return this.__showAddTask.get();
    }
    set showAddTask(newValue: boolean) {
        this.__showAddTask.set(newValue);
    }
    private __showAddEvent: ObservedPropertySimplePU<boolean>;
    get showAddEvent() {
        return this.__showAddEvent.get();
    }
    set showAddEvent(newValue: boolean) {
        this.__showAddEvent.set(newValue);
    }
    private __newTaskTitle: ObservedPropertySimplePU<string>;
    get newTaskTitle() {
        return this.__newTaskTitle.get();
    }
    set newTaskTitle(newValue: string) {
        this.__newTaskTitle.set(newValue);
    }
    private __newEventTitle: ObservedPropertySimplePU<string>;
    get newEventTitle() {
        return this.__newEventTitle.get();
    }
    set newEventTitle(newValue: string) {
        this.__newEventTitle.set(newValue);
    }
    private __newEventTime: ObservedPropertySimplePU<string>;
    get newEventTime() {
        return this.__newEventTime.get();
    }
    set newEventTime(newValue: string) {
        this.__newEventTime.set(newValue);
    }
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
    private __calendarScale: ObservedPropertySimplePU<number>;
    get calendarScale() {
        return this.__calendarScale.get();
    }
    set calendarScale(newValue: number) {
        this.__calendarScale.set(newValue);
    }
    private __calendarOpacity: ObservedPropertySimplePU<number>;
    get calendarOpacity() {
        return this.__calendarOpacity.get();
    }
    set calendarOpacity(newValue: number) {
        this.__calendarOpacity.set(newValue);
    }
    private __taskScale: ObservedPropertySimplePU<number>;
    get taskScale() {
        return this.__taskScale.get();
    }
    set taskScale(newValue: number) {
        this.__taskScale.set(newValue);
    }
    private __taskOpacity: ObservedPropertySimplePU<number>;
    get taskOpacity() {
        return this.__taskOpacity.get();
    }
    set taskOpacity(newValue: number) {
        this.__taskOpacity.set(newValue);
    }
    // 页面入场动画 - 只在页面加载时触发
    private animateIn() {
        Context.animateTo({ duration: 600, curve: Curve.EaseOut, delay: 100 }, () => {
            this.titleScale = 1;
            this.titleOpacity = 1;
        });
        Context.animateTo({ duration: 600, curve: Curve.EaseOut, delay: 200 }, () => {
            this.calendarScale = 1;
            this.calendarOpacity = 1;
        });
        Context.animateTo({ duration: 600, curve: Curve.EaseOut, delay: 300 }, () => {
            this.taskScale = 1;
            this.taskOpacity = 1;
        });
    }
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    getCalendarDays(): CalendarDay[] {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        const days: CalendarDay[] = [];
        const today = new Date();
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dateStr = this.formatDate(date);
            const hasTasks = this.tasks.some(task => task.date === dateStr);
            const hasEvents = this.events.some(event => event.date === dateStr);
            days.push({
                date: date,
                isCurrentMonth: date.getMonth() === month,
                isToday: date.toDateString() === today.toDateString(),
                hasTasks: hasTasks,
                hasEvents: hasEvents
            });
        }
        return days;
    }
    getWeeks(): CalendarDay[][] {
        const weeks: CalendarDay[][] = [];
        const days = this.getCalendarDays();
        for (let i = 0; i < 6; i++) {
            weeks.push(days.slice(i * 7, (i + 1) * 7));
        }
        return weeks;
    }
    getSelectedDateStr(): string {
        return this.formatDate(this.selectedDate);
    }
    getDayTasks(): CalendarTask[] {
        const selectedDateStr = this.getSelectedDateStr();
        return this.tasks.filter(task => task.date === selectedDateStr);
    }
    getDayEvents(): CalendarEvent[] {
        const selectedDateStr = this.getSelectedDateStr();
        return this.events.filter(event => event.date === selectedDateStr);
    }
    getWeekDays(): string[] {
        return ['日', '一', '二', '三', '四', '五', '六'];
    }
    // 页面切换动画
    private animateTransition(callback: () => void) {
        Context.animateTo({
            duration: 200,
            curve: Curve.EaseIn,
            onFinish: callback
        }, () => {
            this.titleOpacity = 0;
            this.calendarOpacity = 0;
            this.taskOpacity = 0;
        });
    }
    changeMonth(delta: number): void {
        const newDate = new Date(this.currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        this.currentDate = newDate;
    }
    selectDate(date: Date): void {
        this.selectedDate = date;
    }
    toggleTask(taskId: string): void {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.tasks[index].completed = !this.tasks[index].completed;
        }
    }
    deleteTask(taskId: string): void {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
    deleteEvent(eventId: string): void {
        const index = this.events.findIndex(event => event.id === eventId);
        if (index !== -1) {
            this.events.splice(index, 1);
        }
    }
    aboutToAppear() {
        this.generateScramble();
        this.loadBestTime();
        // 确保页面返回时重置为可见状态
        this.resetVisibility();
        this.animateIn();
    }
    onPageShow() {
        // 页面重新显示时重置可见性和动画
        this.resetVisibility();
        this.animateIn();
    }
    private resetVisibility(): void {
        // 强制重置所有动画状态为可见
        this.titleScale = 1;
        this.titleOpacity = 1;
        this.cardScale = 1;
        this.cardOpacity = 1;
        this.itemScale = 1;
        this.itemOpacity = 1;
        this.buttonScale = 1;
        this.buttonOpacity = 1;
        this.timerScale = 1;
        this.timerOpacity = 1;
        this.navScale = 1;
        this.navOpacity = 1;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F9FAFB');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏
            Row.create();
            // 顶部标题栏
            Row.width('100%');
            // 顶部标题栏
            Row.padding(16);
            // 顶部标题栏
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('日历');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
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
            Image.fillColor('#6B7280');
            Image.onClick(() => this.animateTransition(() => navigationManager.navigateBack()));
        }, Image);
        // 顶部标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 月份导航
            Row.create();
            // 月份导航
            Row.width('100%');
            // 月份导航
            Row.padding({ left: 16, right: 16, bottom: 12 });
            // 月份导航
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 月份导航
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.onClick(() => this.changeMonth(-1));
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.currentDate.getFullYear()}年${this.currentDate.getMonth() + 1}月`);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1F2937');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.cubetime", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#6B7280');
            Image.rotate({ angle: 180 });
            Image.onClick(() => this.changeMonth(1));
        }, Image);
        // 月份导航
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 星期标题
            Row.create();
            // 星期标题
            Row.width('100%');
            // 星期标题
            Row.padding({ left: 16, right: 16, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const day = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(day);
                    Text.fontSize(14);
                    Text.fontColor('#6B7280');
                    Text.layoutWeight(1);
                    Text.textAlign(TextAlign.Center);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getWeekDays(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 星期标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日历网格
            Column.create();
            // 日历网格
            Column.width('100%');
            // 日历网格
            Column.padding({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const week = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const day = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Stack.create();
                            Stack.width(40);
                            Stack.height(40);
                            Stack.onClick(() => this.selectDate(day.date));
                        }, Stack);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width(40);
                            Column.height(40);
                            Column.borderRadius(20);
                            Column.backgroundColor(day.isToday ? '#10B981' : 'transparent');
                            Column.justifyContent(FlexAlign.Center);
                            Column.alignItems(HorizontalAlign.Center);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(day.date.getDate().toString());
                            Text.fontSize(14);
                            Text.fontColor(day.isCurrentMonth ?
                                (day.isToday ? '#FFFFFF' : '#1F2937') : '#9CA3AF');
                            Text.fontWeight(day.isToday ? FontWeight.Bold : FontWeight.Normal);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (day.hasTasks || day.hasEvents) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.margin({ top: 2 });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (day.hasTasks) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Circle.create();
                                                    Circle.width(4);
                                                    Circle.height(4);
                                                    Circle.fill('#EF4444');
                                                    Circle.margin({ right: 2 });
                                                }, Circle);
                                            });
                                        }
                                        else {
                                            this.ifElseBranchUpdateFunction(1, () => {
                                            });
                                        }
                                    }, If);
                                    If.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (day.hasEvents) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Circle.create();
                                                    Circle.width(4);
                                                    Circle.height(4);
                                                    Circle.fill('#10B981');
                                                }, Circle);
                                            });
                                        }
                                        else {
                                            this.ifElseBranchUpdateFunction(1, () => {
                                            });
                                        }
                                    }, If);
                                    If.pop();
                                    Row.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        Column.pop();
                        Stack.pop();
                    };
                    this.forEachUpdateFunction(elmtId, week, forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getWeeks(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 日历网格
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 选中日期详情
            Column.create();
            // 选中日期详情
            Column.width('100%');
            // 选中日期详情
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.selectedDate.getMonth() + 1}月${this.selectedDate.getDate()}日`);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 任务列表
            Column.create();
            // 任务列表
            Column.width('100%');
            // 任务列表
            Column.padding({ left: 16, right: 16, top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('任务');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1F2937');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加');
            Button.fontSize(12);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#10B981');
            Button.borderRadius(8);
            Button.padding({ left: 8, right: 8, top: 4, bottom: 4 });
            Button.onClick(() => this.showAddTask = true);
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.height(120);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const task = _item;
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
                            Row.create();
                            Row.width('100%');
                            Row.alignItems(VerticalAlign.Center);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Checkbox.create();
                            Checkbox.select(task.completed);
                            Checkbox.width(20);
                            Checkbox.height(20);
                            Checkbox.selectedColor('#10B981');
                            Checkbox.onChange((value: boolean) => {
                                const index = this.tasks.findIndex(t => t.id === task.id);
                                if (index !== -1) {
                                    this.tasks[index].completed = value;
                                }
                            });
                        }, Checkbox);
                        Checkbox.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(task.title);
                            Text.fontSize(14);
                            Text.fontColor(task.completed ? '#9CA3AF' : '#1F2937');
                            Text.decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None });
                            Text.layoutWeight(1);
                            Text.margin({ left: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('删除');
                            Button.fontSize(10);
                            Button.fontColor('#FFFFFF');
                            Button.backgroundColor('#EF4444');
                            Button.borderRadius(6);
                            Button.padding({ left: 6, right: 6, top: 2, bottom: 2 });
                            Button.onClick(() => this.deleteTask(task.id));
                        }, Button);
                        Button.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.getDayTasks(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        // 任务列表
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 事件列表
            Column.create();
            // 事件列表
            Column.width('100%');
            // 事件列表
            Column.padding({ left: 16, right: 16, top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('事件');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1F2937');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加');
            Button.fontSize(12);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#10B981');
            Button.borderRadius(8);
            Button.padding({ left: 8, right: 8, top: 4, bottom: 4 });
            Button.onClick(() => this.showAddEvent = true);
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.height(120);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const event = _item;
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
                            Row.create();
                            Row.width('100%');
                            Row.alignItems(VerticalAlign.Center);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(event.title);
                            Text.fontSize(14);
                            Text.fontColor('#1F2937');
                            Text.layoutWeight(1);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(event.time);
                            Text.fontSize(12);
                            Text.fontColor('#6B7280');
                            Text.margin({ right: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('删除');
                            Button.fontSize(10);
                            Button.fontColor('#FFFFFF');
                            Button.backgroundColor('#EF4444');
                            Button.borderRadius(6);
                            Button.padding({ left: 6, right: 6, top: 2, bottom: 2 });
                            Button.onClick(() => this.deleteEvent(event.id));
                        }, Button);
                        Button.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.getDayEvents(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        // 事件列表
        Column.pop();
        // 选中日期详情
        Column.pop();
        Column.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CalendarPage";
    }
}
registerNamedRoute(() => new CalendarPage(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Calendar", pageFullPath: "entry/src/main/ets/pages/Calendar", integratedHsp: "false", moduleType: "followWithHap" });
