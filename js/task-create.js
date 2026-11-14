// =========================================================
// feature/create-delete —— 徐鑫（前端B）
// 功能：创建新任务（模态框表单）+ 删除任务（卡片上的删除按钮）
//
// 使用方法：
// 1. 新建文件 js/task-create.js，把本文件内容复制进去
// 2. 在 index.html 中把"徐鑫"的注释行替换为：
//        <script src="js/task-create.js"></script>
// 3. 在 js/app.js 的 renderBoard() 卡片模板里加一个删除按钮：
//        <button class="task-delete" title="删除任务">×</button>
//        （放在 card.innerHTML 模板最后）
// =========================================================

(function () {
  // ---------- 注入本功能所需的样式（自包含，避免与 UI 分支的 CSS 冲突） ----------
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.4);
      display: flex; align-items: center; justify-content: center; z-index: 100;
    }
    .modal {
      background: #fff; border-radius: 10px; padding: 20px;
      width: 320px; box-shadow: 0 8px 30px rgba(0,0,0,.2);
    }
    .modal h3 { margin: 0 0 14px; font-size: 16px; }
    .modal label { display: block; font-size: 13px; color: #57606f; margin: 10px 0 4px; }
    .modal input, .modal select {
      width: 100%; padding: 8px 10px; border: 1px solid #d2d6de;
      border-radius: 6px; font-size: 14px;
    }
    .modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
    .task-delete {
      position: absolute; top: 6px; right: 8px;
      border: none; background: transparent; color: #b0b8c4;
      font-size: 16px; cursor: pointer; line-height: 1;
    }
    .task-delete:hover { color: #e74c3c; }
    .task-card { position: relative; }
  `;
  document.head.appendChild(style);

  // ---------- 创建任务模态框 ----------
  function openCreateModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h3>新建任务</h3>
        <label>任务标题</label>
        <input id="task-title-input" type="text" placeholder="例如：完成用户故事地图" maxlength="50">
        <label>负责人</label>
        <input id="task-assignee-input" type="text" placeholder="例如：徐鑫" maxlength="20">
        <label>所在列</label>
        <select id="task-status-input">
          <option value="todo">待办</option>
          <option value="in-progress">进行中</option>
          <option value="done">已完成</option>
        </select>
        <div class="modal-actions">
          <button id="task-cancel-btn" type="button">取消</button>
          <button id="task-save-btn" type="button" class="btn-primary">保存</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const titleInput = overlay.querySelector('#task-title-input');
    titleInput.focus();

    const close = () => overlay.remove();

    overlay.querySelector('#task-cancel-btn').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onEsc); }
    });

    overlay.querySelector('#task-save-btn').addEventListener('click', () => {
      const title = titleInput.value.trim();
      if (!title) { alert('请填写任务标题'); return; }
      const assignee = overlay.querySelector('#task-assignee-input').value.trim();
      const status = overlay.querySelector('#task-status-input').value;
      createTask(title, assignee, status);
      close();
    });
  }

  function createTask(title, assignee, status) {
    tasks.push({ id: TaskStore.nextId(tasks), title, assignee, status });
    TaskStore.save(tasks);
    renderBoard();
  }

  // ---------- 删除任务（事件委托，卡片重渲染也无需重新绑定） ----------
  document.addEventListener('click', (e) => {
    const delBtn = e.target.closest('.task-delete');
    if (!delBtn) return;
    const card = delBtn.closest('.task-card');
    const id = Number(card.dataset.id);
    const task = tasks.find((t) => t.id === id);
    if (task && confirm(`确定删除任务「${task.title}」吗？`)) {
      tasks = tasks.filter((t) => t.id !== id);
      TaskStore.save(tasks);
      renderBoard();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('new-task-btn').addEventListener('click', openCreateModal);
  });
})();
