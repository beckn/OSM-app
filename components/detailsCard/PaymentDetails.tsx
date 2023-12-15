import React from 'react'
import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { useLanguage } from '../../hooks/useLanguage'

export interface PaymentDetailsProps {
    qoute: any
}

const PaymentDetails: React.FC<PaymentDetailsProps> = (props) => {
    const { qoute } = props
    const { breakup } = qoute

    const { t } = useLanguage()
    return (
        <Box>
            {breakup.map((item: any, idx: number) => {
                return (
                    <Flex
                        key={idx}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        pb={'15px'}
                        fontSize={'15px'}
                    >
                        <Text>{item.title}</Text>
                        <Text>
                            {t.currencySymbol} {item.price.value}
                        </Text>
                    </Flex>
                )
            })}

            <Divider mb={'15px'} />
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                fontSize={'15px'}
                fontWeight={'600'}
            >
                <Text>{t.totalText}</Text>
                <div className="flex">
                    <Text>
                        {t.currencySymbol} ${qoute.price.value}
                    </Text>
                </div>
            </Flex>
        </Box>
    )
}

export default PaymentDetails
