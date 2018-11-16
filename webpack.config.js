const path = require('path');
const plugin = require('./plugin');

const config = {
    mode: 'development',
    entry: './foo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js',
        library: 'someLibName',
        libraryTarget: 'umd',
        auxiliaryComment: {
            root: 'Root Comment',
            commonjs: 'CommonJS Comment',
            commonjs2: 'CommonJS2 Comment',
            amd: 'AMD Comment'
        }
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'res.[path][name].[ext]'
                        }
                    },
                    {
                        loader: 'loader'
                    }
                ]
            }
        ]
    },
    plugins: [new plugin()],
    context: path.resolve(__dirname, './'),
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, './')]
    }
};

module.exports = config;
