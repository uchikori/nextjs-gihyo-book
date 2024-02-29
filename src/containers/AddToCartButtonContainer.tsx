import Button from '@/components/atoms/Button';
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';
import { Product } from '@/types';

interface AddToCartButtonContainerProps {
  /**
   * 追加される商品
   */
  product: Product;
  /**
   * 追加ボタンを押したときのイベントハンドラ
   */
  onAddToCartButtonClick?: (product: Product) => void;
}

/**
 * カート追加ボタンコンテナ
 */
const AddToCartButtonContainer = (props: AddToCartButtonContainerProps) => {
  const { product, onAddToCartButtonClick } = props;

  //コンテキストから現在のカートの状態と商品をカートに追加するための関数を取得
  const { cart, addProductToCart } = useShoppingCartContext();
  const handleAddToCartButtonClick = () => {
    const productId = Number(product.id);
    const result = cart.findIndex((v) => v.id === productId);

    if (result === -1) {
      addProductToCart(product);
    }

    onAddToCartButtonClick && onAddToCartButtonClick(product);
  };

  return (
    <Button
      $width={{ base: '100%', md: '400px' }}
      $height="66px"
      onClick={handleAddToCartButtonClick}
    >
      カートに追加
    </Button>
  );
};

export default AddToCartButtonContainer;
