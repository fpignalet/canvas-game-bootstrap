'use strict';
class Renderer {

    /// @brief
    constructor(wdht, id) {
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

        window.render = this;
    }

    setup(bkgnd) {
        const image = rsrc.get(bkgnd);
        this.terrainPattern = this.ctx.createPattern(image, 'repeat');

    }

    /// @brief
    update() {
        this.ctx.fillStyle = this.terrainPattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!engine.isGameOver) {
            this.entity(engine.player);
        }
        this.entities(engine.bullets);
        this.entities(engine.enemies);
        this.entities(engine.explosions);

    }

    /// @brief
    /// @param list
    entities(list) {
        for (let i = 0; i < list.length; i++) {
            this.entity(list[i]);
        }
    }

    /// @brief
    /// @param entity
    entity(entity) {
        this.ctx.save();

        this.ctx.translate(entity.pos[0], entity.pos[1]);
        entity.sprite.render(this.ctx);

        this.ctx.restore();
    }

}