# Usage

## 1. 创建 models

在 src/ 下或 src/ 下任意位置创建 models 文件夹，其中每个 js/ts 文件为一个 model，文件名表示 model 名，文件内容需要默认导出一个方法。例如：

```js
// src/models/auth.ts
import { useState, useCallback } from 'react';

export default () => {
  const [user, setUser] = useState(null);

  const signin = useCallback((name) => {
    setUser(name);
  }, []);

  const signout = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    signin,
    signout,
  };
};
```

## 2. 利用 webpack 或其它工具获取 models 变量

在添加多个 models 后，最后在该 models 文件夹内添加 index.js/ts 文件，收集所有 models 并默认导出。

```js
// src/models/index.ts
import { Models } from '@liukewia/use-model';
const models: Models = {};
const modelFiles = require.context('.', false, /\.(j|t)s$/);
modelFiles.keys().forEach((fileName) => {
  const resolvedName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
  if (resolvedName === 'index') return;
  models[resolvedName] = modelFiles(fileName).default;
});

export default models;
```

## 3. 用 withModelProvider 包裹 根组件

```js
// src/index.tsx
import models from './models';
import App from './App';
import { withModelProvider } from '@liukewia/use-model';

const appWithModels = withModelProvider(models)(App);
```

## 4. 使用 useModel

在函数组件内，引入 useModel 并传入至多两个参数，model 名和 selector，即可使用。例如：

```js
const { user, signin, signout } = useModel('auth', (model) => ({
  user: model.user,
  signin: model.signin,
  signout: model.signout,
}));
```

# Publish

```bash
pnpm -r publish --tag latest --access public
```
