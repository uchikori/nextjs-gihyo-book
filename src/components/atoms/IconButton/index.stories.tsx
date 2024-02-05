import { Meta, StoryObj } from '@storybook/react';
import { SearchIcon, CloudUploadIcon, PersonOutlineIcon, CloseIcon } from '.';

const meta = {
  title: 'Atoms/IconButton',
  component: SearchIcon,
  argTypes: {
    color: {
      control: { type: 'string' },
      description: 'アイコン色',
      defaultValue: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    backgroundColor: {
      control: { type: 'color' },
      description: '背景色',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    size: {
      control: { type: 'number' },
      descritption: 'サイズ',
      defaultValue: 24,
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    onClick: {
      description: 'onClickイベントハンドラ',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
  },
} satisfies Meta<typeof SearchIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  render: (args) => {
    return (
      <>
        <SearchIcon {...args} />
        <CloudUploadIcon {...args} />
        <PersonOutlineIcon {...args} />
      </>
    );
  },
};
