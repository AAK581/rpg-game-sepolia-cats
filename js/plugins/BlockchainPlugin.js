(function() {
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    _Scene_Boot_create.call(this);
    initializePlugin();
  };

  function initializePlugin() {
    if (!$gameSystem) {
      console.error("BlockchainPlugin: $gameSystem is not initialized!");
      return;
    }
    if (typeof ethers === "undefined") {
      console.error("BlockchainPlugin: Ethers.js is not loaded!");
      $gameMessage.add("Error: Ethers.js failed to load. Please refresh the game.");
      return;
    }
    let randomKittenVar;
    do {
      randomKittenVar = Math.floor(Math.random() * 100) + 1;
    } while ([2, 8, 9, 12, 18, 19, 21, 22, 23, 24, 25].includes(randomKittenVar));
    $gameSystem.randomKittenVar = randomKittenVar;
    $gameVariables.setValue(randomKittenVar, 0);
    console.log("BlockchainPlugin: Set kitten variable ID:", randomKittenVar);
    console.log("BlockchainPlugin: Initializing...");
    console.log("BlockchainPlugin: window.ethereum available:", !!window.ethereum);
    attachFunctions();
    console.log("BlockchainPlugin: Initialized successfully.");
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
        anonymous: false
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

    Object.defineProperty($gameSystem, "openDApp", {
      value: function() {
        window.open("https://your-dapp.vercel.app", "_blank");
      },
      writable: true,
      configurable: true
    });

    Object.defineProperty($gameSystem, "connectWallet", {
      value: async function() {
        if (!window.ethereum) {
          //$gameMessage.add("No Web3 provider detected. Please install MetaMask.");
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
          console.error("connectWallet: Error:", error);
          $gameMessage.add(`Error: ${error.message}`);
          $gameVariables.setValue(12, 0);
        }
      },
      writable: true,
      configurable: true
    });

    Object.defineProperty($gameSystem, "setKittens", {
      value: async function(kittens) {
        if (kittens > 60 || kittens < 0) {
          $gameMessage.add("Kitten count must be between 0 and 60.");
          return;
        }
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();
          const response = await fetch("https://your-game.vercel.app/api/setKittens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kittens, userAddress })
          });
          const { txHash, error } = await response.json();
          if (error) throw new Error(error);
          $gameMessage.add(`Kittens updated to ${kittens}! Tx: ${txHash}`);
        } catch (error) {
          console.error("setKittens: Error:", error);
          $gameMessage.add(`Error: ${error.message}`);
        }
      },
      writable: true,
      configurable: true
    });

    Object.defineProperty($gameSystem, "getKittens", {
      value: async function() {
        if (!window.ethereum) {
          $gameMessage.add("No Web3 provider detected. Please connect wallet.");
          return 0;
        }
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();
          const contract = new ethers.Contract(contractAddress, contractABI, provider);
          const kittens = await contract.getKittens({ from: userAddress });
          $gameMessage.add(`Your kittens: ${kittens.toString()}`);
          return Number(kittens);
        } catch (error) {
          console.error("getKittens: Error:", error);
          $gameMessage.add(`Error: ${error.message}`);
          return 0;
        }
      },
      writable: true,
      configurable: true
    });

    Object.defineProperty($gameSystem, "fundContract", {
      value: async function(ethAmount) {
        if (!window.ethereum) {
          $gameMessage.add("No Web3 provider detected. Please connect wallet.");
          return;
        }
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          const network = await provider.getNetwork();
          if (network.chainId !== 534351n) {
            $gameMessage.add("Please switch to Scroll Sepolia network.");
            return;
          }
          const currentOwner = await contract.owner();
          if (currentOwner.toLowerCase() !== userAddress.toLowerCase()) {
            $gameMessage.add("Only the contract's owner can fund this faucet.");
            return;
          }
          const amountInWei = ethers.parseEther(ethAmount.toString());
          const tx = await contract.fundContract({ value: amountInWei });
          $gameMessage.add("Funding contract... Please wait.");
          await tx.wait();
          $gameMessage.add(`Contract funded with ${ethAmount} Scroll Sepolia ETH!`);
        } catch (error) {
          console.error("fundContract: Error:", error);
          $gameMessage.add(`Error: ${error.message}`);
        }
      },
      writable: true,
      configurable: true
    });
  }

  const _Scene_Map_create = Scene_Map.prototype.create;
  Scene_Map.prototype.create = function() {
    _Scene_Map_create.call(this);
    attachFunctions();
  };
})();