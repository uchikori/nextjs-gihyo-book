import styled from 'styled-components';
import Box, { BoxProps } from '../Box';
import type {
  Responsive,
  CSSPropertyAlignItems,
  CSSPropertyAlignContent,
  CSSPropertyJustifyContent,
  CSSPropertyJustifyItems,
  CSSPropertyFlexDirection,
  CSSPropertyJustifySelf,
  CSSPropertyFlexWrap,
  CSSPropertyAlignSelf,
} from '@/types/styles';
import { toPropValue } from '@/utils/styles';
import { theme } from '@/themes';

type FlexProps = BoxProps & {
  alignItems?: Responsive<CSSPropertyAlignItems>;
  alignContent?: Responsive<CSSPropertyAlignContent>;
  justifyContent?: Responsive<CSSPropertyJustifyContent>;
  justifyItems?: Responsive<CSSPropertyJustifyItems>;
  flexWrap?: Responsive<CSSPropertyFlexWrap>;
  flexBasis?: Responsive<string>;
  flexDirection?: Responsive<CSSPropertyFlexDirection>;
  flexGrow?: Responsive<string>;
  flexShrink?: Responsive<string>;
  justifySelf?: Responsive<CSSPropertyJustifySelf>;
  alignSelf?: Responsive<CSSPropertyAlignSelf>;
  order?: Responsive<string>;
};

/**
 * Flexコンポーネント
 * flexboxの実現に利用する
 */
const Flex = styled(Box)<FlexProps>`
  ${(props) => toPropValue('align-items', props.alignItems, theme)}
  ${(props) => toPropValue('align-content', props.alignContent, theme)}
  ${(props) => toPropValue('justify-content', props.justifyContent, theme)}
  ${(props) => toPropValue('justify-items', props.justifyItems, theme)}
  ${(props) => toPropValue('flex-wrap', props.flexWrap, theme)}
  ${(props) => toPropValue('flex-basis', props.flexBasis, theme)}
  ${(props) => toPropValue('flex-direction', props.flexDirection, theme)}
  ${(props) => toPropValue('flex-grow', props.flexGrow, theme)}
  ${(props) => toPropValue('flex-shrink', props.flexShrink, theme)}
  ${(props) => toPropValue('justify-self', props.justifySelf, theme)}
  ${(props) => toPropValue('align-self', props.alignSelf, theme)}
  ${(props) => toPropValue('order', props.order, theme)}
`;
Flex.defaultProps = {
  display: 'flex',
};

export default Flex;
