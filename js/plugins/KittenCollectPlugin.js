(function() {
  const pluginName = "KittenCollectPlugin";
  if (window[pluginName]) {
    console.log("KittenCollectPlugin: Already initialized");
    return;
  }
  window[pluginName] = true;

  let pendingCollect = false;
  let initializationAttempts = 0;
  const maxInitAttempts = 50;

  // Hook Scene_Boot
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    _Scene_Boot_create.call(this);
    pendingCollect = false;
    initializationAttempts = 0;
    console.log("KittenCollectPlugin: Scene_Boot initialized");
  };

  // Collect kitten method with better error handling
  Game_System.prototype.collectKitten = function() {
    console.log("KittenCollectPlugin: collectKitten called");
    console.log("KittenCollectPlugin: randomKittenVar status:", {
      window: window.BlockchainPlugin?.randomKittenVar,
      gameSystem: this.randomKittenVar,
      gameSystemExists: !!$gameSystem,
      gameVariablesExists: !!$gameVariables
    });

    // Ensure blockchain plugin is ready
    if (typeof window.ensureBlockchainFunctions === "function") {
      window.ensureBlockchainFunctions();
    }

    // Check if we have the required variable ID
    if (!window.BlockchainPlugin?.randomKittenVar && !this.randomKittenVar) {
      console.error("KittenCollectPlugin: randomKittenVar not available");
      $gameMessage.add("Error: Game not properly initialized.");
      
      // Store pending collection for later processing
      if (window.BlockchainPlugin) {
        console.log("KittenCollectPlugin: Storing pending collection");
        window.BlockchainPlugin.pendingKittenCollections = window.BlockchainPlugin.pendingKittenCollections || [];
        window.BlockchainPlugin.pendingKittenCollections.push(true);
        pendingCollect = true;
      }
      return;
    }

    // Ensure we have the variable ID
    const varId = this.randomKittenVar || window.BlockchainPlugin.randomKittenVar;
    if (!varId) {
      console.error("KittenCollectPlugin: No valid variable ID found");
      $gameMessage.add("Error: Cannot determine kitten storage variable.");
      return;
    }

    // Synchronize the variable ID between systems
    if (window.BlockchainPlugin && !this.randomKittenVar) {
      this.randomKittenVar = window.BlockchainPlugin.randomKittenVar;
    }
    if (this.randomKittenVar && window.BlockchainPlugin) {
      window.BlockchainPlugin.randomKittenVar = this.randomKittenVar;
    }

    // Collect the kitten
    try {
      const currentKittens = $gameVariables.value(varId);
      const newKittens = currentKittens + 1;
      
      $gameVariables.setValue(varId, newKittens);
      console.log("KittenCollectPlugin: Incremented varId", varId, "from", currentKittens, "to", newKittens);
      
      //$gameMessage.add(`Collected a kitten! Total: ${newKittens}`);
      pendingCollect = false;
      
      // Optional: Auto-sync to blockchain if connected
    //   if (typeof $gameSystem.setKittens === "function" && $gameVariables.value(12) === 1) {
    //     console.log("KittenCollectPlugin: Auto-syncing to blockchain");
    //     setTimeout(() => {
    //       $gameSystem.setKittens(newKittens).catch(error => {
    //         console.error("KittenCollectPlugin: Auto-sync failed:", error);
    //       });
    //     }, 1000);
    //   }
    } catch (error) {
      console.error("KittenCollectPlugin: Error collecting kitten:", error);
      $gameMessage.add("Error collecting kitten.");
    }
  };

  // Enhanced Scene_Map update to handle pending collections
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    
    // Handle pending collections with retry logic
    if (pendingCollect && $gameSystem && initializationAttempts < maxInitAttempts) {
      initializationAttempts++;
      
      if (window.BlockchainPlugin?.randomKittenVar || $gameSystem.randomKittenVar) {
        console.log("KittenCollectPlugin: Processing pending collection (attempt", initializationAttempts, ")");
        $gameSystem.collectKitten();
      } else if (initializationAttempts >= maxInitAttempts) {
        console.error("KittenCollectPlugin: Failed to initialize after", maxInitAttempts, "attempts");
        $gameMessage.add("Warning: Kitten collection system not fully initialized.");
        pendingCollect = false;
      }
    }
  };

  // Scene_Map start hook for processing blockchain pending collections
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    
    // Additional check for blockchain pending collections
    if (window.BlockchainPlugin?.pendingKittenCollections?.length > 0) {
      console.log("KittenCollectPlugin: Processing blockchain pending collections");
      const pendingCount = window.BlockchainPlugin.pendingKittenCollections.length;
      
      // Clear the pending collections first to avoid infinite loops
      window.BlockchainPlugin.pendingKittenCollections = [];
      
      // Process each pending collection
      for (let i = 0; i < pendingCount; i++) {
        if ($gameSystem && typeof $gameSystem.collectKitten === "function") {
          $gameSystem.collectKitten();
        }
      }
    }
  };

  // Utility function to get current kitten count
  Game_System.prototype.getKittenCount = function() {
    const varId = this.randomKittenVar || window.BlockchainPlugin?.randomKittenVar;
    if (!varId) {
      console.warn("KittenCollectPlugin: No variable ID available for getKittenCount");
      return 0;
    }
    return $gameVariables.value(varId);
  };

  // Utility function to set kitten count directly
  Game_System.prototype.setKittenCount = function(count) {
    const varId = this.randomKittenVar || window.BlockchainPlugin?.randomKittenVar;
    if (!varId) {
      console.error("KittenCollectPlugin: No variable ID available for setKittenCount");
      //$gameMessage.add("Error: Cannot set kitten count.");
      return false;
    }
    
    if (!Number.isInteger(count) || count < 0) {
      console.error("KittenCollectPlugin: Invalid kitten count:", count);
      //$gameMessage.add("Invalid kitten count.");
      return false;
    }
    
    $gameVariables.setValue(varId, count);
    console.log("KittenCollectPlugin: Set kitten count to", count);
    //$gameMessage.add(`Kitten count set to: ${count}`);
    return true;
  };

  console.log("KittenCollectPlugin: Plugin loaded successfully");
  console.log("KittenCollectPlugin: Available methods:", {
    collectKitten: !!Game_System.prototype.collectKitten,
    getKittenCount: !!Game_System.prototype.getKittenCount,
    setKittenCount: !!Game_System.prototype.setKittenCount
  });
})();