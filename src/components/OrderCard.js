import React from 'react';
import { Text, Card, Flex } from "@chakra-ui/react";

function OrderCard({ name, amount }) {
  return (
    <Card.Root
      maxW="sm" // Compact width
      overflow="hidden"
      borderRadius="md" // Rounded corners
      p={2} // Reduced padding for a smaller height
      bg="white"
      _hover={{ transform: "translateY(-2px)" }} // Subtle hover effect
      transition="all 0.2s"
    >
      <Card.Body>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.600">
            x {amount}
          </Text>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default OrderCard;
