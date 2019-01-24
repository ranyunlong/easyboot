module.exports = {
    // 网页标题
    title: 'Easyboot.js',
    // 网页描述
    description: 'Easyboot framework',
    // 输出目录
    dest: '.vuepress/dist',
    // 多语言配置
    locales: {
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
            title: 'Eayboot.js',
            label: '中文简体',
            description: 'Easyboot.js framework'
        },
        '/en/': {
            lang: 'en-US',
            title: 'Eayboot.js',
            label: 'English',
            description: 'Easyboot.js framework'
        }
    },
    // 部署站点的基础路径
    base: '/',
    port: 3001,
    // 默认使用了 cache-loader 来大大地加快 webpack 的编译速度。
    head: [
        ['link', { rel: 'icon', href: '' }]
    ],
    cache: true,
    /**
     * 自定义主题 string
     */
    // theme: '',
    themeConfig: {
        locales: {
            '/': {
                selectText: '选择语言',
                lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
                label: '中文简体',
                editLinkText: '在GitHub改善这个页面',
                serviceWorker: {
                    updatePopup: {
                      message: "发现新内容可用.",
                      buttonText: "刷新"
                    }
                },
                nav: [
                    { text: '首页', link: '/' },
                    { text: 'API文档', link: '/api/' }
                ],
                sidebar: {
                    '/': [
                        {
                            title: '指南',
                            collapsable: false,
                            children: [
                                ['/guide/', '介绍'],
                                ['/guide/getting-started', '快速上手'],
                                ['/guide/module', '模块']
                            ]
                        },
                        {
                            title: 'API',
                            collapsable: false,
                            children: [
                                ['/api/decorators/', '装饰器'],
                                ['/api/configuration/', '配置模板类']
                            ]
                        }
                    ]
                }
            },
            '/en/': {
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lang: 'en-US',
                label: 'English',
                serviceWorker: {
                    updatePopup: {
                      message: "New content is available.",
                      buttonText: "Refresh"
                    }
                },
                nav: [
                    { text: '首页', link: '/' },
                    { text: 'API文档', link: '/en/api/' }
                ],
                sidebar: [
                    {
                        title: 'API文档',
                        collapsable: false,
                        children: [
                          ['/en/api/', 'Servlet']
                        ]
                    },
                ]
            }
        },
        repo: 'ranyunlong/easyboot',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true
    },
    markdown: {
        // 是否在每个代码块的左侧显示行号。
        // lineNumbers: true,
        // 一个将标题文本转换为 slug 的函数。修改它会影响 标题、目录、以及侧边栏链接的 id 和 链接。
        // slugify: () => {},
        /**
         * markdown-it-anchor 的选项。
         * https://github.com/valeriangalliat/markdown-it-anchor
         */
        anchor: {
            permalink: true,
            permalinkBefore: true,
            permalinkSymbol: '#'
        },
        /**
         * 这个键值对将会作为特性被增加到是外部链接的 <a> 标签上，默认的选项将会在新窗口中打开一个该外部链接。
         */
        externalLinks: {
            target: '_blank',
            rel: 'noopener noreferrer'
        },
        /**
         * markdown-it-table-of-contents 的选项。
         * https://github.com/Oktavilla/markdown-it-table-of-contents
         */
        toc: {
            includeLevel: [2, 3]
        },
        /**
         * 一个用于修改当前的 markdown-it 实例的默认配置，或者应用额外的插件的函数，举例如下：
         */
        // extendMarkdown: md => {
        //     md.set({ breaks: true })
        //     md.use(require('markdown-it-xxx'))
        // }
    },
    //如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 true，这将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积。
    evergreen: false,
    /**
     * less-loader 的选项。
     * https://github.com/webpack-contrib/less-loader
     */
    less: {},
    /**
     * 通过 webpack-chain 来修改内部的 Webpack 配置。
     * https://github.com/mozilla-neutrino/webpack-chain
     */
    // chainWebpack: (config, isServer) => {
    //     // config 是 ChainableConfig 的一个实例
    // }
    /**
     * 用于修改内部的 Webpack 配置。
     * 如果给定一个对象，那么它将会被 webpack-merge 合并到最终的配置中，
     * 如果给定一个函数，它将会接受 config 作为第一个参数，
     * 以及 isServer 作为第二个参数，你可以直接更改 config，
     * 也可以返回一个待合并的对象。
     */
    // configureWebpack: (config, isServer) => {
    //     if (!isServer) {
    //         // 修改客户端的 webpack 配置
    //     }
    // }
}