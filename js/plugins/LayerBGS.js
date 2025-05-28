(() => {
    window.LayerBGS = {
        _buffer: null,
        _currentName: null,

        play(name, volume = 90, pitch = 100, loop = true) {
            if (this._buffer && this._currentName === name) return;
            if (this._buffer) this._buffer.stop();

            this._buffer = AudioManager.createBuffer("bgs/", name);
            this._buffer.volume = volume / 100;
            this._buffer.pitch = pitch;
            this._buffer.loop = loop;
            this._buffer.play(loop, 0);
            this._currentName = name;
        },

        stop() {
            if (this._buffer) {
                this._buffer.stop();
                this._buffer = null;
                this._currentName = null;
            }
        }
    };
})();
