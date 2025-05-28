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
    if (!$gameSystem || typeof $gameSystem.getKittens !== "function" || !randomKittenVar) {
      console.warn("BlockchainPlugin: Reattaching functions or resetting...");
      attachFunctions();
      if (!randomKittenVar && $gameSystem) initializeKittenVar();
    }
  };

  function initializeKittenVar() {
    if (randomKittenVar) {
      console.log("BlockchainPlugin: randomKittenVar already set:", randomKittenVar);
      return;
    }
    if (!$gameSystem) {
      console.warn("BlockchainPlugin: $gameSystem not ready, skipping.");
      return;
    }

    do {
      randomKittenVar = Math.floor(Math.random() * 100) + 1;
    } while ([2, 8, 9, 12, 18, 19, 21, 22, 23, 24, 25].includes(randomKittenVar));
    $gameSystem.randomKittenVar = randomKittenVar;
    $gameVariables.setValue(randomKittenVar, 0);
    console.log("BlockchainPlugin: Set randomKittenVar:", randomKittenVar);
  }

  function initializePlugin() {
    if (!window.DataManager || !DataManager.isDatabaseLoaded() || !$gameSystem) {
      console.warn("BlockchainPlugin: Not ready, retrying...");
      setTimeout(initializePlugin, 50);
      return;
    }
    initializeKittenVar();
    if (!randomKittenVar) {
      console.warn("BlockchainPlugin: randomKittenVar not set, retrying...");
      setTimeout(initializePlugin, 50);
      return;
    }
    console.log("BlockchainPlugin: randomKittenVar:", $gameSystem.randomKittenVar, "Value:", $gameVariables.value($gameSystem.randomKittenVar));
    console.log("BlockchainPlugin: window.ethereum:", !!window.ethereum);
    attachFunctions();
    console.log("BlockchainPlugin: Initialized successfully.");
  }

  // Initialize after Scene_Boot
  const _Scene_Boot_start = Scene_Boot.start.prototype;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    initializePlugin();
    window.ensureBlockchainFunctions();
  };

  function attachFunctions() {
    if (!$gameSystem) {
      console.warn("BlockchainPlugin: $gameSystem not ready, retrying...");
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
      {"type":"event","name":"KittensUpdated","inputs":[{"name":"user","type":"address","indexed":true},{"name":"newValue","type":"uint256","indexed":false}],"anonymous":true},
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
        if ($gameSystem.randomKittenVar) {
          $gameVariables.setValue($gameSystem.randomKittenVar, kittenCount);
          console.log("getKittens: Set varId", $gameSystem.randomKittenVar, "to", kittenCount);
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

    // Patch CanvasTextAlign
    const _Sprite_TextAlign = Sprite.prototype._createTinter;
    Sprite.prototype._createTinter = function() {
      _Sprite_TextAlign.call(this);
      if (this._context) {
        this._context.textAlign = this._context.textAlign || "left";
      }
    };
  }
})();