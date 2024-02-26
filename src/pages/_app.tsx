// import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import GlobalSpinner from '@/components/organisms/GlobalSpinner';
import { AuthContextProvider } from '@/contexts/AuthContext';
import GlobalSpinnerContextProvider from '@/contexts/GlobalSpinnerContext';
import { ShoppingCartContextProvider } from '@/contexts/ShoppingCartContext';
import { theme } from '@/themes';
import type { ApiContext } from '@/types';
import { fetcher } from '@/utils';

const GlobalStyle = createGlobalStyle`
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

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
      </Head> */}
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {/* <SWRConfig value={{ fetcher: fetcher }}> */}
        {/* <GlobalSpinnerContextProvider>
          <ShoppingCartContextProvider> */}
        <AuthContextProvider context={context}>
          {/* <GlobalSpinner /> */}
          <Component {...pageProps} />
        </AuthContextProvider>
        {/* </ShoppingCartContextProvider>
        </GlobalSpinnerContextProvider> */}
        {/* </SWRConfig> */}
      </ThemeProvider>
    </>
  );
}
