module.exports = [

    //-------------------------------------------------
    //bundling module_direct.js
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
    //transpiling and bundling module_game.js
    {
        entry: './public/javascripts/module_game.jsx',
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
    },

    //-------------------------------------------------
    //transpiling and bundling module_game.js
    {
        entry: './public/javascripts/module_tests.jsx',
        output: {
            path: __dirname + "/public/dist",
            filename: 'bundletests.js'
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