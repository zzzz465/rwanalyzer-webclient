module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  plugins: [
    'only-warn'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'indent': 2,
    '@typescript-eslint/no-empty-function' : 'off',
    'no-lone-blocks': 'off',
    'curly': ['warn', 'multi', 'consistent']
  },
  overrides: [
    {
      "files": ["**/*.vue"],
      "rules": {
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    }
  ]
}
