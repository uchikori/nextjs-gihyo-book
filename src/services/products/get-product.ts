import type { ApiContext, Product } from '@/types';
import { fetcher } from '@/utils';

export type GetProductParams = {
  /**
   * 取得する商品のID
   */
  id: number;
};

/**
 * プロダクトAPI（個別取得）
 * @param context APIコンテキスト
 * @param params 商品ID
 * @returns 商品
 */

const getProduct = async (
  context: ApiContext,
  { id }: GetProductParams,
): Promise<Product> => {
  const path = `${context.apiRootUrl.replace(/\/$/, '')}/products/${id}`;
  return await fetcher(path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default getProduct;
