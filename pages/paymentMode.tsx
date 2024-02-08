import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, Image, Card, CardBody } from '@chakra-ui/react'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import Button from '../components/button/Button'
import CardWithCheckBox, { PaymentMethodsInfo } from '../components/card/Card'
import { useLanguage } from '../hooks/useLanguage'
// import creditCardImg from '../public/images/creditCardImg.svg'
import { cartActions } from '../store/cart-slice'
import styles from '../components/card/Card.module.css'

const PaymentMode = () => {
    const [checked, setChecked] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)

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
    const paymentTypeMapper = {
        direct_pay: 'PRE_FULFILLMENT',
        pay_at_store: 'POST_FULFILLMENT',
    }
    const [initResult, setInitResult] = useState<any>(null)
    const [paymentLink, setPaymentLink] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
        string | null
    >(null)

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
    const handleChange = (id: any) => {
        setSelectedCard(id)
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
                        <CardBody
                            padding={'15px 20px'}
                            pb="26px"
                        >
                            <Flex
                                className={styles.checkbox}
                                mb="40px"
                            >
                                <input
                                    type="checkbox"
                                    id={'visa'}
                                    onChange={() => handleChange('visa')}
                                    checked={selectedCard === 'visa'}
                                />
                                <label htmlFor={'visa'}>
                                    <Text
                                        mt={'-3px'}
                                        position={'absolute'}
                                        width={'70vw'}
                                        marginLeft="40px"
                                    >
                                        <Flex
                                            alignItems={'center'}
                                            mt="-6px"
                                        >
                                            <Image
                                                alt="visa-img"
                                                src={'./images/visa.svg'}
                                            />
                                            <Box pl={'20px'}>
                                                **** **** **** 1234
                                            </Box>
                                        </Flex>
                                    </Text>
                                </label>
                            </Flex>
                            <Flex className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    id={'master'}
                                    onChange={() => handleChange('master')}
                                    checked={selectedCard === 'master'}
                                />
                                <label htmlFor={'master'}>
                                    <Text
                                        mt={'-3px'}
                                        position={'absolute'}
                                        width={'70vw'}
                                        marginLeft="40px"
                                    >
                                        <Flex
                                            alignItems={'center'}
                                            mt="-6px"
                                        >
                                            <Image
                                                alt="card-img"
                                                src={'./images/master.svg'}
                                            />
                                            <Box pl={'20px'}>
                                                **** **** **** 1234
                                            </Box>
                                        </Flex>
                                    </Text>
                                </label>
                            </Flex>
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

                            Router.push({
                                pathname: '/orderConfirmation',
                                query: {
                                    paymentType:
                                        paymentTypeMapper[
                                            selectedPaymentMethod as string
                                        ],
                                },
                            })
                        } else {
                            dispatch(cartActions.clearCart())

                            Router.push({
                                pathname: '/orderConfirmation',
                                query: {
                                    paymentType:
                                        paymentTypeMapper[
                                            selectedPaymentMethod as string
                                        ],
                                },
                            })
                        }
                    }}
                />
            </Box>
        </>
    )
}

export default PaymentMode
