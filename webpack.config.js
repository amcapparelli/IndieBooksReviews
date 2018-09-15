const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        filename: 'bundle[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true, 
        overlay: true, 
        port: 3000 
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin(
            {
            title: 'Indie Books Reviews',
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [
        {
            test: /\.(html|ejs)$/,
            loader: ['html-loader', 'ejs-html-loader'],
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.(jpg|png)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]'
                }
            }
        }
    ]
    }
};