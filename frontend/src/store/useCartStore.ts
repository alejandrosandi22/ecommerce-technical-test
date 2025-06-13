import {
  clearCartOnServer,
  getCart,
  removeFromCart as removeFromCartApi,
} from '@/services/cartService';
import { getProductById } from '@/services/productService';
import type { CartItem } from '@/types/cart';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
  clearServerCart: () => void;
  loadCartFromServer: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId,
          );

          let updatedItems: CartItem[];

          if (existing) {
            updatedItems = state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            );
          } else {
            updatedItems = [...state.items, item];
          }

          const totalItems = updatedItems.reduce(
            (sum, i) => sum + i.quantity,
            0,
          );

          const totalPrice = updatedItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );

          return { items: updatedItems, totalItems, totalPrice };
        }),

      removeFromCart: async (productId) => {
        await removeFromCartApi(productId);
        set((state) => {
          const items = state.items.filter(
            (item) => item.productId !== productId,
          );
          const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );
          return { items, totalItems, totalPrice };
        });
      },

      incrementQuantity: (productId) =>
        set((state) => {
          const items = state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );

          const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

          const totalPrice = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );

          return { items, totalItems, totalPrice };
        }),

      decrementQuantity: (productId) =>
        set((state) => {
          const items = state.items
            .map((item) =>
              item.productId === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0);

          const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

          const totalPrice = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );

          return { items, totalItems, totalPrice };
        }),

      clearCart: async () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      clearServerCart: async () => {
        await clearCartOnServer();
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
      loadCartFromServer: async () => {
        const cartItems = await getCart();

        const validItems = cartItems.filter((item) => item.productId !== null);

        const detailedItems = await Promise.all(
          validItems.map(async (item) => {
            const product = await getProductById(item.productId!);
            return {
              productId: item.productId!,
              quantity: item.quantity,
              name: product.name,
              price: product.price,
              image: product.image,
            };
          }),
        );

        const totalItems = detailedItems.reduce(
          (sum, i) => sum + i.quantity,
          0,
        );
        const totalPrice = detailedItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );

        set({ items: detailedItems, totalItems, totalPrice });
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);
