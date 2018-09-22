const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
var merge = require('webpack-merge');

var commonConfig = {
    entry: {
        home: ["@babel/polyfill", path.join(__dirname, 'src', 'index')],
        review: ["@babel/polyfill", path.join(__dirname, 'src', 'pages', 'review', 'index')]
    }, 
    output: {
        filename: '[name][hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    
    plugins: [
        
        new HtmlWebpackPlugin(
            {
            title: 'Indie Books Reviews',
            template: 'src/index.html',
            chunks: ['home'],
            filename: path.resolve(__dirname, 'dist', 'index.html')
        }),
        new HtmlWebpackPlugin(
        {
            title: 'Review',
            template: 'src/pages/review/index.html',
            chunks: ['review'],
            filename: path.resolve(__dirname, 'dist', 'review', 'index.html')
        }),
        new Dotenv() 
    ],
    module: {
        rules: [ 
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: "babel-loader"
        },
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
    },
    resolve: {
        alias: {
          styles: path.resolve(__dirname, 'src', 'styles'),
          resources: path.resolve(__dirname, 'src', 'resources'),
          database: path.resolve(__dirname, 'src', 'dataBase'),
          pages: path.resolve(__dirname, 'src', 'pages')
        }
      },
};

var devConfig = {
    devServer: {
        open: true, 
        overlay: true, 
        port: 3000 
    },
}

var prodConfig = {
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
}

module.exports = (env, argv) =>
  argv.mode === 'development' ?
    merge(commonConfig, devConfig) :
    merge(commonConfig, prodConfig);