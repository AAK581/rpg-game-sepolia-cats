(function() {
  const scriptId = "BlockchainPluginScript";
  if (window.BlockchainPluginInitialized || document.getElementById(scriptId)) {
    console.log("BlockchainPlugin: Skipped duplicate initialization.");
    return;
  }
  window.BlockchainPluginInitialized = true;
  
  const scriptTag = document.createElement("script");
  scriptTag.id = scriptId;
  document.head.appendChild(scriptTag);
  let randomKittenVar = null;

  window.ensureBlockchainFunctions = function() {
    if (!$gameSystem || typeof $gameSystem.getKittens !== "function" || !$gameSystem.randomKittenVar) {
      console.warn("BlockchainPlugin: Reattaching functions or resetting...");
      if ($gameSystem) {
        attachFunctions();
        if (!$gameSystem.randomKittenVar) initializeKittenVar();
      }
    }
  };

  function initializeKittenVar() {
    if ($gameSystem && $gameSystem.randomKittenVar) {
      randomKittenVar = $gameSystem.randomKittenVar;
      console.log("BlockchainPlugin: randomKittenVar already set on $gameSystem:", randomKittenVar);
      return randomKittenVar;
    }
    
    if (!$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: $gameSystem or $gameVariables not ready, skipping.");
      return null;
    }
    
    do {
      randomKittenVar = Math.floor(Math.random() * 100) + 1;
    } while ([2, 8, 9, 12, 18, 19, 21, 22, 23, 24, 25].includes(randomKittenVar));
    
    // IMPORTANT: Set it directly on the $gameSystem instance
    $gameSystem.randomKittenVar = randomKittenVar;
    $gameVariables.setValue(randomKittenVar, 0);
    
    console.log("BlockchainPlugin: Set randomKittenVar:", randomKittenVar);
    console.log("BlockchainPlugin: Verify $gameSystem.randomKittenVar:", $gameSystem.randomKittenVar);
    
    // FIXED: Process any pending kitten collections after randomKittenVar is set
    if ($gameSystem._pendingKittenCollections > 0) {
      console.log(`BlockchainPlugin: Processing ${$gameSystem._pendingKittenCollections} pending kitten collections`);
      const pendingCount = $gameSystem._pendingKittenCollections;
      $gameSystem._pendingKittenCollections = 0; // Reset before processing to avoid infinite loop
      
      // Process each pending collection
      for (let i = 0; i < pendingCount; i++) {
        setTimeout(() => {
          if ($gameSystem.collectKitten) {
            $gameSystem.collectKitten();
          }
        }, i * 10); // Small delay between each collection
      }
    }
    
    return randomKittenVar;
  }

  // Extend Game_System - Make sure the property persists
  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    // Initialize pending collections counter
    this._pendingKittenCollections = 0;
    console.log("BlockchainPlugin: Game_System.initialize called");
  };

  // This is crucial - make sure randomKittenVar is saved/loaded properly
  const _Game_System_makeEmpty = Game_System.prototype.makeEmpty;
  Game_System.prototype.makeEmpty = function() {
    _Game_System_makeEmpty.call(this);
    this.randomKittenVar = null; // Initialize the property
    this._pendingKittenCollections = 0; // Initialize pending collections
  };

  // Ensure randomKittenVar persists after loading
  const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function() {
    if (_Game_System_onAfterLoad) {
      _Game_System_onAfterLoad.call(this);
    }
    console.log("BlockchainPlugin: onAfterLoad called, randomKittenVar:", this.randomKittenVar);
    if (!this.randomKittenVar) {
      initializeKittenVar();
    } else {
      randomKittenVar = this.randomKittenVar;
    }
  };

  function initializePlugin() {
    if (!window.DataManager || !DataManager.isDatabaseLoaded() || !$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: Not ready, retrying...");
      setTimeout(initializePlugin, 50);
      return false;
    }
    
    // Initialize the kitten variable
    const varId = initializeKittenVar();
    if (!varId) {
      console.warn("BlockchainPlugin: randomKittenVar not set, retrying...");
      setTimeout(initializePlugin, 50);
      return false;
    }
    
    console.log("BlockchainPlugin: randomKittenVar:", $gameSystem.randomKittenVar, "Value:", $gameVariables.value($gameSystem.randomKittenVar));
    console.log("BlockchainPlugin: window.ethereum:", !!window.ethereum);
    attachFunctions();
    return true;
  }

  // Hook Scene_Boot.prototype.create
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    _Scene_Boot_create.call(this);
    console.log("BlockchainPlugin: Scene_Boot.create called");
    if (initializePlugin()) {
      window.ensureBlockchainFunctions();
    }
  };

  function attachFunctions() {
    if (!$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: $gameSystem or $gameVariables not ready, retrying...");
      setTimeout(attachFunctions, 50);
      return;
    }
    
    const contractAddress = "0xFee91cdC10A1663d69d6891d8b6621987aACe2EF";
    const contractABI = [
      {"type":"function","name":"getKittens","inputs":[],"outputs":[{"name":"","type":"uint256"}],"stateMutability":"view"},
      {"type":"function","name":"setKittens","inputs":[{"name":"userAddress","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
      {"type":"function","name":"fundContract","inputs":[],"outputs":[],"stateMutability":"payable"},
      {"type":"function","name":"rewardUser","inputs":[],"outputs":[],"stateMutability":"nonpayable"},
      {"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address"}],"stateMutability":"view"},
      {"type":"event","name":"KittensUpdated","inputs":[{"name":"user","type":"address","indexed":true},{"name":"newValue","type":"uint256","indexed":false}],"anonymous":false},
      {"type":"event","name":"UserRewarded","inputs":[{"name":"user","type":"address","indexed":true},{"name":"amount","type":"uint256","indexed":false}],"anonymous":false},
      {"type":"event","name":"DonationReceived","inputs":[{"name":"donor","type":"address","indexed":true},{"name":"amount","type":"uint256","indexed":false}],"anonymous":false}
    ];

    $gameSystem.getKittens = async function() {
      window.ensureBlockchainFunctions();
      if (!window.ethereum) {
        console.error("getKittens: No Web3 provider");
        $gameMessage.add("Please connect wallet.");
        return 0;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const kittens = await contract.getKittens({ from: userAddress });
        const kittenCount = Number(kittens);
        if (this.randomKittenVar) {
          console.log("getKittens: Blockchain kittens:", kittenCount, "Local:", $gameVariables.value(this.randomKittenVar));
        }
        return kittenCount;
      } catch (error) {
        console.error("getKittens: Error:", error.message);
        $gameMessage.add(`Error: ${error.message}`);
        return 0;
      }
    };

    $gameSystem.setKittens = async function(kittens) {
      window.ensureBlockchainFunctions();
      if (!Number.isInteger(kittens) || kittens > 60 || kittens < 0) {
        console.error("setKittens: Invalid count:", kittens);
        $gameMessage.add("Kitten count must be 0-60.");
        return false;
      }
      if (!this.randomKittenVar) {
        console.error("setKittens: randomKittenVar not set!");
        $gameMessage.add("Error: Game not initialized.");
        return false;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("setKittens: Requesting", kittens, "kittens for", userAddress);
        $gameMessage.add("Syncing kittens...");
        const response = await fetch("https://rpg-game-sepolia-cats.vercel.app/api/setKittens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kittens, userAddress })
        });
        const data = await response.json();
        console.log("setKittens: Response:", data);
        if (data.error) throw new Error(data.error);
        if (!data.txHash) throw new Error("No transaction hash returned");
        $gameVariables.setValue(this.randomKittenVar, kittens);
        console.log("setKittens: Set varId", this.randomKittenVar, "to", kittens);
        return true;
      } catch (error) {
        console.error("setKittens: Error:", error.message);
        $gameMessage.add(`Error syncing: ${error.message}`);
        return false;
      }
    };

    $gameSystem.connectWallet = async function() {
      window.ensureBlockchainFunctions();
      if (!window.ethereum) {
        $gameVariables.setValue(12, 0);
        return;
      }
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== 534351n) {
          $gameMessage.add("Please switch to Scroll Sepolia network.");
          $gameVariables.setValue(12, 0);
          return;
        }
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        $gameMessage.add(`Connected: ${address}`);
        $gameVariables.setValue(12, 1);
      } catch (error) {
        console.error("connectWallet:", error);
        $gameMessage.add(`Error: ${error.message}`);
        $gameVariables.setValue(12, 0);
      }
    };

    $gameSystem.fundContract = async function(ethAmount) {
      window.ensureBlockchainFunctions();
      if (!window.ethereum) {
        $gameMessage.add("Please connect wallet.");
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const network = await provider.getNetwork();
        if (network.chainId !== 534351n) {
          $gameMessage.add("Please switch to Scroll Sepolia.");
          return;
        }
        const currentOwner = await contract.owner();
        if (currentOwner.toLowerCase() !== userAddress.toLowerCase()) {
          $gameMessage.add("Only owner can fund.");
          return;
        }
        const amountInWei = ethers.parseEther(ethAmount.toString());
        const tx = await contract.fundContract({ value: amountInWei });
        $gameMessage.add("Funding...");
        await tx.wait();
        $gameMessage.add(`Funded ${ethAmount} ETH!`);
      } catch (error) {
        console.error("fundContract: Error:", error.message);
        $gameMessage.add(`Error: ${error.message}`);
      }
    };

    $gameSystem.openDApp = function() {
      window.ensureBlockchainFunctions();
      window.open("https://your-dapp.vercel.app", "_blank");
    };

    console.log("BlockchainPlugin: Functions attached:", {
      getKittens: !!$gameSystem.getKittens,
      setKittens: !!$gameSystem.setKittens,
      connectWallet: !!$gameSystem.connectWallet,
      fundContract: !!$gameSystem.fundContract,
      openDApp: !!$gameSystem.openDApp,
      randomKittenVar: $gameSystem.randomKittenVar
    });
  }
})();