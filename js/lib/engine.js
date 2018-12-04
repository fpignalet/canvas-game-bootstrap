class Engine {

    /// @brief
    constructor(settings, contid) {
        // -----------------------------------------
        // Speed in pixels per second
        this.speedPlayer = settings["speedPlayer"];
        this.speedEnemy = settings["speedEnemy"];
        this.speedExplosion = settings["speedExplosion"];

        this.incrPlayer = settings["incrPlayer"];
        this.incrBullet = settings["incrBullet"];
        this.incrEnemy = settings["incrEnemy"];
        this.incrScore = settings["incrScore"];

        this.threshFire = settings["threshFire"];

        // -----------------------------------------
        this.image = null;

        // -----------------------------------------
        new Resources();

        new Input();
        new Renderer([ settings["width"], settings["height"] ], contid);

        this.init();

        window.engine = this;

    }

    /// @brief Reset game to original state
    init() {
        this.player = {};
        this.bullets = [];
        this.enemies = [];
        this.explosions = [];

        const now = Date.now();
        this.lastFire = now;
        this.lastTime = now;
        this.enemyTime = 0;

        this.life = 100;
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

        input.setUp();

        this.init();
        this.addPlayer();

        document.getElementById("lifebar").style.backgroundColor = "#68B4FF";
        document.getElementById("lifebar").style.width = this.life + '%';

    }

    /// @brief
    execute(now) {

        const dt = (now - this.lastTime) / 1000.0;

        this.updatelife();

        //--------------------------------------------------------
        this.updateEntities(dt);
        const addshot = this.handleInput(dt);
        if (true === this.isGameOver) {
            return;
        }

        //--------------------------------------------------------
        if(true === addshot) {
            this.addShot();
            this.lastFire = now;
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
        for (let i = 0; i < this.bullets.length; i++) {
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
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];

            // Move the enemy
            enemy.pos[0] -= this.incrEnemy * dt;
            enemy.sprite.update(dt);

            // Remove if offscreen
            if (enemy.pos[0] + enemy.sprite.size[0] < 0) {
                this.enemies.splice(i, 1);
                i--;

                this.life = this.life - 20;
                if(0 >= this.life) {
                    this.terminate();
                    return;
                }

            }

        }

        //--------------------------------------------------------
        // Update all the explosions
        for (let i = 0; i < this.explosions.length; i++) {
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
    /// @brief Check bounds
    checkPlayerBounds() {
        if (this.player.pos[0] < 0) {
            this.player.pos[0] = 0;
        }
        else if (this.player.pos[0] > render.canvas.width - this.player.sprite.size[0]) {
            this.player.pos[0] = render.canvas.width - this.player.sprite.size[0];
        }

        if (this.player.pos[1] < 0) {
            this.player.pos[1] = 0;
        }
        else if (this.player.pos[1] > render.canvas.height - this.player.sprite.size[1]) {
            this.player.pos[1] = render.canvas.height - this.player.sprite.size[1];
        }
    }

    /// @brief Run collision detection for each ennemy
    checkCollisions() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];

            const pos1 = enemy.pos;
            const size1 = enemy.sprite.size;

            let pos2 = 0;
            let size2 = 0;

            //----------------------------
            //Do ennemy meets a bullet?
            for (let j = 0; j < this.bullets.length; j++) {
                const bullet = this.bullets[j];

                pos2 = bullet.pos;
                size2 = bullet.sprite.size;
                if (this.boxCollides(pos1, size1, pos2, size2)) {
                    i = this.endEnemy(i, j, pos1);
                    // stop this iteration, this enemy is out. Now check the next one
                    i--;

                    // update...
                    this.score += this.incrScore;
                    if(96 > this.life) {
                        this.life = this.life + 1;
                    }

                    break;
                }
            }

            //----------------------------
            //Do ennemy meets player?
            pos2 = this.player.pos;
            size2 = this.player.sprite.size;
            if (this.boxCollides(pos1, size1, pos2, size2)) {
                i = this.endEnemy(i, -1, pos1);

                this.terminate();
                break;
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

    updatelife() {
        document.getElementById("lifebar").style.width = this.life + '%';
        if(50 >= this.life) {
            document.getElementById("lifebar").style.backgroundColor = "red";
        }
        else {
            document.getElementById("lifebar").style.backgroundColor = "#68B4FF";
        }

    }

    terminate() {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over-overlay').style.display = 'block';

        this.life = 0;
        this.isGameOver = true;
    }

    // -------------------------------------------------------------------------------------------------------------
    /// @brief
    addPlayer() {}
    /// @brief
    endPlayer() {}

    /// @brief
    addEnemy() {}
    /// @brief
    /// @param i
    /// @param j
    /// @param pos
    endEnemy(i, j, pos) {}

    /// @brief
    addShot() {}
    /// @brief
    /// @param pos
    endShot(pos) {}

}

/// @brief
function engine_execute(images) {

    // -----------------------------------------------------------------------------------------------------------------
    // ENTRY STUFF

    /// @brief start everything
    function app_init() {
        engine.setup(images[0]);
        engine.reset();

        render.setup(images[1]);

        app_loop();
    }

    /// @brief The app loop
    function app_loop() {
        engine.execute(Date.now());
        render.update();

        app_requestAnimFrame(app_loop);
    }

    /// @brief A cross-browser requestAnimationFrame. See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    let app_requestAnimFrame = (function () {
        console.log(arguments.callee.name);

        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                console.log(arguments.callee.name);

                window.setTimeout(callback, 1000 / 60);
            };
    })();

    input.setUp();

    rsrc.setup(images);
    rsrc.onReady(app_init);
}