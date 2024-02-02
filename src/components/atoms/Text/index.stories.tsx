import { Meta, StoryObj } from '@storybook/react';
import Text from '.';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    $variant: {
      options: [
        'extraSmall',
        'small',
        'medium',
        'mediumLarge',
        'large',
        'extraLarge',
      ],
      control: { type: 'radio' },
      defaultValue: 'medium',
      description: 'テキストバリアント',
      table: {
        type: {
          summary: 'extraSmall , small, medium, mediumLarge, large, extraLarge',
        },
        defaultValue: { summary: 'medium' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'テキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    $fontWeight: {
      control: { type: 'text' },
      description: 'フォントの太さ',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    $lineHeight: {
      control: { type: 'text' },
      description: '行の高さ',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    $backgroundColor: {
      control: { type: 'color' },
      description: '背景色',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    $color: {
      control: { type: 'color' },
      description: 'テキストの色',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    $margin: {
      control: { type: 'number' },
      description: 'マージン',
      table: {
        type: { summary: 'number' },
      },
    },
    $marginleft: {
      control: { type: 'number' },
      description: 'マージンレフト',
      table: {
        type: { summary: 'number' },
      },
    },
    $margintop: {
      control: { type: 'number' },
      description: 'マージントップ',
      table: {
        type: { summary: 'number' },
      },
    },
    $marginright: {
      control: { type: 'number' },
      description: 'マージンライト',
      table: {
        type: { summary: 'number' },
      },
    },
    $marginbottom: {
      control: { type: 'number' },
      description: 'マージンボトム',
      table: {
        type: { summary: 'number' },
      },
    },
    $padding: {
      control: { type: 'number' },
      description: 'パディング',
      table: {
        type: { summary: 'number' },
      },
    },
    $paddingleft: {
      control: { type: 'number' },
      description: 'パディングレフト',
      table: {
        type: { summary: 'number' },
      },
    },
    $paddingtop: {
      control: { type: 'number' },
      description: 'パディングトップ',
      table: {
        type: { summary: 'number' },
      },
    },
    $paddingright: {
      control: { type: 'number' },
      description: 'パディングライト',
      table: {
        type: { summary: 'number' },
      },
    },
    $paddingbottom: {
      control: { type: 'number' },
      description: 'パディングボトム',
      table: {
        type: { summary: 'number' },
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

const longText = `It is a long established fact that a reader will be
distracted by the readable content of a page when looking at its layout.
The point of using Lorem Ipsum is that it has a more - or - less normal
distribution of letters, as opposed to using Content here, content here,
making it look like readable English.Many desktop publishing packages and
web page editors now use Lorem Ipsum as their default model text, and a
search for lorem ipsum will uncover many web sites still in their infancy.
Various versions have evolved over the years, sometimes by accident,
sometimes on purpose(injected humour and the like).`;

export const ExtraSmall: Story = {
  render: (args) => {
    return <Text {...args} />;
  },
  args: {
    $variant: 'extraSmall',
    children: longText,
  },
};

export const Small: Story = {
  render: (args) => {
    return <Text {...args} />;
  },
  args: {
    $variant: 'small',
    children: longText,
  },
};

export const Medium: Story = {
  render: (args) => {
    return <Text {...args} />;
  },
  args: {
    $variant: 'medium',
    children: longText,
  },
};
export const MediumLarge: Story = {
  render: (args) => {
    return <Text {...args} />;
  },
  args: {
    $variant: 'mediumLarge',
    children: longText,
  },
};

export const Large: Story = {
  render: (args) => {
    return <Text {...args} />;
  },
  args: {
    $variant: 'large',
    children: longText,
  },
};

export const ExtraLarge: Story = {
  render: (args) => {
    return <Text {...args} />;
  },
  args: {
    $variant: 'extraLarge',
    children: longText,
  },
};
