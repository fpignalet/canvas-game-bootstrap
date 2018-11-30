(function () {
    function GameCore(img) {
        this.image = img;

        // -----------------------------------------------------------------------------------------------------------------
        this.player = {};
        this.bullets = [];
        this.enemies = [];
        this.explosions = [];

        // -----------------------------------------------------------------------------------------------------------------
        this.gameTime = 0;
        this.score = 0;
        this.isGameOver = false;
        this.lastFire = Date.now();

        // -----------------------------------------------------------------------------------------------------------------
        // Speed in pixels per second
        this.speedPlayer = 16;
        this.speedEnemy = 6;
        this.speedExplosion = 16;

        this.incrPlayer = 200;
        this.incrBullet = 500;
        this.incrEnemy = 150;
        this.incrScore = 100;

        this.threshFire = 100;

    }

    GameCore.prototype = {

        // -------------------------------------------------------------------------------------------------------------
        // Reset game to original state
        reset: function () {
            this.enemies = [];
            this.bullets = [];
            this.explosions = [];

            this.gameTime = 0;
            this.score = 0;
            this.isGameOver = false;
            this.lastFire = Date.now();

            this.addPlayer();
        },

        execute: function (dt) {
            this.gameTime += dt;

            this.handleInput(dt);
            this.updateEntities(dt);

            this.addEnemy();

            this.checkPlayerBounds();
            this.checkCollisions();
        },

        // -------------------------------------------------------------------------------------------------------------
        handleInput: function(dt) {
            if (input.isDown('DOWN') || input.isDown('s')) {
                this.player.pos[1] += this.incrPlayer * dt;
            }

            if (input.isDown('UP') || input.isDown('w')) {
                this.player.pos[1] -= this.incrPlayer * dt;
            }

            if (input.isDown('LEFT') || input.isDown('a')) {
                this.player.pos[0] -= this.incrPlayer * dt;
            }

            if (input.isDown('RIGHT') || input.isDown('d')) {
                this.player.pos[0] += this.incrPlayer * dt;
            }

            if (input.isDown('SPACE') && !this.isGameOver && ((Date.now() - this.lastFire) > this.threshFire)) {
                this.addShot();
            }
        },

        updateEntities: function (dt) {

            //--------------------------------------------------------
            // Update the player sprite animation
            this.player.sprite.update(dt);

            //--------------------------------------------------------
            // Update all the bullets
            for (var i = 0; i < this.bullets.length; i++) {
                var bullet = this.bullets[i];

                switch (bullet.dir) {
                    case 'up':
                        bullet.pos[1] -= this.incrBullet * dt;
                        break;
                    case 'down':
                        bullet.pos[1] += this.incrBullet * dt;
                        break;
                    default:
                        bullet.pos[0] += this.incrBullet * dt;
                }

                bullet.sprite.update(dt);

                // Remove the bullet if it goes offscreen
                if ((bullet.pos[1] < 0) ||
                    (bullet.pos[1] > renderer.canvas.height) ||
                    (bullet.pos[0] > renderer.canvas.width)) {
                    this.bullets.splice(i, 1);
                    i--;
                }
            }

            //--------------------------------------------------------
            // Update all the enemies
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].pos[0] -= this.incrEnemy * dt;

                this.enemies[i].sprite.update(dt);

                // Remove if offscreen
                if (this.enemies[i].pos[0] + this.enemies[i].sprite.size[0] < 0) {
                    this.enemies.splice(i, 1);
                    i--;
                }
            }

            //--------------------------------------------------------
            // Update all the explosions
            for (var i = 0; i < this.explosions.length; i++) {
                this.explosions[i].sprite.update(dt);

                // Remove if animation is done
                if (this.explosions[i].sprite.done) {
                    this.explosions.splice(i, 1);
                    i--;
                }
            }
        },

        // -------------------------------------------------------------------------------------------------------------
        checkPlayerBounds: function () {
            // Check bounds
            if (this.player.pos[0] < 0) {
                this.player.pos[0] = 0;
            }
            else if (this.player.pos[0] > renderer.canvas.width - this.player.sprite.size[0]) {
                this.player.pos[0] = renderer.canvas.width - this.player.sprite.size[0];
            }

            if (this.player.pos[1] < 0) {
                this.player.pos[1] = 0;
            }
            else if (this.player.pos[1] > renderer.canvas.height - this.player.sprite.size[1]) {
                this.player.pos[1] = renderer.canvas.height - this.player.sprite.size[1];
            }
        },

        checkCollisions: function () {
            // Run collision detection for each ennemy
            for (var i = 0; i < this.enemies.length; i++) {

                var pos = this.enemies[i].pos;
                var size = this.enemies[i].sprite.size;

                var pos2 = 0;
                var size2 = 0;

                //Do ennemy meets a bullet?
                for (var j = 0; j < this.bullets.length; j++) {
                    pos2 = this.bullets[j].pos;
                    size2 = this.bullets[j].sprite.size;
                    if (this.boxCollides(pos, size, pos2, size2)) {
                        i = this.downEnemy(i, j, pos);
                        // stop this iteration, this enemy is out. Now check the next one
                        break;
                    }
                }

                //Do ennemy meets player?
                pos2 = this.player.pos;
                size2 = this.player.sprite.size;
                if (this.boxCollides(pos, size, pos2, size2)) {
                    this.downPlayer();
                }
            }
        },

        // Collisions
        boxCollides: function (pos, size, pos2, size2) {
            return ((
                x, y, r, b,
                x2, y2, r2, b2
            ) => {
                return !(
                    r <= x2 || x > r2 ||
                    b <= y2 || y > b2
                );
            })(
                //left:x,   top:y,      right:r,            bottom:b
                pos[0],     pos[1],     pos[0] + size[0],   pos[1] + size[1],
                //left2:x2, top2:y2,    right2:r2,          bottom2:b2
                pos2[0],    pos2[1],    pos2[0] + size2[0], pos2[1] + size2[1]
            );
        },

        // -------------------------------------------------------------------------------------------------------------
        addPlayer: function () {
            this.player = {
                pos: [
                    50,
                    renderer.canvas.height / 2
                ],
                sprite: this.getplayersprite()
            };
        },

        // Game over
        downPlayer: function () {
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('game-over-overlay').style.display = 'block';

            this.isGameOver = true;
        },

        addEnemy: function () {
            // It gets harder over time by adding enemies using this equation:
            // 1-.993^gameTime
            if (Math.random() < 1 - Math.pow(.993, this.gameTime)) {
                this.enemies.push({
                    pos: [
                        renderer.canvas.width,
                        Math.random() * (renderer.canvas.height - 39)
                    ],
                    sprite: this.getenemysprite()
                });
            }

        },

        downEnemy: function (i, j, pos) {
            // Remove the enemy
            this.enemies.splice(i, 1);
            i--;

            // Remove the bullet
            this.bullets.splice(j, 1);

            // Add an explosion
            this.addExplosion(pos);

            // Add score
            this.score += this.incrScore;

            return i;
        },

        addShot: function() {
            var x = this.player.pos[0] + this.player.sprite.size[0] / 2;
            var y = this.player.pos[1] + this.player.sprite.size[1] / 2;

            var xsprites = this.getbulletssprites();
            this.bullets.push({
                pos: [ x, y ],
                dir: 'forward',
                sprite: xsprites[0]
            });
            this.bullets.push({
                pos: [ x, y ],
                dir: 'up',
                sprite: xsprites[1]
            });
            this.bullets.push({
                pos: [ x, y ],
                dir: 'down',
                sprite: xsprites[2]
            });

            this.lastFire = Date.now();
        },

        addExplosion: function(pos) {
            this.explosions.push({
                pos: pos,
                sprite: this.getexplosionsprite()
            });
        },

        // -------------------------------------------------------------------------------------------------------------
        getplayersprite: function () {
            // url,
            // pos, size,
            // speed,
            // frames,
            // ...dir, once
            return new Sprite(
                this.image,
                [0, 0], [39, 39],
//                [0, 0], [74, 47],
                this.speedPlayer,
                [0, 1])
//                [0, 1, 2, 3])
        },

        getbulletssprites: function () {
            // url,
            // pos, size,
            // speed,
            // frames,
            // ...dir, once
            return [
                new Sprite(
                    this.image,
                    [0, 39], [18, 8]
                ),
                new Sprite(
                    this.image,
                    [0, 50], [9, 5]
                ),
                new Sprite(
                    this.image,
                    [0, 60], [9, 5]
                )
            ]
        },

        getenemysprite: function () {
            // url,
            // pos, size,
            // speed,
            // frames,
            // ...dir, once
            return new Sprite(
                this.image,
                [0, 78], [80, 39],
                this.speedEnemy,
                [0, 1, 2, 3, 2, 1])
        },

        getexplosionsprite: function () {
            // url,
            // pos, size,
            // speed,
            // frames,
            // ...dir, once
            return new Sprite(
                this.image,
                [0, 117], [39, 39],
                this.speedExplosion,
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                null,
                true)
        },

    };

    // --------------------------------------------------------------
    window.GameCore = GameCore;

})();