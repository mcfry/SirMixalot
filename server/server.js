import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
  app.use(logger('dev'));
}

// React And Redux Setup
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from '../shared/routes';
import { fetchComponentData } from './util/fetchData';
import drinks from './routes/drink.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  // NOTE: Is doing check inside of func, if none exist then it creates
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../static')));
app.use('/api', drinks);

// NOTE: Initial (redux) state exposed in window object, html (redux-provider and router-root) in root object
// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css';
  const cssModulePath = process.env.NODE_ENV === 'production' ? '/dist/app.css' : '';
  //NOTE: extra div after root: http://stackoverflow.com/questions/33521047/warning-react-attempted-to-reuse-markup-in-a-container-but-the-checksum-was-inv?answertab=votes#tab-top
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Get Mixin Hoe</title>
        <link rel="stylesheet" href=${cssPath} />
        <link rel="stylesheet" href=${cssModulePath} />
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.min.css" />
      </head>
      <body>
        <div id="root"><div>${html}</div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/bundle.js"></script>
        <script src="/bower_components/jquery/dist/jquery.min.js" type='text/javascript'></script>
        <script src="/bower_components/bootstrap/dist/js/bootstrap.min.js" type='text/javascript'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Note: Called on every request (express - use next() instead of end to add another, this ends the middleware calls)
// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const initialState = { drinks: [], drink: {} };

    const store = configureStore(initialState);

    // Processes the 'need' functions that are attached to components
    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        // Provider is from Redux, connects store to all components via context
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res.status(200).end(renderFullPage(initialView, finalState));
      });
  });
});

// Start app!
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
