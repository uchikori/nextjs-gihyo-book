import Grid from '@/components/layout/Grid';

interface ProductCardListProps {
  /**
   * 1行に表示する商品数
   */
  numberPerRow?: number;
  /**
   * モバイルで1行に表示する商品数
   */
  numberPerRowForMobile?: number;
  children: React.ReactNode;
}

/**
 * 商品カードリスト
 */
const ProductCardList = (props: ProductCardListProps) => {
  const { numberPerRow = 4, numberPerRowForMobile = 2, children } = props;
  return (
    <Grid
      gridGap={'16px'}
      gridTemplateColumns={{
        base: `repeat(${numberPerRowForMobile},1fr)`,
        md: `repeat(${numberPerRow},1fr)`,
      }}
    >
      {children}
    </Grid>
  );
};

export default ProductCardList;
