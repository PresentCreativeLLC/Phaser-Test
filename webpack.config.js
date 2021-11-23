const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_env) =>
{
	// Html webpack plugin config
	const htmlWebpackPluginConfig = {
		filename: "index.html",
		template: "./src/index.html",
		chunks: ["vendor", "app"],
		chunksSortMode: "auto",
		minify: false,
		hash: false
	};

	// Set default config settings
	const config = {
		entry: {
			app: [path.resolve(__dirname, "./src/main.js")],
			vendor: ["phaser"]
		},
		mode: "development",
		devtool: "source-map",
		output: {
			pathinfo: true,
			path: path.resolve(__dirname, "./dist"),
			publicPath: "./",
			filename: "[name].js",
			chunkFilename: "[name].js"
		},
		resolve: {
			alias: {
				node_modules: path.resolve(__dirname, "node_modules"),
			}
		},
		watch: true,
		plugins: [
			new HtmlWebpackPlugin(htmlWebpackPluginConfig),
			new CleanWebpackPlugin(),
			new BrowserSyncPlugin({
				host: "localhost",
				port: 3000,
				server: {
					baseDir: ["./dist"]
				}
			}),
			new CopyPlugin({
				patterns: [
					{ from: "resources", to: "resources" }]
			})
		],
		module: {
			rules: [
				{
					test: /\.js$/, //using regex to tell babel exactly what files to transcompile
					exclude: /node_modules/, // files to be ignored
					use: {
						loader: 'babel-loader' // specify the loader
					} 
				}
			]
		}
	};

	return [config];
};