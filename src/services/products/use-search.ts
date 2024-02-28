import useSWR from 'swr';
import type { ApiContext, Product, Category, Condition } from '@/types';

// 検索条件を指定するためのプロパティ
export type UseSearchProps = {
  category?: Category; // 商品のカテゴリ
  conditions?: Condition[]; // 商品の条件（複数可）
  userId?: number; // ユーザーID
  sort?: keyof Omit<Product, 'owner'>; // ソート対象のプロパティ
  order?: 'asc' | 'desc'; // ソート順（昇順 or 降順）
  initial?: Product[]; // 初期状態の商品リスト
};

// プロダクトAPI（一覧取得）のカスタムフック
export type UseSearch = {
  products: Product[]; // 取得した商品リスト
  isLoading: boolean; // データ取得中かどうかのフラグ
  isError: boolean; // エラーが発生したかどうかのフラグ
};

/**
 * 商品を検索するためのカスタムフック
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns 商品一覧とAPI呼び出しの状態
 */
const useSearch = (
  context: ApiContext,
  {
    category,
    userId,
    conditions,
    initial,
    sort = 'id', // デフォルトのソート対象は'id'
    order = 'desc', // デフォルトのソート順は降順
  }: UseSearchProps = {}, // デフォルト引数は空のオブジェクト
): UseSearch => {
  const path = `${context.apiRootUrl.replace(/\/$/, '')}/products/`;
  const params = new URLSearchParams(); // クエリパラメータを管理するためのオブジェクト

  // クエリパラメータに値があれば追加
  category && params.append('category', category);
  userId && params.append('owner.id', `${userId}`);
  conditions &&
    conditions.forEach((condition) => params.append('condition', condition));
  sort && params.append('_sort', sort);
  order && params.append('_order', order);

  const query = params.toString(); // クエリ文字列を生成
  const { data, error } = useSWR<Product[]>(
    query.length > 0 ? `${path}?${query}` : path, // クエリ文字列があればそれを含めてAPI呼び出し
  );

  return {
    products: data ?? initial ?? [], // 取得した商品データ、初期データがなければ空の配列
    isLoading: !error && !data, // エラーもデータもなければロード中
    isError: !!error, // エラーがあればエラー
  };
};

export default useSearch; // カスタムフックをエクスポート
