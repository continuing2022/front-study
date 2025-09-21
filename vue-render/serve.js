const Vue = require('vue');
const fs = require('fs'); 
const server = require('express')();
const VueServerRenderer = require('vue-server-renderer')

server.use((req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: '<div>The visited URL is: {{ url }}</div>'
  });
  const context = {
  title: 'Vue SSR',
  metas: `
    <meta name="keyword" content="vue,ssr">
    <meta name="description" content="vue ssr demo">
  `
};
  const template=fs.readFileSync('./index.template.html','utf-8');
  const renderer = VueServerRenderer.createRenderer({ template });
  renderer.renderToString(app, context,(err, html) => {
    console.log(html);
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    res.end(html);
    // res.end(`
    //   <!DOCTYPE html>
    //   <html lang="en">
    //     <head><title>Hello</title></head>
    //     <body>${html}</body>
    //   </html>
    // `);
  });
});


server.listen(8080, () => {
  console.log('服务器运行在8080端口...');
});