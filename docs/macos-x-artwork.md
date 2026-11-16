# macos-x 官网牌面

本轮只更新官网，macos-x 客户端及其 README 未修改。

- 挂牌正面：内置 image_gen 生成；原图 `assets/macos-x/badge-front-v1.png`，网页使用同名 WebP。完整提示词见 `macos-x-badge-v1.prompt.txt`。
- 插画负责纸纹、铅笔蜡笔笔触和纸片浮雕；页面负责真实圆角、挂孔、金属扣、翻转与投影。素材不带外部卡牌轮廓、吊绳或烘焙的背景。
- 首版六张功能图来自 https://github.com/anjing-le/macos-x/tree/main/assets/readme ，仅转换为 WebP，不裁剪或重绘文字。源文件分别为 `02-capture.png`、`05-switcher.png`、`06-prompts.png`、`07-layout.png`、`08-menu-bar.png`、`09-system-status.png`。现行系统状态图已由下述新版替换。
- 已核对本机原图的 Git blob SHA 与 GitHub 列表一致。窗口切换 `16a81e2ef203048c3b7a8976e8e71b49e3ef171a`；提示词 `38fc876c284c762c385dfa7881edd965478ed029`；布局 `cad10ec3ba10c021e790325402f0826697e11dda`；菜单栏 `5924a557ef9ab347d5a30ac269ac0f5c17d3c3cf`；状态 `e1f797b2181b0d55d900d10c9721d5c036a40973`。
- 操作说明是项目插画，不作为客户端真实截图或性能测试证据；系统指标为图中标注的示意数据。
- 功能手牌保持原图 2:1 比例，点击打开完整大图，支持关闭按钮与 Escape。

## 八模块补全

README 的六模块插画落后于远端客户端功能。以远端 `Sources/MacOSX/UI/ToolboxWindowController.swift` 的八个 Tool 枚举及对应模块实现核对，新增正式名称为「附近互传」「文件操作」，不把本机旧 checkout 当作最新事实。

- `assets/macos-x/system-status-v2.webp`：在原三栏 CPU、内存、网络下增加启动磁盘总量、已占用、可用及容量条。320 GB + 192 GB = 512 GB，图中明确标记「示意数据」；不表达清理或扫描功能。
- `assets/macos-x/nearby-transfer-v1.webp`：依据 `NearbyTransferGuide.swift`、`NearbyTransferView.swift` 及远端 `Resources/CardNearbyTransferV2.png`，展示同一网络内两台 Mac 的文件、文字、图片互传，拖入或 ⌘V 发送；不表示 Windows／手机兼容。
- `assets/macos-x/file-actions-v1.webp`：依据 `FileActionsGuide.swift`（blob `c0a64fb1df754b7d6ea7d0a1b17372372c61746c`）、`FileActionsModule.swift` 及远端 `Resources/SettingsFileActionsBoard.png`，展示选中单个文件后唤出操作菜单，以及图片转换／压缩／缩尺寸、文档转 Markdown／TXT、PDF 按页导出图片。不烘焙可变快捷键。
- 三张图由内置 image_gen 生成，原图和完整提示词保留在 `docs/artwork/macos-x/`。挂孔、实体牌面与投影继续由页面处理。
- 八张功能牌适度增加重叠，避免超出原手牌区域，保留完整画幅与点击阅读。
