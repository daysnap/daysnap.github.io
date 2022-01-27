
const { resolve, generateNavAndSidebar } = require('./utils')
const { nav, sidebar } = generateNavAndSidebar(resolve())

// 主要配置参考 => https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE

module.exports = {
    title: 'DaySnap',
    description: 'DaySnap | one day one snap',
    base: '/',
    dest: 'dist',
    host: '0.0.0.0',
    port: '12580',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    plugins: [
        '@vuepress/nprogress'
    ],
    themeConfig: {
        logo: '/images/logo.png',
        nav,
        sidebar,
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': '/'
            }
        }
    },
}



