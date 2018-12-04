const app_images = [
    'clientside/game/img/sprites.png',
    'clientside/game/img/terrain.png'
];

const app_settings = {
    "width": 869,
    "height": 400,

    // Speed are in pixels per second
    "speedPlayer": 16,
    "speedEnemy": 6,
    "speedExplosion": 6,

    "incrPlayer": 200,
    "incrBullet": 500,
    "incrEnemy": 150,
    "incrScore": 100,

    "threshFire": 100
};

// -----------------------------------------------------------------------------------------------------------------
new Core(app_settings, "myCanvas");
engine_execute(app_images);
