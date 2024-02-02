import { Meta, StoryObj } from '@storybook/react';
import Textarea from '.';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: {
      control: {
        type: 'string',
      },
      description: 'プレースホルダー',
      table: {
        type: { summary: 'string' },
      },
    },
    rows: {
      control: { type: 'number' },
      defaultValue: 5,
      description: '行数',
      table: {
        type: { summary: 'number' },
      },
    },
    minRows: {
      control: { type: 'number' },
      defaultValue: 5,
      description: '最小行数',
      table: {
        type: { summary: 'number' },
      },
    },
    maxRows: {
      control: { type: 'number' },
      defaultValue: 10,
      description: '最大行数',
      table: {
        type: { summary: 'number' },
      },
    },
    $haserror: {
      control: 'boolean',
      defaultValue: 'false',
      descirption: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      description: 'onChnageハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  render: (args) => {
    return <Textarea {...args} />;
  },
};

export const Error: Story = {
  render: (args) => {
    return <Textarea {...args} />;
  },
  args: {
    $haserror: true,
  },
};
