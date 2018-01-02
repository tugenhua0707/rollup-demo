import './css/index.css';

import { a } from './js/a';
import addArray from './js/b';
import debug from 'debug';

// 添加json
import pkg from '../package.json';
console.log( `running version ${pkg.version}` ); // 控制台输出 running version 1.0.0

const log = debug('app:log');
// 如果不是正式环境的话，不输出日志信息
if (ENV !== 'production') {
  // Enable the logger.
  debug.enable('*');
  log('Logging is enabled!');
  // Enable LiveReload
  document.write(
    '<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>'
  );
} else {
  debug.disable();
}

const res1 = a('kongzhi222');
const res2 = addArray([1, 2, 3, 4]);
console.log(11222211)
// Print the results on the page.
const printTarget = document.getElementsByClassName('debug__output')[0];

printTarget.innerText = `sayHelloTo('Jason') => ${res1}\n\n`;
printTarget.innerText += `addArray([1, 2, 3, 4]) => ${res2}`;