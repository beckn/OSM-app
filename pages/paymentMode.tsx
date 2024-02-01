import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, Image, Card, CardBody } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Button from '../components/button/Button'
import CardWithCheckBox, { PaymentMethodsInfo } from '../components/card/Card'
import { useLanguage } from '../hooks/useLanguage'
import creditCardImg from '../public/images/creditCardImg.svg'
import { cartActions } from '../store/cart-slice'

function PaymentMode() {
    const { t } = useLanguage()
    const [filterMethods, setFilterMethods] = useState<PaymentMethodsInfo[]>([
        {
            id: 'direct_pay',
            isDisabled: false,
            paymentMethod: t.directPay,
        },
        {
            id: 'pay_at_store',
            isDisabled: false,
            paymentMethod: t.payAtStore,
        },
    ])
    const [initResult, setInitResult] = useState<any>(null)
    const [paymentLink, setPaymentLink] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
        string | null
    >(null)

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage && localStorage.getItem('initResult')) {
            const parsedInitResult = JSON.parse(
                localStorage.getItem('initResult') as string
            )
            const paymentLink =
                parsedInitResult[0].message.catalogs.responses[0].message.order
                    .payment.uri
            if (!paymentLink) {
                setFilterMethods(
                    filterMethods.filter((_, index) => index === 1)
                )
            }
            setPaymentLink(paymentLink)
            setInitResult(parsedInitResult)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!initResult) {
        return <></>
    }

    return (
        <>
            <Box
                height={'72vh'}
                position={'relative'}
            >
                {/* <AppHeader appHeaderText={t.selectPaymentMethod} /> */}
                <Box>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        fontSize={'17px'}
                        mb={'10px'}
                    >
                        <Text className="text-ellipsis">{t.cards}</Text>
                        <Text
                            color={'rgba(var(--color-primary))'}
                            fontSize={'15px'}
                        >
                            {t.addCard}
                        </Text>
                    </Flex>
                    <Card
                        className="border_radius_all"
                        mb={'20px'}
                    >
                        <CardBody padding={'15px 20px'}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image src={creditCardImg} />
                        </CardBody>
                    </Card>
                </Box>
                <Text
                    marginBottom={'8px'}
                    fontSize={'17px'}
                >
                    Other
                </Text>
                <CardWithCheckBox
                    paymentMethods={filterMethods}
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                />
            </Box>
            <Box
                position={'absolute'}
                bottom={'10px'}
                width={'90%'}
            >
                <Button
                    buttonText={t.confirmOrder}
                    type={'solid'}
                    isDisabled={!selectedPaymentMethod}
                    handleOnClick={() => {
                        if (
                            selectedPaymentMethod === 'direct_pay' &&
                            paymentLink.trim().length
                        ) {
                            window.open(paymentLink, '_blank', 'popup')
                            dispatch(cartActions.clearCart())
                            router.push('/orderConfirmation')
                        } else {
                            dispatch(cartActions.clearCart())
                            router.push('/orderConfirmation')
                        }
                    }}
                />
            </Box>
        </>
    )
}

export default PaymentMode
