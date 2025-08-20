interface Task {
  id: string
  title: string
  completed: boolean
}

@Entry
@Component
struct Tasks {
  @State tasks: Array<Task> = [
    { id: '1', title: '完成项目报告', completed: false },
    { id: '2', title: '学习鸿蒙开发', completed: true },
    { id: '3', title: '锻炼身体', completed: false }
  ]

  build() {
    Column() {
      Text('待办事项')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin(16)

      List({ space: 8 }) {
        ForEach(this.tasks, (item: Task) => {
          ListItem() {
            Row() {
              Text(item.title)
                .fontSize(16)
                .layoutWeight(1)
              
              Text(item.completed ? '已完成' : '未完成')
                .fontSize(14)
                .fontColor(item.completed ? '#10B981' : '#EF4444')
            }
            .width('100%')
            .padding(16)
          }
        })
      }
      .layoutWeight(1)
      .padding(16)
    }
    .width('100%')
    .height('100%')
  }
}