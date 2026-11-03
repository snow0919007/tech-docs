/* ===========================================================
   site.js  |  侧边栏、面包屑、章节页清单、右侧目录、上下页、站内搜索
   =========================================================== */
(function () {
  var scriptEl = document.currentScript;
  var BASE = scriptEl ? scriptEl.src.replace(/assets\/site\.js.*$/, "") : "";
  var NAV = window.NAV || [];

  function url(p) { return BASE + p; }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* 当前页面相对站点根的路径 */
  var here = decodeURI(location.pathname).replace(/\\/g, "/");
  var rootPath = decodeURI(new URL(BASE, location.href).pathname).replace(/\\/g, "/");
  var rel = here.indexOf(rootPath) === 0 ? here.slice(rootPath.length) : here.split("/").pop();

  function findPage(rel) {
    for (var i = 0; i < NAV.length; i++) {
      var ch = NAV[i];
      for (var j = 0; j < ch.pages.length; j++) {
        if (ch.pages[j][1] === rel) return { chapter: ch, page: ch.pages[j], index: j };
      }
    }
    return null;
  }

  var current = findPage(rel);
  var isHome = /(^|\/)index\.html$/.test(rel) || rel === "" || rel === "/";
  /* 章节索引页：sections/<id>.html */
  var secMatch = rel.match(/sections\/([^/]+)\.html$/);
  var currentSection = null;
  if (secMatch) {
    for (var k = 0; k < NAV.length; k++) if (NAV[k].id === secMatch[1]) currentSection = NAV[k];
  }

  /* ---------------- 侧边栏 ---------------- */
  var sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.innerHTML = "";
    NAV.forEach(function (ch) {
      var group = el("div", "side-group");
      var openTo = (current && current.chapter.id === ch.id) || (currentSection && currentSection.id === ch.id);
      if (openTo) group.className += " open active";

      var head = el("a", "side-chapter");
      head.href = url("sections/" + ch.id + ".html");
      head.innerHTML = '<span>' + esc(ch.zh) + "</span>" +
        '<span class="side-count">' + ch.pages.length + "</span>";
      group.appendChild(head);

      var ul = el("ul", "side-pages");
      ch.pages.forEach(function (p) {
        var li = document.createElement("li");
        if (p[1]) {
          var a = el("a");
          a.href = url(p[1]);
          a.textContent = p[0];
          if (current && current.page[1] === p[1]) a.className = "current";
          li.appendChild(a);
        } else {
          var span = el("a", "pending");
          span.href = "javascript:void(0)";
          span.innerHTML = esc(p[0]) + '<span class="pend">待译</span>';
          li.appendChild(span);
        }
        ul.appendChild(li);
      });
      group.appendChild(ul);
      sidebar.appendChild(group);
    });
  }

  /* ---------------- 移动端菜单 ---------------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
    document.addEventListener("click", function (e) {
      if (document.body.classList.contains("nav-open") &&
        !sidebar.contains(e.target) && e.target !== toggle) {
        document.body.classList.remove("nav-open");
      }
    });
  }

  /* ---------------- 面包屑 ---------------- */
  var crumbBox = document.querySelector(".crumbs");
  if (crumbBox) {
    var html = '<a href="' + url("index.html") + '">Workers 文档</a>';
    if (current) {
      html += '<span class="sep">/</span><a href="' + url("sections/" + current.chapter.id + ".html") + '">' + esc(current.chapter.zh) + "</a>";
      html += '<span class="sep">/</span><span>' + esc(current.page[0]) + "</span>";
    } else if (currentSection) {
      html += '<span class="sep">/</span><span>' + esc(currentSection.zh) + "</span>";
    } else if (!isHome) {
      html += '<span class="sep">/</span><span>未找到页面</span>';
    }
    if (!isHome || current || currentSection) crumbBox.innerHTML = html;
    else crumbBox.style.display = "none";
  }

  /* ---------------- 章节索引页：标题与子页清单 ---------------- */
  var listBox = document.querySelector("#section-list");
  if (currentSection) {
    var tBox = document.querySelector("#section-title");
    var dBox = document.querySelector("#section-desc");
    if (tBox) tBox.textContent = currentSection.zh;
    if (dBox) dBox.textContent = currentSection.desc || "";
    document.title = currentSection.zh + " · Cloudflare Workers 文档（中文版）";
  }
  if (listBox && currentSection) {
    var done = currentSection.pages.filter(function (p) { return p[1]; }).length;
    var meta = document.querySelector("#section-meta");
    if (meta) {
      meta.innerHTML = '<span class="tag">共 ' + currentSection.pages.length + " 页</span>" +
        '<span class="tag ' + (done ? "" : "tag-muted") + '">已交付译文 ' + done + " 页</span>" +
        '<span>原文：developers.cloudflare.com/workers/ · ' + esc(currentSection.en) + "</span>";
    }
    var list = el("div", "pagelist");
    currentSection.pages.forEach(function (p) {
      var row = el("div", "pagelist-item" + (p[1] ? "" : " pending"));
      var inner = p[1]
        ? '<a href="' + url(p[1]) + '">' + esc(p[0]) + "</a>"
        : "<span>" + esc(p[0]) + "</span>";
      row.innerHTML = inner + '<span class="pd"></span>' +
        '<span class="ps">' + (p[1] ? "已译文" : "待译（后续批次）") + "</span>";
      list.appendChild(row);
    });
    listBox.appendChild(list);
  }

  /* ---------------- 右侧目录 ---------------- */
  var toc = document.querySelector(".toc");
  var article = document.querySelector("article.doc");
  if (toc && article) {
    var heads = article.querySelectorAll("h2, h3");
    if (heads.length < 2) {
      toc.style.display = "none";
    } else {
      var ol = document.createElement("ol");
      var items = [];
      Array.prototype.forEach.call(heads, function (h, i) {
        if (!h.id) h.id = "s-" + (i + 1);
        var li = document.createElement("li");
        li.className = h.tagName === "H2" ? "lvl-2" : "lvl-3";
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent.replace(/[#¶]/g, "").trim();
        li.appendChild(a);
        ol.appendChild(li);
        items.push({ h: h, a: a });
      });
      toc.innerHTML = '<div class="toc-title">本页目录</div>';
      toc.appendChild(ol);

      var onScroll = function () {
        var best = items[0], top = 1e9;
        items.forEach(function (it) {
          var d = Math.abs(it.h.getBoundingClientRect().top - 72);
          if (it.h.getBoundingClientRect().top - 72 <= 8 && d < top) { top = d; best = it; }
        });
        items.forEach(function (it) { it.a.classList.toggle("current", it === best); });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---------------- 上一页 / 下一页 ---------------- */
  var pager = document.querySelector(".pager");
  if (pager && rel) {
    var flat = [];
    NAV.forEach(function (ch) {
      ch.pages.forEach(function (p) { if (p[1]) flat.push({ href: p[1], title: p[0], ch: ch.zh, id: ch.id }); });
    });
    var idx = -1;
    for (var m = 0; m < flat.length; m++) if (flat[m].href === rel) idx = m;
    if (idx >= 0) {
      var parts = [];
      if (idx > 0) {
        parts.push('<a href="' + url(flat[idx - 1].href) + '"><span class="pl">← 上一篇 · ' +
          esc(flat[idx - 1].ch) + '</span><span class="pt">' + esc(flat[idx - 1].title) + "</span></a>");
      }
      if (idx < flat.length - 1) {
        parts.push('<a class="next" href="' + url(flat[idx + 1].href) + '"><span class="pl">下一篇 · ' +
          esc(flat[idx + 1].ch) + ' →</span><span class="pt">' + esc(flat[idx + 1].title) + "</span></a>");
      }
      pager.innerHTML = parts.join("");
    }
  }

  /* ---------------- 搜索 ---------------- */
  var input = document.querySelector("#site-search");
  if (input) {
    var pop = el("div", "search-pop");
    document.body.appendChild(pop);
    var items = [];
    NAV.forEach(function (ch) {
      ch.pages.forEach(function (p) {
        items.push({ zh: p[0], href: p[1], ch: ch.zh, en: ch.en });
      });
    });
    var sel = 0, shown = [];

    function render(q) {
      q = q.trim().toLowerCase();
      if (!q) { pop.classList.remove("show"); return; }
      shown = items.filter(function (it) {
        return it.zh.toLowerCase().indexOf(q) >= 0 ||
          it.ch.toLowerCase().indexOf(q) >= 0 ||
          (it.en || "").toLowerCase().indexOf(q) >= 0;
      }).slice(0, 24);
      sel = 0;
      if (!shown.length) {
        pop.innerHTML = '<div class="search-empty">没有匹配的页面。可尝试英文关键词，例如 bindings、cron、vitest。</div>';
      } else {
        pop.innerHTML = shown.map(function (it, i) {
          return '<a class="search-hit' + (i === 0 ? " sel" : "") + '" href="' +
            (it.href ? url(it.href) : "javascript:void(0)") + '">' +
            '<div class="sh-c">' + esc(it.ch) + (it.href ? "" : " · 待译") + "</div>" +
            '<div class="sh-t">' + esc(it.zh) + "</div></a>";
        }).join("");
      }
      pop.classList.add("show");
    }

    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("focus", function () { if (input.value.trim()) render(input.value); });
    input.addEventListener("keydown", function (e) {
      var hits = pop.querySelectorAll(".search-hit");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!hits.length) return;
        hits[sel] && hits[sel].classList.remove("sel");
        sel = (sel + (e.key === "ArrowDown" ? 1 : hits.length - 1)) % hits.length;
        hits[sel].classList.add("sel");
        hits[sel].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        if (hits[sel]) location.href = hits[sel].getAttribute("href");
      } else if (e.key === "Escape") {
        pop.classList.remove("show"); input.blur();
      }
    });
    document.addEventListener("click", function (e) {
      if (!pop.contains(e.target) && e.target !== input) pop.classList.remove("show");
    });
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); input.focus();
      }
    });
  }

  /* ---------------- 代码块语言标签 ---------------- */
  document.querySelectorAll("pre[data-lang]").forEach(function (pre) {
    var lab = el("span", "code-label", esc(pre.getAttribute("data-lang")));
    pre.appendChild(lab);
  });
})();
