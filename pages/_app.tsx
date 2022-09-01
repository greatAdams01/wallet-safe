import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import { ThemeProvider } from 'styled-components';
import { theme } from '@gnosis.pm/safe-react-components';
import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../layout/base'


function MyApp({ Component, pageProps }: AppProps) {
  return(
    // <ThemeProvider theme={theme}>
    <MoralisProvider initializeOnMount={false}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </MoralisProvider>
    // </ThemeProvider>
  )
}

export default MyApp
