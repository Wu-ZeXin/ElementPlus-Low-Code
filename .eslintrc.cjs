/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  /*
    默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有   "root": true，它就会停止在父级目录中寻找。
  */
  root: true,
  env: {
    // 浏览器环境中的全局变量
    browser: true,
    // Node.js 全局变量和 Node.js 作用域
    node: true,
    // 启用除了 modules 以外的所有 ECMAScript 6 特性
    es6: true,
  },
  /*
  	指定npm模块自定义为项目的解析器，默认ESpree
  	注意，在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 parserOptions 仍然是必须的。解析器会被传入 			parserOptions，但是不一定会使用它们来决定功能特性的开关。
  */
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    // 指定想要使用的 ECMAScript 版本
    ecmaVersion: "latest",
    // "script" (默认) 或 "module"（如果代码是 ECMAScript 模块)。
    sourceType: "module",
    ecmaFeatures: {
      // 启用 JSX
      jsx: true,
      /*
      	globalReturn - 允许在全局作用域下使用 return 语句
		impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
      */
    },
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {	// 校验规则
    /*
      "off" or 0 - 关闭规则
	  "warn" or 1 - 将规则视为一个警告（不会影响退出码）
	  "error" or 2 - 将规则视为一个错误 (退出码为1)
    */
    "vue/script-setup-uses-vars": "error",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "vue/custom-event-name-casing": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "space-before-function-paren": "off",

    "vue/attributes-order": "off",
    "vue/one-component-per-file": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/attribute-hyphenation": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/multi-word-component-names": "off",
  },
};