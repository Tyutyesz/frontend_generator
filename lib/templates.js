exports.mainStyle = function() {
    return `
    @import abstracts/variables
    @import abstracts/variables
    `;
};
exports.resetCss = function() {
    return `
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
  overflow-x: hidden;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
    `;
};
exports.esLint = {
    getLinter() {
        return `
        {
          "parser": "babel-eslint",
          "extends": "eslint-config-airbnb-base",
          "rules": {
            "func-names": ["error", "never"],
            "indent": ["error", 4],
            "prefer-destructuring": "off"
          },
          "env": {
            "browser": true
          }
        }`;
    },
    getLintIgnore() {
        return `
            build/*
            !build/index.js
            dist
            ExplodingObjects/*
        `;
    },
};
exports.webpackConfigs = {
    getMainConfig() {
        return `
        const path = require('path');
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        const webpack = require('webpack');
        
        module.exports = {
            devServer: {
                host: '0.0.0.0',
                disableHostCheck: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
        
            },
            entry: './src/assets/scripts/app',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'app.[contenthash:8].js',
                publicPath: '/',
            },
            resolve: {
                modules: [
                    'node_modules',
                    path.resolve(__dirname, 'src'),
                ],
                extensions: ['.js'],
                alias: {
                    '@scss': path.resolve(__dirname, './src/assets/styles'),
                    '@js': path.resolve(__dirname, 'src/assets/script'),
                    createjs: 'createjs/builds/1.0.0/createjs.js',
                },
            },
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'Landing Page',
                    template: './src/index.html',
                    inject: true,
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                    },
                }),
        
        
                new MiniCssExtractPlugin({
                    filename: 'main.css',
                }),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                    createjs: 'createjs',
                    Sound: 'sound',
                }),
            ],
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\\.js$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                            },
                        },
                    },
                    { test: /\\.js$/, loader: 'imports-loader?define=>false' },
                    {
                        test: [/\\.css$|.scss$/],
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\\.(woff(2)?|ttf|eot)(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/',
                            },
                        }],
                    },
                    {
                        test: /\\.json$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'assets/images/',
                                    publicPath: 'assets/images/',
                                },
                            },
                        ],
                    },
                    {
                        test: /\\.html$/,
                        include: path.join(__dirname, 'src/views'),
                        loader: 'html-loader',
                        options: {
                            interpolate: true,
                        },
                    },
                    {
                        test: /\\.(png|svg|jpg|gif)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'assets/images/',
                                    publicPath: 'assets/images/',
                                },
                            },
                        ],
                    },
                    {
                        test: /\\.(mp3|mov)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'assets/media/',
                                    publicPath: 'assets/media/',
                                },
                            },
                        ],
                    },
                    /* {
                        test: /\\.mp4$/,
                        use: 'file-loader?name=assets/media/[name].[ext]',
                    }, */
                    {
                        test: /\\.mp4$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'assets/media/',
                                    publicPath: 'assets/media/',
                                },
                            },
                        ],
                    },
                    {
                        test: /\\.(obj|mtl)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/objects/',
                            publicPath: 'assets/objects/',
                        },
                    },
                    {
                        test: /\\.glsl$/,
                        use: [
                            {
                                loader: 'webpack-glsl-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'assets/shaders/',
                                    publicPath: 'assets/shaders/',
                                },
                            },
                        ],
                    },
                    {
                        test: /\\.mp4$/,
                        loader: 'url?limit=10000&mimetype=video/mp4',
                    },
                ],
            },
        };

        `;
    },
    getDevConfig() {
        return `
            const merge = require('webpack-merge');
            const webpackBaseConfig = require('./webpack.config');
            
            module.exports = merge(webpackBaseConfig, {});
        `;
    },
    getBuildConfig() {
        return `
            const merge = require('webpack-merge');
            const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
            const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
            const CleanWebpackPlugin = require('clean-webpack-plugin');
            const webpackBaseConfig = require('./webpack.config.js');
            
            module.exports = merge(webpackBaseConfig, {
                optimization: {
                    minimizer: [
                        new UglifyJsPlugin(),
                        new OptimizeCSSAssetsPlugin(),
                    ],
                },
                output: {
                    publicPath: '',
                },
            
                plugins: [
                    new CleanWebpackPlugin(['dist']),
                ],
            });
        `;
    },
};
exports.nodeModules = {
    getModules() {
        return `
        {
              "name": "matyi_dev_pack",
              "version": "1.0.0",
              "description": "",
              "main": "index.js",
              "scripts": {
                "test": "echo \\"Error: no test specified\\" && exit 1",
                "build": "webpack --mode production --config webpack.prod.config.js",
                "watch": "webpack-dev-server --mode development --config webpack.dev.config.js"
              },
              "repository": {
                "type": "git",
                "url": "git+https://github.com/Tyutyesz/highway_demo.git"
              },
              "author": "",
              "license": "ISC",
              "bugs": {
                "url": "https://github.com/Tyutyesz/highway_demo/issues"
              },
              "homepage": "https://github.com/Tyutyesz/highway_demo#readme",
              "dependencies": {
                "@babel/cli": "^7.4.4",
                "@babel/core": "^7.4.5",
                "@babel/preset-env": "^7.4.5",
                "babel-eslint": "^10.0.2",
                "babel-loader": "^8.0.6",
                "bootstrap": "^4.3.1",
                "clean-webpack-plugin": "^3.0.0",
                "css-loader": "^3.0.0",
                "eslint": "^5.16.0",
                "eslint-config-airbnb-base": "^13.1.0",
                "eslint-loader": "^2.1.2",
                "eslint-plugin-import": "^2.18.0",
                "file-loader": "^4.0.0",
                "gsap": "^2.1.3",
                "html-loader": "^0.5.5",
                "html-webpack-plugin": "^3.2.0",
                "imports-loader": "^0.8.0",
                "mini-css-extract-plugin": "^0.7.0",
                "node-sass": "^4.12.0",
                "sass-loader": "^7.1.0",
                "scrollmagic": "^2.0.7",
                "three": "^0.106.1",
                "three-obj-loader": "^1.1.3",
                "three-obj-mtl-loader": "^1.0.3",
                "three-orbitcontrols": "^2.102.1",
                "url-loader": "^2.0.1",
                "webpack": "^4.35.0",
                "webpack-cli": "^3.3.5",
                "webpack-dev-server": "^3.7.2",
                "webpack-glsl-loader": "^1.0.1",
                "webpack-merge": "^4.2.1"
              }
            }
        `;
    },
};
exports.htmlTemplates = {
    getHead() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Title</title>
            
                <meta name="viewport" content="width=device-width, initial-scale=1 ,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
            
                <meta name="robots" content="noindex, nofollow">
            
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            
            </head>
            <body>
        `;
    },
    getFooter() {
        return `
              <footer></footer>
              </body>
              </html>
        `;
    },
    getNavigation() {
        return `
            <header></header>
        `;
    },
    getSkeleton() {
        const content = '${require(\'views/partials/_head.html\')} \n'
            + '${require(\'views/partials/_navigation.html\')} \n'
            + '<p>Skeleton</p> \n'
            +'${require(\'views/partials/_footer.html\')} \n';
        return content;
    },
};

exports.gitIgnore = {
    createGitIgnore() {
        const template = `.DS_Store

application/cache/*
!application/cache/index.html

application/logs/*
!application/logs/index.html

!application/*/.htaccess

composer.lock

user_guide_src/build/*
user_guide_src/cilexer/build/*
user_guide_src/cilexer/dist/*
user_guide_src/cilexer/pycilexer.egg-info/*
/vendor/

# IDE Files
#-------------------------
/nbproject/
.idea/*
/node_modules/
/.sass-cache/
/.idea/
/.vs
/ipn-log.txt
/assets/styles/style.css.map

## Sublime Text cache files
*.tmlanguage.cache
*.tmPreferences.cache
*.stTheme.cache
*.sublime-workspace
*.sublime-project
/tests/tests/
/tests/results/
/package-lock.json
/.htaccess
/dev/node_modules/
/dev/package-lock.json
/dist/

`;
        return template;
    },
};