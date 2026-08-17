# 开源项目页面说明

## 📋 项目列表

当前已添加的 4 个开源项目：

| 项目名称 | 仓库链接 | 语言 | 说明 |
|---------|---------|------|------|
| Llamacpp-gui | [GitHub](https://github.com/kkblank/Llamacpp-gui) | Python | Llama.cpp 的图形化界面工具，简化本地大语言模型的使用体验 |
| Automation-Toolbox | [GitHub](https://github.com/kkblank/Automation-Toolbox) | Python | 自动化工具箱，提供丰富的自动化脚本和工具，提升工作效率 |
| MiniToolkit | [GitHub](https://github.com/kkblank/MiniToolkit) | Python | 轻量级开发工具集，包含常用开发小工具和生活实用工具 |
| bcfz | [GitHub](https://github.com/kkblank/bcfz) | Python | 个人财务管理工具，帮助你更好地管理和分析个人财务状况 |

## 🎨 页面设计

- **卡片式布局**：每个项目独立展示，响应式设计
- **项目截图**：使用渐变色占位符，请替换为实际截图
- **排序方式**：按创建时间排序（新到旧）

## ✏️ 如何更新

### 1. 添加项目截图

将项目截图放在 `assets/images/projects/` 目录下，然后在 `index.html` 中取消注释对应的截图代码：

```html
<!-- 取消注释以下代码，并修改图片路径 -->
<img src="/assets/images/projects/your-project.png" alt="Your Project 截图" />
```

### 2. 更新项目描述

编辑 `index.html` 中对应项目的 `<p class="project-desc">` 内容，填写更详细的项目介绍。

### 3. 更新项目时间

编辑 `<span class="project-date">` 中的时间信息。

### 4. 添加新项目

在 `projects-grid` 区域复制一个项目卡片模板，填写项目信息即可。

## 📌 注意事项

- 项目描述请从仓库的 README.md 中提炼，保持简洁明了
- 截图建议尺寸：800x400px（宽度优先），展示项目界面或核心功能
- 新项目添加到页面顶部（数组前面）
