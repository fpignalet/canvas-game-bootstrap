(function () {
    function Renderer() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = wdht[0];
        this.canvas.height = wdht[1];
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.terrainPattern = null;

    }

    Renderer.prototype = {

        update: function () {
            this.ctx.fillStyle = this.terrainPattern;
            this.ctx.fillRect(0, 0, renderer.canvas.width, renderer.canvas.height);

            if (!core.isGameOver) {
                this.entity(core.player);
            };

            this.entities(core.bullets);
            this.entities(core.enemies);
            this.entities(core.explosions);

        },

        entities: function (list) {
            for (var i = 0; i < list.length; i++) {
                this.entity(list[i]);
            }
        },

        entity: function(entity) {
            this.ctx.save();

            this.ctx.translate(entity.pos[0], entity.pos[1]);
            entity.sprite.render(this.ctx);

            this.ctx.restore();
        }

    }

    // --------------------------------------------------------------
    window.Renderer = Renderer;

})();