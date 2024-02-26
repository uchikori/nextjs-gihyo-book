import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import AppLogo from '@/components/atoms/AppLogo';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import Layout from '@/components/templates/Layout';
import SigninFormContainer from '@/containers/SinginFormContainer';

const SigninPage: NextPage = () => {
  const router = useRouter();
  //認証後のイベントハンドラ
  const handleSignin = async (err?: Error) => {
    if (!err) {
      //サインインに成功しクエリが指定されている場合はそのURLに移動
      //デフォルトはTOPページに移動
      const redirectTo = (router.query['redirect_to'] as string) ?? '/';

      console.log('Redirecting', redirectTo);
      await router.push(redirectTo);
    }
  };

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent={'center'}
      >
        <Flex
          width="400px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box marginBottom={2}>
            <AppLogo />
          </Box>
          <Box width="100%">
            {/* サインインフォームコンテナ
            SigninFormのユーザー名・パスワードから認証ＡＰＩを呼び出し、
            onSigninイベントハンドラを呼び出す
             */}
            <SigninFormContainer onSignin={handleSignin} />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default SigninPage;
