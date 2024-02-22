import { Meta, StoryObj } from '@storybook/react';
import CartProduct from '.';

const meta = {
  title: 'Organisms/CartProduct',
  component: CartProduct,
  argTypes: {
    id: {
      control: { type: 'number' },
      description: '商品ID',
      table: {
        type: { summary: 'number' },
      },
    },
    imageUrl: {
      control: { type: 'text' },
      description: '商品画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: { type: 'text' },
      description: '商品タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: { type: 'number' },
      description: '商品価格',
      table: {
        type: { summary: 'number' },
      },
    },
    onBuyButtonClick: {
      description: '購入ボタンクリック時の処理',
      table: {
        type: { summary: 'function' },
      },
    },
    onRemoveButtonClick: {
      description: '削除ボタンクリック時の処理',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof CartProduct>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NiceShoes: Story = {
  render: (args) => {
    return <CartProduct {...args} />;
  },
  args: {
    id: 1,
    imageUrl: '/images/sample/1.jpg',
    title: 'ナイスシューズ',
    price: 3000,
  },
};
