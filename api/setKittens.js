const ethers = require("ethers");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { kittens, userAddress } = req.body;
  if (!Number.isInteger(kittens) || kittens > 60 || kittens < 0 || !ethers.isAddress(userAddress)) {
    return res.status(400).json({ error: "Invalid input: kittens must be an integer between 0 and 60, and userAddress must be valid" });
  }

  const provider = new ethers.JsonRpcProvider("https://sepolia-rpc.scroll.io");
  const wallet = new ethers.Wallet(process.env.GAME_PRIVATE_KEY, provider);
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

  try {
    const tx = await contract.setKittens(userAddress, kittens, { gasLimit: 100000 });
    await tx.wait();
    res.status(200).json({ txHash: tx.hash });
  } catch (error) {
    console.error("setKittens API Error:", error);
    res.status(500).json({ error: error.message });
  }
}