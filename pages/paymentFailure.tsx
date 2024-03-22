import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import paymentfail from '../public/images/paymentFail.svg'
import Button from '../components/button/Button'
import { useRouter } from 'next/router'
import { useLanguage } from '../hooks/useLanguage'

const PaymentFailure = () => {
    const router = useRouter()
    const { t } = useLanguage()
    const handleTryAgain=()=>{
        router.push('/checkoutPage')
    }
    return (
        <Box>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                rowGap={'8px'}
                mt={'50px'}
                
                flexDir={"column"}
            >
                <Image
                    src={paymentfail}
                    alt="payment fail"
                    mb={"20px"}
                />
                <Box textAlign={"center"}>
                <Text
                    fontSize={'15px'}
                    fontWeight={600}
                >
                    {t.paymentFailed}
                </Text>
                <Text
                    fontSize={'15px'}
                    fontWeight={400}
                >
                    {t.yourTranscation}
                </Text>
                <Text
                    fontSize={'15px'}
                    fontWeight={400}
                    mb={"80px"}
                >
                    {t.tryAgain}
                </Text>
                </Box>
  
                    <Button
                        buttonText={'Try Again'}
                        isDisabled={false}
                        type={'solid'}
                        handleOnClick={handleTryAgain}
                    />
                    <Button
                        buttonText={'Go Back Home'}
                        isDisabled={false}
                        type={'outline'}
                        handleOnClick={() => router.push('/homePage')}
                    />
            </Flex>
        </Box>
    )
}

export default PaymentFailure
