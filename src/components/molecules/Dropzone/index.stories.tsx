import { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import Dropzone, { DropzoneProps } from './index';
import Button from '@/components/atoms/Button';
import Box from '@/components/layout/Box';

const meta = {
  title: 'Molecules/Dropzone',
  component: Dropzone,
  argTypes: {
    acceptedFileTypes: {
      options: {
        control: { type: 'array' },
        descirption: '受け付けるファイルタイプ',
        table: {
          type: { summary: 'array' },
        },
      },
    },
    width: {
      control: { type: 'number' },
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number' },
      description: '縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
    hasError: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onDropFn: {
      description: 'ドロップした時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
    onChangeFn: {
      description: 'ファイルが変化した時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof Dropzone>;

export default meta;

type Story = StoryObj<typeof meta>;

const DropzoneWithHooks = (args: DropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (files: File[]) => {
    setFiles(files);
    args && args.onDropFn && args.onDropFn(files);
  };

  const fetchData = async () => {
    const res = await fetch('/images/sample/1.jpg');
    const blob = await res.blob();
    console.log(blob);

    const file = new File([blob], '1.jpg', blob);

    console.log(file);

    setFiles([...files, file]);
  };

  const clearImage = () => {
    setFiles([]);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box marginBottom="1">
        <Dropzone {...args} value={files} onDropFn={handleDrop} />
      </Box>
      <Box marginBottom="1">
        <Button onClick={fetchData}>画像を追加</Button>
      </Box>
      <Box marginBottom="2">
        <Button onClick={clearImage}>全ての画像をクリア</Button>
      </Box>
      <Box>
        {files.map((file, index) => {
          // eslint-disable-next-line @next/next/no-img-element
          return (
            <img
              src={URL.createObjectURL(file)}
              width="100px"
              key={index}
              alt="sample"
            />
          );
        })}
      </Box>
    </>
  );
};

export const WithControl: Story = {
  render: (args) => {
    return <DropzoneWithHooks {...args} />;
  },
  args: {
    height: 200,
    width: '100%',
    acceptedFileTypes: [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp',
    ],
    hasError: false,
  },
};
