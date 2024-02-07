import { Meta, StoryObj } from '@storybook/react';
import CheckBox from '.';

const meta = {
  title: 'Molecules/CheckBox',
  component: CheckBox,
  argTypes: {
    label: {
      control: { type: 'テキスト' },
      description: '表示ラベル',
      table: {
        type: {
          summary: 'text',
        },
      },
    },

    checked: {
      control: { type: 'boolean' },
      description: 'チェック',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      description: '値が変化した時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ComponentStory: Story = {
  render: (args) => {
    return <CheckBox {...args} />;
  },
  args: {
    label: 'Label',
  },
};
