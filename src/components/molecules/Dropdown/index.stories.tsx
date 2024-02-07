import { Meta, StoryObj } from '@storybook/react';
import Dropdown from '.';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  argTypes: {
    onChange: {
      description: '値が変化した時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'ドロップダウンの値',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'プレースホルダー',
      table: {
        type: { summary: 'string' },
      },
    },
    hasError: {
      control: { type: 'boolean' },
      description: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    options: {
      control: { type: 'aaray' },
      description: 'ドロップダウンの選択肢',
      table: {
        type: { summary: 'aaray' },
      },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  render: (args) => {
    return <Dropdown {...args} />;
  },
  args: {
    options: [
      { value: null, label: '-' },
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' },
    ],
    placeholder: 'Please select items from list',
  },
};

export const InitialValue: Story = {
  render: (args) => {
    return <Dropdown {...args} />;
  },
  args: {
    options: [
      { value: null, label: '-' },
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' },
    ],
    placeholder: 'Please select items from the list',
    value: 'one',
  },
};

export const Many: Story = {
  render: (args) => {
    return <Dropdown {...args} />;
  },
  args: {
    options: Array.from(Array(20), (_v, k) => {
      return { value: k.toString(), label: k.toString() };
    }),
    placeholder: 'Please select items from the list',
  },
};
