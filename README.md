# 团队任务看板 (Team Kanban Board)

软件需求工程课程作业：使用 Git 和 Pull Request 协作开发的"团队任务看板"Web 应用。

## 功能

- 看板布局：待办 / 进行中 / 已完成 三列，展示任务卡片
- 创建新任务：填写标题、负责人、所在列
- 删除任务：一键删除卡片
- 拖拽移动卡片：拖动卡片到其他列即可更新状态

## 技术栈

- 前端：HTML5 + CSS3 + Vanilla JavaScript（无任何框架）
- 数据存储：浏览器 localStorage（无需后端和数据库）

## 运行方法

直接双击打开 `index.html`，或用 VS Code 的 Live Server 插件打开。

## 团队成员与角色

| 成员 | 角色 | 负责功能 |
|------|------|----------|
| 相嘉乐 | 项目负责人 / 前端C | 创建仓库、管理分支保护、审查合并所有 PR；实现拖拽移动卡片 |
| 魏斌耀 | 前端A | 看板 UI 布局与任务卡片展示样式 |
| 徐鑫 | 前端B | "创建新任务"和"删除任务"功能 |

## Git 工作流（Fork + Pull Request）

1. 项目负责人创建中央仓库 `team-kanban-board`，`main` 分支开启保护（至少 1 人审批）
2. 每位开发者 Fork 中央仓库到个人账户
3. `git clone` 自己的 Fork，并添加 `upstream` 远程指向中央仓库
4. 从最新的 `main` 拉出功能分支开发：
   - `feature/ui-layout` — 看板 UI 布局与任务卡展示（魏斌耀）
   - `feature/create-delete` — 创建/删除任务功能（徐鑫）
   - `feature/drag-move` — 拖拽移动卡片功能（相嘉乐）
5. 提交信息使用 `feat: 描述` / `chore: 描述` / `fix: 描述` 格式
6. push 到自己的 Fork，向中央仓库 `main` 发起 Pull Request
7. 至少一名队友审查（Review + Approve）后，由项目负责人 Squash and Merge
8. 合并后删除功能分支，并同步本地 `main`

## 项目结构

```
team-kanban-board/
├── index.html          # 页面结构
├── css/
│   └── style.css       # 样式（UI 分支完善）
├── js/
│   ├── data.js         # 共享数据层：localStorage 读写
│   ├── app.js          # 入口：看板渲染
│   ├── task-create.js  # 创建/删除任务（前端B 分支新增）
│   └── task-drag.js    # 拖拽移动卡片（前端C 分支新增）
└── README.md
```
