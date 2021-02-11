import express from 'express';
import 'babel-polyfill';
import renderApp from './renderApp'

const app = express();
app.use(express.static('./build'));

app.get('/*', renderApp);

export {app}
