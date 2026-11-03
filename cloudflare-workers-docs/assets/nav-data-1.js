/* ===========================================================
   nav-data-1.js  |  章节树（第 1–13 章）
   结构：[中文标题] 已规划；[中文标题, "路径"] 已交付译文
   =========================================================== */
window.NAV = [
  {
    id: "overview", zh: "概览", en: "Overview",
    desc: "Workers 是什么、能做什么，以及平台的整体定位。",
    pages: [
      ["Cloudflare Workers 概览", "pages/overview.html"]
    ]
  },
  {
    id: "get-started", zh: "快速开始", en: "Getting started",
    desc: "用控制台、Wrangler CLI 或 AI 提示创建并部署第一个 Worker。",
    pages: [
      ["通过控制台创建", "pages/get-started/dashboard.html"],
      ["通过 CLI 创建（Wrangler）", "pages/get-started/cli.html"],
      ["用 AI 提示构建", "pages/get-started/prompting.html"],
      ["模板与起步仓库", "pages/get-started/templates.html"]
    ]
  },
  {
    id: "examples", zh: "示例", en: "Examples",
    desc: "可直接套用的代码示例：请求改写、缓存、重定向、地理定位、鉴权等。",
    pages: [
      ["示例总览"],
      ["103 Early Hints"],
      ["同 URL 直连的 A/B 测试"],
      ["访问 Cloudflare 对象"],
      ["聚合多个请求"],
      ["修改请求头与响应头"],
      ["写入 Analytics Engine"],
      ["基于请求头的认证"],
      ["HTTP Basic 认证"],
      ["按 TLS 版本拦截"],
      ["批量回源覆盖"],
      ["批量重定向"],
      ["使用 Cache API"],
      ["缓存 POST 请求"],
      ["用 Workers 设置 Cache Tags"],
      ["用 fetch 控制缓存"],
      ["条件式响应"],
      ["CORS 响应头代理"],
      ["按国家代码重定向"],
      ["设置 Cron 触发器"],
      ["数据丢失防护"],
      ["调试日志"],
      ["解析 Cookie 值"],
      ["获取 HTML"],
      ["获取 JSON"],
      ["地理定位：天气应用"],
      ["地理定位：自定义样式"],
      ["地理定位：Hello World"],
      ["防盗链保护"],
      ["为 Images 配置自定义域名"],
      ["把请求头打印到控制台"],
      ["修改请求属性"],
      ["修改响应"],
      ["多个 Cron 触发器"],
      ["流式传输 OpenAI API 响应"],
      ["提交 JSON"],
      ["使用 timingSafeEqual"],
      ["读取 POST 数据"],
      ["重定向"],
      ["用另一个站点响应"],
      ["返回小型 HTML 页面"],
      ["返回 JSON"],
      ["重写链接"],
      ["设置安全响应头"],
      ["对请求签名"],
      ["带引导数据的 SPA 外壳"],
      ["流式处理大型 JSON"],
      ["在 Workers 中使用 Turnstile"],
      ["使用 WebSockets API"]
    ]
  },
  {
    id: "tutorials", zh: "教程", en: "Tutorials",
    desc: "从零到部署的分步教程，覆盖前后端、数据库与第三方服务集成。",
    pages: [
      ["教程总览"],
      ["构建 Jamstack 待办清单应用"],
      ["构建二维码生成器"],
      ["构建 Slackbot"],
      ["连接 MongoDB 数据库"],
      ["连接并查询 Turso 数据库"],
      ["用 R2 微调 OpenAI 模型"],
      ["部署实时聊天应用"],
      ["部署 Express.js 应用"],
      ["用 Workers 与 Image Resizing 生成 YouTube 缩略图"],
      ["用 Twilio 发送 GitHub 短信通知"],
      ["用 Airtable 处理表单提交"],
      ["连接 MySQL 数据库"],
      ["OpenAI GPT 函数调用"],
      ["连接 PostgreSQL 数据库"],
      ["用 Postmark 发送邮件"],
      ["用 Resend 发送邮件"],
      ["用 R2 安全访问与上传资源"],
      ["配置并使用 Prisma Postgres"],
      ["在 Rust 中直接使用 Workers KV"]
    ]
  },
  {
    id: "best-practices", zh: "最佳实践", en: "Best practices",
    desc: "写出快速、可靠、可观测且安全的 Worker：代码模式与配置建议。",
    pages: [
      ["Workers 最佳实践", "pages/best-practices.html"]
    ]
  },
  {
    id: "demos", zh: "演示与架构", en: "Demos and architectures",
    desc: "官方演示应用与参考架构，用于理解真实场景下的组合方式。",
    pages: [
      ["演示与架构总览"],
      ["构建交互式 ChatGPT 应用"]
    ]
  },
  {
    id: "local-development", zh: "本地开发", en: "Local development",
    desc: "在本地运行、调试 Worker，管理本地绑定数据与多 Worker 协作。",
    pages: [
      ["本地开发概览", "pages/local-development/index.html"],
      ["各开发模式支持的绑定", "pages/local-development/bindings-per-env.html"],
      ["环境变量与密钥"],
      ["向本地资源填充数据"],
      ["共享本地开发服务器"],
      ["Local Explorer"],
      ["多 Worker 开发"],
      ["Workers Vite 插件"],
      ["Wrangler 与 Vite 如何选择", "pages/local-development/wrangler-vs-vite.html"]
    ]
  },
  {
    id: "playground", zh: "在线演练场", en: "Playground",
    desc: "无需安装与登录，在浏览器沙箱中预览和测试 Workers 代码。",
    pages: [
      ["Playground", "pages/playground.html"]
    ]
  },
  {
    id: "configuration", zh: "配置", en: "Configuration",
    desc: "项目设置、绑定、路由、密钥、兼容性与部署选项。",
    pages: [
      ["配置总览", "pages/configuration/index.html"],
      ["绑定（Bindings）"],
      ["Cloudflare Access 保护", "pages/configuration/cloudflare-access.html"],
      ["程序化配置"],
      ["兼容性日期", "pages/configuration/compatibility-dates.html"],
      ["兼容性标志", "pages/configuration/compatibility-flags.html"],
      ["Cron 触发器", "pages/configuration/cron-triggers.html"],
      ["环境变量", "pages/configuration/environment-variables.html"],
      ["集成（Integrations）", "pages/configuration/integrations/index.html"],
      ["与第三方 API 集成", "pages/configuration/integrations/apis.html"],
      ["外部服务集成", "pages/configuration/integrations/external-services.html"],
      ["多部分上传元数据", "pages/configuration/multipart-upload-metadata.html"],
      ["部署位置（Placement）", "pages/configuration/placement.html"],
      ["路由与域名", "pages/configuration/routing/index.html"],
      ["自定义域名", "pages/configuration/routing/custom-domains.html"],
      ["路由（Routes）", "pages/configuration/routing/routes.html"],
      ["workers.dev 子域", "pages/configuration/routing/workers-dev.html"],
      ["密钥（Secrets）", "pages/configuration/secrets.html"],
      ["Workers Sites", "pages/configuration/sites/index.html"],
      ["Workers Sites 配置", "pages/configuration/sites/configuration.html"],
      ["从现有项目起步", "pages/configuration/sites/start-from-existing.html"],
      ["从零开始", "pages/configuration/sites/start-from-scratch.html"],
      ["从已有 Worker 起步", "pages/configuration/sites/start-from-worker.html"],
      ["Page Rules 与 Workers", "pages/configuration/workers-with-page-rules.html"]
    ]
  },
  {
    id: "authorization", zh: "角色与权限", en: "Roles and permissions",
    desc: "平台、产品与资源三个层面的角色划分与 API 令牌权限。",
    pages: [
      ["角色与权限总览"],
      ["Durable Objects 角色与权限"],
      ["Workers 角色与权限"]
    ]
  },
  {
    id: "previews", zh: "预览", en: "Previews",
    desc: "在上线前，用隔离副本测试分支与 PR 的改动。",
    pages: [
      ["预览总览"],
      ["三种机制的区别"],
      ["预览配置"],
      ["自定义域名"],
      ["示例"],
      ["快速开始"],
      ["资源与隔离"],
      ["测试与调试"]
    ]
  },
  {
    id: "versions-and-deployments", zh: "版本与部署", en: "Versions & deployments",
    desc: "版本如何记录改动、部署如何放量，以及回滚与版本路由。",
    pages: [
      ["版本与部署总览"],
      ["部署管理"],
      ["渐进式部署"],
      ["版本亲和性"],
      ["配合 Durable Objects"],
      ["回滚"],
      ["版本覆盖"],
      ["版本 URL"]
    ]
  },
  {
    id: "cache", zh: "Workers 缓存", en: "Workers Cache",
    desc: "缓存 Worker 响应以降低延迟与用量，含缓存键、清理与限制。",
    pages: [
      ["Workers 缓存总览"],
      ["缓存键"],
      ["配置"],
      ["调试"],
      ["示例"],
      ["限制"],
      ["清理与失效"]
    ]
  }
];
