import React, { useContext, createContext } from 'react';
import useSWR from 'swr';
import signin from '@/services/auth/signin';
import signout from '@/services/auth/signout';
import type { ApiContext, User } from '@/types';

type AuthContextType = {
  authUser?: User;
  isLoading: boolean;
  signin: (username: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  mutate: (
    data?: User | Promise<User>,
    shouldRevaliate?: boolean,
  ) => Promise<User | undefined>;
};

type AuthContextProviderProps = {
  context: ApiContext;
  authUser?: User;
};

//認証ユーザーのコンテキストの初期値を設定
const AuthContext = createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
});

//認証ユーザーのコンテキストの現在の値を取得
export const useAuthContext = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
};

/**
 * 認証コンテキストプロバイダー
 * @param params パラメーター
 */
export const AuthContextProvider = (
  props: React.PropsWithChildren<AuthContextProviderProps>,
) => {
  const { context, authUser, children } = props;

  //指定したAPIルートの認証ユーザーを取得
  const { data, error, mutate } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/me`,
  );
  //データを取得できていない＆エラーでもない＝ロード中の状態とする
  const isLoading = !data && !error;

  //サインイン
  const signInInternal = async (username: string, password: string) => {
    //@services/auth/signinを使用して認証を実行(json形式のユーザー情報を返す)
    await signin(context, { username, password });
    await mutate();
  };

  //サインアウト
  const signOutInternal = async () => {
    await signout(context);
    await mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        authUser: data ?? authUser,
        isLoading,
        signin: signInInternal,
        signout: signOutInternal,
        mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
