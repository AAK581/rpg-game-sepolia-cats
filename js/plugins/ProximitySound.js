(() => {
    // Configuration
    const proximitySound = {
        name: "ooiiia", // Your sound file from /audio/bgs/
        pitch: 100,
        pan: 0,
        maxVolume: 90,     // Max volume when player is right on top
        minVolume: 0,      // Min volume when far away
        maxDistance: 7     // Tiles where volume becomes 0
    };

    let lastVolume = -1;

    // Loop-aware distance calculation (Euclidean)
    function loopDistance(x1, y1, x2, y2) {
        const w = $gameMap.width();
        const h = $gameMap.height();

        const dx = Math.min(Math.abs(x1 - x2), w - Math.abs(x1 - x2));
        const dy = Math.min(Math.abs(y1 - y2), h - Math.abs(y1 - y2));

        return Math.sqrt(dx * dx + dy * dy);
    }

    // Find closest target event (e.g., collectible items)
    function nearestTargetDistance() {
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        let minDist = Infinity;

        $gameMap.events().forEach(event => {
            if (event.event().meta.collectible) {
                const dist = loopDistance(playerX, playerY, event.x, event.y);
                if (dist < minDist) minDist = dist;
            }
        });

        return minDist;
    }

    // Update volume each frame
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        if (!AudioManager._currentBgs || AudioManager._currentBgs.name !== proximitySound.name) return;

        const dist = nearestTargetDistance();
        const vol = Math.max(
            proximitySound.minVolume,
            Math.min(
                proximitySound.maxVolume,
                proximitySound.maxVolume * (1 - dist / proximitySound.maxDistance)
            )
        );

        const intVol = Math.round(vol);
        if (intVol !== lastVolume) {
            lastVolume = intVol;
            AudioManager.updateBgsParameters({
                volume: intVol,
                pitch: proximitySound.pitch,
                pan: proximitySound.pan
            });
        }
    };

    // Play the sound on map start
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_start.call(this);
        AudioManager.playBgs({
            name: proximitySound.name,
            volume: 0,
            pitch: proximitySound.pitch,
            pan: proximitySound.pan
        });
    };

    // Stop it when leaving map
    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function () {
        _Scene_Map_terminate.call(this);
        AudioManager.stopBgs();
    };
})();
