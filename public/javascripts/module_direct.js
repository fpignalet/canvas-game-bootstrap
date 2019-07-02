'use strict';
import {
    app_settings,
    app_guimap,
    app_images
} from "./setnode.js";
// } from "./setemb.js";

import Multiple from "./lib/instances.js";
import execute from "./lib/execute.js";
import Core from "./impl/core.js";

const canId = app_guimap["elemcanvas"]+0;
new Core(app_settings, app_guimap, canId);
execute(app_images, Multiple.get(Core.IDENT(), -1));
