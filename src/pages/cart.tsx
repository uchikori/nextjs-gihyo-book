import { NextPage } from 'next';
import Link from 'next/link';
import BreadcrumbItem from '@/components/atoms/BreadcrumbItem';
import Text from '@/components/atoms/Text';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import Layout from '@/components/templates/Layout';
import CartContainer from '@/containers/CartContainer';
import { useAuthGuard } from '@/utils/hooks';

const CartPage: NextPage = () => {
  useAuthGuard();
  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent={'center'}
      >
        <Box width="1240px">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/" passHref>
                トップ
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>カート</BreadcrumbItem>
          </Breadcrumb>
          <Box>
            <Text as="h1" $display={'block'} $variant="large">
              カート
            </Text>
            <CartContainer />
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export default CartPage;
