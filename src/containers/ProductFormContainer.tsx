import ProductForm, {
  ProductFormData,
} from '@/components/organisms/ProductForm';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGlobalSpinnerActionContext } from '@/contexts/GlobalSpinnerContext';
import AddProduct from '@/services/products/add-product';
import { ApiContext, Product } from '@/types';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
};

interface ProductFormContainerProps {
  /**
   * 商品が保存された時のイベントハンドラ
   */
  onSave?: (error?: Error, Product?: Product) => void;
}

/**
 * 商品フォームコンテナ
 */
const ProductFormContainer = (props: ProductFormContainerProps) => {
  const { onSave } = props;

  const { authUser } = useAuthContext();
  const setIsGlobalSpinner = useGlobalSpinnerActionContext();

  const handleSave = async (data: ProductFormData) => {
    if (!authUser) {
      return;
    }

    const product = {
      image: data.image,
      title: data.title,
      description: data.description,
      category: data.category,
      condition: data.condition,
      price: Number(data.price),
      imageUrl: '/products/shoes/feet-1840619_1920.jpeg',
      blurDataUrl: '',
      owner: authUser,
    };

    console.log(product);

    try {
      setIsGlobalSpinner(true);
      const ret = await AddProduct(context, { product });
      console.log(ret);
      onSave && onSave(undefined, ret);
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
        onSave && onSave(err);
      }
    } finally {
      setIsGlobalSpinner(false);
    }
  };

  return <ProductForm onProductSave={handleSave} />;
};
export default ProductFormContainer;
