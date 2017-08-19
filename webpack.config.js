'use strick';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});



module.exports={
	entry: {
        //angular
	    core: './app/models/index.js',
	    //javascripts
        index: './app/assets/javascripts/index.js',
	    //stylesheets
        index_less: './app/assets/stylesheets/index.less',
        reset: './app/assets/stylesheets/reset.css',
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
        },
        {
            test: /\.css$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }],
                fallback: "style-loader"
            })
        }]
        },
    plugins: [
        extractLess
    ],
	watch: true
} 
