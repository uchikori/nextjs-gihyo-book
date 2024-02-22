import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Dropzone from '../Dropzone';
import ImagePreview from '../ImagePreview';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';

const InputImagesContainer = styled(Flex)`
  width: 100%;
  & > *:not(:first-child) {
    margin-top: 8px;
  }
`;

export type FileData = {
  id?: string;
  src?: string;
  file?: File;
  selected?: boolean;
  chosen?: boolean;
};

export interface InputImagesProps {
  name?: string;
  images: FileData[];
  maximumNumber?: number;
  hasError?: boolean;
  width?: string;
  height?: string;
  onChange?: (images: FileData[]) => void;
}

/**
 *インプットイメージ
 */
const InputImages = (props: InputImagesProps) => {
  const {
    images,
    maximumNumber,
    name,
    hasError,
    width = '100%',
    height = '260px',
    onChange,
  } = props;

  // ファイル変数をメモ化
  const files = useMemo(() => {
    return (
      images
        //images配列からfileプロパティが存在する要素のみを抽出
        .filter((img: FileData) => img.file)
        //fileプロパティを抽出
        .map((img: FileData) => img.file as File)
    );
  }, [images]);

  const isDropzoneDisplay =
    //maximumNumberがfalsyまたはimages配列の長さがmaximumNumber未満の場合、blockを、そうでない場合はnoneを返す
    !maximumNumber || images.length < maximumNumber ? 'block' : 'none';

  const handleRemoveFn = useCallback(
    (src: string) => {
      //images配列からsrcと一致する要素のみを抽出
      const image = images.find((img: FileData) => img.src === src);
      //images配列の中でsrcと一致しないものを抽出してnewImages配列に格納
      const newImages = images.filter((img: FileData) => img.src !== src);

      //もし image が定義済みであれば（つまり、images 配列内で src と一致する画像が見つかった場合）
      if (image !== undefined) {
        //もし image.file および image.src が存在する場合、
        if (image.file && image.src) {
          //オブジェクトのURL解放
          URL.revokeObjectURL(image.src);
          //image.src プロパティを削除します
          delete image.src;
        }

        onChange && onChange(newImages);
      }
    },
    [images, onChange],
  );

  const handleDropFn = useCallback(
    (files: File[]) => {
      //新しい画像を格納するための空の配列 newImages を作成
      const newImages = [];

      for (const file of files) {
        //images 配列から、既に同じファイルが存在するかを検索
        const img = images.find((img: FileData) => img.file === file);

        if (
          //もし同じファイルが存在せず
          !img &&
          //指定された最大数 maximumNumber が設定されていないか、または現在の画像数と新しい画像数の合計が最大数未満である場合
          (!maximumNumber || images.length + newImages.length < maximumNumber)
        ) {
          //新しい画像オブジェクト { file, src: URL.createObjectURL(file) } を作成し、newImages 配列に追加
          newImages.push({ file, src: URL.createObjectURL(file) });
        }
      }

      onChange && onChange(newImages);
    },
    [images, maximumNumber, onChange],
  );

  return (
    <InputImagesContainer flexDirection="column">
      {images &&
        images.map((item, index) => {
          return (
            <ImagePreview
              alt={item.id}
              key={index}
              src={item.src}
              height={height}
              onRemoveFn={handleRemoveFn}
            />
          );
        })}
      <Box style={{ display: isDropzoneDisplay }}>
        <Dropzone
          acceptedFileTypes={[
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/gif',
          ]}
          name={name}
          width={width}
          height={height}
          value={files}
          hasError={hasError}
          onDropFn={handleDropFn}
        />
      </Box>
    </InputImagesContainer>
  );
};

export default InputImages;
