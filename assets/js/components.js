var NAV_ITEMS = [
  { label: '首页',     path: '/index.html' },
  { label: '关于我',   path: '/pages/about.html' },
  { label: '技术笔记', path: '/pages/notes.html' },
  { label: '联系',     path: '/pages/contact.html' }
]

function getCurrentPage() {
  var path = window.location.pathname
  if (path.endsWith('/')) path += 'index.html'
  return path.substring(path.lastIndexOf('/') + 1)
}

// ========== 主题管理 ==========
const ThemeManager = {
  STORAGE_KEY: 'kkblank-theme',
  
  init() {
    this.applyTheme(this.getCurrentTheme());
  },

  getCurrentTheme() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) return stored;
    return 'light';
  },

  applyTheme(theme) {
    const html = document.documentElement;
    const isDark = theme === 'dark';
    
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    console.log('[ThemeManager] applyTheme:', theme);
    
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }

    this.updateIcon(theme);
  },

  updateIcon(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('i');
    if (!icon) return;

    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    icon.style.color = theme === 'dark' ? '#ffcc00' : '';
  }
};

// ========== 导航栏渲染 ==========
function renderNavbar() {
  var current = getCurrentPage()
  var listHtml = ''
  for (var i = 0; i < NAV_ITEMS.length; i++) {
    var item = NAV_ITEMS[i]
    var pageName = item.path.substring(item.path.lastIndexOf('/') + 1)
    var isActive = (pageName === current)
    listHtml += '<li class="pure-menu-item' + (isActive ? ' pure-menu-selected' : '') + '">'
    listHtml += '<a href="' + item.path + '" class="pure-menu-link' + (isActive ? ' nav-active' : '') + '">' + item.label + '</a>'
    listHtml += '</li>'
  }

  var navHtml =
    '<div class="pure-menu pure-menu-horizontal">' +
      '<a href="/index.html" class="pure-menu-heading">kkblank</a>' +
      '<ul class="pure-menu-list">' + listHtml + '</ul>' +
    '</div>'

  var navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.innerHTML = navHtml;
  }
}

function renderFooter() {
  var year = new Date().getFullYear()
  var footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = '<p>&copy; ' + year + ' kkblank. All rights reserved.</p>'
  }
}

// ========== 主题切换按钮 ==========
let themeEventHandler = null;

function addThemeToggle() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // 查找 .pure-menu-list，如果不存在则创建
  let list = navbar.querySelector('.pure-menu-list');
  if (!list) {
    const menuHeading = navbar.querySelector('.pure-menu-heading');
    if (menuHeading) {
      list = document.createElement('ul');
      list.className = 'pure-menu-list';
      navbar.insertBefore(list, menuHeading.nextSibling);
    }
  }

  // 添加主题切换按钮
  const toggle = document.createElement('button');
  toggle.id = 'theme-toggle';
  toggle.className = 'theme-toggle';
  toggle.setAttribute('aria-label', '切换主题');
  
  const icon = document.createElement('i');
  const currentTheme = localStorage.getItem('kkblank-theme') || 'light';
  icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  if (currentTheme === 'dark') {
    icon.style.color = '#ffcc00';
  }
  toggle.appendChild(icon);

  if (list) {
    list.appendChild(toggle);
  } else {
    navbar.appendChild(toggle);
  }

  // 清理旧监听器
  if (themeEventHandler) {
    toggle.removeEventListener('click', themeEventHandler);
  }
  
  // 创建新监听器 - 这是唯一的事件处理函数
  themeEventHandler = function(e) {
    e.stopPropagation();
    const current = localStorage.getItem('kkblank-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('kkblank-theme', next);
    
    const html = document.documentElement;
    if (next === 'dark') {
      html.setAttribute('data-theme', 'dark');
      toggle.querySelector('i').className = 'fas fa-sun';
      toggle.querySelector('i').style.color = '#ffcc00';
    } else {
      html.removeAttribute('data-theme');
      toggle.querySelector('i').className = 'fas fa-moon';
      toggle.querySelector('i').style.color = '';
    }
    console.log('[ThemeToggle] Direct toggle triggered');
  };

  toggle.addEventListener('click', themeEventHandler);
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
  renderNavbar();
  addThemeToggle();
  renderFooter();
  ThemeManager.init();
  console.log('[Init] ThemeManager ready, current theme:', localStorage.getItem('kkblank-theme') || 'light');
});
