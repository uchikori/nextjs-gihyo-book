import Image, { ImageProps } from 'next/image';
import styled from 'styled-components';
import { Responsive } from '@/types';
import { toPropValue } from '@/utils/styles';

type ScaleImageProps = Omit<ImageProps, 'quality'> & {
  containerWidth?: Responsive<string>;
  containerHeight?: Responsive<string>;
};

const ScaleEffectImageContainer = styled.div<{
  width: Responsive<string>;
  height: Responsive<string>;
}>`
  overflow: hidden;
  ${(props) => {
    const { width, theme } = props;
    return toPropValue('width', width, theme);
  }}
  ${(props) => {
    const { height, theme } = props;
    return toPropValue('heihgt', height, theme);
  }}
`;

const ScaleEffectImage = styled(Image)`
  transition: transform 0.5s linear;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.1);
  }
`;

/**
 * スケールイメージ
 */
const ScaleImage = (props: ScaleImageProps) => {
  const { containerWidth, containerHeight, ...rest } = props;
  return (
    <ScaleEffectImageContainer
      width={containerWidth ?? `${rest.width}` ?? '320px'}
      height={containerHeight ?? `${rest.height}` ?? '320px'}
    >
      <ScaleEffectImage
        quality="85"
        // alt={rest.alt ?? 'ProductImage'}
        height={rest.height ?? 320}
        width={rest.width ?? 320}
        {...rest}
      />
    </ScaleEffectImageContainer>
  );
};

export default ScaleImage;
