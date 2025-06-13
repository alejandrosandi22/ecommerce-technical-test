import {
  addToCart as addToCartRequest,
  clearCartOnServer,
  getCart,
  removeFromCart,
  updateCartQuantity,
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
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: async (item) => {
        const state = get();
        const existing = state.items.find(
          (i) => i.productId === item.productId,
        );

        let updatedItems: CartItem[];

        if (existing) {
          const newQuantity = existing.quantity + item.quantity;

          await updateCartQuantity(item.productId, newQuantity);

          updatedItems = state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: newQuantity }
              : i,
          );
        } else {
          await addToCartRequest(item.productId);

          updatedItems = [...state.items, item];
        }

        const totalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      removeFromCart: async (productId) => {
        await removeFromCart(productId);
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

      incrementQuantity: async (productId) => {
        const state = get();
        const item = state.items.find((i) => i.productId === productId);
        if (!item) return;

        const newQuantity = item.quantity + 1;
        await updateCartQuantity(productId, newQuantity);

        set(() => {
          const items = state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: newQuantity } : i,
          );
          const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );
          return { items, totalItems, totalPrice };
        });
      },

      decrementQuantity: async (productId) => {
        const state = get();
        const item = state.items.find((i) => i.productId === productId);
        if (!item) return;

        const newQuantity = item.quantity - 1;

        if (newQuantity <= 0) {
          await removeFromCart(productId);
        } else {
          await updateCartQuantity(productId, newQuantity);
        }

        set(() => {
          const items = state.items
            .map((i) =>
              i.productId === productId ? { ...i, quantity: newQuantity } : i,
            )
            .filter((i) => i.quantity > 0);

          const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0,
          );
          return { items, totalItems, totalPrice };
        });
      },

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
