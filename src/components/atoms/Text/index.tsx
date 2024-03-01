/* prettier-ignore */
import styled from "styled-components";
import type { Responsive } from '@/types';
import {
  toPropValue,
  Space,
  Color,
  FontSize,
  LetterSpacing,
  LineHeights,
} from '@/utils/styles';

//テキストのバリアント
export type TextVariant =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'mediumLarge'
  | 'large'
  | 'extraLarge';

export type TextProps = {
  $variant?: TextVariant;
  $fontSize?: Responsive<FontSize>;
  $fontWeight?: Responsive<string>;
  $letterSpacing?: Responsive<LetterSpacing>;
  $lineHeight?: Responsive<LineHeights>;
  $textalign?: Responsive<string>;
  $color?: Responsive<Color>;
  $backgroundColor?: Responsive<Color>;
  $width?: Responsive<string>;
  $height?: Responsive<string>;
  $minWidth?: Responsive<string>;
  $minHeight?: Responsive<string>;
  $display?: Responsive<string>;
  $border?: Responsive<string>;
  $overflow?: Responsive<string>;
  $margin?: Responsive<Space>;
  $marginleft?: Responsive<Space>;
  $margintop?: Responsive<Space>;
  $marginright?: Responsive<Space>;
  $marginbottom?: Responsive<Space>;
  $padding?: Responsive<Space>;
  $paddingleft?: Responsive<Space>;
  $paddingtop?: Responsive<Space>;
  $paddingright?: Responsive<Space>;
  $paddingbottom?: Responsive<Space>;
};

const variants = {
  extraSmall: {
    fontSize: 'extraSmall',
    letterSpacing: '0',
    lineHeight: '0',
  },
  small: {
    fontSize: 'small',
    letterSpacing: '1',
    lineHeight: '1',
  },
  medium: {
    fontSize: 'medium',
    letterSpacing: '2',
    lineHeight: '2',
  },
  mediumLarge: {
    fontSize: 'mediumLarge',
    letterSpacing: '3',
    lineHeight: '3',
  },
  large: {
    fontSize: 'large',
    letterSpacing: '4',
    lineHeight: '4',
  },
  extraLarge: {
    fontSize: 'extraLarge',
    letterSpacing: '5',
    lineHeight: '5',
  },
};

/**
 * テキスト
 * バリアント、色、タイポグラフィ、レイアウト、スペース関連のpropsを追加
 */
const Text = styled.span<TextProps>`
  ${(props) => {
    const { $variant, $fontSize, $letterSpacing, $lineHeight, theme } = props;
    //バリアントのスタイルの適用
    if ($variant && variants[$variant]) {
      const styles = []; // CSS用の空配列;
      //StoryBookのargsもしくはargtypeにおいて$fontSizeが設定されていない場合;
      !$fontSize &&
        styles.push(
          toPropValue('font-size', variants[$variant].fontSize, theme),
        );
      !$letterSpacing &&
        styles.push(
          toPropValue(
            'letter-spacing',
            variants[$variant].letterSpacing,
            theme,
          ),
        );
      !$lineHeight &&
        styles.push(
          toPropValue('line-height', variants[$variant].lineHeight, theme),
        );
      return styles.join('\n');
    }
  }}
  ${(props) => toPropValue('font-size', props.$fontSize, props.theme)}
  ${(props) => toPropValue('letter-spacing', props.$letterSpacing, props.theme)}
  ${(props) => toPropValue('line-height', props.$lineHeight, props.theme)}
  ${(props) => toPropValue('color', props.$color, props.theme)}
  ${(props) =>
    toPropValue('background-color', props.$backgroundColor, props.theme)}
  ${(props) => toPropValue('width', props.$width, props.theme)}
  ${(props) => toPropValue('height', props.$height, props.theme)}
  ${(props) => toPropValue('min-width', props.$minWidth, props.theme)}
  ${(props) => toPropValue('min-height', props.$minHeight, props.theme)}
  ${(props) => toPropValue('display', props.$display, props.theme)}
  ${(props) => toPropValue('border', props.$border, props.theme)}
  ${(props) => toPropValue('overflow', props.$overflow, props.theme)}
  ${(props) => toPropValue('margin', props.$margin, props.theme)}
  ${(props) => toPropValue('margin-top', props.$margintop, props.theme)}
  ${(props) => toPropValue('margin-left', props.$marginleft, props.theme)}
  ${(props) => toPropValue('margin-right', props.$marginright, props.theme)}
  ${(props) => toPropValue('margin-bottom', props.$marginbottom, props.theme)}
  ${(props) => toPropValue('padding', props.$padding, props.theme)}
  ${(props) => toPropValue('padding-left', props.$paddingleft, props.theme)}
  ${(props) => toPropValue('padding-top', props.$paddingtop, props.theme)}
  ${(props) => toPropValue('padding-right', props.$paddingright, props.theme)}
  ${(props) => toPropValue('padding-bottom', props.$paddingbottom, props.theme)}
`;

Text.defaultProps = {
  // $variant: 'medium',
  $color: 'text',
};

export default Text;
