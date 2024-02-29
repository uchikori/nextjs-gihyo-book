import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import BreadcrumbItem from '@/components/atoms/BreadcrumbItem';
import Text from '@/components/atoms/Text';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import FilterGroup from '@/components/molecules/FilterGroup';
import Layout from '@/components/templates/Layout';
import ProductCardListContainer from '@/containers/ProductCardListContainer';
import type { Category, Condition } from '@/types';

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const categoryNamDict: Record<Category, string> = {
  book: '本',
  shoes: '服',
  clothes: 'トップス',
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  //商品のカテゴリーをクエリから取得
  //全てのルートを受け取る形[...slug].tsxに設定しているためslugの値は配列型になるはず
  const slug: Category[] = Array.isArray(router.query.slug)
    ? (router.query.slug as Category[])
    : [];
  //商品の状態をクエリから取得
  const conditions: Condition[] = (() => {
    if (Array.isArray(router.query.condition)) {
      return router.query.condition as Condition[];
    } else if (router.query.condition) {
      return [router.query.condition as Condition];
    } else {
      return [];
    }
  })();

  const handleChange = (selected: string[]) => {
    //slugとconditionをクエリパラメーターとして設定してページ遷移させる
    router.push({
      pathname: router.pathname, //[...slug]
      query: {
        slug,
        condition: selected,
      }, //query:{category, condition:[...selected]}
    });
  };

  return (
    <Layout>
      <Box
        paddingLeft={{ base: 2, md: 3 }}
        paddingRight={{ base: 2, md: 3 }}
        paddingTop={2}
        paddingBottom={2}
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
            {/* 最後の要素以外をリンク付きでパンくず表示 */}
            {slug.slice(0, slug.length - 1).map((category, index) => {
              return (
                <BreadcrumbItem key={index}>
                  <Link href={`/search/${slug.slice(0, index + 1).join('/')}/`}>
                    {categoryNamDict[category] ?? 'Unknown'}
                  </Link>
                </BreadcrumbItem>
              );
            })}
            {/* slugが空なら"全て" */}
            {slug.length === 0 && <BreadcrumbItem>全て</BreadcrumbItem>}
            {/* slug配列の長さが1以上なら最後の要素をリンク無しで表示 */}
            {slug.length > 0 && (
              <BreadcrumbItem>
                {categoryNamDict[slug[slug.length - 1]] ?? 'Unknown'}
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
        <Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }}>
            <Box
              as="aside"
              minWidth={'200px'}
              marginBottom={{ base: 2, md: 0 }}
            >
              {/* 商品状態のフィルタ */}
              <FilterGroup
                title="商品の状態"
                items={[
                  { label: '新品', name: 'new' },
                  { label: '中古', name: 'used' },
                ]}
                value={conditions}
                onChangeFn={handleChange}
              />
              <Box paddingTop={1}>
                <Text as="h2" $fontWeight={'bold'} $variant="mediumLarge">
                  カテゴリ
                </Text>
                <Box>
                  <Link href="/search/" passHref>
                    全て
                  </Link>
                </Box>
                {/* カテゴリのリンク */}
                {Object.keys(categoryNamDict).map((category, index) => {
                  return (
                    <Box key={index} marginTop={1}>
                      <Link href={`/search/${category}`} passHref>
                        <Anchor>{categoryNamDict[category as Category]}</Anchor>
                      </Link>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box>
              <Text
                as="h2"
                $display={{ base: 'block', md: 'none' }}
                $fontWeight={'bold'}
                $variant="mediumLarge"
              >
                商品一覧
              </Text>
              <ProductCardListContainer
                category={slug.length > 0 ? slug[slug.length - 1] : undefined}
                conditions={conditions}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default SearchPage;
