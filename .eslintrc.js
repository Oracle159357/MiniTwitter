const path = require('path')

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb"
  ],
  "plugins": [
    "babel",
    "promise"
  ],
  "env": {
    "browser": true,
  },
  "rules": {
    "key-spacing": "off",
    "no-confusing-arrow": "off",
    "jsx-quotes": "off",
    "linebreak-style": "off",
    "react/destructuring-assignment": "never",
    "max-len": [2, 120, 2],
    "object-curly-spacing": [2, "always"],
    "global-require": "off",
    "import/prefer-default-export": 0,
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "import/no-mutable-exports": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": path.resolve("./webpack.config.js"),
        "paths": ["src"],
      }
    }
  }
}