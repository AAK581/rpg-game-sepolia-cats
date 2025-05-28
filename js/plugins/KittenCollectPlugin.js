(function() {
  const pluginName = "KittenCollectPlugin";
  if (window[pluginName]) return;
  window[pluginName] = true;
  
  // Hook Scene_Boot
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    _Scene_Boot_create.call(this);
    // Initialize pending collections counter on game system
    if ($gameSystem && typeof $gameSystem._pendingKittenCollections === 'undefined') {
      $gameSystem._pendingKittenCollections = 0;
    }
  };
  
  // Collect method with proper race condition handling
  Game_System.prototype.collectKitten = function() {
    console.log("Collect: Checking randomKittenVar:", this.randomKittenVar);
    console.log("Collect: $gameSystem.randomKittenVar:", $gameSystem.randomKittenVar);
    
    // Check both this.randomKittenVar and $gameSystem.randomKittenVar
    const varId = this.randomKittenVar || $gameSystem.randomKittenVar;
    
    // FIXED: If randomKittenVar is not ready, store the collection request
    if (!varId) {
      console.log("Collect: randomKittenVar not set, storing pending collection...");
      
      // Initialize pending collections counter if not exists
      if (typeof this._pendingKittenCollections === 'undefined') {
        this._pendingKittenCollections = 0;
      }
      
      // Store the pending collection
      this._pendingKittenCollections++;
      console.log("Collect: Pending collections now:", this._pendingKittenCollections);
      
      // Try to trigger blockchain plugin initialization
      if (window.ensureBlockchainFunctions) {
        console.log("Collect: Calling ensureBlockchainFunctions");
        window.ensureBlockchainFunctions();
      } else {
        $gameMessage.add("Error: Blockchain plugin not ready.");
      }
      return;
    }
    
    // Normal collection logic
    const currentKittens = $gameVariables.value(varId) + 1;
    $gameVariables.setValue(varId, currentKittens);
    console.log("Collect: Incremented varId", varId, "to", currentKittens);
    //$gameMessage.add(`Collected a kitten! Total: ${currentKittens}`);
  };
  
  // Remove the Scene_Map update hook as it's no longer needed
  // The BlockchainPlugin now handles processing pending collections
})();