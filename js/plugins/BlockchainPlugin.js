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
  window.BlockchainPlugin.initialized = false;

  // Initialize kitten variable with persistence
  function initializeKittenVar() {
    if (window.BlockchainPlugin.randomKittenVar) {
      console.log("BlockchainPlugin: randomKittenVar already set:", window.BlockchainPlugin.randomKittenVar);
      return true;
    }
    
    if (!$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: $gameSystem or $gameVariables not ready");
      return false;
    }

    // Check if we have a saved randomKittenVar
    if ($gameSystem.randomKittenVar) {
      window.BlockchainPlugin.randomKittenVar = $gameSystem.randomKittenVar;
      console.log("BlockchainPlugin: Restored randomKittenVar from save:", window.BlockchainPlugin.randomKittenVar);
      return true;
    }

    // Generate new random variable
    do {
      window.BlockchainPlugin.randomKittenVar = Math.floor(Math.random() * 100) + 1;
    } while ([2, 8, 9, 12, 18, 19, 21, 22, 23, 24, 25].includes(window.BlockchainPlugin.randomKittenVar));
    
    $gameSystem.randomKittenVar = window.BlockchainPlugin.randomKittenVar;
    $gameVariables.setValue(window.BlockchainPlugin.randomKittenVar, 0);
    
    console.log("BlockchainPlugin: Generated new randomKittenVar:", window.BlockchainPlugin.randomKittenVar);
    return true;
  }

  // Ensure functions are available
  window.ensureBlockchainFunctions = function() {
    if (!window.BlockchainPlugin.initialized) {
      console.log("BlockchainPlugin: Reinitializing...");
      initializePlugin();
    }
    
    if (!$gameSystem || typeof $gameSystem.getKittens !== "function") {
      console.warn("BlockchainPlugin: Reattaching functions...");
      if ($gameSystem) {
        attachFunctions();
      }
    }
    
    if (!window.BlockchainPlugin.randomKittenVar) {
      initializeKittenVar();
    }
  };

  // Hook Game_System initialization
  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    console.log("BlockchainPlugin: Game_System.initialize called");
    _Game_System_initialize.call(this);
    
    // Ensure randomKittenVar is set
    setTimeout(() => {
      if (!initializeKittenVar()) {
        console.warn("BlockchainPlugin: Failed to initialize in Game_System, will retry later");
      }
    }, 100);
  };

  // Hook Scene_Map start to process pending collections
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    
    // Ensure our system is ready
    window.ensureBlockchainFunctions();
    
    // Restore randomKittenVar if needed
    if ($gameSystem && window.BlockchainPlugin.randomKittenVar && !$gameSystem.randomKittenVar) {
      $gameSystem.randomKittenVar = window.BlockchainPlugin.randomKittenVar;
      console.log("BlockchainPlugin: Restored randomKittenVar in Scene_Map:", window.BlockchainPlugin.randomKittenVar);
    }
    
    // Process pending collections
    const pendingCount = window.BlockchainPlugin.pendingKittenCollections.length;
    if (pendingCount > 0) {
      console.log("BlockchainPlugin: Processing", pendingCount, "pending kitten collections");
      window.BlockchainPlugin.pendingKittenCollections.forEach(() => {
        if ($gameSystem && typeof $gameSystem.collectKitten === "function") {
          $gameSystem.collectKitten();
        }
      });
      window.BlockchainPlugin.pendingKittenCollections = [];
    }
  };

  // Hook Scene_Boot
  const _Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    console.log("BlockchainPlugin: Scene_Boot.create called");
    _Scene_Boot_create.call(this);
    
    // Initialize with retry mechanism
    setTimeout(() => {
      initializePlugin();
    }, 100);
  };

  function initializePlugin() {
    if (!window.DataManager || !DataManager.isDatabaseLoaded() || !$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: System not ready, retrying in 100ms...");
      setTimeout(initializePlugin, 100);
      return false;
    }

    if (!initializeKittenVar()) {
      console.warn("BlockchainPlugin: Failed to initialize kitten var, retrying in 100ms...");
      setTimeout(initializePlugin, 100);
      return false;
    }

    console.log("BlockchainPlugin: Initialization complete");
    console.log("BlockchainPlugin: randomKittenVar:", $gameSystem.randomKittenVar);
    console.log("BlockchainPlugin: Current kitten count:", $gameVariables.value($gameSystem.randomKittenVar));
    console.log("BlockchainPlugin: Web3 available:", !!window.ethereum);
    
    attachFunctions();
    window.BlockchainPlugin.initialized = true;
    return true;
  }

  function attachFunctions() {
    if (!$gameSystem || !$gameVariables) {
      console.warn("BlockchainPlugin: Cannot attach functions - system not ready");
      return;
    }

    const contractAddress = "0xEDDe9fc8ca8668046f9EAf9b64FDc94620518E26";
    const contractABI = [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "KITTENS_REQUIRED",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "REWARD",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "changeReward",
      "inputs": [
        {
          "name": "newReward",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "dailyRewards",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "fundContract",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "gameAddress",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getKittens",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTotalKittens",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lastClaimDay",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "rewardUser",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setGameAddress",
      "inputs": [
        {
          "name": "_gameAddress",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setKittens",
      "inputs": [
        {
          "name": "userAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_value",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "totalKittens",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        {
          "name": "newOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "userKittens",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "DonationReceived",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "KittensUpdated",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newValue",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserRewarded",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ]
    }
  ];

    // Get kittens from blockchain
    $gameSystem.getKittens = async function() {
      if (!window.ethereum) {
        console.error("getKittens: No Web3 provider");
        $gameMessage.add("Please connect wallet first.");
        return 0;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const kittens = await contract.getKittens({ from: userAddress });
        const kittenCount = Number(kittens);
        const localCount = window.BlockchainPlugin.randomKittenVar ? $gameVariables.value(window.BlockchainPlugin.randomKittenVar) : 0;
        console.log("getKittens: Blockchain:", kittenCount, "Local:", localCount);
        return kittenCount;
      } catch (error) {
        console.error("getKittens: Error:", error.message);
        $gameMessage.add(`Error getting kittens: ${error.message}`);
        return 0;
      }
    };

    // Set kittens on blockchain
    $gameSystem.setKittens = async function(kittens) {
      if (!Number.isInteger(kittens) || kittens > 60 || kittens < 0) {
        console.error('setKittens: Invalid count:', kittens);
        $gameMessage.add('Kitten count must be 0-60.');
        return false;
      }
      if (!window.BlockchainPlugin.randomKittenVar) {
        console.error('setKittens: randomKittenVar not set!');
        $gameMessage.add('Error: Game not initialized properly.');
        return false;
      }
      if (!window.ethereum) {
        console.error('setKittens: No Web3 provider');
        $gameMessage.add('Please connect wallet first.');
        return false;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const contract = new ethers.Contract('0xEDDe9fc8ca8668046f9EAf9b64FDc94620518E26', contractABI, provider);

        // Fetch on-chain kittens
        const currentOnChainKittens = Number(await contract.getKittens({ from: userAddress }));
        if (currentOnChainKittens >= 60) {
          console.log('setKittens: Max 60 kittens reached');
          $gameMessage.add('You have 60 kittens! Redeem rewards to collect more.');
          $gameVariables.setValue(window.BlockchainPlugin.randomKittenVar, 0); // Reset local
          return false;
        }

        // Cap kittens to 60
        const maxNewKittens = Math.min(kittens, 60 - currentOnChainKittens);
        if (maxNewKittens < kittens) {
          console.log('setKittens: Capped kittens to', maxNewKittens, 'to stay under 60');
          $gameMessage.add(`Kitten count capped at ${maxNewKittens} to stay under 60.`);
        }

        console.log('setKittens: Setting', maxNewKittens, 'kittens for', userAddress);
        $gameMessage.add('Syncing kittens to blockchain...');
        const response = await fetch('https://rpg-game-sepolia-cats.vercel.app/api/setKittens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kittens: maxNewKittens, userAddress })
        });
        const data = await response.json();
        console.log('setKittens: API Response:', data, 'Status:', response.status);
        if (!response.ok) throw new Error(`API error: ${data.error || response.statusText}`);
        if (data.error) throw new Error(data.error);
        if (!data.txHash) throw new Error('No transaction hash returned');

        // Subtract synced amount from local kittens
        const currentLocalKittens = $gameVariables.value(window.BlockchainPlugin.randomKittenVar);
        const newLocalKittens = Math.max(0, currentLocalKittens - maxNewKittens);
        $gameVariables.setValue(window.BlockchainPlugin.randomKittenVar, newLocalKittens);
        console.log('setKittens: Updated local varId', window.BlockchainPlugin.randomKittenVar, 'to', newLocalKittens, 'after syncing', maxNewKittens);
        $gameMessage.add(`Synced ${maxNewKittens} kittens successfully! Total on-chain: ${currentOnChainKittens + maxNewKittens}`);
        return true;
      } catch (error) {
        console.error('setKittens: Error:', error.message);
        $gameMessage.add(`Error syncing kittens: ${error.message}`);
        return false;
      }
    };
    // Connect wallet
    $gameSystem.connectWallet = async function() {
      if (!window.ethereum) {
        $gameVariables.setValue(12, 0);
        $gameMessage.add("No Web3 wallet detected. Please install MetaMask.");
        return;
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        
        if (network.chainId !== 534351n) {
          $gameMessage.add("Please switch to Scroll Sepolia Testnet (Chain ID: 534351).");
          $gameVariables.setValue(12, 0);
          return;
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        $gameMessage.add(`Wallet connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
        $gameVariables.setValue(12, 1);
        
        console.log("connectWallet: Connected to", address);
      } catch (error) {
        console.error("connectWallet: Error:", error);
        $gameMessage.add(`Connection failed: ${error.message}`);
        $gameVariables.setValue(12, 0);
      }
    };

    // Fund contract (owner only)
    $gameSystem.fundContract = async function(ethAmount) {
      if (!window.ethereum) {
        $gameMessage.add("Please connect wallet first.");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const network = await provider.getNetwork();
        if (network.chainId !== 534351n) {
          $gameMessage.add("Please switch to Scroll Sepolia Testnet.");
          return;
        }

        const currentOwner = await contract.owner();
        if (currentOwner.toLowerCase() !== userAddress.toLowerCase()) {
          $gameMessage.add("Only contract owner can fund the contract.");
          return;
        }

        const amountInWei = ethers.parseEther(ethAmount.toString());
        const tx = await contract.fundContract({ value: amountInWei });
        $gameMessage.add("Funding contract...");
        
        await tx.wait();
        $gameMessage.add(`Successfully funded ${ethAmount} ETH!`);
        console.log("fundContract: Funded", ethAmount, "ETH");
      } catch (error) {
        console.error("fundContract: Error:", error.message);
        $gameMessage.add(`Funding failed: ${error.message}`);
      }
    };

    // Open DApp
    $gameSystem.openDApp = function() {
      window.open("https://your-dapp.vercel.app", "_blank");
    };

    // Sync kittens from blockchain to local
    $gameSystem.syncFromBlockchain = async function() {
      try {
        const blockchainKittens = await this.getKittens();
        if (blockchainKittens > 0 && window.BlockchainPlugin.randomKittenVar) {
          $gameVariables.setValue(window.BlockchainPlugin.randomKittenVar, blockchainKittens);
          $gameMessage.add(`Synced ${blockchainKittens} kittens from blockchain!`);
          console.log("syncFromBlockchain: Synced", blockchainKittens, "kittens");
        }
      } catch (error) {
        console.error("syncFromBlockchain: Error:", error);
        $gameMessage.add("Failed to sync from blockchain.");
      }
    };

    // Sync kittens to blockchain from local
    $gameSystem.syncToBlockchain = async function() {
      if (!window.BlockchainPlugin.randomKittenVar) {
        $gameMessage.add("Game not properly initialized.");
        return;
      }
      
      const localKittens = $gameVariables.value(window.BlockchainPlugin.randomKittenVar);
      await this.setKittens(localKittens);
    };

    console.log("BlockchainPlugin: Functions attached successfully:", {
      getKittens: !!$gameSystem.getKittens,
      setKittens: !!$gameSystem.setKittens,
      connectWallet: !!$gameSystem.connectWallet,
      fundContract: !!$gameSystem.fundContract,
      openDApp: !!$gameSystem.openDApp,
      syncFromBlockchain: !!$gameSystem.syncFromBlockchain,
      syncToBlockchain: !!$gameSystem.syncToBlockchain
    });
  }

  // Start initialization
  console.log("BlockchainPlugin: Starting initialization...");
})();