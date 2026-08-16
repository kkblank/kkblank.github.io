# kkblank.github.io 网站设计与维护方案

## 1. 项目架构

```
kkblank.github.io/
├── index.html                 # 首页（个人简介/入口）
├── pages/
│   ├── about.html             # 关于我（教育、经历、项目、技能）
│   ├── articles.html          # 文章列表（待扩展）
│   ├── notes.html             # 技术笔记（待扩展）
│   └── contact.html           # 联系方式
├── assets/
│   ├── css/
│   │   └── styles.css         # 全局样式 + Pure.css 覆盖
│   ├── js/
│   │   └── components.js      # 导航栏 + 页脚 JS 注入
│   └── images/                # 图片资源
├── README.md
├── AGENTS.md
├── DESIGN.md                  # 本文件
└── .gitignore
```

### 目录职责

| 目录/文件 | 说明 |
|-----------|------|
| `index.html` | 网站首页，唯一放在根目录的页面（GitHub Pages 约定） |
| `pages/` | 所有次级页面，统一管理 |
| `assets/css/styles.css` | 全局样式文件，含 Pure.css CDN 引入 + 自定义样式 |
| `assets/js/components.js` | 公共组件注入脚本（nav + footer） |
| `assets/images/` | 所有图片资源 |

## 2. 技术栈

| 层次 | 选型 | 说明 |
|------|------|------|
| **宿主** | GitHub Pages | 静态托管，零服务端 |
| **标记语言** | HTML5 | 语义化标签（`<header>`、`<nav>`、`<main>`、`<footer>` 等） |
| **样式** | Pure.css (CDN) + 自定义 CSS | 轻量 4KB 框架 + `styles.css` 覆盖 |
| **脚本** | 原生 JavaScript (ES6+) | 仅用于组件注入，无框架依赖 |
| **图标** | Font Awesome (CDN) | 社交链接、导航图标等 |
| **字体** | 系统字体栈 | 无需额外加载，性能优先 |

## 3. 模块化设计（JS 组件注入）

### 3.1 原理

所有页面共用的 **导航栏** 和 **页脚** 由 `assets/js/components.js` 统一生成。

### 3.2 components.js 职责

- 定义导航配置 `NAV_ITEMS`（页面标题与路径映射）
- 根据当前 URL 高亮对应导航项
- 渲染导航栏 HTML 插入 `#navbar`
- 渲染页脚 HTML 插入 `#footer`

### 3.3 每个页面的模板结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>页面标题 - kkblank</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
</head>
<body>
  <div id="navbar"></div>
  <main class="container">
    <!-- 本页独有内容 -->
  </main>
  <div id="footer"></div>
  <script src="/assets/js/components.js"></script>
