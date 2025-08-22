if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CalendarPage_Params {
    events?: CalendarEvent[];
    selectedDate?: Date;
    currentMonth?: Date;
    titleOpacity?: number;
    titleScale?: number;
    calendarOpacity?: number;
    calendarScale?: number;
    eventsOpacity?: number;
    eventsScale?: number;
}
import router from "@ohos:router";
interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    completed: boolean;
}
class CalendarPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__events = new ObservedPropertyObjectPU([
            { id: '1', title: '项目会议', date: new Date(), completed: false },
            { id: '2', title: '代码审查', date: new Date(Date.now() + 86400000), completed: true },
            { id: '3', title: '产品演示', date: new Date(Date.now() + 172800000), completed: false }
        ], this, "events");
        this.__selectedDate = new ObservedPropertyObjectPU(new Date(), this, "selectedDate");
        this.__currentMonth = new ObservedPropertyObjectPU(new Date(), this, "currentMonth");
        this.__titleOpacity = new ObservedPropertySimplePU(1, this, "titleOpacity");
        this.__titleScale = new ObservedPropertySimplePU(1, this, "titleScale");
        this.__calendarOpacity = new ObservedPropertySimplePU(1, this, "calendarOpacity");
        this.__calendarScale = new ObservedPropertySimplePU(1, this, "calendarScale");
        this.__eventsOpacity = new ObservedPropertySimplePU(1, this, "eventsOpacity");
        this.__eventsScale = new ObservedPropertySimplePU(1, this, "eventsScale");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CalendarPage_Params) {
        if (params.events !== undefined) {
            this.events = params.events;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.currentMonth !== undefined) {
            this.currentMonth = params.currentMonth;
        }
        if (params.titleOpacity !== undefined) {
            this.titleOpacity = params.titleOpacity;
        }
        if (params.titleScale !== undefined) {
            this.titleScale = params.titleScale;
        }
        if (params.calendarOpacity !== undefined) {
            this.calendarOpacity = params.calendarOpacity;
        }
        if (params.calendarScale !== undefined) {
            this.calendarScale = params.calendarScale;
        }
        if (params.eventsOpacity !== undefined) {
            this.eventsOpacity = params.eventsOpacity;
        }
        if (params.eventsScale !== undefined) {
            this.eventsScale = params.eventsScale;
        }
    }
    updateStateVars(params: CalendarPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__events.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDate.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__titleOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__titleScale.purgeDependencyOnElmtId(rmElmtId);
        this.__calendarOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__calendarScale.purgeDependencyOnElmtId(rmElmtId);
        this.__eventsOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__eventsScale.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__events.aboutToBeDeleted();
        this.__selectedDate.aboutToBeDeleted();
        this.__currentMonth.aboutToBeDeleted();
        this.__titleOpacity.aboutToBeDeleted();
        this.__titleScale.aboutToBeDeleted();
        this.__calendarOpacity.aboutToBeDeleted();
        this.__calendarScale.aboutToBeDeleted();
        this.__eventsOpacity.aboutToBeDeleted();
        this.__eventsScale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __events: ObservedPropertyObjectPU<CalendarEvent[]>;
    get events() {
        return this.__events.get();
    }
    set events(newValue: CalendarEvent[]) {
        this.__events.set(newValue);
    }
    private __selectedDate: ObservedPropertyObjectPU<Date>;
    get selectedDate() {
        return this.__selectedDate.get();
    }
    set selectedDate(newValue: Date) {
        this.__selectedDate.set(newValue);
    }
    private __currentMonth: ObservedPropertyObjectPU<Date>;
    get currentMonth() {
        return this.__currentMonth.get();
    }
    set currentMonth(newValue: Date) {
        this.__currentMonth.set(newValue);
    }
    private __titleOpacity: ObservedPropertySimplePU<number>;
    get titleOpacity() {
        return this.__titleOpacity.get();
    }
    set titleOpacity(newValue: number) {
        this.__titleOpacity.set(newValue);
    }
    private __titleScale: ObservedPropertySimplePU<number>;
    get titleScale() {
        return this.__titleScale.get();
    }
    set titleScale(newValue: number) {
        this.__titleScale.set(newValue);
    }
    private __calendarOpacity: ObservedPropertySimplePU<number>;
    get calendarOpacity() {
        return this.__calendarOpacity.get();
    }
    set calendarOpacity(newValue: number) {
        this.__calendarOpacity.set(newValue);
    }
    private __calendarScale: ObservedPropertySimplePU<number>;
    get calendarScale() {
        return this.__calendarScale.get();
    }
    set calendarScale(newValue: number) {
        this.__calendarScale.set(newValue);
    }
    private __eventsOpacity: ObservedPropertySimplePU<number>;
    get eventsOpacity() {
        return this.__eventsOpacity.get();
    }
    set eventsOpacity(newValue: number) {
        this.__eventsOpacity.set(newValue);
    }
    private __eventsScale: ObservedPropertySimplePU<number>;
    get eventsScale() {
        return this.__eventsScale.get();
    }
    set eventsScale(newValue: number) {
        this.__eventsScale.set(newValue);
    }
    aboutToAppear() {
        // 页面初始化
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F3F4F6');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统一标题栏设计
            Row.create();
            // 统一标题栏设计
            Row.width('100%');
            // 统一标题栏设计
            Row.height(56);
            // 统一标题栏设计
            Row.padding({ left: 16, right: 16 });
            // 统一标题栏设计
            Row.backgroundColor('#6366F1');
            // 统一标题栏设计
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 统一标题栏设计
            Row.alignItems(VerticalAlign.Center);
            // 统一标题栏设计
            Row.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('日历');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(24);
            Text.fontColor(Color.White);
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        // 统一标题栏设计
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日历头部
            Row.create();
            // 日历头部
            Row.width('100%');
            // 日历头部
            Row.padding({ left: 16, right: 16, top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatMonth(ObservedObject.GetRawObject(this.currentMonth)));
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('‹');
            Text.fontSize(24);
            Text.fontColor('#6B7280');
            Text.onClick(() => {
                this.previousMonth();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(24);
            Text.fontColor('#6B7280');
            Text.margin({ left: 20 });
            Text.onClick(() => {
                this.nextMonth();
            });
        }, Text);
        Text.pop();
        Row.pop();
        // 日历头部
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日历网格
            Column.create();
            // 日历网格
            Column.width('100%');
            // 日历网格
            Column.padding({ left: 16, right: 16, top: 16, bottom: 16 });
            // 日历网格
            Column.backgroundColor('#FFFFFF');
            // 日历网格
            Column.borderRadius(12);
            // 日历网格
            Column.margin({ left: 16, right: 16, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 星期标题
            Row.create();
            // 星期标题
            Row.width('100%');
            // 星期标题
            Row.padding({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const day = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(day);
                    Text.fontSize(14);
                    Text.fontColor('#6B7280');
                    Text.width('14%');
                    Text.textAlign(TextAlign.Center);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, ['日', '一', '二', '三', '四', '五', '六'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 星期标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日期网格
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const week = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const date = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('14%');
                            Column.aspectRatio(1);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                this.selectDate(date);
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(date.getDate().toString());
                            Text.fontSize(16);
                            Text.fontColor(this.getDateColor(date));
                            Text.fontWeight(this.isToday(date) ? FontWeight.Bold : FontWeight.Normal);
                            Text.width(40);
                            Text.height(40);
                            Text.textAlign(TextAlign.Center);
                            Text.backgroundColor(this.isToday(date) ? '#6366F1' : 'transparent');
                            Text.borderRadius(20);
                            Text.padding(4);
                        }, Text);
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, week, forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.generateCalendarDays(), forEachItemGenFunction);
        }, ForEach);
        // 日期网格
        ForEach.pop();
        // 日历网格
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 事件列表
            Column.create();
            // 事件列表
            Column.width('100%');
            // 事件列表
            Column.padding({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日事件');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F2937');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.layoutWeight(1);
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
                            Row.padding(16);
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(12);
                            Row.margin({ bottom: 8 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                            Column.layoutWeight(1);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(event.title);
                            Text.fontSize(16);
                            Text.fontColor('#1F2937');
                            Text.margin({ bottom: 4 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.formatDate(event.date));
                            Text.fontSize(12);
                            Text.fontColor('#6B7280');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Circle.create();
                            Circle.width(12);
                            Circle.height(12);
                            Circle.fill(event.completed ? '#10B981' : '#EF4444');
                        }, Circle);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.getEventsForDate(ObservedObject.GetRawObject(this.selectedDate)), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        // 事件列表
        Column.pop();
        Column.pop();
    }
    private formatMonth(date: Date): string {
        const months = ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'];
        return `${date.getFullYear()}年 ${months[date.getMonth()]}`;
    }
    private formatDate(date: Date): string {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
    private isToday(date: Date): boolean {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
    private getDateColor(date: Date): string | Color {
        const today = new Date();
        if (date.getMonth() !== this.currentMonth.getMonth()) {
            return '#9CA3AF';
        }
        if (this.isToday(date)) {
            return Color.White;
        }
        return '#1F2937';
    }
    private generateCalendarDays(): Date[][] {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        const weeks: Date[][] = [];
        let currentDate = new Date(startDate);
        for (let week = 0; week < 6; week++) {
            const weekDays: Date[] = [];
            for (let day = 0; day < 7; day++) {
                weekDays.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            weeks.push(weekDays);
        }
        return weeks;
    }
    private previousMonth() {
        const newMonth = new Date(this.currentMonth);
        newMonth.setMonth(newMonth.getMonth() - 1);
        this.currentMonth = newMonth;
    }
    private nextMonth() {
        const newMonth = new Date(this.currentMonth);
        newMonth.setMonth(newMonth.getMonth() + 1);
        this.currentMonth = newMonth;
    }
    private selectDate(date: Date) {
        this.selectedDate = date;
    }
    private getEventsForDate(date: Date): CalendarEvent[] {
        return this.events.filter(event => event.date.toDateString() === date.toDateString());
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CalendarPage";
    }
}
registerNamedRoute(() => new CalendarPage(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Calendar", pageFullPath: "entry/src/main/ets/pages/Calendar", integratedHsp: "false", moduleType: "followWithHap" });
