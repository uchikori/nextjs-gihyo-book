import { Meta, StoryObj } from '@storybook/react';
import ShapeImage from '.';

const meta = {
  title: 'Atoms/ShapeImage',
  component: ShapeImage,
  argTypes: {
    shape: {
      options: ['circle', 'square'],
      control: { type: 'radio' },
      defaultValue: 'square',
      description: '画像の形',
      table: {
        type: { summary: 'circle | square' },
        defaultValue: { summary: 'square' },
      },
    },
    src: {
      control: { type: 'text' },
      description: '画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: { type: 'number' },
      defaultValue: 320,
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number' },
      defaultValue: 320,
      description: '縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ShapeImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Circle: Story = {
  render: (args) => {
    return <ShapeImage {...args} />;
  },
  args: {
    shape: 'circle',
    src: '/images/sample/1.jpg',
    alt: '',
    width: 320,
    height: 320,
  },
};
