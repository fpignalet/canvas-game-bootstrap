'use strict';

/*************************************************************************************
 * REQUIRES
 *************************************************************************************/
const React = require('react');
const ReactDOM = require('react-dom');

/*************************************************************************************
 * IMPORTS
 *************************************************************************************/
import ReactBaseJSX from '../reactbase.jsx';

import {
    app_settings,
    app_guimap,
    app_images
} from "../../setnode.js";

import Multiple from "../instances.js";
import execute from "../execute.js";
import Core from "../../impl/core.js";

/*************************************************************************************
 * IMPLEMENTATION
 *************************************************************************************/

export class ReactCanvasJSX extends ReactBaseJSX {

    constructor(props) {
        super(props);

        this.state = {
            over: "GAME OVER",
            again: "Play Again",
            instr1: "move with ",
            instr2: "arrows",
            instr3: " or ",
            instr4: "W-A-S-D",
            instr5: "shoot with ",
            instr6: "SPACE",
            instr7: "loose 20 life pts (progress bar) each time an ennemy reach left side",
            instr8: "win 1 life pt (progress bar) each time an ennemy is killed"
        };
    }

    componentDidMount() {
        const canId = app_guimap["elemcanvas"]+0;
        new Core(app_settings, app_guimap, canId);
        execute(app_images, Multiple.get(Core.IDENT(), -1));
    }

    render() {
        return (
            <div>

                <div id={"game-over-overlay0"} className={"game-over-overlay"}>
                </div>
                <div id={"game-over0"} className={"game-over"}>
                    <h1>{ this.state.over }</h1>
                    <button id={"play-again0"}>{ this.state.again }</button>
                </div>
                <div id={"wrapper0"} className={"rawstart"} style={{backgroundColor: "#FFFFFF"}}>

                    <div id={"instructions0"} className={"instructions"} style={{backgroundColor: "#FFFFFF"}}>
                        <ul>
                            <li>{ this.state.instr1 }
                                <span className={"key"}>{ this.state.instr2 }</span>
                                { this.state.instr3 }
                                <span className={"key"}>{ this.state.instr4 }</span>
                            </li>
                            <li>{ this.state.instr5 }
                                <span className={"key"}>{ this.state.instr6 }</span>
                            </li>
                            <li>{ this.state.instr7 }</li>
                            <li>{ this.state.instr8 }</li>
                        </ul>
                    </div>

                    <div id={"score0"} className={"score"}></div>
                    <br/><br/><br/><br/><br/><br/>
                    <div className={"myProgress"}>
                        <div id={"lifebar0"} className={"myBar"}></div>
                    </div>
                    <br/><br/>

                    <canvas id={"canvas0"} style={{backgroundColor: "#FFFFFF"}}/>

                </div>

            </div>
        );

    }

}
