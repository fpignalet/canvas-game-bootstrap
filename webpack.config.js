module.exports = [

    //-------------------------------------------------
    //minifying module_direct.js
    {
        entry: './public/javascripts/module_direct.js',
        output: {
            path: __dirname + "/public/dist",
            filename: 'bundleraw.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/
                }
            ]
        }
    },

    //-------------------------------------------------
    //minifying module_game.js
    {
        entry: './public/javascripts/module_react.jsx',
        output: {
            path: __dirname + "/public/dist",
            filename: 'bundlegame.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/react',
                                    {
                                        'plugins': ['@babel/plugin-proposal-class-properties']
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }

];