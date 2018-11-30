// -----------------------------------------------------------------------------------------------------------------
var images = [
    'img/sprites.png',
//    'img/rob1.png',
    'img/terrain.png'
];

var wdht = [
    1024,
    768
]

var lastTime = 0;

var core = null;
var renderer = null;

// -----------------------------------------------------------------------------------------------------------------
// CORE STUFF

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function () {
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

// start everything
function init() {
    renderer.terrainPattern = renderer.ctx.createPattern(resources.get(images[1]), 'repeat');

    document.getElementById('play-again').addEventListener('click', function () {
        reset();
    });

    reset();
    main();
}

// Reset game to original state
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';

    core.reset();

    lastTime = Date.now();
};

// The main game loop
function main() {
    document.getElementById('score').innerHTML = core.score;

    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    core.execute(dt);
    renderer.update();
    lastTime = now;

    requestAnimFrame(main);
};

// -----------------------------------------------------------------------------------------------------------------
(function execute() {
    resources.load(images);

    core = new GameCore(images[0]);
    renderer = new Renderer();

    resources.onReady(init);
})();
