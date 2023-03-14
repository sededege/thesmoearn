import Moralis from "moralis";

export default async function handler(req, res) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  const { network, address } = req.body;

  try {
    const response = await Moralis.Web3API.token.getNFTMetadata({
      network: network,
      address: address,
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
}


