# Timod

一个小巧、轻量、简单的前端数据模型库。

## Badges

## 前言

前端的数据来源绝大部分是来自服务端，我们经常能在前端项目里面看到这种操作：

一个从后端获取的对象数据，经过层层传递，到最后面使用的时候，已经不知道里面到底是什么数据结构了。

一个日期类型的字段，后端存储的是时间戳，前端每次在用的时候，都要 `new Date()` 一下。

一个对象里面嵌套有对象，后端经常不返回某些空的数据，前端要用的时候，一层一层对象解构，无聊的判断 `user?.address?.city`。

为什么需要前端数据模型？请看下面**使用**章节的使用场景，如果看完你觉得不需要用到，那么请忽略，不要让项目变得更复杂。

## 安装

从 npm 安装：

```bash
npm i --save timod
```

发布的包中包含3种类型的产物：
- `dist`: 适合浏览器环境
- `cjs`: 适合 Node.js 环境
- `esm`: 适合 ES Module 环境，通常需要 `Webpack` `Rollup` 等构建工具

> 你可以通过 node_modules/timod/dist/timod.umd.js 来获取构建的产物

#### 浏览器

引入 Timod 库文件：

```js
<script src="/path/to/dist/timod.umd.js"></script>
```

然后可以使用全局变量 `Timod`：

```html
<script type="text/javascript">
  const model = Timod.define({
    age: Number
  });
</script>
```

#### Node.js

```js
const Timod = require('timod/cjs');

const model = Timod.define({
  age: Number
});
```

#### ES Module

```js
import Timod from 'timod/esm';

const model = Timod.define({
  age: Number
});
```

## 使用

#### 基础用法

定义一个前端数据模型：

```js
const Timod = require('timod/cjs');

const userModel = Timod.define({
  age: Number,
  name: String
});
```

将后端的数据转换为前端数据模型：

```js
const user = userModel.parse({
  age: 27,
  name: 'Timod',
  xxx: 'xxx'
});

console.log(user) // { age: 27, name: 'Tiomd' }
```

#### 填充默认值

有时候后端返回的数据中会缺少一些字段，前端需要指定默认值，如果直接通过 `.` 点操作符取值，可能会存在 `undefined is not an Object` 的错误，这种情况通过指定 `default` 默认值可以很好的解决问题：

```js
const Timod = require('timod/cjs');

const userModel = Timod.define({
  age: {
    type: Number,
    default: 27
  },
  name: {
    type: String,
    default: 'Timod'
  }
});

const user = userModel.parse({
  age: 28
});

console.log(user) // { age: 28, name: 'Tiomd' }
```

#### 字段名映射

有时候同一个数据，因为使用的场景不一样，后端和前端的命名也不一样，这种情况我们可以通过 `mapto` 映射到另一个字段的值：

```js
const Timod = require('timod/cjs');

const userModel = Timod.define({
  age: {
    type: Number,
    default: 27,
    mapto: 'year'
  },
  name: {
    type: String,
    default: 'Timod'
  }
});

const user = userModel.parse({
  year: 28,
  name: 'Timod'
});

console.log(user) // { age: 28, name: 'Tiomd' }
```

#### 格式化

后端返回的数据通常是数据库中保存的原始值，前端需要将它转换为合适的格式，这种情况我们可以通过 `format` 格式化很好的解决这个问题：

```js
const Timod = require('timod/cjs');

const userModel = Timod.define({
  age: {
    type: Number,
    default: 27,
    mapto: 'year',
    format: (value) => {
      return +value // 我们将后端返回的字符串类型转换为 Number 类型
    }
  },
  name: {
    type: String,
    default: 'Timod'
  }
});

const user = userModel.parse({
  year: '28',
  name: 'Timod'
});

console.log(user) // { age: 28, name: 'Tiomd' }
```

#### 嵌套数据模型

除了基本的 JavaScript 类型外，还支持嵌套数据模型，这种场景非常常见：

```js
const Timod = require('timod/cjs');

const addressModel = Timod.define({
  province: String,
  city: String
});

const userModel = Timod.define({
  age: Number,
  name: String,
  address: addressModel
});

const user = userModel.parse({
  age: 28,
  name: 'Timod',
  address: {
    province: 'hangzhou',
    city: 'zhejiang'
  }
});

console.log(user) // { age: 28, name: 'Tiomd', address: { province: 'hangzhou', city: 'zhejiang' } }
```

## 文档


--------------------
