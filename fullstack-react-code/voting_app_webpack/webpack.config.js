module.exports = {
  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  entry: __dirname + "/app/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loader: 'css-loader'//添加对样式表的处理
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: __dirname + "/public",
    historyApiFallback: true,
    inline: true
  }
}