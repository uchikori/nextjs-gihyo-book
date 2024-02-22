import Link from 'next/link';
import styled from 'styled-components';
import AppLogo from '@/components/atoms/AppLogo';
import Button from '@/components/atoms/Button';
import {
  SearchIcon,
  PersonIcon,
  ShoppingCartIcon,
} from '@/components/atoms/IconButton';
import ShapeImage from '@/components/atoms/ShapeImage';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import BadgeIconButton from '@/components/molecules/BadgeIconButton';
import { useAuthContext } from '@/contexts/AuthContext';
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';

//ヘッダーのルート
const HeaderRoot = styled.header`
  height: 88px;
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

//ナビゲーション
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[2]};
  }
`;

//ナビゲーションのリンク
const NavLink = styled.span`
  display: inline;
`;

//アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const CustomLink = styled(Link)`
  text-decoration: none;
`;

/**
 * ヘッダー
 */
const Header = () => {
  //コンテキストからカートの中身を取得
  const { cart } = useShoppingCartContext();
  //認証コンテキストから認証ユーザーのデータとロード状態を取得
  const { authUser, isLoading } = useAuthContext();

  return (
    <HeaderRoot>
      <Flex paddingLeft={3} paddingRight={3} justifyContent="space-between">
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Link href="/" passHref>
              <Anchor>
                <AppLogo />
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <CustomLink href="" passHref>
                <Anchor>すべて</Anchor>
              </CustomLink>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <CustomLink href="/clothes" passHref>
                <Anchor>トップス</Anchor>
              </CustomLink>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <CustomLink href="/book" passHref>
                <Anchor>本</Anchor>
              </CustomLink>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <CustomLink href="/shoes" passHref>
                <Anchor>シューズ</Anchor>
              </CustomLink>
            </Box>
          </NavLink>
        </Nav>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Box display={{ base: 'block', md: 'none' }}>
              <CustomLink href="/search" passHref>
                <Anchor>
                  <SearchIcon />
                </Anchor>
              </CustomLink>
            </Box>
          </NavLink>
          <NavLink>
            <CustomLink href="/cart" passHref>
              <Anchor>
                <BadgeIconButton
                  icon={<ShoppingCartIcon size={24} />}
                  size="24px"
                  badgeContent={cart.length === 0 ? undefined : cart.length}
                  badgeBackgroundColor="primary"
                />
              </Anchor>
            </CustomLink>
          </NavLink>
          <NavLink>
            {(() => {
              if (authUser) {
                return (
                  <CustomLink href={`/user/${authUser.id}`} passHref>
                    <Anchor>
                      <ShapeImage
                        shape="circle"
                        src={authUser.profileImageUrl}
                        width={24}
                        height={24}
                        data-testid="profile-shape-image"
                        alt={authUser.displayName}
                        unoptimized={true}
                      />
                    </Anchor>
                  </CustomLink>
                );
              } else if (isLoading) {
                return <Spinner size={20} strokeWidth={2} />;
              } else {
                return (
                  <CustomLink href="/signin" passHref>
                    <Anchor>
                      <PersonIcon size={24} />
                    </Anchor>
                  </CustomLink>
                );
              }
            })()}
          </NavLink>
          <NavLink>
            <CustomLink href="/sell" passHref>
              <Button> 出品</Button>
            </CustomLink>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
  );
};

export default Header;
