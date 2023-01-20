import React from 'react';
import { Button } from '@chakra-ui/react';

function CustomButton({ text, onClick }) {
    return (
        <Button
            loadingText='Loading'
            size='lg'
            fontSize='md'
            fontWeight='normal'
            borderRadius='full'
            bg={'secondary.500'}
            color={'white'}
            _hover={{
                bg: 'secondary.300',
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

export default CustomButton;
