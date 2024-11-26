import React, { useEffect, useState } from 'react';
import { Text, Button, Card, HStack, Image } from "@chakra-ui/react"

function DrinkCard({ id, name, description, price, imageUrl,  onAddCountChange, onRestCountChange, cardCounts }) {
  
  const [count, setCount] = useState(cardCounts[id] || 0); 

  useEffect(() => {
    setCount(cardCounts[id] || 0);
  }, [cardCounts, id]);

  const handleAdd = () => {
    onAddCountChange(id, 1);
  };

  const handleRemove = () => {
    if (count > 0) {
      onRestCountChange(id, 1);
    } else {
      console.log('No item to remove');
    }
  };

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={imageUrl}
        alt={name}
      />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>
          {description}
        </Card.Description>
        <HStack>
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
            ${price}.00
          </Text>
          <Text fontWeight="small">x{count}</Text>
        </HStack>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={handleAdd}>Add to cart</Button>
        <Button variant="ghost" onClick={handleRemove} disabled={count === 0} >Remove from cart</Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default DrinkCard;
