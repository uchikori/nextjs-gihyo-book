import { Meta, StoryObj } from '@storybook/react';
import SigninForm from '.';

const meta = {
  title: 'Organisms/SigninForm',
  component: SigninForm,
  argTypes: {
    onSignin: {
      description:
        'サインインユーザー名とパスワードを受け取るイベントハンドラ',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
  },
} satisfies Meta<typeof SigninForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Form: Story = {
  render: (args) => {
    return <SigninForm {...args} />;
  },
};
