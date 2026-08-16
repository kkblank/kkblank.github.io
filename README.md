# kkblank.github.io — 个人主页

一个基于 HTML5 + CSS + 原生 JavaScript 的静态个人网站，托管于 GitHub Pages。

## 🚀 快速开始

### 本地预览

无需构建工具，直接运行：

```bash
npx live-server
# 或
python -m http.server 8000
```

### 部署到 GitHub Pages

```bash
git add .
git commit -m "feat: 更新个人主页"
git push origin main
```

推送后约 1-2 分钟自动部署完成。

## 📁 项目结构

```
kkblank.github.io/
├── index.html               # 首页（GitHub Pages 入口）
├── pages/                   # 子页面
│   ├── about.html          # 关于我 ✅
│   ├── articles.html       # 文章列表 ⚠️ 占位
│   ├── notes.html          # 技术笔记 ⚠️ 占位
│   └── contact.html        # 联系方式 ✅
├── assets/
│   ├── css/
│   │   └── styles.css      # 全局样式（CSS 变量 + 响应式）
│   ├── js/
│   │   └── components.js   # 导航栏与页脚动态注入
│   └── images/             # 图片资源
├── DESIGN.md               # 设计与维护文档
├── AGENTS.md               # Agent 开发指南
├── README.md
└── .gitignore
```

## 🎨 设计特点

- **纯静态**: HTML5 + CSS3 + 原生 JS，无框架依赖
- **响应式**: 基于 Pure.css + 自定义 CSS 的移动端适配
- **组件化**: 导航栏和页脚通过 JS 动态注入，单点维护
- **卡片式设计**: 柔和的阴影与圆角，视觉统一
- **CSS 变量**: 主题色、字体色等集中管理，便于换肤

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Pure.css 3.0.0 (CDN) |
| 图标 | Font Awesome 6.5.0 (CDN) |
| 语言 | HTML5, CSS3, ES6+ |
| 托管 | GitHub Pages |
| 部署 | Git → GitHub → Pages 自动构建 |

## 📄 页面说明

### 首页 (`index.html`)

个人主页入口，展示：
- 个人头像
- 简介与座右铭
- 技能标签
- 内容入口

### 关于我 (`pages/about.html`)

详细介绍：
- 教育背景（硕士/本科）
- 工作经历（算法工程师项目经历）
- 个人项目（GitHub 项目链接）
- 学术成果（发明专利）
- 专业技能栈
- 获奖情况

### 文章列表 (`pages/articles.html`)

文章归档页面（待扩展）。

### 技术笔记 (`pages/notes.html`)

技术博客笔记集合（待扩展）。

### 联系方式 (`pages/contact.html`)

邮箱、GitHub、B 站等联系方式。

## 📝 开发规范

### Git 提交格式

```
feat: 新增功能
style: 样式调整
fix: 修复问题
docs: 文档更新
```

### 添加新页面

1. 在 `pages/` 目录下创建 `.html` 文件
2. 复制模板结构（参考 `index.html`）
3. 在 `<main class="container">` 中编写页面内容
4. 如需添加导航，在 `assets/js/components.js` 的 `NAV_ITEMS` 数组中添加条目

### 添加图片

```html
<!-- 推荐 WebP 格式，PNG 作为降级 -->
<img src="/assets/images/logo.webp" alt="logo" />
<img src="/assets/images/logo.png" alt="logo" onerror="this.style.display='none'" />
```

## 🎯 扩展方向

- [ ] 深色模式切换
- [ ] 文章评论功能 (Giscus / Utterances)
- [ ] 访问统计集成 (Umami / Plausible)
- [ ] SEO 优化 (Open Graph 标签)
- [ ] 多级导航菜单
- [ ] 博客 RSS 订阅

## 📄 许可证

MIT License

---

*保持简单，持续迭代*
