import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSession } from '../api/CRUD'; // You can implement this API to retrieve session details

const ReturnPage = () => {
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            const urlParams = new URLSearchParams(location.search);
            const sessionId = urlParams.get('session_id');
            
            if (sessionId) {
                try {
                    const session = await fetchSession(sessionId);
                    setPaymentStatus(session.payment_status); // Check the payment status
                } catch (error) {
                    console.error("Error fetching session:", error);
                    setPaymentStatus("failed");
                }
            } else {
                setPaymentStatus("failed");
            }
            setLoading(false);
        };

        fetchPaymentStatus();
    }, [location]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (paymentStatus === 'paid') {
        return <div>Payment Successful! Thank you for your purchase.</div>;
    } else if (paymentStatus === 'failed') {
        return <div>Payment Failed. Please try again.</div>;
    }

    return <div>Unknown payment status. Please contact support.</div>;
};

export default ReturnPage;
