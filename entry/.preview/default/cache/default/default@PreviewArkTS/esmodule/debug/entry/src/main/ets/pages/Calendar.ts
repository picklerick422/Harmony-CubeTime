if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CalendarPage_Params {
    itemScale?: number;
    itemOpacity?: number;
    cardScale?: number;
    cardOpacity?: number;
    timerScale?: number;
    timerOpacity?: number;
    navScale?: number;
    navOpacity?: number;
    state?: CalendarState;
}
import { NavigationManager, NavigationHelper } from "@bundle:com.example.cubetime/entry/ets/utils/NavigationManager";
interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    completed: boolean;
}
interface CalendarState {
    events: CalendarEvent[];
    selectedDate: Date;
    currentMonth: Date;
    navigationManager?: NavigationManager;
    animationState: {
        contentScale: number;
        contentOpacity: number;
        titleTranslateY: number;
        titleOpacity: number;
        calendarScale: number;
        calendarOpacity: number;
        buttonScale: number;
        buttonOpacity: number;
        listScale?: number;
        sectionScale?: number;
        itemScale?: number;
        itemOpacity?: number;
        cardScale?: number;
        cardOpacity?: number;
        timerScale?: number;
        timerOpacity?: number;
        navScale?: number;
        navOpacity?: number;
    };
}
class CalendarPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__itemScale = new ObservedPropertySimplePU(0.8, this, "itemScale");
        this.__itemOpacity = new ObservedPropertySimplePU(0, this, "itemOpacity");
        this.__cardScale = new ObservedPropertySimplePU(0.8, this, "cardScale");
        this.__cardOpacity = new ObservedPropertySimplePU(0, this, "cardOpacity");
        this.__timerScale = new ObservedPropertySimplePU(0.8, this, "timerScale");
        this.__timerOpacity = new ObservedPropertySimplePU(0, this, "timerOpacity");
        this.__navScale = new ObservedPropertySimplePU(0.8, this, "navScale");
        this.__navOpacity = new ObservedPropertySimplePU(0, this, "navOpacity");
        this.__state = new ObservedPropertyObjectPU({
            events: [
                { id: '1', title: '项目会议', date: new Date(), completed: false },
                { id: '2', title: '代码审查', date: new Date(Date.now() + 86400000), completed: true },
                { id: '3', title: '产品演示', date: new Date(Date.now() + 172800000), completed: false }
            ],
            selectedDate: new Date(),
            currentMonth: new Date(),
            animationState: {
                contentScale: 0.9,
                contentOpacity: 0,
                titleTranslateY: -20,
                titleOpacity: 0,
                calendarScale: 0.8,
                calendarOpacity: 0,
                buttonScale: 0.8,
                buttonOpacity: 0,
                itemScale: 0.8,
                itemOpacity: 0,
                cardScale: 0.8,
                cardOpacity: 0,
                timerScale: 0.8,
                timerOpacity: 0,
                navScale: 0.8,
                navOpacity: 0
            }
        }, this, "state");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CalendarPage_Params) {
        if (params.itemScale !== undefined) {
            this.itemScale = params.itemScale;
        }
        if (params.itemOpacity !== undefined) {
            this.itemOpacity = params.itemOpacity;
        }
        if (params.cardScale !== undefined) {
            this.cardScale = params.cardScale;
        }
        if (params.cardOpacity !== undefined) {
            this.cardOpacity = params.cardOpacity;
        }
        if (params.timerScale !== undefined) {
            this.timerScale = params.timerScale;
        }
        if (params.timerOpacity !== undefined) {
            this.timerOpacity = params.timerOpacity;
        }
        if (params.navScale !== undefined) {
            this.navScale = params.navScale;
        }
        if (params.navOpacity !== undefined) {
            this.navOpacity = params.navOpacity;
        }
        if (params.state !== undefined) {
            this.state = params.state;
        }
    }
    updateStateVars(params: CalendarPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__itemScale.purgeDependencyOnElmtId(rmElmtId);
        this.__itemOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
        this.__cardOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__timerScale.purgeDependencyOnElmtId(rmElmtId);
        this.__timerOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__navScale.purgeDependencyOnElmtId(rmElmtId);
        this.__navOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__state.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__itemScale.aboutToBeDeleted();
        this.__itemOpacity.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__cardOpacity.aboutToBeDeleted();
        this.__timerScale.aboutToBeDeleted();
        this.__timerOpacity.aboutToBeDeleted();
        this.__navScale.aboutToBeDeleted();
        this.__navOpacity.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __itemScale: ObservedPropertySimplePU<number>;
    get itemScale() {
        return this.__itemScale.get();
    }
    set itemScale(newValue: number) {
        this.__itemScale.set(newValue);
    }
    private __itemOpacity: ObservedPropertySimplePU<number>;
    get itemOpacity() {
        return this.__itemOpacity.get();
    }
    set itemOpacity(newValue: number) {
        this.__itemOpacity.set(newValue);
    }
    private __cardScale: ObservedPropertySimplePU<number>;
    get cardScale() {
        return this.__cardScale.get();
    }
    set cardScale(newValue: number) {
        this.__cardScale.set(newValue);
    }
    private __cardOpacity: ObservedPropertySimplePU<number>;
    get cardOpacity() {
        return this.__cardOpacity.get();
    }
    set cardOpacity(newValue: number) {
        this.__cardOpacity.set(newValue);
    }
    private __timerScale: ObservedPropertySimplePU<number>;
    get timerScale() {
        return this.__timerScale.get();
    }
    set timerScale(newValue: number) {
        this.__timerScale.set(newValue);
    }
    private __timerOpacity: ObservedPropertySimplePU<number>;
    get timerOpacity() {
        return this.__timerOpacity.get();
    }
    set timerOpacity(newValue: number) {
        this.__timerOpacity.set(newValue);
    }
    private __navScale: ObservedPropertySimplePU<number>;
    get navScale() {
        return this.__navScale.get();
    }
    set navScale(newValue: number) {
        this.__navScale.set(newValue);
    }
    private __navOpacity: ObservedPropertySimplePU<number>;
    get navOpacity() {
        return this.__navOpacity.get();
    }
    set navOpacity(newValue: number) {
        this.__navOpacity.set(newValue);
    }
    private __state: ObservedPropertyObjectPU<CalendarState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: CalendarState) {
        this.__state.set(newValue);
    }
    aboutToAppear() {
        const navigationManager = NavigationManager.getInstance();
        this.state.navigationManager = navigationManager;
        this.state.animationState = navigationManager.getInitialState();
        // 页面进入动画
        setTimeout(() => {
            navigationManager.animateIn();
        }, 100);
    }
    onPageShow() {
        this.resetVisibility();
        this.animateIn();
    }
    private resetVisibility(): void {
        this.state.animationState = {
            contentScale: 0.9,
            contentOpacity: 0,
            titleTranslateY: -20,
            titleOpacity: 0,
            calendarScale: 0.8,
            calendarOpacity: 0,
            buttonScale: 0.8,
            buttonOpacity: 0,
            listScale: 1,
            sectionScale: 1,
            itemScale: 0.8,
            itemOpacity: 0,
            cardScale: 0.8,
            cardOpacity: 0,
            timerScale: 0.8,
            timerOpacity: 0,
            navScale: 0.8,
            navOpacity: 0
        };
    }
    private animateTransition(duration: number = 250): void {
        if (this.state.navigationManager) {
            this.state.navigationManager.animateOut();
        }
    }
    private generateScramble(): void {
        // 日历页面不需要生成打乱，保持空实现
    }
    private loadBestTime(): void {
        // 日历页面不需要加载最佳时间，保持空实现
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Calendar.ets(132:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F7FA');
            Column.scale({ x: this.state.animationState.contentScale, y: this.state.animationState.contentScale });
            Column.opacity(this.state.animationState.contentOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Calendar.ets(134:7)", "entry");
            // 标题区域
            Row.width('100%');
            // 标题区域
            Row.padding({ left: 20, right: 20, top: 60, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('日历视图');
            Text.debugLine("entry/src/main/ets/pages/Calendar.ets(135:9)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.scale({ x: this.state.animationState.titleOpacity, y: this.state.animationState.titleOpacity });
            Text.opacity(this.state.animationState.titleOpacity);
            Text.translate({ y: this.state.animationState.titleTranslateY });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Calendar.ets(143:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.ic_public_back'));
            Image.debugLine("entry/src/main/ets/pages/Calendar.ets(145:9)", "entry");
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                NavigationHelper.navigateBack(this.state.navigationManager);
            });
        }, Image);
        // 标题区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日历头部
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Calendar.ets(156:7)", "entry");
            // 日历头部
            Row.width('100%');
            // 日历头部
            Row.padding({ left: 20, right: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatMonth(this.state.currentMonth));
            Text.debugLine("entry/src/main/ets/pages/Calendar.ets(157:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Calendar.ets(162:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Calendar.ets(164:9)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.ic_public_arrow_left'));
            Image.debugLine("entry/src/main/ets/pages/Calendar.ets(165:11)", "entry");
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                this.previousMonth();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.ic_public_arrow_right'));
            Image.debugLine("entry/src/main/ets/pages/Calendar.ets(172:11)", "entry");
            Image.width(24);
            Image.height(24);
            Image.margin({ left: 20 });
            Image.onClick(() => {
                this.nextMonth();
            });
        }, Image);
        Row.pop();
        // 日历头部
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日历网格
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Calendar.ets(185:7)", "entry");
            // 日历网格
            Column.width('100%');
            // 日历网格
            Column.padding({ left: 20, right: 20 });
            // 日历网格
            Column.backgroundColor('#FFFFFF');
            // 日历网格
            Column.borderRadius(16);
            // 日历网格
            Column.margin({ left: 20, right: 20, bottom: 20 });
            // 日历网格
            Column.scale({ x: this.state.animationState.calendarScale, y: this.state.animationState.calendarScale });
            // 日历网格
            Column.opacity(this.state.animationState.calendarOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 星期标题
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Calendar.ets(187:9)", "entry");
            // 星期标题
            Row.width('100%');
            // 星期标题
            Row.padding({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const day = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(day);
                    Text.debugLine("entry/src/main/ets/pages/Calendar.ets(189:13)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#7F8C8D');
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
                    Row.debugLine("entry/src/main/ets/pages/Calendar.ets(201:11)", "entry");
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const date = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/Calendar.ets(203:15)", "entry");
                            Column.width('14%');
                            Column.aspectRatio(1);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                this.selectDate(date);
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(date.getDate().toString());
                            Text.debugLine("entry/src/main/ets/pages/Calendar.ets(204:17)", "entry");
                            Text.fontSize(16);
                            Text.fontColor(this.getDateColor(date));
                            Text.fontWeight(this.isToday(date) ? FontWeight.Bold : FontWeight.Normal);
                            Text.width(40);
                            Text.height(40);
                            Text.textAlign(TextAlign.Center);
                            Text.backgroundColor(this.isToday(date) ? '#4CAF50' : 'transparent');
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
            Column.debugLine("entry/src/main/ets/pages/Calendar.ets(235:7)", "entry");
            // 事件列表
            Column.width('100%');
            // 事件列表
            Column.padding({ left: 20, right: 20 });
            // 事件列表
            Column.scale({ x: this.state.animationState.buttonScale, y: this.state.animationState.buttonScale });
            // 事件列表
            Column.opacity(this.state.animationState.buttonOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日事件');
            Text.debugLine("entry/src/main/ets/pages/Calendar.ets(236:9)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/Calendar.ets(242:9)", "entry");
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
                        ListItem.debugLine("entry/src/main/ets/pages/Calendar.ets(244:13)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/Calendar.ets(245:15)", "entry");
                            Row.width('100%');
                            Row.padding(16);
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(12);
                            Row.margin({ bottom: 8 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/Calendar.ets(246:17)", "entry");
                            Column.alignItems(HorizontalAlign.Start);
                            Column.layoutWeight(1);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(event.title);
                            Text.debugLine("entry/src/main/ets/pages/Calendar.ets(247:19)", "entry");
                            Text.fontSize(16);
                            Text.fontColor('#2C3E50');
                            Text.margin({ bottom: 4 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.formatDate(event.date));
                            Text.debugLine("entry/src/main/ets/pages/Calendar.ets(252:19)", "entry");
                            Text.fontSize(12);
                            Text.fontColor('#7F8C8D');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Circle.create();
                            Circle.debugLine("entry/src/main/ets/pages/Calendar.ets(259:17)", "entry");
                            Circle.width(12);
                            Circle.height(12);
                            Circle.fill(event.completed ? '#4CAF50' : '#FF6B6B');
                        }, Circle);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.getEventsForDate(this.state.selectedDate), forEachItemGenFunction);
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
        if (date.getMonth() !== this.state.currentMonth.getMonth()) {
            return '#BDC3C7';
        }
        if (this.isToday(date)) {
            return Color.White;
        }
        return '#2C3E50';
    }
    private generateCalendarDays(): Date[][] {
        const year = this.state.currentMonth.getFullYear();
        const month = this.state.currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
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
        const newMonth = new Date(this.state.currentMonth);
        newMonth.setMonth(newMonth.getMonth() - 1);
        this.state.currentMonth = newMonth;
    }
    private nextMonth() {
        const newMonth = new Date(this.state.currentMonth);
        newMonth.setMonth(newMonth.getMonth() + 1);
        this.state.currentMonth = newMonth;
    }
    private selectDate(date: Date) {
        this.state.selectedDate = date;
    }
    private getEventsForDate(date: Date): CalendarEvent[] {
        return this.state.events.filter(event => event.date.toDateString() === date.toDateString());
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CalendarPage";
    }
}
registerNamedRoute(() => new CalendarPage(undefined, {}), "", { bundleName: "com.example.cubetime", moduleName: "entry", pagePath: "pages/Calendar", pageFullPath: "entry/src/main/ets/pages/Calendar", integratedHsp: "false", moduleType: "followWithHap" });
