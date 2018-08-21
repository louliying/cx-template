'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

// 去读UCM配置 start
/*
	http://10.32.135.54:8080/api/getProperties/1.htm
	?clientType=web
	&clientVersion=1.2.0.RELEASE
	&reloadPort=8080
	&projectVersion=master
	&projectCode=从cmdb中获取的应用名称
	&clientIp=填写ip,
	// 如:10.47.28.256(sit:10.47.28.256,pre:10.32.188.256,prd:10.32.133.256)
*/
const request = require('request');
const fs = require("fs");

const Package = require("../package.json");

let ipObj = {
	'sit': '10.47.28.256',
	'pre': '10.32.188.256',
	'prd': '10.32.133.256'
};
let env = process.env.NODE_ENV || 'sit';
let sUrl = 'http://10.32.135.54:8080/api/getProperties/1.htm?clientType=web&clientVersion=1.2.0.RELEASE&reloadPort=8080&projectVersion=master&projectCode=' + Package.name + '&clientIp=' + ipObj[env];
var options = {
	url: sUrl,
	headers: {
		'User-Agent': 'request'
	}
};
function callback(error, response, body) {
	if (!error && response.statusCode == 200) {
		var sData = body;
		sData = 'var  envConfig = ' + sData;
		var oData = JSON.parse(body);
		// console.log('info 0000:', oData);
		var jsData = fs.readFileSync('./static/ucm.js', 'utf8');
		// console.log('jsData 111:', jsData);
		fs.writeFile('./static/ucm.js', sData, () => {
			var jsData1 = fs.readFileSync('./static/ucm.js', 'utf8');
			// console.log('jsData 2222:', jsData1);
		});
	}
}
request(options, callback);
// 去读UCM配置  end

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,

	// these devServer options should be customized in /config/index.js
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
			],
		},
		hot: true,
		contentBase: false, // since we use CopyWebpackPlugin.
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay
			? { warnings: false, errors: true }
			: false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll,
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			ucmSrc:'./static/ucm.js',
			inject: true
		}),
		// copy custom static assets
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: config.dev.assetsSubDirectory,
				ignore: ['.*']
			}
		])
	]
});

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port;
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err)
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port
			// add port to devServer config
			devWebpackConfig.devServer.port = port

			// Add FriendlyErrorsPlugin
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
				},
				onErrors: config.dev.notifyOnErrors
				? utils.createNotifierCallback()
				: undefined
			}))

			resolve(devWebpackConfig)
		}
	});
});