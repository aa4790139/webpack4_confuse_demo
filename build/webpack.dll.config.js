const DllPlugin = require('webpack/lib/DllPlugin');
const path = require('path')
const fs = require('fs');

var packageJsonContent = fs.readFileSync(path.resolve(__dirname, '../package.json'));
var packageJson = JSON.parse(packageJsonContent);

var dependencies = Object.keys(packageJson.dependencies);

module.exports = {
    entry: {
        vendor: dependencies
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'vendor.bundle.js',
        library: 'vendor_lib'
    },
    plugins: [
        new DllPlugin({
            context: __dirname,
            name: 'vendor_lib',
            /* 生成manifest文件输出的位置和文件名称 */
            path: path.resolve(__dirname, '../dist/vendor-manifest.json')
        })
    ],
}
