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