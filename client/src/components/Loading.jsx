import React, { useEffect } from 'react'
import {useAppContext} from '../context/AppContext'
import { useLocation } from 'react-router-dom';

const Loading = () => {

    const {navigate, setCartItems, axios} = useAppContext();
    let {search} = useLocation();
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next');
    const success = query.get('success');
    const orderId = query.get('orderId');

    useEffect(()=>{
        const verifyPayment = async () => {
            try {
                if (success && orderId) {
                    const { data } = await axios.post('/api/order/verify', { success, orderId });
                    if (data.success) {
                        setCartItems({});
                    }
                }
            } catch (error) {
                console.error("Payment verification error:", error);
            } finally {
                navigate(`/${nextUrl || 'my-orders'}`);
            }
        };

        if (success && orderId) {
            verifyPayment();
        } else if (nextUrl) {
            const timer = setTimeout(()=>{
                navigate(`/${nextUrl}`)
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [nextUrl, success, orderId])
    
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300
        border-t-primary'></div>
    </div>
  )
}

export default Loading;