import { ApiContext } from '@/types/data';
import { fetcher } from '@/utils';

/**
 * 認証API(サインイン)
 * @param context APIコンテキスト
 * @returns ログインユーザー
 */
const signout = async (context: ApiContext): Promise<{ message: string }> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signout`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export default signout;
