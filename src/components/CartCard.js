import React, { useEffect, useState } from 'react';
import { Text, Button, Card, HStack, Heading } from "@chakra-ui/react"

function CartCard({ id, name, price, onRestCountChange, onAddCountChange, cardCounts }) {
  
  const [count, setCount] = useState(cardCounts[id] || 0); 

    useEffect(() => {
        setCount(cardCounts[id] || 0);
    }, [cardCounts, id]);

    const handleRemove = () => {
        if (count > 0) {
        onRestCountChange(id, 1);
        } else {
        console.log('No item to remove');
        }
    };

    const handleAdd = () => {
        onAddCountChange(id, 1);
    }

    if (count === 0)
        return (null);

    return (
        <Card.Root size="sm">
            <Card.Header>
                <HStack>
                    <Heading size="sm">{name}</Heading>
                </HStack>
            </Card.Header>
                <Card.Body color="fg.muted">
                <HStack gap="10">
                    <Text>${price * count}.00</Text>
                    <Button variant="outline" color="red" onClick={handleRemove}>X</Button>
                    <Text right="0">{count}</Text> 
                    <Button variant="outline" color="green" onClick={handleAdd}>✔</Button>
                </HStack>
            </Card.Body> 
        </Card.Root>
    );
}

export default CartCard;
