// js/app.js —— 入口与看板渲染（组长初始化）
// 全局任务数组，其他功能分支脚本可直接读写
let tasks = TaskStore.load();

function renderBoard() {
  TaskStore.COLUMNS.forEach((col) => {
    const list = document.querySelector(`[data-column="${col}"] .task-list`);
    if (!list) return;
    list.innerHTML = '';
    tasks
      .filter((t) => t.status === col)
      .forEach((task) => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.dataset.id = task.id;
        card.innerHTML = `
          <div class="task-title"></div>
          <div class="task-assignee"></div>
        `;
        // 用 textContent 防止 XSS
        card.querySelector('.task-title').textContent = task.title;
        card.querySelector('.task-assignee').textContent = task.assignee
          ? '负责人：' + task.assignee
          : '';
        list.appendChild(card);
      });
  });
  // 通知其他功能脚本（如拖拽功能）看板已重新渲染
  document.dispatchEvent(new CustomEvent('board:rendered'));
}

document.addEventListener('DOMContentLoaded', renderBoard);
