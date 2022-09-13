import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Product } from './interface';

interface State {
  productsOnCart: Product[];
  qty: number[];
  totalPrice: number;
  addProductToCart: (product: Product, qt: number) => void;
  deleteProductOnCart: (index: number) => void;
  modifyQty: (qt: number, index: number, options: 'plus' | 'minus') => void;
}

interface loadState {
  cart: boolean;
  setCart: (bool: boolean) => void;
  manualSearch: boolean;
  setManualSearch: (bool: boolean) => void;
}

export const useLoadStore = create<loadState>()(
  devtools((set) => ({
    manualSearch: false,
    setManualSearch: (bool) => set((state) => ({ manualSearch: bool })),
    cart: false,
    setCart: (bool) => set((state) => ({ cart: bool })),
  }))
);

export const useStore = create<State>()(
  devtools(
    persist((set, get) => ({
      productsOnCart: [],
      totalPrice: 0,
      qty: [],
      addProductToCart: (product, qt) => {
        set((state) => ({
          productsOnCart: [...state.productsOnCart, product],
          qty: [...state.qty, qt],
          totalPrice: state.totalPrice + qt * product.price,
        }));
      },
      deleteProductOnCart: (index) => {
        set((state) => ({
          totalPrice:
            state.totalPrice -
            state.qty[index] * state.productsOnCart[index].price,
          productsOnCart: state.productsOnCart
            .slice(0, index)
            .concat(
              state.productsOnCart.slice(index + 1, state.productsOnCart.length)
            ),
          qty: state.qty
            .slice(0, index)
            .concat(state.qty.slice(index + 1, state.qty.length)),
        }));
      },
      modifyQty: (qt, index, options) => {
        const arr = get().qty;
        if (options === 'plus') {
          arr[index] += qt;
          set((state) => ({
            qty: arr,
            productsOnCart: [...state.productsOnCart],
            totalPrice:
              state.totalPrice + qt * state.productsOnCart[index].price,
          }));
          return;
        } else if (options === 'minus') {
          if (arr[index] !== 1) {
            arr[index] -= qt;
            set((state) => ({
              qty: arr,
              productsOnCart: [...state.productsOnCart],
              totalPrice:
                state.totalPrice - qt * state.productsOnCart[index].price,
            }));
          }
        }
      },
    }))
  )
);
