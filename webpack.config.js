const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        content: './src/js/content/index.js',
        popup: './src/js/popup/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'extension/js/')
    },
    module: {
        rules:[{
            test: /\.scss$/,
            use: [
                {
                    loader:  MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './dist/css/',
                    }
                },
                'css-loader', 
                'sass-loader'
            ]
        },{
            test: /\.css$/,
            use: [
                {
                    loader:  MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './dist/css/',
                    }
                },
                'css-loader'
            ]
        }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "../css/[name].css",
        chunkFilename: '[id].css'
      })
    ]
}

