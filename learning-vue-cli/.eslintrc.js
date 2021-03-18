module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
<<<<<<< HEAD
    "no-mixed-spaces-and-tabs": 0,
=======
    "no-mixed-spaces-and-tabs": 0, // disable rule
>>>>>>> c80c8ff9e053a41f2c52bba4c94358578dfb91ce
  }
}
