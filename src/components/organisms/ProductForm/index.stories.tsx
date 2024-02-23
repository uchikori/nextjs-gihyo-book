import { Meta, StoryObj } from '@storybook/react';
import ProductForm from '.';

const meta = {
  title: 'Organisms/ProductForm',
  component: ProductForm,
  argTypes: {
    onProductSave: {
      description: '商品情報を保存した時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof ProductForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Form: Story = {
  render: (args) => {
    return <ProductForm {...args} />;
  },
};
