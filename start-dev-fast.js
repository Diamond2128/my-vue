// 快速启动开发服务器的优化脚本
process.env.NODE_ENV = 'development'

// 设置性能相关的环境变量
process.env.BABEL_DISABLE_CACHE = '0'
process.env.WEBPACK_CACHE = '1'

// 增加Node.js内存限制
const { execSync } = require('child_process')
const os = require('os')

// 根据系统内存动态设置Node.js内存限制
const totalMemory = os.totalmem()
const memoryLimit = Math.floor(totalMemory / 1024 / 1024 / 1024 * 0.7) // 使用70%的系统内存
process.env.NODE_OPTIONS = `--max-old-space-size=${memoryLimit * 1024}`

console.log('🚀 启动优化的开发服务器...')
console.log(`💾 设置内存限制: ${memoryLimit}GB`)
console.log('⚡ 启用缓存优化')

// 启动开发服务器
require('./build/dev-server.js')