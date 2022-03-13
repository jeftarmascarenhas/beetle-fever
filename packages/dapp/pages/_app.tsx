import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import MetaTags from '@/components/meta-tags/meta-tags'
import GlobalStyles from '@/global-styles/global'
import theme from '@/global-styles/theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <MetaTags />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
