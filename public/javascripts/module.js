'use strict';
import {
    app_settings,
    app_guimap,
    app_images
// } from "./appset.js";
} from "./nodeset.js";
// } from "./embset.js";

import Multiple from "./lib/instances.js";
import execute from "./lib/execute.js";
import Core from "./impl/core.js";

new Core(app_settings, app_guimap, app_guimap["elemcanvas"]+0);
execute(app_images, Multiple.get(Core.IDENT(), -1));
