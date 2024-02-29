import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BreadcrumbItem from '@/components/atoms/BreadcrumbItem';
import Separator from '@/components/atoms/Separator';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import Layout from '@/components/templates/Layout';
import UserProductCardListContainer from '@/containers/UserProductCardListContainer';
import UserProfileContainer from '@/containers/UserProfileContainer';
import getAllProducts from '@/services/products/get-all-products';
import getAllUsers from '@/services/users/get-all-users';
import getUser from '@/services/users/get-user';
import type { ApiContext } from '@/types';

type UserPageProps = InferGetServerSidePropsType<typeof getStaticProps>;

const UserPage: NextPage<UserPageProps> = (props: UserPageProps) => {
  const { id, user, products } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent={'center'}
      >
        <Box width="1180px">
          <Box marginBottom={2}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/">TOP</Link>
              </BreadcrumbItem>
              {user && <BreadcrumbItem>{user.username}</BreadcrumbItem>}
            </Breadcrumb>
          </Box>
          <Box>
            <Box marginBottom={1}>
              {/* ユーザープロファイルコンテナ
              ユーザー情報を表示する。useUSerで常に最新のデータを取得する
              */}
              <UserProfileContainer userId={id} user={user} />
            </Box>
            <Box marginBottom={1}>
              <Separator />
              {/* 
              ユーザー商品カードリストコンテナ
              ユーザーが所持する商品カードリストを表示するuseSearchで常に最新のデータを取得する
              */}
              <UserProductCardListContainer userId={id} products={products} />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

/**
 * 全ユーザーを取得しidからURLを生成
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  };

  //getAllUsers関数にAPIコンテキストを渡してユーザー一覧を取得
  const users = await getAllUsers(context);
  //URLのパスとfallBackを返す(生成されるページ分)
  return {
    paths: users.map((user) => {
      return `/users/${user.id}`;
    }),
    fallback: true,
  };
};

/**
 * 動的なデータを事前に取得し、ページコンポーネントに渡す
 * @params ページに渡されるユーザーID
 */
export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  };

  if (!params) {
    throw new Error('params is undefined');
  }

  const userId = Number(params.id);
  const [user, products] = await Promise.all([
    getUser(context, { id: userId }),
    getAllProducts(context, { userId }),
  ]);

  return {
    props: {
      id: userId,
      user,
      products: products ?? [],
    },
    revalidate: 10,
  };
};

export default UserPage;
