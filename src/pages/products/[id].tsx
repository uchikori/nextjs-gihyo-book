import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BreadcrumbItem from '@/components/atoms/BreadcrumbItem';
import Separator from '@/components/atoms/Separator';
import Text from '@/components/atoms/Text';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import ProductCard from '@/components/organisms/ProductCard';
import UserProfile from '@/components/organisms/UserProfile';
import Layout from '@/components/templates/Layout';
import AddToCartButtonContainer from '@/containers/AddToCartButtonContainer';
import getAllProducts from '@/services/products/get-all-products';
import getProduct from '@/services/products/get-product';
import useProduct from '@/services/products/use-product';
import type { ApiContext, Category } from '@/types';

const categoryNamDict: Record<Category, string> = {
  book: '本',
  shoes: '服',
  clothes: 'トップス',
};

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/proxy',
};

console.log(context);

type ProductPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProductPage: NextPage<ProductPageProps> = (props: ProductPageProps) => {
  const { id, product: initial } = props;

  const router = useRouter();

  //カートに追加を押した際にAddToCartButtonContainerへ渡すイベントハンドラ
  const handleAddToCartButtonClick = () => {
    //カートページへ遷移させる
    router.push('/cart');
  };

  //商品データ
  const data = useProduct(context, { id, initial });

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const product = data.product ?? initial;

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent={'center'}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/" passHref>
                トップ
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/search" passHref>
                検索
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={`/search/${product.category}`}>
                {categoryNamDict[product.category as Category]}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{product.title}</BreadcrumbItem>
          </Breadcrumb>
          <Flex paddingTop={2} paddingBottom={1} justifyContent={'center'}>
            <ProductCard
              variant="detail"
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </Flex>
          <Separator />
          <Box paddingTop={1}>
            <Text as="h2" $variant="large" $margintop={0}>
              出品者
            </Text>
            <Link href={`/users/${product.owner.id}`}>
              <UserProfile
                variant="small"
                userName={product.owner.username}
                profileImageUrl={product.owner.profileImageUrl}
                numberOfProducts={100}
              />
            </Link>
          </Box>
        </Box>
        <Box padding={2} width={{ base: '100%', md: '700px' }}>
          <Flex
            justifyContent={'space-between'}
            flexDirection={'column'}
            height={{ base: '', md: '100%' }}
          >
            {/* 商品概要を表示、改行ごとにテキストコンポーネントでラップ */}
            <Box>
              {product.description
                .split('\n')
                .map((item: string, index: number) => {
                  return (
                    <Text key={index} as="p">
                      {item}
                    </Text>
                  );
                })}
            </Box>
            <AddToCartButtonContainer
              product={product}
              onAddToCartButtonClick={handleAddToCartButtonClick}
            />
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  };
  //全商品を取得
  const products = await getAllProducts(context, {});
  return {
    paths: products.map((product) => {
      return `/products/${product.id}`;
    }),
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  };

  if (!params) {
    throw new Error('params is undefined');
  }

  const productId = Number(params.id);
  const product = await getProduct(context, { id: productId });

  return {
    props: {
      id: productId,
      product: product,
    },
    revalidate: 10,
  };
};

export default ProductPage;
