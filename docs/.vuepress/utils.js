
const path = require('path')
const nodeDir = require('node-dir')

const resolve = (dir = '') => path.join(__dirname, '..', dir)

function requireFile (directory = '', recursive, regExp) {
    if (directory[0] === '.') {
        // Relative path
        directory = path.join(__dirname, directory)
    } else if (!path.isAbsolute(directory)) {
        // Module path
        directory = require.resolve(directory)
    }
    return nodeDir
        .files(directory, {
            sync: true,
            recursive: recursive || false
        })
        .filter((file) =>  {
            return file.match(regExp || /\.(json|js)$/)
        })
}

function generateNavAndSidebar (basePath) {
    const {
        nav,
        sidebar,
    } = requireFile(basePath, true, /\.md$/)
        .map(item => item.replace(`${basePath}${path.sep}`, '').replace('.md', ''))
        .filter(item => item.includes(path.sep))
        .reduce(({ nav, sidebar }, item) => {
            let [ text, ...temps ] = item.split(path.sep)
            if (text.endsWith('_')) {
                // 需要生成下拉的nav
                let navItem = nav.find(i => i.text === text.replace(/^\d+_/,'').replace(/_$/, ''))
                if (!navItem) {
                    navItem = { link: text, text: text.replace(/^\d+_/,'').replace(/_$/, ''), items: [] }
                    nav.push(navItem)
                }
                let tempText = text
                if (temps.length > 1)
                    tempText = temps[0]
                let navItemGroup = navItem.items.find(item => item.text === tempText.replace(/^\d+_/,'').replace(/_$/, ''))
                if (!navItemGroup) {
                    navItemGroup = { text: tempText.replace(/^\d+_/,'').replace(/_$/, ''), items: [] }
                    navItem.items.push(navItemGroup)
                }
                navItemGroup.items.push({
                    text: [...temps].pop().replace(/^\d+_/,'').replace(/_$/, ''),
                    link: `/${navItem.link}/${temps.join('/')}`
                })
            } else if (!nav.find(i => i.text === text.replace(/^\d+_/,'').replace(/_$/, ''))){
                nav.push({ text: text.replace(/^\d+_/,'').replace(/_$/, ''), link: `/${text}/` })
            }
            let sidebarItem = sidebar[`/${text}/`]
            if (!sidebarItem)
                sidebarItem = sidebar[`/${text}/`] = []
            if (temps.length > 1)
                text = temps[0]
            let sidebarItemGroup = sidebarItem.find(item => item.title === text.replace(/^\d+_/,'').replace(/_$/, ''))
            if (!sidebarItemGroup) {
                sidebarItemGroup = { title: text.replace(/^\d+_/,'').replace(/_$/, ''), collapsable: false, children: [] }
                temps.includes('README') ? sidebarItem.unshift(sidebarItemGroup) : sidebarItem.push(sidebarItemGroup)
            }
            sidebarItemGroup.children[temps.includes('README') ? 'unshift' : 'push'](temps.includes('README') ? '' : temps.join('/'))
            return { nav, sidebar }
        }, { nav: [], sidebar: {} })
    nav.forEach(item => {
        if (item.link && sidebar[item.link]) {
            const sidebarItemGroup = sidebar[item.link][0]
            if (!sidebarItemGroup.children.includes('')) {
                item.link = `${item.link}${sidebarItemGroup.children[0]}`
            }
        }
    })
    return { nav, sidebar }
}

module.exports = {
    resolve,
    requireFile,
    generateNavAndSidebar,
}
