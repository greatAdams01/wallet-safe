import { ThemeProvider } from 'styled-components';
import { theme } from '@gnosis.pm/safe-react-components';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../layout/base'


function MyApp({ Component, pageProps }: AppProps) {
  return(
    // <ThemeProvider theme={theme}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    // </ThemeProvider>
  )
}

export default MyApp
