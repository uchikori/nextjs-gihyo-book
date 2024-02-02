/* prettier-ignore */
import styled from "styled-components";
import { Responsive } from '@/types';
import {
  toPropValue,
  Color,
  FontSize,
  LetterSpacing,
  LineHeights,
  Space,
} from '@/utils/styles';
// import { theme } from '@/themes';

//ボタンのバリアント
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: ButtonVariant;
  $fontSize?: Responsive<FontSize>;
  $fontWeight?: Responsive<string>;
  $letterSpacing?: Responsive<LetterSpacing>;
  $lineheight?: Responsive<LineHeights>;
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
  $pesudoClass?: {
    hover?: {
      $backgroundColor?: Responsive<Color>;
    };
    disabled?: {
      $backgroundColor?: Responsive<Color>;
    };
  };
};

const variants = {
  primary: {
    color: 'white',
    backgroundColor: 'primary',
    border: 'none',
    pesudoClass: {
      hover: {
        backgroundColor: 'primaryDark',
      },
      disabled: {
        backgroundColor: 'primary',
      },
    },
  },
  secondary: {
    color: 'white',
    backgroundColor: 'secondary',
    border: 'none',
    pesudoClass: {
      hover: {
        backgroundColor: 'secondaryDark',
      },
      disabled: {
        backgroundColor: 'secondary',
      },
    },
  },
  danger: {
    color: 'white',
    backgroundColor: 'danger',
    border: 'none',
    pesudoClass: {
      hover: {
        backgroundColor: 'dangerDark',
      },
      disabled: {
        backgroundColor: 'danger',
      },
    },
  },
};

/**
 * ボタン
 * バリアント、色、タイポグラフィ、ボーダー、レイアウト、スペース
 * 関連のPropsを追加
 */
const Button = styled.button<ButtonProps>`
  ${(props) => {
    console.log(props);
    const { $variant, $color, $backgroundColor, $pesudoClass, theme } = props;
    //バリアントのスタイルの適用
    if ($variant && variants[$variant]) {
      const styles = []; //CSS用の空配列
      //StoryBookのargsもしくはargtypeにおいてcolorが設定されていない場合
      !$color &&
        styles.push(toPropValue('color', variants[$variant].color, theme));
      //StoryBookのargsもしくはargtypeにおいてbackgroundColorが設定されていない場合
      !$backgroundColor &&
        styles.push(
          toPropValue(
            'background-color',
            variants[$variant].backgroundColor,
            theme,
          ),
        );
      //StoryBookのargsもしくはargtypeにおいてぺすどClassの
      !$pesudoClass &&
        styles.push(
          `&:hover{
            ${toPropValue('background-color', variants[$variant].pesudoClass.hover.backgroundColor, theme)}
          }`.replaceAll('\n', ''),
        );
      !$pesudoClass &&
        styles.push(
          `&:disabled{
            ${toPropValue('background-color', variants[$variant].pesudoClass.hover.backgroundColor, theme)}
          }`.replaceAll('\n', ''),
        );
      return styles.join('\n');
    }
  }}
  ${(props) => toPropValue('font-size', props.$fontSize, props.theme)}
  ${(props) => toPropValue('letter-spacing', props.$letterSpacing, props.theme)}
  ${(props) => toPropValue('line-height', props.$lineheight, props.theme)}
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
  &:hover {
    ${(props) =>
      toPropValue(
        'background-color',
        props.$pesudoClass?.hover?.$backgroundColor,
        props.theme,
      )}
  }
  &:disabled {
    ${(props) =>
      toPropValue(
        'background-color',
        props.$pesudoClass?.disabled?.$backgroundColor,
        props.theme,
      )}
  }
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : '1')};
  border-radius: 4px;
  border: none;
`;
Button.defaultProps = {
  $variant: 'primary',
  $paddingleft: 2,
  $paddingright: 2,
  $paddingtop: 1,
  $paddingbottom: 1,
  $color: 'white',
  $display: 'inline-block',
  $textalign: 'center',
  $lineheight: 'inherit',
  $fontSize: 'inherit',
  // theme: theme,
};

export default Button;
