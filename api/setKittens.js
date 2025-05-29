const ethers = require("ethers");

export default async function handler(req, res) {
  try {
    console.log("setKittens API: Checking GAME_PRIVATE_KEY", { hasKey: !!process.env.GAME_PRIVATE_KEY });
    if (!process.env.GAME_PRIVATE_KEY) {
      console.error("setKittens API: GAME_PRIVATE_KEY missing");
      return res.status(500).json({ error: "Missing GAME_PRIVATE_KEY" });
    }
    let wallet;
    try {
      wallet = new ethers.Wallet(process.env.GAME_PRIVATE_KEY);
      console.log("setKittens API: Wallet address:", wallet.address);
    } catch (error) {
      console.error("setKittens API: Invalid GAME_PRIVATE_KEY", error.message);
      return res.status(500).json({ error: "Invalid GAME_PRIVATE_KEY format" });
    }
    if (req.method !== "POST") {
      console.error("setKittens API: Method not allowed", req.method);
      return res.status(405).json({ error: "Method not allowed" });
    }
    const { kittens, userAddress } = req.body;
    if (!Number.isInteger(kittens) || kittens > 60 || kittens < 0 || !ethers.isAddress(userAddress)) {
      console.error("setKittens API: Invalid input", { kittens, userAddress });
      return res.status(400).json({ error: "Invalid input" });
    }
    const provider = new ethers.JsonRpcProvider("https://sepolia-rpc.scroll.io");
    const signer = wallet.connect(provider);
    const balance = await provider.getBalance(wallet.address);
    console.log("setKittens API: Balance:", ethers.formatEther(balance), "ETH");
    const contract = new ethers.Contract(
      "0xEDDe9fc8ca8668046f9EAf9b64FDc94620518E26",
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
      signer
    );
    console.log("setKittens API: Sending tx", { kittens, userAddress });
    const tx = await contract.setKittens(userAddress, kittens, { gasLimit: 300000 });
    const receipt = await tx.wait();
    console.log("setKittens API: Success", { txHash: tx.hash });
    return res.status(200).json({ txHash: tx.hash });
  } catch (error) {
    console.error("setKittens API Error:", error.message, error.stack);
    return res.status(500).json({ error: error.message });
  }
}