var express = require('express');
var path = require('path');
var app = express();
var proxy = require('http-proxy-middleware');
var serveIndex = require('serve-index')

//此处设置静态文件的路径
const basePath = path.resolve('./src')
app.use(express.static(basePath));


// proxy
//具体配置查看 https://github.com/chimurai/http-proxy-middleware
app.use('/api', proxy({target: 'http://2qzmvz.natappfree.cc', changeOrigin: true}));

//需要配置在 proxy配置后面
app.use('/', serveIndex(basePath, {'icons': true}))

app.listen(3000, function () {
  // console.log('app listening on port 3000!')
});