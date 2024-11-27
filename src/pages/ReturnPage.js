import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSession } from '../api/CRUD'; // You can implement this API to retrieve session details
import { useCart } from '../context/CartContext';

function ReturnPage() {
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');
    const { name } = useCart();

    const fetchPaymentStatus = async () => {
        if(sessionId)
        {
            try {
                const session = await fetchSession(sessionId);
                setPaymentStatus(session.payment_status);
            } catch (error) {
                console.error("Error fetching session :c", error);
                setPaymentStatus("failed");
            }
        } else {
            setPaymentStatus("failed");
        }
        setLoading(false);
    };

    fetchPaymentStatus();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (paymentStatus === 'paid') {
        return (
            <div>
                <h1>{name} Nombre</h1>
                <h1>Su pago se realizo con exito </h1>
                <h1>Su número para recoger el pedido es *Tomar numero de la api*</h1>
            </div>)
    } else if (paymentStatus === 'failed') {
        return (<h1>Hubo un error al realizar el pago, porfavor intentelo de nuevo despues de un tiempo</h1>        
        );
    }

    return <div>Unknown payment status. Please contact support.</div>;
};

export default ReturnPage;
