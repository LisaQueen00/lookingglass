---
title: "今天也有一点小小的进展"
date: "2026-11-18"
summary: "写了一点代码，遇到几个奇怪的问题，又在不知不觉间学会了一些新东西。"
tags:
  - Daily
  - Coding
  - Life
---

# 今天也有一点小小的进展

今天继续折腾 Lookingglass。

原本只想调整一下博客的页面布局，没想到从 Markdown 解析、React Props，一路研究到了代码语法高亮。

明明只是一个小小的个人博客，却总能冒出一些有趣的问题。

## 今日的小发现

- `useState` 可以保存异步获取的数据。
- `useEffect` 可以在组件渲染后执行请求。
- `@apply` 可以在 CSS 中复用 Tailwind 工具类。
- 一张卡片的布局，居然也能琢磨这么久。

## 一点代码记录

今天又写了一次 React 的数组渲染：

```tsx
{articles.map((article) => (
  <ContentCard
    key={article.slug}
    data={article}
    basePath="/blog/daily"
  />
))}
```

以前可能会觉得这种写法有点复杂，现在已经开始慢慢熟悉了。

## 写在最后

> 有时候进步并不是完成了多么庞大的项目，而是今天终于理解了昨天不明白的东西。

好啦，今天就先写到这里。

明天继续，喵。
