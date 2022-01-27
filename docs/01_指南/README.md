
# 介绍

本站基于 [VuePress](https://vuepress.vuejs.org/zh/) 搭建，主要封装了自动生成导航栏、侧边栏，让你无需了解、操作、管理 `vuepress` 配置，帮助你专注于写作。

你只需要会一些简单的 [Markdown](https://www.jianshu.com/p/191d1e21f7ed/) 语法，就能写一篇简洁明了的文章了。


## 为什么要搭建本网站？

本站的主要目的是对前端技术、公司项目、业务需求的记录和整理。帮助开发人员加深对公司技术、项目、业务的了解，同时也方便新人接手，能帮助他快速投入项目开发提高工作效率。


## 主要目录

```
project
├── docs   
│     ├── .vuepress                                 // vuepress 配置目录，忽略即可
│     │     ├── config.js                           // 配置文件
│     │     ├── utils.js                            // 工具文件
│     │     └── public                              // 静态资源目录
│     │         ├── assets
│     │         ├── favicon.ico
│     ├── 01_指南                                    // 总体概览
│     ├── 02_插件工具                                 // @autostreets/plugins
│     ├── 03_组件UI                                   // @autostreets/widgets
│     ├── 04_原生Native_                              // 原生壳子相关
│     ├── 05_了解业务_                                // 业务相关
│     ├── 06_其他_                                    // 业务相关
│     ├── README.md                                  // 首页
├── node_modules                                    // 依赖包               
├── package-lock.json
├── package.json                                    // 项目包说明文件
└── .gitignore                                      // git 忽略文件
```


## 怎么发布一篇文章？

::: warning 前提条件
需要 [Node.js](https://nodejs.org/zh-cn/) >= 8.6
:::

1. git 拉取 [本仓库](https://gits.autostreets.com/autostreets_web/design-docs)
   
   ```bash
   git clone https://gits.autostreets.com/autostreets_web/design-docs.git
   ```
   
2. 安装依赖初始化
   
   ```bash
   cd design-docs
   npm install
   ```

3. 本地预览

   ```bash
   npm run dev
   ```
   会在 [http://localhost:12580](http://localhost:12580)启动一个热重载的开发服务器。

4. `docs/` 目录下新建你要写的文档即可

   ```bash
   cd docs && mkdir test && cd test && touch test.md
   ```
   
5. 提交文档到Git仓库

6. 进入到 [Jenkins](http://cife.autostreets.com/job/Test-design-docs/) 进行发布

## 准备好了吗？

刚才已经简单介绍了一下本网站，来尝试发布一篇属于自己的文档吧！
