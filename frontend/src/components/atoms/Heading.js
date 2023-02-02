import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

function Heading({ text }) {
  return (
    <Flex h={50} w='fit-content' align='center'>
      <Text fontSize={30} fontWeight='bold'>
        {text}
      </Text>
    </Flex>
  );
}

export default Heading;
