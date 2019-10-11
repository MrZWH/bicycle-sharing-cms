# AntD 共享单车后台管理系统开发

- React 全家桶
  - React 基础知识、生命周期
  - Router 4.0 语法讲解
  - Redux 集成开发
- AntD UI 组件
  - 最实用基础组件
  - AntD 栅格系统
  - ETable 组件封装
  - BaseForm 组件封装
  - 表格内嵌单选、复选封装
- 公共机制封装
  - Axios 请求插件封装
  - API 封装
  - 错误拦截
  - 权限、菜单封装
  - 日期、金额、手机号封装...
  - Loading、分页、Mock...

## React 介绍

- Facebook 开源的一个 JavaScript 库
- React 结合生态库构成一个 MV* 框架
- React 特点
  - Declarative（声明式编码）
  - Component-Based（组件化编码）
  - 高效 - 高效的 DOM Diff 算法，最小化页面重绘
  - 单向数据流
- MV* 框架代表 - 只关注视图 View 层 + 数据层 Model

### 编程式实现

需要以具体代码表达在哪里（where）做什么（what），如何实现（how）

### 声明式实现

只需要声明在哪里（where）做什么（what），而无需关心如何实现（how）

## React 脚手架、Yarn 介绍

脚手架是辅助性的工具，帮我们生成一些依赖的配置、初始化项目本身应该具备的东西。
脚手架选择 create-react-app。

## 项目主页工程搭建

- 基础插件安装，less 文件加载配置
  - 安装 react-router、axios
  - 安装 AntD
  - 暴露 webpack 配置文件
  - 安装 less-loader
  - 修改 less-loader
  - 项目报错就将 less version 降到 2.7.3
- 项目主页结构开发
  - 页面结构定义
  - 目录结构定义
  - 栅格系统使用
  - calc 计算方法使用
- 菜单组件开发
- 头部组件开发
- 底部组件开发
  
## React Router 4.0

- react-router 和 react-router-dom 理解
  - 4.0 版本中已不需要路由配置，一切皆组件
  - react-router：提供了一些 router 的核心 api，包括 Router、Route、Switch 等
  - react-router-dom：提供了 BrowserRouter、HashRouter、Route、Link、NavLink
- 路由模块安装
  - npm install react-router-dom --save
- react-router-dom 核心用法
  - HashRouter 和 BrowserRouter
  - Route：path、exact、component、render
  - NavLink、Link
  - Switch
  - Redirect
  
## 数据 mock

<https://www.easy-mock.com> 基于 [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started) 封装的平台。

9.2 缺失。

## 项目工程化

- 解决什么问题？
  - 提高开发效率
  - 降低维护难度
- 如何解决这些问题？
  - 项目架构设计
  - 目录结构定义，公共配置提取出来
  - 制定项目开发规范（ESLint 规范）
  - 模块化（更细颗粒度）、组件化（更粗颗粒度）
  - 前后端接口规范
  - 性能优化、自动化部署（压缩、合并、打包）

## Redux

- 单向数据流：从父组件流向子组件，兄弟组件无法共享数据
- state：React 中的状态，只是读对象，不可直接修改
- Reducer：基本函数，用于对 State 的业务处理
- Action：普通对象，用于描述事件行为，改变 State

## 总结

- 从 UI 基础部分到共享单车核心模块的实战
- 从 React 过渡到全家桶
- 从项目简单开发到项目工程化、规范化开发
- 业务类型涵盖：基础 UI、增删改查模块、地图、图表、权限、菜单、公共机制、主题定制
- 项目开发技巧、调试经验
