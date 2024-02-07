/* prettier-ignore */
import Image, { ImageProps } from 'next/image';
import styled from "styled-components";

type ImageShape = 'circle' | 'square';
type ShapeImageProps = ImageProps & { shape?: ImageShape };

//circleなら円形に
const ImageWithShape = styled(Image)<{ shape?: ImageShape }>`
  border-radius: ${({ shape }) => {
    return shape === 'circle' ? '50%' : '0';
  }};
`;

/**
 * シェイプイメージ
 */
const ShapeImage = (props: ShapeImageProps) => {
  const { shape, ...imageProps } = props;

  return <ImageWithShape shape={shape} {...imageProps} />;
};

export default ShapeImage;
