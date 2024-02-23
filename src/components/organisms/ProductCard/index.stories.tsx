import { Meta, StoryObj } from '@storybook/react';
import ProductCard from '.';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '商品タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: { type: 'number' },
      description: '価格',
      table: {
        type: { summary: 'number' },
      },
    },
    imageUrl: {
      control: { type: 'text' },
      description: '画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    blurDataURL: {
      control: { type: 'text' },
      description: 'ぼかし画像のURL',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      options: ['listing', 'small', 'detail'],
      control: { type: 'radio' },
      defaultValue: 'listing',
      description: 'バリアントスタイル',
      table: {
        type: { summary: 'listing | small | detail' },
        defaultValue: { summary: 'listing' },
      },
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Listing: Story = {
  render: (args) => {
    return <ProductCard {...args} />;
  },
  args: {
    variant: 'listing',
    title: 'ナイスシューズ',
    imageUrl: '/images/sample/1.jpg',
    price: 2000,
  },
};
export const Small: Story = {
  render: (args) => {
    return <ProductCard {...args} />;
  },
  args: {
    variant: 'small',
    title: 'ナイスシューズ',
    imageUrl: '/images/sample/1.jpg',
    price: 2000,
  },
};
export const Detail: Story = {
  render: (args) => {
    return <ProductCard {...args} />;
  },
  args: {
    variant: 'detail',
    title: 'ナイスシューズ',
    imageUrl: '/images/sample/1.jpg',
    price: 2000,
  },
};
