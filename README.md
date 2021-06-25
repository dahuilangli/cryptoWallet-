# flowermate

本代码仅用于本公司去中心化钱包，请勿商用、传播。

## 项目结构
```
├── android
├── assets // 静态资源
├── index.js // 入口文件
├── ios
├── patches // 有时要给第三方打补丁(patch-package)
├── scripts // 放一些自动化辅助脚本
└── src
 ├── components // 全局复用的非全屏组件
 ├── actoins // 所有action
 ├── config // 项目全局配置,常量,变量
 ├── helper // 第三方库调用或者hooks函数
 ├── i18n // 国际化
 ├── reducer // statte
 ├── routers // 页面路由结构声明(stack, tab, drawer)
 ├── screens // 全屏页面组件(可以继续嵌套 components)
 ├── types // 类型声明
 ├── sagas // 异步流程
 ├── store // state存储
 └── App.tsx
```
## 环境配置

请参考 <https://reactnative.cn/docs/getting-started/>

## 运行

```bash
yarn
# ios模拟器上运行
yarn ios
# 安卓设备上运行
yarn android
```

## 版权声明

App图标取自[Flaticon](https://www.flaticon.com/)，由[Freepik](https://www.flaticon.com/authors/freepik)制作。可在申明原作者版权的前提下自由使用。
