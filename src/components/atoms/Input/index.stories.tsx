import { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta = {
  title: 'Atoms/Input',
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'プレースホルダー',
      defaultvalue: 'サンプルテキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    $hasborder: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: 'ボーダーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    $haserror: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  render: (args) => {
    return <Input {...args} />;
  },
};
export const Error: Story = {
  render: (args) => {
    return <Input {...args} />;
  },
};
