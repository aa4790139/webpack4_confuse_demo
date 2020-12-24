const {join} = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const {HotModuleReplacementPlugin} = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: join(__dirname, 'app.js'),
    output: {
        path: join(__dirname, 'build'),
        filename: 'app.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }, {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            showErrors: true,
            cache: true,
            template: join(__dirname, 'index.html')
        }),
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin(
            {
                uglifyOptions: {
                    compress: {
                        // warnings: false,
                        /* 移除没被引用的代码 */
                        dead_code: true,
                        /* 当 Function(args, code)的args 和 code都是字符串时，压缩并混淆 */
                        // unsafe_Func: true,
                        /* 干掉没有被引用的函数和变量 */
                        unused: true,
                        /* 干掉顶层作用域中没有被引用的函数或变量 */
                        toplevel: true,
                        /* 干掉console.*函数 */
                        drop_console: true,
                        /* 干掉Debugger*/
                        drop_debugger: true,
                        /* 压缩代码次数 注意：数字越大压缩耗时越长 */
                        passes: 1,
                        /* 传true以防止压缩时把1/0转成Infinity，那可能会在chrome上有性能问题 */
                        keep_infinity: true
                    },
                    output: {
                        comments: false,
                    },
                    mangle: {
                        properties: {
                            // keep_fnames: false,
                            regex: /(^__|^m_)\w+/,
                            reserved: ["$", "iv", "mode", "padding", "CryptoJS"]
                        }
                    }
                },
                cache: true,
                extractComments: false,
                sourceMap: false,
                parallel: true
            }
        )],
    },
}
