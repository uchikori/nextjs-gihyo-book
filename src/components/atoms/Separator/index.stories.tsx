import { Meta, StoryObj } from '@storybook/react';
import Separator from '.';

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => {
    return (
      <>
        <Separator>or</Separator>
        <Separator>and</Separator>
        <Separator />
      </>
    );
  },
};
