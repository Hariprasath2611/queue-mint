/** CMS App ID for catalog references */
const CMS_APP_ID = "e593b0bd-b783-45b8-97c2-873d42aacaf4";

/**
 * Buy now - mock implementation
 * @param items - Array of items with collectionId, itemId, and optional quantity
 */
export async function buyNow(
  items: Array<{ collectionId: string; itemId: string; quantity?: number }>
): Promise<void> {
  console.log("Mock buyNow called with items:", items);
  return Promise.resolve();
}

/**
 * Hook providing mock eCommerce API
 */
export function useEcomService() {
  const isCartAvailable = false;

  const addToCart = async (
    items: Array<{ collectionId: string; itemId: string; quantity?: number }>
  ): Promise<void> => {
    console.log("Mock addToCart called with items:", items);
    return Promise.resolve();
  };

  const checkout = async (): Promise<void> => {
    console.log("Mock checkout called");
    return Promise.resolve();
  };

  return {
    isCartAvailable,
    addToCart,
    checkout,
  };
}
