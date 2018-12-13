'use strict';
import Multiple from "./instances.js";
import Resources from "./resources.js";
import AEngine from "./engine.js";

class Renderer extends Multiple {

    /****************************************
     * CONSTANTS
     ****************************************/
    static IDENT() { return "render" };

    /****************************************
     * PUBLIC IMPLEMENTATION
     ****************************************/

    /// @brief
    /// @param wdht
    /// @param id
    constructor(wdht, id) {
        super(Renderer.IDENT());

        if(null != id) {
            this.canvas = document.getElementById(id);
        }
        else {
            this.canvas = document.createElement("canvas");
            document.body.appendChild(this.canvas);
        }

        this.canvas.width = wdht[0];
        this.canvas.height = wdht[1];

        this.ctx = this.canvas.getContext("2d");
        this.terrainPattern = null;
    }

    /// @brief
    /// @param bkgnd is the background image to be used
    setup(bkgnd) {
        const rsrc = Multiple.get(Resources.IDENT(), this.index);
        const image = rsrc.get(bkgnd);
        this.terrainPattern = this.ctx.createPattern(image, 'repeat');

    }

    /// @brief redraws everything
    update() {
        this.ctx.fillStyle = this.terrainPattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const engine = Multiple.get(AEngine.IDENT(), this.index);
        if (!engine.isGameOver) {
            this.drawone(engine.player);
        }
        this.drawall(engine.bullets);
        this.drawall(engine.enemies);
        this.drawall(engine.explosions);

    }

    /****************************************
     * INTERNAL IMPLEMENTATION
     ****************************************/

    /// @brief draws entities
    /// @param list
    drawall(list) {
        list.forEach((item, index) => {
            this.drawone(item);
        });
    }

    /// @brief draws one entity
    /// @param entity
    drawone(entity) {
        try {
            this.ctx.save();

            //-------------------------------
            //prepare sprite frame
            this.ctx.translate(entity.pos[0], entity.pos[1]);

            let sprite = entity.sprite;
            let coord = sprite.render();
            if(null == coord) {
                this.ctx.restore();
                return;
            }

            //-------------------------------
            //display sprite
            this.ctx.drawImage(sprite.image,
                coord[0], coord[1],
                sprite.size[0], sprite.size[1],
                0, 0,
                sprite.size[0], sprite.size[1]);

        }
        finally {
            this.ctx.restore();

        }
    }

}

export default Renderer;