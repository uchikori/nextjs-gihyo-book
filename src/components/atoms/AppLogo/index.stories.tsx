import { Meta, StoryObj } from '@storybook/react';
import AppLogo from '.';

const meta = {
  title: 'Atoms/AppLogo',
} satisfies Meta<typeof AppLogo>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Logo: Story = {
  render: () => {
    return <AppLogo />;
  },
};
