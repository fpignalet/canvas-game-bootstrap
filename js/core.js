class Core {

    /// @brief
    /// @param img
    constructor() {
        // -----------------------------------------
        // Speed in pixels per second
        this.speedPlayer = 16;
        this.speedEnemy = 6;
        this.speedExplosion = 6;

        this.incrPlayer = 200;
        this.incrBullet = 500;
        this.incrEnemy = 150;
        this.incrScore = 100;

        this.threshFire = 100;

        this.image = null;

        // -----------------------------------------
        this.init();

        window.core = this;

    }

    /// @brief Reset game to original state
    init() {
        this.player = {};
        this.bullets = [];
        this.enemies = [];
        this.explosions = [];

        const now = Date.now()
        this.lastFire = now;
        this.lastTime = now;
        this.enemyTime = 0;

        this.score = 0;
        this.isGameOver = false;
    }

    // -------------------------------------------------------------------------------------------------------------
    /// @brief start everything
    setup(sprites) {
        const local = this;
        document.getElementById('play-again').addEventListener('click', function () {
            local.reset();
        });

        // -----------------------------------------
        this.image = rsrc.get(sprites);

    }

    /// @brief Reset game to original state
    reset() {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('game-over-overlay').style.display = 'none';

        this.init();
        this.addPlayer();
    }

    /// @brief
    execute(now) {

        const dt = (now - this.lastTime) / 1000.0;

        //--------------------------------------------------------
        this.updateEntities(dt);
        const addshot = this.handleInput(dt);
        if (true == this.isGameOver) {
            return;
        }

        //--------------------------------------------------------
        if(true == addshot) {
            this.addShot();
        }

        this.enemyTime += dt;
        this.addEnemy();

        //--------------------------------------------------------
        this.checkPlayerBounds();
        this.checkCollisions();

        document.getElementById('score').innerHTML = this.score;

        this.lastTime = now;
    }

    // -------------------------------------------------------------------------------------------------------------
    /// @brief
    /// @param dt
    handleInput(dt) {
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

        if (input.isDown('SPACE')) {
            return (Date.now() - this.lastFire) > this.threshFire;
        }

        return false;
    }

    /// @brief
    /// @param dt
    updateEntities(dt) {

        //--------------------------------------------------------
        // Update the player sprite animation
        this.player.sprite.update(dt);

        //--------------------------------------------------------
        // Update all the bullets
        for (var i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];

            // Move the bullet
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

            // Remove if offscreen
            if ((bullet.pos[1] < 0) ||
                (bullet.pos[1] > render.canvas.height) ||
                (bullet.pos[0] > render.canvas.width)) {
                this.bullets.splice(i, 1);
                i--;
            }
        }

        //--------------------------------------------------------
        // Update all the enemies
        for (var i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];

            // Move the enemy
            enemy.pos[0] -= this.incrEnemy * dt;
            enemy.sprite.update(dt);

            // Remove if offscreen
            if (enemy.pos[0] + enemy.sprite.size[0] < 0) {
                this.enemies.splice(i, 1);
                i--;
            }
        }

        //--------------------------------------------------------
        // Update all the explosions
        for (var i = 0; i < this.explosions.length; i++) {
            const explosion = this.explosions[i];

            // Animate the explosion
            explosion.sprite.update(dt);

            // Remove if animation is done
            if (explosion.sprite.done) {
                this.explosions.splice(i, 1);
                i--;
            }
        }
    }

    // -------------------------------------------------------------------------------------------------------------
    /// @brief
    checkPlayerBounds() {
        // Check bounds
        if (this.player.pos[0] < 0) {
            this.player.pos[0] = 0;
        }
        else if (this.player.pos[0] > render.canvas.width - this.player.sprite.size[0]) {
            this.player.pos[0] = app_rndr.canvas.width - this.player.sprite.size[0];
        }

        if (this.player.pos[1] < 0) {
            this.player.pos[1] = 0;
        }
        else if (this.player.pos[1] > render.canvas.height - this.player.sprite.size[1]) {
            this.player.pos[1] = app_rndr.canvas.height - this.player.sprite.size[1];
        }
    }

    /// @brief
    checkCollisions() {
        // Run collision detection for each ennemy
        for (var i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];

            const pos = enemy.pos;
            const size = enemy.sprite.size;

            var pos2 = 0;
            var size2 = 0;

            //----------------------------
            //Do ennemy meets a bullet?
            for (var j = 0; j < this.bullets.length; j++) {
                const bullet = this.bullets[j];

                pos2 = bullet.pos;
                size2 = bullet.sprite.size;
                if (this.boxCollides(pos, size, pos2, size2)) {
                    i = this.downEnemy(i, j, pos);
                    // stop this iteration, this enemy is out. Now check the next one
                    break;
                }
            }

            //----------------------------
            //Do ennemy meets player?
            pos2 = this.player.pos;
            size2 = this.player.sprite.size;
            if (this.boxCollides(pos, size, pos2, size2)) {
                i = this.downEnemy(i, j, pos);
                this.downPlayer();
            }
        }
    }

    /// @brief
    /// @param pos
    /// @param size
    /// @param pos2
    /// @param size2
    boxCollides(pos, size, pos2, size2) {
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
    }

    // -------------------------------------------------------------------------------------------------------------
    /// @brief
    addPlayer() {
        this.player = {
            pos: [
                50,
                render.canvas.height / 2
            ],
            sprite: Factory.getplayersprite(this)
        };
    }

    /// @brief Game over
    downPlayer() {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over-overlay').style.display = 'block';

        // Add an explosion
        this.downShot(this.player.pos);

        this.isGameOver = true;
    }

    /// @brief
    addEnemy() {
        // It gets harder over time by adding enemies using this equation:
        // 1-.993^enemyTime
        if (Math.random() < 1 - Math.pow(.993, this.enemyTime)) {
            this.enemies.push({
                pos: [
                    render.canvas.width,
                    Math.random() * (render.canvas.height - 39)
                ],
                sprite: Factory.getenemysprite(this)
            });
        }

    }

    /// @brief
    /// @param i
    /// @param j
    /// @param pos
    downEnemy(i, j, pos) {
        // Remove the enemy
        this.enemies.splice(i, 1);
        i--;
        // Remove the bullet
        this.bullets.splice(j, 1);
        j--;

        // Add an explosion
        this.downShot(pos);
        // Add score
        this.score += this.incrScore;

        return i;
    }

    /// @brief
    addShot() {
        const xsprites = Factory.getbulletssprites(this);

        const x = this.player.pos[0] + this.player.sprite.size[0] / 2;
        const y = this.player.pos[1] + this.player.sprite.size[1] / 2;

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
    }

    /// @brief
    /// @param pos
    downShot(pos) {
        this.explosions.push({
            pos: pos,
            sprite: Factory.getexplosionsprite(this)
        });
    }

}
