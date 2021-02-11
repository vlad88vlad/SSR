import React from 'react';
import path from "path";
import {ChunkExtractor} from '@loadable/server';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from '../src/App'

const renderApp = (req, res) => {
    const location = req.url;
    const context = {};
    const statsFile = path.resolve('./build/loadable-stats.json');
    const chunkExtractor = new ChunkExtractor({statsFile});
    const jsx = chunkExtractor.collectChunks(
        <StaticRouter context={context} location={location}>
            <App />
        </StaticRouter>
    );

    const reactHtml = renderToString(jsx);
    const scriptTags = chunkExtractor.getScriptTags();
    const linkTags = chunkExtractor.getLinkTags();
    const styleTags = chunkExtractor.getStyleTags();
    console.log(reactHtml);
    res.send(`
     <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
           
            ${linkTags}
            ${styleTags}
        </head>
        <body>
            <div id="root">${reactHtml}</div>
           
            ${scriptTags}
        </body>
        </html>
    `)
}

export default renderApp
