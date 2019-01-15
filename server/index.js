require('../require-base');

const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const serve = require('koa-static');

const clientApp = require('../public/server.js');
const template = require('./template');

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(serve(path.join(__dirname, '../public')));

app.use(serve('./public'));

app.use(async (ctx) => {
  if (ctx.status !== 404) return ctx;
  if (ctx.url === '/favicon.ico') return ctx;

  const { markup } = await clientApp.default(ctx.url);

  ctx.status = 200;
  ctx.body = template({ markup });
  return ctx;
});

process.send = process.send || (() => {});

const start = () => {
  try {
    const port = process.env.PORT || 3000;
    const server = app.listen(port);

    console.log(`listening on port ${port}`);
    process.send('ready');

    return server;
  } catch (e) {
    console.log(`Error: ${e}`);
    process.send(`fail: ${e}`);
  }
};

start();
