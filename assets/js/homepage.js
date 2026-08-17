/**
 * 首页专用模块：拉取 GitHub 公共 API 数据并渲染「GitHub动态」卡片
 * - 免 token（公共端点，匿名 60 次/小时/IP）
 * - 任一请求失败或无数据时整体隐藏卡片，静默降级
 * - DOM 一律使用 createElement / textContent 构建
 */
(function () {
  'use strict';

  var GITHUB_USER = 'kkblank';
  var API_BASE = 'https://api.github.com';
  var MAX_ACTIVITY_ITEMS = 5;

  var EVENT_META = {
    PushEvent: { icon: 'fa-solid fa-code-commit', text: '推送代码到 ' },
    CreateEvent: { icon: 'fa-solid fa-plus', text: '创建了 ' },
    WatchEvent: { icon: 'fa-solid fa-star', text: 'Star 了 ' },
    ForkEvent: { icon: 'fa-solid fa-code-fork', text: 'Fork 了 ' },
    IssuesEvent: { icon: 'fa-solid fa-comment', text: '参与了 ' },
    IssueCommentEvent: { icon: 'fa-solid fa-comment-dots', text: '评论了 ' },
    ReleaseEvent: { icon: 'fa-solid fa-tag', text: '发布了 ' },
    PublicEvent: { icon: 'fa-solid fa-bullhorn', text: '将 ' },
    MemberEvent: { icon: 'fa-solid fa-user-plus', text: '添加了新成员 ' }
  };

  var DEFAULT_META = { icon: 'fa-regular fa-circle', text: 'GitHub 动态' };

  function relativeTime(iso) {
    var ts = new Date(iso).getTime();
    if (isNaN(ts)) return '';
    var diff = Math.max(0, Date.now() - ts);
    var minutes = Math.floor(diff / 60000);
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return minutes + ' 分钟前';
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' 小时前';
    var days = Math.floor(hours / 24);
    if (days < 30) return days + ' 天前';
    var months = Math.floor(days / 30);
    if (months < 12) return months + ' 个月前';
    return Math.floor(months / 12) + ' 年前';
  }

  function hideSection() {
    var section = document.getElementById('github-section');
    if (section) section.style.display = 'none';
  }

  function fetchJson(url) {
    return fetch(url, {
      headers: { Accept: 'application/vnd.github+json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('GitHub API HTTP ' + res.status);
      return res.json();
    });
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = String(value);
  }

  function buildActivityItem(event) {
    var meta = EVENT_META[event.type] || DEFAULT_META;
    var repoName = event.repo && event.repo.name ? event.repo.name : '';

    var li = document.createElement('li');
    li.className = 'activity-item';

    var icon = document.createElement('i');
    icon.className = meta.icon;

    var text = document.createElement('span');
    text.className = 'activity-text';
    text.textContent = repoName ? meta.text + repoName : meta.text;

    var time = document.createElement('span');
    time.className = 'activity-time';
    time.textContent = relativeTime(event.created_at);

    li.appendChild(icon);
    li.appendChild(text);
    li.appendChild(time);
    return li;
  }

  function renderActivity(events) {
    var list = document.getElementById('activity-list');
    if (!list) return;
    events.slice(0, MAX_ACTIVITY_ITEMS).forEach(function (event) {
      list.appendChild(buildActivityItem(event));
    });
  }

  function init() {
    var section = document.getElementById('github-section');
    if (!section) return;

    var userPromise = fetchJson(API_BASE + '/users/' + GITHUB_USER);
    var reposPromise = fetchJson(API_BASE + '/users/' + GITHUB_USER + '/repos?per_page=100&type=public');
    var eventsPromise = fetchJson(API_BASE + '/users/' + GITHUB_USER + '/events/public?per_page=30');

    Promise.allSettled([userPromise, reposPromise, eventsPromise]).then(function (results) {
      var userResult = results[0];
      var reposResult = results[1];
      var eventsResult = results[2];

      // 任一请求失败或无数据：整体隐藏卡片，静默降级
      if (
        userResult.status !== 'fulfilled' || !userResult.value ||
        reposResult.status !== 'fulfilled' || !Array.isArray(reposResult.value) || reposResult.value.length === 0 ||
        eventsResult.status !== 'fulfilled' || !Array.isArray(eventsResult.value) || eventsResult.value.length === 0
      ) {
        hideSection();
        return;
      }

      var user = userResult.value;
      var repos = reposResult.value;
      var events = eventsResult.value;

      var totalStars = 0;
      repos.forEach(function (repo) {
        totalStars += repo.stargazers_count || 0;
      });

      setText('stat-repos', user.public_repos);
      setText('stat-stars', totalStars);
      setText('stat-followers', user.followers);
      renderActivity(events);
    }).catch(hideSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
