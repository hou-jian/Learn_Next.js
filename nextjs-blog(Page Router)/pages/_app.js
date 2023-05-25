// 下面这个垫片 next13 没有内置
// 如果在这里引入，会增加代码体积，对于不需要的最新浏览器是一种浪费
// 解决方法是使用 https://polyfill.io，直接用它的服务，或者安装 polyfill-library 自己部署。
// 使用方式见 /pages/_document.js

// import 'core-js/features/array/at'

import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}