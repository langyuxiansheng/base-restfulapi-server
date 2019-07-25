#此项目仅作为参考,不做更新维护了. 新版本的正在完善中,即将发布,有更小的体积,更快的速度和更精简的代码.

#base-restfulapi-server 服务器说明
=============================

这是一个基于Koa2的轻量级RESTful API Server服务器，支持ES6,同时集成 mysql 还有MongoDB 多个多个数据库类型,支持自定义配置。

**注意：因升级Koa版本至2.3.0，为配合相应的依赖项，故需要Node.js版本大于等于v8.0.0（建议v9.9.0），NPM大于等于v5.0.0。建议使用yarn代替npm。**

约定使用JSON格式传输数据，POST、PUT、DELET方法支持的Content-Type为`application/x-www-form-urlencoded、multipart/form-data、application/json`可配置支持跨域。非上传文件推荐application/x-www-form-urlencoded。通常情况下返回application/json格式的JSON数据。

可选用redis等非关系型数据库。考虑RESTful API Server的实际开发需要，这里通过sequelize.js作为PostgreSQL, MySQL, MariaDB, SQLite, MSSQL关系型数据库的ORM，如无需关系型ORM，`npm remove sequelize -S`，然后删除`src/lib/sequelize.js`文件。

安装了一些和Koa2不冲突的搭建RESTful API Server的必要插件，附带每一个插件的说明。采用ESlint进行语法检查。

因此服务器主要提供RESTful API，故暂时不考虑前端静态资源处理，只提供静态资源访问的基本方法便于访问用户上传到服务器的图片等资源。基本目录结构与vue-cli保持一致，可配合React、AngularJS、Vue.js等前端框架使用。在Cordova/PhoneGap中使用时需要开启跨域功能。

目前暂未加入软件测试模块，下一个版本会加入该功能并提供集成方案。建议自行集成jest。

