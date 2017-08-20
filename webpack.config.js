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
        font_awesome:'./app/assets/stylesheets/font-awesome.css',
        reset: './app/assets/stylesheets/reset.css',
        //images
        logo: './app/assets/images/logo.png',
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
                use: [
                {
                    loader: "css-loader"
                },{
                    loader: "resolve-url-loader"
                }],
                fallback: "style-loader"
            })
        },

        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ,
        {
            //test: /\.(jpe?g|png|gif|svg)$/i 
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
            'file-loader?digest=hex&name=[name].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }
    ]},
    plugins: [
        extractLess
    ],
	watch: true
} 
