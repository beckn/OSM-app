import {
    Box,
    CardBody,
    Divider,
    Flex,
    Stack,
    Text,
    Image,
    StackDivider,
    Card,
    useDisclosure,
    Link,
    Textarea,
} from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Accordion from '../components/accordion/Accordion'
import CallphoneIcon from '../public/images/CallphoneIcon.svg'
import locationIcon from '../public/images/locationIcon.svg'
import nameIcon from '../public/images/nameIcon.svg'
import { useLanguage } from '../hooks/useLanguage'
import { ResponseModel } from '../lib/types/responseModel'
import {
    getConfirmMetaDataForBpp,
    formatTimestamp,
    getPayloadForStatusRequest,
    getPayloadForTrackRequest,
} from '../utilities/confirm-utils'
import {
    getDataPerBpp,
    getPayloadForOrderHistoryPost,
} from '../utilities/orderDetails-utils'
import TrackIcon from '../public/images/TrackIcon.svg'
import ViewMoreOrderModal from '../components/orderDetails/ViewMoreOrderModal'
import useRequest from '../hooks/useRequest'
import {
    orderCardStatusMap,
    RenderOrderStatusList,
} from '../components/orderDetails/RenderOrderStatusTree'
import Router, { useRouter } from 'next/router'
import { StatusResponseModel } from '../lib/types/order-details.types'
import PaymentDetails from '../components/detailsCard/PaymentDetails'
import { QuoteModel } from '../components/detailsCard/PaymentDetails.types'
import Button from '../components/button/Button'
import BottomModal from '../components/BottomModal'
import LoaderWithMessage from '../components/loader/LoaderWithMessage'
import styles from '../components/card/Card.module.css'

