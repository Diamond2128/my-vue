var webpack = require('webpack')

module.exports = {
  // 优化配置
  optimization: {
    // 启用模块连接
    concatenateModules: true,
    // 优化模块ID
    moduleIds: 'hashed',
    // 优化chunk ID
    chunkIds: 'named',
    // 分割代码块
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5
        }
      }
    }
  },
  
  // 性能提示
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  
  // 解析优化
  resolve: {
    // 减少文件搜索范围
    modules: ['node_modules'],
    // 添加缓存
    cacheWithContext: false,
    // 优化扩展名解析
    extensions: ['.js', '.vue', '.json'],
    // 添加别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  
  // 模块规则优化
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          // 启用缓存
          cacheDirectory: true,
          // 减少编译范围
          presets: [
            ['env', {
              modules: false,
              targets: {
                browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
              }
            }],
            'stage-2'
          ],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  
  // 插件优化
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    
    // 优化模块ID
    new webpack.optimize.OccurrenceOrderPlugin(),
    
    // 模块连接
    new webpack.optimize.ModuleConcatenationPlugin(),
    
    // 热重载
    new webpack.HotModuleReplacementPlugin(),
    
    // 错误处理
    new webpack.NoEmitOnErrorsPlugin()
  ]
}