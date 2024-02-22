import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import InputImages, { FileData } from '.';

const meta = {
  title: 'Molecules/InputImages',
  component: InputImages,
} satisfies Meta<typeof InputImages>;

export default meta;

const Container = styled.div`
  width: 288px;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
`;

export const Standard = () => {
  const [img, setImgs] = useState<FileData[]>([]);

  const handleChangeFn = (newImgs: FileData[]) => {
    setImgs(newImgs);
  };

  console.log(img);

  return (
    <Container>
      <InputImages onChange={handleChangeFn} images={img} maximumNumber={2} />
    </Container>
  );
};
