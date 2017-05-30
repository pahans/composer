module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "env": {
        "browser": true,
        "commonjs": true,
    },
    "extends": "eslint:recommended",
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-unused-vars": "warn",
        "no-undef": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-redeclare": "error",
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eqeqeq": [
            "warn",
            "always"
        ]
    }
};
