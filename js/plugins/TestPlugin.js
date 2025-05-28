// js/plugins/TestPlugin.js

(function() {
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        initializePlugin();
    };

    function initializePlugin() {
        if (!$gameSystem) {
            console.error("TestPlugin: $gameSystem is not initialized!");
            return;
        }

        console.log("TestPlugin: Initializing...");

        attachTestFunction();

        console.log("TestPlugin: Attached testFunction:", typeof $gameSystem.testFunction);
        console.log("TestPlugin: Initialized successfully.");
    }

    function attachTestFunction() {
        Object.defineProperty($gameSystem, "testFunction", {
            value: function() {
                $gameMessage.add("Test works!");
            },
            writable: true,
            configurable: true
        });
    }

    // Reattach in Scene_Map to handle reinitialization
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        attachTestFunction();
        console.log("TestPlugin: Reattached testFunction in Scene_Map:", typeof $gameSystem.testFunction);
    };
})();