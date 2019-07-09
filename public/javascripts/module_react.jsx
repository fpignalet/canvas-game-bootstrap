/*************************************************************************************
 * INCLUDES
 *************************************************************************************/
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

import TestApp from './impl/core/reactgame.jsx';

/*************************************************************************************
 * IMPLEMENTATION
 *************************************************************************************/
const elemId = "reactzone0";

ReactDOM.render(
    <TestApp />,
    document.getElementById(elemId)
);
