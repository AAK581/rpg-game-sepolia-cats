(function() {
  let isInitialized = false;

  // Initialize on DataManager setup
  const _DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.call(this);
    if (!isInitialized) initializePlugin();
  };

  function initializePlugin() {
    if (!window.DataManager || !DataManager.isDatabaseLoaded()) {
      console.warn("BlockchainPlugin: DataManager not ready, retrying...");
      setTimeout(initializePlugin, 100);
      return;
    }
    if (!$gameSystem) {
      console.warn("BlockchainPlugin: $gameSystem not ready, retrying...");
      setTimeout(initializePlugin, 100);
      return;
    }
    if (isInitialized) {
      console.log("BlockchainPlugin: Already initialized, skipping.");
      return;
    }
    if (typeof ethers === "undefined") {
      console.error("BlockchainPlugin: Ethers.js not loaded!");
      $gameMessage.add("Error: Ethers.js failed to load. Please refresh.");
      return;
    }
    if (!$gameSystem.randomKittenVar) {
      let randomKittenVar;
      do {
        randomKittenVar = Math.floor(Math.random() * 100) + 1;
      } while ([2, 8, 9, 12, 18, 19, 21, 22, 23, 24, 25].includes(randomKittenVar));
      $gameSystem.randomKittenVar = randomKittenVar;
      $gameVariables.setValue(randomKittenVar, 0);
      console.log("BlockchainPlugin: Set randomKittenVar:", randomKittenVar);
    }
    console.log("BlockchainPlugin: randomKittenVar:", $gameSystem.randomKittenVar, "Value:", $gameVariables.value($gameSystem.randomKittenVar));
    console.log("BlockchainPlugin: window.ethereum:", !!window.ethereum);
    try {
      attachFunctions();
      isInitialized = true;
      console.log("BlockchainPlugin: Initialized successfully.");
    } catch (error) {
      console.error("BlockchainPlugin: Initialization failed:", error.message);
      $gameMessage.add("Error: Plugin initialization failed.");
    }
  }

  function attachFunctions() {
    const contractAddress = "0xFee91cdC10A1663d69d6891d8b6621987aACe2EF";
    const contractABI = [
      {
        type: "function",
        name: "getKittens",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "setKittens",
        inputs: [
          { name: "userAddress", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        outputs: [],
        stateMutability: "nonpayable"
      },
      {
        type: "function",
        name: "fundContract",
        inputs: [],
        outputs: [],
        stateMutability: "payable"
      },
      {
        type: "function",
        name: "rewardUser",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
      },
      {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [{ name: "", type: "address" }],
        stateMutability: "view"
      },
      {
        type: "event",
        name: "KittensUpdated",
        inputs: [
          { name: "user", type: "address", indexed: true },
          { name: "newValue", type: "uint256", indexed: false }
        ],
        anonymous: true
      },
      {
        type: "event",
        name: "UserRewarded",
        inputs: [
          { name: "user", type: "address", indexed: true },
          { name: "amount", type: "uint256", indexed: false }
        ],
        anonymous: false
      },
      {
        type: "event",
        name: "DonationReceived",
        inputs: [
          { name: "donor", type: "address", indexed: true },
          { name: "amount", type: "uint256", indexed: false }
        ],
        anonymous: false
      }
    ];

    // Attach getKittens
    Object.defineProperty($gameSystem, "getKittens", {
      value: async function() {
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
      },
      writable: true,
      configurable: true
    });

    // Attach setKittens
    Object.defineProperty($gameSystem, "setKittens", {
      value: async function(kittens) {
        if (!Number.isInteger(kittens) || kittens > 60 || kittens < 0) {
          console.error("setKittens: Invalid count:", kittens);
          $gameMessage.add("Kitten count must be 0-60.");
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
      },
      writable: true,
      configurable: true
    });

    // Attach connectWallet
    Object.defineProperty($gameSystem, "connectWallet", {
      value: async function() {
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
      },
      writable: true,
      configurable: true
    });

    // Attach fundContract
    Object.defineProperty($gameSystem, "fundContract", {
      value: async function(ethAmount) {
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
          console.error("fundContract:", error);
          $gameMessage.add(`Error: ${error.message}`);
        }
      },
      writable: true,
      configurable: true
    });

    // Attach openDApp
    Object.defineProperty($gameSystem, "openDApp", {
      value: function() {
        window.open("https://your-dapp.vercel.app", "_blank");
      },
      writable: true,
      configurable: true
    });

    console.log("BlockchainPlugin: Functions attached:", {
      getKittens: !!$gameSystem.getKittens,
      setKittens: !!$gameSystem.setKittens,
      connectWallet: !!$gameSystem.connectWallet,
      fundContract: !!$gameSystem.fundContract,
      openDApp: !!$gameSystem.openDApp
    });
  }
})();