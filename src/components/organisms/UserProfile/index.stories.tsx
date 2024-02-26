import { Meta, StoryObj } from '@storybook/react';
import UserProfile, { UserProfileProps } from '.';

const meta = {
  title: 'Organisms/UserProfile',
  component: UserProfile,
  argTypes: {
    variant: {
      options: ['normal', 'small'],
      control: {
        type: 'radio',
      },
      defaultValue: 'normal',
      description: 'ユーザーのバリアント',
      table: {
        type: {
          summary: 'normal | small',
        },
        defaultValue: {
          summary: 'normal',
        },
      },
    },
    userName: {
      control: {
        type: 'text',
      },
      description: 'ユーザー名',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: '説明',
      table: {
        type: {},
      },
    },
    profileImageUrl: {
      control: {
        type: 'text',
      },
      description: 'プロフィール画像URL',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    numberOfProducts: {
      control: {
        type: 'number',
      },
      description: 'ユーザーが所有する商品数',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
  },
} satisfies Meta<typeof UserProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: UserProfileProps) => {
  return <UserProfile {...args} />;
};

export const Normal: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {
    variant: 'normal',
    userName: 'テストユーザー',
    profileImageUrl: '/images/sample/1.jpg',
    numberOfProducts: 2000,
    description: 'テストユーザーの説明',
  },
};

export const Small: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {
    variant: 'small',
    userName: 'テストユーザー',
    profileImageUrl: '/images/sample/1.jpg',
    numberOfProducts: 2000,
    description: 'テストユーザーの説明',
  },
};
