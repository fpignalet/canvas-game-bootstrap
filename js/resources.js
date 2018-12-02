class Resources {

    /// @brief
    constructor () {
        this.resourceCache = {};
        this.readyCallbacks = [];

        window.rsrc = this;
    }

    // --------------------------------------------------------------
    /// @brief
    /// @param url
    get(url) {
        return this.resourceCache[url];
    }

    /// @brief Load an image url or an array of image urls
    /// @param urlOrArr
    setup(urlOrArr) {
        const local = this;
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function (url) {
                local.load(url);
            });
        }
        else {
            this.load(urlOrArr);
        }
    }

    /// @brief
    /// @param func
    onReady(func) {
        this.readyCallbacks.push(func);
    }

    // --------------------------------------------------------------
    /// @brief
    /// @param url
    load(url) {
        if (this.resourceCache[url]) {
            return this.resourceCache[url];
        }
        else {
            const local = this;
            const img = new Image();
            img.onload = function () {
                local.resourceCache[url] = img;

                if (local.isReady()) {
                    local.readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };

            this.resourceCache[url] = false;
            img.src = url;
        }
    }

    /// @brief
    isReady() {
        var ready = true;
        for (var k in this.resourceCache) {
            if (this.resourceCache.hasOwnProperty(k) &&
                !this.resourceCache[k]) {
                ready = false;
            }
        }

        return ready;
    }

}
