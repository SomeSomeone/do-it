'use strick';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});



module.exports={
	entry: {
	    core: './app/models/index.js',
	    index: './app/javascripts/index.js',
	    index_less: './app/assets/stylesheets/index.less'
	},
	output: {
		path: __dirname  + '/public',
		filename: "[name].js"
	},
	module: {
        rules: [{
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                fallback: "style-loader"
            })
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
            }
        }]
        },
    plugins: [
        extractLess
    ],
	watch: true
} 
