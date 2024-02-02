/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { theme } from '@/themes';
import type { ResponsiveProp, Responsive } from '@/types';

// Themeの型
export type AppTheme = typeof theme;

//オブジェクトのキーを制限する型
type SpaceThemeKeys = keyof typeof theme.space;
type ColorThemeKeys = keyof typeof theme.colors;
type FontSizeThemeKeys = keyof typeof theme.fontSize;
type LetterSpacingThemeKeys = keyof typeof theme.letterSpacing;
type LineHeightsThemeKeys = keyof typeof theme.lineHeights;

//各Themeのキーの型(多分|以降は意味ない)
export type Space = SpaceThemeKeys | (string & {});
export type Color = ColorThemeKeys | (string & {});
export type FontSize = FontSizeThemeKeys | (string & {});
export type LetterSpacing = LetterSpacingThemeKeys | (string & {});
export type LineHeights = LineHeightsThemeKeys | (string & {});

//それぞれの持ちうる型は下記のようになる
// export type Space = number | '0' | '1' | '2' | '3' | '4' | (string & {});
// export type Color =
//   | 'primary'
//   | 'primaryDark'
//   | 'primaryLight'
//   | 'secondary'
//   | 'soceondaryDark'
//   | 'secondaryLight'
//   | 'danger'
//   | 'gray'
//   | 'black'
//   | 'white'
//   | (string & {});
// export type FontSize =
//   | 'extraSmall'
//   | 'small'
//   | 'medium'
//   | 'mediumLarge'
//   | 'large'
//   | 'extraLarge'
//   | (string & {});
// export type LetterSpacing =
//   | number
//   | '0'
//   | '1'
//   | '2'
//   | '3'
//   | '4'
//   | (string & {});
// export type LineHeights =
//   | number
//   | '0'
//   | '1'
//   | '2'
//   | '3'
//   | '4'
//   | '5'
//   | '6'
//   | (string & {});

//ブレークポイント
const BREAKPOINTS: { [key: string]: string } = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

/**
 * Responsive型をCSSプロパティとその値に変換
 * @param propKey CSSプロパティ名
 * @param prop Responsive型 ※レスポンシブ指定する場合はかならずオブジェクト形式にする⇒ex.{sm:'3', md:'4'}※
 * @param theme AppTheme
 * @returns CSSプロパティとその値
 */
