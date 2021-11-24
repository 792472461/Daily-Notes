const chalk = require('chalk')

// log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'

const prefix = 'sfs-cli:' // 自定义头部
// log.addLevel('success', 2000, { fg: 'green', bold: true }) // 自定义success日志
// log.addLevel('notice', 2000, { fg: 'blue', bg: 'black' }) // 自定义notice日志

const log = {
  success (message) {
    console.log(chalk.green(`${prefix}${message}`))
  },
  notice (message) {
    console.log(chalk.blue(`${prefix}${message}`))
  },
  verbose (message) {
    console.log(chalk.yellow(`${prefix}${message}`))
  }
}
module.exports = log
