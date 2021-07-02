//import webpack from 'webpack';
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '../../../';

module.exports={
  mode:process.env.NODE_ENV,
  entry:{
    app:"./src/js/index.js"
  },
  output:{
    path:path.resolve(__dirname,'dist'),   
    filename: 'js/[name].js?[hsah:8]',
    //assetModuleFilename: 'assets/images/[hash][ext][query]'
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
        test: /\.(png|jpe?g|gif)$/i,
       // type: 'asset/resource'
        use: [
          // {
          //   loader:'file-loader',
          //  // loader: 'url-loader',
          //   options: {
          //     //limit:8892,
          //     //fallback:require.resolve('file-loader'),
          //     outputPath: 'image',
          //     //name:'[path][name].[ext]',
          //     name:'[name].[ext]',
          //     //publicPath: 'assets',
          //     //context: path.resolve(__dirname, "src/"),
          //     //outputPath: '../../../',
          //     //publicPath: '../../../',
          //     //useRelativePaths: true
          //   },
          // },
          {
            loader:'url-loader',
            options:{
              limit:8892,
              fallback:require.resolve('file-loader'),
              name:'[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            // inject CSS to page
            loader: 'style-loader', 
            options:{
             // publicPath: '../../../',
             //sourceMap: true,
            }          
          }
          , {
            // translates CSS into CommonJS modules
            loader: 'css-loader',
            options: {
              sourceMap: true,
              //url: true,
              
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
            loader:'resolve-url-loader',
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
  // resolve: {
  //   alias: {
  //     "/assets/image/logo.png": path.resolve(
  //       __dirname,
  //       "assets/image/logo.png"
  //     ),
  //   },
  // },
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