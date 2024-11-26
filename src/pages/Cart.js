import React, { useState }from 'react';
import { useCart } from '../context/CartContext';
import { Button, Text, Input, Alert, AlertIcon} from '@chakra-ui/react';
import CartCard from '../components/CartCard';

function Cart() {
  const { cardData, handleCardCountRestChange, handleCardCountAddChange, cardCounts, totalCount} = useCart(); // Access context state

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  


  const handlePayment = () => {
    if (!userName.trim() || !userPhone.trim()){
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }
    setErrorMessage('');
    
  }

  const totalPrice = cardData.reduce((total, card ) => {
    const count = cardCounts[card.id] || 0;
    return total + card.price * count;
  }, 0);

  if (totalCount === 0)
    return (<h1>No cuentas con articulos en tu carrito</h1>);

  return (
      <div style={styles.home}>
        <div style={styles.form}>
          <Text textStyle="3x1" mb={2}>Llena los datos para generar el pedido</Text>
          {errorMessage.toString() && (
            <Alert status="error" mb={4}>
              {errorMessage}
            </Alert>
          )}
          <Text textStyle="xl">Ingresa tu nombre:</Text>
          <Input placeholder="Tu nombre" variant="outline" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            mb={4}
          />
          <Text textStyle="xl">Ingresa tu numero de telefono:</Text>
          <Input placeholder='Tu telefono' variant="outline"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            mb={4}
          />
        </div>
        <div style={styles.separation}/> 
        <div style={styles.cards} >
          {cardData
            .map(card => (
            <CartCard 
              key={card.id}
              id={card.id}
              name={card.name}
              description={card.description}
              imageUrl={card.imageUrl}
              price={card.price}
              onRestCountChange={handleCardCountRestChange}
              onAddCountChange={handleCardCountAddChange}
              cardCounts={cardCounts}   
            />
            ))}
          <Text fontSize="xl" fontWeight="bold">
            Total: ${totalPrice.toFixed(2)}
          </Text>
          <Button variant="outline" width="200px" onClick={handlePayment}>Pasar a pagar</Button>
        </div>
      </div>
  );
}

const styles = {
  home: {
    paddingTop: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center align the entire content
  },
  separation: {
    paddingTop: 10,
  },
  cards: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", 
    margin: "0 auto", 
  },
  button:{
    width: "30px"
  }
};


export default Cart;
