/**
 *
 * 本规则中包含了所有 ESLint 规则，依据以下三条原则进行配置：
 *
 * 1. 能够帮助发现代码错误的规则，全部开启
 * 2. 配置不应该依赖于某个具体项目，而应尽可能的合理
 * 3. 帮助保持团队的代码风格统一，而不是限制开发体验
 * @fixable 表示此配置支持 --fix
 * @off 表示此配置被关闭了，并且后面说明了关闭的原因
 *
 *
 * 注意:
 * 1.这个文件只由一人维护, 其他人尽量不要改动
 * 2.请大家务必遵守规则, 提交的文件不允许出现红色波浪线
 */

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
  root: true,
  // 对Babel解析器的包装使其与 ESLint 兼容
  parser: 'babel-eslint',
  // javaScript语言选项
  parserOptions: {
    // 设置"script"（默认）或"module"
    // 代码是ECMAScript中的模块
    sourceType: 'module'
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
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    'html',
    // standard风格的依赖包
    "standard",
    // standard风格的依赖包
    "promise"
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
    'semi':['error','always']
  }
}