详细说明看这里 [项目的说明文档](https://github.com/langyuxiansheng/base-restfulapi-server/tree/master/%E9%A1%B9%E7%9B%AE%E6%96%87%E6%A1%A3)

在线测试地址
------------
```
http://111.231.225.103/apis/
```

引入插件介绍
------------

> 引入插件的版本将会持续更新

引入的插件：
`koa@2 koa-body@2 koa-router@next koa-static2 koa-compose require-directory babel-cli babel-register babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-2 gulp gulp-eslint eslint eslint-config-standard eslint-friendly-formatter eslint-plugin-html eslint-plugin-promise nodemailer promise-mysql 等`

**koa2**: HTTP框架
&nbsp;Synopsis: HTTP framework.
&nbsp;From: https://github.com/koajs/koa v2

**koa-body**: body解析器
&nbsp;Synopsis: A full-feature koa body parser middleware.
&nbsp;From: https://github.com/dlau/koa-body

**koa-router**: Koa路由
&nbsp;Synopsis: Router middleware for koa.
&nbsp;From: https://github.com/alexmingoia/koa-router/tree/master/

**koa-static2**: 静态资源中间件
&nbsp;Synopsis: Middleware for Koa2 to serve a folder under a name declared by user.
&nbsp;From: https://github.com/Secbone/koa-static2

**koa-compose**: 多个中间件组合成一个
&nbsp;Synopsis: Compose several middleware into one.
&nbsp;From: https://github.com/koajs/compose

**require-directory**: 递归遍历指定目录
&nbsp;Synopsis: Recursively iterates over specified directory.
&nbsp;From: https://github.com/troygoode/node-require-directory

**babel-cli**: Babel编译ES6代码为ES5代码
&nbsp;Synopsis: Babel is a JavaScript compiler, ES6 to ES5.
&nbsp;From: https://github.com/babel/babel/tree/master/packages/babel-cli

**babel-register**: Babel开发环境实时编译ES6代码
&nbsp;Synopsis: Babel hook.
&nbsp;From: https://github.com/babel/babel/tree/master/packages/babel-cli

**babel-plugin-transform-runtime**: Babel配置ES6的依赖项
**babel-preset-es2015**: 同上
**babel-preset-stage-2**: 同上

**gulp**: 基于流的自动化构建工具
&nbsp;Synopsis: Gulp is a toolkit for automating painful or time-consuming tasks.
&nbsp;From: https://github.com/gulpjs/gulp

**gulp-eslint**: gulp的ESLint检查插件
&nbsp;Synopsis: A gulp plugin for ESLint.
&nbsp;From: https://github.com/adametry/gulp-eslint

**gulp-nodemon**: 修改JS代码后自动重启
&nbsp;Synopsis: nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.
&nbsp;From: https://github.com/remy/nodemon

**eslint**: JavaScript语法检查工具
&nbsp;Synopsis: A fully pluggable tool for identifying and reporting on patterns in JavaScript.
&nbsp;From:

**eslint-config-standard**: 一个ESlint配置&nbsp;Synopsis: ESLint Shareable Config for JavaScript Standard Style.
&nbsp;From: https://github.com/feross/eslint-config-standard

**eslint-friendly-formatter**: 使得ESlint提示在Sublime Text或iterm2中更友好，Atom也有对应的ESlint插件。
&nbsp;Synopsis: A simple formatter/reporter for ESLint that's friendly with Sublime Text and iterm2 'click to open file' functionality
&nbsp;From: https://github.com/royriojas/eslint-friendly-formatter

**eslint-plugin-html**: 检查HTML文件中的JS代码规范
&nbsp;Synopsis: An ESLint plugin to extract and lint scripts from HTML files.
&nbsp;From: https://github.com/BenoitZugmeyer/eslint-plugin-html

**eslint-plugin-promise**: 检查JavaScript promises
&nbsp;Synopsis: Enforce best practices for JavaScript promises.&nbsp;From: https://github.com/xjamundx/eslint-plugin-promise

**eslint-plugin-promise**: ESlint依赖项
&nbsp;Synopsis: ESlint Rules for the Standard Linter.&nbsp;From: https://github.com/xjamundx/eslint-plugin-standard

**nodemailer**: 发送邮件
&nbsp;Synopsis: Send e-mails with Node.JS.
&nbsp;From: https://github.com/nodemailer/nodemailer

**promise-mysql**: 操作MySQL数据库依赖
&nbsp;Synopsis: Promise Mysql.
&nbsp;From: https://github.com/lukeb-uk/node-promise-mysql

**sequelize**: 关系型数据库ORM
&nbsp;Synopsis: Sequelize is a promise-based ORM for Node.js.
&nbsp;From: https://github.com/sequelize/sequelize

**mysql**: MySQL库
&nbsp;Synopsis: A pure node.js JavaScript Client implementing the MySql protocol.
&nbsp;From: https://github.com/mysqljs/mysql

支持Koa2的中间件列表：https://github.com/koajs/koa/wiki

**其它经常配合Koa2的插件：**

**koa-session2**: Session中间件
&nbsp;Synopsis: Middleware for Koa2 to get/set session.
&nbsp;From: https://github.com/Secbone/koa-session2

**koa-nunjucks-2**:
一个好用的模版引擎，可用于前后端，nunjucks：https://github.com/mozilla/nunjucks

**koa-favicon**:
Koa的favicon中间件：https://github.com/koajs/favicon

**koa-server-push**:
HTTP2推送中间件：https://github.com/silenceisgolden/koa-server-push

**koa-convert**: 转换旧的中间件支持Koa2
&nbsp;Synopsis: Convert koa generator-based middleware to promise-based middleware.
&nbsp;From: https://github.com/koajs/convert

**koa-logger**: 请求日志输出，需要配合上面的插件使用
&nbsp;Synopsis: Development style logger middleware for Koa.
&nbsp;From: https://github.com/koajs/logger

**koa-onerror**:
Koa的错误拦截中间件，需要配合上面的插件使用：https://github.com/koajs/onerror

**koa-multer**: 处理数据中间件
&nbsp;Synopsis: Multer is a node.js middleware for handling multipart/form-data for koa.
&nbsp;From: https://github.com/koa-modules/multer

目录结构说明
------------

```bash
.
├── README.md				# 项目说明文件
├── .babelrc                # Babel 配置文件
├── .editorconfig           # 编辑器风格定义文件
├── .eslintignore           # ESlint 忽略文件列表
├── .eslintrc.js            # ESlint 配置文件
├── .gitignore              # Git 忽略文件列表
├── publicKey.pub           # JWT公钥文件
├── gulpfile.js             # Gulp配置文件
├── package.json            # 描述文件
├── pm2.js                  # pm2 部署示例文件
├── build                   # build 入口目录
│   └── dev-server.js       # 开发环境 Babel 实时编译入口
├── src                     # 源代码目录，编译后目标源代码位于 dist 目录
│   ├── app.js              # 入口文件
│   ├── config.js           # 主配置文件（*谨防泄密！）
│   ├── plugins              # 插件目录
│   │   └── smtp_sendemail  # 示例插件 - 发邮件
│   ├── tool                # 工具目录
│   │   ├── Result.js       # restful API统一实体返回类对象
│   │   └── Utils.js        # 公共工具类
│   ├── lib                 # 库目录
│   │   ├── mongoUtil.js    # MongoDB工具类
│   │   ├── PluginLoader.js # 插件加载的loader
│   │   ├── mysql-db.js     # 原生MySQL工具类(不要和 sequelize混用 放这里是给需要的伙伴的)
│   │   └── sequelize.js    # sequelize 关系型数据库ORM工具
│   ├── middleware          # 中间件文件夹
│   │   ├── ErrorRoutesCatch.js # 统一错误处理
│   │   └── ValidateTools.js # 校验验工具类
│   ├── controllers         # 请求控制器
│   ├── models              # 数据模型
│   ├── routes              # 路由器
│   └── services            # 业务逻辑服务
├── assets                  # 静态资源目录
└── logs                    # 日志目录
```

更新说明
--------
*v1.0.3 2018年11月29日23:32:09*
1. 增加日志系统
2. 增加公共服务,添加验证码生成接口

*v1.0.2 2018年11月22日15:45:56*
1. 更新整理目录结构.整理models
2. 新增权限管理系统
3. 添加sqls 目前系统用到的数据库文件备份

*v1.0.1 2018年11月11日11:44:49
1. 更新mongoDB工具类 增加输出指定字段和分页查询

*v1.0.0 2018年11月9日10:06:14*

1.	创建项目。

参考资料:
--------------------------------------------------------------

https://github.com/yi-ge/koa2-API-scaffold 一个基于Koa2的轻量级RESTful API Server脚手架。

参考基础框架,基于框架新增和修改了一些业务逻辑,因为业务需要,集成了多种数据库(MySQL和MongoDB)


关于Redis 的说明
-------------------------------------------------------------

本项目中未集成Redis,如果有需要用到 redis 的地方 请自行集成
可以参考 https://itbilu.com/nodejs/npm/EkiI9PG4-.html

--------------------------------------------------------------

如果对你有帮助的话,欢迎star,有问题请在此留言

也可以在github Issues提问 或者直接 联系作者 109643291@qq.com

欢迎加入作者所在的QQ群: 46153838

作者个人网站: http://www.hao2013.cn

CSDN: https://blog.csdn.net/qq_33270001
