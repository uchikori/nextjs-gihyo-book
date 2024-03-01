import { ApiContext, Product } from '@/types';
import { fetcher } from '@/utils';

export type AddProductParams = {
  /**
   * 追加する商品
   */
  product: Omit<Product, 'id'>;
};

/**
 * プロダクトAPI（新規追加）
 * @param context APIコンテキスト
 * @param params 新規追加する商品
 * @returns 新規追加した商品
 */
const AddProduct = async (
  context: ApiContext,
  { product }: AddProductParams,
): Promise<Product> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/, '')}/products`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
};

export default AddProduct;
