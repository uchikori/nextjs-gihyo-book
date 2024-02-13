import { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from '../Dropzone';
import ImagePreview, { ImagePreviewProps } from '.';

const meta = {
  title: 'Molecules/ImagePreview',
  component: ImagePreview,
  argTypes: {
    src: {
      control: { type: 'text' },
      description: '画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: '代替テキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    height: {
      control: { type: 'number' },
      description: '縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
    width: {
      control: { type: 'number' },
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    onRemoveFn: {
      description: '削除ボタンを押した時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof ImagePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

const Container = styled.div`
  width: 288px;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
`;

interface Image {
  file?: File;
  src?: string;
}

const Template = (args: ImagePreviewProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const newImages = [...images];

    for (const file of files) {
      const index = newImages.findIndex((img: Image) => {
        return img.file === file;
      });

      if (index === -1) {
        newImages.push({
          file: file,
          src: URL.createObjectURL(file),
        });
      }
    }
    setImages(newImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleRemove = (src: string) => {
    const image = images.find((img: Image) => img.src === src);

    if (image !== undefined) {
      setImages((images) => images.filter((img) => img.src !== image.src));
      setFiles((files) => files.filter((file: File) => file !== image.file));
    }

    args && args.onRemoveFn && args.onRemoveFn(src);
  };

  return (
    <Container>
      <Dropzone value={files} onDropFn={(files) => setFiles(files)} />
      {images.map((image, index) => {
        return (
          <ImagePreview
            key={index}
            src={image.src}
            width="100px"
            {...args}
            onRemoveFn={handleRemove}
          />
        );
      })}
    </Container>
  );
};

export const WithDropzone: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {},
};
