import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import Spinner from '.';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: {
        type: 'number',
        defaultValue: 50,
        description: 'サイズ',
        table: {
          type: { summary: 'number' },
        },
      },
    },
    strokeWidth: {
      control: { type: 'number' },
      description: '先の太さ',
      defaultValue: 4,
      table: {
        type: { summary: 'number' },
      },
    },
    isautocentering: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'センタリングフラグ',
      table: { type: { summary: 'boolean' } },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

const SpinnerWrapper = styled.div`
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  justify-content:center;
  align-items-center;
  z-index:1199
`;

export const Normal: Story = {
  render: (args) => {
    return (
      <>
        <SpinnerWrapper>
          <Spinner {...args} />
        </SpinnerWrapper>
      </>
    );
  },
};
