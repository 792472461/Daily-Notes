const fs = require('fs')
const path = require('path')
const { log, locale } = require('@sfs-cli/utils')
const semver = require('semver')
const colors = require('colors')
const userHome = require('user-home')
const packageConfig = require('../../../package.json')
const { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } = require('./const')

module.exports = cli

let args
let config

async function cli () {
  try {
    await prepare()
    // registerCommand();
  } catch (e) {
    log.error(e.message)
  }
}

async function prepare () {
  checkPkgVersion() // 检查当前运行版本
  checkNodeVersion() // 检查 node 版本
  checkRoot() // 检查是否为 root 启动
  checkUserHome() // 检查用户主目录
  checkInputArgs() // 检查用户输入参数
  checkEnv() // 检查环境变量
  await checkGlobalUpdate() // 检查工具是否需要更新
}

async function checkGlobalUpdate () {
  const currentVersion = packageConfig.version
  console.log(currentVersion)
  // 调用npm模块提供的接口，然后对比
}

function checkPkgVersion () {
  log.notice('当前脚手架版本号', packageConfig.version)
  log.success(locale.welcome)
}

function checkNodeVersion () {
  // 获取当前版本号
  const currentVersion = process.version
  // 获取最低版本号
  const lowestNodeVersion = LOWEST_NODE_VERSION
  // 对比版本号
  if (!semver.gte(currentVersion, lowestNodeVersion)) {
    throw new Error(colors.red(`sfs-cli需要安装${lowestNodeVersion}以上版本的 Node.js`))
  }
}

function checkRoot () {
  const rootCheck = require('root-check')
  // 进行降级
  rootCheck()
}

function checkUserHome () {
  if (!userHome || !fs.existsSync(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'))
  }
}

function checkInputArgs () {
  log.verbose('开始校验输入参数')
  const minimist = require('minimist')
  args = minimist(process.argv.slice(2)) // 解析查询参数
  checkArgs(args) // 校验参数
  log.verbose('输入参数', args)
}

function checkArgs (_args) {
  if (_args.debug) {
    process.env.LOG_LEVEL = 'verbose'
  } else {
    process.env.LOG_LEVEL = 'info'
  }
  log.level = process.env.LOG_LEVEL
}

function checkEnv () {
  log.verbose('开始检查环境变量')
  const dotenv = require('dotenv')
  dotenv.config({
    path: path.resolve(userHome, '.env')
  })
  config = createCliConfig() // 准备基础配置
  log.verbose('环境变量', config)
}

function createCliConfig () {
  const cliConfig = {
    home: userHome
  }
  if (process.env.CLI_HOME) {
    cliConfig.cliHome = path.join(userHome, process.env.CLI_HOME)
  } else {
    cliConfig.cliHome = path.join(userHome, DEFAULT_CLI_HOME)
  }
  return cliConfig
}
