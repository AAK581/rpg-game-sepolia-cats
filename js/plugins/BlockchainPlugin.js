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
  window.BlockchainPlugin = window.BlockchainPlugin || {};
  window.BlockchainPlugin.randomKittenVar = null;
  window.BlockchainPlugin.pendingKittenCollections = [];

  window.ensureBlockchainFunctions = function() {
    if (!$gameSystem || typeof $gameSystem.getKittens !== "function" || !window.BlockchainPlugin.randomKittenVar) {
      console.warn("BlockchainPlugin: Reattaching functions or resetting...");
      if ($gameSystem) {
        attachFunctions();
        if (!window.BlockchainPlugin.randomKittenVar) initializeKittenVar();
      }
    }
  };

  function initializeKittenVar() {
    if (window.BlockchainPlugin.randomKittenVar) {
      console.log("BlockchainPlugin: randomKittenVar already set:", window.BlockchainPlugin.randomKittenVar);
      return;
    }
    if (!$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: $gameSystem or $gameVariables not ready, skipping.");
      return;
    }
    do {
      window.BlockchainPlugin.randomKittenVar = Math.floor(Math.random() * 100) + 1;
    } while ([2, 8, 9, 12, 18, 19, 21, 22, 23, 24, 25].includes(window.BlockchainPlugin.randomKittenVar));
    $gameSystem.randomKittenVar = window.BlockchainPlugin.randomKittenVar;
    $gameVariables.setValue(window.BlockchainPlugin.randomKittenVar, 0);
    console.log("BlockchainPlugin: Set randomKittenVar:", window.BlockchainPlugin.randomKittenVar);
    console.log("BlockchainPlugin: Verify $gameSystem.randomKittenVar:", $gameSystem.randomKittenVar);
  }

  // Extend Game_System
  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    console.log("BlockchainPlugin: Game_System.initialize called");
    _Game_System_initialize.call(this);
    initializeKittenVar();
  };

  // Restore in Scene_Map
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    if ($gameSystem && window.BlockchainPlugin.randomKittenVar && !$gameSystem.randomKittenVar) {
      $gameSystem.randomKittenVar = window.BlockchainPlugin.randomKittenVar;
      console.log("BlockchainPlugin: Restored randomKittenVar in Scene_Map:", window.BlockchainPlugin.randomKittenVar);
    }
    console.log("BlockchainPlugin: Processing", window.BlockchainPlugin.pendingKittenCollections.length, "pending kitten collections");
    window.BlockchainPlugin.pendingKittenCollections.forEach(() => {
      if ($gameSystem) $gameSystem.collectKitten();
    });
    window.BlockchainPlugin.pendingKittenCollections = [];
  };

  // Hook Scene_Boot
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    console.log("BlockchainPlugin: Scene_Boot.create called");
    _Scene_Boot_create.call(this);
    if (initializePlugin()) {
      window.ensureBlockchainFunctions();
    }
  };

  function initializePlugin() {
    if (!window.DataManager || !DataManager.isDatabaseLoaded() || !$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: Not ready, retrying...");
      setTimeout(initializePlugin, 50);
      return false;
    }
    initializeKittenVar();
    if (!window.BlockchainPlugin.randomKittenVar) {
      console.warn("BlockchainPlugin: randomKittenVar not set, retrying...");
      setTimeout(initializePlugin, 50);
      return false;
    }
    console.log("BlockchainPlugin: randomKittenVar:", $gameSystem.randomKittenVar, "Value:", $gameVariables.value($gameSystem.randomKittenVar));
    console.log("BlockchainPlugin: window.ethereum:", !!window.ethereum);
    attachFunctions();
    return true;
  }

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
        console.log("getKittens: Blockchain kittens:", kittenCount, "Local:", $gameSystem.randomKittenVar ? $gameVariables.value($gameSystem.randomKittenVar) : 0);
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
      if (!$gameSystem.randomKittenVar) {
        console.error("setKittens: randomKittenVar not set!");
        $gameMessage.add("Error: Game not initialized.");
        return false;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("setKittens: Requesting", kittens, "kittens for", userAddress);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        $gameMessage.add("Syncing kittens...");
        const tx = await contract.setKittens(userAddress, kittens);
        console.log("setKittens: Transaction sent:", tx.hash);
        await tx.wait();
        console.log("setKittens: Transaction confirmed:", tx.hash);
        $gameVariables.setValue($gameSystem.randomKittenVar, kittens);
        console.log("setKittens: Set varId", $gameSystem.randomKittenVar, "to", kittens);
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
        $gameMessage.add("No wallet detected.");
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
      openDApp: !!$gameSystem.openDApp
    });
  }
})();