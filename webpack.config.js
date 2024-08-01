const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new Dotenv()
    ],
    "rules": {
        "react-hooks/exhaustive-deps": 0
    }
};