var NAV_ITEMS = [
  { label: '首页',     path: '/index.html' },
  { label: '关于我',   path: '/pages/about.html' },
  { label: '文章',     path: '/pages/articles.html' },
  { label: '技术笔记', path: '/pages/notes.html' },
  { label: '联系',     path: '/pages/contact.html' }
]

function getCurrentPage() {
  var path = window.location.pathname
  if (path.endsWith('/')) path += 'index.html'
  return path.substring(path.lastIndexOf('/') + 1)
}

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

  document.getElementById('navbar').innerHTML = navHtml
}

function renderFooter() {
  var year = new Date().getFullYear()
  document.getElementById('footer').innerHTML =
    '<p>&copy; ' + year + ' kkblank. All rights reserved.</p>'
}

renderNavbar()
renderFooter()
