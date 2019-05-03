const path = require('path')

module.exports = {
    entry: './extension/js/content/index.js',
    output: {
        filename: 'content.js',
        path: path.resolve(__dirname, 'extension/js/')
    },
    module: {
        rules:[{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'extension'),
        publicPath: '/dist'
    }
}

