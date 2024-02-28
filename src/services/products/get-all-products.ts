import type { ApiContext, Category, Condition, Product } from '@/types';
import { fetcher } from '@/utils';

export type GetAllProductsParams = {
  /**
   * 商品カテゴリ
   */
  category?: Category;
  /**
   * 商品状態
   */
  conditions?: Condition[];
  /**
   * 所有するユーザーID
   */
  userId?: number;
  /**
   * ソート対象のキー
   */
  sort?: keyof Omit<Product, 'owner'>;
  /**
   * ソート順
   */
  order?: 'asc' | 'desc';
  /**
   * 取得数
   */
  limit?: number;
  /**
   * ページ数
   */
  page?: number;
};

/**
 * プロダクトAPI（一覧取得）
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns 商品一覧
 */
// eslint-disable-next-line complexity
const getAllProducts = async (
  context: ApiContext,
  {
    category,
    conditions,
    userId,
    sort = 'id',
    order = 'desc',
    limit,
    page,
  }: GetAllProductsParams = {},
): Promise<Product[]> => {
  const path = `${context.apiRootUrl.replace(/\/$/, '')}/products/`;
  const params = new URLSearchParams(); // クエリパラメータを管理するためのオブジェクト

  category && params.append('category', category);
  conditions &&
    conditions.forEach((condition) => params.append('condition', condition));
  userId && params.append('owner.id', `${userId}`);
  page && params.append('_page', `${page}`);
  limit && params.append('_limit', `${limit}`);
  sort && params.append('_sort', sort);
  order && params.append('_order', order);

  const query = params.toString(); // クエリ文字列を生成

  return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default getAllProducts;
