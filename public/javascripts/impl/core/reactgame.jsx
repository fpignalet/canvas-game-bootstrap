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
import ReactBaseJSX from '../../lib/reactbase.jsx';

import {ReactGameJSX,} from '../../lib/react/components_game.jsx';

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

                { this.renderGame() }

            </ReactBStrap.Container>
        );
    }

    renderGame() {
        return (
            <ReactGameJSX/>
        );
    }

}

export default TestApp;
