import { ApiContext, User } from '@/types/data';
import { fetcher } from '@/utils';

export type GetUserParams = {
  /**
   * ユーザーID
   */
  id: number;
};

/**
 * ユーザーAPI
 * @param context APIコンテキスト
 * @param params パラメーター
 * @returns ログインユーザー
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams,
): Promise<User> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/, '')}/users/${id}`, {
    headers: {
      Acceppt: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default getUser;
