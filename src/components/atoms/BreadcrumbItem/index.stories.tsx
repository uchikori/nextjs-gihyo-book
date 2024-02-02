import { Meta, StoryObj } from '@storybook/react';
import BreadcrumbItem from '.';

const meta = {
  title: 'Atoms/BreadcrumbItem',
} satisfies Meta<typeof BreadcrumbItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: (args) => {
    return (
      <div>
        <BreadcrumbItem>1</BreadcrumbItem>
        <BreadcrumbItem>2</BreadcrumbItem>
        <BreadcrumbItem>3</BreadcrumbItem>
      </div>
    );
  },
};
