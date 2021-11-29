const express = require('express');
const app = express();
const settings = require('./.env');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
 
const RouterContext = require('./Core/RouterContext');

RouterContext.injectRouters(app);

app.listen(settings.port, settings.host, () => {
  console.log(`Beautiful Concept Server listening for requests: at post ${settings.port}.`);
});