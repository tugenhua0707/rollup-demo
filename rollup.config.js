// Rollup plugins
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// 新增 rollup-plugin-postcss 插件
import postcss from 'rollup-plugin-postcss';

// 新增 postcss plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
  input: './src/main.js',
  output: {
    file: './dist/js/main.min.js',
    format: 'iife'
  },
  plugins: [
    // 新增的
    postcss({
      extensions: ['.css'],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano()
      ]
    }),
    resolve({
      jsnext: true,  // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true,  // Default: true 
      browser: true // Default: false
    }),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**'  // 排除node_modules 下的文件
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    serve({
      open: true, // 是否打开浏览器
      contentBase: './', // 入口html的文件位置
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10002
    }),
    livereload()
  ]
}