</body>
</html>
```

### 3.4 扩展新页面的步骤

1. 在 `pages/` 下新建 `.html`
2. 复制上述模板结构
3. 在 `<main>` 中写本页内容
4. 若需加入导航，在 `components.js` 的 `NAV_ITEMS` 中添加一条记录

## 4. 样式体系

### 4.1 CSS 自定义属性

```css
:root {
  --primary: #4a6cf7;           /* 主题色 */
  --primary-dark: #3b5de7;      /* 主题深色 */
  --bg: #f5f7fa;                /* 背景色 */
  --card-bg: #ffffff;           /* 卡片背景 */
  --text: #333333;              /* 主文字色 */
  --text-light: #666666;        /* 次要文字 */
  --text-muted: #999999;        /* 弱化文字 */
  --shadow: 0 2px 12px rgba(0,0,0,0.08);
  --shadow-hover: 0 4px 20px rgba(0,0,0,0.12);
  --radius: 12px;               /* 圆角 */
  --radius-sm: 8px;             /* 小圆角 */
  --max-width: 800px;           /* 最大内容宽度 */
  --nav-height: 60px;           /* 导航栏高度 */
}
```

### 4.2 Pure.css 使用约定

| 场景 | Pure.css 类 | 说明 |
|------|-------------|------|
| **导航栏** | `.pure-menu` | 水平菜单组件 |
| **按钮** | `.pure-button` / `.pure-button-primary` | 统一按钮样式 |
| **表单** | `.pure-form` | 联系表单 |
| **表格** | `.pure-table` | 文章/笔记列表 |

> 注：页面主体布局主要使用自定义 `.container`，Pure.css 网格组件（`.pure-g`）可根据需要选用。

### 4.3 自定义样式（styles.css）职责

- 页面整体布局：`.container` 固定宽度 + 居中
- 卡片样式：`.card` 圆角 + 柔和阴影
- 色彩主题：CSS 自定义属性定义主色 / 辅色
- 导航高亮：`.nav-active` 当前页标识
- 页脚样式：固定底栏
- 响应式断点补充

### 4.4 卡片式风格

```css
.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-hover);
}
```

## 5. 页面规划

| 页面 | 优先级 | 内容概要 | 当前状态 |
|------|--------|----------|----------|
| `index.html` | P0 | 头像 + 一句话简介 + 技能标签 + 内容入口 | ✅ 已完成 |
| `pages/about.html` | P0 | 个人经历 / 教育背景 / 技术栈详细列表 | ✅ 已完成 |
| `pages/contact.html` | P0 | 邮箱 / GitHub / 社交链接 | ✅ 已完成 |
| `pages/articles.html` | P1 | 文章列表卡片（标题 + 摘要 + 日期） | ⚠️ 占位 |
| `pages/notes.html` | P1 | 技术笔记列表 | ⚠️ 占位 |

> P0 = 首版必须，P1 = 首版可选 / 后续补充

## 6. 维护规范

### 6.1 新增页面

1. 在 `pages/` 下创建 `.html`
2. 从既有页面复制 `<head>` 和 `<body>` 的模板结构
3. 将内容写在 `<main class="container">` 内
4. 若需加入导航，更新 `components.js` 中的 `NAV_ITEMS`

### 6.2 修改导航/页脚

- 只改 `assets/js/components.js` 一个文件，所有页面自动生效

### 6.3 修改全局样式

- 只改 `assets/css/styles.css` 一个文件
- 自定义变量在 `:root` 中集中管理，便于换肤

### 6.4 添加图片

- 放入 `assets/images/`
- HTML 中路径写 `/assets/images/xxx.png`
- 推荐使用 WebP 格式（更小体积），降级为 PNG

### 6.5 Git 提交规范

```
feat: 新增 about 页面
feat: 添加导航栏组件注入
style: 调整卡片阴影与圆角
fix: 修复移动端导航栏错位
```

### 6.6 发布

```bash
git add .
git commit -m "feat: xxxx"
git push origin main
```

推送后 GitHub 自动部署，约 1-2 分钟生效。

## 7. 开发环境

纯静态无需构建工具。本地预览方式：

```bash
# 方式一：Node.js live-server
npx live-server

# 方式二：VS Code Live Server 插件

# 方式三：Python
python -m http.server 8000
```

## 8. 未来扩展路径

| 需求 | 方案 |
|------|------|
| **增加页面** | 在 `pages/` 下新建文件 + 更新 `NAV_ITEMS` |
| **增加导航层级（如文章分类）** | `components.js` 支持二级菜单渲染 |
| **深色模式** | `styles.css` 添加 `[data-theme="dark"]` 变量覆盖 + JS 切换按钮 |
| **SEO 优化** | 每个页面添加 `<meta name="description">` 和 Open Graph 标签 |
| **评论功能** | 嵌入 Giscus / Utterances（基于 GitHub Issues） |
| **访问统计** | 嵌入 Umami / Plausible 等轻量分析工具 |
| **博客 RSS** | 使用 feed-me 或类似服务生成 RSS |
