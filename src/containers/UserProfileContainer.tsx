import UserProfile from '@/components/organisms/UserProfile';
import useUser from '@/services/users/use-user';
import type { ApiContext, User } from '@/types';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
};

interface UserProfileContainerProps {
  /**
   * ユーザーID
   */
  userId: number;
  /**
   * 初期表示するユーザー
   */
  user?: User;
}

/**
 * ユーザープロファイルコンテナ
 */
const UserProfileContainer = (props: UserProfileContainerProps) => {
  const { userId, user } = props;

  //useUserでfetchしたユーザー情報を変数uに代入
  const { user: u } = useUser(context, { id: userId, initial: user });

  //useUserはuseSWRを使用しているため非同期で処理中であればLoadingを表示
  if (!u) return <div>Loading...</div>;

  return (
    <UserProfile
      userName={`${u.username}(${u.displayName})`}
      profileImageUrl={u.profileImageUrl}
      numberOfProducts={100}
      description={u.description}
    />
  );
};

export default UserProfileContainer;
