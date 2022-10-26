//const withPWA = require('next-pwa');
const withPWA = require('next-pwa')({
  dest: 'public'
})
module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
})
// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//   },
//   reactStrictMode: true,
// });