import { useCart } from '../context/CartContext';
import { Button, Text,} from '@chakra-ui/react';
import CartCard from '../components/CartCard';
import { Link } from 'react-router-dom';

function Cart() {
  const { cardData, handleCardCountRestChange, handleCardCountAddChange, cardCounts, totalCount } = useCart();

  const totalPrice = cardData.reduce((total, card ) => {
    const count = cardCounts[card.id] || 0;
    return total + card.price * count;
  }, 0);

  if (totalCount === 0)
    return (<h1>No cuentas con articulos en tu carrito</h1>);

  return (
      <div style={styles.home}>
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
          <Link to="/checkout">
            <Button variant="outline" width="200px" >Pasar a pagar</Button> 
          </Link>
        </div>
      </div>
  );
}

const styles = {
  home: {
    paddingTop: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  separation: {
    paddingTop: 10,
  },
  cards: {
    width: "100%",
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
