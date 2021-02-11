import React from 'react';
import {
    Link, Route, Switch,
} from 'react-router-dom';
import Title from 'components/Title';
import './index.css';
import routes from 'router';

const App = () => (
    <div>
        <Title>SSR</Title>
        <Link to="/about">about</Link>
        <Link to="/info">info</Link>
        <Link to="/">home</Link>
        <Switch>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    component={route.component}
                />
            ))}

        </Switch>
    </div>
);

export default App;
