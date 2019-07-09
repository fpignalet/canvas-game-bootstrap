'use strict';
import {app_guimap, app_images, app_settings} from "./setnode.js";
import Multiple from "./lib/instances.js";
import execute from "./lib/game/execute.js";
import Core from "./impl/core/core.js";
// } from "./setemb.js";

const canId = app_guimap["elemcanvasid"]+0;
new Core(app_settings, app_guimap, canId);
execute(app_images, Multiple.get(Core.IDENT(), -1));
