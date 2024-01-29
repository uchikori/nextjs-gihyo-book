import { ApiContext, User } from '@/types/data';
import { fetcher } from '@/utils';

export type SignParams = {
  /**
   * ユーザー名
   * サンプルユーザーのユーザー名は"user"
   */
  username: string;
  /**
   * パスワード
   * サンプルユーザーのパスワードは"password"
   */
  password: string;
};

/**
 * 認証API(サインイン)
 * @param context APIコンテキスト
 * @param params パラメーター
 * @returns ログインユーザー
 */
const singin = async (
  context: ApiContext,
  params: SignParams,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
    {
      method: 'POST',
      headers: {
        Acceppt: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
};

export default singin;
