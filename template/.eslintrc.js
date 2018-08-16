// https://eslint.org/docs/user-guide/configuring

module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
  root: true,
  // 对Babel解析器的包装使其与 ESLint 兼容

  // javaScript语言选项
  parserOptions: {
    // 设置"script"（默认）或"module"
    // 代码是ECMAScript中的模块
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  // 预设脚本运行的环境
  env: {
    // 预定一点额全局变量
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  // 扩展一个流行的风格指南，即 eslint-config-standard
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    'html',
    'vue'
  ],
  /* * 规则的错误等级有三种：
   * 0或者"off"：关闭规则
   * 1或者"warn"：打开规则，并且作为一个警告（并不会导致检查不通过）
   * 2或者"error"：打开规则，并且作为一个错误（退出代码为1，检查不通过）
   * 参数说明：
   * 参数1：错误等级
   * 参数2：处理方式
   * */
  rules: {
      'vue/jsx-uses-vars': 2,
    // @fixable 必须使用单引号，禁止使用双引号
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // @fixable if 与 else 的大括号风格必须一致
    // @off else 代码块可能前面需要有一行注释
    'brace-style': 'off',
    // @off 有时放在第二行开始处更易读
    'operator-linebreak': 'off',
    // 变量名必须是 camelcase 风格的
    // @off 很多 api 或文件名都不是 camelcase
    'camelcase': 'off',
    // @fixable 文件最后一行必须有一个空行
    // @off 没必要限制
    'eol-last': 'off',
    // @fixable 禁止生产环境使用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // @fixable 禁止出现多余的括号，比如 (a * b) + c
    // @off 多余的括号可以使代码更清晰
    'no-extra-parens': 'off',
    // 禁止在 if 内出现函数申明或使用 var 定义变量
    'no-inner-declarations': [
      'error',
      'both'
    ],
    // 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: true,
        skipTemplates: true
      }
    ],
    // 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
    // @off 很多地方会用到 hasOwnProperty
    'no-prototype-builtins': 'off',
    // 禁止出现没必要的转义
    // @off 转义可以使代码更易懂
    'no-useless-escape': 'off',
    // @fixable 对象字面量内的属性每行必须只有一个
    // @off 没必要限制
    'object-property-newline': 'off',
    // @fixable 代码块首尾必须要空行
    // @off 没必要限制
    'padded-blocks': 'off',
    // 需要 分号
    'semi':['error','always'],
    "indent": 'off',
    "no-tabs": 'off',
    'no-console':'off'
  }
}
