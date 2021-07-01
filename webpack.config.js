const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  mode:process.env.NODE_ENV,
  entry:{
    app:"./src/js/index.js"
  },
  output:{
    path:path.resolve(__dirname,'dist'),   
    filename: 'js/[name].js?[hsah:8]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },

  module:{
    rules:[
      {
        test:/\.js$/i,
        exclude:/node_module/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env'
            ]
          }
        }        
      },  
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            // inject CSS to page
            loader: 'style-loader'
          }
          , {
            // translates CSS into CommonJS modules
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          }
        ]
      }   
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'filter-f2e',
      template: './src/index.html',
      filename: 'main.html',
      chunks: ['vendor', 'app']
    }),
    new Dotenv()
  ],
  devtool: 'source-map',
  devServer:{
    compress:true,
    contentBase:path.join(__dirname,'dist'),
    port: 6600,
    stats:{
      colors:true,
      hash:true
    }
  }


}