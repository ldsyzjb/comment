const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        content: './src/js/content/index.js',
        popup: './src/js/popup/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js/')
    },
    module: {
        rules:[{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader', 
                'css-loader', 
                'sass-loader'
            ]
        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader', 
                'css-loader'
            ]
        }]
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'extension'),
        publicPath: '/dist'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      })
    ]
}

