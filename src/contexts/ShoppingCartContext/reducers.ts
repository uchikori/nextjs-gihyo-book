import { Product } from '@/types';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

type ShopReducerAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: number };

/**
 * 商品追加アクション
 * @param product 商品
 * @param state 現在の状態
 * @param returns 次の状態
 */
const addProductToCart = (product: Product, state: Product[]) => {
  return [...state, product];
};

/**
 * 商品削除アクション
 * @param productId 商品のID
 * @param state 現在の状態
 * @returns 次の状態
 */
const removeProductFromCart = (productId: number, state: Product[]) => {
  //削除した商品のindex番号を取得(商品カートに入っているIDと引数で受け取ったproductIDが同じもののインデックス番号を取得)
  const removedItemIndex = state.findIndex((item) => item.id === productId);

  //削除対象のindex番号から数えて1つ目を削除
  state.splice(removedItemIndex, 1);
  //削除後の配列を返却
  return state;

  // const newState = [...state];
  // newState.splice(removedItemIndex, 1);
  // return newState;
};

/**
 * ショッピングカートのReducer
 * @param state 現在の状態
 * @param action アクション
 * @returns 次の状態
 */
export const shopReducer: React.Reducer<Product[], ShopReducerAction> = (
  state: Product[],
  action: ShopReducerAction,
) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.payload, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.payload, state);
    default:
      return state;
  }
};
