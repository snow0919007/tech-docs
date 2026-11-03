# 中文技术文档站 · tech-docs

公开托管的中文技术文档镜像站点，通过 GitHub Pages 提供访问。

## 内容

| 子站 | 路径 | 说明 |
|---|---|---|
| Claude Code 官方文档（简体中文） | `claude-code-docs/` | code.claude.com/docs 官方中文版本地镜像，228 篇 |
| Cloudflare Workers 文档（简体中文） | `cloudflare-workers-docs/` | developers.cloudflare.com/workers 中文翻译，已译 38 篇 |

## 本地预览

仓库根目录 `index.html` 为总入口，点击卡片进入对应子站。

也可用静态服务器预览：

```bash
python -m http.server 8801
# 浏览器打开 http://localhost:8801/
```

## 版权与声明

- Claude Code 文档版权归 Anthropic 所有，本仓库仅作个人学习用途的镜像。
- Cloudflare Workers 文档版权归 Cloudflare 所有。
- 内容以官方原文为准；译文如有偏差以官方为准。

## 部署

由 GitHub Pages 从 `main` 分支根目录（/）发布。
