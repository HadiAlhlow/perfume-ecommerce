'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  clear: () => void;
  count: () => number;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        if (!items.find((i) => i.productId === item.productId)) {
          set({ items: [...items, item] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },
      toggleItem: (item) => {
        const isInWishlist = get().isInWishlist(item.productId);
        if (isInWishlist) {
          get().removeItem(item.productId);
        } else {
          get().addItem(item);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },
      clear: () => set({ items: [] }),
      count: () => get().items.length,
    }),
    {
      name: 'wishlist-storage',
    }
  )
);


