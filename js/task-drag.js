// =========================================================
// feature/drag-move —— 相嘉乐（前端C）
// 功能：HTML5 拖拽 API，把卡片拖到其他列即可更新任务状态
//
// 使用方法：
// 1. 新建文件 js/task-drag.js，把本文件内容复制进去
// 2. 在 index.html 中把"相嘉乐"的注释行替换为：
//        <script src="js/task-drag.js"></script>
// 3. （可选）在 css/style.css 末尾追加拖拽时的视觉反馈样式：
//        .kanban-column.drag-over { outline: 2px dashed #4a69bd; }
//        .task-card.dragging { opacity: .5; }
// =========================================================

(function () {
  let draggedId = null;

  // 每次看板渲染后，把卡片设为可拖拽（renderBoard 会重建 DOM）
  function enableDragging() {
    document.querySelectorAll('.task-card').forEach((card) => {
      card.draggable = true;
    });
  }
  document.addEventListener('DOMContentLoaded', enableDragging);
  document.addEventListener('board:rendered', enableDragging);

  // ---------- 拖拽开始 / 结束 ----------
  document.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.task-card');
    if (!card) return;
    draggedId = Number(card.dataset.id);
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(draggedId)); // Firefox 需要设置数据
  });

  document.addEventListener('dragend', (e) => {
    const card = e.target.closest('.task-card');
    if (card) card.classList.remove('dragging');
    document.querySelectorAll('.kanban-column.drag-over').forEach((c) => c.classList.remove('drag-over'));
    draggedId = null;
  });

  // ---------- 拖拽经过列：允许放置并高亮 ----------
  document.addEventListener('dragover', (e) => {
    const column = e.target.closest('.kanban-column');
    if (!column || draggedId === null) return;
    e.preventDefault(); // 必须阻止默认行为，否则不会触发 drop
    e.dataTransfer.dropEffect = 'move';
    column.classList.add('drag-over');
  });

  document.addEventListener('dragleave', (e) => {
    const column = e.target.closest('.kanban-column');
    if (column) column.classList.remove('drag-over');
  });

  // ---------- 放下：更新任务状态并保存 ----------
  document.addEventListener('drop', (e) => {
    const column = e.target.closest('.kanban-column');
    if (!column || draggedId === null) return;
    e.preventDefault();
    column.classList.remove('drag-over');

    const newStatus = column.dataset.column;
    const task = tasks.find((t) => t.id === draggedId);
    if (task && newStatus && task.status !== newStatus) {
      task.status = newStatus;
      TaskStore.save(tasks);
      renderBoard();
    }
    draggedId = null;
  });
})();
