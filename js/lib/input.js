'use strict';
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
            if(false === engine.isGameOver) {
                local.setKey(e, true);
                e.returnValue = false;
            }
            else {
                local.pressedKeys = {};
            }
        });

        document.addEventListener('keyup', function(e) {
            if(false === engine.isGameOver) {
                local.setKey(e, false);
                e.returnValue = false;
            }
            else {
                local.pressedKeys = {};
            }
        });

        window.addEventListener('blur', function(e) {
            if(false === engine.isGameOver) {
                local.pressedKeys = {};
                e.returnValue = false;
            }
            else {
                local.pressedKeys = {};
            }
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

        let key;
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
