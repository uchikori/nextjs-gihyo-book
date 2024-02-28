import Link from 'next/link';
import { Fragment } from 'react';
import ProductCard from '@/components/organisms/ProductCard';
import ProductCardList from '@/components/organisms/ProductCardList';
import useSearch from '@/services/products/use-search';
import type { ApiContext, Product } from '@/types';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
};

interface UserProductCardListContainerProps {
  /**
   * 商品を所有するユーザーID
   */
  userId: number;
  /**
   * 初期表示する商品リスト
   */
  products?: Product[];
}

/**
 * ユーザー商品カードリストコンテナ
 */
const UserProductCardListContainer = (
  props: UserProductCardListContainerProps,
) => {
  //pagePropsからuserIdとproductsを取得
  const { userId, products } = props;

  //検索用のカスタムフックにパラメーターとして渡し,
  //戻り値のproductsをuserProductsとして受け取る
  const { products: userProducts } = useSearch(context, {
    userId,
    initial: products,
  });

  return (
    <ProductCardList numberPerRow={6} numberPerRowForMobile={2}>
      {userProducts.map((userProduct) => {
        return (
          <Fragment key={userProduct.id}>
            <Link href={`/products/${userProduct.id}`} passHref>
              <ProductCard
                variant="small"
                title={userProduct.title}
                price={userProduct.price}
                imageUrl={userProduct.imageUrl}
              />
            </Link>
          </Fragment>
        );
      })}
    </ProductCardList>
  );
};

export default UserProductCardListContainer;
