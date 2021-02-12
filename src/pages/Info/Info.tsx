import React from 'react';
import {
    Link, Route, Switch,
} from 'react-router-dom';
import routes from './router';

const Info = () => (
    <div>
        <Link to="/info/detail">detail</Link>
        <Link to="/info/main">main</Link>
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

export default Info;
