const ethers = require("ethers");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      console.error("setKittens API: Method not allowed", req.method);
      return res.status(405).json({ error: "Method not allowed" });
    }
    const { kittens, userAddress } = req.body;
    if (!Number.isInteger(kittens) || kittens > 60 || kittens < 0 || !ethers.isAddress(userAddress)) {
      console.error("setKittens API: Invalid input", { kittens, userAddress });
      return res.status(400).json({ error: "Invalid input: kittens must be 0-60, userAddress must be valid" });
    }

    console.log("setKittens API: Environment check", { hasKey: !!process.env.GAME_PRIVATE_KEY });
    if (!process.env.GAME_PRIVATE_KEY) {
      console.error("setKittens API: GAME_PRIVATE_KEY not set");
      return res.status(500).json({ error: "Server configuration error: Missing GAME_PRIVATE_KEY" });
    }

    const provider = new ethers.JsonRpcProvider("https://sepolia-rpc.scroll.io");
    const wallet = new ethers.Wallet(process.env.GAME_PRIVATE_KEY, provider);
    const balance = await provider.getBalance(wallet.address);
    console.log("setKittens API: Wallet", wallet.address, "Balance:", ethers.formatEther(balance), "ETH");
    if (balance < ethers.parseEther("0.002")) {
      console.error("setKittens API: Insufficient balance", ethers.formatEther(balance));
      return res.status(500).json({ error: "Insufficient server wallet balance" });
    }

    const contract = new ethers.Contract(
      "0xFee91cdC10A1663d69d6891d8b6621987aACe2EF",
      [{
        type: "function",
        name: "setKittens",
        inputs: [
          { name: "userAddress", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        outputs: [],
        stateMutability: "nonpayable"
      }],
      wallet
    );

    console.log("setKittens API: Sending tx", { kittens, userAddress });
    const gasLimit = 300000;
    const gasPrice = (await provider.getGasPrice()) * 3n;
    const tx = await contract.setKittens(userAddress, kittens, { gasLimit, gasPrice });
    const receipt = await tx.wait();
    console.log("setKittens API: Success", { txHash: tx.hash });
    return res.status(200).json({ txHash: tx.hash });
  } catch (error) {
    console.error("setKittens API Error:", error.message, error.stack);
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
}