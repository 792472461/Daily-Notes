# Vite

## 使用vite从0搭建一个React项目

### 1. 环境搭建

使用`vite`需要`Node.js`环境，所以首先需要安装`Node.js`，安装完成后，可以使用`npm`或者`yarn`来安装`vite`。当然现在的`pnpm`对比`npm`和`yarn`也有很大的优势，所以我推荐使用`pnpm`作为包管理工具。

安装`pnpm`：

```bash
npm install -g pnpm
```

因为默认的镜像在国外，包下载速度和稳定性都不太好，因此推荐切换到国内的镜像源，这样`pnpm`安装包的速度会快很多。命令如下：

```bash
pnpm config set registry https://registry.npm.taobao.org
```

### 2. 项目初始化

在搭建了基本的开发环境后，我们就可以开始搭建项目了。进到你想要创建项目的目录，然后执行下面的命令：

```bash
pnpm create vite
```

在执行完这个命令后，pnpm 首先会自动下载`create-vite`这个第三方包，然后执行这个包中的项目初始化逻辑。

然后我们根据提示输入项目名称，这里我输入`vite-react`，然后选择`react`模板，最后选择`pnpm`作为包管理工具。
