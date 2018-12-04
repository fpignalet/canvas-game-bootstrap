'use strict';
class Factory {

    /// @brief
    /// @param core
    static getplayersprite() {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return new Sprite(
            engine.image,
            [0, 0], [39, 39],
            engine.speedPlayer,
            [0, 1])
    }

    /// @brief
    /// @param core
    static getbulletssprites() {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return [
            new Sprite(
                engine.image,
                [0, 39], [18, 8]
            ),
            new Sprite(
                engine.image,
                [0, 50], [9, 5]
            ),
            new Sprite(
                engine.image,
                [0, 60], [9, 5]
            )
        ]
    }

    /// @brief
    /// @param core
    static getenemysprite() {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return new Sprite(
            engine.image,
            [0, 78], [80, 39],
            engine.speedEnemy,
            [0, 1, 2, 3, 2, 1])
    }

    /// @brief
    /// @param core
    static getexplosionsprite() {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return new Sprite(
            engine.image,
            [0, 117], [39, 39],
            engine.speedExplosion,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            null,
            true)
    }

}
