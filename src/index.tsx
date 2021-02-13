import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createBrowserContext } from '../shared/useServerFetch/context';

const BrowserDataContext = createBrowserContext();

render(
    <BrowserDataContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </BrowserDataContext>,
    document.getElementById('root'),
);
