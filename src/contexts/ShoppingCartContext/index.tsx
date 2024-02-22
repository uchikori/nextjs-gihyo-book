import React, { useReducer, useContext, createContext } from 'react';
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from './reducers';
import { Product } from '@/types';

type ShoppingCartContextType = {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productID: number) => void;
};

interface ShoppingCartContextProviderProps {
  children?: React.ReactNode;
}

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addProductToCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeProductFromCart: () => {},
});

export const useShoppingCartContext = (): ShoppingCartContextType => {
  return useContext<ShoppingCartContextType>(ShoppingCartContext);
};

/**
 * ショッピングカートコンテキストプロバイダー
 */
export const ShoppingCartContextProvider = ({
  children,
}: ShoppingCartContextProviderProps) => {
  const [cartState, dispatch] = useReducer(shopReducer, []);

  //商品をカートに追加
  const addProductToCart = (product: Product) => {
    dispatch({ type: ADD_PRODUCT, payload: product });
  };

  //商品をカートから削除
  const removeProductFromCart = (product: number) => {
    dispatch({ type: REMOVE_PRODUCT, payload: product });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart: cartState,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
