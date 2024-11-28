import React from 'react';
import Card from '../components/Card';
import { useCart } from '../context/CartContext';
import { Separator, Text } from '@chakra-ui/react';

function Home() {
  const { cardData, handleCardCountAddChange, handleCardCountRestChange, cardCounts } = useCart(); // Access context state

  return (
    <div style={styles.home}>
    <Text textStyle="4xl" style={styles.title} paddingBottom={"5"}>Milk Tea Series</Text>
    <Separator style={styles.customSeparator} />
      
      <div className="card-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '100px', gap:'20px'}}>
        {cardData
          .filter(card => card.category === 1)
          .map(card => (
          <Card 
            key={card.id}
            id={card.id}
            name={card.name}
            description={card.description}
            imageUrl={card.imageUrl}
            price={card.price}
            onAddCountChange={handleCardCountAddChange}
            onRestCountChange={handleCardCountRestChange}
            cardCounts={cardCounts}
          />
        ))}
      </div>

      <Text textStyle="4xl" style={styles.title} paddingBottom={"5"}>Lemon Tea Series</Text>
      <Separator style={{ borderBottom: "1px solid #999", paddingBottom: "10px", borderTop:"1px solid #999" }} />

      <div className="card-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cardData
          .filter(card => card.category === 2)
          .map(card => (
          <Card 
            key={card.id}
            id={card.id}
            name={card.name}
            description={card.description}
            imageUrl={card.imageUrl}
            price={card.price}
            onAddCountChange={handleCardCountAddChange}
            onRestCountChange={handleCardCountRestChange}
            cardCounts={cardCounts}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  home: {
    paddingTop: 150,
  },

  customSeparator: {  // Use camelCase for the key name as well
    borderBottom: '1px solid #999',  // Use camelCase for the property
    paddingBottom: 25,  // Correct syntax
  },

  title: {
    textAlign: 'left',  // Align text to the left
    fontFamily: '"Deco", sans-serif',  // Apply the Deco font
  },
};


export default Home;
