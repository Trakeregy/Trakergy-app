import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

function CustomHeading({ text }) {
  return (
    <Flex h={50} w='fit-content' align='center'>
      <Text fontSize={30} fontWeight='bold'>
        {text}
      </Text>
    </Flex>
  );
}

export default CustomHeading;
