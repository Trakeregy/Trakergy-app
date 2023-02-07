import React from 'react';
import { Button } from '@chakra-ui/react';

function CustomButton({ text, onClick, ...otherProps }) {
  return (
    <Button
      loadingText='Loading'
      size='lg'
      fontSize='md'
      fontWeight='normal'
      borderRadius='full'
      colorScheme='secondary'
      variant='solid'
      onClick={onClick}
      _hover={{ cursor: 'pointer' }}
      {...otherProps}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
