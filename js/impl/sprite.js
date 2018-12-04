'use strict';
class Sprite {

    /// @brief
    /// @param url
    /// @param pos
    /// @param size
    /// @param speed
    /// @param frames
    /// @param dir
    /// @param once
    constructor(image, pos, size, speed, frames, dir, once) {
        this.image = image;

        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this.dir = dir || 'horizontal';
        this.once = once;

        this._index = 0;
        this.done = false;
    };

    /// @brief
    /// @param dt
    update(dt) {
        this._index += this.speed * dt;
    }

    /// @brief
    /// @param ctx
    render(ctx) {
        //find frame coordinates
        let frame = 0;
        if (this.speed > 0) {
            const max = this.frames.length;
            const idx = Math.floor(this._index);
            frame = this.frames[idx % max];

            if (this.once && idx >= max) {
                this.done = true;
                return;
            }
        }

        let x = this.pos[0];
        let y = this.pos[1];

        //display frame
        if (this.dir === 'vertical') {
            y += frame * this.size[1];
        }
        else {
            x += frame * this.size[0];
        }

        ctx.drawImage(this.image,
            x, y,
            this.size[0], this.size[1],
            0, 0,
            this.size[0], this.size[1]);
    }

}
