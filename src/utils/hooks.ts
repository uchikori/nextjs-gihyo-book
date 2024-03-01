import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

export const useAuthGuard = (): void => {
  const router = useRouter();
  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    //リーディング中でなく、認証ユーザーが存在しない場合
    if (!isLoading && !authUser) {
      //現在のパスを取得
      const currentPath = router.pathname;

      //ページ遷移
      router.push({
        pathname: '/signin', //サインインページへ
        query: {
          redirect_to: currentPath, //サインイン後に元のページへリダイレクト
        },
      });
    }
  }, [router, authUser, isLoading]);
};
