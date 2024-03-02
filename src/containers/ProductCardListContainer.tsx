import Link from 'next/link';
import RectLoader from '@/components/atoms/RectLoader';
import Box from '@/components/layout/Box';
import ProductCard from '@/components/organisms/ProductCard';
import ProductCardList from '@/components/organisms/ProductCardList';
import useSearch from '@/services/products/use-search';
import type { ApiContext, Category, Condition } from '@/types';

const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_URL || '/api/proxy',
};
console.log(context);

interface ProductCardListContainerProps {
  /**
   * 検索クエリ-カテゴリ
   */
  category?: Category;
  /**
   * 検索クエリ-商品状態
   */
  conditions?: Condition[];
}

/**
 * 商品カードリストコンテナ
 */
const ProductCardListContainer = (props: ProductCardListContainerProps) => {
  const { category, conditions } = props;
  const { products, isLoading } = useSearch(context, { category, conditions });

  return (
    <ProductCardList>
      {isLoading &&
        //16回ループする配列を作成
        Array.from(Array(16), (item, i) => (
          <Box key={i}>
            <Box display={{ base: 'none', md: 'block' }}>
              <RectLoader width={240} height={240} />
            </Box>
            <Box display={{ base: 'block', md: 'none' }}>
              <RectLoader width={160} height={160} />
            </Box>
          </Box>
        ))}
      {!isLoading &&
        products.map((product) => {
          return (
            <Box key={product.id}>
              <Link href={`/products/${product.id}`} passHref>
                <ProductCard
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  blurDataURL={product.blurDataUrl}
                  variant="listing"
                />
              </Link>
            </Box>
          );
        })}
    </ProductCardList>
  );
};

export default ProductCardListContainer;
