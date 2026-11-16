# anjing-products

安静的产品官网，正式域名：https://product.anjing.cc/ 。

首页以悬挂的产品卡片展示 macos-x、EnglishX 和 cs-tool-x。选择产品可展开功能手牌，右上角为个人名片。

## 开发与部署

纯静态 HTML，无第三方依赖。Node.js 22 或更新版本，运行 `npm run build` 生成 `dist/`。

- GitHub 公开仓库：`anjing-le/anjing-products`
- Cloudflare Pages 项目：`anjing-products`
- 生产分支：`main`
- 构建命令：`npm run build`
- 输出目录：`dist`
- 正式域名：`product.anjing.cc`

每次官网迭代完成后，推送到 `main` 并在正式域名验证。推送后由 Cloudflare Pages 自动构建并更新正式域名。Cloudflare 应用仅新增本仓库授权；其他分支不更新生产站点。
部署验收时对照 `/build-info.json` 的 `commit` 与推送的提交 SHA，并核对 Pages 的触发类型为 `github:push`。
版本信息不显示在页面中。
