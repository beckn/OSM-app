import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Image, Stack, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import orderConfirmmark from '../public/images/orderConfirmmark.svg'
import { useLanguage } from '../hooks/useLanguage'
import useRequest from '../hooks/useRequest'
import {
    getInitMetaDataPerBpp,
    getPayloadForConfirmRequest,
} from '../utilities/confirm-utils'
import Loader from '../components/loader/Loader'
import { TransactionIdRootState } from '../lib/types/cart'
import { cartActions } from '../store/cart-slice'

const OrderConfirmation = () => {
    const { t } = useLanguage()
    const confirmRequest = useRequest()
    const router = useRouter()
    const initResponse = useSelector(
        (state: any) => state.initResponse.initResponse
    )
    const dispatch = useDispatch()

    const transactionId = useSelector(
        (state: { transactionId: TransactionIdRootState }) =>
            state.transactionId
    )

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        if (initResponse) {
            const initMetaDataPerBpp = getInitMetaDataPerBpp(initResponse)

            const payLoadForConfirmRequest = getPayloadForConfirmRequest(
                initMetaDataPerBpp,
                transactionId,
                localStorage.getItem('userPhone') as string
            )
            confirmRequest.fetchData(
                `${apiUrl}/client/v2/confirm`,
                'POST',
                payLoadForConfirmRequest
            )
        }
    }, [])

    useEffect(() => {
        if (
            !initResponse &&
            localStorage &&
            localStorage.getItem('initResult')
        ) {
            const parsedInitResult = JSON.parse(
                localStorage.getItem('initResult') as string
            )
            const initMetaDataPerBpp = getInitMetaDataPerBpp(parsedInitResult)

            const payLoadForConfirmRequest = getPayloadForConfirmRequest(
                initMetaDataPerBpp,
                transactionId,
                localStorage.getItem('userPhone') as string
            )
            confirmRequest.fetchData(
                `${apiUrl}/client/v2/confirm`,
                'POST',
                payLoadForConfirmRequest
            )
        }
    }, [])

    useEffect(() => {
        if (confirmRequest.data) {
            dispatch(cartActions.clearCart())
            localStorage.setItem(
                'confirmData',
                JSON.stringify(confirmRequest.data)
            )
            const timeout = setTimeout(() => {
                router.push('/orderDetails')
            }, 3000)

            // Clean up the timeout on component unmount
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [confirmRequest.data])

    if (confirmRequest.loading) {
        return <Loader loadingText={t.confirmingOrderLoader} />
    }

    return (
        <Box position={'relative'}>
            <Image
                src={orderConfirmmark}
                margin={'41px auto'}
            />
            <Text
                fontSize={'17px'}
                fontWeight={'600'}
                textAlign={'center'}
            >
                {t.orderPlaced}
            </Text>
            <Stack>
                <Text
                    textAlign={'center'}
                    marginTop={'8px'}
                    marginBottom={'15px'}
                    fontSize={'15px'}
                >
                    {t.confirmMessage1} <br />
                    {t.confirmMessage2}
                </Text>
            </Stack>
        </Box>
    )
}

export default OrderConfirmation
