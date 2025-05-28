(function() {
  const pluginName = "KittenCollectPlugin";
  if (window[pluginName]) return;

  window[pluginName] = true;
  let pendingCollect = false;

  // Hook Scene_Boot
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    _Scene_Boot_create.call(this);
    pendingCollect = false;
  };

  // Collect method
  Game_System.prototype.collectKitten = function() {
    console.log("Collect: Checking randomKittenVar:", window.BlockchainPlugin.randomKittenVar);
    console.log("Collect: $gameSystem.randomKittenVar:", this.randomKittenVar);
    if (!window.BlockchainPlugin.randomKittenVar) {
      console.error("Collect: randomKittenVar not set!");
      $gameMessage.add("Error: Game not initialized.");
      console.log("Collect: randomKittenVar not set, storing pending collection...");
      pendingCollect = true;
      window.BlockchainPlugin.pendingKittenCollections.push(true);
      console.log("Collect: Pending collections now:", window.BlockchainPlugin.pendingKittenCollections.length);
      window.ensureBlockchainFunctions();
      return;
    }
    this.randomKittenVar = window.BlockchainPlugin.randomKittenVar;
    const varId = this.randomKittenVar;
    const currentKittens = $gameVariables.value(varId) + 1;
    $gameVariables.setValue(varId, currentKittens);
    console.log("Collect: Incremented varId", varId, "to", currentKittens);
    $gameMessage.add(`Collected a kitten! Total: ${currentKittens}`);
    pendingCollect = false;
  };

  // Update Scene_Map
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    if (pendingCollect && $gameSystem && window.BlockchainPlugin.randomKittenVar) {
      $gameSystem.collectKitten();
    }
  };
})();