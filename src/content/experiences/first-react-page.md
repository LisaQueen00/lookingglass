---
title: "第一次亲手搭建 React 页面"
date: "2026-11-18"
summary: "从一个简单的组件开始，慢慢弄懂 React 的布局、状态和组件复用。"
cover: "/images/experiences/react-cover.png"
tags:
  - React
  - TypeScript
  - Learning
---

# 第一次亲手搭建 React 页面

最近开始尝试亲手搭建自己的个人博客 Lookingglass。

比起直接使用现成模板，我更希望能够理解每一个组件为什么这样设计。

## 从一个简单的组件开始

一开始，我只想实现一个能够显示文字的组件：

```tsx
function HelloWorld() {
  return (
    <div className="text-blue-500">
      Hello, Lookingglass!
    </div>
  )
}

export default HelloWorld
```

后来我逐渐发现，组件不仅可以负责显示内容，也可以通过 Props 接收数据。

## 学会使用 children

例如，我们可以设计一个可复用的展示容器：

```tsx
import type { ReactNode } from 'react'

type ShowcaseProps = {
  children: ReactNode
}

function Showcase({ children }: ShowcaseProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-6">
      {children}
    </div>
  )
}

export default Showcase
```

然后在页面中使用它：

```tsx
<Showcase>
  <h1>Hello, World!</h1>
  <p>这里可以放任何需要展示的内容。</p>
</Showcase>
```

## 一点小小的感想

以前觉得前端开发就是把元素摆放在页面上。

真正开始实践后才发现，**如何划分组件职责、如何组织数据，以及如何让不同页面共享能力**，同样是很有趣的设计问题。

这次只是一个开始。

> 每一个完成的小组件，都是通往更大世界的一步。
