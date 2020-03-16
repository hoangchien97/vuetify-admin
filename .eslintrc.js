module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'vuetify',
    "prettier/vue",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "no-console": 0,
    "prettier/prettier": ["error", { semi: false }],
    "vue/no-v-html": "off",
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}