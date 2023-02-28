# 开发环境搭建

当我们想要使用Typescript开发项目时，需要先搭建好Typescript的开发环境。本文将介绍如何搭建Typescript环境。

## 安装Node.js

首先我们需要安装Node.js，它是运行在服务端的JavaScript环境。在官网上下载对应系统的安装包即可，安装完成后可以在命令行输入以下命令检查是否安装成功：

```shell
node -v

```

如果输出了Node.js的版本号，则表示安装成功。

## 安装Typescript

在安装好Node.js之后，我们可以使用npm来安装Typescript。在命令行输入以下命令：

```shell
npm install -g typescript

```

这条命令会全局安装Typescript，安装完成后可以在命令行输入以下命令检查是否安装成功：

```shell
tsc -v

```

如果输出了Typescript的版本号，则表示安装成功。

## 配置开发环境

接下来，我们需要配置开发环境。在你的项目中新建一个tsconfig.json文件，用于配置Typescript编译器的选项。下面是一个简单的配置示例：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ]
}

```

其中，compilerOptions中的target指定编译后的JavaScript代码应该支持的ECMAScript版本，module指定模块化方案，sourceMap指定是否生成sourcemap文件。exclude用于排除某些文件或文件夹不参与编译。

## 编译Typescript代码

最后，我们可以在命令行中使用tsc命令来编译Typescript代码。例如，我们可以在项目根目录下创建一个index.ts文件，内容如下：

```typescript
function greeter(name: string) {
  console.log("Hello, " + name);
}

greeter("World");

```

然后在命令行中输入以下命令进行编译：

```typescript
tsc index.ts

```

这将会生成一个index.js文件，内容如下：

```typescript
function greeter(name) {
  console.log("Hello, " + name);
}
greeter("World");

```

这样我们就成功地搭建了Typescript的开发环境，并且编译了一段简单的Typescript代码。

## 总结

以上就是搭建Typescript环境的全部步骤，希望对你有所帮助。
