/* Claude Code 中文文档 · 交互脚本 */
(function () {
  'use strict';
  var inPages = location.pathname.indexOf('/pages/') !== -1;

  /* ---------- 侧边栏开关 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
    document.addEventListener('click', function (e) {
      if (window.innerWidth > 900) return;
      if (!e.target.closest('.sidebar') && !e.target.closest('.nav-toggle')) {
        document.body.classList.remove('nav-open');
      }
    });
  }

  /* ---------- 回到当前项 ---------- */
  var active = document.querySelector('.nav-link.active');
  if (active && inPages) {
    var sb = document.getElementById('sidebar');
    if (sb) {
      // 仅当当前项不在可视区时才滚动，避免打开页面就跳走
      var aTop = active.offsetTop, aBottom = aTop + active.offsetHeight;
      var viewTop = sb.scrollTop, viewBottom = viewTop + sb.clientHeight;
      if (aTop < viewTop) sb.scrollTop = Math.max(0, aTop - 24);
      else if (aBottom > viewBottom) sb.scrollTop = aBottom - sb.clientHeight + 24;
    }
  }

  /* ---------- 代码复制 ---------- */
  document.querySelectorAll('.cb-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var blk = btn.closest('.codeblock');
      var code = blk ? blk.querySelector('code') : null;
      if (!code) return;
      var text = code.innerText;
      var done = function () {
        btn.textContent = '已复制';
        btn.classList.add('done');
        setTimeout(function () { btn.textContent = '复制'; btn.classList.remove('done'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- 右侧目录高亮 ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length) {
    var heads = tocLinks.map(function (a) {
      return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
    }).filter(Boolean);
    var onScroll = function () {
      var y = window.scrollY + 96, cur = null;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].offsetTop <= y) cur = heads[i]; else break;
      }
      tocLinks.forEach(function (a) { a.classList.remove('on'); });
      if (cur) {
        var link = tocLinks.find(function (a) {
          return decodeURIComponent(a.getAttribute('href').slice(1)) === cur.id;
        });
        if (link) link.classList.add('on');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 站内搜索 ---------- */
  var input = document.getElementById('search-input');
  var box = document.getElementById('search-results');
  if (!input || !box) return;
  var data = null, loading = false, items = [], focusIdx = -1;

  function load() {
    if (data || loading) return;
    if (window.__DOCS_INDEX) { data = window.__DOCS_INDEX; if (input.value.trim()) run(); return; }
    loading = true;
    fetch((inPages ? '../' : '') + 'search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (d) { data = d; if (input.value.trim()) run(); })
      .catch(function () { loading = false; });
  }

  function highlight(text, q) {
    var i = text.toLowerCase().indexOf(q);
    if (i < 0) return text;
    return text.slice(0, i) + '<mark>' + text.slice(i, i + q.length) + '</mark>' + text.slice(i + q.length);
  }

  function snippet(doc, q) {
    var i = doc.toLowerCase().indexOf(q);
    if (i < 0) return doc.slice(0, 70);
    var s = Math.max(0, i - 30);
    return (s > 0 ? '…' : '') + doc.slice(s, s + 100) + '…';
  }

  function run() {
    var q = input.value.trim().toLowerCase();
    focusIdx = -1;
    if (!q) { box.hidden = true; box.innerHTML = ''; return; }
    var hits = [];
    (data || []).forEach(function (d) {
      var t = d.t.toLowerCase(), c = (d.c || '').toLowerCase(), body = (d.d || '').toLowerCase();
      var score = 0;
      if (t.indexOf(q) === 0) score += 120;
      else if (t.indexOf(q) > -1) score += 70;
      if (c.indexOf(q) > -1) score += 18;
      if (body.indexOf(q) > -1) score += 12;
      if (d.s && d.s.toLowerCase().indexOf(q) > -1) score += 8;
      if (score) hits.push({ d: d, s: score });
    });
    hits.sort(function (a, b) { return b.s - a.s; });
    hits = hits.slice(0, 24);
    if (!hits.length) {
      box.innerHTML = '<div class="sr-empty">没有匹配结果</div>';
      box.hidden = false; return;
    }
    box.innerHTML = hits.map(function (h) {
      var url = (inPages ? '' : '') + h.d.u;
      return '<a class="sr-item" href="' + url + '">' +
        '<div class="sr-title">' + highlight(h.d.t, q) + '</div>' +
        '<div class="sr-path">' + (h.d.c || '') + '</div>' +
        '<div class="sr-snip">' + snippet(h.d.d || '', q) + '</div></a>';
    }).join('');
    box.hidden = false;
  }

  input.addEventListener('focus', load);
  input.addEventListener('input', function () { load(); if (data) run(); });
  input.addEventListener('keydown', function (e) {
    var nodes = box.querySelectorAll('.sr-item');
    if (e.key === 'ArrowDown' && nodes.length) {
      e.preventDefault(); focusIdx = Math.min(focusIdx + 1, nodes.length - 1);
    } else if (e.key === 'ArrowUp' && nodes.length) {
      e.preventDefault(); focusIdx = Math.max(focusIdx - 1, 0);
    } else if (e.key === 'Enter') {
      if (focusIdx > -1 && nodes[focusIdx]) location.href = nodes[focusIdx].getAttribute('href');
      return;
    } else if (e.key === 'Escape') {
      input.blur(); box.hidden = true; return;
    } else { return; }
    nodes.forEach(function (n, i) { n.classList.toggle('on', i === focusIdx); });
    if (nodes[focusIdx]) nodes[focusIdx].scrollIntoView({ block: 'nearest' });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.topbar-search')) box.hidden = true;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault(); input.focus();
    }
  });
})();

/* ---------- 锚点指向的小节未包含在官方 Markdown 导出中时给出提示 ---------- */
(function () {
  'use strict';
  if (!location.hash || !inPages) return;
  var id = decodeURIComponent(location.hash.slice(1));
  if (!id || document.getElementById(id)) return;
  var art = document.getElementById('article');
  if (!art) return;
  var bar = document.createElement('div');
  bar.className = 'anchor-miss';
  bar.innerHTML = '原链接指向的小节 <code>#' + id +
    '</code> 未包含在官方 Markdown 导出中（该部分仅存在于官网页面渲染结果里）。' +
    '可点击右上角「原文 ↗」查看完整内容。';
  art.parentNode.insertBefore(bar, art);
})();
