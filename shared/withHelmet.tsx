import React from 'react';
import { Helmet } from 'react-helmet';

const withHelmet = (Component, staticTitle = '') => (props) => (
    <>
        <Helmet title={staticTitle} />
        <Component
            {...props}
            headTitle={
                (title) => (
                    <Helmet title={title} />
                )
            }
        />
    </>
);

export default withHelmet;
