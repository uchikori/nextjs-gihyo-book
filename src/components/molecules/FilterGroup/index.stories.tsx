import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FilterGroup, { FilterGroupProps } from '.';

const meta = {
  title: 'Molecules/FilterGroup',
  component: FilterGroup,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    items: {
      control: { type: 'array' },
      description: 'オプション',
      table: {
        type: { summary: 'array' },
      },
    },
    onChangeFn: {
      description: 'イベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof FilterGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: FilterGroupProps) => {
  const { onChangeFn } = args;
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (value: string[]) => {
    //useStateのvalueに変数で受け取ったvalueを格納
    setValue(value);
    //valueを渡してonChangeFnを呼び出す
    onChangeFn && onChangeFn(value);
  };

  return <FilterGroup value={value} onChangeFn={handleChange} {...args} />;
};

export const Standard: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {
    title: 'All categories',
    items: [
      { label: 'Clothes', name: 'clothes' },
      { label: 'Books', name: 'books' },
      { label: 'Shoes', name: 'shoes' },
    ],
  },
};