export function toPropValue<T>(
  propKey: string,
  prop?: Responsive<T>,
  theme?: AppTheme,
) {
  // console.log(propKey);
  // console.log(prop);
  // console.log(theme);

  if (prop === undefined) return undefined;

  //propにレスポンシブ記述があった場合
  if (isResponsivePropType(prop)) {
    const result = [];
    //レスポンシブ記述されているブレークポイント数分だけ処理を繰り返す
    for (const responsiveKey in prop) {
      //レスポンシブ記述がbaseの場合
      if (responsiveKey === 'base') {
        result.push(
          `${propKey}:${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)};`,
        );
        //レスポンシブ記述がbase以外の場合
      } else if (
        responsiveKey === 'sm' ||
        responsiveKey === 'md' ||
        responsiveKey === 'lg' ||
        responsiveKey === 'xl'
      ) {
        const breakpoint = BREAKPOINTS[responsiveKey];
        //prop[responsiveKey]にはsm:'3',md:'4'などの'3'や'4'の値がそれぞれ入る
        const style = `${propKey}:${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)};`;
        result.push(`@media screen and (min-width:${breakpoint}) {${style}}`);
      }
    }
    //CSSの記述になるようプロパティごとに改行
    return result.join('\n');
  }
  return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`;
}

//CSSのプロパティ名をあらかじめ用意
const SPACE_KEYS = new Set([
  'margin',
  'margin-top',
  'margin-left',
  'margin-bottom',
  'margin-right',
  'padding',
  'padding-left',
  'padding-top',
  'padding-right',
  'padding-bottom',
]);
const COLOR_KEYS = new Set(['color', 'background-color']);
const FONT_SIZE_KEYS = new Set(['font-size']);
const LETTER_SPACING_KEYS = new Set(['letter-spacing']);
const LINE_HEIGHT_KEYS = new Set(['line-height']);

/**
 *  Themeに指定されたCSSプロパティの値に変換
 * @param propKey CSSプロパティ
 * @param value CSSプロパティの値 値を示す文字列またはsm:'3'などの形で
 * @param theme AppTheme
 * @returns CSSプロパティとその値
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
  if (
    theme &&
    theme.space &&
    SPACE_KEYS.has(propKey) &&
    isSpaceThemeKeys(value, theme)
  ) {
    return theme.space[value];
  } else if (
    theme &&
    theme.colors &&
    COLOR_KEYS.has(propKey) &&
    isColorThemeKeys(value, theme)
  ) {
    return theme.colors[value];
  } else if (
    theme &&
    theme.fontSize &&
    FONT_SIZE_KEYS.has(propKey) &&
    isFontSizeThemeKeys(value, theme)
  ) {
    return theme.fontSize[value];
  } else if (
    theme &&
    theme.letterSpacing &&
    LETTER_SPACING_KEYS.has(propKey) &&
    isLetterSpacingThemeKeys(value, theme)
  ) {
    return theme.letterSpacing[value];
  } else if (
    theme &&
    theme.lineHeights &&
    LINE_HEIGHT_KEYS.has(propKey) &&
    isLineHeightThemeKeys(value, theme)
  ) {
    return theme.lineHeights[value];
  }

  return value;
}

//propが渡ってきた場合に,それがプロパティの値だけでなく、
//レスポンシブ型の記述であった場合はtrueを返す
function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
  return (
    prop &&
    (prop.base !== undefined ||
      prop.sm !== undefined ||
      prop.md !== undefined ||
      prop.lg !== undefined ||
      prop.xl !== undefined)
  );
}

//与えられたpropがthemeオブジェクトのspaceプロパティに存在するかどうかを判定
function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
  /****************
   * デバッグ用
   ****************/
  // console.log(prop);
  // console.log(theme);
  // console.log(
  //   Object.keys(theme.letterSpacing).filter((key) => {
  //     return key === prop;
  //   }),
  // );
  return (
    //spaceオブジェクトのキーを取得し、
    //themeオブジェクト => {
    //0: '0px',
    //1: '8px',
    //2: '16px',
    //3: '32px',
    //4: '64px',
    //small: '8px',
    //medium: '16px',
    //large: '32px',
    //}
    Object.keys(theme.space).filter((key) => {
      //プロパティ名とキーが一致するもののみ抽出して配列を生成
      return key == prop;
      //その配列の個数が0以上かどうかの条件式を返却
    }).length > 0
  );
}

function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
  /****************
   * デバッグ用
   ****************/
  // console.log(prop);
  // console.log(theme);
  // console.log(
  //   Object.keys(theme.letterSpacing).filter((key) => {
  //     return key === prop;
  //   }),
  // );
  return (
    //colorsオブジェクトのキーを取得
    //colorsオブジェクト => {
    //primary: '#3f515b',
    //primaryDark: '#2c387e',
    //primaryLight: '#6573c3',
    //secondary: '#f50057',
    //soceondaryDark: '#ab003c',
    //secondaryLight: '#f73378',
    //danger: '#ed1c24',
    //gray: '#6b6b6b',
    //black: '#000000',
    //white: '#ffffff',
    //}
    Object.keys(theme.colors).filter((key) => {
      //プロパティ名とキーが一致するもののみ抽出して配列を生成
      return key === prop;
      //その配列の個数が0以上かどうかの条件式を返却
    }).length > 0
  );
}

function isFontSizeThemeKeys(
  prop: any,
  theme: AppTheme,
): prop is FontSizeThemeKeys {
  /****************
   * デバッグ用
   ****************/
  // console.log(prop);
  // console.log(theme);
  // console.log(
  //   Object.keys(theme.letterSpacing).filter((key) => {
  //     return key === prop;
  //   }),
  // );
  return (
    //fontsizeオブジェクトのキーを取得し、
    //themeオブジェクト => {
    //0: 12,
    //1: 14,
    //2: 16,
    //3: 20,
    //4: 24,
    //5: 32,
    //extraSmall: 12,
    //small: 14,
    //medium: 16,
    //mediumLarge: 20,
    //large: 24,
    //extraLarge: 32,
    //}
    Object.keys(theme.fontSize).filter((key) => {
      //プロパティ名とキーが一致するもののみ抽出して配列を生成
      return key === prop;
      //その配列の個数が0以上かどうかの条件式を返却
    }).length > 0
  );
}

function isLetterSpacingThemeKeys(
  prop: any,
  theme: AppTheme,
): prop is LetterSpacingThemeKeys {
  /****************
   * デバッグ用
   ****************/
  // console.log(prop);
  // console.log(theme);
  // console.log(
  //   Object.keys(theme.letterSpacing).filter((key) => {
  //     return key === prop;
  //   }),
  // );

  return (
    //letterSpacingオブジェクトののキーを取得し、
    //themeオブジェクト => {
    //0:'0.06px',
    //1:'0.07px',
    //2:'0.08px',
    //3:'0.09px',
    //4:'0.1px',
    //}
    Object.keys(theme.letterSpacing).filter((key) => {
      //プロパティ名とキーが一致するもののみ抽出して配列を生成
      return key === prop;
      //その配列の個数が0以上かどうかの条件式を返却
    }).length > 0
  );
}

function isLineHeightThemeKeys(
  prop: any,
  theme: AppTheme,
): prop is LineHeightsThemeKeys {
  /****************
   * デバッグ用
   ****************/
  // console.log(prop);
  // console.log(theme);
  // console.log(
  //   Object.keys(theme.letterSpacing).filter((key) => {
  //     return key === prop;
  //   }),
  // );
  return (
    //lineHeightsオブジェクトののキーを取得し、
    //themeオブジェクト => {
    //0:'17px',
    //1:'19px',
    //2:'22px',
    //3:'26px',
    //4:'28px',
    //5:'37px',
    //6:'43px',
    //}
    Object.keys(theme.lineHeights).filter((key) => {
      //プロパティ名とキーが一致するもののみ抽出して配列を生成
      return key === prop;
      //その配列の個数が0以上かどうかの条件式を返却
    }).length > 0
  );
}
