import CartProduct from '@/components/organisms/CartProduct';
import { useGlobalSpinnerActionContext } from '@/contexts/GlobalSpinnerContext';
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';
import purchase from '@/services/purchase/purchase';
import { ApiContext } from '@/types';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
};

/**
 * カートコンテナ
 */
const CartContainer = () => {
  //スピナーの表示状態を更新するための関数を取得(boolean)
  const setIsGlobalSpinner = useGlobalSpinnerActionContext();
  const { cart, removeProductFromCart } = useShoppingCartContext();

  //削除ボタンを押した際のアクション
  const handleRemoveButtonClick = (id: number) => {
    //useShoppingCartContextのremoveProductFromCartにidを渡して実行
    removeProductFromCart(id);
  };

  //購入ボタンを押したときのアクション(非同期処理)
  const handleBuyButtonClick = async (id: number) => {
    try {
      //スピナーを表示
      setIsGlobalSpinner(true);
      //API呼び出し
      await purchase(context, { productId: id });
      window.alert('購入しました');
      //商品を削除
      removeProductFromCart(id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
    } finally {
      //スピナーを非表示
      setIsGlobalSpinner(false);
    }
  };

  return (
    <>
      {cart.map((item) => {
        return (
          <CartProduct
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            onRemoveButtonClick={handleRemoveButtonClick}
            onBuyButtonClick={handleBuyButtonClick}
          />
        );
      })}
    </>
  );
};

export default CartContainer;
