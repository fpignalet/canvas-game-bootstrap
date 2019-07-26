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

import {app_guimap, app_images, app_settings} from "../../setnode.js";

import Multiple from "../instances.js";
import execute from "../game/execute.js";
import Core from "../../impl/core/core.js";

/*************************************************************************************
 * IMPLEMENTATION
 *************************************************************************************/

export class ReactGameJSX extends ReactBaseJSX {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,

            settings: app_settings,
            guimap: app_guimap,

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

    getId (name) {
        return this.state.guimap[name] + this.state.index;
    }

    componentDidMount() {
        new Core(this.state.settings, this.state.guimap, this.getId("elemcanvasid"));
        execute(app_images, Multiple.get(Core.IDENT(), -1));
    }

    render() {
        return (
            <div>

                { this.renderOverlay(this.getId("elemgameoverlayid")) }
                { this.renderStatus(this.getId("elemgameoverid")) }

                <div
                    id={ this.getId("elemwrapperid") }
                    className={"rawstart"}

                    style={{backgroundColor: "#FFFFFF"}}>

                    { this.renderInstructions(this.getId("elemsinstrid")) }
                    { this.renderScore(this.getId("elemscoreid")) }
                    <br/><br/><br/><br/><br/><br/>
                    { this.renderProgress(this.getId("elemlifebarid")) }
                    <br/><br/>
                    { this.renderCanvas(this.getId("elemcanvasid")) }

                </div>

            </div>
        );

    }

    renderOverlay(id) {
        return(
            <div id={ id } className={"game-over-overlay"}> </div>
        );
    }

    renderStatus(id) {
        return(
            <div id={ id } className={"game-over"}>

                <h1>
                    { this.state.over }
                </h1>
                <button id={"play-again0"}>
                    { this.state.again }
                </button>

            </div>

        );
    }

    renderInstructions(id) {
        return(
            <div id={ id } className={"instructions"} style={{backgroundColor: "#FFFFFF"}}>

                <ul style={{backgroundColor: "#FFFFFF"}}>
                    <li>{ this.state.instr1 }
                        <span className={"key"}>
                            { this.state.instr2 }
                        </span>
                        { this.state.instr3 }
                        <span className={"key"}>
                            { this.state.instr4 }
                        </span>
                    </li>
                    <li>{ this.state.instr5 }
                        <span className={"key"}>
                            { this.state.instr6 }
                        </span>
                    </li>
                    <li>{ this.state.instr7 }</li>
                    <li>{ this.state.instr8 }</li>
                </ul>

            </div>

        );
    }

    renderScore(id) {
        return(
            <div id={ id } className={"score"}></div>
        );
    }

    renderProgress(id) {
        return(
            <div className={"myProgress"}>
                <div id={ id } className={"myBar"}></div>
            </div>
        );
    }

    renderCanvas(id) {
        return(
            <canvas id={ id } style={{backgroundColor: "#FFFFFF"}}/>
        );
    }

}
