import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransactionIdRootState } from '../lib/types/cart';
import { useRouter } from 'next/router';
import LoaderWithMessage from '../components/loader/LoaderWithMessage';
import { useLanguage } from '../hooks/useLanguage';

const PaymentStatus = () => {
    const paymentapiUrl = process.env.NEXT_PUBLIC_PAYMENT_URL;
    const router = useRouter();
    const { t, locale } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const transactionId = useSelector(
        (state: { transactionId: TransactionIdRootState }) =>
            state.transactionId
    );

    const checkPaymentStatus = async (token: any, transactionId: any) => {
        const id = transactionId.transactionId;

        try {
            const response = await fetch(
                `${paymentapiUrl}/check-payment-status-for-service?bookingId=${id}&service=retail&customerName=OSC`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'text/event-stream',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let resP = await response.body?.getReader().read();
            let textdecoder = new TextDecoder('utf-8');
            const chunkStr = textdecoder.decode(resP?.value);
            const events = chunkStr.split('\n');
            for (const event of events) {
                if (event.trim() === '') continue;
                const eventDataString = event.replace(/^data:\s*/, '');
                const eventData = JSON.parse(eventDataString);
                const paymentStatus = eventData.paymentStatus;
                if (paymentStatus === 'unpaid' || paymentStatus === 'failed') {
                    router.push('/paymentFailure');
                } else if (paymentStatus === 'pending') {
                    if (checkTimeExceeded()) {
                        setError(true); 
                        setLoading(false);
                        return;
                    }
                } else if (paymentStatus === 'paid') {
                    router.push({
                        pathname: '/orderConfirmation',
                        query: { paymentType: 'PRE_FULFILLMENT' }
                    });
                }
            }
            
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
        } finally {
            setLoading(false);
        }
    };
    const checkTimeExceeded = () => {
        const currentTime = new Date().getTime();      
        const twoMinutesInMillis = 2 * 60 * 1000; 
        const twoMinutesAgo = currentTime - twoMinutesInMillis; 
        const startTime = new Date("2024-03-22T12:00:00").getTime(); 
        return twoMinutesAgo >= startTime;
    };
    
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        const interval = setInterval(() => {
            checkPaymentStatus(token, transactionId);
        }, 30000); 

        return () => clearInterval(interval);
    }, [transactionId]);

    if (loading) {
        return (
            <LoaderWithMessage
                loadingText={t.categoryLoadPrimary}
                loadingSubText={t.paymentStatus}
            />
        );
    }

    if (error) {
        router.push('/paymentFailure');
    }

    return (
        <div>
        </div>
    );
};

export default PaymentStatus;
