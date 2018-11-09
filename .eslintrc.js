module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 8, //指定ECMAScript支持的版本，6为ES6，这里为了兼容async和await，设置为8
        sourceType: 'module'
    },
    extends: 'standard',
    plugins: [
        'html',
        'promise'
    ],
    env: {
        'node': true
    },
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "semi": [2, "always"], //语句强制分号结尾.
        "indent": ["error", "tab"], //缩进风格
        "indent": [2, 4], //缩进风格
        // "no-mixed-spaces-and-tabs": [2, true],
        "vue/max-attributes-per-line": 0,
        // "operator-linebreak": ["error", "none"],
        "spaced-comment": 0, //注释风格要不要有空格什么的
        "eqeqeq": 0, //必须使用全等
        'no-tabs': 'off', //禁止使用tab
        "no-return-assign": 0, //return 语句中不能有赋值表达式
        "no-extra-parens": 'off', //禁止混用不同的操作符
        "no-mixed-operators": 'off', //禁止混合使用不同的操作符
        "space-before-function-paren": [0, "always"], //方法空格
        "eol-last": [0, "always"], //结尾换行
        "dot-location": 0, //对象访问符的位置，换行的时候在行首还是行尾
        "padded-blocks": 0, //禁止空行换行
        "prefer-spread": 2, //首选展开运算
    }
}