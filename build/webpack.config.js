const {VueLoaderPlugin} = require('vue-loader');
const {HotModuleReplacementPlugin} = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'app.bundle.js',
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
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    useRelativePath: true,
                    name: path.posix.join('static', 'img/[name].[hash].[ext]'),
                    esModule: false
                }
            },
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
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../index.html'),
            showErrors: true,
            cache: true,
        }),
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../dist'),
            verbose: true,
            dry: false,
            cleanOnceBeforeBuildPatterns: ['^(?!vendor).*$']
        }),
        new UglifyJsPlugin(
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
        ),
        new DllReferencePlugin({
            manifest: require(path.resolve(__dirname, '../dist/vendor-manifest.json'))
        }),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
}
