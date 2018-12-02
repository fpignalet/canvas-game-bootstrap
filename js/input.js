class Input {

    /// @brief
    constructor() {
        this.pressedKeys = {};

        window.input = this;
    }

    /// @brief
    setUp() {
        const local = this;

        document.addEventListener('keydown', function(e) {
            local.setKey(e, true);
        });

        document.addEventListener('keyup', function(e) {
            local.setKey(e, false);
        });

        window.addEventListener('blur', function() {
            local.pressedKeys = {};
        });

    }

    isDown(key) {
        return this.pressedKeys[key.toUpperCase()];
    }

    /// @brief
    /// @param event
    /// @param status
    setKey(event, status) {
        const code = event.keyCode;

        var key;
        switch(code) {
            case 32:
                key = 'SPACE'; break;
            case 37:
                key = 'LEFT'; break;
            case 38:
                key = 'UP'; break;
            case 39:
                key = 'RIGHT'; break;
            case 40:
                key = 'DOWN'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }

        this.pressedKeys[key] = status;
    }

}
