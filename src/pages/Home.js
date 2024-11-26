import React from 'react';
import Card from '../components/Card';
import { useCart } from '../context/CartContext';
import { Separator, Text } from '@chakra-ui/react';

function Home() {
  const { cardData, handleCardCountAddChange, handleCardCountRestChange, cardCounts } = useCart(); // Access context state

  return (
    <div style={styles.home}>
      <Separator size="lg" paddingBottom="10" />
      <Text textStyle="6xl">Milk Tea Series</Text>
      <Separator size="lg" paddingBottom="10"/>
      
      <div className="card-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '100'}}>
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

      <Separator size="lg" paddingBottom="10"/>
      <Text textStyle="6xl">Lemon Tea Series</Text>
      <Separator size="lg" paddingBottom="10"/>

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

      <Separator size="lg" paddingBottom="10"/>
      <Text textStyle="6xl">Cheese Milk Cap Series</Text>
      <Separator size="lg" paddingBottom="10"/>

      <Separator size="lg" paddingBottom="10"/>
      <Text textStyle="6xl">Fruit Tea Series</Text>
      <Separator size="lg" paddingBottom="10"/>

      <Separator size="lg" paddingBottom="10"/>
      <Text textStyle="6xl">Smoothies Series</Text>
      <Separator size="lg" paddingBottom="10"/>

      <Separator size="lg" paddingBottom="10"/>
      <Text textStyle="6xl">Frappe Series</Text>
      <Separator size="lg" paddingBottom="10"/>
    </div>
  );
}

const styles = {
  home: {
    paddingTop: 150
  },
};

export default Home;
