// -----------------------------------------------------------------------------------------------------------------
const app_images = [
    'img/sprites.png',
    'img/terrain.png'
];

const app_wdht = [
    1024,
    768
]

// -----------------------------------------------------------------------------------------------------------------
// ENTRY STUFF

/// @brief start everything
function app_init() {
    core.setup(app_images[0]);
    core.reset();

    render.setup(app_images[1]);

    app_loop();
}

/// @brief The app_loop game loop
function app_loop() {
    core.execute(Date.now());
    render.update();

    app_requestAnimFrame(app_loop);
};

/// @brief A cross-browser requestAnimationFrame. See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var app_requestAnimFrame = (function () {
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

// -----------------------------------------------------------------------------------------------------------------
/// @brief
(function execute() {
    new Resources();

    new Input();
    new Renderer(app_wdht);

    new Core();

    input.setUp();
    rsrc.setup(app_images);
    rsrc.onReady(app_init);
})();
