const path = require('path')

module.exports = {
    entry: './extension/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
        contentBase: path.resolve(__dirname, 'src'),
        publicPath: '/dist'
    }
}

