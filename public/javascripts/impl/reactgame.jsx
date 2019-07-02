'use strict';

/*************************************************************************************
 * REQUIRES
 *************************************************************************************/
const React = require('react');
const ReactDOM = require('react-dom');

const ReactBStrap = require('react-bootstrap');

/*************************************************************************************
 * IMPORTS
 *************************************************************************************/
import ReactBaseJSX from '../lib/reactbase.jsx';

import {
    ReactCanvasJSX,
} from '../lib/components/reactgamecanvas.jsx';

/*************************************************************************************
 * IMPLEMENTATION
 *************************************************************************************/

/// desc
class TestApp extends ReactBaseJSX {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

    }

    /// display 'application', contents
    render() {
        return (
            <ReactBStrap.Container>

                { this.renderCanvas() }

            </ReactBStrap.Container>
        );
    }

    renderCanvas() {
        return (
            <ReactCanvasJSX/>
        );
    }

}

export default TestApp;
