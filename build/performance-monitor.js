// Webpack性能监控插件
const chalk = require('chalk')

class PerformanceMonitorPlugin {
  constructor() {
    this.startTime = Date.now()
    this.prevTimestamps = {}
  }

  apply(compiler) {
    compiler.hooks.compile.tap('PerformanceMonitor', () => {
      this.startTime = Date.now()
      console.log(chalk.blue('📦 开始编译...'))
    })

    compiler.hooks.done.tap('PerformanceMonitor', (stats) => {
      const endTime = Date.now()
      const buildTime = endTime - this.startTime
      
      console.log(chalk.green(`✅ 编译完成! 用时: ${buildTime}ms`))
      
      if (stats.compilation.errors.length > 0) {
        console.log(chalk.red(`❌ 发现 ${stats.compilation.errors.length} 个错误`))
      }
      
      if (stats.compilation.warnings.length > 0) {
        console.log(chalk.yellow(`⚠️  发现 ${stats.compilation.warnings.length} 个警告`))
      }

      // 显示模块构建时间
      const modules = stats.compilation.modules
      let slowModules = []
      
      modules.forEach(module => {
        if (module.buildTimestamp && module.buildInfo) {
          const buildTime = module.buildTimestamp - (module.buildInfo.buildTimestamp || 0)
          if (buildTime > 100) { // 超过100ms的模块
            slowModules.push({
              name: module.resource || module.identifier(),
              time: buildTime
            })
          }
        }
      })

      if (slowModules.length > 0) {
        console.log(chalk.yellow('\n🐌 慢速模块 (>100ms):'))
        slowModules
          .sort((a, b) => b.time - a.time)
          .slice(0, 5)
          .forEach(module => {
            const relativePath = module.name.replace(process.cwd(), '.')
            console.log(chalk.yellow(`  ${module.time}ms - ${relativePath}`))
          })
      }
    })

    compiler.hooks.invalid.tap('PerformanceMonitor', () => {
      console.log(chalk.cyan('🔄 检测到文件变化，重新编译...'))
    })
  }
}

module.exports = PerformanceMonitorPlugin