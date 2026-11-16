# anjing-products

安静的产品官网，正式域名：https://product.anjing.cc/ 。

当前版本只提供完全空白的白色页面，没有文字、图片、导航或占位内容。

## 开发与部署

纯静态 HTML，无第三方依赖。Node.js 22 或更新版本，运行 `npm run build` 生成 `dist/`。

- GitHub 公开仓库：`anjing-le/anjing-products`
- Cloudflare Pages 项目：`anjing-products`
- 生产分支：`main`
- 构建命令：`npm run build`
- 输出目录：`dist`
- 正式域名：`product.anjing.cc`

推送 `main` 后由 Cloudflare Pages 自动构建并更新正式域名。Cloudflare 应用仅新增本仓库授权；其他分支不更新生产站点。
部署验收时对照 `/build-info.json` 的 `commit` 与推送的提交 SHA，并核对 Pages 的触发类型为 `github:push`。
版本信息不显示在页面中。
