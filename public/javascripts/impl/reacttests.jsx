'use strict';

/*************************************************************************************
 * REQUIRES
 *************************************************************************************/
const React = require('react');
const ReactDOM = require('react-dom');

const ReactBStrap = require('react-bootstrap');
const Redux = require('redux');
const ProgressBar = require('react-bootstrap/ProgressBar');

const jsondata1 = require('../../rsrc/datatest.json');
const jsondata2 = require('../../rsrc/datafpicv.json');

/*************************************************************************************
 * IMPORTS
 *************************************************************************************/
import ReactBaseJSX from '../lib/reactbase.jsx';

import {
    ReactButtonJSX,
    ReactDynListJSX,
    ReactDisclosable,
    ReactTabcontainer
} from '../lib/components/reactcomponents.jsx';

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

        this.idtab = props.idtab;
        this.modelname = "default";

        this.store = Redux.createStore(
            (state = 0, action) => {
                switch (action.type) {
                    case 'RENDERING':
                        return state + 1;
                    case 'DONE':
                        return state - 1;
                    default:
                        return state
                }
            }
        );

        this.store.subscribe(() => console.log(this.store.getState()));

        this.state = {
            now: 0
        };

    }

    componentWillMount() {
        this.modelname = "NONE";
        // this.modelname = window.reactgetmodelname();
    }

    componentDidMount() {
        /*
        client({method: 'GET', path: '/api/employees'}).done(response => {
            this.setState({employees: response.entity._embedded.employees});
        });
        */

        this.getCurrentTime()
            .then(currentTime => {
                console.log('The current time is: ' + currentTime);
                return true;
            })
            .catch(err => console.log('There was an error:' + err));

        this.updater = setInterval(() => { this.state = { now: this.state.now + 1 } }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.updater);
    }

    /**
     * @param onSuccess
     * @param onFail
     * @returns {Promise<any>}
     */
    getCurrentTime(onSuccess, onFail) {
        // Get the current 'global' time from an API using Promise
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                try {
                    const currentTime = new Date();
                    resolve(currentTime);
                }
                catch (e) {
                    reject("Promise error");
                }
            }, 2000);
        })
    };

    loadFromFileData1() {
        return jsondata1["collapsable-text"].map(
            (item, index) => {
                return this.renderOneDiscosable(item, index, [
                    "over",
                    "text",
                    "subcontent"
                ]);
            }
        );

    }

    loadFromFileData2() {
        return jsondata2["DBConteners"].map(
            (item, index) => {
                return this.renderOneDiscosable(item, index, [
                    "contenertype",
                    "contenerphoto",
                    "contenerdate",
                    "contenername",
                    "contenersubname",
                    "conteneritems"
                ]);
            }
        );

    }

    /**
     * @param pageSize
     */
    loadFromServer(pageSize) {
        /*
        follow(client, root, [
            {rel: 'employees', params: {size: pageSize}}]
        ).then(employeeCollection => {
            return client({
                method: 'GET',
                path: employeeCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return employeeCollection;
            });
        }).done(employeeCollection => {
            this.setState({
                employees: employeeCollection.entity._embedded.employees,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: employeeCollection.entity._links});
        });
        */
    }

    /// display 'application', contents
    render() {
        return (
            <ReactBStrap.Container>

                <ReactBStrap.Row>
                    { this.renderOneCol([0,1]) }
                    { this.renderOneCol([2,3]) }
                </ReactBStrap.Row>

                <ReactBStrap.Row>
                        { this.renderOneCol([4,5]) }
                        { this.renderOneCol([6,7]) }
                        { this.renderOneCol([8,9]) }
                </ReactBStrap.Row>

            </ReactBStrap.Container>
        );
    }

    renderCanvas() {
        return (
            <ReactCanvasJSX/>
        );
    }

    /**
     * @param ids
     * @returns {*}
     */
    renderOneCol(ids) {
        return (
            <ReactBStrap.Col>

                { this.renderTitle()}

                { this.renderButton(ids[0], this.idtab)}
                { this.renderButton(ids[1], this.idtab)}

                { this.renderDiscosables()}

                { this.renderTabContainer()}

                { this.renderDynList()}

                { this.renderProgressBar()}

            </ReactBStrap.Col>
        );
    }

    /**
     *
     * @returns {*}
     */
    renderTitle() {
        return (
            <div>
                FROM MODEL:
                { this.modelname }
            </div>
        );
    }

    /**
     *
     * @param idbt
     * @param idtab
     * @returns {*}
     */
    renderButton(idbt, idtab) {
        return (
            <ReactButtonJSX
                data={document}
                id={idbt}
                testtext={ jsondata1["testtext"] }
                testdata={ jsondata1["testdata"] }
                tableid={ idtab }
            />
        );
    }

    /**
     *
     * @returns {*}
     */
    renderDiscosables() {
        // 1st parse the map to generate table items
        const namesList1 = this.loadFromFileData1();
        const namesList2 = this.loadFromFileData2();

        //2nd: ...
        return (
            <ReactBStrap.Container>

                <ReactBStrap.Row>
                    <ReactBStrap.Col>
                        {namesList1}
                    </ReactBStrap.Col>
                    <ReactBStrap.Col>
                        {namesList2}
                    </ReactBStrap.Col>
                </ReactBStrap.Row>

            </ReactBStrap.Container>
        );
    }

    /**
     *
     * @returns {*}
     */
    renderOneDiscosable(item, index, entries) {
        return (
            <ReactDisclosable
                contener={document}
                data={item}
                entries = {entries}
                index={1}
            />
        );
    }

    /**
     *
     * @returns {*}
     */
    renderTabContainer() {
        return (
            <ReactTabcontainer
                data={document}
                text1={jsondata1["link-text1"]}
                text2={jsondata1["link-text2"]}
            />
        );
    }

    /**
     *
     * @returns {*}
     */
    renderDynList() {
        return (
            <ReactDynListJSX data={document} />
        );
    }

    /**
     *
     * @returns {*}
     */
    renderProgressBar() {
        return (
            <ProgressBar id="progressbar" animated now={this.state.now} />
        );
    }

}

export default TestApp;
