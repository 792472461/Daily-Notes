# 从0到1实现sfs-cli

::: tip 最终功能
1. 初始化生成vue项目，组件
2. 添加预设
3. 集成前端监控系统
4. 添加CI/CD、自动发布
5. 实现GUI功能，可以添加工作区，打包发布自动化
:::

## 准备工作

### 脚手架实现原理
1. 脚手架的本质上只是一个操作系统的一个客户端，脚手架运行是依赖于node，node就是一个客户端，通过node去执行一系列的代码。
2. 通过软链接可以链接到我们自己的js文件，执行这个文件
3. 脚手架执行过程:
  1. 输入vue create xxx
  2. 在环境变量$path中查询vue命令(相当于执行which vue)
  3. 找到实际执行的文件
  4. 通过/usr/bin/env node执行文件

### 脚手架的核心价值
1. 研发自动化：项目重复代码拷贝->git操作->发布上线等操作
2. 研发标准化：项目创建的git flow、发布流程、发布回滚统一规范
3. 研发数据化：可以统计研发过程中发布耗时，安装耗时等数据

### 脚手架开发流程

- 创建一个`npm`项目
- 创建脚手架入口文件，最上方添加
``` javascript
#!/usr/bin/env node
```
- 配置`package.json`，添加`bin`属性
- 编写脚手架代码
- 发布脚手架

### 脚手架使用流程
``` shell
# 安装脚手架
npm install -g xxx-cli
# 使用脚手架
xxx-cli
```
### 脚手架开发难点
1. 分包：将复杂模块拆分成各个模块
2. 命令注册
``` shell
xxx-cli crete
xxx-cli add
vue-cli ...
```
3. 参数解析
```shell
xxx-cli command [options] <params>
```
4. 命令行交互
5. 日志打印
6. 命令行输出变色
7. 文件上传、下载

## 脚手架雏形

1. 创建项目
```shell
mkdir cli
cd cli 
npm init
```
2. 新建程序入口文件
```shell
touch cli.js
```
3. 在package.json中添加bin
```json
{
  "name": "cli",
  "version": "1.0.0",
  "description": "",
  "bin": {
    "xxx-cli": "bin/cli.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
4. 编辑cli.js
```javascript
#! /usr/bin/env node

// 检查入口是否执行
console.log('cli working...')
```
5. 添加软连接，输入```npm link```
6. 在命令行中输入cli


### npm link标准流程
链接本地脚手架
```shell
cd xxx-cli
npm link
```
取消链接本地库文件
```shell
cd xxx-cli
npm unlink
```
:::tip 理解link
link的本质就是软链接
- npm link: 将当前目录链接到```node```全局```node_modules```中作为一个库文件，并解析```bin```配置的可可执行文件
- npm link xxx: 将当前的```node_modules```下指定的库文件链接到```node```全局```node_modules```的xxx库文件

unlink本质就是删除这条软链接
- npm unlink: 将当前项目从```node```全局```node_modules```中移除
- npm unlink xxx: 将当前项目中的库文件依赖移除
:::

### 命令行参数解析
修改cli文件
```javascript
#! /usr/bin/env node

// 定义库文件
const utils = {
  init({ option, parma }) {
    console.log('init', option, parma)
  }
}

// 注册一个命令
const argv = require("process").argv

console.log(argv)


const command = argv[2]

const options = argv.slice(3);
let [option, parma] = options

option = option.replace('--', '')
console.log(option, parma)

if (utils[command]) {
  utils[command]({ option, parma })
} else {
  console.log('无效的命令')
}

// 检查入口是否执行
console.log('cli working...')
```

命令行执行
```shell
xxx-cli init --name test
```
就会输出 ```init name cli-test```

以上就实现了一个比较简单的命令行解析


## 模块划分

### 引入lerna

虽然lerna不维护了，但是还是一个比较好的库管理库

lerna是用于管理具有多个包的 JavaScript 项目的工具。

lerna初始化过程
1. 安装learn: yarn add -D lerna
2. npx lerna init
```shell
lerna notice cli v4.0.0
lerna info Updating package.json
lerna info Creating lerna.json
lerna info Creating packages directory
lerna success Initialized Lerna files
```
3. 创建模块: lerna crete xxx
4. 安装依赖: lerna add xxx
5. 重新安装依赖: lerna bootstarp

### 拆包
- 核心流程: core
- 命令: command
  - 初始化
  - 发布
  - 清除缓存
- 模型层 models
  - command命令
  - project项目
  - component组件
  - npm模块
  - git仓库
- 支撑模块 utils
  - git操作
  - 云构建
  - 工具方法
  - api请求

### core 模块
命令行执行流程

1. 准备阶段
  - 检查版本号
  - 检查node版本
  - 检查是否是root启动
  - 检查用户主目录
  - 检查入参
  - 检查环境变量
  - 检查是否为新版本 -> 提示更新 
2. 命令注册
  - 注册init命令
  - 注册publish命令
  - 注册clean命令
  - 支持debug模式
3. 命令执行
 
:::tip 涉及库
核心库：
- commander

工具库:
- npmlog 日志打印
- fs-extra 文件库
- semver 版本库对比
- colors 颜色
- user-home 检查是否是用户主目录
- dotenv
- root-check 权限降级
:::