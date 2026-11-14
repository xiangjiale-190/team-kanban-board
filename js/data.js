// js/data.js —— 共享数据层（组长初始化）
// 所有功能分支共用：从 localStorage 读取 / 保存任务数据
const TaskStore = {
  KEY: 'team-kanban-tasks',
  COLUMNS: ['todo', 'in-progress', 'done'],

  load() {
    const raw = localStorage.getItem(this.KEY);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* 数据损坏则重新播种 */ }
    }
    const seed = [
      { id: 1, title: '搭建看板基础结构', assignee: '相嘉乐', status: 'done' },
      { id: 2, title: '美化看板 UI 与任务卡片', assignee: '魏斌耀', status: 'in-progress' },
      { id: 3, title: '实现创建/删除任务功能', assignee: '徐鑫', status: 'todo' },
      { id: 4, title: '实现拖拽移动卡片更新状态', assignee: '相嘉乐', status: 'todo' },
    ];
    this.save(seed);
    return seed;
  },

  save(tasks) {
    localStorage.setItem(this.KEY, JSON.stringify(tasks));
  },

  nextId(tasks) {
    return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  },
};
