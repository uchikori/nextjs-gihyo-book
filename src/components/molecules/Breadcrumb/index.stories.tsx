import { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from '.';
import BreadcrumbItem from '@/components/atoms/BreadcrumbItem';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: (args) => {
    return (
      <Breadcrumb {...args}>
        <BreadcrumbItem>
          <a href="#">TOP</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="#">Clothes</a>
        </BreadcrumbItem>
        <BreadcrumbItem>Item</BreadcrumbItem>
      </Breadcrumb>
    );
  },
  args: {
    children: null,
  },
};
