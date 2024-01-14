import '@/styles/globals.css'
import '@/styles/fonts.css'
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app'
import 'swiper/css';

export default function App({ Component, pageProps }: AppProps) {
  return <NextUIProvider className='light'>
    <Component {...pageProps} />
  </NextUIProvider>
}
