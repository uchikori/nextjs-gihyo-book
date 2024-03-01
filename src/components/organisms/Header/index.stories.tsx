import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import Header from '.';
import { AuthContextProvider } from '@/contexts/AuthContext';
import {
  useShoppingCartContext,
  ShoppingCartContextProvider,
} from '@/contexts/ShoppingCartContext';

const meta = {
  title: 'Organisms/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

export const NotLogin = () => {
  return <Header />;
};

export const Login = () => {
  const authUser = {
    id: 1,
    username: 'dummy',
    displayName: 'Taketo Yoshida',
    email: 'test@example.com',
    profileImageUrl: '/images/sample/1.jpg',
    description: '',
  };

  const ChildComponent = () => {
    const { addProductToCart } = useShoppingCartContext();

    useEffect(() => {
      addProductToCart({
        id: 1,
        category: 'book',
        title: 'Product',
        description: '',
        imageUrl: '/images/sample/1.jpg',
        blurDataUrl: '',
        price: 1000,
        condition: 'used',
        owner: authUser,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Header />;
  };

  return (
    <ShoppingCartContextProvider>
      <AuthContextProvider
        context={{ apiRootUrl: 'http://dummy' }}
        authUser={authUser}
      >
        <ChildComponent />
      </AuthContextProvider>
    </ShoppingCartContextProvider>
  );
};
