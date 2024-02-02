import { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    $variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
      defaultValue: 'primary',
      description: 'ボタンバリアント',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Button',
      description: 'ボタンテキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Disbledフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    $width: {
      control: { type: 'number' },
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    $height: {
      control: { type: 'number' },
      description: '縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
    onClick: {
      description: 'onClickイベント',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return <Button {...args} />;
  },
  args: {
    $variant: 'primary',
    children: 'Primary Button',
    $width: '960px',
  },
};

export const Secondary: Story = {
  render: (args) => {
    return <Button {...args} />;
  },
  args: {
    $variant: 'secondary',
    children: 'Secondary Button',
  },
};
export const Disabled: Story = {
  render: (args) => {
    return <Button {...args} />;
  },
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
