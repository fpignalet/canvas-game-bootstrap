'use strict';
class Core extends Engine{

    /// @brief
    constructor(settings, contid) {
        super(settings, contid);
    }

    // -------------------------------------------------------------------------------------------------------------
    /// @brief add player sprite
    addPlayer() {
        const sprite = Factory.getplayersprite();

        this.player = {
            pos: [
                50,
                render.canvas.height / 2
            ],
            sprite: sprite
        };
    }

    /// @brief remove player sprite
    endPlayer() {
        // Add an explosion
        this.endShot(this.player.pos);
    }

    /// @brief add enemy sprite
    addEnemy() {
        // It gets harder over time by adding enemies using this equation:
        // 1-.993^enemyTime
        if (Math.random() < 1 - Math.pow(.993, this.enemyTime)) {
            const sprite = Factory.getenemysprite();

            this.enemies.push({
                pos: [
                    render.canvas.width,
                    Math.random() * (render.canvas.height - 39)
                ],
                sprite: sprite
            });
        }

    }

    /// @brief remove enemy sprite
    /// @param i is the index of the enemy
    /// @param j is the index of the bullet which has downed the enemy or -1 when collides with player
    /// @param pos is the
    endEnemy(i, j, pos) {

        // Remove the enemy
        this.enemies.splice(i, 1);

        if(-1 !== j) {
            // Remove the bullet
            this.bullets.splice(j, 1);

            // Add an explosion
            this.endShot(pos);

        }
        else {
            // Remove the player
            this.endPlayer();

        }
    }

    /// @brief
    addShot() {
        const sprites = Factory.getbulletssprites();

        const x = this.player.pos[0] + this.player.sprite.size[0] / 2;
        const y = this.player.pos[1] + this.player.sprite.size[1] / 2;

        this.bullets.push({
            pos: [ x, y ],
            dir: 'forward',
            sprite: sprites[0]
        });
        this.bullets.push({
            pos: [ x, y ],
            dir: 'up',
            sprite: sprites[1]
        });
        this.bullets.push({
            pos: [ x, y ],
            dir: 'down',
            sprite: sprites[2]
        });
    }

    /// @brief
    /// @param pos
    endShot(pos) {
        const sprite = Factory.getexplosionsprite();

        this.explosions.push({
            pos: pos,
            sprite: sprite
        });
    }

}
