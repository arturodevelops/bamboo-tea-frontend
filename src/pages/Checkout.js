// src/Checkout.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Text, Input } from '@chakra-ui/react';
import { withMask } from 'use-mask-input';
import { createSession } from '../api/CRUD';
import { Alert } from '../components/ui/alert';

const Checkout = () => {

    const [loading, setLoading] = useState(false);
    const {totalCount, cardData, cardCounts} = useCart();
    
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleChekout = async () => {
        if (!userName.trim() || !userPhone.trim()){
                setErrorMessage('Por favor, completa todos los campos.');
                return;
            }
        setErrorMessage('');
        setLoading(true);
        try {
            const payload = {
                name: userName,
                items: cardData.map( card => ({
                    price: card.StripePriceId,
                    quantity: cardCounts[card.id] || 0,
                })),
            }
    
            const session = await createSession(payload);
    
            const stripe = await loadStripe('pk_test_51QLFynHSsQ6HUBrZGSapnw6lZU2aIXxg6uXi8s4cnpnIJ8PAsFFqbh2AKdyk2nPH6ZCejrHQREcIzozZORSvql7V00YTE7NztF');
        
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id
            });
    
            if(error) {
                alert('Somethin went wrong'); //Manejar errores
            }
        } catch (error) {
            alert('Somethin went wrong');
        } finally {
            setLoading(false);
        }
        
    };

    if (totalCount === 0) {
        return <h1>No tienes artículos en tu carrito</h1>;
    }

  return (
    <div>
        <div style={styles.form}>
          <Text textStyle="3x1" mb={2}>Llena los datos para generar el pedido</Text>
          {errorMessage &&
            <Alert status="error" title="Campos invalidos">
                {errorMessage}
            </Alert>
          }
          <Text textStyle="xl">Ingresa tu nombre:</Text>
          <Input placeholder='Tu nombre'
            variant="outline"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            mb={4}
          />
          <Text textStyle="xl">Ingresa tu numero de telefono:</Text>
          <Input placeholder="(99) 99999-9999"
            ref={withMask("(99) 99999-9999")}
            variant="outline"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            mb={4}
          />
        </div>
        <Button onClick={handleChekout} disabled={loading}>
            {loading ? 'Procesando...': 'Chekout'}
        </Button>
    </div>
  );
};

// Styles for the CardElement and button

const styles = {
    form: {
        
    }
}

export default Checkout;
