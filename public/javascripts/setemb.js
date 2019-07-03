/// @brief the sprites / terrain images to be used
export const app_images = [
    'clientside/game/public/rsrc/images/sprites.png',
    'clientside/game/public/rsrc/images/terrain.png'
];

/// @brief everything about general app geometry
export const app_settings = {
    // for Renderer
    width: 800,
    height: 400,

    // for Factory
    // Speed are in pixels per second
    speedPlayer: 16,
    speedEnemy: 6,
    speedExplosion: 6,

    // for Engine
    incrPlayer: 200,
    incrBullet: 500,
    incrEnemy: 150,
    incrScore: 100,

    threshFire: 100,

};

/// @brief anything to get GUI / engine linked together
export const app_guimap = {
    // for Engine
    elemscoreid: 'score',
    elemsinstrid: 'instructions',
    elemplayagainid: 'play-again',
    elemgameoverid: 'game-over',
    elemgameoverlayid: 'game-over-overlay',
    elemlifebarid: 'lifebar',
    elemwrapperid: 'wrapper',
    elemcanvasid: 'canvas'

};
