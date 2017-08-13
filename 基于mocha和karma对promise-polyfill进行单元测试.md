## 基于mocha和karma对promise-polyfill进行单元测试

本篇博客的测试目标是针对自己学习过程中，为了熟悉Promise的操作原理，写的一个fake-promise的模块。

对于自己造的轮子，为了保证在各种情况下代码的正常运行，单元测试是必不可少的一个部分。

而手动的单元测试的效率无疑是很低的，当前的单元测试框架中，比较常用的就是jasmine和mocha这两个了。而karma主要是对于单元测试的一个自动驱动工具，可以实现自动进行单元测试，提高开发的效率。

实现单元测试还需要配上一个好用的断言库，一般我使用的断言库是chai，一个用`expect`语法的断言库。

### 环境

单元测试的环境需要的是一个全局安装的`karma`，因为其需要添加到环境变量中，这样才可以通过命令行启动。

还有局部依赖的`mocha`和`chai`。

```powershell
cnpm install -g karma
cnpm install --save-dev mocha chai karma-mocha karma-chai
```

### 配置

安装好`karma`之后，可以直接运行`karma init`来进行快速配置。

这里选择浏览器为`Chrome`，选择测试框架为`mocha`和`chai`。

```javascript
// karma配置文件
// Karma configuration
// Generated on Sun Aug 13 2017 13:11:34 GMT+0800 (CST)
// 由于需要依赖一部分es6的实现，所以这里需要配置一下babel来对于es6的方法进行编译

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'spec/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'spec/*.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: [/node_modules/],
          loader: 'babel-loader'
        }]
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}

```

完成配置后，直接使用命令行`karma start`就可以开始自动化单元测试了。

### 测试用例

具体的测试用例在`./spec/`目录下面可以看到。