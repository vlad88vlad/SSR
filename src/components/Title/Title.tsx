import React from 'react';
import './Title.css';

const Title = ({ children = null }) => (
    <h1 className="Title">
        {children}
    </h1>
);

export default Title;
