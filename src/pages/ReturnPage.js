import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSession } from '../api/CRUD'; // You can implement this API to retrieve session details
import { Stack } from '@chakra-ui/react';
import OrderCard from '../components/OrderCard';

function ReturnPage() {
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [session, setSession] = useState(null);

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');


    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if(sessionId)
            {
                try {
                    const sessionData = await fetchSession(sessionId);
                    setSession(sessionData);
                    setPaymentStatus(sessionData.payment_status);
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
    }, [sessionId]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (paymentStatus === 'paid') {
        return (
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center'
              }}
            >
              <h1 style={{
                paddingTop:'100px'
              }}>Gracias por tu Bamboorden!</h1>
              <img 
                src="https://bamboo-tea-media.s3.us-east-2.amazonaws.com/image-from-rawpixel-id-10094233-png.png" 
                style={{ maxWidth: '30%', height: 'auto' }} 
                alt="Bubble Tea" 
              />
              <h1>{session.order_name}, su número para recoger el pedido es {session.order_id}</h1>
              <h2>Recoge tu pedido en Avenida Tepeyac 4919, Zapopan, Jal.</h2>
              <Stack>
                {session.orders_drinks
                  .map(card =>(
                    <OrderCard
                      id={card.id}
                      name={card.name}
                      description={card.description}
                      amount={card.amount}
                    />
                  ))}
              </Stack>
            </div>
          );
          
    } else if (paymentStatus === 'failed') {
        return (<h1>Hubo un error al realizar el pago, porfavor intentelo de nuevo despues de un tiempo</h1>        
        );
    }

    return <div>Unknown payment status. Please contact support.</div>;
};

export default ReturnPage;
