const path = require("path")

module.exports = {
    entry: './src/components/app.ts',
    output: {
        filename: "bundle.js",
        path: this.path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    }
};
