import type { AppProps } from 'next/app'

import Layout from '../components/layout/Layout'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'react-toastify/dist/ReactToastify.css'
import { ChakraProvider } from '@chakra-ui/react'

import "../styles/globals.css";
import { Garuda } from 'garudaa';
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/index'

Garuda.init({
	projectId: "65c1eabacbe90cafae918622",
	host: 'https://garuda-api.becknprotocol.io',
});
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </ChakraProvider>
    )
}

export default MyApp
