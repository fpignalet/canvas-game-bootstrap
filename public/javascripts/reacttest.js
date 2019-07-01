/*************************************************************************************
 * INCLUDES
 *************************************************************************************/
'use strict';

// const React = require('react');
// const ReactDOM = require('react-dom');
// const TestApp = require('./reactitems.js');

/*************************************************************************************
 * IMPLEMENTATION
 *************************************************************************************/
function reactexecute(id, content) {
    ReactDOM.render(
        <TestApp idtab={"reacttablejsx"} />,
        document.getElementById("reactzone0")
    );
}
