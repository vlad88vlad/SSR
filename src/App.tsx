import React from 'react';
import {
    Link, Route, Switch,
} from 'react-router-dom';
import routes from './router';
import './index.css';

const App = () => (
    <div>
        <nav>
            <Link to="/about">about</Link>
            <Link to="/todo">todo</Link>
            <Link to="/info">info</Link>
            <Link to="/">home</Link>
        </nav>
        <Switch>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                />
            ))}

        </Switch>
    </div>
);

export default App;
