import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import SearchBar from '../components/header/SearchBar'
import ProductList from '../components/productList/ProductList'
import useRequest from '../hooks/useRequest'
import { responseDataActions } from '../store/responseData-slice'
import { RetailItem } from '../lib/types/products'
import Loader from '../components/loader/Loader'
import { useLanguage } from '../hooks/useLanguage'
import { Box, Text } from '@chakra-ui/react'

//Mock data for testing search API. Will remove after the resolution of CORS issue

const Search = () => {
    const [items, setItems] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const [providerId, setProviderId] = useState('')
    const { t, locale } = useLanguage()

    const { keyword } = router.query

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const { data, loading, error, fetchData } = useRequest()

    useEffect(() => {
        if (localStorage) {
            const stringifiedOptiontags = localStorage.getItem('optionTags')
            if (stringifiedOptiontags) {
                const providerId = JSON.parse(stringifiedOptiontags).providerId
                setProviderId(providerId)
            }
        }
    }, [])

    const searchPayload = {
        context: {
            domain: 'retail',
        },
        message: {
            criteria: {
                dropLocation: '48.85041854,2.343660801',
                categoryName:
                    locale === 'en' ? 'RetailEnglish' : 'RetailFrench',
                providerId: providerId,
            },
        },
    }

    const fetchDataForSearch = () =>
        fetchData(`${apiUrl}/client/v2/search`, 'POST', searchPayload)

    useEffect(() => {
        if (localStorage && !localStorage.getItem('searchItems')) {
            if (providerId) {
                fetchData(`${apiUrl}/client/v2/search`, 'POST', searchPayload)
            }
        }
    }, [providerId])

    useEffect(() => {
        if (localStorage) {
            const cachedSearchResults = localStorage.getItem('searchItems')
            if (cachedSearchResults) {
                const parsedCachedResults = JSON.parse(cachedSearchResults)
                setItems(parsedCachedResults)
            }
        }
    }, [])

    useEffect(() => {
        if (data) {
            dispatch(
                responseDataActions.addTransactionId(
                    data.context.transaction_id
                )
            )
            const allItems = data.message.catalogs.flatMap((catalog: any) => {
                if (
                    catalog.message &&
                    catalog.message.catalog &&
                    catalog.message.catalog['bpp/providers'].length > 0
                ) {
                    const providers = catalog.message.catalog['bpp/providers']
                    return providers.flatMap((provider: any) => {
                        if (provider.items && provider.items.length > 0) {
                            return provider.items.map((item: RetailItem) => {
                                return {
                                    bpp_id: catalog.context.bpp_id,
                                    bpp_uri: catalog.context.bpp_uri,
                                    ...item,
                                    providerId: provider.id,
                                    locations: provider.locations,
                                    bppName:
                                        catalog.message.catalog[
                                            'bpp/descriptor'
                                        ].name,
                                }
                            })
                        }
                        return []
                    })
                }
                return []
            })
            localStorage.setItem('searchItems', JSON.stringify(allItems))
            setItems(allItems)
        }
    }, [data])

    return (
        <>
            <Box
                height={'61px'}
                ml={'-20px'}
                mr={'-20px'}
                position={'fixed'}
                zIndex={'9'}
                background={'#fff'}
                width={'100%'}
                mt={'-20px'}
            >
                <SearchBar
                    searchString={''}
                    handleChange={(text: string) => {
                        localStorage.removeItem('searchItems')
                        fetchDataForSearch()
                    }}
                />
            </Box>
            <div>
                {loading ? (
                    <div>
                        <Loader
                            stylesForLoadingText={{
                                fontWeight: '600',
                                fontSize: '17px',
                            }}
                            subLoadingText={t.catalogSubLoader}
                            loadingText={t.catalogLoader}
                        />
                    </div>
                ) : (
                    <ProductList productList={items} />
                )}
            </div>
        </>
    )
}

export default Search
