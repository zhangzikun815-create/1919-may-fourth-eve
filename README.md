# 1919：五四前夜

以“五四运动的爆发”为主题的沉浸式滚动叙事网页。页面通过纵向滚动依次呈现 1915—1919 年的思想文本，并把后续滚动映射为从右向左流动的历史长河。

在线访问：<https://zhangzikun815-create.github.io/1919-may-fourth-eve/>

## 运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

生产构建与本地预览：

```bash
npm run build
npm run preview
```

测试：

```bash
npm test
```

## 页面结构

- `SECTION 00`：极简开场，依次呈现“1919”“五四前夜”和滚动提示。
- `SECTION 01`：固定视口中的历史消息；滚动控制每条消息的出现、停留和离开。
- `SECTION 02`：固定视口中的横向历史长河；纵向滚动控制时间轴从右向左移动。
- `SECTION 03`：历史结语。
- 右上角“资料 / SOURCE”按钮与正文 `[01]` 等标记共用同一来源抽屉。

## 动画逻辑

动画由 GSAP 与 ScrollTrigger 驱动，不使用计时器自动播放。停止滚动时，scrub 动画同步停止；向上滚动时会倒放。

- `Intro.tsx`：首屏入场与离场。
- `ChatHistory.tsx`：单一 pinned timeline，按消息、外交警报、会议、日期和河流转场依次编排。
- `HistoryRiver.tsx`：实时读取轨道宽度，把纵向滚动映射为横向 `transform`。
- 所有组件通过 `gsap.context()`/`useGSAP()` 清理动画，避免 React Strict Mode 重复注册。
- 当系统启用“减少动态效果”时，不创建 pin 与 scrub 动画，页面自动变为普通纵向阅读模式。

## 修改人物消息

编辑 `src/data/quotes.ts`。每条消息使用 `Quote` 数据结构：

```ts
{
  id: "chen-duxiu",
  year: "1915",
  person: "陈独秀",
  work: "《敬告青年》",
  text: ["自主的而非奴隶的，", "进步的而非保守的。"],
  publication: "《青年杂志》创刊号 · 1915",
  side: "left",
  sourceIds: ["01"]
}
```

新增引文时，必须同时在 `src/data/sources.ts` 中增加可核查来源，并让 `sourceIds` 指向它。

## 增加历史节点

编辑 `src/data/timeline.ts`，在数组中增加 `TimelineEvent`。普通节点不需要 `visual`；需要专属视觉时，可复用现有类型：

`shandong`、`warning`、`crowd`、`spread`、`arrests`、`participants`、`officials`、`paris`。

节点的横向顺序就是数组顺序。节点宽度和间距由 `src/styles/river.css` 中的 `.history-event`、`--event-gap` 控制。

## 替换历史照片

将已获授权的图片放入 `public/assets/`。预留文件名见该目录的 `README.md`。

人物数据可增加：

```ts
portrait: "/assets/chen-duxiu.jpg"
```

未配置图片或图片加载失败时，`MediaFallback` 会显示姓名首字档案框，不影响页面运行。

## 调整滚动节奏

统一参数位于 `src/utils/motionConfig.ts`：

- `chatSectionScrollVh`：聊天章节的总滚动长度，数值越大，整体推进越慢。
- `messageEnterUnits`：单条消息进入所占时间线长度，越大出现越慢。
- `messageHoldUnits`：消息保持完整可见的时间，越大停留越久。
- `messageExitUnits`：消息离开所占时间线长度，越大消失越慢。
- `historyScrollPaddingVh`：横向长河除实际横向距离外增加的纵向滚动余量，越大整体越慢。
- `scrubSmoothing`：聊天动画跟随滚轮的缓动时间。
- `--event-gap`：节点内部留白。
- `.history-event` 的 `flex-basis`：相邻节点之间的横向距离。

修改参数后执行 `npm run build`，并重新检查桌面、移动端和反向滚动。

## 内容与来源

正文只使用有出处的短引文，其余历史内容采用现代中文概述。页面内置来源包括原始文献、北京大学校史、外交部资料和五四运动大事记。叙事句“从北京街头开始的声音，抵达了巴黎”在页面中明确标记为网页叙事语，不作为历史人物原话。
