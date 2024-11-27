// src/Checkout.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button, Text, Input } from '@chakra-ui/react';
import { withMask } from 'use-mask-input';
import { createSession } from '../api/CRUD';
import { Alert } from '../components/ui/alert';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'; // Import Stripe components
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const { totalCount, cardData, cardCounts, setNewName } = useCart();
    
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const [clientSecret, setClientSecret] = useState(null);


    const handleCheckout = async () => {
        if (!userName.trim() || !userPhone.trim()) {
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }
        setErrorMessage('');
        setLoading(true);
        setNewName(userName);
        try {
            const payload = {
                name: userName,
                items: cardData
                    .filter(card => cardCounts[card.id] > 0)
                    .map(card => ({
                        id_drink: card.id,
                        price: card.stripePriceId,
                        quantity: cardCounts[card.id],
                    })),
            };
            const session = await createSession(payload); 
            
            setClientSecret(session.clientSecret); 

        } catch (error) {
            console.error(error);
            alert('Something went wrong while creating the session.');
        } finally {
            setLoading(false);
        }
    };

    if (totalCount === 0) {
        return <h1>No tienes artículos en tu carrito</h1>;
    }

    return (
        <div style={styles.home}>
            {/*Se oculta el formulario en cuanto se recibe respuesta de stripe*/}
            {!clientSecret && <div style={styles.form}>
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
                    disabled={clientSecret}
                />
                <Text textStyle="xl">Ingresa tu numero de telefono:</Text>
                <Input placeholder="(99) 99999-9999"
                    ref={withMask("(99) 99999-9999")}
                    variant="outline"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    mb={4}
                    disabled={clientSecret}
                />
                <Button onClick={handleCheckout} disabled={loading || clientSecret}>
                {loading ? 'Procesando...': 'Chekout'}
                </Button>
            </div>}
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={loadStripe('pk_test_51QLFynHSsQ6HUBrZGSapnw6lZU2aIXxg6uXi8s4cnpnIJ8PAsFFqbh2AKdyk2nPH6ZCejrHQREcIzozZORSvql7V00YTE7NztF')}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    );
};

const styles = {
    home: {
      paddingTop: 150
    },
  };

export default Checkout;
