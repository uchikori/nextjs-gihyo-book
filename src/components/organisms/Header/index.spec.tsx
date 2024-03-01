import { render, screen, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Header from '.';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { theme } from '@/themes';
import type { User, Product } from '@/types';

// ShoppingCartContextのモック
jest.mock('contexts/ShoppingCartContext');
// eslint-disable-next-line import/order
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';
const { ShoppingCartContextProvider } = jest.requireActual(
  'contexts/ShoppingCartContext',
);

/**
 * ダミーユーザー
 */
const authUser: User = {
  id: 1,
  username: 'dummy',
  displayName: 'Taketo Yoshida',
  email: 'test@example.com',
  profileImageUrl: '/images/sample/1.jpg',
  description: '',
};

/**
 * ダミー商品
 */
const product: Product = {
  id: 1,
  category: 'book',
  title: 'Product',
  description: '',
  imageUrl: '/images/sample/1.jpg',
  blurDataUrl: '',
  price: 1000,
  condition: 'used',
  owner: authUser,
};

describe('Header', () => {
  let renderResult: RenderResult;
  const useShoppingCartContextMock =
    useShoppingCartContext as jest.MockedFunction<
      typeof useShoppingCartContext
    >;

  /****************************************************************
   *カートに商品が存在するかのテスト
   ****************************************************************/
  it('カートに商品が存在する', () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [product],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    });

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider
            authUser={authUser}
            context={{ apiRootUrl: 'https://dummy' }}
          >
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    );

    //カートに入っている(バッジが表示されている状態)
    expect(screen.getAllByTestId('badge-wrapper').length).toBeGreaterThan(0);

    renderResult.unmount();
    useShoppingCartContextMock.mockReset();
  });

  /****************************************************************
   *未サインイン状態のテスト
   ****************************************************************/
  it('未サインイン状態', () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    });

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    );

    //サインインしていない状態であること
    expect(screen.queryByTestId('profile-shape-image')).toBeNull();

    //カートが空であることを確認
    expect(screen.queryByTestId('badge-wrapper')).toBeNull();

    renderResult.unmount();
    useShoppingCartContextMock.mockReset();
  });
});
