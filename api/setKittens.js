const ethers = require("ethers");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.error("setKittens API: Method not allowed", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { kittens, userAddress } = req.body;
  if (!Number.isInteger(kittens) || kittens > 60 || kittens < 0 || !ethers.isAddress(userAddress)) {
    console.error("setKittens API: Invalid input", { kittens, userAddress });
    return res.status(400).json({ error: "Invalid input: kittens must be 0-60, userAddress must be valid" });
  }

  try {
    const provider = new ethers.JsonRpcProvider("https://sepolia-rpc.scroll.io");
    if (!process.env.GAME_PRIVATE_KEY) {
      console.error("setKittens API: GAME_PRIVATE_KEY not set");
      throw new Error("Server configuration error: Missing GAME_PRIVATE_KEY");
    }
    const wallet = new ethers.Wallet(process.env.GAME_PRIVATE_KEY, provider);
    const balance = await provider.getBalance(wallet.address);
    console.log("setKittens API: Wallet balance:", ethers.formatEther(balance), "ETH");
    const contract = new ethers.Contract(
      "0xFee91cdC10A1663d69d6891d8b6621987aACe2EF",
      [
        {
          type: "function",
          name: "setKittens",
          inputs: [
            { name: "userAddress", type: "address" },
            { name: "_value", type: "uint256" }
          ],
          outputs: [],
          stateMutability: "nonpayable"
        }
      ],
      wallet
    );
    console.log("setKittens API: Sending tx", { kittens, userAddress });
    const tx = await contract.setKittens(userAddress, kittens, { gasLimit: 150000 });
    await tx.wait();
    console.log("setKittens API: Success", { txHash: tx.hash });
    res.status(200).json({ txHash: tx.hash });
  } catch (error) {
    console.error("setKittens API Error:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
}