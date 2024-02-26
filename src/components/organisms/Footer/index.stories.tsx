import { Meta, StoryObj } from '@storybook/react';
import Footer from '.';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Footer />;
  },
};