const OrderDetails = () => {
    const [allOrderDelivered, setAllOrderDelivered] = useState(false)
    const [confirmData, setConfirmData] = useState<ResponseModel[]>([])
    const [statusResponse, setStatusResponse] = useState<StatusResponseModel[]>(
        []
    )
    const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const statusRequest = useRequest()
    const trackRequest = useRequest()
    const router = useRouter()
    const { orderId } = router.query
    const [selectedTypeMethod, setSelectedTypeMethod] = useState<string | null>(
        null
    )
    const { t } = useLanguage()

    const paymentMethods = {
        'PRE-FULFILLMENT': t.directPay,
        POST_FULFILLMENT: t.payAtStore,
    }

    interface CancellationType {
        id: string
        cancellationTypeText: string
        checked?: boolean
    }

    const [cancellationType, setCancellationType] = useState<
        CancellationType[]
    >([
        {
            id: '1',
            cancellationTypeText: 'Merchant is taking too long',
            checked: false,
        },
        {
            id: '2',
            cancellationTypeText: 'Ordered by mistake',
            checked: false,
        },
        {
            id: '3',
            cancellationTypeText: 'I’ve changed my mind',
            checked: false,
        },
        {
            id: '4',
            cancellationTypeText: 'Other :',
            checked: false,
        },
    ])

    const paymentStatus = {
        'NOT-PAID': t.paymentPending,
        PAID: t.paid,
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

    const bearerToken = Cookies.get('authToken')
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json', // You can set the content type as needed
        },
    }

    useEffect(() => {
        if (
            orderId &&
            localStorage &&
            localStorage.getItem('orderHistoryArray')
        ) {
            const parsedOrderHistoryArray = JSON.parse(
                localStorage.getItem('orderHistoryArray') as string
            )

            const relatedOrder = parsedOrderHistoryArray.find(
                (parsedOrder: any) => parsedOrder.parentOrderId === orderId
            )

            const transactionId = localStorage.getItem(
                'transactionId'
            ) as string

            setConfirmData(relatedOrder.orders)

            const confirmOrderMetaDataPerBpp = getConfirmMetaDataForBpp(
                relatedOrder.orders
            )
            const payloadForStatusRequest = getPayloadForStatusRequest(
                confirmOrderMetaDataPerBpp,
                transactionId
            )
            const payloadForTrackRequest = getPayloadForTrackRequest(
                confirmOrderMetaDataPerBpp,
                transactionId
            )

            trackRequest.fetchData(
                `${apiUrl}/client/v2/track`,
                'POST',
                payloadForTrackRequest
            )

            statusRequest.fetchData(
                `${apiUrl}/client/v2/status`,
                'POST',
                payloadForStatusRequest
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (localStorage) {
            const stringifiedConfirmData = localStorage.getItem('confirmData')
            if (stringifiedConfirmData) {
                const parsedConfirmedData = JSON.parse(stringifiedConfirmData)
                setConfirmData(parsedConfirmedData)

                const confirmOrderMetaDataPerBpp =
                    getConfirmMetaDataForBpp(parsedConfirmedData)
                const transactionId = localStorage.getItem(
                    'transactionId'
                ) as string
                const payloadForStatusRequest = getPayloadForStatusRequest(
                    confirmOrderMetaDataPerBpp,
                    transactionId
                )
                const payloadForTrackRequest = getPayloadForTrackRequest(
                    confirmOrderMetaDataPerBpp,
                    transactionId
                )

                trackRequest.fetchData(
                    `${apiUrl}/client/v2/track`,
                    'POST',
                    payloadForTrackRequest
                )

                statusRequest.fetchData(
                    `${apiUrl}/client/v2/status`,
                    'POST',
                    payloadForStatusRequest
                )
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (statusRequest.data) {
            localStorage.setItem(
                'statusResponse',
                JSON.stringify(statusRequest.data)
            )
            setStatusResponse(statusRequest.data as StatusResponseModel[])
            if (
                statusRequest.data.every(
                    (res) => res.message.order.state === 'DELIVERED'
                )
            ) {
                setAllOrderDelivered(true)
            }
            const ordersPayload = getPayloadForOrderHistoryPost(
                statusRequest.data as StatusResponseModel[]
            )
            axios
                .post(`${strapiUrl}/orders`, ordersPayload, axiosConfig)
                .then((res) => {
                    return res
                })
                .catch((err) => console.error(err))
        }
    }, [statusRequest.data])

    if (statusRequest.loading) {
        return (
            <LoaderWithMessage
                loadingText={t.statusLoaderText}
                loadingSubText={t.stausLoaderSubText}
            />
        )
    }

    if (!confirmData.length || !statusResponse.length) {
        return <></>
    }

    const statusDataPerBpp = getDataPerBpp(statusResponse)

    const orderFromStatusResponse = statusResponse[0].message.order
    const paymentObject = orderFromStatusResponse.payment

    const paymentState = paymentObject.status
    const paymentLink = paymentObject.uri
    const paymentType = paymentObject.type

    const totalQuantityOfOrder = (res: any) => {
        let count = 0
        res.message.order.items.forEach((item: any) => {
            count += item.quantity.count
        })
        return count
    }

    const getExtractedName = (str: string) => {
        const parts = str
            .trim()
            .split('/')
            .filter((part) => part !== '')
        const extracted = parts[parts.length - 1]

        return extracted
    }

    const shippingDetails = {
        name: getExtractedName(orderFromStatusResponse.billing.name),
        address: `${orderFromStatusResponse.billing.address.door} ${orderFromStatusResponse.billing.address.state}`,
        phone: orderFromStatusResponse.billing.phone,
    }

    const cancelOrderModalClose = () => {
        setCancelOrderModalOpen(false)
    }
    const handleCheckboxChange = (id: string) => {
        setCancellationType((prevTypes) =>
            prevTypes.map((type) => ({
                ...type,
                checked: type.id === id ? !type.checked : false,
            }))
        )
    }

    return (
        <>
            {/* <AppHeader appHeaderText={t.selectPaymentMethod} /> */}
            {allOrderDelivered ? (
                <Card
                    mb={'20px'}
                    border={'1px solid rgba(94, 196, 1, 1)'}
                    className="border_radius_all"
                >
                    <CardBody padding={'15px 20px'}>
                        <Flex
                            alignItems={'center'}
                            pb={'3px'}
                        >
                            <Image
                                width={'12px'}
                                height={'13px'}
                                src={TrackIcon}
                            />
                            <Text
                                pl={'8px'}
                                fontSize={'17px'}
                                fontWeight={'600'}
                            >
                                All orders delivered!
                            </Text>
                        </Flex>
                        <Flex
                            alignItems={'center'}
                            fontSize={'15px'}
                            pl={'20px'}
                        >
                            <Text>How did we do?</Text>
                            <Text
                                onClick={() => router.push('/feedback')}
                                pl={'10px'}
                                color={'rgba(var(--color-primary))'}
                            >
                                Rate Us
                            </Text>
                        </Flex>
                    </CardBody>
                </Card>
            ) : null}
            <Accordion
                accordionHeader={
                    <Box>
                        <Text>{t.orderSummary}</Text>
                    </Box>
                }
            >
                <CardBody
                    pt={'unset'}
                    fontSize={'15px'}
                >
                    <Flex
                        pt={'unset'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Text>{t.orderPlacedAt}</Text>
                        <Text>
                            {formatTimestamp(
                                orderFromStatusResponse.created_at
                            )}
                        </Text>
                    </Flex>
                    {Object.keys(statusDataPerBpp).map((key) => (
                        <Box key={statusDataPerBpp[key].id}>
                            <Flex
                                pt={4}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Text>{t.ordersFulfilled}</Text>
                                <Box>
                                    <Text
                                        as={'span'}
                                        pr={'2px'}
                                    >
                                        {
                                            statusResponse.filter(
                                                (res: any) =>
                                                    res.message.order.state ===
                                                    'DELIVERED'
                                            ).length
                                        }
                                    </Text>
                                    <Text as={'span'}>of</Text>
                                    <Text
                                        as={'span'}
                                        pl={'2px'}
                                    >
                                        {confirmData.length}
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </CardBody>
            </Accordion>

            {statusResponse.map((res: any, index: number) => (
                <Accordion
                    key={index}
                    accordionHeader={
                        <Box>
                            <Flex
                                mb={'15px'}
                                fontSize={'17px'}
                                alignItems={'center'}
                            >
                                <Text pr={'8px'}>{t.orderId}:</Text>

                                <Text
                                    textOverflow={'ellipsis'}
                                    overflow={'hidden'}
                                    whiteSpace={'nowrap'}
                                >
                                    {res.message.order.displayId}
                                </Text>
                            </Flex>
                            <Flex
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Flex maxWidth={'57vw'}>
                                    <Text
                                        textOverflow={'ellipsis'}
                                        overflow={'hidden'}
                                        whiteSpace={'nowrap'}
                                        fontSize={'12px'}
                                        fontWeight={'400'}
                                    >
                                        {
                                            res.message.order.items[0]
                                                .descriptor.name
                                        }
                                    </Text>
                                    {totalQuantityOfOrder(res) !== 1 && (
                                        <Text
                                            pl={'5px'}
                                            color={'rgba(var(--color-primary))'}
                                            fontSize={'12px'}
                                            fontWeight={'600'}
                                            onClick={onOpen}
                                        >
                                            +{totalQuantityOfOrder(res) - 1}
                                        </Text>
                                    )}
                                </Flex>

                                <Text
                                    fontSize={'15px'}
                                    fontWeight={'600'}
                                    color={
                                        res.message.order.state === 'INITIATED'
                                            ? 'rgba(var(--pending-status-color))'
                                            : 'rgba(var(--delivered-status-color))'
                                    }
                                >
                                    {
                                        t[
                                            `${
                                                orderCardStatusMap[
                                                    res.message.order.state
                                                ]
                                            }`
                                        ]
                                    }
                                </Text>
                            </Flex>
                        </Box>
                    }
                >
                    <ViewMoreOrderModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        items={res.message.order.items}
                        orderId={res.message.order.displayId}
                    />
                    <Divider mb={'20px'} />
                    <CardBody pt={'unset'}>
                        {RenderOrderStatusList(res)}
                    </CardBody>
                </Accordion>
            ))}

            <Accordion accordionHeader={t.shipping}>
                <CardBody
                    pt={'unset'}
                    pb={'15px'}
                >
                    <Box>
                        <Stack
                            divider={<StackDivider />}
                            spacing="4"
                        >
                            <Flex alignItems={'center'}>
                                <Image
                                    src={nameIcon}
                                    pr={'12px'}
                                />
                                <Text fontSize={'17px'}>
                                    {shippingDetails.name}
                                </Text>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Image
                                    src={locationIcon}
                                    pr={'12px'}
                                />
                                <Text fontSize={'15px'}>
                                    {shippingDetails.address}
                                </Text>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Image
                                    src={CallphoneIcon}
                                    pr={'12px'}
                                />
                                <Text fontSize={'15px'}>
                                    {shippingDetails.phone}
                                </Text>
                            </Flex>
                        </Stack>
                    </Box>
                </CardBody>
            </Accordion>
            <Accordion
                accordionHeader={
                    <Flex>
                        <Text>{t.paymentText}</Text>
                        {paymentState !== 'PAID' && (
                            <Image
                                pl="12px"
                                src="./images/error.svg"
                                alt="payment-pending-logo"
                            />
                        )}
                    </Flex>
                }
            >
                <CardBody
                    pt={'unset'}
                    pb={'unset'}
                >
                    <PaymentDetails
                        qoute={orderFromStatusResponse.quote as QuoteModel}
                    />
                </CardBody>
                <CardBody
                    pb={'unset'}
                    pt={'15px'}
                >
                    <Flex
                        fontSize={'15px'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        pb={'15px'}
                    >
                        <Flex
                            justifyContent={'space-between'}
                            alignItems="center"
                            width={'100%'}
                        >
                            <Text>{t.status}</Text>
                            <Box fontSize={'12px'}>
                                <Text
                                    as="span"
                                    pr="12px"
                                    color={'rgba(var(--color-primary))'}
                                >
                                    {paymentStatus[paymentState] ?? ''}
                                </Text>

                                {paymentState !== 'PAID' && (
                                    <Link
                                        onClick={() =>
                                            window.open(
                                                paymentLink,
                                                '_blank',
                                                'popup'
                                            )
                                        }
                                        color={'#4D930D'}
                                        textDecoration="underline"
                                    >
                                        {t.payHere}
                                    </Link>
                                )}
                            </Box>
                        </Flex>
                        {/* <Text>{orderState}</Text> */}
                    </Flex>
                    <Flex
                        fontSize={'15px'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        pb={'15px'}
                    >
                        <Text>{t.paymentMethod}</Text>
                        <Text>{paymentMethods[paymentType] ?? ''}</Text>
                    </Flex>
                </CardBody>
            </Accordion>
            <Button
                buttonText={t.goBackHome}
                isDisabled={false}
                type={'solid'}
                handleOnClick={() => {
                    Router.push('/homePage')
                }}
            />
            <Button
                buttonText={t.cancelOrder}
                isDisabled={false}
                type={'outline'}
                handleOnClick={() => setCancelOrderModalOpen(true)}
            />
            <Box className={styles.cancellationBtn}>
                <BottomModal
                    isOpen={cancelOrderModalOpen}
                    onClose={() => {}}
                >
                    <Box padding={'8px'}>
                        <Flex
                            justifyContent={'space-between'}
                            alignItems="center"
                            pb={'20px'}
                            pt="6px"
                        >
                            <Text
                                fontSize={'17px'}
                                fontWeight="600"
                            >
                                {t.orderCancellation}
                            </Text>
                            <Image
                                onClick={cancelOrderModalClose}
                                src="./images/crossIcon.svg"
                                alt="cross img"
                            />
                        </Flex>
                        <Divider />

                        <Text
                            pt={'20px'}
                            pb="15px"
                            fontWeight={'500'}
                            fontSize={'15px'}
                        >
                            {t.cancellationType}
                        </Text>

                        {cancellationType.map((Type, ind) => {
                            return (
                                <Box
                                    key={Type.id}
                                    className={styles.checkbox}
                                    mb={'15px'}
                                    fontSize={'15px'}
                                >
                                    <input
                                        type="checkbox"
                                        id={Type.id}
                                        checked={Type.checked || false}
                                        onChange={() =>
                                            handleCheckboxChange(Type.id)
                                        }
                                    />
                                    <label
                                        htmlFor={Type.id}
                                        style={{ left: '24px' }}
                                    >
                                        <Text
                                            mt={'-3px'}
                                            position={'absolute'}
                                            width={'50vw'}
                                            marginLeft="40px"
                                        >
                                            {Type.cancellationTypeText}
                                        </Text>
                                    </label>
                                </Box>
                            )
                        })}
                        <Textarea
                            w="332px"
                            height="124px"
                            resize="none"
                            placeholder="Please specify the reason"
                            boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)"
                            mb={'15px'}
                        />
                    </Box>
                    <Button
                        buttonText={t.proceedToPay}
                        isDisabled={true}
                        type={'solid'}
                        handleOnClick={() => {}}
                    />
                </BottomModal>
            </Box>
        </>
    )
}

export default OrderDetails
