class Factory {

    /// @brief
    /// @param core
    static getplayersprite(core) {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return new Sprite(
            core.image,
            [0, 0], [39, 39],
            core.speedPlayer,
            [0, 1])
    }

    /// @brief
    /// @param core
    static getbulletssprites(core) {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return [
            new Sprite(
                core.image,
                [0, 39], [18, 8]
            ),
            new Sprite(
                core.image,
                [0, 50], [9, 5]
            ),
            new Sprite(
                core.image,
                [0, 60], [9, 5]
            )
        ]
    }

    /// @brief
    /// @param core
    static getenemysprite(core) {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return new Sprite(
            core.image,
            [0, 78], [80, 39],
            core.speedEnemy,
            [0, 1, 2, 3, 2, 1])
    }

    /// @brief
    /// @param core
    static getexplosionsprite(core) {
        // url,
        // pos, size,
        // speed,
        // frames,
        // ...dir, once
        return new Sprite(
            core.image,
            [0, 117], [39, 39],
            core.speedExplosion,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            null,
            true)
    }

}
