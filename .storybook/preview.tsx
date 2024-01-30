import React from 'react';
import type { Preview } from '@storybook/react';
// import { addDecorator } from '@storybook/react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../src/themes';
import * as NextImage from 'next/image';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  //storybook7以降、addDecoratorが廃止されたため下記の記述に変更
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default preview;

export const GlobalStyle = createGlobalStyle`
html,
body,
textarea{
  padding:0;
  margin:0;
  font-family: -apple-stystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
*{
  box-sizing: border-box;
}
a{
  cursor:pointer;
  text-decoration:none;
  transition: 0.25s;
  color:#000;
}
ol,ul{
  list-style:none;
}
`;

//next/imageの差し替え
const OriginNextImage = NextImage.default;
console.log(NextImage);

// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props: any) => {
//     return typeof props.src === 'string' ? (
//       <OriginNextImage {...props} unoptimized blurDataURL={props.src} />
//     ) : (
//       <OriginNextImage {...props} unoptimized />
//     );
//   },
// });
