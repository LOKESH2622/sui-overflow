/**
 * Represents NFT metadata.
 */
export interface NFT {
  /**
   * The name of the NFT.
   */
  name: string;
  /**
   * The description of the NFT.
   */
  description: string;
  /**
   * The URL of the NFT image.
   */
  imageURL: string;
  /**
   * The price of the NFT.
   */
  price: number;
  /**
   * The XP level of the NFT.
   */
  xp: number;
  /**
   * The battle history of the NFT.
   */
  battleHistory: string[];
}

/**
 * Asynchronously retrieves NFT information.
 *
 * @param nftId The id of the NFT to retrieve.
 * @returns A promise that resolves to a NFT object containing name, description, imageURL and price.
 */
export async function getNft(nftId: string): Promise<NFT> {
  // TODO: Implement this by calling an API.

  return {
    name: 'Doge NFT',
    description: 'A very rare Doge NFT.',
    imageURL: 'https://example.com/doge.png',
    price: 1.5,
    xp: 100,
    battleHistory: ['win', 'loss', 'win'],
  };
}

/**
 * Retrieves a list of NFTs.
 * @param query The query to filter NFTs.
 * @returns A promise that resolves to an array of NFT objects.
 */
export async function listNfts(query: string): Promise<NFT[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Doge NFT',
      description: 'A very rare Doge NFT.',
      imageURL: 'https://example.com/doge.png',
      price: 1.5,
      xp: 100,
      battleHistory: ['win', 'loss', 'win'],
    },
    {
      name: 'Pepe NFT',
      description: 'A super rare Pepe NFT.',
      imageURL: 'https://example.com/pepe.png',
      price: 2.0,
      xp: 120,
      battleHistory: ['win', 'win', 'loss'],
    },
  ];
}

/**
 * Buys an NFT.
 *
 * @param nftId The id of the NFT to buy.
 * @param buyerId The id of the buyer.
 * @returns A promise that resolves when the NFT is bought.
 */
export async function buyNft(nftId: string, buyerId: string): Promise<void> {
  // TODO: Implement this by calling an API.
  console.log(`Buying NFT ${nftId} for ${buyerId}`);
}
